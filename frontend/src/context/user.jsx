import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userToken, setUserToken] = useState();

  return (
    <UserContext.Provider value={{ userToken, setUserToken }}>{children}</UserContext.Provider>
  )

};