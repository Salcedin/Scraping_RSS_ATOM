// Función para realizar la solicitud al servidor y mostrar las noticias
async function obtenerNoticias() {
    try {
        const response = await fetch('https://www.mujerhoy.com/rss/atom/?section=vivir'); // Replace 'URL_DEL_XML' with the actual URL of your XML file
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');

        const entries = xmlDoc.querySelectorAll('entry');
        const noticias = Array.from(entries).map(parseEntry);

        // Llamar a la función para renderizar las noticias en el DOM
        renderizarNoticias(noticias);
    } catch (error) {
        console.error('Error al obtener las noticias:', error);
    }
}

// Función para parsear una entrada de noticias
function parseEntry(entry) {
    return {
        id: entry.querySelector('id').textContent,
        title: entry.querySelector('title').textContent,
        link: entry.querySelector('link[rel="alternate"]').getAttribute('href'),
        updated: entry.querySelector('updated').textContent,
        summary: entry.querySelector('summary').textContent
    };
}

// Función para renderizar las noticias en el DOM
function renderizarNoticias(noticias) {
    const noticiasContainer = document.getElementById('noticias-container');

    noticias.forEach((noticia) => {
        const noticiaElement = document.createElement('div');

        noticiaElement.innerHTML = `
            <h2>${noticia.title}</h2>
            <p>${noticia.summary}</p>
            <a href="${noticia.link}" target="_blank">Leer más</a>
            <p>Fecha de actualización: ${noticia.updated}</p>
            <hr>
        `;

        noticiasContainer.appendChild(noticiaElement);
    });
}

// Llamar a la función para obtener y mostrar las noticias al cargar la página
document.addEventListener('DOMContentLoaded', obtenerNoticias);