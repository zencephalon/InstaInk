$(document).ready(function() {
  gallery = new Gallery($('#gallery'));

  setInterval(function() {
    if($(window).height() >= $(document).height()){
      gallery.loadMorePhotos();
    };
  }, 300);

  $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
      console.log("Bottom!")
      gallery.loadMorePhotos();
    }
  });
})