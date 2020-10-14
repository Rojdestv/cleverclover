import React, { useState, createContext } from "react";

export const LeagueContext = createContext();

export const CurrentLeagueProvider = props => {
    const [currentLeague, setLeague] = useState('');
  
    return (
      <LeagueContext.Provider value={[currentLeague, setLeague]}>
        {props.children}
      </LeagueContext.Provider>
    );
  };

