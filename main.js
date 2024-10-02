document.addEventListener('DOMContentLoaded', () => {
    fetch('taller.json')
        .then(response => response.json())
        .then(data => {
            
            document.getElementById('titulo-pagina').textContent = data.titulo_pagina;

            const productosList = document.getElementById('productos-list');
            data.productos.forEach(producto => {
                const row = document.createElement('tr');
                let reseñasHTML = "";

                producto.reseñas.forEach(reseña => {
                    reseñasHTML += `
                        <strong>${reseña.usuario}</strong> (${reseña.calificacion}/5) - ${reseña.fecha}<br>
                        <i>${reseña.comentario}</i><br><br>
                    `;
                });

                const imagenHTML = `<img src="${producto.imagenes[0]}" alt="${producto.nombre}" class="img-fluid" width="100">`;

                row.innerHTML = `
                    <td>${imagenHTML}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.categoria}</td>
                    <td>${producto.descripcion}</td>
                    <td>$${producto.precio}</td>
                    <td>${reseñasHTML}</td>
                `;

                productosList.appendChild(row);
            });

            document.getElementById('direccion').textContent = `Dirección: ${data.datos_tienda.direccion}`;
            document.getElementById('telefono').textContent = `Teléfono: ${data.datos_tienda.telefono}`;
            document.getElementById('correo').textContent = `Correo: ${data.datos_tienda.correo}`;
            document.getElementById('horario').innerHTML = `
                Horario de Atención:<br>
                Lunes a Viernes: ${data.datos_tienda.horario_atencion.lunes_a_viernes}<br>
                Sábados: ${data.datos_tienda.horario_atencion.sabados}<br>
                Domingos: ${data.datos_tienda.horario_atencion.domingos}
            `;
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});
