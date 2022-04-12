import React, { createContext, useEffect, useReducer } from "react";
export const StoreContext = createContext();

const initialState = {
  favorites: [],
  isOpenMenu: false,
  with_keywords: "",
};

const storeReducer = (state, action) => {
  let movieId;
  switch (action.type) {
    case "INITIALIZATION":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case "TOGGLE_FAVORITES":
      movieId = action.payload;
      const found = state.favorites.includes(movieId);
      if (!found) {
        state.favorites = [...state.favorites, movieId];
        window.localStorage.setItem(
          "favorite",
          JSON.stringify(state.favorites)
        );
      } else {
        state.favorites = state.favorites.filter((movie) => movie !== movieId);
        window.localStorage.setItem(
          "favorite",
          JSON.stringify(state.favorites)
        );
      }
      return { ...state };
    case "TOGGLE_MENU": {
      return { ...state, isOpenMenu: !state.isOpenMenu };
    }
    case "SET_SEARCH": {
      return {
        ...state,
        with_keywords: action.payload,
      };
    }
    default:
      return state;
  }
};

function StoreContextProvider({ children }) {
  const [favorites, dispatch] = useReducer(storeReducer, initialState);

  useEffect(() => {
    const favorite = JSON.parse(window.localStorage.getItem("favorite"));
    if (favorite) {
      dispatch({
        type: "INITIALIZATION",
        payload: favorite,
      });
    }
  }, []);

  const toggleFavorite = (id) => {
    dispatch({ type: "TOGGLE_FAVORITES", payload: id });
  };

  const toggleMenu = () => {
    dispatch({ type: "TOGGLE_MENU" });
  };

  const setSearchKeyWords = (keywords = "") => {
    dispatch({
      type: "SET_SEARCH",
      payload: keywords,
    });
  };
  return (
    <StoreContext.Provider
      value={{ ...favorites, toggleMenu, toggleFavorite, setSearchKeyWords }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export default StoreContextProvider;
