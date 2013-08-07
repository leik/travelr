$(document).ready(function() {
	var cards = $("div.card-space div.card");
	var currentCard = cards.last().addClass('current');

	function initialize() {
		renderLastTwelveCards(currentCard);

		var checkers = $('li.checker');
		checkers.hover(function() {
			var index = $(this).data('index');
			console.log(index);
			currentCard.removeClass('current');
			currentCard = cards.eq(index).addClass('current');
			currentCard.nextAll().hide();

			renderLastTwelveCards(currentCard);
		});
	}


	function getLastTwelveCards(current) {
		var elements = current.prevAll().slice(0, 11).get();
		elements.push(current);
		return $(elements);
	}


	function renderLastTwelveCards(current) {
		current.prevAll().hide();
		getLastTwelveCards(current).each(function(index) {
			$(this).show().css('-webkit-transform', 'translateZ(' + 50 * index + 'px)');
		});
	}

	initialize();
});
