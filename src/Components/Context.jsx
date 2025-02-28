import React from "react";
import { useReducer } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import  Reducer from "./Reducer.jsx";



let API = "http://hn.algolia.com/api/v1/search?";


const initialState = {
    isLoading: true,
    query: "HTML",
    nbPages: 0,
    page: 0,
    hits: [],
};

const AppContext = React.createContext();

const AppProvider = ({children}) => {

const [state, dispatch] = useReducer(Reducer,initialState);

const fetchAPI = async (url) => {

    dispatch({type: "GET_LOADING"});

    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        dispatch({
         type: "GET_STORIES",
         payload : {
            hits: data.hits,
            nbPages: data.nbPages,
         },
        });
        
    } catch (error) {
        console.log(error)
    }
};

//to remove post
const removePost = (postID) => {
  dispatch({type: "REMOVE_POST", payload: postID})
};


//to search post
const searchPost = (searchQuery) => {
 dispatch({
    type: "SEARCH_QUERY", 
    payload: searchQuery,
});
};

//Pagination
const getNextPage = () => {
    dispatch({
        type: "GET_NEXT"
    });
};

const getPrevPage = () => {
    dispatch({
        type: "GET_PREV"
    });
};


//to call API
useEffect(() => {
    fetchAPI(`${API}query=${state.query}&page=${state.page}`);
},[state.query,state.page]);

    return (
        <AppContext.Provider value={{...state, removePost, searchPost, getNextPage, getPrevPage}}>
            {children}
        </AppContext.Provider>
    );
};

const useGlobleContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider, useGlobleContext};