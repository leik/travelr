$(document).ready(function() {
	var cards = $("div.card-space div.card"),
		currentIndex = cards.last().data('index'),
		timeCheckers = $('ul.time li.checker'),
		revisionCheckers = $('ul.revisions li.checker');

	function initialize() {
		renderLastTenCards(currentIndex);

		$('li.checker').click(function() {
			var index = $(this).data('index');
			renderLastTenCards(index);
		});

		cards.click(function() {
			var index = $(this).data('index');
			renderLastTenCards(index);
		});

		$(document).keydown(function(event) {
			console.log(currentIndex);
			switch (event.keyCode) {
				case 38:
					renderLastTenCards(currentIndex - 1);
					break;
				case 40:
					renderLastTenCards(currentIndex + 1);
					break;
			}
		});

		$('ul.time, ul.revisions').mousewheel(function(event,delta, deltaX, deltaY) {
			if (delta > 0 ){
				renderLastTenCards(currentIndex - 1);
			} else if (delta < 0){
				renderLastTenCards(currentIndex + 1);
			}
		});

	}

	function getLastTenCards(current) {
		var elements = current.prevAll().slice(0, 9).get().reverse();
		elements.push(current);
		return $(elements);
	}


	function renderLastTenCards(selectedCardIndex) {
		if (selectedCardIndex && selectedCardIndex >= 0 && selectedCardIndex < cards.size()) {
			var oldSelectedIndex = currentIndex;

			currentIndex = selectedCardIndex;

			cards.eq(oldSelectedIndex).removeClass('current');
			timeCheckers.eq(oldSelectedIndex).removeClass('current');
			revisionCheckers.eq(oldSelectedIndex).removeClass('current');

			var currentCard = cards.eq(selectedCardIndex).addClass('current');
			timeCheckers.eq(selectedCardIndex).addClass('current');
			revisionCheckers.eq(selectedCardIndex).addClass('current');

			currentCard.nextAll().hide();
			currentCard.prevAll().hide();
			getLastTenCards(currentCard).each(function(index) {
				$(this).show().css({
					'-webkit-transform': 'translateZ(' + 60 * index + 'px)',
					'opacity': 0.1 * (index + 1)
				});
			});
		}
	}

	initialize();
});
