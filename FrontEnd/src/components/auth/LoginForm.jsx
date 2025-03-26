import { useState } from 'react';
import LoginUser from '../../scripts/Auth';
import '../../Styles/Auth.css';

export default function LoginForm({ onSwitchToRegister, loginSucces}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function VerifySucces(e){
        e.preventDefault()
        console.log("On verifie le succées")
        const result = await LoginUser(username, password, e)
        if (result !== false){
            setError("Nom d'utilisateur ou mot de passe incorect") 
        }
        else{
            loginSucces(result)
        }

    }

    return (
        <div className='auth-container'>
            <div className='auth-card'>
                <h2> Connexion </h2>
                <form onSubmit={VerifySucces}>
                {error && <div className="error-message">{error}</div>}
                    <div className='form-group'>
                        <label htmlFor='username'>Nom d'utilisateur</label>
                        <input
                            type='text'
                            id='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='password'> Mot de passe</label>
                        <input
                            type='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                    </div>

                    <button type='submit' className='auth-button'>
                         Se connecter
                    </button>
                </form>

                <div className='auth-footer'>
                    <p>Pas encore de compte ?</p>
                    <button onClick={onSwitchToRegister} className='switch-button'>
                        S'inscrire
                    </button>
                </div>
            </div>
        </div>
    );
}

