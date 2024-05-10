
let stringJson = '[{"id":1,"apellido":"Serrano","nombre":"Horacio","fechaNacimiento":19840103,"dni":45876942},{"id":2,"apellido":"Casas","nombre":"Julian","fechaNacimiento":19990723,"dni":98536214},{"id":3,"apellido":"Galeano","nombre":"Julieta","fechaNacimiento":20081103,"dni":74859612},{"id":4,"apellido":"Molina","nombre":"Juana","fechaNacimiento":19681201,"paisOrigen":"Paraguay"},{"id":5,"apellido":"Barrichello","nombre":"Rubens","fechaNacimiento":19720523,"paisOrigen":"Brazil"},{"id":6,"apellido":"Hkkinen","nombre":"Mika","fechaNacimiento":19680928,"paisOrigen":"Finlandia"}]';
let tabla;
let formDatos;
let formAbm;

//CLASES
class Persona{
    constructor(id, nombre, apellido, fechaNacimiento)
    {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
    }
}

class Ciudadano extends Persona{
   
    constructor(id, nombre, apellido, fechaNacimiento, dni)
    {
        super(id, nombre, apellido, fechaNacimiento);
        this.dni = dni;
     
    }
}


class Extrangero extends Persona{
   
    constructor(id, nombre, apellido, fechaNacimiento, paisOrigen)
    {
        super(id, nombre, apellido, fechaNacimiento);
        this.paisOrigen = paisOrigen;
       
    }
}

 //LOGICA DE CLASE

let arrayJson = JSON.parse(stringJson);

let personas = [];

arrayJson.forEach(persona => {
    if(persona.dni !== undefined)
    {
        let ciudadano = new Ciudadano(persona.id, persona.nombre, persona.apellido, persona.fechaNacimiento, persona.dni);        
        personas.push(ciudadano);
    }
    else{
        let extrangero = new Extrangero(persona.id, persona.nombre, persona.apellido, persona.fechaNacimiento, persona.paisOrigen);        
        personas.push(extrangero);
    }
});

//Funciones

// Coulatr Columnas
function ocultarColumna(idColumna) {
    // Obtener todas las filas de la tabla
    let filas = tabla.getElementsByTagName('tr');

    // Ocultar la cabecera de la columna
    ocultarElemento(tabla.getElementsByTagName('th')[idColumna]);

    // Ocultar las celdas de la columna
    for (let i = 0; i < filas.length; i++) {
        let celda = obtenerCeldaEnFila(filas[i], idColumna);
        if (celda) {
            ocultarElemento(celda);
        }
    }
}

function ocultarElemento(elemento) {
    if (elemento) {
        elemento.style.display = 'none';
    }
}

function obtenerCeldaEnFila(fila, indice) {
    let celdas = fila.getElementsByTagName('td');
    return celdas[indice];
}


// Mostrar columnas
function mostrarColumna(idColumna) {
    // Obtener todas las filas de la tabla
    let filas = tabla.getElementsByTagName('tr');

    // Mostrar la cabecera de la columna
    mostrarElemento(tabla.getElementsByTagName('th')[idColumna]);

    // Mostrar las celdas de la columna
    for (let i = 0; i < filas.length; i++) {
        let celda = obtenerCeldaEnFila(filas[i], idColumna);
        if (celda) {
            mostrarElemento(celda);
        }
    }
}

function mostrarElemento(elemento) {
    if (elemento) {
        elemento.style.display = ''; // Restaurar la visualizacion predeterminada
    }
}

function obtenerCeldaEnFila(fila, indice) {
    let celdas = fila.getElementsByTagName('td');
    return celdas[indice];
}

// Actualizar Tabla

function ordenarTabla(colNum, columna, orden){
    
    let tbody = tabla.querySelector('tbody');
    let filasArray = Array.from(tbody.rows);            
    let comparar;

    let ordenNumericoAsc = function(filaA, filaB) 
    {
        let valorA = parseInt(filaA.cells[colNum].innerHTML);
        let valorB = parseInt(filaB.cells[colNum].innerHTML);
        return valorA - valorB;
    };

    let ordenStringAsc = function(filaA, filaB) 
    {
        return filaA.cells[colNum].innerHTML > filaB.cells[colNum].innerHTML ? 1 : -1;
    };

    let ordenNumericoDsc = function(filaA, filaB) 
    {
        let valorA = parseInt(filaA.cells[colNum].innerHTML);
        let valorB = parseInt(filaB.cells[colNum].innerHTML);
        return valorB - valorA;
    };

    let ordenStringDsc = function(filaA, filaB) 
    {
        return filaA.cells[colNum].innerHTML < filaB.cells[colNum].innerHTML ? 1 : -1;
    };

    
    if(orden == "asc")
    {
        switch (columna) {
            case 'Id':
                comparar = ordenNumericoAsc; 
                break;
            case 'Nombre': 
                comparar = ordenStringAsc;
                break;
            case 'Apellido':
                comparar = ordenStringAsc;
                break;
            case 'Fecha de Nacimiento':
                comparar = ordenNumericoAsc;
                break;
            case 'Dni':
                comparar = ordenNumericoAsc;
                break;

            case 'Pais de Origen':
                comparar = ordenNumericoAsc;
                break;
       
        }
    }
    else
    {
        switch (columna) {
            case 'Id':
                comparar = ordenNumericoDsc; 
                break;
            case 'Nombre':
                comparar = ordenStringDsc;
                break;
            case 'Apellido':
                comparar = ordenStringDsc;
                break;
            case 'Fecha de Nacimiento':
                comparar = ordenNumericoDsc;
                break;
            case 'Dni':
                comparar = ordenNumericoDsc;
                break;

            case 'Pais de Origen':
                comparar = ordenNumericoDsc;
                break;
       
        }
    }
    // sort
    filasArray.sort(comparar);
    tbody.append(...filasArray);
}

