$(document).ready(function() {
	var cards = $("div.card-space div.card"),
		currentIndex = cards.last().data('index'),
		timeCheckers = $('ul.time li.checker'),
		revisionCheckers = $('ul.revisions li.checker');

	function initialize() {
		renderVisibleCards(currentIndex);

		$('li.checker').click(function() {
			var index = $(this).data('index');
			renderVisibleCards(index);
		});

		cards.click(function() {
			var index = $(this).data('index');
			renderVisibleCards(index);
		});

		$(document).keydown(function(event) {
			console.log(currentIndex);
			switch (event.keyCode) {
				case 38:
					renderVisibleCards(currentIndex - 1);
					break;
				case 40:
					renderVisibleCards(currentIndex + 1);
					break;
			}
		});

		$('ul.time, ul.revisions').mousewheel(function(event, delta, deltaX, deltaY) {
			if (delta > 0) {
				renderVisibleCards(currentIndex - 1);
			} else if (delta < 0) {
				renderVisibleCards(currentIndex + 1);
			}
		});

	}

	function getVisibleCards(current, numberOfCards) {
		var elements = current.prevAll().slice(0, numberOfCards - 1).get().reverse();
		elements.push(current);
		return $(elements);
	}


	function renderVisibleCards(selectedCardIndex) {
		if (selectedCardIndex >= 0 && selectedCardIndex < cards.size()) {
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

			var visibleCards = getVisibleCards(currentCard, 10);
			visibleCards.each(function(index) {
				var position = visibleCards.size() < 10 ? index + 10 - visibleCards.size() : index;
				var cssObject = {};
				cssObject[PrefixFree.prefixCSS('transform')] = 'translateZ(' + position * 60 + 'px)';
				cssObject[PrefixFree.prefixCSS('opacity')] = 0.1 * (position + 1);
				$(this).show().css(cssObject);
			});
		}
	}

	initialize();
});
