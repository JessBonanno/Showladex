import React, {
  FC, Context, createContext, useState, useContext,
} from 'react';
import axios from 'axios';
import { UsersContext } from './UsersContext';

export const APIContext: Context<any> = createContext({});

export const APIProvider: FC = ({ children }) => {
  const { accountDetails } = useContext(UsersContext);
  /*
Auth api calls
*/
  const getUserToken = async () => {
    console.log(process.env.REACT_APP_URL);
    try {
      const tokenData = await axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_API_KEY}`);
      localStorage.setItem('movieToken', tokenData.data.request_token);

      window.location.replace(`https://www.themoviedb.org/authenticate/${tokenData.data.request_token}?redirect_to=${process.env.REACT_APP_URL}`);
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

  const endSession = async (token: string) => {
    try {
      const session = await axios.delete(`https://api.themoviedb.org/3/authentication/session?api_key=${process.env.REACT_APP_API_KEY}`, { data: { session_id: token } });
      if (session.data.success) {
        localStorage.removeItem('movieToken');
        localStorage.removeItem('session');
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  const getAccountDetails = async () => {
    try {
      const details = await axios.get(`https://api.themoviedb.org/3/account?api_key=${process.env.REACT_APP_API_KEY}&session_id=${localStorage.getItem('session')}`);
      if (details) {
        return details.data;
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
      const videos = await axios.get(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`);
      return videos.data;
    } catch (err) {
      console.error(err);
    }
    return null;
  };

  const getShowRating = async (id: number) => {
    try {
      const ratings = await axios.get(`https://api.themoviedb.org/3/tv/${id}/content_ratings?api_key=${process.env.REACT_APP_API_KEY}`);
      return ratings.data.results;
    } catch (err) {
      console.error(err);
    }
    return null;
  };
    /*
User Actions API calls
*/

  const markFavorite = async (id: number, favorite: boolean) => {
    try {
      const response = await axios.post(`https://api.themoviedb.org/3/account/${accountDetails.id}/favorite?api_key=${process.env.REACT_APP_API_KEY}&session_id=${localStorage.getItem('session')}`, {
        media_type: 'tv',
        media_id: id,
        favorite,
      });
      console.log(response);
      return response;
    } catch (err) {
      console.error(err);
    }
    return null;
  };

  const getFavorites = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/account/${accountDetails.id} /favorite/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&session_id=${localStorage.getItem('session')}&sort_by=created_at.asc&page=1`);
      console.log(response);
      return response.data;
    } catch (err) {
      console.error(err);
    }
    return null;
  };

  return (
    <APIContext.Provider
      value={{
        getUserToken,
        getSession,
        getTrendingShows,
        getShowDetails,
        getShowTrailer,
        getShowRating,
        getAccountDetails,
        endSession,
        markFavorite,
        getFavorites,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};
