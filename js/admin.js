const KEY = "EASY2026";

function checkAccess() {
    const pass = document.getElementById('pass').value;
    const overlay = document.getElementById('login-overlay');
    if (pass === KEY) {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.style.display = 'none', 500);
    } else {
        alert("ACCESO DENEGADO");
    }
}

function gen() {
    // Validación básica para evitar campos vacíos que rompan el diseño
    const t = document.getElementById('t').value || "MISION SIN TITULO";
    const i = document.getElementById('i').value || "https://via.placeholder.com/800x400";
    const d = document.getElementById('d').value || "Sin descripción disponible.";
    const w = document.getElementById('w').value || "0";

    const data = {
        "estrenos": {
            "titulo": t.toUpperCase(),
            "imagen": i,
            "descripcion": d
        },
        "config": {
            "whatsapp": w.replace(/\D/g, '')
        }
    };

    const out = document.getElementById('out');
    out.textContent = JSON.stringify(data, null, 4);
    document.getElementById('output-section').style.display = 'block';
}
