'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _dependencies = require('./dependencies');

var PagedResponse = (function () {
    function PagedResponse(ctor, client, base_path, data) {
        var field = arguments.length <= 4 || arguments[4] === undefined ? 'values' : arguments[4];
        var opt = arguments.length <= 5 || arguments[5] === undefined ? {} : arguments[5];

        _classCallCheck(this, PagedResponse);

        this.ctor = ctor;
        this.client = client;
        this.base_path = base_path;
        this.size = data.size;
        this.limit = data.limit;
        this.start = data.start;
        this.nextPageStart = data.nextPageStart;
        this.isLastPage = data.isLastPage;
        this.field = field || 'values';
        this.opt = opt;
        if (ctor) {
            this.values = data[field].map(function (v) {
                return ctor(client, v);
            });
        } else {
            this.values = data[field];
        }
    }

    /**
     * Get the next page of results.
     *
     * @return Promise<PagedResponse<T>>
     */

    _createClass(PagedResponse, [{
        key: 'nextPage',
        value: function nextPage() {
            var _this = this;

            if (this.isLastPage) {
                throw new RangeError('No more pages.');
            }
            // TODO: the 'api' parameter needs to be a member too, has to
            // bubble up to everywhere a PagedResponse is constructed
            return this.client.http_get('api', this.base_path, (0, _dependencies.extend)(this.opt, {
                limit: this.limit,
                start: this.nextPageStart
            })).then(function (data) {
                return new PagedResponse(_this.ctor, _this.client, _this.base_path, data, _this.field, _this.opt);
            });
        }
    }]);

    return PagedResponse;
})();

exports.PagedResponse = PagedResponse;

var DefaultPagedResponse = (function (_PagedResponse) {
    _inherits(DefaultPagedResponse, _PagedResponse);

    function DefaultPagedResponse(client, base_path, data, field, opt) {
        _classCallCheck(this, DefaultPagedResponse);

        _get(Object.getPrototypeOf(DefaultPagedResponse.prototype), 'constructor', this).call(this, null, client, base_path, data, field, opt);
    }

    //# sourceMappingURL=client-base.js.map
    return DefaultPagedResponse;
})(PagedResponse);

exports.DefaultPagedResponse = DefaultPagedResponse;
//# sourceMappingURL=client-base.js.map
