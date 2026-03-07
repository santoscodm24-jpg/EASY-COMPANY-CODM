document.addEventListener('DOMContentLoaded', () => cargarSistema());

async function cargarSistema() {
    try {
        const timestamp = new Date().getTime();
        const response = await fetch(`data.json?v=${timestamp}`);
        const data = await response.json();

        // 1. CARGAR NOTICIA/ESTRENO
        document.getElementById('estrenos-container').innerHTML = `
            <div style="background:var(--card); border-top:3px solid var(--gold); display:flex; flex-wrap:wrap; overflow:hidden; border-radius:5px;">
                <img src="${data.estrenos.imagen}" style="width:100%; max-width:350px; height:220px; object-fit:cover;">
                <div style="padding:25px; flex:1;">
                    <h3 style="color:var(--gold); font-family:'Black Ops One'; margin:0 0 10px;">${data.estrenos.titulo}</h3>
                    <p style="line-height:1.6; color:#aaa;">${data.estrenos.descripcion}</p>
                </div>
            </div>
        `;

        // 2. CARGAR SALA DINÁMICA
        document.getElementById('sala-container').innerHTML = `
            <h3 style="font-family:'Black Ops One'; color:var(--gold); margin:0;">${data.sala.titulo}</h3>
            <div class="info-acceso">${data.sala.info}</div>
            <p style="font-size:0.8rem; color:#555;">Sigue las reglas del clan. No compartir fuera de la unidad.</p>
        `;

        // 3. CARGAR HALL DE LA FAMA
        document.getElementById('hall-container').innerHTML = data.hall_fama.map(p => `
            <div class="player-card">
                <img src="${p.foto}" onerror="this.src='https://via.placeholder.com/150'">
                <div style="color:var(--gold); font-family:'Black Ops One'; font-size:0.8rem; margin-top:10px;">${p.nombre}</div>
            </div>
        `).join('');

        // 4. LINK WHATSAPP
        document.getElementById('whatsapp-btn').href = `https://wa.me/${data.config.whatsapp}`;

    } catch (e) {
        console.error("Error táctico:", e);
    }
}