function limpiarCampos()
{
    document.getElementById("textId").value = "";
    document.getElementById("textNombre").value = "";
    document.getElementById("textApellido").value = "";
    document.getElementById("textFechaDeNacimiento").value = "";
    document.getElementById("textDni").value = "";
    document.getElementById("textPaisDeOrigen").value = "";
}

// Llenar campos del ABM con el objeto
function llenarCampos(persona){

    document.getElementById("textId").value = persona[0].textContent;
    document.getElementById("textNombre").value = persona[1].textContent;
    document.getElementById("textApellido").value = persona[2].textContent;
    document.getElementById("textFechaDeNacimiento").value = persona[3].textContent;

    switch(document.getElementById("selABM").value)
    {
        case "Ciudadano":
            document.getElementById("textDni").value = persona[4].textContent;
                       
            break;
        case "Extrangero":
            document.getElementById("textPaisDeOrigen").value = persona[5].textContent;
          
            break;
    }
}

//CheckBox muestran y ocultan columnas

function asginarEventosCheckboxes()
{
    var checkboxes = document.querySelectorAll('.checkbox');

    checkboxes.forEach(function(checkbox) 
    {
        checkbox.addEventListener('change', function() {

            if (this.checked) 
            {
                mostrarColumna(this.value);
            } 
            else 
            {
                ocultarColumna(this.value);
            }
        });
    });        
};


function generarId(lista) {
    // Obtener el ultimo ID en la lista y devolver su valor + 1
    let ultimoId = encontrarUltimoId(lista);
    return ultimoId + 1;
}

function encontrarUltimoId(lista) {
    // Utilizar reduce para encontrar el ultimo ID en la lista
    return lista.reduce((valorAnterior, elementoActual) => {
        if (elementoActual.id > valorAnterior) {
            return elementoActual.id;
        } else {
            return valorAnterior;
        }
    }, 1); // Valor inicial del valor anterior
}


function crearTabla(lista, tabla)
{
    tbody = document.getElementById("cuerpo_tabla");
        
    if(!(tbody !== null))
    {
        tbody = tabla.createTBody();
        tbody.id = "cuerpo_tabla";
    }

    tbody.innerHTML = "";

    lista.forEach(persona => {
        let row = tbody.insertRow();
        let values = [persona.id, persona.nombre, persona.apellido, persona.fechaNacimiento];

        if (persona instanceof Ciudadano)
        {
            values.push(persona.dni, "");
        }
        else if (persona instanceof Extrangero)
        {
            values.push("",persona.paisOrigen);
        }
            values.forEach(value => {
                let cell = row.insertCell();
                let text = document.createTextNode(value);
                cell.appendChild(text);
            });
    });

    //Cuando se realiza alguna accion en el form se llama a cearTabla() 

    var checkboxes = document.querySelectorAll('.checkbox');

    checkboxes.forEach((checkb)=> 
    {
        if (checkb.checked) 
        {
            mostrarColumna(checkb.value);
        } 
        else 
        {
            ocultarColumna(checkb.value);
        }
    })
}

//Validadciones
function isNull(value) {
    return value == null;
};

function isNullOrEmpty(value) {
    return isNull(value) || value === "";
};

function isNumeric(value) {
    return !isNull(value) && !isNaN(value) && !isNaN(parseFloat(value))
};
   
