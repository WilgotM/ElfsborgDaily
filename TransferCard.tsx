
import React from 'react';
import { Transfer } from '../types';
import { getPlayerImageUrl, formatDate } from '../utils';

interface Props {
  data: Transfer;
}

const TransferCard: React.FC<Props> = ({ data }) => {
  const displayDate = formatDate(data.Date || data.Datum);

  // Try to find a Transfermarkt link in the dynamic keys if not explicit
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
        label: 'Spelarprofil på Transfermarkt',
        className: 'p-2 md:p-3 bg-blue-900/30 hover:bg-blue-900/50 text-blue-400 rounded transition-colors border border-blue-900/50',
        iconUrl
      };
    } else if (lowerUrl.includes('flashscore')) {
      return {
        label: 'Spelarprofil på Flashscore',
        className: 'p-2 md:p-3 bg-slate-900/30 hover:bg-slate-900/50 text-red-500 rounded transition-colors border border-slate-700/50',
        iconUrl
      };
    } else if (lowerUrl.includes('fotmob')) {
      return {
        label: 'Spelarprofil på Fotmob',
        className: 'p-2 md:p-3 bg-green-900/30 hover:bg-green-900/50 text-green-400 rounded transition-colors border border-green-900/50',
        iconUrl
      };
    }
    
    // Default fallback
    return {
      label: `Profil på ${hostname.replace('www.', '')}`,
      className: 'p-2 md:p-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded transition-colors border border-gray-700',
      iconUrl
    };
  };

  const profileData = data.FotmobLink ? getProfileLinkData(data.FotmobLink) : null;

  return (
    <div className="flex flex-col h-full bg-elfsborg-surface border border-elfsborg-border hover:border-gray-500 transition-colors duration-200 overflow-hidden">
      
      {/* Header Section */}
      <div className="p-4 md:p-6 pb-0">
        <div className="flex justify-between items-start gap-3">
          <div className="max-w-[70%]">
            <span className="text-xs md:text-sm font-bold text-elfsborg-yellow uppercase tracking-wider mb-1 block">
              {data.Position}
            </span>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white uppercase leading-none break-words">
              {data.Name}
            </h3>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
             {imageUrl && (
              <img 
                src={imageUrl} 
                alt={data.Name} 
                className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover border-2 border-elfsborg-border bg-elfsborg-black"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <div className="text-right">
              <span className="block text-xl md:text-2xl font-display font-bold text-gray-400 leading-none">{data.Age}</span>
              <span className="text-[10px] md:text-xs text-gray-600 uppercase">År</span>
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="p-4 md:p-6 grid grid-cols-2 gap-y-4 gap-x-3 md:gap-y-5 md:gap-x-4">
        <div>
          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Nuvarande Klubb</p>
          <p className="font-medium text-gray-200 text-sm md:text-base truncate pr-2">{data.OldClub}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Nationalitet</p>
          <p className="font-medium text-gray-200 text-sm md:text-base truncate">{data.Nationality}</p>
        </div>
        {data.Type && (
          <div>
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Typ</p>
            <p className="font-medium text-gray-200 text-sm md:text-base">{data.Type}</p>
          </div>
        )}
        
         {/* Dynamisk visning */}
         {Object.keys(data).map(key => {
            if (['Name', 'OldClub', 'Position', 'Age', 'Nationality', 'Type', 'Comment', 'Source', 'Date', 'Datum', 'TwitterLink', 'FotmobLink'].includes(key)) return null;
            return (
              <div key={key} className="col-span-2">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">{key}</p>
                <p className="font-medium text-gray-200 text-sm md:text-base">{data[key]}</p>
              </div>
            );
          })}
      </div>

      {/* Content Spacer */}
      <div className="flex-grow"></div>

      {/* Footer Section (Comment & Source & Links) */}
      <div className="bg-black/20 border-t border-elfsborg-border p-4 md:p-5">
        {data.Comment && (
          <div className="mb-4 md:mb-5">
             <p className="text-sm md:text-base text-gray-300 italic leading-snug border-l-2 border-elfsborg-yellow pl-3">
               "{data.Comment}"
             </p>
          </div>
        )}
        
        {/* Action Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-800/50 mt-2">
           <div className="flex flex-col">
              {/* Visa Källa och Datum snyggt tillsammans */}
              {(data.Source || displayDate) && (
                <div className="flex flex-col">
                   <span className="text-[10px] md:text-xs font-bold text-gray-600 uppercase mb-0.5">Info</span>
                   <div className="flex flex-wrap gap-x-2 gap-y-1 items-baseline">
                     {data.Source && (
                       <span className="text-xs md:text-sm font-bold text-gray-400 truncate max-w-[120px] md:max-w-[140px]">
                         {data.Source}
                       </span>
                     )}
                     {displayDate && (
                       <span className={`text-[10px] text-gray-500 font-medium ${data.Source ? 'before:content-["•"] before:mr-1 before:text-gray-700' : ''}`}>
                         {displayDate}
                       </span>
                     )}
                   </div>
                </div>
              )}
           </div>

           <div className="flex items-center gap-2 md:gap-3">
             {data.TwitterLink && (
               <a href={data.TwitterLink} target="_blank" rel="noopener noreferrer" className="p-2 md:p-3 bg-gray-800 hover:bg-gray-700 rounded text-white transition-colors border border-gray-700" title="Se inlägg på X/Twitter">
                 <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
               </a>
             )}
             {data.FotmobLink && profileData && (
               <a href={data.FotmobLink} target="_blank" rel="noopener noreferrer" className={profileData.className} title={profileData.label}>
                 <img src={profileData.iconUrl} alt="" className="w-4 h-4 md:w-5 md:h-5 object-contain" />
               </a>
             )}
              {data.Source && data.Source.startsWith('http') && (
                <a href={data.Source} target="_blank" rel="noopener noreferrer" className="p-2 md:p-3 bg-elfsborg-yellow text-black rounded hover:bg-yellow-400 transition-colors font-bold text-xs md:text-sm">
                  Läs
                </a>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default TransferCard;
