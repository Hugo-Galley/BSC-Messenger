# Phantom
Le but du projet est de développer une messagerie chiffrée de bout en bout en Python.

## Technologies utilisées

### Backend

Le backend sera une API en Python, permettant de faire communiquer le _Frontend_ et la _Base de données_.

#### Librairies Python

- `cryptography` : pour gérer le hash des mots de passe.
- `logging` et `colorlog` : pour une gestion des logs plus précise et visuelle.
- `SqlAlchemy` : ORM simplifiant la gestion de la base de données et permettant de travailler avec des objets.
- `sqlacodegen` : pour la rétro-ingénierie de la base de données afin de récupérer les modèles sous forme d'objets, à utiliser avec SqlAlchemy.
- `FastAPI` : pour créer une API avec différentes routes afin de faire communiquer le _Frontend_ avec la _Base de données_.

### Frontend

#### Framework et librairies JavaScript

- `React` : permet de travailler avec des composants et de profiter de nombreuses librairies.
- `Vite` : facilite la création rapide d'un projet React, avec un serveur de développement très rapide qui ne recharge que les modules modifiés.

### Base de données

- Utilisation de **MySQL**, un SGBD que nous maîtrisons bien et qui utilise le langage SQL.
- Pour le stockage local, nous utilisons **IndexedDB**, une base de données `NoSQL` intégrée au navigateur, offrant un stockage local résistant à la suppression du cache.

### Algorithmes de chiffrement et salage

- `SHA-256` : pour le hachage des mots de passe, méthode robuste qui ne permet pas de retrouver la chaîne initiale, contrairement à `MD5`.
- `os.urandom` : pour générer un sel aléatoire, plus difficile à *reverse engineer* qu'une simple librairie Python comme *random*.
- `RSA` : algorithme de chiffrement basé sur une paire de clés (publique/privée) garantissant l'intégrité et la confidentialité des échanges.
- `AES-GCM` : algorithme de chiffrement symétrique (même clé pour chiffrer et déchiffrer), adapté au chiffrement de grandes quantités de données, comme les images.

### Chiffrement utilisé

Nous utilisons `AES-GCM` pour chiffrer les données, ainsi que `os.urandom` pour générer le nonce. Ensuite, `RSA` est utilisé pour envoyer les données chiffrées ainsi que la clé `AES` et son nonce, afin de permettre le déchiffrement du message à l'arrivée.

### Technique mise en place

#### Long Polling Request

Il s'agit d'une technique JavaScript basée sur la récursivité, permettant une communication quasi instantanée avec le serveur sans le surcharger de requêtes. Elle consiste à garder la connexion ouverte avec le serveur pendant un certain laps de temps (30 sec/1 min) pour vérifier s'il y a de nouvelles données. Quand la connexion se ferme, une nouvelle demande est immédiatement relancée.

##### _Exemple_
```js
async function LongPollingRequest() {
    const response = await fetch("http://api/toutLesMessages");
    if (response.status === 200) {
        const data = await response.json();
        setMessage(data);

        setTimeout(async () => {
            await LongPollingRequest();
        }, 500);
    } else {
        setTimeout(async () => {
            await LongPollingRequest();
        }, 1000);
    }
}
```

## Mise en place

### Navigateur

Attention, si vous tentez d'envoyer des messages audio de *Chrome* vers *Safari*, l'audio ne sera pas correctement transmis à cause d'une conversion mal effectuée du _WAV_ au _MPEG_ avec Chrome.

### Docker

L'application fonctionne grâce à des conteneurs `Docker`, ce qui permet un déploiement facile et une exécution sur n'importe quelle machine.  
Pour cela, installez [Docker](https://www.docker.com/get-started/), placez-vous à la racine du projet, puis lancez la commande suivante :
```bash
docker-compose up --build
```

Pour accéder à l'application, rendez-vous à l'adresse suivante :  
```
http://localhost:5173
```