function ValidarDatosAbm(){
    if (isNullOrEmpty(document.getElementById("textNombre").value)) {
        alert("Debe indicar un nombre");
        return false;
    }
    if (isNullOrEmpty(document.getElementById("textApellido").value)) {
        alert("Debe indicar un apellido");
        return false;
    }
    if (!isNumeric(document.getElementById("textFechaDeNacimiento").value)) {
        alert("Debe indicar un valor de fechaNacimiento numerico");
        return false;
    }
    if (parseInt(document.getElementById("textFechaDeNacimiento").value) < 0) {
        alert("Debe indicar un valor de fechaNacimiento");
        return false;
    }

        switch (document.getElementById("selABM").value) {
            case "Ciudadano":

                if (!isNumeric(document.getElementById("textDni").value)) {
                    alert("Debe indicar un valor numerico para DNI");
                    return false;
                }
                if (parseInt(document.getElementById("textDni").value) < 0) {
                    alert("Debe indicar un valor numerico para DNI");
                    return false;
                }

            break;

            case "Extrangero":

                if (isNullOrEmpty(document.getElementById("textPaisDeOrigen").value)) {
                    alert("Debe indicar un pais de Origen valido");
                    return false;
                }

                break;
            }

            return true;
        }
                   

    //EVENTOS
     window.addEventListener('load', ()=>{
        
        tabla = document.getElementById("tabla");
        formDatos = document.getElementById("formDatos");
        formAbm = document.getElementById("formAbm");

        formAbm.style.display = "none";

        crearTabla(personas, tabla);

        let filtro = document.getElementById("filtroFormDatos");
        let cuerpoTabla = tabla.getElementsByTagName("tbody")[0];

        filtro.addEventListener('change',()=>{
            aMostrar = [];
            let tbody =  document.getElementById("cuerpo_tabla");

            switch (filtro.value){
                case "opcionCiudadano":
                    tbody.innerHTML = "";
                    personas.forEach(persona=>{
                        if(persona instanceof Ciudadano)
                        {
                            aMostrar.push(persona);
                        }
                    })
                    crearTabla(aMostrar, tabla);
                    break;
                case "opcionExtrangero":
                    tbody.innerHTML = "";
                    personas.forEach(persona=>{
                        if(persona instanceof Extrangero)
                        {
                            aMostrar.push(persona);
                        }
                    })
                    crearTabla(aMostrar, tabla);
                    break;

                default :
                    tbody.innerHTML = "";
                    crearTabla(personas ,tabla);
                break;
            } 
        });

        // Boton Calcular
       
        btnCalcular = document.getElementById("btnCalcular");

             // Definir la funcion de manejo del evento click
        const calcularEdadPromedio = () => {
            let edades = obtenerEdadesDeTabla();
            let edadPromedio = calcularPromedio(edades);
            mostrarEdadPromedio(edadPromedio);
        };

             // Agregar el evento 'click' al boton
        btnCalcular.addEventListener('click', calcularEdadPromedio);
        
        
        function obtenerEdadesDeTabla() {
            let edades = [];
            for (let i = 0; i < tabla.rows.length - 1; i++) {
                let fila = cuerpoTabla.getElementsByTagName("tr")[i];
                let celdas = fila.getElementsByTagName("td");
                edades.push(parseInt(celdas[3].textContent));
            }
            return edades;
        }

                       

        function calcularPromedio(edades) {
            let sumaEdades = edades.reduce((acumulado, actual) => acumulado + actual, 0);
            return sumaEdades / edades.length;
        }

        function mostrarEdadPromedio(promedio) {
            let edadPromedio = document.getElementById("edadPromedio");
            edadPromedio.value = promedio.toFixed(2);
        }


        //Boton Agregar

        let btnAgregar = document.getElementById("btnAgregar");
        
        btnAgregar.addEventListener('click', () =>{
            formDatos.style.display = "none";
            formAbm.style.display = "";

            document.getElementById("btnEliminar").style.display = "none";
            document.getElementById("btnModificar").style.display = "none";
            document.getElementById("btnAlta").style.display = "";

            if(document.getElementById("selABM").value == "Ciudadano")
            {
                document.getElementById("camposExtrangero").style.display = "none";
                document.getElementById("camposCiudadano").style.display = "";
            }
            else
            {
                document.getElementById("camposExtrangero").style.display = "";
                document.getElementById("camposCiudadano").style.display = "none";
            }
        });

        //Boton Cancelar

        let btnCancelar = document.getElementById("btnCancelar");
        btnCancelar.addEventListener('click', () =>
        {
            formAbm.style.display = "none";
            formDatos.style.display = "";

            selectAbm.disabled = false;
            limpiarCampos();
        })
        
        let selectAbm = document.getElementById("selABM");
        selectAbm.addEventListener('change',()=>
        {
            switch(selectAbm.value)
            {
                case "Ciudadano":
                    document.getElementById("camposExtrangero").style.display = "none";
                    document.getElementById("camposCiudadano").style.display = "";
                    break;

                case "Extrangero":
                    document.getElementById("camposExtrangero").style.display = "";
                    document.getElementById("camposCiudadano").style.display = "none";
                    break;
            }
        });
        
        //Boton Alta

        let btnAlta = document.getElementById("btnAlta");
        btnAlta.addEventListener('click', () =>{

            if(ValidarDatosAbm()){
                switch(selectAbm.value){

                    case "Ciudadano":

                        let nuevoCiudadano = new Ciudadano(
                            generarId(personas), 
                            document.getElementById("textNombre").value, 
                            document.getElementById("textApellido").value,
                            document.getElementById("textFechaDeNacimiento").value,
                            document.getElementById("textDni").value,
                         
                            );
                        
                        personas.push(nuevoCiudadano);
                        
                        crearTabla(personas, tabla);
                        
                        formAbm.style.display = "none";
                        formDatos.style.display = "";
                        
                        limpiarCampos();
                        break;

                    case "Extrangero":
                        let nuevoExtrangero = new Extrangero(
                            generarId(personas), 
                            document.getElementById("textNombre").value, 
                            document.getElementById("textApellido").value,
                            document.getElementById("textFechaDeNacimiento").value,                                
                            document.getElementById("textPaisDeOrigen").value,
                         
                            );
                        
                        personas.push(nuevoExtrangero);
                        
                        crearTabla(personas, tabla);
                        
                        formAbm.style.display = "none";
                        formDatos.style.display = "";
                        
                        limpiarCampos();
                        break;
                }
            }

        });

        
        tabla.addEventListener('dblclick', (e)=>{

            let fila = e.target.closest('tr');

            if (fila.rowIndex !== 0)
            {
                formAbm.style.display = "";
                formDatos.style.display = "none";

                document.getElementById("btnEliminar").style.display = "";
                document.getElementById("btnModificar").style.display = "";
                document.getElementById("btnAlta").style.display = "none";

                selectAbm.disabled = true;

                if(!(fila.cells[4].textContent == ""))
                {
                    selectAbm.value = "Ciudadano";
                    document.getElementById("camposCiudadano").style.display = "";
                    document.getElementById("camposExtrangero").style.display = "none";
                }
                else
                {
                    selectAbm.value = "Extrangero";
                    document.getElementById("camposCiudadano").style.display = "none";
                    document.getElementById("camposExtrangero").style.display = "";
                }
                llenarCampos(fila.cells);
            }
        });

        tabla.addEventListener('click', (e)=>{

            let columna = e.target;

            if(columna.value == "asc")
            {
                columna.value = "dsc";
            }
            else
            {
                columna.value = "asc"
            }
            ordenarTabla(columna.cellIndex, columna.textContent, columna.value);                
        });

        //Boton Modificar

        let btnModificar = document.getElementById("btnModificar");
        btnModificar.addEventListener('click', () =>
        {
            if(ValidarDatosAbm())
            {
                personas.forEach(persona => 
                {
                    if(persona.id == document.getElementById("textId").value)
                    {
                        persona.nombre = document.getElementById("textNombre").value;
                        persona.apellido = document.getElementById("textApellido").value;
                        persona.fechaNacimiento = document.getElementById("textFechaDeNacimiento").value;

                        if(persona instanceof Ciudadano)
                        {
                            persona.dni = document.getElementById("textDni").value;
                          
                        }
                        else
                        {
                            persona.paisOrigen = document.getElementById("textPaisDeOrigen").value;
                                                                                         
                        }
                    }
                })

                 // Ocultar el formulario 
                formAbm.style.display = "none";
                formDatos.style.display = "";

                selectAbm.disabled = false;

                 // Actualizar la tabla con la nueva lista de personas
                crearTabla(personas, tabla);
                limpiarCampos();
            }
        });

        //Boton Eliminar

        // Obtener referencia al boton de eliminar por su ID
        let btnEliminar = document.getElementById("btnEliminar");

        // Agregar evento de clic al boton de eliminar
        btnEliminar.addEventListener('click', () => {
            eliminarPersona();
            actualizarInterfaz();
        });

        // Funcion para eliminar la persona de la lista segun el ID proporcionado en el campo de texto
        function eliminarPersona() {
            // Obtener el ID de la persona a eliminar del campo de texto
            let idPersonaEliminar = parseInt(document.getElementById("textId").value);

            // Filtrar la lista de personas para crear una nueva lista sin la persona a eliminar
            personas = personas.filter(persona => persona.id !== idPersonaEliminar);
        }

        // Funcion para actualizar la interfaz despues de eliminar la persona
        function actualizarInterfaz() {
            // Actualizar la tabla con la nueva lista de personas
            crearTabla(personas, tabla);
           
            limpiarCampos();

            // Ocultar el formulario 
            formAbm.style.display = "none";
            formDatos.style.display = "";

            // Habilitar nuevamente el select de opciones de edicion
            selectAbm.disabled = false;
        }



        asginarEventosCheckboxes();                   
    });

 

    

        
        