# MSC Messenger

Le but du projet est de developer une messagerie chiffrée de bout en bout en python.

## Technologies utilisées

### Librairies Python

- `cryptography`: pour pouvoir gérer le chiffrement RSA et le hash des mots de passes
- `logging` et `colorlog` : Pour la gestion des logs de manière plus precise et visuelle
- `customtkinter` : 
- `mysql.connector` : pour nous permettre de communiquer avec notre base de données
### Database

Utilisations de _*`Mysql`*_ , car c'est un SGBD que l'on connait bien, et que celui-ci utilise du SQL que l'on maitrise 
beaucoup mieux que le `NO-SQL`

### Alorithmes de chiffrement et sallage

- `Sha256` : pour le hachage des mots de passes, car c'est une méthode robuste qui a fait ses preuves.
- `os.urandom` : pour generer un sel aléatoire plus difficile a _*reverse engienere*_ qu'une simple librairie python tel _Random_ 