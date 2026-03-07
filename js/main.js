/**
 * EASY COMPANY - MÓDULO DE INTELIGENCIA TÁCTICA
 * Este script sincroniza la web con el archivo data.json
 */

document.addEventListener('DOMContentLoaded', () => {
    cargarDatosMision();
});

async function cargarDatosMision() {
    // Referencias a los contenedores del HTML
    const contenedor = document.getElementById('estrenos-container');
    const btnWhatsapp = document.getElementById('whatsapp-btn');

    try {
        // Agregamos un número aleatorio al final para forzar a GitHub a dar el archivo más nuevo
        const cacheBuster = new Date().getTime();
        const response = await fetch(`data.json?v=${cacheBuster}`);

        if (!response.ok) {
            throw new Error('No se pudo establecer conexión con data.json');
        }

        const data = await response.json();

        // 1. ACTUALIZAR SECCIÓN DE ESTRENOS
        if (contenedor) {
            contenedor.innerHTML = `
                <div class="card" style="animation: fadeIn 1s ease-out;">
                    <img src="${data.estrenos.imagen}" alt="Misión CODM" 
                         onerror="this.src='https://wallpaperaccess.com/full/2105128.jpg'">
                    <div class="card-content">
                        <h3 style="color:var(--gold); font-family:'Black Ops One', cursive; margin-top:0;">
                            ${data.estrenos.titulo}
                        </h3>
                        <p style="line-height:1.6; color:#bbb;">
                            ${data.estrenos.descripcion.replace(/\n/g, '<br>')}
                        </p>
                    </div>
                </div>
            `;
        }

        // 2. ACTUALIZAR BOTÓN DE WHATSAPP
        if (btnWhatsapp && data.config.whatsapp) {
            // Limpiamos el número por si acaso quedaron espacios o símbolos
            const numLimpio = data.config.whatsapp.replace(/\D/g, '');
            btnWhatsapp.href = `https://wa.me/${numLimpio}?text=Saludos%20EASY%20COMPANY%2C%20solicito%20informaci%C3%B3n%20sobre%20las%20salas.`;
        }

    } catch (error) {
        console.error("FALLO TÁCTICO:", error);
        if (contenedor) {
            contenedor.innerHTML = `
                <div style="padding:40px; text-align:center; border:1px solid red; background:rgba(255,0,0,0.1);">
                    <p style="color:red; font-weight:bold;">⚠️ ERROR DE SINCRONIZACIÓN</p>
                    <small>Asegúrate de que el archivo 'data.json' esté en la raíz de tu GitHub.</small>
                </div>
            `;
        }
    }
}
