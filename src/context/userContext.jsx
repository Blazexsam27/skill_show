import { createContext, useContext } from "react";
import { useReducer } from "react";
import reducer from "../reducer/userReducer";

const UserContext = createContext();

const initialState = {
  userDetails: {},
  userTechStack: [],
};
const UserProvider = ({ children }) => {
  const apiUrl = "https://cache.showwcase.com/user/";
  const API_KEY = import.meta.env.VITE_SHOWCASE_API;
  const [state, dispatch] = useReducer(reducer, initialState);

  const getUserDetails = async (username) => {
    const userDetails = await fetch(`${apiUrl}/${username}`, {
      method: "GET",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
    });
    const parsedUserDetails = await userDetails.json();
    dispatch({ type: "SET_USER_DETAILS", payload: parsedUserDetails });
    const response = await fetch(`${apiUrl}/${username}/stacks`, {
      method: "GET",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
    });
    const userTechStack = await response.json();
    dispatch({ type: "SET_USER_TECH_STACK", payload: userTechStack });
    return { userTechStack, parsedUserDetails, status: true };
  };

  return (
    <UserContext.Provider value={{ ...state, apiUrl, getUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
