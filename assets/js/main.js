$(document).ready(async function(){
  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
   if ($('#header').length > 0) {
     const headerScrolled = () => {
       if (window.scrollY > 100) {
        $('#header').addClass('header-scrolled');
       } else {
        $('#header').removeClass('header-scrolled');
       }
     }
     window.addEventListener('load', headerScrolled);
     onscroll(document, headerScrolled);
   }
 
   /**
    * Back to top button
    */
   if ($('.back-to-top').length > 0) {
     const toggleBacktotop = () => {
       if (window.scrollY > 100) {
        $('.back-to-top').addClass('active');
       } else {
        $('.back-to-top').removeClass('active');
       }
     }
     window.addEventListener('load', toggleBacktotop);
     onscroll(document, toggleBacktotop);
   }
 
   /**
    * Testimonials slider
    */
   new Swiper('.testimonials-slider', {
     speed: 600,
     loop: true,
     autoplay: {
       delay: 5000,
       disableOnInteraction: false
     },
     slidesPerView: 'auto',
     pagination: {
       el: '.swiper-pagination',
       type: 'bullets',
       clickable: true
     }
   });
});

/**
   * Easy on scroll event listener 
   */
 const onscroll = (el, listener) => {
  el.addEventListener('scroll', listener)
}

function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
          callback(rawFile.responseText);
      }
  }
  rawFile.send(null);
}