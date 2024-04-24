import '/src/style/adminpanel/navbarAdmin.scss';

function NavbarAdmin(){
    return(
        <div id='navbar'>
            <ul className="nav admin-nav-tabs">
                <li className="nav-item" key={'home'}><a className="nav-link active" data-toggle="tab" href="#tours">Tours</a></li>
                <li className="nav-item" key={'vehicles'}><a className="nav-link" data-toggle="tab" href="#vehicles">Vehicles</a></li>
                <li className="nav-item" key={'contact'}><a className= "nav-link" data-toggle="tab" href="#contact">Contact</a></li>
            </ul>
        </div>
        
    );
}

export default NavbarAdmin;