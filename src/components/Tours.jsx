import React, { useEffect ,useState } from 'react';
import Navbar from "./Navbar";
import Tabs from "./Tabs";

function Tours(){
    const [searchText, setSearchText] = useState(null);

    return(
        <>
            <Navbar setGlobalSearchText={setSearchText}/>
            <Tabs searchText={searchText}/>
        </>
    );
}

export default Tours;