/* eslint-disable no-case-declarations */

const Reducer = (state, action) => {
    switch(action.type) {
        case "GET_LOADING":
            return {
                ...state,
                isLoading: true,
            };
        case "GET_STORIES":
            return {
                ...state,
                isLoading: false,
                hits: action.payload.hits,
                nbPages: action.payload.nbPages,
            };

        case "REMOVE_POST" :
            return {
                ...state,
                hits: state.hits.filter((curElem) => curElem.objectID != action.payload)
            };
            
        case "SEARCH_QUERY" :
            return {
                ...state,
                query: action.payload,
            }; 
            
        case "GET_NEXT" :
           let pageNumInc = state.page + 1;

           if (pageNumInc >= state.nbPages) {
             pageNumInc = 0;
           }
           return {
            ...state,
            page: state.page + 1,
           };
        
           case "GET_PREV":
            let pageNum = state.page - 1;

            if (pageNum <= 0) {
                pageNum = 0;
            }
            return {
             ...state,
             page: pageNum,
            };   
        
    }

   return state
};

export default Reducer;