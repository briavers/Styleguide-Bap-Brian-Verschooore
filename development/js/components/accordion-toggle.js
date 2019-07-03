// Accordion toggle

var AccordionToggle = (function () {

	var AccordionToggle = function () {
		this.$toggles = $(".js-accordion-toggle");

		for (var i = 0; i < this.$toggles.length; i++) {
			this._init($(this.$toggles[i]));
		}
	};

	AccordionToggle.prototype._init = function($toggle) {
		var self = $toggle;
		var $accordionToggle = this;

		$toggle.click(function(e){
			e.preventDefault();
			$accordionToggle.toggleAccordion($(this));
		});
	};

	AccordionToggle.prototype.toggleAccordion = function(trigger) {
		var action = $(trigger).data("action");
		var wrapper = $(trigger).closest('.js-accordions-wrapper');
		var tabs = [];

		if (action === "open") {
			tabs = wrapper.find(".js-accordion .js-accordion-tab:not(.ui-state-active)");
		} else {
			tabs = wrapper.find(".js-accordion .js-accordion-tab.ui-state-active");
		}

		for (var index = 0; index < tabs.length; index++) {
			var tab = tabs[index];

			$(tab).click();
		}
	};

	return AccordionToggle;

})();
