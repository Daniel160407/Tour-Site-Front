import '../style/navbar.scss';

function Navbar(){
    return(
        <ul className="nav nav-tabs">
            <li className="nav-item" key={'home'}><a className="nav-link active" data-toggle="tab" href="#home">Home</a></li>
            <li className="nav-item" key={'vehicles'}><a className="nav-link" data-toggle="tab" href="#vehicles">Vehicles</a></li>
            <li className="nav-item" key={'contact'}><a className="nav-link" data-toggle="tab" href="#contact">Contact</a></li>
        </ul>
    );
}

export default Navbar;