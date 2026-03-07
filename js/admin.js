// Función para generar el bloque de datos JSON para la EASY COMPANY
function generateIntelligence() {
    // Capturamos los valores de los campos del formulario
    const tituloInput = document.getElementById('t').value;
    const imagenInput = document.getElementById('i').value;
    const descInput = document.getElementById('d').value;
    const wsInput = document.getElementById('w').value;

    // Estructura del objeto que la página principal (main.js) sabe leer
    const intelligenceData = {
        "estrenos": {
            "titulo": tituloInput.toUpperCase() || "NUEVA MISIÓN",
            "imagen": imagenInput || "https://via.placeholder.com/800x400?text=IMAGEN+TACTICA",
            "descripcion": descInput || "Sin detalles adicionales de la misión."
        },
        "config": {
            "whatsapp": wsInput.replace(/\D/g, '') || "0" // Limpia el número de símbolos
        }
    };

    // Convertimos el objeto a texto (JSON) con sangría de 4 espacios
    const jsonString = JSON.stringify(intelligenceData, null, 4);

    // Mostramos el resultado en el área de texto del panel
    const outputArea = document.getElementById('out');
    const outputSection = document.getElementById('output-section');

    if (outputArea && outputSection) {
        outputArea.textContent = jsonString;
        outputSection.style.display = 'block'; // Hacemos visible la sección de código
        
        // Efecto visual: Scroll suave hacia el código generado
        outputSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Función para copiar el código al portapapeles rápidamente
function copyToClipboard() {
    const textToCopy = document.getElementById('out').textContent;
    
    if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert("¡CÓDIGO COPIADO! Ahora pégalo en tu archivo data.json en GitHub.");
        }).catch(err => {
            console.error('Error al copiar:', err);
            alert("Error al copiar. Por favor, selecciona el texto y cópialo manualmente.");
        });
    }
}

// Función de seguridad para el acceso al panel
function checkAccess() {
    const passInput = document.getElementById('pass').value;
    const KEY = "EASY2026"; // Tu clave de acceso

    if (passInput === KEY) {
        document.getElementById('login-overlay').style.display = 'none';
    } else {
        alert("ACCESO DENEGADO. CREDENCIALES INVÁLIDAS.");
    }
}
