d3.json("./arenaInfo.json").then(function (data) {

    var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "satellite-streets-v11",
        accessToken: API_KEY
    });

    var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    });

    var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "outdoors-v11",
        accessToken: API_KEY
    });

    // Initialize all of the LayerGroups we'll be using
    var layers = {
        NHL: new L.LayerGroup(),
        NFL: new L.LayerGroup(),
        MLB: new L.LayerGroup(),
        MLS: new L.LayerGroup(),
        NBA: new L.LayerGroup(),
        NASCAR: new L.LayerGroup()
    };

    // Only one base layer can be shown at a time
    var baseMaps = {
        Satellite: satellite,
        Dark: dark,
        Outdoors: outdoors
    };

    // Create map object and set default layers
    var myMap = L.map("map", {
        center: [39.8283, -98.5795],
        zoom: 4,
        layers: [
            layers.NHL,
            layers.NFL,
            layers.MLB,
            layers.MLS,
            layers.NBA,
            layers.NASCAR
        ]
    });

    satellite.addTo(myMap);

    // Overlays that may be toggled on or off
    var overlays = {
        "NHL": layers.NHL,
        "NFL": layers.NFL,
        "MLB": layers.MLB,
        "MLS": layers.MLS,
        "NBA": layers.NBA,
        "NASCAR": layers.NASCAR
    };

    // Pass our map layers into our layer control
    // Add the layer control to the map
    L.control.layers(baseMaps, overlays).addTo(myMap);

    // Create a legend to display information about our map
    var info = L.control({
        position: "bottomright"
    });

    // When the layer control is added, insert a div with the class of "legend"
    info.onAdd = function () {
        var div = L.DomUtil.create("div", "legend");
        return div;
    };
    // Add the info legend to the map
    info.addTo(myMap);

    var icons = {
        NHL: L.icon({
            iconUrl: 'https://www-league.nhlstatic.com/images/logos/league-dark/133-flat.svg',
            iconSize: [38, 95], // size of the icon
            shadowSize: [50, 64], // size of the shadow
            iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        }),
        NFL: L.icon({
            iconUrl: 'https://static.www.nfl.com/image/upload/v1554321393/league/nvfr7ogywskqrfaiu38m.svg',
            iconSize: [38, 95],
            shadowSize: [50, 64],
            iconAnchor: [22, 94],
            shadowAnchor: [4, 62],
            popupAnchor: [-3, -76]
        }),
        MLB: L.icon({
            iconUrl: 'https://www.mlbstatic.com/team-logos/league-on-dark/1.svg',
            iconSize: [38, 95],
            shadowSize: [50, 64],
            iconAnchor: [22, 94],
            shadowAnchor: [4, 62],
            popupAnchor: [-3, -76]
        }),
        MLS: L.icon({
            iconUrl: 'https://images.mlssoccer.com/image/upload/v1594889391/assets/crest/MLS-Crest-FullColor.svg',
            iconSize: [38, 95],
            shadowSize: [50, 64],
            iconAnchor: [22, 94],
            shadowAnchor: [4, 62],
            popupAnchor: [-3, -76]
        }),
        NBA: L.icon({
            iconUrl: 'https://cdn.nba.com/logos/leagues/logo-nba.svg',
            iconSize: [38, 95],
            shadowSize: [50, 64],
            iconAnchor: [22, 94],
            shadowAnchor: [4, 62],
            popupAnchor: [-3, -76]
        }),
        NASCAR: L.icon({
            iconUrl: 'https://m.nascar.com/wp-content/uploads/sites/7/2020/01/NASCAR_Barmark_Logo-1-2-1.svg',
            iconSize: [55, 95],
            shadowSize: [50, 64],
            iconAnchor: [22, 94],
            shadowAnchor: [4, 62],
            popupAnchor: [-3, -76]
        })
    };

    var sportCount = {
        NHL: 0,
        NFL: 0,
        MLB: 0,
        MLS: 0,
        NBA: 0,
        NASCAR: 0
    };

    var sportCode;

    for (var k = 0; k < data.length; k++) {
        if (data[k].sport == "NHL") {
            sportCode = "NHL";
        }
        else if (data[k].sport == "NFL") {
            sportCode = "NFL";
        }
        else if (data[k].sport == "MLB") {
            sportCode = "MLB";
        }
        else if (data[k].sport == "MLS") {
            sportCode = "MLS";
        }
        else if (data[k].sport == "NBA") {
            sportCode = "NBA";
        }
        else if (data[k].sport == "NASCAR") {
            sportCode = "NASCAR";
        }

        sportCount[sportCode]++;

        var newMarker = L.marker([data[k].location[0], data[k].location[1]], {
            icon: icons[sportCode]
        });

        newMarker.addTo(layers[sportCode]);

        if (data[k].sport != "NASCAR") {
            newMarker.bindPopup(data[k].sport + " : " + data[k].team + "<hr>" + "<br> Arena: " + data[k].arena + "<br> Address: " + data[k].address);
        }
        else {
            newMarker.bindPopup(data[k].sport + "<hr>" + "<br> Address: " + data[k].address);
        }
    };

    document.querySelector(".legend").innerHTML = [
        "<p class='nhl'>NHL: " + "<img width=35 height=35 src=https://www-league.nhlstatic.com/images/logos/league-dark/133-flat.svg>" + "</p>",
        "<p class='nfl'>NFL: " + "<img width=35 height=35 src=https://static.www.nfl.com/image/upload/v1554321393/league/nvfr7ogywskqrfaiu38m.svg>" + "</p>",
        "<p class='mlb'>MLB: " + "<img width=35 height=35 src=https://www.mlbstatic.com/team-logos/league-on-dark/1.svg>" + "</p>",
        "<p class='mls'>MLS: " + "<img width=35 height=35 src=https://images.mlssoccer.com/image/upload/v1594889391/assets/crest/MLS-Crest-FullColor.svg>" + "</p>",
        "<p class='nba'>NBA: " + "<img width=35 height=35 src=https://cdn.nba.com/logos/leagues/logo-nba.svg>" + "</p>",
        "<p class='nascar'>NASCAR: " + "<img width=35 height=35 src=https://m.nascar.com/wp-content/uploads/sites/7/2020/01/NASCAR_Barmark_Logo-1-2-1.svg>" + "</p>"
    ].join("");

});