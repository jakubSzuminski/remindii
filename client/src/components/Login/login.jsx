import { login } from '../../actions/auth';

const Login = () => {
    return (
        <div id="login-container">
            <h2>Logowanie</h2>
            <p className="mb-1">Zostaniesz przekierowany na stronę Google aby się zalogować.</p>
            <p className="mb-2">Poprosimy Cię o danie uprawnień do czytania wydarzeń z kalendarza.</p>

            <button id="google-button" onClick={login}>
                <div>
                    <img src="visuals/googleicon.png"/>
                </div>
                
                <p>Zaloguj się przez Google</p>
            </button>
        </div>
    )
}

export default Login;