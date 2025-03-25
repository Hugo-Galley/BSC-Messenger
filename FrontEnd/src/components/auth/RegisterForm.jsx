import { useState} from 'react';
import '../../Styles/Auth.css';

export default function RegisterForm({ onSwitchToLogin, onRegisterSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        setIsLoading(true);

        try {
            console.log('Envoi des données:', { username, password });
            
            const response = await fetch('http://localhost:8000/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });
            
            console.log('Status de la réponse:', response.status);
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Réponse du serveur:', data);
            
            // Vérifiez les deux possibilités (exist ou exists)
            if (data.exist === "true" || data.exists === "true") {
                setError('Ce nom d\'utilisateur existe déjà');
            } else {
                onRegisterSuccess();
                onSwitchToLogin();
            }
        } catch (error) {
            console.error('Erreur détaillée:', error);
            setError(`Erreur lors de l'inscription: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='auth-container'>
            <div className='auth-card'>
                <h2>Inscription</h2>
                <form onSubmit={handleSubmit}>
                    {error && <div className='error-message'>{error}</div>}

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

                        <div className='form-group'>
                            <label htmlFor='confirmPassword'>Confirmer le mot de passe</label>
                            <input
                                type='password'
                                id='confirmPassword'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type='submit' className='auth-button' disabled={isLoading}>
                            {isLoading ? 'inscription...' : 'S\'inscrire'}
                        </button>
                </form>

                <div className='auth-footer'>
                    <p>Déjà un compte ?</p>
                    <button onClick={onSwitchToLogin} className='switch-button'>
                        Se connecter
                    </button>
                </div>
            </div>
        </div>
    );
}




