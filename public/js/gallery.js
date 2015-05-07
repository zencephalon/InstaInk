function Gallery($ele) {
  var self = this;
  this.$ele = $ele;

  // 12
  this.selectionMax = 12;
  this.next_max_id = false;

  this.$spinner = $('<img id="spinner" class="center" style="display:block" src="/img/spinner-small.gif">');

  this.$selectCounter = $('<div id="gallery-counter"></div>');
  this.$selectCounter.on('click', 'a', function() {
    $.ajax({
      url: '/order',
      type: 'POST',
      data: {photos: self.selectedPhotoData()}
    }).done(function(response) {
      window.location.replace(response);
    })
    console.log("Checkout!");
  })

  this.$ele.parent().append(this.$selectCounter);

  this.photosLoaded = true;
  this.photos = [];

  this.updateSelectCounter();
  this.loadMorePhotos();
}

Gallery.prototype.canSelectMore = function() {
  return this.selectedPhotos().length < this.selectionMax;
}

Gallery.prototype.updateSelectCounter = function() {
  var selected = this.selectedPhotos();
  if (this.canSelectMore()) {
    this.$selectCounter.html("" + this.selectedPhotos().length + "/" + this.selectionMax + " photos selected");
  } else {
    this.$selectCounter.html("<a>Continue to Checkout!</a>");
  }
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
      self.next_max_id = response.next_max_id;

      self.photosLoaded = true;
      $('#spinner').remove();

      response.photos.forEach(function (photo) {
        self.photos.push(new Photo(photo, self));
      })
    })
  }
}

Gallery.prototype.selectedPhotos = function() {
  return this.photos.filter(function(photo) {
    return photo.selected;
  })
}

Gallery.prototype.selectedPhotoData = function() {
  var selected = this.selectedPhotos();
  return selected.map(function(photo) {
    return {url: photo.data.images.standard_resolution.url}
  })
}