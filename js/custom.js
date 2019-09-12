$(document).ready(function(){
	var target = $("#about2").offset().top;
	var interval = setInterval(function() {
		if ($(window).scrollTop() >= target) {
			$('.skillbar').each(function(){
				$(this).find('.skillbar-bar').animate({
					width:$(this).attr('data-percent')
				},6000);
			});
			clearInterval(interval);
		}
	}, 250);
	$('#page-top > footer > div > div > div:nth-child(2) > a:nth-child(5)').hover(
		function(){
			$(this).find('img').attr('src','img/upwork-black.png');
		},
		function(){
			$(this).find('img').attr('src','img/upwork.png');
		}
	);
});