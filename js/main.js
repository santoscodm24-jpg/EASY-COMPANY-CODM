document.addEventListener('DOMContentLoaded', () => {
    cargarContenido();
});

async function cargarContenido() {
    const contenedor = document.getElementById('estrenos-container');
    const btnWs = document.getElementById('whatsapp-btn');

    try {
        // Añadimos un timestamp para evitar que el navegador guarde una versión vieja (Caché)
        const respuesta = await fetch(`data.json?v=${new Date().getTime()}`);
        
        if (!respuesta.ok) throw new Error('Archivo de datos no encontrado');

        const data = await respuesta.json();

        // Renderizado Seguro de Estrenos
        if (contenedor) {
            contenedor.innerHTML = `
                <div class="card" style="animation: fadeIn 0.8s ease-in-out;">
                    <img src="${data.estrenos.imagen}" alt="CODM" onerror="this.src='https://via.placeholder.com/800x400?text=IMAGEN+NO+DISPONIBLE'">
                    <div class="card-content">
                        <h3 style="color:var(--gold); font-family:'Black Ops One';">${data.estrenos.titulo}</h3>
                        <p>${data.estrenos.descripcion}</p>
                    </div>
                </div>
            `;
        }

        // Configuración del Botón de WhatsApp
        if (btnWs && data.config.whatsapp) {
            const num = data.config.whatsapp.replace(/\D/g, '');
            btnWs.href = `https://wa.me/${num}?text=Saludos%20EASY%20COMPANY%2C%20solicito%20información.`;
        }

    } catch (error) {
        console.error("Error de carga:", error);
        if (contenedor) {
            contenedor.innerHTML = `
                <div style="border:1px solid red; padding:20px; text-align:center; color:red;">
                    <p>⚠️ ERROR DE CONEXIÓN CON EL CUARTEL GENERAL</p>
                    <small>Verifica que el archivo data.json esté en el repositorio.</small>
                </div>`;
        }
    }
}
