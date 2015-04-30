function Photo(data, gallery) {
  this.data = data;
  this.gallery = gallery;
  console.log(this.data)
  this.$ele = $("<div class='box'><div class='boxInner'><img src='" + this.data.images.thumbnail.url + "'/></div></div>");
  this.gallery.$ele.append(this.$ele);
}

function Gallery($ele) {
  this.$ele = $ele;
  this.next_max_id = false;
  this.$spinner = $('<img id="spinner" class="center" style="display:block" src="/img/spinner-small.gif">');
  this.photosLoaded = true;
  this.loadMorePhotos();
}

Gallery.prototype.loadMorePhotos = function() {
  if (this.photosLoaded) {
    this.photosLoaded = false;
    var self = this;
    this.$ele.append(this.$spinner);
    $.ajax({
      url: '/user/photos',
      type: 'GET',
      data: {next_max_id: self.next_max_id},
      dataType: 'JSON'
    }).done(function(response) {
      console.log(response);
      self.next_max_id = response.next_max_id;
      self.photosLoaded = true;
      $('#spinner').remove();
      response.photos.forEach(function (photo) {
        var photo = new Photo(photo, self);
      })
    })
  }
}


$(document).ready(function() {
  var gallery = new Gallery($('#gallery'));

  $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
      console.log("Bottom!")
      gallery.loadMorePhotos();
    }
  });
})