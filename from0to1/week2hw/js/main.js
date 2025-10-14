$(function(){
  
  $('.header__burger-btn').on('click', function () {
    $('.menu__list').toggleClass('menu__list--active'),
    $('.header__burger-btn').toggleClass('header__burger-btn--active'),
    $('body').toggleClass('lock')
  });
  
  $('.blog__slider-inner').slick({
   arrows:false,
   dots:true,
   autoplay: true,
   autoplaySpeed: 2000,
  });

  $('.menu__list a').on("click", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
		top = $(id).offset().top;
    $('.menu__list').toggleClass('menu__list--active'),
    $('.header__burger-btn').toggleClass('header__burger-btn--active'),
    $('body').toggleClass('lock'),
		$('body,html').animate({scrollTop: top}, 1500);
	});

  $('.header__bottom-link').on("click", function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
    top = $(id).offset().top;
    $('body,html').animate({ scrollTop: top }, 1500);
  });

  var mixer = mixitup('.galery__inner');
});