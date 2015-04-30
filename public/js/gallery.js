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
  this.$spinner = $('<img class="center" style="display:block" src="/img/spinner-small.gif">');
  this.$ele.append(this.$spinner);
  this.$spinner.hide();

  this.loadMorePhotos();
}

Gallery.prototype.loadMorePhotos = function() {
  var self = this;
  this.$spinner.show();
  $.ajax({
    url: '/user/photos',
    type: 'GET',
    data: {next_max_id: self.next_max_id},
    dataType: 'JSON'
  }).done(function(response) {
    console.log(response);
    self.$spinner.hide();
    self.next_max_id = response.next_max_id;
    response.photos.forEach(function (photo) {
      var photo = new Photo(photo, self);
    })
  })
}


$(document).ready(function() {
  var gallery = new Gallery($('#gallery'));
})