//base de datos local de preguntas
const bd_juego = [
    {
        id:0,
        pregunta:"Cal destes autores non pertence á Xeración do 27?",
        op0:"Federico García Lorca",
        op1:"Luis Cernuda",
        op2:"Pedro Salinas",
        op3:"Valle-Inclán",
        correcta:"3"
    },
    {
        id:1,
        pregunta:"Cal destes autores non pertence á Xeración do 98? ",
        op0:"Pío Baroja",
        op1:"Miguel de Unamuno",
        op2:"Rubén Darío",
        op3:"José Martínez Ruiz(Azorín)",
        correcta:"2"
    },
    {
        id:2,
        pregunta:"Cal destes movementos artísticos e literarios non pertencen ás vanguardias?",
        op0:"Renacimiento",
        op1:"Futurismo",
        op2:"Cubismo",
        op3:"Surrealismo",
        correcta:"0"
    },
    {
        id:3,
        pregunta:"Cal destes autores non destacou durante o 'Siglo de Oro'?",
        op0:"Miguel de Cervantes",
        op1:"Francisco Gómez de Quevedo",
        op2:"Lope de Vega",
        op3:"Gustavo Adolfo Bécquer",
        correcta:"3"
    },
    {
        id:4,
        pregunta:"Cal destes autores non pertence á literatura española?",
        op0:"Antonio Machado",
        op1:"Lope de Vega",
        op2:"William Shakespeare",
        op3:"Benito Pérez Galdós",
        correcta:"2"
    },
    {
        id:5,
        pregunta:"Cal destes autores escribiu 'Don Quijote de la Mancha'?",
        op0:"Federico García Lorca",
        op1:"Miguel de Cervantes",
        op2:"Pedro Salinas",
        op3:"Valle-Inclán",
        correcta:"1"
    },
    {
        id:6,
        pregunta:"Cal destes autores pertence á Literatura Castellana?",
        op0:"Eduardo Blanco Amor",
        op1:"Alfonso Daniel Rodríguez Castelao",
        op2:"Rafael Alberti",
        op3:"Álvaro Cunqueiro",
        correcta:"2"
    },
    {
        id:7,
        pregunta:"Cal destes autores escribiu 'Don Juan Tenorio'?",
        op0:"José Zorrilla",
        op1:"Gustavo Adolfo Bécquer",
        op2:"Antonio Machado",
        op3:"Ramón María del Valle Inclán",
        correcta:"0"
    },
    {
        id:8,
        pregunta:"Quen escribiu 'Lazarillo de Tormes'?",
        op0:"Lope de Vega",
        op1:"Miguel de Cervantes",
        op2:"Autor Anónimo",
        op3:"Emilia Pardo Bazán",
        correcta:"2"
    },
    {
        id:9,
        pregunta:"Cal destes autores escribiu 'La Regenta'?",
        op0:"Almudena Grandes",
        op1:"Antonio Machado",
        op2:"Benito Pérez Galdós",
        op3:"Leopoldo Alas, Clarín",
        correcta:"3"
    }
]

//para guardar las respuestas elegidas
let respuestas = [];
//cantidad correctas
let cantiCorrectas = 0;
//pregunta acutal que debe ser cargada
let numPregunta = 0;

//Cargo una pregunta del JSON
function cargarPreguntas(){
    //tomo la pregunta actual de la bd
    const pregunta = bd_juego[numPregunta];

    const contenedor = document.createElement("div");
    contenedor.className = "contenedor-pregunta";
    contenedor.id = pregunta.id;
    const h2 = document.createElement("h2");
    h2.textContent = pregunta.id + 1 + " - " + pregunta.pregunta;
    contenedor.appendChild(h2);
    const opciones = document.createElement("div");

    //vamos a crear los tres labels
    //Lo vamos a hacer mediante una funciòn.
    // A dicha función le envio el numero de label y la opcion
    // el texto, de dicho label
    const label1 = crearLabel("0",pregunta.op0);
    const label2 = crearLabel("1",pregunta.op1);
    const label3 = crearLabel("2",pregunta.op2);
    const label4 = crearLabel("3",pregunta.op3);

    //agrego los labels al contendor de las opciones
    opciones.appendChild(label1);
    opciones.appendChild(label2);
    opciones.appendChild(label3);
    opciones.appendChild(label4);

    //agrego las opciones al contenedor principal
    contenedor.appendChild(opciones);
    document.getElementById("juego").appendChild(contenedor);
}

//creo la funciòn que que retornará el label con todo su contenido
function crearLabel(num, txtOpcion){
    const label = document.createElement("label");
    label.id = "l" + numPregunta + num;
    const input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.name = "p" + numPregunta;
    input.setAttribute("onclick", "seleccionar(" + numPregunta+","+num+")");
    const span = document.createElement("span");
    const correccion = document.createElement("span");
    correccion.id = "p" + numPregunta + num;
    span.textContent = txtOpcion;
    label.appendChild(input);
    label.appendChild(span);
    label.appendChild(correccion);

    return label;
}

//Mediante un for cargo todas las preguntas del JSON
for(i=0;i < bd_juego.length;i++){
    //actualizo el numero de pregunta actual
    numPregunta++;
}

//Función que carga la opción elegida en el arreglo respuestas.
function seleccionar(pos, opElegida){
    respuestas[pos] = opElegida;
}

//botón corregir
let corregir = document.getElementById("corregir");
corregir.onclick = function(){
    //recorro el arreglo que tiene las respuestas y comparo
    for(i=0;i<bd_juego.length;i++){
        //cargo la pregunta
        const pregunta = bd_juego[i];
        if(pregunta.correcta == respuestas[i]){ //respuesta correcta
            cantiCorrectas++;
            let idCorreccion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor-pregunta correcta";
            document.getElementById(idCorreccion).innerHTML = "&check;";
            document.getElementById(idCorreccion).className = "acierto";
        }else{//no acerto
            let id = "p" + i + respuestas[i];
            let idCorreccion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor-pregunta incorrecta";
            document.getElementById(id).innerHTML = "&#x2715;";
            document.getElementById(id).className = "no-acierto";
            document.getElementById(idCorreccion).innerHTML = "&check;";
            document.getElementById(idCorreccion).className = "acierto";
        }
    }

    //desabilitamos todos los inputs
    let inputs = document.getElementsByTagName("input");
    for(i=0;i<inputs.length;i++){
        inputs[i].disabled = true;
    }

    //hacemos un scroll hacia arriba
    window.scrollTo(0,0);
    //colocamos la cantidad que acertoy las que no acertó
    h2 = document.createElement("h2");
    h2.className = "resultado";
    h2.textContent = cantiCorrectas + " CORRECTAS - " + (10-cantiCorrectas) + " INCORRECTAS";
    document.getElementById("juego").appendChild(h2);
}


Error:
//Mediante un for cargo todas las preguntas del JSON
for(i=0;i < bd_juego.length;i++){
    cargarPreguntas();
    //actualizo el numero de pregunta actual
    numPregunta++;
}

//Función que carga la opción elegida en el arreglo respuestas.
function seleccionar(pos, opElegida){
    respuestas[pos] = opElegida;
}