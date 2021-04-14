import { AppContextProvider } from "./context/AppContext";
import React from "react";
import {
  ClubSelector,
  DateBanner,
  ClubDetails,
  CrimeTable,
} from "./components";

function App() {
  return (
    <div className="bg-gray-50">
      <header />
      <AppContextProvider
        children={
          <div>
            <ClubSelector />
            <div className="w-screen">
              <DateBanner />
              <div className="h-screen overflow-y-hidden overflow-y-scroll">
                <ClubDetails />
                <CrimeTable />
              </div>
            </div>
          </div>
        }
      ></AppContextProvider>
    </div>
  );
}

export default App;
