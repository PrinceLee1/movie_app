import axios from "axios";
import { apiKey } from "../constants";

{ /*endpoint*/ }
const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;

// dynamic endpoints
const movieDetailsEndpoint = id=> `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = id=> `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = id=> `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;


const castDetailsEndpoint = id=> `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
const castMoviesEndpoint = id=> `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;




export const image500 = path=> path? `https://image.tmdb.org/t/p/w500/${path}` : null;
export const image342 = path=> path? `https://image.tmdb.org/t/p/w342/${path}` : null;
export const image185 = path=> path? `https://image.tmdb.org/t/p/w185/${path}` : null;

export const fallbackMoviePoster = "https://img.freepik.com/premium-psd/double-exposure-movie-poster-design_528542-1319.jpg?w=826";
export const fallbacPersonImage = "https://img.favpng.com/22/14/20/computer-icons-user-profile-png-favpng-t5jjbVtARafBFMz6SeBYs6wmS.jpg";


const apiCall = async (endpoint, params) => {

    const options = {
        method: 'GET',
        url: endpoint,
        params: params? params: {},
    }
    try {
        const response = await axios
        .request(options)
        return response.data;
    } catch (error) {
        console.log('error', error);
        return {}
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint);
}

export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint);
}

export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint);
}

export const fetchMovieDetails = id => {
    return apiCall(movieDetailsEndpoint(id));
}

export const fetchMovieCredits = id => {
    return apiCall(movieCreditsEndpoint(id));
}

export const fetchSimilarMovies = id => {
    return apiCall(similarMoviesEndpoint(id));
}

export const fetchCastDetails = id => {
    return apiCall(castDetailsEndpoint(id));
}

export const fetchCastMovies = id => {
    return apiCall(castMoviesEndpoint(id));
}

export const searchMovie = params => {
    return apiCall(searchMoviesEndpoint,params);
}