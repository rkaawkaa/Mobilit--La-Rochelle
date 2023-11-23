# Documentation Projet Mobilité Alternative

*Par KAWKA Robin &  HURDEBOURCQ Romain*

Vous pouvez trouver ce site sur le lien suivant : ** https://mobilite-la-rochelle.netlify.app/ **

## 1. Introduction

Ce projet a pour but d'aider et d'inciter les citoyens de la Rochelle à utiliser des modes de transports alternatifs qui soient plus respectueux de l'environnement et de la planète en délaissant des moyens de transports plus carbonés. 
Ainsi, grace à notre web app, l'utilisateur pourra : 
* Se géolocaliser avec précision
* Voir les stations de vélos et afficher des informations complémentaires au clic comme le nombre d'accroches et le nombre de vélos disponibles.
* Voir les arrêts de bus et afficher les horaires des prochains bus au clic sur un arrêt.
* Voir les prochains trains aux départs des gares SNCF et afficher le trajet d'un voyage particulier sur la carte et en afficher les différents arrêts et horaires pour un voyage.

## 2. Exemple d'une expérience utilisateur

### 1. Géolocalisation de l'utilisateur

[geoloc](./images/doc-image/utilisateur1.PNG)
[geoloc](./images/doc-image/utilisateur2.PNG)

### 2. Affichage des stations de vélos et des informations

Comme pour les arrêts de bus, les stations de vélos proches de l'utilisateur sont affichés en plus grand sur la carte pour une meilleure expérience.<br><br>
[station de velo](./images/doc-image/velo1.PNG)<br>
[popup velo](./images/doc-image/velo2.PNG)<br>


### 3. Affichage des arrêts de bus et des horaires

[arret bus](./images/doc-image/bus1.PNG)<br>
[affichage arrêts](./images/doc-image/bus2.PNG)<br>
[affichage arrêts](./images/doc-image/bus3.PNG)<br>
<br>
Pour chaque informations, il y'a possibilité de fermer la fenêtre : <br>
[popupclose](./images/doc-image/pop1.PNG)<br>

### 4. Affichage des gares et des départs

Pour la gare de la Rochelle: <br>
[gare La Rochelle](./images/doc-image/gare1.PNG)<br>
[train vers Poitiers](./images/doc-image/trainPoitiers.PNG)<br>
[trajet vers Poitiers](./images/doc-image/trajetPoitiers.PNG)<br><br>
Pour la gare de Porte Dauphine : <br>
[gare Porte Dauphine](./images/doc-image/gare2.PNG)<br>
[train Saintes](./images/doc-image/trainSaintes.PNG)<br>

Pour une meilleure lisibilité, la gare de départ (Porte Dauphine ou La Rochelle) est mise en rouge dans la liste des arrêts pour le trajet.

### 5. Toasts notifications et responsiveness

Pour une bonne expérience, le site s'adapte aux différents terminaux. <br>
[responsive](./images/doc-image/responsive1.png)<br>
<br>
Des notifications sont envoyés à l'utilisateur à la suite de certains de ses actions :<br>
[toast](./images/doc-image/toast1.png)

## 3. Conclusion et futur de l'application

Le code a été construit pour être maintenable et facilement évolutif. On pourrait le transformer en du code orienté objet avec une classe chargée uniquement de faire les appels API, une classe pour la transformation et la formatage des données et une classe pour l'affichage de ces données. Une classe pour les fonctions utilitaires pourrait être crée également.<br><br>
Cette application pourrait développer plus de fonctionnalités dans le futur: affichage des trajets de bus et affichage des prochains arrivées des trains en sont deux bons exemples.

