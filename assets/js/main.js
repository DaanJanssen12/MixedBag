$(document).ready(async function(){
  await $("#header").load("./common/header.html");
  await $("#footer").load("./common/footer.html");
  if(window.location.search !== '') {
    var urlParams = new URLSearchParams(window.location.search);
    if(window.location.search.includes('page')){
      var page = 'pages/' + urlParams.get('page') + '.html';
      load_page(null, page);
    }
    else {
      $("#main").load("./pages/home.html");
    }
  }
  else {
    $("#main").load("./pages/home.html");
  }

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
 
   /**
    * Animation on scroll
    */
   window.addEventListener('load', () => {
     AOS.init({
       duration: 1000,
       easing: 'ease-in-out',
       once: true,
       mirror: false
     })
   });
});

async function load_page(menuItem, pageToLoad, menuParent) {
  await $("#main").load(pageToLoad);
  
  let pageResult = "?page="+pageToLoad.substring(pageToLoad.indexOf('/')+1, pageToLoad.indexOf('.'));
  await window.history.pushState("object or string", "Title", pageResult);
  
  $("#navbar .active").removeClass("active");
  if(menuItem !== undefined){
    $(menuItem).addClass("active");
  }
  if(menuParent !== undefined){
    $(menuParent).addClass("active");
  }
  
  if($(".back-to-top").length > 0){
    $(".back-to-top").trigger('click');
  }
  
  if($('.mobile-nav-toggle').length > 0 && $('.mobile-nav-toggle').css("display") !== "none"){
    if($('.mobile-nav-toggle').hasClass('bi-x')){
      $('.mobile-nav-toggle').trigger('click');
    }
  }
  
  return false;
}

/**
   * Easy on scroll event listener 
   */
 const onscroll = (el, listener) => {
  el.addEventListener('scroll', listener)
}