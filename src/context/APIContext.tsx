import React, {
  FC, Context, createContext, useState,
} from 'react';
import axios from 'axios';

export const APIContext: Context<any> = createContext({});

export const APIProvider: FC = ({ children }) => {
  const APP_URL = 'http://localhost:3000';

  /*
Auth api calls
*/
  const getUserToken = async () => {
    try {
      const tokenData = await axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_API_KEY}`);
      localStorage.setItem('movieToken', tokenData.data.request_token);

      window.location.replace(`https://www.themoviedb.org/authenticate/${tokenData.data.request_token}?redirect_to=${APP_URL}`);
      return null;
    } catch (err) {
      console.error(err);
    }
    return null;
  };

  const getSession = async (token: string) => {
    try {
      const session = await axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_API_KEY}`, { request_token: token });
      if (session.data.success) {
        console.log(session.data.success);
        localStorage.setItem('session', session.data.session_id);
        localStorage.removeItem('movieToken');
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  /*
Show api calls
*/

  const getTrendingShows = async (page:number) => {
    try {
      const shows = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?page=${page}&api_key=${process.env.REACT_APP_API_KEY}`);
      return shows.data;
    } catch (err) {
      console.error(err);
    }
    return null;
  };

  const getShowDetails = async (id: number) => {
    try {
      const details = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
      return details.data;
    } catch (err) {
      console.error(err);
    }
    return null;
  };

  const getShowTrailer = async (id: number) => {
    try {
      const videos = await axios.get(`http://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`);
      return videos.data;
    } catch (err) {
      console.error(err);
    }
    return null;
  };
  const getShowRating = async (id: number) => {
    try {
      const ratings = await axios.get(`http://api.themoviedb.org/3/tv/${id}/content_ratings?api_key=${process.env.REACT_APP_API_KEY}`);
      return ratings.data.results;
    } catch (err) {
      console.error(err);
    }
    return null;
  };

  return (
    <APIContext.Provider
      value={{
        getUserToken,
        APP_URL,
        getSession,
        getTrendingShows,
        getShowDetails,
        getShowTrailer,
        getShowRating,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};
