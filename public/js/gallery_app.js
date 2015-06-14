$(document).ready(function() {
  gallery = new Gallery($('#gallery'));

  $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
      console.log("Bottom!")
      gallery.loadMorePhotos();
    }
  });
})