# BSC Messenger

Le but du projet est de développer une messagerie chiffrée de bout en bout en Python.

## Technologies utilisées

### Backend

#### Librairies Python

- `cryptography` : pour pouvoir gérer le hash des mots de passe
- `logging` et `colorlog` : pour la gestion des logs de manière plus précise et visuelle
- `SqlAlchemy` : utilisation d'un ORM pour simplifier la gestion de la base de données et nous permettre de travailler
avec des objets
- `sqlacodegen` : pour pouvoir faire de la rétro-ingénierie sur la base de données afin de récupérer les modèles sous forme d'objets, à utiliser avec SqlAlchemy

### FrontEnd

#### Framework et librairies JavaScript

- `React` : possibilité de travailler avec des composants, et de disposer des nombreuses librairies disponibles
- `Vite` : pour pouvoir créer facilement et rapidement un projet React, avec un serveur de développement au démarrage ultra rapide qui ne recharge que les modules modifiés
- `Window.crypto` : permet de pouvoir gerer le RSA coté Frontend


### Base de données

- Utilisation de **MySQL**, car c'est un SGBD que nous connaissons bien et qui utilise le langage SQL que nous maîtrisons 
mieux que le `NoSQL`.

- Pour le stockage local, nous utilisons l'**IndexedDb** qui est une base de données `NoSQL` directement intégré dans le navigateur. Afin d'avoir un stockage local resistant au vide du cache

### Algorithmes de chiffrement et salage

- `SHA-256` : pour le hachage des mots de passe, car c'est une méthode robuste qui a fait ses preuves
- `os.urandom` : pour générer un sel aléatoire plus difficile à *reverse engineer* qu'une simple librairie Python comme *Random*
- `RSA` : alogrithme de chiffrement se basant sur un principe de pairs de clée (public/privé) afin de garantir l'intégrité et la confidentialité dans l'échange de données

### Technique mise en place

#### Long Polling Request

Il s'agit d'une technique JS se basant sur la récusivité, nous permetant d'avoir une communication qusi instanté avec le serveur sans le bombardé de requetes. Elle consite a garder la connexion ouverte avec le serveur peandant un certain laps de temps (30sec/1min) pour verifié si il n'y a pas de nouvelle données et quand la connexion se ferme, on relance immediatement une demande.
##### _Exemple_
```js
export default async function LongPollingrequest(){
const response = await fetch("http://api/toutLesMessages")
    
        if(response.status === 200){
            const data = await response.json()
            setMessage(data)
                
            await new Promise(resolve => setTimeout(resolve,500))
            await LongPollingrequest()
        }
        else{
            await new Promise(resolve => setTimeout(resolve,1000))
            await LongPollingrequest()
        
        }
}
    
```

## Mise en place

### Backend
1) Installer les dépendances 

Pour installer les dépendances Python requises, placez-vous dans le sous-dossier `Backend` et exécutez la ligne de commande suivante :
```bash
pip install -r requirements.txt
```

2) Création de la base de données

Vous devez créer une base de données avec le schéma présent dans `Backend/BDD/bdd.sql`.

3) Configuration des variables de l'application

Vous trouverez un fichier `variables-example.json` qui est un modèle des variables à renseigner pour le bon fonctionnement de l'application. Il vous suffira de remplir le fichier avec vos variables et de le renommer en `variables.json`.

### FrontEnd

1) Installer les dépendances

Placez-vous dans le dossier `Frontend` puis exécutez la commande suivante :
```bash
npm install
```

2) Lancer le serveur de développement

Pour lancer le serveur de développement, exécutez la commande suivante :
```bash
npm run dev
```
