
function domobj(){
  var self        =this;
  self.products   = [];

  self.getproducts = function(url){
    return $.getJSON(url, function(response){
               for(i=0; i<response.sales.length ; i++){
                 self.products.push( new productobj(response.sales[i]));
               }
           })
  }

  self.getproducttemplate = function(){
    return $.get('product-template.html', function(template){
    });
  }

  self.updateproducthtml = function(template){
    for( i=0; i< self.products.length ; i++){
      self.products[i].updatehtml(template);
    }
  }

  self.updatedom = function(){
    var i=0
    thishtml='';
    for( i=0; i< self.products.length ; i++){
      thishtml += self.products[i].htmlview;
    }
    $("#content").append('<div class="row">' + thishtml + '</div>')
  }

  self.removeProduct = function(target){
    $(target).fadeOut('normal', function(){
      $(target).remove();
    });
  }

  self.setRemoveListener = function(){
    $(".product").click(function(event) {
      if (event.target.nodeName == 'I') {
        self.removeProduct(event.currentTarget);
      }
    });
  }
}

function productobj(product, i){
  var self          = this;
  self.photo        = product.photos.medium_half
  self.title        = product.name
  self.tagline      = product.tagline
  self.url          = product.url
  self.description  = product.description
  self.htmlview     = ""

  self.updatehtml= function(template){
    self.htmlview = template.replace('{image}', self.photo).replace('{description}', self.description).replace('{title}', self.title).replace('{tagline}', self.tagline).replace('{url}', self.url);
  }
}

var page=new domobj();
page.getproducts('data.json').then(page.getproducttemplate).then(function(template) {
  page.updateproducthtml(template);
}).then(page.updatedom).done(page.setRemoveListener)