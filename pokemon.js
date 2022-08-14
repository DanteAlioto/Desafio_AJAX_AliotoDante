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
let miPokemonId;


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
        miPokemonId = 25;
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
        miPokemonId = 4;
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
        miPokemonId = 7;
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
            width: "80%",
            html: `<img src="Imagenes/bosque.gif" width= "80%" alt="imagen_Charmander">`,
            title: `Viajando al Bosque`,
            footer: ``,
            showConfirmButton: false,
            //temporizador de la alerta
            timer: 3500,
        });

        body.className = "bosque";
        Juego.innerHTML = "";

        const batallas = document.createElement("div");
        batallas.innerHTML = ` <button class="boton_pelea"  id ="primera_batalla">  </button> 
                                <button class="boton_rojo" class="boton_pelea" id ="segunda_batalla">  </button>
                                <button class="boton_rojo" class="boton_pelea" id ="tercera_batalla">  </button>`;

        batallas.classList.add("batallas_contenedor")
        Juego.appendChild(batallas);

        let primeraBatalla = document.getElementById("primera_batalla");
        let segundaBatalla = document.getElementById("segunda_batalla");
        let terceraBatalla = document.getElementById("tercera_batalla");

        primeraBatalla.addEventListener("click", functionPrimeraBatalla);
        segundaBatalla.addEventListener("click", functionSegundaBatalla);
        terceraBatalla.addEventListener("click", functionTerceraBatalla);






        //PRIMERA BATALLA
        function functionPrimeraBatalla() {
            alert("entraste en primera batalla");
            primeraBatalla.className = "boton_verde";
            segundaBatalla.className = "boton_pelea";

            batallas.className = "batalla_bosque"

            //FETCH PARA MI POKEMON SELECCIONADO
            fetch(`https://pokeapi.co/api/v2/pokemon/${miPokemonId}/`)
                .then(res => res.json())
                .then(data => {
                    //render de mi pokemon
                    patoImagen = `<img src="${data.sprites.back_default}"width="250px">`
                    //health bar de mi pokemon
                    patoVida = `<progress id="health_yo" value="${data.stats[0].base_stat}" max="${data.stats[0].base_stat}"></progress>`



                });

            //FETCH PARA EL ENEMIGO
            numRandom = Math.round(Math.random() * 100);

            fetch(`https://pokeapi.co/api/v2/pokemon/${numRandom}/`)
                .then(res => res.json())
                .then(data => {

                    //borro los botones
                    batallas.innerHTML = "";

                    /*` <div class = "grid_batalla_bosque"> 

                                        <div class = "one"> ${data.species.name.toUpperCase()} <progress id="health" value="" max=""></progress> </div>
                                        <div class = "two"> <img src="${data.sprites.front_default}" width="250px"> </div>
                                        <div class = "three"> ${patoImagen}  </div>
                                        <div class = "four"> ${pokemonName.toUpperCase()} </div>
                                        <div class = "five"> Que hara "${pokemonName}" </div>
                                        <div class = "six"> <button id= "botonAtacar">ATACK</button> </div>
                                        
                                    </div>`;*/




                    const gridBatallaBosque = document.createElement("div");

                    const one = document.createElement("div");
                    const two = document.createElement("div");
                    const three = document.createElement("div");
                    const four = document.createElement("div");
                    const five = document.createElement("div");
                    const six = document.createElement("div");



                    gridBatallaBosque.className = "grid_batalla_bosque";

                    one.className = "one";
                    two.className = "two";
                    three.className = "three";
                    four.className = "four";
                    five.className = "five";
                    six.className = "six";





                    one.innerHTML = `${data.species.name.toUpperCase()} <progress id="health_enemy" value="" max=""></progress>`;
                    two.innerHTML = `<img src="${data.sprites.front_default}" width="250px">`;
                    three.innerHTML = `${patoImagen}`;
                    four.innerHTML = ` ${pokemonName.toUpperCase()} ${patoVida}`;
                    five.innerHTML = `Que hara "${pokemonName}?"`;
                    six.innerHTML = `<button id= "botonAtacar">ATACK</button>`



                    batallas.appendChild(gridBatallaBosque);

                    gridBatallaBosque.appendChild(one);
                    gridBatallaBosque.appendChild(two);
                    gridBatallaBosque.appendChild(three);
                    gridBatallaBosque.appendChild(four);
                    gridBatallaBosque.appendChild(five);
                    gridBatallaBosque.appendChild(six);










                    //barra de vida pokemon enemigo
                    let healthEnemigo = document.getElementById("health_enemy")
                    healthEnemigo.value = `${data.stats[0].base_stat}`;
                    healthEnemigo.max = `${data.stats[0].base_stat}`;

                    //barra de vida mi pokemon
                    let healthMe = document.getElementById("health_yo")



                    //boton de atacar
                    botonAtacar = document.getElementById("botonAtacar");
                    botonAtacar.addEventListener("click", atack);


                    let validator = "1";

                    function atack() {
                        //el validator sirve para que el boton "atack" solo se puede volver a accionar cuando termina el turno enemigo

                        if (validator === "1") {
                            //hasta que validator no sea "1", no funcionara el boton otra vez (evita apretar el boton muchas veces seguidas)
                            validator = "2";
                            five.innerHTML = `${pokemonName} uso Ataque Basico!`;
                            //movimiento de mi pokemon render
                            three.className = "threeGolpe";
                            health_enemy.value -= `${(data.stats[1].base_stat)/3}`;


                            //IF de derrota al enemigo
                            if (healthEnemigo.value <= 0) {
                                five.innerHTML = `Es super efectivo!`, 2000;

                                //reaccion del enemigo cuando muere
                                function delayDerrotaEnemigo() {
                                    two.style = `transform: rotate(123deg);`
                                }
                                setTimeout(delayDerrotaEnemigo, 3500)

                                //cambio al siguiente nivel
                                function renderMenu() {

                                    batallas.innerHTML = ` <button class="boton_verde"  id ="primera_batalla">  </button> 
                                                        <button class="boton_pelea" class="boton_pelea" id ="segunda_batalla">  </button>
                                                        <button class="boton_rojo" class="boton_pelea" id ="tercera_batalla">  </button>`;
                                    batallas.className = "batallas_contenedor";

                                    let segundaBatalla = document.getElementById("segunda_batalla");
                                    segundaBatalla.addEventListener("click", functionSegundaBatalla);

                                    swal.fire({
                                        width: "50%",
                                        html: `<img src="Imagenes/Pikachu.gif" width= "250px" alt="imagen_Pikachu">`,
                                        title: `Pikachu ⚡`,
                                        footer: `Cuanto más potente es la energía eléctrica que genera este Pokémon, más suaves y elásticas se vuelven las bolsas de sus mejillas.`,
                                        ConfirmButton: false
                                    })
                                }
                                setTimeout(renderMenu, 5000);

                            } else {
                                //uso el ELSE para que el enemigo ataque SOLO si su hp no llego a 0
                                function clear() {
                                    three.className = "three";
                                    five.innerHTML = `${data.species.name.toUpperCase()} va a atacar!`
                                }

                                //movimiento del enemigo render
                                function clearEnemyMovement() {
                                    two.className = "twoGolpe";
                                }

                                //avisa que ataque hara el pokemon enemigo (solo 1 por ahora)
                                function avisoDeAtaque() {
                                    five.innerHTML = `${data.species.name.toUpperCase()} uso ataque basico!`
                                }

                                //vuelve a su clase anterior y resta vida a mi pokemon
                                function ataqueEnemigo() {
                                    two.className = "two";
                                    healthMe.value -= `2`;
                                    //recien ahora permito que se vuelva a presionar el boton  de ataque
                                    validator = "1";
                                }

                                //funciones que coordinan los tiempos de respuesta
                                setTimeout(clear, 2000);
                                setTimeout(avisoDeAtaque, 3000)
                                setTimeout(clearEnemyMovement, 4000)
                                setTimeout(ataqueEnemigo, 5000)

                            };
                        } else {
                            alert("Todavia no es tu tuno")
                        }
                        //termina el BOTON DE ATACAR
                    }



                })




        }












        function functionSegundaBatalla() {
            alert("entraste en segunda batalla");
            segundaBatalla.className = "boton_verde";
            terceraBatalla.className = "boton_pelea";
        }


        function functionTerceraBatalla() {
            alert("entraste en tercera batalla");
            terceraBatalla.className = "boton_verde";

        }




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