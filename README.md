# Documentation Projet Mobilité Alternative

*Par KAWKA Robin &  HURDEBOURCQ Romain*
<br>
Vous pouvez trouver ce site sur le lien suivant : **https://mobilite-la-rochelle.netlify.app/**<br>
**Remarque : Le site fait des appels API sur les sites de La Rochelle uniquement. Il ne fonctionne donc que si vous vous localisez à La Rochelle ou bien si vous y allez via la carte manuellement.**

## 1. Introduction

Ce projet a pour but d'aider et d'inciter les citoyens de la Rochelle à utiliser des modes de transports alternatifs qui soient plus respectueux de l'environnement et de la planète en délaissant des moyens de transports plus carbonés. 
Ainsi, grace à notre web app, l'utilisateur pourra : 
* Se géolocaliser avec précision
* Voir les stations de vélos et afficher des informations complémentaires au clic comme le nombre d'accroches et le nombre de vélos disponibles.
* Voir les arrêts de bus et afficher les horaires des prochains bus au clic sur un arrêt.
* Voir les prochains trains aux départs des gares SNCF et afficher le trajet d'un voyage particulier sur la carte et en afficher les différents arrêts et horaires pour un voyage.

## 2. Exemple d'une expérience utilisateur

### 1. Géolocalisation de l'utilisateur

<img width="311" alt="utilisateur1" src="https://github.com/rkaawkaa/Mobilit--La-Rochelle/assets/88223901/c1367990-9445-4dda-944f-3aa9822c8898"><br><br>
<img width="206" alt="utilisateur2" src="https://github.com/rkaawkaa/Mobilit--La-Rochelle/assets/88223901/1f22a8c7-4780-41c7-9835-fa916db585c4">


### 2. Affichage des stations de vélos et des informations

Comme pour les arrêts de bus, les stations de vélos proches de l'utilisateur sont affichés en plus grand sur la carte pour une meilleure expérience.<br><br>
<img width="399" alt="velo1" src="https://github.com/rkaawkaa/Mobilit--La-Rochelle/assets/88223901/a2a9f4ec-e087-4a42-952f-769d83eaea63"><br><br>
<img width="194" alt="velo2" src="https://github.com/rkaawkaa/Mobilit--La-Rochelle/assets/88223901/f313806a-d75c-4e0a-b04d-c4fcf054daf1"><br>



### 3. Affichage des arrêts de bus et des horaires

<img width="367" alt="bus1" src="https://github.com/rkaawkaa/Mobilit--La-Rochelle/assets/88223901/3f06dac1-28e3-4a09-a880-403ad2de3db3">
<br><br>
<img width="515" alt="bus2" src="https://github.com/rkaawkaa/Mobilit--La-Rochelle/assets/88223901/2acc2a78-3d83-43c7-b478-e5c861eafd0f">
<br><br>
<img width="458" alt="bus3" src="https://github.com/rkaawkaa/Mobilit--La-Rochelle/assets/88223901/6afa19ab-4091-4cf8-97bf-8afd7f3ea1e2">
<br>
<br>
Pour chaque informations, il y'a possibilité de fermer la fenêtre : <br>
<img width="284" alt="pop1" src="https://github.com/rkaawkaa/Mobilit--La-Rochelle/assets/88223901/c9d2eaab-199f-4051-a22f-841f7df5ac1e">
<br>

### 4. Affichage des gares et des départs

Pour la gare de la Rochelle: <br>
<img width="211" alt="gare1" src="https://github.com/rkaawkaa/Mobilit--La-Rochelle/assets/88223901/3a835b88-e575-492f-b514-250eddcb89db">
<br><br>
[train vers Poitiers](./images/doc-image/trainPoitiers.PNG)<br>
<img width="218" alt="trainPoitiers" src="https://github.com/rkaawkaa/Mobilit--La-Rochelle/assets/88223901/28a0fb97-06af-41ba-931d-6b93026e20ab">
<br><br>
Pour la gare de Porte Dauphine : <br>
<img width="226" alt="gare2" src="https://github.com/rkaawkaa/Mobilit--La-Rochelle/assets/88223901/f5d5d75f-165b-4b9e-8b5a-dfb04566dc50">
<br><br>
<img width="288" alt="trainSaintes" src="https://github.com/rkaawkaa/Mobilit--La-Rochelle/assets/88223901/c6beb493-399c-4c1a-a3d1-7a28068ebde5">
<br><br>

Pour une meilleure lisibilité, la gare de départ (Porte Dauphine ou La Rochelle) est mise en rouge dans la liste des arrêts pour le trajet.

### 5. Toasts notifications et responsiveness

Pour une bonne expérience, le site s'adapte aux différents terminaux. <br>
<img width="290" alt="responsive1" src="https://github.com/rkaawkaa/Mobilit--La-Rochelle/assets/88223901/d6951328-62f0-4e45-8e94-6eb43fcef039">
<br>
<br>
Des notifications sont envoyés à l'utilisateur à la suite de certains de ses actions :<br>
<img width="353" alt="toast1" src="https://github.com/rkaawkaa/Mobilit--La-Rochelle/assets/88223901/c51f8055-664f-4882-93ef-c48f48b3016f">.


## 3. Conclusion et futur de l'application

Le code a été construit pour être maintenable et facilement évolutif. On pourrait le transformer en du code orienté objet avec une classe chargée uniquement de faire les appels API, une classe pour la transformation et la formatage des données et une classe pour l'affichage de ces données. Une classe pour les fonctions utilitaires pourrait être crée également.<br><br>
Cette application pourrait développer plus de fonctionnalités dans le futur: affichage des trajets de bus et affichage des prochains arrivées des trains en sont deux bons exemples.

