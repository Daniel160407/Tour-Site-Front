import React from "react";

function Navbar(){
    return(
        <nav id="navtab">
            <a href="#" onClick={"loadHomePage()"}>Home</a>
            <a href="#" onClick={"loadAboutPage()"}>About</a>
            <a href="#" onClick={"loadContactPage()"}>Contact</a>
        </nav>
    );
}

export default Navbar;