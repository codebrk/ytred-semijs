function ytred(props) {
	var totalMoves;
	var originalMoves;
	var leftEventBinded = false;
	var rightEventBinded = true;

	function bindRightArrowEvent(leftArrow, rightArrow, wrap, parent) {
		rightArrow.css({
			opacity: "1"
		});
		rightArrow.bind("click", function() {
			totalMoves--;
			moveRight(leftArrow, rightArrow, wrap, parent);
			if (totalMoves <= 0 && rightEventBinded) {
				unBindRightArrowEvent(leftArrow, rightArrow, wrap, parent);
				rightEventBinded = false;
			}

			if (totalMoves < originalMoves && !leftEventBinded) {
				bindLeftArrowEvent(leftArrow, rightArrow, wrap, parent);
				leftEventBinded = true;
			}
		});
	}

	function unBindRightArrowEvent(leftArrow, rightArrow, wrap, parent) {
		rightArrow.css({
			opacity: "0"
		});
		rightArrow.unbind("click");
	}


	function bindLeftArrowEvent(leftArrow, rightArrow, wrap, parent) {
		leftArrow.css({
			opacity: "1"
		});
		leftArrow.bind("click", function() {
			totalMoves++;
			moveLeft(leftArrow, rightArrow, wrap, parent);
			if (totalMoves >= originalMoves && leftEventBinded) {
				unBindLeftArrowEvent(leftArrow, rightArrow, wrap, parent);
				leftEventBinded = false;
			}
			console.log(totalMoves);
			if (totalMoves <= 1 && !rightEventBinded) {
				bindRightArrowEvent(leftArrow, rightArrow, wrap, parent);
				rightEventBinded = true;
			}
		});
	}

	function unBindLeftArrowEvent(leftArrow, rightArrow, wrap, parent) {
		leftArrow.css({
			opacity: "0"
		});
		leftArrow.unbind("click");
	}

	function hideArrows(leftArrow, rightArrow, wrap, parent, moves) {
		totalMoves = moves;
		originalMoves = moves;
		bindRightArrowEvent(leftArrow, rightArrow, wrap, parent);
		leftArrow.css({
			opacity: "0"
		});
	}


	function moveRight(leftArrow, rightArrow, wrap, parent) {
		var destPos = (wrap[0].offsetLeft) + -(parent.width());

		function move() {
			var requestId = requestAnimFrame(move, wrap);

			wrap.css({
				left: destPos + "px",
			});
		}
		move();
	}

	function moveLeft(leftArrow, rightArrow, wrap, parent) {
		var destPos = (wrap[0].offsetLeft) + (parent.width());


		function move() {
			var requestId = requestAnimFrame(move, wrap);

			wrap.css({
				left: destPos + "px",
			});
		}
		if (Math.abs(wrap[0].offsetLeft) > 0) {
			move();
		}
	}

	function initialize(leftArrow, rightArrow, arrowContainer, titleContainer, title, wrap, parent, items) {
		arrowContainer.css({
			display: "flex"
		});

		leftArrow.css({
			width: "24px",
			height: "24px",
			padding: "5px",
			cursor: "pointer"
		});
		rightArrow.css({
			width: "24px",
			height: "24px",
			padding: "5px",
			cursor: "pointer"
		});

		titleContainer.css({
			display: "flex",
			overflow: "hidden",
			justifyContent: "space-between",
			paddingBottom: "20px",
			alignItems: "center"
		});

		title.css({
			color: props.fg,
			fontSize: "18px"
		});

		parent.css({
			width: "100%",
			position: "relative",
			height: "313px",
			overflow: "hidden"
		});

		wrap.css({
			position: "relative",
			transition: "all .2s",
			float: "left"
		});


		var count = 0;
		var moves = 0;
		var totalItems = items.length;
		var containerWidth = parent.width();

		while (true) {
			if (containerWidth < 200) {
				break;
			}

			containerWidth -= 200;
			count++;
		}

		while (true) {
			totalItems -= count;
			moves++;

			if (totalItems <= count) {
				break;
			}
		}


		
		items.css(function(el, i) {
			var leftPos = (parent.width() / count * i);
			return {
				height: "313px",
				width: parent.width() / count + "px",
				background: "url(" + $(el).attr("data-image") + ")",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				backgroundSize: "cover",
				display: "inline-block",
				position: "absolute",
				left: leftPos + "px",
				boxSizing: "border-box",
				borderRight: "5px solid " + props.bg
			}
		});


		hideArrows(leftArrow, rightArrow, wrap, parent, moves);
		moveRight(leftArrow, rightArrow, wrap, parent);
		moveLeft(leftArrow, rightArrow, wrap, parent);
	}
	var isResizeEventAdded = false;
	this.each(function(parent) {
		var items = $(parent.getElementsByClassName('ytred-item'));
		parent = $(parent);
		var wrap = items.wrap();
		items.remove();
		parent.append(wrap);

		var titleContainer = $(document.createElement("div"));
		var title = $(document.createElement("div"));
		title.text(parent.attr("data-title"));
		var leftArrow = $(document.createElement("div"));
		leftArrow.html('<svg style="width: 24px; height: 24px;"><g mirror-in-rtl=""><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" style="fill: ' + props.fg + ';"></path></g></svg>');
		var rightArrow = $(document.createElement("div"));
		rightArrow.html('<svg style="width: 24px; height: 24px;"><g mirror-in-rtl="" style="fill: ' + props.fg + ';"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></g></svg>');
		var arrowContainer = $(document.createElement("div"));

		arrowContainer.append(leftArrow);
		arrowContainer.append(rightArrow);
		titleContainer.append(title);
		titleContainer.append(arrowContainer);
		parent.prepend(titleContainer);


		initialize(leftArrow, rightArrow, arrowContainer, titleContainer, title, wrap, parent, items);

		if (!isResizeEventAdded) {
			window.addEventListener("resize", function() {
				initialize(leftArrow, rightArrow, arrowContainer, titleContainer, title, wrap, parent, items);
				console.log(wrap[0].offsetLeft);
			}, false);
			isResizeEventAdded = true;
		}
	});
}


$.plugin(ytred);