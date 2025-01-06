document.addEventListener("DOMContentLoaded", function () {
  navegacionFija();
  crearGaleria();
	resaltarEnlace();
	scrollNav();
});

function scrollNav() {
	const enlaces = document.querySelectorAll(".navegacion-principal a");

	enlaces.forEach((enlace) => {
		enlace.addEventListener("click", function (e) {
			e.preventDefault();

			const seccion = document.querySelector(e.target.attributes.href.value);
			seccion.scrollIntoView({
				behavior: "smooth",
			});
		});
	});
}

function resaltarEnlace() {
	document.addEventListener('scroll', function() {
		const sections = document.querySelectorAll('section');
		const navlinks = document.querySelectorAll('.navegacion-principal a');

		let actual = '';
		sections.forEach(section => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.clientHeight;

			if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
				actual = section.id;

				
			}
		})

		navlinks.forEach(link => {
			if(link.getAttribute('href') === '#' + actual) {
				link.classList.add('activo');
			} else {
				link.classList.remove('activo');
			}
		})

	});
};

function navegacionFija() {
	const header = document.querySelector('.header');
	const sobreFestival = document.querySelector('.sobre-festival');

	window.addEventListener('scroll', function() {
		const scroll = window.scrollY;

		if ( sobreFestival.getBoundingClientRect().bottom <= 10 ) {
			header.classList.add('fixed');
		} else {
			header.classList.remove('fixed');
		}
	});
};

function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");

  const CANTIDAD_IMAGENES = 16;

  for (let i = 1; i <= CANTIDAD_IMAGENES; i++) {
    const imagen = document.createElement("PICTURE");
	imagen.innerHTML = `
    <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
    <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
	`;


    imagen.onclick = function () {
      mostrarImagen(i);
    };

    galeria.appendChild(imagen);
  }
}

function mostrarImagen(i) {
	const imagen = document.createElement("PICTURE");
	imagen.innerHTML = `
    <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
    <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
	`;

  //Generar modal
  const modal = document.createElement("DIV");
  modal.classList.add("modal");

  modal.onclick = cerrarModal;

  const cerrarModalBtn = document.createElement("BUTTON");
  cerrarModalBtn.textContent = "X";
  cerrarModalBtn.classList.add("btn-cerrar");
  cerrarModalBtn.onclick = cerrarModal;

  modal.appendChild(imagen);
  modal.appendChild(cerrarModalBtn);

  const body = document.querySelector("body");
  body.appendChild(modal);
  body.classList.add("overflow-hidden");
}

function cerrarModal() {
  const body = document.querySelector("body");
  const modal = document.querySelector(".modal");
  modal.classList.add("fade-out");
  setTimeout(() => {
    body.classList.remove("overflow-hidden");
    modal?.remove();
  }, 500);
}
