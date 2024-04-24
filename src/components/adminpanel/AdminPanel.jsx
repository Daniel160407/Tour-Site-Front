import LogIn from "./LogIn";
import NavbarAdmin from "./NavbarAdmin";
import '/src/style/adminpanel/adminpanel.scss';

function AdminPanel(){
    return (
        <div id="adminpanel">
            <LogIn/>
        </div>
    );
}

export default AdminPanel;