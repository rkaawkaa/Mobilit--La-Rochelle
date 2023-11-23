//A l'ouverture de la page :
//---------------------------------------------------Lancement de la carte---------------------------------------------------//

// En cas de succès, lance la carte avec les coordonnées de l'utilisateur, sinon renvoie une notification associée à un message décrivant l'erreur.
navigator.geolocation.getCurrentPosition(allow, reject);




function reject(error) {
    //Couleur rouge car message d'erreur.
    let message = "";
    const backgroundColor = "#D0342C"  
    switch(error.code){
        case 1:
            message = "Permission refusée";
            break;
        case 2:
            message = "Position non disponibe";
            break;
        case 3:
            message = "Dépassement de délai";
            break;
        case 4:
            message = "Erreur inconnue";
            break;
        }
    // Créer une alerte pour l'utilisateur.
    createToast(backgroundColor,message)
}


     //Récupère les coordonnées de l'utilisateur puis lance l'initialisation de la carte avec ces coordonnées.
function allow(position){
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    initialisationCarte(lat, lon);

} 

    // Initialise la map, l'icone utilisateur et le cercle rouge et l'affiche sur la page.
function initialisationCarte(lat, lon){
    map = L.map('map').setView([lat,lon],16)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 3,
    maxZoom: 22,
    attribution: '&copy;La Rochelle<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    createToast("rgb(255,140,0)","Cliquez sur les filtres pour afficher les moyens de transports ! :)")
    const iconeUtilisateur = L.icon({
        iconUrl: "images/street-view-solid.svg",
        iconSize:[45,45]
    })
    let marqueurUtilisateur = L.marker([lat,lon],{icon:iconeUtilisateur}).addTo(map);
    //Ajout du cercle autour de l'utilisateur
    cercleUtilisateur = cercleUtil(lat,lon,map);
    cercleUtilisateur.addTo(map);
    document.getElementById('overlay').style.display = "block"
    eventListenerFiltre();

}
let map;
let lat;
let lon;
let marqueur;
let cercleUtilisateur;
let marqueurZone;
const infos = document.getElementById('infos')


//Créer le cercle autour de l'utilisateur
function cercleUtil(lat,lon,map) {
    let cercle = L.circle([lat, lon], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.2,
        radius: 300
    });
    return cercle;
}






//---------------------------------------------------Gestion des filtres et checkbox---------------------------------------------------//
function eventListenerFiltre() {
    veloFiltre = document.getElementById('velo-filtre');
    busFiltre = document.getElementById('bus-filtre');
    gareFiltre = document.getElementById('gare-filtre');
    centrerFiltre = document.getElementById('centrerMap');

    centrerFiltre.addEventListener('click', () => 
        centrerMap())

    veloFiltre.addEventListener('click', (e) => {
        filtreCheck(e);
    });
    busFiltre.addEventListener('click', (e) => {
        filtreCheck(e);
    });
    gareFiltre.addEventListener('click', (e) => {
        filtreCheck(e);

    });
}



// Lance la bonne fonction selon le type de filtres cochés.
function filtreCheck(e) {
    filtre = e.target.name

        switch(filtre) {
            case 'velo-filtre' :
                filtreVelos(e);
                break;
            case 'bus-filtre' :
                filtreBus(e);
                break;
            case 'gare-filtre' :
                filtreGare(e);
                break;
            default:
                console.log('Vous avez cliqué sur un filtre qui est associé à rien...')
        }
}


let stockMarqueursBus = [];
let stockMarqueursVelo = [];
let stockMarqueursGare = [];






//---------------------------------------------------Velos---------------------------------------------------//
function filtreVelos(e){


    //Gere le cas où l'on vient de checker l'affichage des vélos.
    if(e.target.checked) {

     
        fetch("https://d4c.agglo-larochelle.fr/api/3/action/datastore_search?resource_id=1f124bea-d55f-457f-9eab-b7877d803435&")
                .then(response => response.json())
                .then(velos => {
                    let index = 0;   
                    //Récupère l'objet et l'index associé, on crée pour chaque station de vélo un marqueur qu'on ajoute à la map et au layer pour pouvoir les retirer si besoin.
                    for(stationVelo of velos.result.records){
                        const BikeIcon = L.icon({ iconUrl: 'images/veloicon.png',iconSize:     [25, 25]});
                        marqueur = L.marker([stationVelo.station_latitude, stationVelo.station_longitude], {icon: BikeIcon});
                        // Aggrandit les marqueurs si ceux-ci se trouvent proche de l'utilisateur
                        if(isMarkerInCircle(cercleUtilisateur,marqueur)) {
                            marqueur.options.icon.options.iconSize=[35,35]
                        } 
                        //Popup pour les vélos.
                        marqueur.bindPopup("<strong>" + stationVelo.station_nom.substring(3) + "</strong><br> Nombre accroches libres : " + stationVelo.accroches_libres + "<br> Vélos disponibles : " + stationVelo.velos_disponibles).openPopup();
                        stockMarqueursVelo.push(marqueur);
                        marqueur.addTo(map);
                        map.addLayer(stockMarqueursVelo[index]);
                        index++;
                         

                    }
                    createToast("green","Les stations de vélos ont été ajoutés à la carte.")
                })
                
     }

     //Gère le cas où l'on vient de décocher l'affichage des vélos.
    else {
        createToast("green","Les stations de vélos ont été retirés à la carte.")
        for(index in stockMarqueursVelo) {
            map.removeLayer(stockMarqueursVelo[index]);
            }  
    }

}




