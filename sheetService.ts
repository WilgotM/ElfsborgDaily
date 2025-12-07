import { API_URL, MOCK_DATA } from '../constants';
import { SheetResponse } from '../types';

// Hjälpfunktion för att pausa koden
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchData = async (): Promise<SheetResponse> => {
  // Om ingen API-URL är satt, kör vi mock data direkt (dev mode)
  if (!API_URL) {
    console.warn("Ingen API_URL angiven i constants.ts. Visar demo-data.");
    await new Promise(resolve => setTimeout(resolve, 800));
    return MOCK_DATA as SheetResponse;
  }

  // Hämta från Google med Retry-logik
  try {
    // Lägg till en tidsstämpel (cache buster) för att garantera att webbläsaren inte cacchar requesten
    const separator = API_URL.includes('?') ? '&' : '?';
    const noCacheUrl = `${API_URL}${separator}t=${Date.now()}`;

    let response = await fetch(noCacheUrl);
    
    // Om vi får "Too Many Requests" (429) eller serverfel (5xx), vänta och försök igen
    if (response.status === 429 || response.status >= 500) {
      console.warn(`Hög belastning (${response.status}). Väntar 4 sekunder och försöker igen...`);
      await wait(4000); // Vänta 4 sekunder enligt önskemål
      response = await fetch(noCacheUrl); // Försök 2
    }

    if (!response.ok) {
      throw new Error(`Serverfel: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();

    return data as SheetResponse;

  } catch (error) {
    console.error("Misslyckades att hämta data:", error);
    // Vi kastar felet vidare så att App.tsx kan visa felmeddelandet
    throw error;
  }
};