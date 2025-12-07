import React, { useState } from 'react';
import { BIRTHDAY_PLAYERS, PlayerBirthday } from '../data/birthdays';
import { getPlayerImageUrl } from '../utils';

interface GroupedBirthdays {
  today: PlayerBirthday[];
  upcoming: PlayerBirthday[];
  recent: PlayerBirthday[];
  rest: PlayerBirthday[];
}

const PlayerRow: React.FC<{ player: PlayerBirthday, highlight?: boolean, type?: 'recent' | 'upcoming' | 'standard' }> = ({ player, highlight, type = 'standard' }) => {
  const [imageError, setImageError] = useState(false);
  const imageUrl = getPlayerImageUrl(player.fotmobLink);

  return (
    <div className={`
      flex items-center justify-between p-4 rounded-lg border mb-3 transition-all
      ${highlight 
        ? 'bg-gradient-to-r from-elfsborg-yellow/20 to-transparent border-elfsborg-yellow shadow-lg shadow-elfsborg-yellow/10' 
        : 'bg-elfsborg-surface border-elfsborg-border hover:border-gray-600'}
    `}>
      <div className="flex items-center gap-4 flex-grow min-w-0">
        {imageUrl && !imageError ? (
           <img 
             src={imageUrl} 
             alt={player.name} 
             className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-elfsborg-border bg-elfsborg-black shrink-0"
             onError={() => setImageError(true)}
           />
        ) : (
          <div className={`
            w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-display font-bold text-lg md:text-xl shadow-inner shrink-0
            ${highlight ? 'bg-elfsborg-yellow text-black' : 'bg-gray-800 text-gray-400'}
          `}>
            {player.name.charAt(0)}
          </div>
        )}
        
        <div className="flex flex-col min-w-0 pr-2">
          <h3 className={`font-display font-bold uppercase tracking-wide text-lg truncate ${highlight ? 'text-white' : 'text-gray-200'}`}>
            {player.name}
          </h3>
          <div className="text-sm text-gray-500 font-medium flex items-center gap-2 flex-wrap">
             <span className="text-elfsborg-yellow text-xs uppercase font-bold tracking-wider mr-1">
                {player.position}
             </span>
             <span className="text-gray-700">•</span>
             {type === 'recent' && <span className="inline-block w-2 h-2 rounded-full bg-elfsborg-yellow shrink-0"></span>}
             {type === 'upcoming' && <span className="inline-block w-2 h-2 rounded-full bg-green-500 shrink-0"></span>}
             <span className="truncate">{player.dateStr}</span>
             {type === 'recent' && <span className="text-elfsborg-yellow text-xs ml-1 hidden sm:inline">(Nyligen)</span>}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3 shrink-0">
        {highlight && (
          <span className="text-2xl animate-bounce hidden sm:block" role="img" aria-label="cake">🎂</span>
        )}
        
        {player.fotmobLink && (
           <a 
             href={player.fotmobLink} 
             target="_blank" 
             rel="noopener noreferrer" 
             className="p-2 bg-green-900/30 hover:bg-green-900/50 text-green-400 rounded transition-colors border border-green-900/50"
             title="Profil på Fotmob"
           >
             <img src="https://www.google.com/s2/favicons?domain=fotmob.com&sz=64" alt="Fotmob" className="w-4 h-4 object-contain" />
           </a>
        )}
      </div>
    </div>
  );
};

