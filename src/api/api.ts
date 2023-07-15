import axios from "axios";
import qs from "qs";

// Create an axios instance
export const spotifyHandler = axios.create({
  baseURL: "https://api.spotify.com/v1/",
  timeout: 5000,
});

// Request interceptor
spotifyHandler.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    // const token = localStorage.getItem("token");
    const access_token = await getAccessToken();

    if (access_token) {
      console.log("using access token");
      config.headers["Authorization"] = "Bearer " + access_token;
    } else {
      console.log("no access token received");
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

const spotifyClientCredentials = {
  clientId: "10a5e269b70046a4890a85b07318584f",
  clientSecret: "1167bc39265b4ba88e3e93dcbca9a1d0",
};

async function getAccessToken() {
  const response = await axios
    .post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({
        grant_type: "client_credentials",
        client_id: spotifyClientCredentials.clientId,
        client_secret: spotifyClientCredentials.clientSecret,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .catch((error) => {
      console.log(`failed to fetch spotify credentials ${error}`);
    });

  return response?.data.access_token;
}
