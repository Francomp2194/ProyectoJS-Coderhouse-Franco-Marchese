
let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];


const carritoProductosDiv = document.querySelector("#carrito-productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoAcciones = document.querySelector("#carrito-acciones");
const totalElement = document.querySelector("#total");
const carritoComprado = document.querySelector("#carrito-comprado");


function renderizarCarrito() {
    carritoProductosDiv.innerHTML = ""; 

    if (productosEnCarrito.length === 0) {
        carritoVacio.classList.remove("disabled");
        carritoAcciones.classList.add("disabled");
    } else {
        carritoVacio.classList.add("disabled");
        carritoAcciones.classList.remove("disabled");

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("producto-en-carrito");
            div.innerHTML = `
                <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio">Precio: $${producto.precio}</p>
                    <p class="producto-cantidad">Cantidad: ${producto.cantidad}</p>
                    <button class="producto-eliminar" id="${producto.id}">Eliminar</button>
                </div>
            `;
            carritoProductosDiv.append(div);
        });

        const total = productosEnCarrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
        totalElement.innerText = `$${total}`;
    }
}


function vaciarCarrito() {
    productosEnCarrito = [];
    localStorage.removeItem("productos-en-carrito");
    renderizarCarrito();
}


function eliminarProducto(e) {
    const idBoton = e.currentTarget.id;
    productosEnCarrito = productosEnCarrito.filter(producto => producto.id !== idBoton);
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    renderizarCarrito();
}


function comprar() {
    productosEnCarrito = [];
    localStorage.removeItem("productos-en-carrito");
    renderizarCarrito();
    carritoComprado.classList.remove("disabled");
}


document.querySelector("#carrito-acciones-vaciar").addEventListener("click", vaciarCarrito);
document.querySelector("#carrito-acciones-comprar").addEventListener("click", comprar);

carritoProductosDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("producto-eliminar")) {
        eliminarProducto(e);
    }
});


renderizarCarrito();