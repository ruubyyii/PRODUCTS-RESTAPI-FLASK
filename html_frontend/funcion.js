document.addEventListener('DOMContentLoaded', async () => {
    let carrito = [];

    let llamada = async () => {
        const API = await fetch('http://localhost:5000/products');
        let response = await API.json();
        return response.products;
    };

    let pinguino = async () => {
        let data = await llamada();
        let caja_1 = document.getElementById('caja_1');
        data.forEach(p => {
            caja_1.innerHTML += `
        <div class="flex border border-gray-300 p-4 m-4 rounded-lg shadow-md flex-col justify-center">
            <div class="flex justify-center items-center">
                <img src="${p.imagen}" alt="imagen" class="w-36 rounded-lg flex">
            </div>
            <div class="flex justify-between items-center mt-4">
                <h1 class="text-xl text-gray-800">${p.nombre}</h1>
                <p class="text-lg text-gray-600">${p.precio}€</p>
            </div>
            <button class="add bg-blue-500 text-white px-4 py-2 rounded-lg mt-2" data-producto='${JSON.stringify(p)}'>Comprar</button>
        </div>
        `;
        });

        // Agregar eventos a los botones "Comprar" después de que se hayan agregado al DOM
        let buttons = document.querySelectorAll('.add');
        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                let producto = JSON.parse(event.target.getAttribute('data-producto'));
                carrito.push(producto);
                console.log('Producto añadido:', producto);
            });
        });
    };

    let abrirCarrito = () => {
        let carritoContainer = document.getElementById('carrito');
        carritoContainer.innerHTML = `
            <div class="flex justify-end p-4">
                <button id="cerrarCarrito" class="text-xl">&times;</button>
            </div>
        `;
        carrito.forEach(p => {
            carritoContainer.innerHTML += `
        <div class="flex border border-gray-300 p-4 m-4 rounded-lg shadow-md flex-col justify-center">
            <div class="flex justify-center items-center">
                <img src="${p.imagen}" alt="imagen" class="w-36 rounded-lg flex">
            </div>
            <div class="flex justify-between items-center mt-4">
                <h1 class="text-xl text-gray-800">${p.nombre}</h1>
                <p class="text-lg text-gray-600">${p.precio}€</p>
            </div>
        </div>
        `;
        });
        carritoContainer.classList.add('right-0');
        carritoContainer.classList.remove('right-[-300px]');

        document.getElementById('cerrarCarrito').addEventListener('click', cerrarCarrito);
    };

    let cerrarCarrito = () => {
        let carritoContainer = document.getElementById('carrito');
        carritoContainer.classList.remove('right-0');
        carritoContainer.classList.add('right-[-300px]');
    };

    document.getElementById('carritoIcono').addEventListener('click', abrirCarrito);

    pinguino();
});