"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var I18n = /*#__PURE__*/function () {
  function I18n() {
    _classCallCheck(this, I18n);
  }

  _createClass(I18n, null, [{
    key: "value",
    value: // Define t function for drupal compatibility.
    function value(input) {
      var translation = {
        'See more': 'もっと見る',
        'Close': '閉じる',
        'Follow button': 'フォローボタン',
        'Follow': 'フォローする',
        'Unfollow button': 'フォロー解除ボタン',
        'Unfollow': 'フォロー解除',
        'Faborite': 'お気に入りする',
        'Unfaborite': 'お気に入り解除'
      };
      return translation[input];
    }
  }]);

  return I18n;
}();

;