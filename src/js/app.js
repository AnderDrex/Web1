document.addEventListener('DOMContentLoaded',function(){
    iniciarApp();
});
function iniciarApp(){
    crearGaleria();
    scrollNav();
    navegacionFija();
}
function navegacionFija(){
    const barra=document.querySelector('.header');
    const sobreFestival=document.querySelector('.sobre-festival');
    const body=document.querySelector('body');
    window.addEventListener('scroll',function(){
        if(sobreFestival.getBoundingClientRect().bottom<0){
            barra.classList.add('fija');
            body.classList.add('body-scroll');
        }
        else{
            barra.classList.remove('fija');
            body.classList.remove('body-scroll');
        }
    })
}
//Scroll en la pagina 
function scrollNav(){
    const enlaces=document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(enlace=>{
        enlace.addEventListener('click', function(e){
            e.preventDefault();
            const seccionScroll=e.target.attributes.href.value;
            const seccionScroll1 = "."+seccionScroll.substr(1);
            const seccion=document.querySelector(seccionScroll1);
            seccion.scrollIntoView({behavior:"smooth"})
            console.log(seccion);
        });
    });
    
}

//Craecion de la imagenes pequeñas
function crearGaleria(){
    const galeria=document.querySelector('.galeria-imagenes');
    for(let i=1; i<=12; i++){
        const imagen=document.createElement('picture');
        imagen.innerHTML=`
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        `;
        galeria.appendChild(imagen);
        imagen.onclick=function(){
            mostrarImagen(i);
        }
    }
}
function mostrarImagen(id){
//Creando la imagen grande 
    const imagen=document.createElement('picture');
        imagen.innerHTML=`
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">
        `;
//Craendo el overlay con la imagen
    const overlay=document.createElement('div');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick=function(){
        const body=document.querySelector('body');
        overlay.remove();
        body.classList.remove('fijar-body');
    }
//Boton para cerrar el modal
    const cerrarModal=document.createElement('p');
    cerrarModal.textContent='X'
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick=function(){
        const body=document.querySelector('body');
        overlay.remove();
        body.classList.remove('fijar-body');
    }
    overlay.appendChild(cerrarModal);
    //Colocandolo al body 
    const body=document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}