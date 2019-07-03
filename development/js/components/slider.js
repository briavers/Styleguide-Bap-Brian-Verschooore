$(function() {
	var $slider = $(".js-slider");

	if ($slider) {
		var $toDisplay = $slider.find(".js-slider-to-display");
		var $fromDisplay = $slider.find(".js-slider-from-display");

		var step = $slider.data("step");
		var min = $slider.data("min");
		var min_start = $slider.data("min-start");
		var max = $slider.data("max");
		var max_start = $slider.data("max-start");

		var slider = $(".js-slider-handle", $slider).get(0);

		noUiSlider.create(slider, {
			step: step,
			range: {
				"min": min,
				"max": max
			},
			connect: true,
			start: [
				min_start,
				max_start
			],
		});

		// On update event we set the values to our displays
		slider.noUiSlider.on("update", function (values) {
			// Prepare values
			var from = values[0];
			var fromUnprocessed = values[0];
			var to = values[1];
			var toUnprocessed = values[1];

			// Format with or without decimals
			var decimals = $slider.data("decimals");
			if (!decimals) {
				from = Math.round(from);
				to = Math.round(to);
			}

			// Add prefix
			var prefix = $slider.data("prefix");
			if (prefix) {
				from = prefix + from;
				to = prefix + to;
			}

			// Add suffix
			var suffix = $slider.data("suffix");
			if (suffix) {
				from = from + suffix;
				to = to + suffix;
			}

			// Handle min or less functionality
			var min_or_less = $slider.data("min-or-less");
			if (min_or_less && parseInt(fromUnprocessed) === parseInt(min)) {
				from = "< " + from;
			}

			// Handle max or more functionality
			var max_or_more = $slider.data("max-or-more");
			if (max_or_more && parseInt(toUnprocessed) === parseInt(max)) {
				to = "> " + to;
			}

			// Set the values to display
			$fromDisplay.html(from);
			$toDisplay.html(to);
		});
	}
});
