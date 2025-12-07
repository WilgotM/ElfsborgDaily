
import React from 'react';
import { Injury } from '../types';
import { getPlayerImageUrl, formatDate } from '../utils';

interface Props {
  data: Injury;
}

const InjuryCard: React.FC<Props> = ({ data }) => {
  const hasLinks = data.TwitterLink || data.FotmobLink;
  const displayDate = formatDate(data.Date || data.Datum);
  
  // Try to find a Transfermarkt link in the dynamic keys if not explicit, 
  // though usually we just use FotmobLink if available.
  const transfermarktKey = Object.keys(data).find(k => 
    typeof data[k] === 'string' && (data[k] as string).includes('transfermarkt')
  );
  const transfermarktLink = transfermarktKey ? data[transfermarktKey] as string : undefined;

  const imageUrl = getPlayerImageUrl(data.FotmobLink, transfermarktLink);

  const getProfileLinkData = (url: string) => {
    let hostname = '';
    try {
      hostname = new URL(url).hostname;
    } catch (e) {
      return null;
    }

    // Google's favicon service retrieves the icon from the domain
    const iconUrl = `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
    const lowerUrl = url.toLowerCase();
    
    if (lowerUrl.includes('transfermarkt')) {
      return {
        label: 'Transfermarkt',
        className: 'bg-blue-900/40 hover:bg-blue-900/60 text-blue-400 border border-blue-900/50',
        iconUrl
      };
    } else if (lowerUrl.includes('flashscore')) {
      return {
        label: 'Flashscore',
        className: 'bg-slate-900/40 hover:bg-slate-900/60 text-red-500 border border-slate-700/50',
        iconUrl
      };
    } else if (lowerUrl.includes('fotmob')) {
      return {
        label: 'Fotmob',
        className: 'bg-green-900/40 hover:bg-green-900/60 text-green-400 border border-green-900/50',
        iconUrl
      };
    }
    
    // Default fallback for other sites
    return {
      label: hostname.replace('www.', ''),
      className: 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700',
      iconUrl
    };
  };

  const profileData = data.FotmobLink ? getProfileLinkData(data.FotmobLink) : null;

  return (
    <div className="bg-elfsborg-surface border border-elfsborg-border hover:bg-elfsborg-surfaceHighlight transition-colors duration-200 flex flex-col h-full overflow-hidden">
      <div className="p-4 md:p-6 flex-grow">
        <div className="flex justify-between items-start mb-4 md:mb-6 gap-3">
          <div className="flex gap-4 items-center flex-grow">
            {imageUrl && (
              <img 
                src={imageUrl} 
                alt={data.Name} 
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-elfsborg-border bg-elfsborg-black shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <div className="flex-grow">
              <h3 className="text-xl md:text-2xl font-display font-bold text-white uppercase tracking-wide break-words leading-tight">
                {data.Name}
              </h3>
              <p className="text-sm md:text-base text-gray-400 mt-1">{data.Injury}</p>
            </div>
          </div>
          
          <span className="bg-red-700 text-white text-xs md:text-sm font-bold px-2 md:px-3 py-1.5 uppercase tracking-wider min-w-[80px] md:min-w-[90px] text-center shrink-0 rounded-sm">
            {data.Status || "Skadad"}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-3 md:gap-5 border-t border-elfsborg-border pt-4 md:pt-5">
          <div>
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Beräknad Återkomst</p>
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-elfsborg-yellow rounded-full"></div>
               <p className="font-medium text-gray-200 text-sm md:text-base">{data.ReturnDate}</p>
            </div>
          </div>

          {/* Dynamisk visning av extra kolumner */}
          {Object.keys(data).map(key => {
            if (['Name', 'Injury', 'ReturnDate', 'Status', 'Date', 'Datum', 'TwitterLink', 'FotmobLink'].includes(key)) return null;
            return (
              <div key={key}>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">{key}</p>
                <p className="font-medium text-gray-300 text-sm md:text-base">{data[key]}</p>
              </div>
            );
          })}
        </div>

        {/* Datumstämpel */}
        {displayDate && (
          <div className="mt-4 pt-2 flex justify-end">
            <span className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
              </svg>
              Uppdaterad: {displayDate}
            </span>
          </div>
        )}
      </div>

      {/* Footer med länkar om de finns */}
      {hasLinks && (
        <div className="bg-black/20 border-t border-elfsborg-border p-3 md:p-4 flex gap-3 md:gap-4">
          {data.TwitterLink && (
            <a 
              href={data.TwitterLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white text-xs md:text-sm font-bold uppercase py-2.5 md:py-3 px-3 md:px-4 rounded flex items-center justify-center gap-2 md:gap-3 transition-colors border border-gray-700"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5 fill-current" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
              Inlägg
            </a>
          )}
          {data.FotmobLink && profileData && (
            <a 
              href={data.FotmobLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex-1 ${profileData.className} text-xs md:text-sm font-bold uppercase py-2.5 md:py-3 px-3 md:px-4 rounded flex items-center justify-center gap-2 md:gap-3 transition-colors`}
            >
              <img src={profileData.iconUrl} alt="" className="w-4 h-4 md:w-5 md:h-5 object-contain" />
              {profileData.label}
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default InjuryCard;
