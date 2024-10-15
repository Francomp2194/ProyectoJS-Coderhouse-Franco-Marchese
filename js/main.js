const productos = [
    {
        id: "auri01",
        titulo: "auriculares01",
        imagen: "./img/auriculares/auri01.jpg",
        categoria: {
            Nombre: "Auriculares",
            id: "auriculares"
        },
        precio: 3000
    },
    {
        id: "auri02",
        titulo: "auriculares02",
        imagen: "./img/auriculares/auri02.jpg",
        categoria: {
            Nombre: "Auriculares",
            id: "auriculares"
        },
        precio: 3000
    },
    {
        id: "auri03",
        titulo: "auriculares03",
        imagen: "./img/auriculares/auri03.jpg",
        categoria: {
            Nombre: "Auriculares",
            id: "auriculares"
        },
        precio: 3000
    },
    {
        id: "auri04",
        titulo: "auriculares04",
        imagen: "./img/auriculares/auri04.jpg",
        categoria: {
            Nombre: "Auriculares",
            id: "auriculares"
        },
        precio: 3000
    },
    {
        id: "cel01",
        titulo: "celular01",
        imagen: "./img/celulares/cel01.jpg",
        categoria: {
            Nombre: "Celulares",
            id: "celulares"
        },
        precio: 15000
    },
    {
        id: "cel02",
        titulo: "celular02",
        imagen: "./img/celulares/cel02.jpg",
        categoria: {
            Nombre: "Celulares",
            id: "celulares"
        },
        precio: 15000
    },
    {
        id: "cel03",
        titulo: "celular03",
        imagen: "./img/celulares/cel03.jpg",
        categoria: {
            Nombre: "Celulares",
            id: "celulares"
        },
        precio: 15000
    },
    {
        id: "tablet01",
        titulo: "tablet01",
        imagen: "./img/tablets/tablet01.jpg",
        categoria: {
            Nombre: "Tablets",
            id: "tablets"
        },
        precio: 20000
    },
    {
        id: "tablet02",
        titulo: "tablet02",
        imagen: "./img/tablets/tablet02.jpg",
        categoria: {
            Nombre: "Tablets",
            id: "tablets"
        },
        precio: 20000
    },
    {
        id: "tablet03",
        titulo: "tablet03",
        imagen: "./img/tablets/tablet03.jpg",
        categoria: {
            Nombre: "Tablets",
            id: "tablets"
        },
        precio: 20000
    }
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector(".titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numero = document.querySelector("#numero");

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    });

    actualizarBotonesAgregar();
}

cargarProductos(productos);
tituloPrincipal.innerText = "Todos los Productos";

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(b => b.classList.remove("active"));

        e.currentTarget.classList.add("active");

        if (e.currentTarget.id === "todos") {
            cargarProductos(productos);
            tituloPrincipal.innerText = "Todos los Productos";
        } else {
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
            tituloPrincipal.innerText = productosBoton[0].categoria.Nombre;
        }
    });
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    actualizarNumero();
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumero();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumero() {
    let nuevoNumero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numero.innerText = nuevoNumero;
}