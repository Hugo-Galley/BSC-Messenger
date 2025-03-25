import { useState } from 'react';
import '../../Styles/Auth.css';

export default function LoginForm({ onSwitchToRegister, onLoginSuccess}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading]= useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            console.log('Tentative de connexion avec:', { username, password });
            
            // Remplacer la requête GET par une requête POST avec le corps
            const response = await fetch('http://localhost:8000/users/auth/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });
            
            console.log('Statut de la réponse:', response.status);
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Réponse du serveur:', data);

            if (data.authorize === "true") {
                // Utiliser aussi une requête POST pour récupérer les données utilisateur
                const userResponse = await fetch('http://localhost:8000/users/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                    }),
                });
                
                const userData = await userResponse.json();
                console.log('Données utilisateur récupérées:', userData);

                localStorage.setItem('user', JSON.stringify({
                    id: userData.id,
                    username: userData.username,
                }));

                onLoginSuccess(userData);
            } else {
                setError('Nom d\'utilisateur ou mot de passe incorrect');
            }
        } catch (error) {
            console.error('Erreur détaillée:', error);
            setError(`Erreur de connexion: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='auth-container'>
            <div className='auth-card'>
                <h2> Connexion </h2>
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

                    <button type='submit' className='auth-button' disabled={isLoading}>
                        {isLoading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>

                <div className='auth-footer'>
                    <p>Pas encoe de compte ?</p>
                    <button onClick={onSwitchToRegister} className='switch-button'>
                        S'inscrire
                    </button>
                </div>
            </div>
        </div>
    );
}

