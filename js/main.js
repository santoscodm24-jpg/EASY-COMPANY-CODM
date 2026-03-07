// Función principal para cargar la inteligencia (datos) de la EASY COMPANY
async function cargarContenido() {
    try {
        // Buscamos el archivo de datos en el repositorio
        const respuesta = await fetch('data.json');
        
        if (!respuesta.ok) {
            throw new Error('No se pudo cargar el archivo data.json');
        }

        const data = await respuesta.json();

        // 1. Actualizar Sección de Estrenos
        const contenedorEstrenos = document.getElementById('estrenos-container');
        if (contenedorEstrenos) {
            contenedorEstrenos.innerHTML = `
                <div class="card">
                    <img src="${data.estrenos.imagen}" alt="Operación CODM" onerror="this.src='https://via.placeholder.com/800x400?text=SIN+IMAGEN+TACTICA'">
                    <div class="card-content">
                        <h3 style="color:var(--gold); margin-top:0;">${data.estrenos.titulo}</h3>
                        <p>${data.estrenos.descripcion}</p>
                    </div>
                </div>
            `;
        }

        // 2. Actualizar Sección de Salas / WhatsApp
        const btnWhatsapp = document.getElementById('whatsapp-btn');
        if (btnWhatsapp && data.config.whatsapp) {
            // Limpiamos el número por si acaso y armamos el link
            const numeroLimpio = data.config.whatsapp.replace(/\D/g, '');
            btnWhatsapp.href = `https://wa.me/${numeroLimpio}?text=Hola%20EASY%20COMPANY,%20solicito%20acceso%20a%20la%20sala%20personalizada.`;
        }

    } catch (error) {
        console.error("ERROR TÁCTICO:", error);
        // Mensaje de error visual para el usuario si falla la carga
        const contenedor = document.getElementById('estrenos-container');
        if (contenedor) {
            contenedor.innerHTML = "<p style='color:red;'>⚠️ Error al cargar datos. Verifique que data.json existe.</p>";
        }
    }
}

// Ejecutar la carga cuando el documento esté listo
document.addEventListener('DOMContentLoaded', cargarContenido);
