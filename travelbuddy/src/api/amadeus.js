const API_KEY = "a3MpHonkPBWb56nXNwS93xLe7fJB4RQT";     
const API_SECRET = "PGepz2mJ3CJkAbqU"; 
//const proxy = "https://cors-anywhere.herokuapp.com/";
//const cityCode = "MAD"; // or "NYC", "LON"
import mockHotels from "./mockHotels.js";


let cachedToken = null;
let tokenExpiresAt = null;

export async function getAccessToken() {
  const now = Date.now();

  // reuse the token if it's still valid
  if (cachedToken && tokenExpiresAt && now < tokenExpiresAt) {
    return cachedToken;
  }

  const response = await fetch(/*proxy +*/ "https://test.api.amadeus.com/v1/security/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error_description || "Failed to get access token");
  }

  //saave token and expiration (expires_in is in seconds)
  cachedToken = data.access_token;
  tokenExpiresAt = now + data.expires_in * 1000;

  return cachedToken;
}

export async function searchCity(keyword) {
    const token = await getAccessToken();
  
    const response = await fetch(
      /*proxy +*/ `https://test.api.amadeus.com/v1/reference-data/locations?keyword=${keyword}&subType=CITY`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.errors?.[0]?.detail || "Failed to fetch cities");
    }
  
    return data.data; // returns array of destination 
  }
  
  export async function getFlightOffers(destinationCode) {
    const token = await getAccessToken();
    const origin = "LON"; // example origin (London), later make this dynamic
  
    const response = await fetch(
      /*proxy +*/ `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destinationCode}&departureDate=2025-05-05&adults=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.errors?.[0]?.detail || "Failed to fetch flights");
    }
  
    return data.data;
  }
  
  export async function getHotelOffers(cityCode) {
    const token = await getAccessToken();
  
    const response = await fetch(
      proxy + `https://test.api.amadeus.com/v2/shopping/hotel-offers?cityCode=${cityCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.errors?.[0]?.detail || "Failed to fetch hotels");
    }
  
    return data.data;
  }

    /*console.log("Using mock hotel data for city:", cityCode);
  return mockHotels;
}*/
  