const BirthdayView: React.FC = () => {
  const getGroups = (): GroupedBirthdays => {
    const today = new Date();
    // Reset time to avoid timezone issues affecting day diff
    today.setHours(0, 0, 0, 0);

    const groups: GroupedBirthdays = {
      today: [],
      upcoming: [],
      recent: [],
      rest: []
    };

    BIRTHDAY_PLAYERS.forEach(player => {
      // Month is 0-indexed in JS Date (Jan = 0)
      const pMonth = player.month - 1;
      const pDay = player.day;

      // 1. Calculate Next Birthday
      let nextBirthday = new Date(today.getFullYear(), pMonth, pDay);
      if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
      }

      // 2. Calculate Last Birthday
      let lastBirthday = new Date(today.getFullYear(), pMonth, pDay);
      if (lastBirthday > today) {
        lastBirthday.setFullYear(today.getFullYear() - 1);
      }

      const msPerDay = 1000 * 60 * 60 * 24;
      // Use Math.round/floor/ceil carefully. 
      // Diff in ms divided by msPerDay gives e.g. 0.5 for same day if time differs, but we zeroed time.
      const daysUntil = Math.round((nextBirthday.getTime() - today.getTime()) / msPerDay);
      const daysSince = Math.round((today.getTime() - lastBirthday.getTime()) / msPerDay);

      if (daysUntil === 0) {
        groups.today.push(player);
      } else if (daysUntil <= 45) {
        // "Snart" = inom 45 dagar
        groups.upcoming.push(player);
      } else {
        // Everyone else goes to "rest"
        groups.rest.push(player);
        
        // BUT, if they are also "recent", add to recent group as well
        if (daysSince <= 21 && daysSince > 0) {
          groups.recent.push(player);
        }
      }
    });

    // Sort groups
    const sortUpcoming = (a: PlayerBirthday, b: PlayerBirthday) => {
        const getDist = (p: PlayerBirthday) => {
            const now = new Date();
            let d = new Date(now.getFullYear(), p.month - 1, p.day);
            if (d < now) d.setFullYear(now.getFullYear() + 1);
            return d.getTime();
        };
        return getDist(a) - getDist(b);
    };

    // Sort recent: closest to today first (smallest daysSince)
    const sortRecent = (a: PlayerBirthday, b: PlayerBirthday) => {
        const getDist = (p: PlayerBirthday) => {
            const now = new Date();
            let d = new Date(now.getFullYear(), p.month - 1, p.day);
            if (d > now) d.setFullYear(now.getFullYear() - 1);
            return now.getTime() - d.getTime();
        };
        return getDist(a) - getDist(b);
    };
    
    // Sort rest by calendar month/day (Jan -> Dec)
    const sortCalendar = (a: PlayerBirthday, b: PlayerBirthday) => {
        if (a.month !== b.month) return a.month - b.month;
        return a.day - b.day;
    };

    groups.upcoming.sort(sortUpcoming);
    groups.recent.sort(sortRecent);
    groups.rest.sort(sortCalendar);

    return groups;
  };

  const { today, upcoming, recent, rest } = getGroups();

  return (
    <div className="pb-20 max-w-2xl mx-auto">
      
      {/* TODAY */}
      {today.length > 0 && (
        <div className="mb-10 animate-fade-in">
          <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
             <span className="text-3xl">🎉</span>
             <h2 className="text-2xl md:text-3xl font-display font-bold text-elfsborg-yellow uppercase drop-shadow-md">
               Grattis på födelsedagen!
             </h2>
          </div>
          {today.map(p => <PlayerRow key={p.name} player={p} highlight={true} />)}
        </div>
      )}

      {/* UPCOMING */}
      {upcoming.length > 0 && (
        <div className="mb-10 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <h2 className="text-xl font-display font-bold text-white uppercase mb-4 border-b border-gray-800 pb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Kommande
          </h2>
          {upcoming.map(p => <PlayerRow key={p.name} player={p} type="upcoming" />)}
        </div>
      )}

      {/* RECENT */}
      {recent.length > 0 && (
        <div className="mb-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <h2 className="text-xl font-display font-bold text-gray-300 uppercase mb-4 border-b border-gray-800 pb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-elfsborg-yellow rounded-full"></span>
            Nyligen fyllda
          </h2>
          {recent.map(p => <PlayerRow key={p.name} player={p} type="recent" />)}
        </div>
      )}

      {/* REST */}
      <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
        <h2 className="text-xl font-display font-bold text-gray-500 uppercase mb-4 border-b border-gray-800 pb-2">
          Övriga Truppen
        </h2>
        <div className="grid grid-cols-1 gap-2">
           {rest.map(p => <PlayerRow key={p.name} player={p} />)}
        </div>
      </div>

    </div>
  );
};

export default BirthdayView;