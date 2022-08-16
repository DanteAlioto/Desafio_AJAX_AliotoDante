//Juego (sin terminar) de toma de decisiones. Uso de sweetalerts2
//Elige mediante el uso de botones conectados a eventos de js,  a un pokemon, y un bioma inicial para explorar.
//proxima entrega implementacion de enemigos y sistema de combate por "cartas" (alertas), ademas de recorridos por biomas.

contenedorSalir.innerHTML = "";

//declaracion de variables /DOM
let exit = 1;
let Contenedor = document.getElementById("contenedor");
let Iniciador = document.getElementById("inicio");
let Juego = document.getElementById("juego");
let body = document.getElementById("body_pokemon");
let botonesPokemon = document.getElementById("botones_pokemon");
let miPokemonId;
let puntosAtaqueMio;
let puntosVidaMio;

Iniciador.addEventListener("click", empezarJuego);


//funciones
function volverAlInicio() {
    contenedorSalir.innerHTML = "";
    body.className = "menu_backround";
    empezarJuego();
}

function empezarJuego() {

    body.className = "menu_backround_2"

    //la idea es de que mediante botones y acciones, el html se vaya modificando y generando una especie de "camino" que el usuario recorre.
    Contenedor.innerHTML = ``
    Juego.innerHTML = `<p id="menu">Bienvenido al juego! Selecciona tu pokemon inicial!<p>`
    botonesPokemon.innerHTML = `

    <div class="box child-to-body">
            <div class="poke_box" id ="BotonCharmander">
                <div class="pokeball">
                    <div class="pokeball__button_fire"></div>
                </div>   
            </div>

            <div class="poke_box" id ="BotonPikachu">
                <div class="pokeball">
                    <div class="pokeball__button_electric"></div>
                </div>   
            </div>

            <div class="poke_box" id ="BotonSquirtle">
                <div class="pokeball">
                    <div class="pokeball__button"></div>
                </div>   
            </div>
    </div>;`


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

    body.className = "menu_backround_3"

    contenedorSalir.innerHTML = `<button id ="salir">Volver al menu</button>`
    let salir = document.getElementById("salir");
    salir.addEventListener("click", volverAlInicio);



    //como mencionaba antes, luego de seleccionar un pokemon, el innerhtml se modifica para "seguir adelante" en el juego.
    Juego.innerHTML = `<p id = "p_mapa">Felicidades! Eleguiste a ${pokemonName}, pulsa el boton "Volver al menu" si queres cambiar de pokemon, de lo contrario..\n Elige la zona donde quieres empezar !</p> 
                        <div class ="btn_mapa_container">
                        <button id ="botonBosque">  </button>
                        <button id ="botonPlaya"> Montaña 🏔 </button> 
                        </div>`
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
                                <button class="boton_rojo" class="boton_pelea" >  </button>
                                <button class="boton_rojo" class="boton_pelea" >  </button>`;

        batallas.classList.add("batallas_contenedor")
        Juego.appendChild(batallas);

        let primeraBatalla = document.getElementById("primera_batalla");
        primeraBatalla.addEventListener("click", functionPrimeraBatalla);


        //PRIMERA BATALLA
        function functionPrimeraBatalla() {
            batallas.className = "batalla_bosque"

            //FETCH PARA MI POKEMON SELECCIONADO
            fetch(`https://pokeapi.co/api/v2/pokemon/${miPokemonId}/`)
                .then(res => res.json())
                .then(data => {
                    //render de mi pokemon
                    miPokemonEspalda = `<img src="${data.sprites.back_default}"width="250px">`
                    miPokemonFrente = `<img src="${data.sprites.front_default}"width="250px">`
                    //health bar de mi pokemon
                    puntosVidaMio = data.stats[0].base_stat;
                    miHp = `<progress id="health_yo" value="${puntosVidaMio}" max="${puntosVidaMio}"></progress>`
                    //ataque de mi pokemon
                    puntosAtaqueMio = data.stats[1].base_stat;

                });

            //FETCH PARA EL ENEMIGO
            numRandom = Math.round(Math.random() * 100);

            fetch(`https://pokeapi.co/api/v2/pokemon/${numRandom}/`)
                .then(res => res.json())
                .then(data => {

                    //borro los botones
                    batallas.innerHTML = "";

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
                    three.innerHTML = `${miPokemonEspalda}`;
                    four.innerHTML = `<div id= "infoMiPokemon"> ${pokemonName.toUpperCase()} <span id="Mi_Nivel">1</span> </div> ${miHp}`;
                    five.innerHTML = `Que hara "${pokemonName}?"`;
                    six.innerHTML = `<button id= "botonAtacar">ATACK</button>
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" target="_blank"><button>NO PROGRAMADO</button></a>`
                    
                    
                    
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

                            //le resto el ataque de mi pokemon (dividido en 2 porque es muy alto) a los hp del enemigo
                            health_enemy.value -= `${puntosAtaqueMio/2}`;


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

                                    //permito que se pueda entrar en la segunda batalla
                                    let segundaBatalla = document.getElementById("segunda_batalla");
                                    segundaBatalla.addEventListener("click", functionSegundaBatalla);

                                    //alerta de mejora de pokemon
                                    Swal.fire({
                                        html: `${miPokemonFrente}`,
                                        confirmButtonColor: '#3085d6',
                                        denyButtonColor: '#3085d6',
                                        title: `Felicidades! tu ${pokemonName} subio de nivel!`,
                                        showDenyButton: true,

                                        confirmButtonText: 'Subir puntos de ataque',
                                        denyButtonText: `Subir puntos de vida`,

                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            Swal.fire('Se subio el ataque!', '', 'success')
                                            //le subo 10 puntos al ataque
                                            puntosAtaqueMio = puntosAtaqueMio + 10;

                                        } else if (result.isDenied) {
                                            Swal.fire('Se subio la vida!', '', 'success')
                                            //le subo 20 puntos a la vida
                                            puntosVidaMio = puntosVidaMio + 20;

                                        }
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
                                    let puntosAtaqueEnemigo = data.stats[1].base_stat;
                                    healthMe.value -= `${puntosAtaqueEnemigo/5.5}`;

                                    //si el  ataque enemigo reduce la vida de mi pokemon a 0
                                    if (healthMe.value <= 0) {

                                        function renderDerrotaMia() {
                                            five.innerHTML = `${pokemonName} fue derrotado!`
                                            three.style = `transform: rotate(-154deg);`
                                        }


                                        function mensajePerdiste() {
                                            batallas.className = "batallas_contenedor";
                                            batallas.innerHTML = `<span id = "mnsj_perdiste">Tu pokemon fu derrotado, pulsa "Volver al menu" para intentarlo de nuevo!<span/>`
                                        }
                                        setTimeout(renderDerrotaMia, 2500);
                                        setTimeout(mensajePerdiste, 4000)

                                    };

                                    //recien ahora permito que se vuelva a presionar el boton  de ataque
                                    validator = "1";
                                }

                                //funciones que coordinan los tiempos de respuesta
                                setTimeout(clear, 2000);
                                setTimeout(avisoDeAtaque, 3000)
                                setTimeout(clearEnemyMovement, 4000)
                                setTimeout(ataqueEnemigo, 5000)
                            };
                        }
                        //termina el BOTON DE ATACAR
                    }
                })
        }





        function functionSegundaBatalla() {

            batallas.className = "batalla_bosque"

            //health bar de mi pokemon
            miHp = `<progress id="health_yo" value="${puntosVidaMio}" max="${puntosVidaMio}"></progress>`

            //FETCH PARA EL ENEMIGO
            numRandom = Math.round(Math.random() * 100);

            fetch(`https://pokeapi.co/api/v2/pokemon/${numRandom}/`)
                .then(res => res.json())
                .then(data => {
                    //borro los botones
                    batallas.innerHTML = "";

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
                    three.innerHTML = `${miPokemonEspalda}`;
                    four.innerHTML = `<div id= "infoMiPokemon"> ${pokemonName.toUpperCase()} <span id="Mi_Nivel">2</span> </div> ${miHp}`;
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

                            health_enemy.value -= `${puntosAtaqueMio/2}`;


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
                                                        <button class="boton_verde" id ="segunda_batalla">  </button>
                                                        <button class="boton_pelea"  id ="tercera_batalla">  </button>`;
                                    batallas.className = "batallas_contenedor";

                                    let terceraBatalla = document.getElementById("tercera_batalla");
                                    terceraBatalla.addEventListener("click", functionTerceraBatalla);

                                    //alerta de mejora de pokemon
                                    Swal.fire({
                                        html: `${miPokemonFrente}`,
                                        confirmButtonColor: '#3085d6',
                                        denyButtonColor: '#3085d6',
                                        title: `Felicidades! tu ${pokemonName} subio de nivel!`,
                                        showDenyButton: true,

                                        confirmButtonText: 'Subir puntos de ataque',
                                        denyButtonText: `Subir puntos de vida`,

                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            Swal.fire('Se subio el ataque!', '', 'success')
                                            //le subo 10 puntos al ataque
                                            puntosAtaqueMio = puntosAtaqueMio + 10;

                                        } else if (result.isDenied) {
                                            Swal.fire('Se subio la vida!', '', 'success')
                                            //le subo 20 puntos a la vida
                                            puntosVidaMio = puntosVidaMio + 20;

                                        }
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
                                    let puntosAtaqueEnemigo = data.stats[1].base_stat;
                                    healthMe.value -= `${puntosAtaqueEnemigo/5.5}`;

                                    //si el  ataque enemigo reduce la vida de mi pokemon a 0
                                    if (healthMe.value <= 0) {
                                        function renderDerrotaMia() {
                                            five.innerHTML = `${pokemonName} fue derrotado!`
                                            three.style = `transform: rotate(-154deg);`
                                        }

                                        function mensajePerdiste() {
                                            batallas.className = "batallas_contenedor";
                                            batallas.innerHTML = `<span id = "mnsj_perdiste">Tu pokemon fu derrotado, pulsa "Volver al menu" para intentarlo de nuevo!<span/>`
                                        }
                                        setTimeout(renderDerrotaMia, 2500);
                                        setTimeout(mensajePerdiste, 4000)

                                    };

                                    //recien ahora permito que se vuelva a presionar el boton  de ataque
                                    validator = "1";
                                }

                                //funciones que coordinan los tiempos de respuesta
                                setTimeout(clear, 2000);
                                setTimeout(avisoDeAtaque, 3000)
                                setTimeout(clearEnemyMovement, 4000)
                                setTimeout(ataqueEnemigo, 5000)

                            };
                        }
                        //termina el BOTON DE ATACAR
                    }
                })
        }



        function functionTerceraBatalla() {

            batallas.className = "batalla_bosque"

            //health bar de mi pokemon
            miHp = `<progress id="health_yo" value="${puntosVidaMio}" max="${puntosVidaMio}"></progress>`

            //FETCH PARA EL ENEMIGO
            fetch(`https://pokeapi.co/api/v2/pokemon/${800}/`)
                .then(res => res.json())
                .then(data => {

                    //borro los botones
                    batallas.innerHTML = "";

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

                    one.innerHTML = `${data.species.name.toUpperCase()} <progress id="health_enemy" value=""    max=""></progress>`;
                    two.innerHTML = `<img src="${data.sprites.front_default}" width="250px">`;
                    three.innerHTML = `${miPokemonEspalda}`;
                    four.innerHTML = `<div id= "infoMiPokemon"> ${pokemonName.toUpperCase()} <span              id="Mi_Nivel">3</span> </div> ${miHp}`;
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

                            health_enemy.value -= `${puntosAtaqueMio/2}`;

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
                                                        <button class="boton_verde" id ="segunda_batalla">  </button>
                                                        <button class="boton_verde"  id ="tercera_batalla">  </button>`;
                                    batallas.className = "batallas_contenedor";

                                    alert(`GANASTE EL JUEGO!`);
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
                                    let puntosAtaqueEnemigo = data.stats[1].base_stat;
                                    healthMe.value -= `${puntosAtaqueEnemigo/5.5}`;

                                    //si el  ataque enemigo reduce la vida de mi pokemon a 0
                                    if (healthMe.value <= 0) {
                                        function renderDerrotaMia() {
                                            five.innerHTML = `${pokemonName} fue derrotado!`
                                            three.style = `transform: rotate(-154deg);`
                                        }

                                        function mensajePerdiste() {
                                            batallas.className = "batallas_contenedor";
                                            batallas.innerHTML = `<span id = "mnsj_perdiste">Tu pokemon fue derrotado, pulsa "Volver al menu" para intentarlo de nuevo!<span/>`
                                        }
                                        setTimeout(renderDerrotaMia, 2500);
                                        setTimeout(mensajePerdiste, 3500)
                                    };

                                    //recien ahora permito que se vuelva a presionar el boton  de ataque
                                    validator = "1";
                                }

                                //funciones que coordinan los tiempos de respuesta
                                setTimeout(clear, 2000);
                                setTimeout(avisoDeAtaque, 3000)
                                setTimeout(clearEnemyMovement, 4000)
                                setTimeout(ataqueEnemigo, 5000)

                            };
                        }
                        //termina el BOTON DE ATACAR
                    }
                })
        }
    }










    //boton de mapa secundario:  no programado 
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