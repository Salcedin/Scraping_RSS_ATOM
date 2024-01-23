// Función para realizar la solicitud al servidor y mostrar las noticias
async function obtenerNoticias() {
    try {
        const response = await fetch('/atom');
        const noticias = await response.json();

        // Llamar a la función para renderizar las noticias en el DOM
        renderizarNoticias(noticias.feed.entry);
    } catch (error) {
        console.error('Error al obtener las noticias:', error);
    }
}

// Función para renderizar las noticias en el DOM
function renderizarNoticias(noticias) {
    const noticiasContainer = document.getElementById('noticias-container');

    noticias.forEach((noticia) => {
        const noticiaElement = document.createElement('div');

        noticiaElement.innerHTML = `
          <h2>${noticia.title}</h2>
          <p>${noticia.summary}</p>
          <p>Autor: ${obtenerAutor(noticia)}</p>
          <a href="${noticia.link[1].$.href}" target="_blank">Leer más</a>
          ${obtenerImagen(noticia)}
          <p>Fecha de publicación: ${noticia.updated}</p>
          <hr>
        `;

        noticiasContainer.appendChild(noticiaElement);
    });
}

// Función para obtener el autor de la noticia
function obtenerAutor(noticia) {
    if (noticia.author && noticia.author.name) {
        return noticia.author.name;
    } else {
        return 'Desconocido';
    }
}

// Función para obtener la URL de la imagen de la noticia
function obtenerImagen(noticia) {
    if (noticia.link[2] && noticia.link[2].$.type.startsWith('image/')) {
        return `<img src="${noticia.link[2].$.href}" alt="${noticia.title}">`;
    } else {
        return '';
    }
}

// Llamar a la función para obtener y mostrar las noticias al cargar la página
document.addEventListener('DOMContentLoaded', obtenerNoticias);
