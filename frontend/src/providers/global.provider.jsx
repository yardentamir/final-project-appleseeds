import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [user, setUser] = useState();
  const [cities, setCities] = useState();

  useEffect(() => {
    const getCities = async () => {
      const { data } = await axios.get("https://raw.githubusercontent.com/GabMic/israeli-cities-and-streets-list/master/israel_cities_names_and__geometric_data.json");
      const arrayOfCities = [].concat.apply([], data.map(item => item.name));
      setCities(arrayOfCities);
    }
    getCities();
  }, []);


  return (
    <GlobalContext.Provider value={{ user, setUser, cities }}>{children}</GlobalContext.Provider>
  )

};