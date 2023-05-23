const CleApi = 'e4aad450d379fa4c64b6916ba9482814';
let resultasApi;
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
    },() => {
       alert(`Vous avez refusé la géolocalisation , l'aplication ne peut pas fonctionner ,
        veuillez l'activer.!`);
    })
}