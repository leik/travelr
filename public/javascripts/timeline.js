$(document).ready(function() {
	var cards = $("div.card-space div.card");
	var currentCard = cards.last().addClass('current');

	function initialize() {
		renderLastTenCards(currentCard.data('index'));

		$('li.checker').hover(function() {
			var index = $(this).data('index');
			renderLastTenCards(index);
		});

		cards.click(function() {
			var index = $(this).data('index');
			renderLastTenCards(index);
		});
	}


	function getLastTenCards(current) {
		var elements = current.prevAll().slice(0, 9).get();
		elements.push(current);
		return $(elements);
	}


	function renderLastTenCards(selectedCardIndex) {
		currentCard.removeClass('current');
		currentCard = cards.eq(selectedCardIndex).addClass('current');
		currentCard.nextAll().hide();

		currentCard.prevAll().hide();
		getLastTenCards(currentCard).each(function(index) {
			$(this).show().css({
				'-webkit-transform': 'translateZ(' + 60 * index + 'px)',
				'opacity': 0.1 * (index + 1)
			});
		});
	}

	initialize();
});
