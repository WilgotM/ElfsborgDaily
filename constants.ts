// VIKTIGT: Byt ut denna URL mot din Google Apps Script Web App URL
// Du hittar den när du klickar på "Deploy" -> "Web App" i Google Script.
// Exempel: "https://script.google.com/macros/s/AKfycbx.../exec"

export const API_URL = "https://script.google.com/macros/s/AKfycbxp9wjAXLdQ4oq9yrPU4gkDbB2Tuypi_h6Op4kPdxxqGc5U0MhrLdb29BdStwCiw1MR/exec"; 

// Om API_URL är tom, används denna mock-data så att du ser hur designen ser ut.
// Vi lämnar dessa tomma för att inte visa falsk information om spelare vid eventuella fel.
export const MOCK_DATA = {
  injuries: [],
  transfers: []
};