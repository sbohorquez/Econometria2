var Slides = {
   container : $('#slides'),

   totalSlides : '',

   translateAmount : 0,

   currentSlide : 0,

   slideWidth : '',

   init : function(totalSlides) {
      var each;

      if ( !totalSlides ) throw new Error('Please pass the total number of slides.');
      Slides.totalSlides = totalSlides;

      Slides.loadContent();

      each = Slides.container.children('div');
      
      // Determine the width of our canvas
      Slides.slideWidth = each.width() + ( parseInt( each.css('margin-right'), 10 ) );

      Slides.keyPress();
   },

   loadContent : function() {
      Slides.container.hide();
      for ( var i = 0; i < Slides.totalSlides; i++ ) {
         $('<div id="#slide-' + i + '"></div>')
            .load('slides/' + i + '.html')
            .appendTo(Slides.container);
         }
      Slides.container.show();
   },

   keyPress : function() {
      $(document.body).keydown(function(e) {
         // if left or right arrow key is pressed
         if ( e.keyCode === 39 || e.keyCode === 37 ) {
            e.preventDefault();
            ( e.keyCode === 39 ) ? Slides.next() : Slides.prev();
         }
      });
   },

   next : function( ) {
      Slides.translateAmount -= Slides.slideWidth;
      Slides.updateHash( ++Slides.currentSlide );
      Slides.animate();
   },

  prev : function() {
     // No more left to go back.
      if ( Slides.translateAmount === 0 ) return;

      Slides.translateAmount += Slides.slideWidth;
      Slides.updateHash( --Slides.currentSlide );
      Slides.animate();
  },

  animate : function() {
     Slides
      .container
      .children()
         .css( '-webkit-transform', 'translateX(' + Slides.translateAmount + 'px)' );
  },

  updateHash : function( direction ) {
     // Update current Slides and hash.
     location.hash = '#slide-' + Slides.currentSlide;
  }
};

// All right; let's do this. 
Slides.init(6);
