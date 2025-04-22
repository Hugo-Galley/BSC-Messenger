# Test mis en place pour verifier le bon fonctionement de l'application

# Test de création de User (verification hash + sallage)

Vérifier que la création d’un utilisateur fonctionne correctement et que le mot de passe est bien sécurisé dans la base de données.

On commence avec une base de données vide:

[images de debut avec la base vide](images/creationvide.png)

On crée un utilisateur via l’application :

[Creation d'un utilisateur sur l'app](images/creationutilisateur.png)

On vérifie dans la BDD que l’utilisateur a bien été ajouté et que le mot de passe est stocké sous forme hashée et salée

[Creation d'un utilisateur dans la BDD](images/creationDB.png)

# Test d'envoie de messages sur la base de données, Test reception message en instantané

Vérifier que l’envoi de messages fonctionne, que le message est bien chiffré en base, et que la réception est instantanée côté destinataire.

On vérifie que la table des messages est vide au départ 

[Table message vide](images/tablemessage.png)

On envoie un message à un autre utilisateur via l’application 

[Table message envoie](images/msgenvoyer.png.png)

On constate que le message est bien chiffré dans la BDD et que l’autre utilisateur le reçoit en temps réel 

[Table message envoie](images/envoiemsgbdd.png)


# Test d'envoie de contenu autre que texte

Vérifier que l’application permet d’envoyer des fichiers (images, PDF) et de les télécharger.


On envoie une photo via l’application et on vérifie son enregistrement dans la BDD

[Table message envoie](images/envoiephoto.png)

On envoie un PDF et on vérifie également son enregistrement

[Table message envoie](images/envoiePDF.png)

On teste la fonctionnalité de téléchargement du PDF 

[Table message envoie](images/TelechargementPDF.png)






