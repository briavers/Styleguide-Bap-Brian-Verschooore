// Filter toggle

var FiltersToggle = (function () {

	var FiltersToggle = function () {
		this.$toggles = $(".js-filters-toggle");

		for (var i = 0; i < this.$toggles.length; i++) {
			this._init($(this.$toggles[i]));
		}
	};

	FiltersToggle.prototype._init = function($toggle) {
		var self = $toggle;
		var $filters = this;

		$toggle.on("click touchstart", function(e) {
			e.preventDefault();
			$filters.toggleFilters($(this), e);
		});
	};

	FiltersToggle.prototype.toggleFilters = function(trigger, e) {
		var filters = $(".js-filters");

		filters.toggleClass("is-open");

		if (filters.hasClass("is-open")) {
			$("body").addClass("u-no-scroll u-no-scroll--sm");
		} else {
			$("body").removeClass("u-no-scroll u-no-scroll--sm");
		}
	};

	return FiltersToggle;

})();
