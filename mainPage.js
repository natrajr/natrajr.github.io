$(document).foundation();

function EasyPeasyParallax() {
  scrollPos = $(this).scrollTop();
  $('.headline').css({
    'margin-top': (scrollPos/4)+"px",
    'opacity': 1-(scrollPos/250)
  });
}
$(document).ready(function(){
  $(window).scroll(function() {
    EasyPeasyParallax();
  });
});