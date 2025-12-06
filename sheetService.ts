import { API_URL, MOCK_DATA } from '../constants';
import { SheetResponse } from '../types';

const CACHE_KEY = 'elfsborg_daily_data_v2'; // Bytt nyckel för att tvinga fram ny data (omstrukturering)
const CACHE_DURATION = 5 * 60 * 1000; // 5 minuter

// Hjälpfunktion för att pausa koden
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchData = async (): Promise<SheetResponse> => {
  // Om ingen API-URL är satt, kör vi mock data direkt (dev mode)
  if (!API_URL) {
    console.warn("Ingen API_URL angiven i constants.ts. Visar demo-data.");
    await new Promise(resolve => setTimeout(resolve, 800));
    return MOCK_DATA as SheetResponse;
  }

  // 1. Kolla om vi har färsk data i cachen (Sparar anrop)
  try {
    const cachedString = localStorage.getItem(CACHE_KEY);
    if (cachedString) {
      const cached = JSON.parse(cachedString);
      const isFresh = Date.now() - cached.timestamp < CACHE_DURATION;
      
      if (isFresh) {
        console.log("Använder cachad data");
        return cached.data as SheetResponse;
      }
    }
  } catch (e) {
    console.warn("Kunde inte läsa från cache:", e);
  }

  // 2. Hämta från Google med Retry-logik
  try {
    let response = await fetch(API_URL);
    
    // Om vi får "Too Many Requests" (429) eller serverfel (5xx), vänta och försök igen
    if (response.status === 429 || response.status >= 500) {
      console.warn(`Hög belastning (${response.status}). Väntar 4 sekunder och försöker igen...`);
      await wait(4000); // Vänta 4 sekunder enligt önskemål
      response = await fetch(API_URL); // Försök 2
    }

    if (!response.ok) {
      throw new Error(`Serverfel: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();

    // 3. Spara den nya datan i cachen
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        data
      }));
    } catch (e) {
      console.warn("Kunde inte spara till cache:", e);
    }

    return data as SheetResponse;

  } catch (error) {
    console.error("Misslyckades att hämta data (även efter försök):", error);
    
    // 4. FALLBACK: Om Google fortfarande bråkar, visa gammal data om den finns
    const cachedString = localStorage.getItem(CACHE_KEY);
    if (cachedString) {
      console.info("Använder föråldrad cache som nödåtgärd.");
      return JSON.parse(cachedString).data as SheetResponse;
    }

    // Om ingen data finns alls, kasta felet
    throw error;
  }
};