//---------------------------------------------------Bus---------------------------------------------------//
// Ajout des icones et des popus pour les bus et retrait de ces icones
function filtreBus(e) {
    if(e.target.checked) {
       
        fetch("https://api.agglo-larochelle.fr/production/opendata/api/records/1.0/search/dataset=transport_yelo___gtfs_stop_des_bus&rows=1517&sort=-stop_code&facet=stop_id&facet=stop_lat&facet=stop_lon&facet=stop_name&facet=stop_code")
        .then(resp => resp.json())
        .then(tousLesArrets => {
            let index = 0;
            //Création des marqueurs et des popups avec aggrandissements s'ils sont proches de l'utilisateurs
            for(arret of tousLesArrets.records) {
                const arretBusIcon = L.icon({ iconUrl: 'images/busIcon.png', iconSize: [25, 25]});
                marqueur = L.marker([arret.fields.stop_lat, arret.fields.stop_lon], {icon: arretBusIcon})
                const stopName = arret.fields.stop_name;
                const stopId = arret.fields.stop_id;
                if(isMarkerInCircle(cercleUtilisateur, marqueur)) {
                   marqueur.options.icon.options.iconSize= [35,35] 
                } 
                marqueur.bindPopup(`<strong>${stopName}</strong><br><button class="popupbtn" onclick="afficherBus('${stopId}')">Voir les prochains bus</button>`)
                stockMarqueursBus.push(marqueur);
                marqueur.addTo(map);
                map.addLayer(stockMarqueursBus[index]);
                index++;
            }
        })
        createToast("green","Les arrêts de bus ont été ajoutés à la carte.")
    } else {
        
        createToast("green","Les arrêts de bus ont été retirés à la carte.")
        for(index in stockMarqueursBus) {
            map.removeLayer(stockMarqueursBus[index]);
            }  
    }
}


// Fonction lancée par la popup au clic du bouton pour un bus
function afficherBus(stopId) {
    getStopTime(stopId)
    .then(tripsId =>  getHeadSign(tripsId))
    .then(data => afficherInformationsBus(data, stopId))
}

//Fonction qui affiche les données
function afficherInformationsBus(data) {
    nettoyerInfos()
    
    //S'il n'a pas de bus:
    if(data.length=== 0) {
        const paragrapheInfos = document.createElement('p');
        paragrapheInfos.innerText ="Aucun bus ne passe ces prochains temps à cet arrêt-ci."
        paragrapheInfos.style.marginTop = "15px";
        infos.appendChild(paragrapheInfos)
        setTimeout(()=> {
            infos.style.display="none";
        },3000)
    } else {
        data = data.reverse()
        infos.innerHTML+=`<strong><span class="span-important title-infos"><b>Voici les prochains bus:</b></span></strong><br><br>`
        for(trajet in data) {
            if(trajet%2==0) {
                infos.innerHTML+=`<p>Bus <b><span class="span-important">${data[trajet].nomBus}</span></b> vers <b><span class="span-important">${data[trajet].direction}</span></b>  Départ: <b>${data[trajet].departureTime}</b></p>`
            }
        }
    }
}


