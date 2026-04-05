$(document).ready(function(){
  // Sticky sidebar is now handled by CSS position:sticky + js/sidebar-sticky.js
  // Removed old jquery.sticky plugin (topSpacing:50) which conflicted with CSS sticky

  $('.subscribe-button-post').click(function() {
    $("aside:not('#subscribe'), #main").fadeTo('slow', 0.3);

    if ($(document).width() <= 767) {
      $('html,body').animate({
        scrollTop: $('#subscribe').offset().top
      }, 1000);
    }

    $('#subscription-email').focus();

    $('#subscribe').addClass('glowing');
  });
  $('#subscription-email').on('focusout', function() {
    $("aside:not('#subscribe'), #main").fadeTo('slow', 1);
    $('#subscribe').removeClass('glowing');
  });
});
