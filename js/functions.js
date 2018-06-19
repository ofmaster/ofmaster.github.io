const DELAY = 500;

$(document).ready(function() {

	new WOW().init();
	

	$('.btn').click(function () {
		window.location= $(this).attr('id');
	});

	$(document).on('click', '.navbar-in div', function () {
		var id  = $(this).attr('id');
		var position =$(id).offset().top;
		$('html,body').animate({scrollTop: position}, 700);
	});

	$(document).on('click', '.navbar-hide div', function () {
		$(".navbar-hide").hide();
		var id  = $(this).attr('id');
		var position =$(id).offset().top;
		$('html,body').animate({scrollTop: position}, 700);
	});

	
	$(".navbar-hide").hide();
	$("#service").click(function() {
		$(".navbar-hide").slideToggle();
	})


});