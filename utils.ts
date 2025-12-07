
export const getPlayerImageUrl = (fotmobLink?: string, transfermarktLink?: string): string | null => {
  // 1. Prioritize Fotmob (High quality, reliable CDN)
  if (fotmobLink) {
    try {
      // Url pattern: https://www.fotmob.com/players/123456/per-frick
      const match = fotmobLink.match(/\/players\/(\d+)/);
      if (match && match[1]) {
        return `https://images.fotmob.com/image_resources/playerimages/${match[1]}.png`;
      }
    } catch (e) {
      console.warn("Could not parse Fotmob ID", e);
    }
  }

  // 2. Fallback to Transfermarkt
  if (transfermarktLink) {
    try {
      // Url pattern: https://www.transfermarkt.com/per-frick/profil/spieler/123456
      // or /per-frick/profil/spieler/123456
      const match = transfermarktLink.match(/\/spieler\/(\d+)/);
      if (match && match[1]) {
        return `https://img.a.transfermarkt.technology/portrait/header/${match[1]}.jpg`;
      }
    } catch (e) {
      console.warn("Could not parse Transfermarkt ID", e);
    }
  }

  return null;
};

export const formatDate = (dateString?: string): string | undefined => {
  if (!dateString) return undefined;
  // Splits on 'T' to handle ISO 8601 strings (e.g. 2025-11-26T23:00:00.000Z -> 2025-11-26)
  return dateString.split('T')[0];
};
