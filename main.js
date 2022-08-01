//el algoritmo se trata de un juego simple.
//pulsas el moton de iniciar y un temporizador de 30segundos comenzara funcionar.
//para ganar el juego, hay que llegar a la cantidad de puntos indicada antes de que el tiempo se agote.
//la unica forma de ganar puntos (hasta el momento) es mantener el cursor sobre la pelota roja.
//la pelota se movera de posicion cada vez que hagamos un punto.


//declaracion de variables
let puntos = 0;
let tiempo = 30;
let necesarios = 30;
let validator;
let nombre;
let jugadaNum = 0;
let usuario;


//declaracion de dom.
let mejorTiempo = document.getElementById("mejor_tiempo");
let temporizador = document.getElementById("tiempo");
let puntaje = document.getElementById("puntos");
let botonIniciador = document.getElementById("iniciador");
let resultado = document.getElementById("resultados");
let targetDiv = document.getElementById("pruebas");
let pruebas_orden = document.getElementById("pruebas_orden");
let welcome = document.getElementById("welcome");
let cerrarSesion = document.getElementById("cerrarSesion");
let rank = document.getElementById("rank");
let historialCompleto = document.getElementById("historial")
document.getElementById("player").addEventListener("mouseover", sumarPuntos);















//storage
let usuarioStorage = localStorage.getItem("usuario")
const tiempos = [];
const data = [];
const finalColumn = document.querySelector("[data-final-column]");

//declaracion de eventos
botonIniciador.addEventListener("click", iniciador)
cerrarSesion.addEventListener("click", cerrarSesionfuncion);
historialCompleto.addEventListener("click", historial);


//declaracion de funciones
function sumarPuntos() {
    if (validator === "1") {
        puntos++;
        puntaje.innerHTML = `Puntos: <b>${puntos}/${necesarios}</b>`;
        //obtengo un numero aleatorio
        randNum1 = Math.round(Math.random() * 450);
        randNum2 = Math.round(Math.random() * 450);
        //modificar el margin es lo que hace que la pelota roja se "mueva"
        document.getElementById("player").style.marginTop = randNum1 + "px";
        document.getElementById("player").style.marginLeft = randNum2 + "px";

        //condicion para que el usuario gane el juego
        if (puntos === necesarios) {
            nombre = usuario;

            let tiempoTardadoGanar = necesarios - tiempo;
            tiempos.push(tiempoTardadoGanar);

            alert("HAS GANADO, PULSA DE NUEVO EL BOTON PARA JUGAR DE NUEVO")
            getInfo()
            jugadores();
            reset();
        }
    }
}

function restarTiempo() {
    if (validator === "1") {
        tiempo--
        temporizador.innerText = "--Tiempo: " + tiempo;
        if (tiempo === 0) {
            alert("PERDISTE, PULSA DE NUEVO EL BOTON PARA JUGAR DE NUEVO");
            reset();
        }
    }
}

function getInfo() {
    jugadaNum++;

    data.push({
        posicion: jugadaNum,
        data: `usuario:${nombre} \n tiempo restante:${tiempo} segundos`
    })
    //condicional a un array
    console.log(data?.data || "no hay datos cargados");

    //guardo el array de los datos jugados en un string.
    //mi intencion es hacer (en otra entrega) un ranking con los mejores puntajes guardados localmente.
    localStorage.setItem("data", JSON.stringify(data));
};

function jugadores() {
    let registro = document.createElement("div")
    registro.className = "registro"
    let tiempoTardadoGanar = necesarios - tiempo;
    registro.innerText = `Nombre: ${nombre} \n Finalizo el juego en ${tiempoTardadoGanar} segundos`;
    resultado.append(registro);

    //uso de SPREAD para tomar todos los valores del array
    let tiempoRecord = Math.min(...tiempos)
    mejorTiempo.innerText = `Nombre: ${usuario} \n Mejor tiempo:  ${tiempoRecord} segundos  👑`;

    //desestructuracion en array
    if (tiempos.length === 1) {
        let [a] = tiempos
        console.log(a);
    } else if (tiempos.length === 2) {
        let [, b] = tiempos
        console.log(b);
    }
}

function reset() {
    //funcion que restablece el puntaje y el tiempo.
    //ya sea que ganes o pierdas.
    temporizador.innerText = `--Tiempo: ${necesarios}`
    puntaje.innerHTML = `Puntos: <b>${puntos}/${necesarios}</b>`;
    tiempo = 30;
    puntos = 0;
    validator = "0";
}

function iniciador() {
    validator = "1"

}

function cerrarSesionfuncion() {
    //elimina el storage de usuario, para poder ingresar uno nuevo.
    localStorage.removeItem("usuario");
    usuario = usuarioStorage;
    welcome.innerText = "Refresca la pagina";
};

function historial() {
    let opDisponi = data.map(elemento => elemento.posicion);
    //el find busca un elemento "posicion" (elegido por el usuario) dentro del arreglo.
    let busqueda = parseInt(prompt(`Ingrese el numero de jugada \n Ejemplo: "1" = Primera jugada \n Jugadas guardadas hasta el momento:${opDisponi}`))
    let memoria = data.find(elemento => elemento.posicion === busqueda);
    rank.innerText = `La informacion de la jugada nº${busqueda} es \n ${memoria.data}`;

}

function memoriaUsuario() {
    usuario = usuarioStorage;
    welcome.innerText = "Bienvenido/a, " + usuario;
}

function memoriaUsuarioPedir() {
    usuario = prompt("ingresa tu nombre");
    localStorage.setItem("usuario", usuario);
    welcome.innerText = "Bienvenido " + usuario;
}


//uso de storage para el valor "usuario", usando operador ternario.
usuarioStorage ? memoriaUsuario() : memoriaUsuarioPedir();


















setInterval(restarTiempo, 1000);