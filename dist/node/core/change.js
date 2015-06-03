'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var ChangeModel = (function (_EntityModel) {
    function ChangeModel(data) {
        _classCallCheck(this, ChangeModel);

        _get(Object.getPrototypeOf(ChangeModel.prototype), 'constructor', this).call(this, data);
        if (data) {
            this.contentId = data.contentId;
            this.fromContentId = data.fromContentId;
            this.path = data.path;
            this.executable = data.executable;
            this.percentUnchanged = data.percentUnchanged;
            this.type = data.type;
            this.nodeType = data.nodeType;
            this.srcPath = data.srcPath;
            this.srcExecutable = data.srcExecutable;
        }
    }

    _inherits(ChangeModel, _EntityModel);

    return ChangeModel;
})(_entity2['default']);

exports['default'] = ChangeModel;
module.exports = exports['default'];

//# sourceMappingURL=change.js.map
//# sourceMappingURL=change.js.map