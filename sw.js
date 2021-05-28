//cachear
//nombre de nuestro cache
const CACHE_ELEMENTS = [
  "./",
  "https://unpkg.com/react@17/umd/react.production.min.js",
  "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
  "https://unpkg.com/@babel/standalone/babel.min.js",
  "./style.css",
  "./components/Contador.js",
];

//nombre que se le asigna al cache
const CACHE_NAME = "v3_cache_contador_react";

//primer evente del sw

//self es una constante
//el vente a escuchar es intall
//es la primer parte del ciclo de vida del sw lo que va hacer al instalarse va hacer cachear
//para que no este haciendo pedicion a internet a cada rato
//PIEMRA PARTE DEL CICLO DE VIDA DEL SW
self.addEventListener("install", (e) => {
  //el waitUntil es espera a que algo suceda
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache
        .addAll(CACHE_ELEMENTS)
        .then(() => {
          self.skipWaiting();
        })
        .catch(console.log);
    })
  );
});

//Ver las versiones del cache y listarlas
//CREAO QUE ES LA SEGUNDA PARTE DEL CICLO DE VIDA

self.addEventListener("activate", (e) => {
  const cacheWhiteList = [CACHE_NAME];
  //el waitUntil es espera a que algo suceda
  e.waitUntil(
    //keys me dara todas las claves
    //en caso de que tengamos mas de un cahce instalados
    //si tengo mas caches puedo utilizarlos
    //en este caso comparamos
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            return (
              cacheWhiteList.indexOf(cacheName) === -1 &&
              caches.delete(cacheName)
            );
          })
        );
        //reclamamos nuestro cache(cabrar el cache)
      })
      .then(() => self.clients.claim())
  );
});

//TERCERA PARTE DEL CICLO DE VIDA
//fetch se va disparar cada vez que abramos buscara una new version de los archivos y retornara
//las respuesas que estan chach y si hay nuevas hara la peticion
//ejecutarse cada vez que se hace una peticion
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        return res;
      }

      return fetch(e.request);
    })
  );
});
