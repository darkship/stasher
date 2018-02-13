"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TagModel = function TagModel(data) {
    _classCallCheck(this, TagModel);

    if (data) {
        this.id = data.id;
        this.displayId = data.displayId;
        this.latestChangeset = data.latestChangeset;
        this.latestCommit = data.latestCommit;
        this.hash = data.hash;
    }
}
//# sourceMappingURL=tag.js.map
;

exports["default"] = TagModel;
module.exports = exports["default"];
//# sourceMappingURL=tag.js.map
