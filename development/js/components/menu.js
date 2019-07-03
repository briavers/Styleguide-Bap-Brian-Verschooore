// Menu toggle

var Menu = (function () {

	var Menu = function () {
		this.$toggles = $(".js-menu-toggle");

		for (var i = 0; i < this.$toggles.length; i++) {
			this._init($(this.$toggles[i]));
		}
	};

	Menu.prototype._init = function($toggle) {
		var self = $toggle;
		var $menu = this;

		$toggle.click(function(e){
			e.preventDefault();
			$menu.toggleMenu($(this));
		});
	};

	Menu.prototype.toggleMenu = function(trigger) {
		$(trigger).toggleClass("is-active");

		$(".js-menu-flyout").toggleClass("is-open");

		if ($(".js-menu-flyout").hasClass("is-open")) {
			$("body").addClass("u-no-scroll u-no-scroll--md");
		} else {
			$("body").removeClass("u-no-scroll u-no-scroll--md");
		}

		var headerBar = $(".o-header__bar");
		var headerContent = $(".o-header__menu");
		var topOffset = headerBar.offset().top + headerBar.height();

		headerContent.css({top: topOffset});
	};

	return Menu;

})();
