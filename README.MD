# MSC Messenger

Le but du projet est de developer une messagerie chiffrée de bout en bout en python.

## Technologies utilisées

### Backend

#### Librairies Python

- `cryptography`: pour pouvoir gérer le chiffrement RSA et le hash des mots de passes
- `logging` et `colorlog` : Pour la gestion des logs de manière plus precise et visuelle
- `customtkinter` : 
- `SqlAlchemy` : Utilisation d'un ORM, pour simplifier la gestion de la base de données et nous permettre de travailler
avec des objets
- `sqlacodegen` : Pour pouvoir faire de *la rétro ingénierie* sur la base de données afin de recuperer les models de la base de 
données sous forme d'objet, a utilisé avec SqlAlchemy

### FrontEnd

#### Framework Javascript

- `React`: possibilité de travaillé avec les composants, et possibilité de disposé des nombreuses librairies disponibles
- `Vite` : pour pouvoire crée facilement et rapidement un projet React, et ajout d'un server de development et un démarrage ultra rapide, et ne recharge uniquement les modules changés 

### Database

Utilisations de _*`Mysql`*_ , car c'est un SGBD que l'on connait bien, et que celui-ci utilise du SQL que l'on maitrise 
beaucoup mieux que le `NO-SQL`

### Alorithmes de chiffrement et sallage

- `Sha256` : pour le hachage des mots de passes, car c'est une méthode robuste qui a fait ses preuves.
- `os.urandom` : pour générer un sel aléatoire plus difficile à _*reverse engienere*_ qu'une simple librairie python tel _Random_ 