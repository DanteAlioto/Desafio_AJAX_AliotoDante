//Juego (sin terminar) de toma de decisiones. Uso de sweetalerts2
//Elige mediante el uso de botones conectados a eventos de js,  a un pokemon, y un bioma inicial para explorar.
//proxima entrega implementacion de enemigos y sistema de combate por "cartas" (alertas), ademas de recorridos por biomas.


//declaracion de variables /DOM
let exit = 1;
let Contenedor = document.getElementById("contenedor");
let Iniciador = document.getElementById("inicio");
let Juego = document.getElementById("juego");
let salir = document.getElementById("salir");
let body = document.getElementById("body_pokemon");
let botonesPokemon = document.getElementById("botones_pokemon");

//eventos de inicio y fin
salir.addEventListener("click", volverAlInicio);
Iniciador.addEventListener("click", empezarJuego);



//funciones
function volverAlInicio() {
    body.className = "menu_backround";
    empezarJuego();
}

function empezarJuego() {
    //la idea es de que mediante botones y acciones, el html se vaya modificando y generando una especie de "camino" que el usuario recorre.
    Contenedor.innerHTML = ``
    Juego.innerHTML = `<p id="menu">Bienvenido al juego! Selecciona tu pokemon inicial!<p>`
    //cada boton desencadena una alerta por sweetalert2
    botonesPokemon.innerHTML = `<img src="Imagenes/ChoosingStarter.bmp" alt="Choosing_Starter">
                    <button id ="BotonPikachu">Pikachu </button>
                    <button id ="BotonCharmander">Charmander </button>
                    <button id ="BotonSquirtle">Squirtle </button> `

    let BotonPikachu = document.getElementById("BotonPikachu");
    BotonPikachu.addEventListener("click", eleccionPikachu);

    function eleccionPikachu() {
        swal.fire({
            width: "50%",
            html: `<img src="Imagenes/Pikachu.gif" width= "250px" alt="imagen_Pikachu">`,
            title: `Pikachu ⚡`,
            footer: `Cuanto más potente es la energía eléctrica que genera este Pokémon, más suaves y elásticas se vuelven las bolsas de sus mejillas.`,
            ConfirmButton: false
        })
        pokemonName = "Pikachu  ";
        pokemonHp = 10;
        pokemonAtack = 11;
        eleguirZona();
    }

    let BotonCharmander = document.getElementById("BotonCharmander");
    BotonCharmander.addEventListener("click", eleccionCharmander);

    function eleccionCharmander() {
        swal.fire({
            width: "50%",
            html: `<img src="Imagenes/Charmander.gif" width= "250px" alt="imagen_Charmander">`,
            title: `Charmander 🔥`,
            footer: `Prefiere las cosas calientes. Dicen que cuando llueve le sale vapor de la punta de la cola.`
        });
        pokemonName = "Charmander";
        pokemonHp = 15;
        pokemonAtack = 8;
        eleguirZona();
    }
    let BotonSquirtle = document.getElementById("BotonSquirtle");
    BotonSquirtle.addEventListener("click", eleccionSquirtle);

    function eleccionSquirtle() {
        swal.fire({
            width: "50%",
            html: `<img src="Imagenes/Squirtle.gif" width= "250px" alt="imagen_Pikachu">`,
            title: `Squirtle 🌊`,
            footer: `Cuando retrae su largo cuello en el caparazón, dispara agua a una presión increíble..`,
            ConfirmButton: false
        })
        pokemonName = "Squirtle ";
        pokemonHp = 10;
        pokemonAtack = 11;
        eleguirZona();
    }
}



function eleguirZona() {
    //como mencionaba antes, luego de seleccionar un pokemon, el innerhtml se modifica para "seguir adelante" en el juego.
    Juego.innerHTML = `<p id = "p_mapa">Felicidades! Eleguiste a ${pokemonName}, pulsa el boton "Volver al menu" si queres cambiar de pokemon, de lo contrario..\n Elige la zona donde quieres empezar !<p> 
                        <button id ="botonBosque"> Bosque 🌲 </button>
                        <button id ="botonPlaya"> Montaña 🏔 </button> `
    botonesPokemon.innerHTML = ` `;

    let botonBosque = document.getElementById("botonBosque");
    botonBosque.addEventListener("click", eleccionBosque);
    //mismo principio, cada boton activa una funcion que muestra una alerta, con el uso de sweetalert2.
    function eleccionBosque() {
        swal.fire({
            width: "60%",
            html: `<img src="Imagenes/bosque.gif" width= "550px" alt="imagen_Charmander">`,
            title: `Viajando al Bosque`,
            footer: ``,
            showConfirmButton: false,
            //temporizador de la alerta
            timer: 3500,
        });
        body.className = "bosque"
        Juego.innerHTML = ` `
    }

    let botonPlaya = document.getElementById("botonPlaya");
    botonPlaya.addEventListener("click", eleccionPlaya);

    function eleccionPlaya() {
        swal.fire({
            width: "60%",
            html: `<img src="Imagenes/montaña.gif" width= "550px" alt="imagen_Charmander">`,
            title: `Viajando a la Montaña`,
            footer: ``,
            showConfirmButton: false,
            timer: 3500,
        });
        body.className = "montaña"
        Juego.innerHTML = ` `
    }
}

