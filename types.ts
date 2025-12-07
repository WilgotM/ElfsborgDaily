// Dessa typer matchar kolumnerna i Google Sheet (utan mellanslag)
// Om du lägger till fler kolumner i framtiden dyker de upp i rådatan,
// men du kan behöva uppdatera dessa interface om du vill ha autocompletion.

export interface Injury {
  Name: string;
  Injury: string;
  ReturnDate: string;
  Status?: string; // Optional if you add it later
  Date?: string; // När skadan registrerades (Engelska)
  Datum?: string; // När skadan registrerades (Svenska)
  TwitterLink?: string; // Länk till X/Twitter inlägg
  FotmobLink?: string; // Länk till spelare på Fotmob
  [key: string]: string | number | undefined; // Allows dynamic extra columns
}

export interface Transfer {
  Name: string;
  OldClub: string;
  Position: string;
  Age: number | string;
  Nationality: string;
  Type?: string; // e.g., "In", "Out"
  Comment?: string; // Nytt fält för kommentar
  Source?: string; // Nytt fält för källa
  Date?: string; // När ryktet publicerades (Engelska)
  Datum?: string; // När ryktet publicerades (Svenska)
  TwitterLink?: string; // Länk till X/Twitter inlägg
  FotmobLink?: string; // Länk till spelare på Fotmob
  [key: string]: string | number | undefined; // Allows dynamic extra columns
}

export interface SheetResponse {
  injuries: Injury[];
  transfers: Transfer[];
}

export enum TabView {
  INJURIES = 'INJURIES',
  TRANSFERS = 'TRANSFERS',
  BIRTHDAYS = 'BIRTHDAYS'
}