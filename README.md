# Stadiums-Map
Map of Stadiums

https://ksheekey.github.io/Map-of-Stadiums/

The goal here was to map the stadiums for the 5 major sports. Hockey(NHL), Football(NFL), Baseball(MLB), Soccer(MLS), and Basketball(NBA).

They are all put together in one map with the ability to filter by the sports you want to view. You can even change the base layer of the map. Each has a tooltip with its team name, address, and arena name. 

In Pandas, Started by pulling the table info off of the following wikipedia websites to gather arena names.

NHL - https://en.wikipedia.org/wiki/List_of_National_Hockey_League_arenas

NFL - https://en.wikipedia.org/wiki/List_of_current_National_Football_League_stadiums

MLB - https://en.wikipedia.org/wiki/List_of_current_Major_League_Baseball_stadiums

MLS - https://en.wikipedia.org/wiki/List_of_Major_League_Soccer_stadiums

NBA - https://en.wikipedia.org/wiki/List_of_National_Basketball_Association_arenas

After having the arena names, I did a Google API search on geo location of the arena names to pull the lat'lng and address for each arena in each sport.

Output was a list of dicitonaries. Dictionaires looked like this:

[
    {
        "team": "Philadelphia Flyers",
        "location": [
            39.9012015,
            -75.17197949999999
        ],
        "address": "3601 S Broad St, Philadelphia, PA 19148, USA",
        "arena": "Wells Fargo Center",
        "sport": "NHL"
    }
];

After this went over and coded the map using Leaflet and Mapbox, while using D3 to call in the JSON file.

Pandas ' D3 ' Mapbox ' Leaflet ' JavaScript ' HTML ' Google API ' Mapbox API ' CSS ' GitHub Pages