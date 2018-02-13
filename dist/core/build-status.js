"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BuildStatusModel = function BuildStatusModel(client, data) {
    _classCallCheck(this, BuildStatusModel);

    this.client = client;
    if (data) {
        this.state = data.state;
        this.key = data.key;
        this.name = data.name;
        this.url = data.url;
        this.dateAdded = data.dateAdded;
    }
}
//# sourceMappingURL=build-status.js.map
;

exports["default"] = BuildStatusModel;
module.exports = exports["default"];
//# sourceMappingURL=build-status.js.map
