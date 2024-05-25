import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Content from "./Content";

const AdminPanelApp = () => {
    const [searchText, setSearchText] = useState(null);

    return (
        <>
            <Navbar setGlobalSearchText={setSearchText} />
            <Content searchText={searchText} />
        </>
    );
}

export default AdminPanelApp;