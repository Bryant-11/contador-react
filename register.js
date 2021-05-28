//para ver si tengo WS primera forma
// if ("serviceWorker" in navigator) {
//   console.log("si existe");
// }

//segunda manera
if (navigator.serviceWorker) {
  //console.log("si existe");
  //si funciona hacer
  //la funcon reguster permite regustarr un SW con el cual podre trabajar
  navigator.serviceWorker.register("./sw.js");
}
