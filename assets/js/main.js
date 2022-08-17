$(document).ready(async function(){
  if($("#HAS_LOADED").val() <= 0){
    $("#HAS_LOADED").val(1);

    $("#footer").load("./common/footer.html");
    $("#header").load("./common/header.html");
    if(window.location.search !== '') {
      var urlParams = new URLSearchParams(window.location.search);
      if(window.location.search.includes('id'))
      {
        $("#POKEMON_ID").val(urlParams.get('id'));
      }
      if(window.location.search.includes('page')){
        var page = 'pages/' + urlParams.get('page') + '.html';
        load_page(null, page);
      }
      else {
        $("#main").load("./pages/pokedex-full.html");
      }
    }
    else {
      $("#main").load("./pages/pokedex-full.html");
    }
  }
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