/**
 * @license
 * Copyright (c) 2015 MediaMath Inc. All rights reserved.
 * This code may only be used under the BSD style license found at http://mediamath.github.io/strand/LICENSE.txt

*/
(function (scope) {
	
	scope.Validatable = {

		listeners: {
			"value-changed" : "_validateOnUpdate"
		},

		properties: {
			error: {
				type: Boolean,
				value: false
			},
			validation: {
				type: String,
				value: false,
				observer: "_validationChanged"
			}
		},

		// common validation rules
		rules: {
			email: function(i) {
				var regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return regEx.test(i);
			},
			alpha: function(i) {
				var regEx = /^\w+$/;
				return regEx.test(i);
			},
			int: function(i) {
				var regEx = /^\d+$/;
				return regEx.test(i);
			},
			decimal: function(i) {
				var regEx = /^\d*[.]\d+$/;
				return regEx.test(i);
			},
			whitespace: function(i) {
				var regEx = /\s/;
				return i.length > 0 && !regEx.test(i);
			},
			checked: function(i) {
				return i === true;
			},
			empty: function(i) {
				return i && i.length > 0;
			}
		},

		// items to validate against
		testSet: null,

		_validationChanged: function(newVal, oldVal) {
			if (newVal) {
				this.testSet = newVal.replace(/\s/g, '').split("|");
			}
		},

		_validateOnUpdate: function(e) {
			var value = e.detail.value;

			// don't automatically display error if no value:
			if (this.validation && value !== null) {
				this.error = !this.validate(value);
			}
		},

		validate: function(value) {
			if(this.validation) {
				var result = this.testSet.map(function(item) {
					return this.rules[item](value);
				}, this).filter(function(item) {
					return item === true;
				});
				return result.length === this.testSet.length;
			} else {
				return false;
			}
		}

	};

})(window.StrandTraits = window.StrandTraits || {}); 