import axios from "axios";
const BaseUrl = 'https://yt-api.p.rapidapi.com'
const apikey = process.env.REACT_APP_APIKEY;
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': apikey,
    'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
  }
};

export const fetchData = (url) => {
  const response = axios.get(`${BaseUrl}/${url}`, options);
  return response;
}