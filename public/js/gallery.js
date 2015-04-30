function Gallery($ele) {
  this.$ele = $ele;
  this.lastPhotoID = false;

  this.loadMorePhotos();
}

Gallery.prototype.loadMorePhotos = function() {
  if (!this.lastPhotoID) {
    $.ajax({
      url: '/user/photos',
      type: 'GET',
      dataType: 'JSON'
    }).done(function(response) {
      console.log(response);
    })
  }
}


$(document).ready(function() {
  var gallery = new Gallery($('#gallery'));
})