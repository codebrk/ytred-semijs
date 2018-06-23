$.plugin(function (prop) {
	_self = this;

	function moveRight(wrap, dist) {
		console.log(dist);
		console.log(wrap.offsetLeft());
		console.log(wrap.offsetLeft() - dist);
		wrap.css({ left: wrap.offsetLeft() - dist + "px" });
	}

	function moveLeft(wrap, dist) {
		console.log(wrap.offsetLeft() + dist);
		wrap.css({ left: wrap.offsetLeft() + dist + "px" });
	}

	function showHideArrows(leftArrow, rightArrow, moves, totalMoves) {
		if (moves === 0) {
			rightArrow.hide();
		} else {
			rightArrow.show();
		}

		if (moves === totalMoves) {
			leftArrow.hide();
		} else {
			leftArrow.show();
		}
	}

	function initialize() {
		_self.each(function(el, i) {
			el = $(el);
			var items = el.children().filter(".ytred-item");
			var wrap = $("<div>").append(items).addClass("ytred-wrap");
			el.append(wrap);

			var totalItems = items.length;
			var itemsCanFit = 0;
			var itemWidth = 205;
			var containerWidth = el.width();
			var moves = 0;

			while (true) {
				if (containerWidth < itemWidth) {
					break;
				}

				itemsCanFit++;
				containerWidth -= itemWidth;
			}

			while (true) {
				if (totalItems <= itemsCanFit) {
					break;
				}

				moves++;
				totalItems -= itemsCanFit;
			}

			var totalMoves = moves;

			// set background images
			items.each(function(item, i) {
				item = $(item);
				item.css({
					background: "url(" + item.attr("data-image") + ")",
					backgroundSize: "cover",
					backgroundPosition: "center",
					width: (el.width() / itemsCanFit) - 5 + "px"
				});

				item.unbind("mouseover");
				item.bind("mouseover", function() {
					
				});

				item.unbind("mouseout");
				item.bind("mouseout", function() {
					
				});
			});

			// adding title section
			var titleContainer = $("<div>").addClass("ytred-title-container");
			var title = $("<div>").addClass("ytred-title").html(el.attr("data-title"))
				.css({ color: prop });
			var leftArrow = $("<div>").addClass("ytred-left-arrow")
				.html('<svg style="width: 24px; height: 24px;"><g mirror-in-rtl=""><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" style="fill: ' + prop + ';"></path></g></svg>');
			var rightArrow = $("<div>").addClass("ytred-right-arrow")
				.html('<svg style="width: 24px; height: 24px;"><g mirror-in-rtl="" style="fill: ' + prop + ';"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></g></svg>');
			var arrowContainer = $("<div>").addClass("ytred-arrow-container")
				.append(leftArrow).append(rightArrow);

			titleContainer.append(title).append(arrowContainer);
			el.prepend(titleContainer);


			rightArrow.unbind("click");
			rightArrow.bind("click", function() {
				if (moves > 0) {
					moveRight(wrap, el.width());
					moves--;
				}

				showHideArrows(leftArrow, rightArrow, moves, totalMoves);
			});

			leftArrow.unbind("click");
			leftArrow.bind("click", function() {
				if (moves < totalMoves) {
					moveLeft(wrap, el.width());
					moves++;
				}

				showHideArrows(leftArrow, rightArrow, moves, totalMoves);
			});

			moveRight(wrap, el.width());
			moveLeft(wrap, el.width());
			showHideArrows(leftArrow, rightArrow, moves, totalMoves);
		});
	}

	initialize();
}, "ytred");