'use strict';

function init() {

  $('.navicon').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('navicon--active');
    $('.toggle').toggleClass('toggle--active');
  });

}
$(init);