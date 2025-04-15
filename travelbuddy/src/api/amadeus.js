const API_KEY = "a3MpHonkPBWb56nXNwS93xLe7fJB4RQT";     
const API_SECRET = "PGepz2mJ3CJkAbqU"; 

let cachedToken = null;
let tokenExpiresAt = null;

export async function getAccessToken() {
  const now = Date.now();

  // Reuse the token if it's still valid
  if (cachedToken && tokenExpiresAt && now < tokenExpiresAt) {
    return cachedToken;
  }

  const response = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
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

  // Save token and expiration (expires_in is in seconds)
  cachedToken = data.access_token;
  tokenExpiresAt = now + data.expires_in * 1000;

  return cachedToken;
}
 
