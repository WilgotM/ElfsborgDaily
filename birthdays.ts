export interface PlayerBirthday {
  name: string;
  position: string; // Nytt fält för position
  month: number; // 1-12
  day: number; // 1-31
  dateStr: string;
  fotmobLink?: string;
}

export const BIRTHDAY_PLAYERS: PlayerBirthday[] = [
  { name: "Niklas Hult", position: "Försvarare", month: 2, day: 13, dateStr: "13 februari", fotmobLink: "https://www.fotmob.com/sv/players/169015/niklas-hult" },
  { name: "Arbër Zeneli", position: "Anfallare", month: 2, day: 25, dateStr: "25 februari", fotmobLink: "https://www.fotmob.com/sv/players/520659/arber-zeneli" },
  { name: "Simon Hedlund", position: "Anfallare", month: 3, day: 11, dateStr: "11 mars", fotmobLink: "https://www.fotmob.com/sv/players/315032/simon-hedlund" },
  { name: "Leo Östman", position: "Anfallare", month: 3, day: 15, dateStr: "15 mars", fotmobLink: "https://www.fotmob.com/sv/players/1665782/leo-ostman" },
  { name: "Ari Sigurpálsson", position: "Anfallare", month: 3, day: 17, dateStr: "17 mars", fotmobLink: "https://www.fotmob.com/sv/players/1044460/ari-sigurpalsson" },
  { name: "Rasmus Wikström", position: "Försvarare", month: 3, day: 18, dateStr: "18 mars", fotmobLink: "https://www.fotmob.com/sv/players/942361/rasmus-wikstrom" },
  { name: "Taylor Silverholt", position: "Anfallare", month: 4, day: 4, dateStr: "4 april", fotmobLink: "https://www.fotmob.com/sv/players/1034551/taylor-silverholt" },
  { name: "Ludvig Richtnér", position: "Försvarare", month: 4, day: 10, dateStr: "10 april", fotmobLink: "https://www.fotmob.com/sv/players/1611427/ludvig-richtner" },
  { name: "Per Frick", position: "Anfallare", month: 4, day: 14, dateStr: "14 april", fotmobLink: "https://www.fotmob.com/sv/players/328009/per-frick" },
  { name: "Simon Eriksson", position: "Målvakt", month: 4, day: 24, dateStr: "24 april", fotmobLink: "https://www.fotmob.com/sv/players/1441736/simon-eriksson" },
  { name: "Wenderson", position: "Mittfältare", month: 4, day: 27, dateStr: "27 april", fotmobLink: "https://www.fotmob.com/sv/players/1245542/wenderson-oliveira" },
  { name: "Sebastian Holmén", position: "Försvarare", month: 4, day: 29, dateStr: "29 april", fotmobLink: "https://www.fotmob.com/sv/players/312780/sebastian-holmen" },
  { name: "Daniel Granli", position: "Försvarare", month: 5, day: 1, dateStr: "1 maj", fotmobLink: "https://www.fotmob.com/sv/players/442573/daniel-granli" },
  { name: "Johan Larsson", position: "Försvarare", month: 5, day: 5, dateStr: "5 maj", fotmobLink: "https://www.fotmob.com/sv/players/196921/johan-larsson" },
  { name: "Rami Kaib", position: "Försvarare", month: 5, day: 8, dateStr: "8 maj", fotmobLink: "https://www.fotmob.com/sv/players/772083/rami-kaib" },
  { name: "Isak Pettersson", position: "Målvakt", month: 6, day: 6, dateStr: "6 juni", fotmobLink: "https://www.fotmob.com/sv/players/731267/isak-pettersson" },
  { name: "Jens Jakob Thomasen", position: "Mittfältare", month: 6, day: 25, dateStr: "25 juni", fotmobLink: "https://www.fotmob.com/sv/players/543295/jens-jakob-thomasen" },
  { name: "Fredrik Ihler", position: "Anfallare", month: 6, day: 25, dateStr: "25 juni", fotmobLink: "https://www.fotmob.com/sv/players/1166548/frederik-ihler" },
  { name: "Júlíus Magnússon", position: "Mittfältare", month: 6, day: 28, dateStr: "28 juni", fotmobLink: "https://www.fotmob.com/sv/players/611328/julius-magnusson" },
  { name: "Lucas Hägg-Johansson", position: "Målvakt", month: 7, day: 11, dateStr: "11 juli", fotmobLink: "https://www.fotmob.com/sv/players/350495/lucas-hagg-johansson" },
  { name: "Altti Hellemaa", position: "Mittfältare", month: 7, day: 25, dateStr: "25 juli", fotmobLink: "https://www.fotmob.com/sv/players/1358346/altti-hellemaa" },
  { name: "Gottfrid Rapp", position: "Anfallare", month: 8, day: 13, dateStr: "13 augusti", fotmobLink: "https://www.fotmob.com/sv/players/1478089/gottfrid-rapp" },
  { name: "Simon Olsson", position: "Mittfältare", month: 9, day: 14, dateStr: "14 september", fotmobLink: "https://www.fotmob.com/sv/players/792690/simon-olsson" },
  { name: "Ibrahim Buhari", position: "Försvarare", month: 10, day: 8, dateStr: "8 oktober", fotmobLink: "https://www.fotmob.com/sv/players/1262823/ibrahim-buhari" },
  { name: "Frode Aronsson", position: "Försvarare", month: 10, day: 25, dateStr: "25 oktober", fotmobLink: "https://www.fotmob.com/sv/players/1670920/frode-aronsson" },
  { name: "Besfort Zeneli", position: "Mittfältare", month: 11, day: 21, dateStr: "21 november", fotmobLink: "https://www.fotmob.com/sv/players/1338361/besfort-zeneli" },
];