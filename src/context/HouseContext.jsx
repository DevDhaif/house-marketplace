import { createContext,useState } from "react";

export const HouseContext = createContext();

export const HouseProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState([]);

    return (
        <HouseContext.Provider value={{ searchResults, setSearchResults }}>
            {children}
        </HouseContext.Provider>
    )
}