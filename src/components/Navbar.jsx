import '../style/navbar.scss';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid d-grid justify-content-center">
                <ul className="nav nav-tabs">
                    <li className="nav-item" key={'home'}><a className="nav-link active" data-toggle="tab" href="#home">Home</a></li>
                    <li className="nav-item" key={'contact'}><a className="nav-link" data-toggle="tab" href="#contact">Contact</a></li>
                </ul>
                <div className='navbar-brand'>
                    <span className="title">Georgia & Tours</span>
                </div>
                <div>
                    <select id='language'>
                        <option>ENG</option>
                        <option>RUS</option>
                    </select>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;