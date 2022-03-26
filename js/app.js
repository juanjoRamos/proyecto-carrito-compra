
//Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');

let articulosCarrito = [];
cargarEventListenes();

function cargarEventListenes(){
    listaCursos.addEventListener('click', agregarCurso); //Agregar curso al pulsar "Agregar al carrito"
    carrito.addEventListener('click', eliminarCurso); //Eliminar curso al pulsar "X"
    vaciarCarrito.addEventListener('click', ()=>{
        articulosCarrito = [];
        limpiarHTML();
    });
} 

function agregarCurso(event){
    event.preventDefault();
    if(event.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = event.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(event){
    event.preventDefault();
    if(event.target.classList.contains('borrar-curso')){
        const cursoId = event.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(curso => cursoId !== curso.id); //Agregar todos menos el que sea igual al curso a eliminar
    }
    carritoHTML();
}

function leerDatosCurso(curso){
    //Crear un objeto Curso
    const Curso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };
    //Comprobar si el articulo ya existe
    const existe = articulosCarrito.some((curso)=> curso.id === Curso.id);
    if(existe)
    {
        //actualizamos la cantidad
        const cursos = articulosCarrito.map((curso)=> {
            if(curso.id === Curso.id){
                curso.cantidad++; //Actualizar la cantidad del curso
                return curso;
            }else{
                return curso; //Retornar el curso tal cual está
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //Forma 1: articulosCarrito.push(Curso);
        articulosCarrito = [...articulosCarrito, Curso]; //Agregamos al carrito
    }
    //Agregar elementos al carrito   
    carritoHTML();
}

function carritoHTML(){
    //Muestra el carrito de comprar en el HTML 

    //Limpiar el HTML
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach((curso)=>{
        const { id, imagen, titulo, precio, cantidad } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${imagen}" width="100"/></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
        `;
        //Agregar el HTML del carrito en el tbody
        listaCarrito.appendChild(row);
    });

}

function limpiarHTML(){
    //-- Forma lenta= articulosCarrito.innerHTML = ``; 
    while(listaCarrito.firstChild){
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
}