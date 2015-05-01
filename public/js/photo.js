function Photo(data, gallery) {
  this.data = data;
  this.gallery = gallery;
  console.log(this.data)
  this.selected = false;
  this.$ele = $("<div class='box'><div class='boxInner'><img src='" + this.data.images.thumbnail.url + "'/></div></div>");
  this.gallery.$ele.append(this.$ele);
  this.$ele.on('click', this.clickSelect.bind(this));
}

Photo.prototype.clickSelect = function() {
  if (this.selected || this.gallery.canSelectMore()) {
    this.selected = ! this.selected;
    this.$ele.toggleClass('selected');
    this.gallery.updateSelectCounter();
  }
}