function getHeadSign(tripsId) {
    return new Promise ((resolve,reject)=>{
        console.log('entered getheadsign')
        
        let requeteTripsPara = ""
        tripsId.forEach((trip)=> {
            requeteTripsPara += `&refine.trip_id=${trip.tripId}`
        })
        fetch(`https://api.agglo-larochelle.fr/production/opendata/api/records/1.0/search/dataset=transport_yelo___gtfs_trips_des_bus&rows=5443&facet=trip_id${requeteTripsPara}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data.records)
            console.log(tripsId)
            for(tripData of data.records) {
                for(trip of tripsId) {
                    if(tripData.fields.trip_id == trip.tripId) {
                        trip.nomBus = tripData.fields.route_id;
                        trip.direction = tripData.fields.trip_headsign
                    }
                }

            }
            resolve(tripsId)
            
            
        })
    }) // Fin promesse

}


function getStopTime(stopId) {
    return new Promise((resolve,reject) => {
    fetch(`https://api.agglo-larochelle.fr/production/opendata/api/records/1.0/search/dataset=transport_yelo___gtfs_stop_times_des_bus&sort=departure_time&rows=146133&facet=stop_id&refine.stop_id=${stopId}`)
    .then(resp => resp.json())
    .then(data => {             
        data.records = (data.records.reverse())
        let tripsId= []
        for(stopTime of data.records) {
            // check heure.
            const departureTime = stopTime.fields.departure_time
            // Je récupère les informations des voyages que s'il y'a un départ dans les prochains temps.
            if(isInTheNextHours(stopTime,departureTime)) {
                const tripId = stopTime.fields.trip_id;
                const stopId = stopTime.fields.stop_id;
                tripsId[tripId] = tripsId.push({tripId: tripId, departureTime: departureTime})
                
            } 
        }
        // Supprime les doublons et limite la taille maximum de cherche des données à 150 paramètres : Largement suffisant.
        tripsId = [...new Set(tripsId)];
        tripsId= tripsId.slice(0,150) 
        
        resolve(tripsId)
    });
})
}

// Le bus part-il dans les 2 prochaines heures ? 
function isInTheNextHours(stopTime,departureTime) {
    
    departureHour = departureTime.substring(0,2)
    departureMinute = parseInt(departureTime.substring(3,5));

    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    
    // Retourne vrai sur l'heure du départ se fait dans les 2 heures.
    if((departureHour == currentHour && currentMinute<departureMinute) || departureHour == currentHour + 1 || departureHour == currentHour + 2) {
        return true;
    }      
}






//---------------------------------------------------Gare---------------------------------------------------//
function filtreGare(e) {
    let LR_lat = 0
    let LR_long = 0

    let LRPD_lat = 0
    let LRPD_long = 0

    let list_arriv_depart_LR = ""
    let list_arriv_depart_LRPD = ""

    let marker_LR
    let marker_LRPD

    if (e.target.checked) {

        const gareIcon = L.icon({ iconUrl: 'images/trainicon.png', iconSize: [45, 45] });
        // Départs Gare : La Rochelle, créer les marqueurs et la popup avec les départs
        fetch("https://api.navitia.io/v1/coverage/sncf/stop_areas/stop_area%3ASNCF%3A87485003/departures?", { headers: { Authorization: "d256efd0-3e19-4b29-ae5c-d1fa35594628" } })
            .then(response => response.json())
            .then(departuresLR => {
                LR_lat = departuresLR.departures[0].stop_point.coord.lat
                LR_long = departuresLR.departures[0].stop_point.coord.lon

                marker_LR = L.marker([LR_lat, LR_long], { icon: gareIcon }).addTo(map)
                list_arriv_depart_LR += "<h3 class='gare-title'>La Rochelle</h3><h2 class='gare-subtitle'> Liste des départs : </h2>"

                for (departure of departuresLR.departures) {
                    const direction = departure.display_informations.direction.split("(")[0]
                    const heure = departure.stop_date_time.departure_date_time.split("T")[1].substring(0, 2) + ":" +
                                  departure.stop_date_time.departure_date_time.split("T")[1].substring(2, 4)
                    list_arriv_depart_LR += `<button class="popupbtn" onclick="getStopsTrainsLR('${departure.links[1].id}','${direction}','${heure}','LR')">`
                    list_arriv_depart_LR += direction + heure + "</button><br>"
                }

                marker_LR.bindPopup(list_arriv_depart_LR)
                stockMarqueursGare.push(marker_LR)
  
            })
            .then(() => {
                    // Départs Gare : La Rochelle Porte Dauphine,  créer les marqueurs et la popup avec les départs
                    fetch("https://api.navitia.io/v1/coverage/sncf/stop_areas/stop_area%3ASNCF%3A87437798/departures?", { headers: { Authorization: "d256efd0-3e19-4b29-ae5c-d1fa35594628" } })
                    .then(response => response.json())
                    .then(departuresLRPD => {

                        LRPD_lat = departuresLRPD.departures[0].stop_point.coord.lat
                        LRPD_long = departuresLRPD.departures[0].stop_point.coord.lon

                        marker_LRPD = L.marker([LRPD_lat, LRPD_long], { icon: gareIcon }).addTo(map)
                        list_arriv_depart_LRPD += "<h3 class='gare-title'>La Rochelle Porte Dauphine</h3><h2 class='gare-subtitle'> Liste des départs : </h2>"

                        for (departure of departuresLRPD.departures) {
                            const direction = departure.display_informations.direction.split("(")[0]
                            const heure = departure.stop_date_time.arrival_date_time.split("T")[1].substring(0, 2) + ":" + 
                                          departure.stop_date_time.arrival_date_time.split("T")[1].substring(2, 4)
                            list_arriv_depart_LRPD += `<button class="popupbtn" onclick="getStopsTrainsLR('${departure.links[1].id}','${direction}','${heure}','LRPD')">`
                            list_arriv_depart_LRPD += direction + heure + "</button><br>"
                        }

                        marker_LRPD.bindPopup(list_arriv_depart_LRPD)
                        stockMarqueursGare.push(marker_LRPD)
                        createToast("green", "Les gares SNCF ont été ajoutés à la carte.")
                    })
            })





    }
    else {
        nettoyerInfos()

        createToast("green", "Les gares SNCF ont été retirés de la carte.")
        for (index in stockMarqueursGare) {
            map.removeLayer(stockMarqueursGare[index]);
        }
        if(isTrajet) {
            map.removeLayer(trajet)
            isTrajet = false
        }

    }

}

let isTrajet = false
let trajet

//Fonction lancée au clic sur un trajet de la popup
function getStopsTrainsLR(vehicle_journey_id, direction, heure, gare){
    
    fetch(`https://api.navitia.io/v1/coverage/sncf/vehicle_journeys/${vehicle_journey_id}/?`, { headers: { Authorization: "d256efd0-3e19-4b29-ae5c-d1fa35594628" } })
    .then(vehicle_journeys => vehicle_journeys.json())
    .then(vehicle_journey => {
        
        let coord_trajet = [[]]
       
        nettoyerInfos()
        infos.innerHTML += `<h2 class='gare-subtitle'> ${direction}, départ : ${heure}</h2><br>`
        for( stop of vehicle_journey.vehicle_journeys[0].stop_times){
            let stopName = stop.stop_point.name;
            const departHeure = stop.departure_time.substring(0,2)
            const departMinute = stop.departure_time.substring(2,4)

            // Mets en rouge l'arrêt de la gare dans le trajet 
            if((stopName == "La Rochelle" && gare==='LR') || (stopName == "La Rochelle Porte Dauphine" && gare==='LRPD')) {
                infos.innerHTML += `<p class="arretLaRochelle"> ${stopName}  à  ${departHeure} : ${departMinute} </p>` 
            } else {
                infos.innerHTML += `<p> ${stopName}  à  ${departHeure} : ${departMinute} </p>` 
            }
            coord_trajet.push([stop.stop_point.coord.lat,stop.stop_point.coord.lon])
        }

        //Ajout du trajet sur la map.
        coord_trajet.shift()
        if(isTrajet != true) {
            trajet = L.polyline(coord_trajet,{color: 'red'}).addTo(map)
            isTrajet = true
        }
        else {
            map.removeLayer(trajet)
            trajet = L.polyline(coord_trajet,{color: 'red'}).addTo(map)
        }
        
    })
}









//---------------------------------------------------Fonction utilitaire---------------------------------------------------//
 function isMarkerInCircle(cercle,marqueur) {
    let centrecercle = cercle.getLatLng();
    let positionMarqueur = marqueur.getLatLng();
    return (centrecercle.distanceTo(positionMarqueur) < cercle.getRadius()) 

  }


const toasts = document.getElementById('toasts');

function createToast(backgroundColor, message) {
    const notification = document.createElement('div');
    notification.classList.add('toast');
    notification.style.backgroundColor = backgroundColor;
    notification.innerText = message;
    toasts.appendChild(notification);
    setTimeout(()=> {
        notification.remove();
    },2000)
}


function nettoyerInfos() {
    infos.style.display = "block"
    infos.innerHTML = "";
    infos.innerHTML += `<button class="icone-close" onclick="closeInfos()"><i class="fa-sharp fa-solid fa-circle-xmark"></i><br></a>`
}


function closeInfos() {
    infos.style.display="none";
}


function centrerMap() {
    map.setView([lat,lon],16)
    createToast("green", "La carte a bien été recentré sur vous.")
}