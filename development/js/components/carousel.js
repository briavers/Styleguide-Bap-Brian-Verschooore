$(function () {
	$('.js-carousel').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		arrows: true,
		nextArrow: '<button class=\"m-carousel__next a-button a-button--secondary a-button--sm a-button--round has-icon\"><span class=\"icon-arrow-right\"></span></button>',
		prevArrow: '<button class=\"m-carousel__prev a-button a-button--secondary a-button--sm a-button--round has-icon\"><span class=\"icon-arrow-left\"></span></button>',
		asNavFor: '.js-carousel-navigation',
		centerMode: true,
		speed: 250
	});

	$('.js-carousel-navigation').slick({
		slidesToShow: 6,
		slidesToScroll: 1,
		asNavFor: '.js-carousel',
		dots: false,
		centerMode: true,
		focusOnSelect: true,
		arrows: false,
		swipe: false,
		centerPadding: "0px"
	});
});
