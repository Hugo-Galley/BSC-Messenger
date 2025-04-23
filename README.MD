# Phantom
Le but du projet est de développer une messagerie chiffrée de bout en bout en Python.

## Technologies utilisées

### Backend

Le backend sera une API en Python, permettant de faire communiquer le _Frontend_ et la _Base de données_.

### Doc autogénéré de l'API

Pour acceder a la doc autogenér de l'api, il vous suffit d'aller l'adresse suivante :
[http://localhost:8000/docs]("http://localhost:8000/docs") ou sur celle la [http://127.0.0.1:8000/redoc]("http://127.0.0.1:8000/redoc")

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

## Méthode 1 (Recommandé)

### Docker
1) Modifications sur l'indicateur de type de fin de ligne
Dans `VsCode` sur le fichier `wait-for-it.sh`
En bas à droite, cliquez sur l'indicateur de type de fin de ligne (probablement "CRLF").
Changez-le en "LF".
L'application fonctionne grâce à des conteneurs `Docker`, ce qui permet un déploiement facile et une exécution sur n'importe quelle machine.  
Pour cela, installez [Docker](https://www.docker.com/get-started/), placez-vous à la racine du projet, puis lancez la commande suivante :
```bash
docker-compose up --build
```

Pour accéder à l'application, rendez-vous à l'adresse suivante :  
```
http://localhost:5173
```

## Méthode 2

### Backend
 1) Installer **Python**
    Pour pouvoir lancer le backend il vous faudra installer _Python_. Vous pouvez le faire via se lien : [Python]("https://www.python.org/downloads/")
 
 2) Installer les dépendances 
   Pour installer les dépendances Python requises, placez-vous dans le sous-dossier `Backend` et exécutez la ligne de commande suivante :
```
 pip install -r requirements.txt
 ```
) Création de la base de données
 
 Vous devez créer une base de données avec le schéma présent dans `Backend/BDD/bdd.sql`.
 
 4) Configuration des variables de l'application
 
 Vous trouverez un fichier `variables-example.json` qui est un modèle des variables à renseigner pour le bon fonctionnement de l'application. Il vous suffira de remplir le fichier avec vos variables et de le renommer en `variables.json`.
 
 ### FrontEnd
 1) Installer **NodeJS**
    Pour pouvoir exécuter la parti FrontEnd il vous faut installer NodeJS. Vous pouvez le faire via se lien : [NodeJS]("https://nodejs.org/fr/download")
 2) Installer les dépendances
 
 Placez-vous dans le dossier `Frontend` puis exécutez la commande suivante :
 ```bash
 npm install 
 ```
3) Lancer le serveur de développement
 
 Pour lancer le serveur de développement, exécutez la commande suivante :
 ```bash
 npm run dev
 ```
