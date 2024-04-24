import axios from 'axios';
import '/src/style/adminpanel/login.scss';
import NavbarAdmin from './NavbarAdmin';
import root from '../../script/root';
import Content from './Content';

function LogIn(){
    function handleKeyPress(event){
        if(event.key === 'Enter'){
            const admin = {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            }
            axios.post('http://localhost:8080/tours/adminpanel/login', admin)
            .then(response => {
                if(response.status===200){
                    root.render(
                        <>
                            <NavbarAdmin/>
                            <Content/>
                        </>
                    );
                    document.getElementById('root').style='display: flex; height: 700px; justify-content: center; gap: 50px;';
                } else {
                    //TODO: add error message
                }
            });
        }
    }

    return(
        <div id="login">
            <div>
                <h1>Log In</h1><br/>
                <input id='email' type='email' placeholder='Write your email' onKeyPress={handleKeyPress}></input>
                <input id='password' type='password' placeholder='Write your password' onKeyPress={handleKeyPress}></input>
            </div>
        </div>
    );
}

export default LogIn;