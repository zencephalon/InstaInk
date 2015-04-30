function Photo(data, gallery) {
  this.data = data;
  this.gallery = gallery;
  console.log(this.data)
  this.$ele = $("<div class='box'><div class='boxInner'><img src='" + this.data.images.thumbnail.url + "'/></div></div>");
  this.gallery.$ele.append(this.$ele);
}

function Gallery($ele) {
  this.$ele = $ele;
  this.lastPhotoID = false;

  this.loadMorePhotos();
}

Gallery.prototype.loadMorePhotos = function() {
  var self = this;
  if (!this.lastPhotoID) {
    $.ajax({
      url: '/user/photos',
      type: 'GET',
      dataType: 'JSON'
    }).done(function(response) {
      console.log(response);
      response.photos.forEach(function (photo) {
        var photo = new Photo(photo, self);
      })
    })
  }
}


$(document).ready(function() {
  var gallery = new Gallery($('#gallery'));
})