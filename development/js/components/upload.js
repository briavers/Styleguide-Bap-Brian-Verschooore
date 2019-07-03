// Upload toggle

var Upload = (function () {

	var Upload = function () {
		this.$toggles = $(".js-upload-toggle");

		for (var i = 0; i < this.$toggles.length; i++) {
			this._init($(this.$toggles[i]));
		}
	};

	Upload.prototype._init = function($toggle) {
		var self = $toggle;
		var $upload = this;

		$toggle.on("change", function(e) {
			e.preventDefault();
			$upload.toggleUpload($(this), e);
		});
	};

	Upload.prototype.toggleUpload = function(trigger, e) {
		var $input = $(trigger),
			$label = $input.parent().siblings(".a-upload__info");

		var labelVal = $label.html(),
			fileName = "";

		if (e.target.value) {
			fileName = e.target.value.split("\\").pop();
		}

		if (fileName) {
			$label.html(fileName);
		} else {
			$label.html(labelVal);
		}
	};

	return Upload;

})();
