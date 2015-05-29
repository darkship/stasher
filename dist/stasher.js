(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* -----------------------------------------------------------------------------
   Core Client types
   ----------------------------------------------------------------------------- */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PagedResponse = (function () {
    function PagedResponse(c, client, base_path, data) {
        _classCallCheck(this, PagedResponse);

        this.client = client;
        this.size = data.size;
        this.limit = data.limit;
        this.start = data.start;
        this.nextPageStart = data.nextPageStart;
        this.isLastPage = data.isLastPage;
        if (c) {
            this.values = data.values.map(function (v) {
                return new c(client, v);
            });
        } else {
            this.values = data.values;
        }
    }

    _createClass(PagedResponse, [{
        key: "nextPage",

        /**
         * Get the next page of results.
         *
         * @return Promise<PagedResponse<T>>
         */
        value: function nextPage() {}
    }]);

    return PagedResponse;
})();

exports.PagedResponse = PagedResponse;

var DefaultPagedResponse = (function (_PagedResponse) {
    function DefaultPagedResponse(client, base_path, data) {
        _classCallCheck(this, DefaultPagedResponse);

        _get(Object.getPrototypeOf(DefaultPagedResponse.prototype), "constructor", this).call(this, null, client, base_path, data);
    }

    _inherits(DefaultPagedResponse, _PagedResponse);

    return DefaultPagedResponse;
})(PagedResponse);

exports.DefaultPagedResponse = DefaultPagedResponse;

// TODO



},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _clientBase = require('./client-base');

var _coreProject = require('./core/project');

var _coreProject2 = _interopRequireDefault(_coreProject);

var _coreRepository = require('./core/repository');

var _coreRepository2 = _interopRequireDefault(_coreRepository);

var URI = require('URIjs');
var Promise = require('bluebird');
var hyperquest = require('hyperquest');
var AuthType;
exports.AuthType = AuthType;
(function (AuthType) {
    AuthType[AuthType['BASIC'] = 0] = 'BASIC';
    AuthType[AuthType['OAUTH'] = 1] = 'OAUTH';
    AuthType[AuthType['COOKIE'] = 2] = 'COOKIE';
})(AuthType || (exports.AuthType = AuthType = {}));

var Client = (function () {
    function Client(data) {
        _classCallCheck(this, Client);

        this.version = '1.0';
        /* --------------------------------------------------
           Core API
           -------------------------------------------------- */
        this.projects = {
            __proto__: this,
            list: function list(opt) {
                var _this = this;

                var path = '/projects';
                return this.http_get('api', path).then(function (data) {
                    return new _clientBase.PagedResponse(_coreProject2['default'], _this, path, data);
                });
            },
            get: function get(key, opt) {
                var _this2 = this;

                return this.http_get('api', '/projects/' + key).then(function (data) {
                    return new _coreProject2['default'](_this2, data);
                });
            }
        };
        this.repositories = {
            __proto__: this,
            get: function get(project, repo) {
                var _this3 = this;

                return this.http_get('api', '/projects/' + project + '/repos/' + repo).then(function (data) {
                    return new _coreRepository2['default'](_this3, data);
                });
            }
        };
        this.profile = {
            __proto__: this,
            recent_repos: function recent_repos() {
                var _this4 = this;

                var path = '/profile/recent/repos';
                return this.http_get('api', path).then(function (data) {
                    return new _clientBase.PagedResponse(_coreRepository2['default'], _this4, path, data);
                });
            }
        };
        if (data && typeof data === 'string') {
            this._base_url = new URI(data);
        } else if (data && data instanceof URI) {
            this._base_url = data;
        } else if (data) {
            if (data.base_url) {
                this._base_url = new URI(data.base_url);
            }
            this._auth = data.auth;
            this.version = data.version || this.version;
        }
    }

    _createClass(Client, [{
        key: 'base_url',
        get: function () {
            return this._base_url.clone();
        }
    }, {
        key: 'http_get',

        /* --------------------------------------------------
           Internals
           -------------------------------------------------- */
        value: function http_get(api, path, options) {
            return this._request('GET', api, path, options);
        }
    }, {
        key: '_url',
        value: function _url(api, path) {
            return this.base_url.segment('rest').segment(api).segment(this.version).segment(path).normalizePath();
        }
    }, {
        key: '_request',
        value: function _request(method, api, path, options) {
            var url = this._url(api, path);
            console.log('' + method + ' ' + url.toString());
            if (method === 'GET' && options && options.params) {
                url.setSearch(options.params);
            }
            var headers = {};
            var opts = {
                method: method,
                uri: url.toString(),
                headers: headers
            };
            if (this._auth && this._auth.type === AuthType.BASIC) {
                opts.auth = '' + this._auth.username + ':' + this._auth.password;
            }
            return new Promise(function (resolve, reject) {
                var body = '';
                var req = hyperquest(opts);
                req.on('data', function (buffer) {
                    body += buffer.toString();
                }).on('end', function () {
                    try {
                        var data = JSON.parse(body);
                        resolve(data);
                    } catch (e) {
                        reject({
                            exception: e,
                            body: body
                        });
                    }
                }).on('error', function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return Client;
})();

exports.Client = Client;



},{"./client-base":1,"./core/project":7,"./core/repository":9,"URIjs":undefined,"bluebird":undefined,"hyperquest":undefined}],3:[function(require,module,exports){
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
    function ChangeModel(client, data) {
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



},{"./entity":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var CommitModel = (function () {
    function CommitModel(client, data) {
        _classCallCheck(this, CommitModel);

        this.client = client;
        if (data) {
            this.id = data.id;
            this.displayId = data.displayId;
            if (data.author) {
                this.author = new _user2['default'](data.author);
            }
            this.authorTimestamp = data.authorTimestamp;
            this.message = data.message;
            if (data.parents) {
                this.parents = data.parents.map(function (p) {
                    return new CommitModel(p);
                });
            }
        }
    }

    _createClass(CommitModel, [{
        key: 'changes',
        value: function changes() {}
    }, {
        key: 'comments',
        value: function comments() {}
    }]);

    return CommitModel;
})();

exports['default'] = CommitModel;
module.exports = exports['default'];



},{"./user":10}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EntityModel = function EntityModel(data) {
    _classCallCheck(this, EntityModel);

    if (data) {
        this.link = data.link;
        this.links = data.links;
    }
};

exports["default"] = EntityModel;
module.exports = exports["default"];



},{}],6:[function(require,module,exports){
"use strict";

/* -----------------------------------------------------------------------------
   Miscellaneous types
   ----------------------------------------------------------------------------- */


},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _clientBase = require('../client-base');

var _repository = require('./repository');

var _repository2 = _interopRequireDefault(_repository);

var ProjectModel = (function () {
    function ProjectModel(client, data) {
        _classCallCheck(this, ProjectModel);

        this.client = client;
        if (data) {
            this.id = data.id;
            this.key = data.key;
            this.name = data.name;
            this.description = data.description;
            this['public'] = data['public'];
            this.type = data.type;
            this.link = data.link;
            this.links = data.links;
        }
    }

    _createClass(ProjectModel, [{
        key: 'repositories',

        /**
         * @returns Promise<PagedResponse<Repository>>
         */
        value: function repositories(opt) {
            var _this = this;

            var path = '/projects/' + this.key + '/repos';
            return this.client.http_get('api', path).then(function (data) {
                return new _clientBase.PagedResponse(_repository2['default'], _this.client, path, data);
            });
        }
    }, {
        key: 'repository',

        /**
         * @returns Promise<Repository>
         */
        value: function repository(slug, opt) {
            var _this2 = this;

            var path = '/projects/' + this.key + '/repos/' + slug;
            return this.client.http_get('api', path).then(function (data) {
                return new _repository2['default'](_this2.client, data);
            });
        }
    }]);

    return ProjectModel;
})();

exports['default'] = ProjectModel;
module.exports = exports['default'];



},{"../client-base":1,"./repository":9}],8:[function(require,module,exports){
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

var PullRequestModel = (function (_EntityModel) {
    function PullRequestModel(client, data) {
        _classCallCheck(this, PullRequestModel);

        _get(Object.getPrototypeOf(PullRequestModel.prototype), 'constructor', this).call(this, data);
        if (data) {}
    }

    _inherits(PullRequestModel, _EntityModel);

    return PullRequestModel;
})(_entity2['default']);

exports['default'] = PullRequestModel;
module.exports = exports['default'];



},{"./entity":5}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _clientBase = require('../client-base');

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _project = require('./project');

var _project2 = _interopRequireDefault(_project);

var _pullRequest = require('./pull-request');

var _pullRequest2 = _interopRequireDefault(_pullRequest);

var _change = require('./change');

var _change2 = _interopRequireDefault(_change);

var RepositoryModel = (function (_EntityModel) {
    function RepositoryModel(client, data) {
        _classCallCheck(this, RepositoryModel);

        _get(Object.getPrototypeOf(RepositoryModel.prototype), 'constructor', this).call(this, data);
        this.client = client;
        if (data) {
            this.id = data.id;
            this.slug = data.slug;
            this.name = data.name;
            this.scmId = data.scmId;
            this.state = data.state;
            this.statusMessage = data.statusMessage;
            this.forkable = data.forkable;
            this.project = new _project2['default'](client, data.project);
            this.link = data.link;
            this.links = data.links;
        }
    }

    _inherits(RepositoryModel, _EntityModel);

    _createClass(RepositoryModel, [{
        key: 'forks',
        value: function forks(opt) {}
    }, {
        key: 'related',
        value: function related(opt) {}
    }, {
        key: 'branches',
        value: function branches(opt) {
            var _this = this;

            var path = '/projects/' + this.project.key + '/repos/' + this.slug + '/branches';
            return this.client.http_get('api', path).then(function (data) {
                return new _clientBase.DefaultPagedResponse(_this.client, path, data);
            });
        }
    }, {
        key: 'default_branch',
        value: function default_branch(opt) {
            var path = '/projects/' + this.project.key + '/repos/' + this.slug + '/branches/default';
            return this.client.http_get('api', path);
        }
    }, {
        key: 'changes',
        value: function changes(opt) {
            var _this2 = this;

            var path = '/projects/' + this.project.key + '/repos/' + this.slug + '/changes';
            var params = {
                since: opt ? opt.since : undefined,
                until: opt ? opt.until : undefined
            };
            return this.client.http_get('api', path, {
                params: params
            }).then(function (data) {
                return new _clientBase.PagedResponse(_change2['default'], _this2.client, path, data);
            });
        }
    }, {
        key: 'commits',
        value: function commits(opt) {
            var _this3 = this;

            var path = '/projects/' + this.project.key + '/repos/' + this.slug + '/commits';
            return this.client.http_get('api', path).then(function (data) {
                return new _clientBase.DefaultPagedResponse(_this3.client, path, data);
            });
        }
    }, {
        key: 'commit',
        value: function commit(id, opt) {
            var path = '/projects/' + this.project.key + '/repos/' + this.slug + '/commits/' + id;
            return this.client.http_get('api', path);
        }
    }, {
        key: 'files',
        value: function files(opt) {}
    }, {
        key: 'pull_requests',
        value: function pull_requests(opt) {
            var _this4 = this;

            var path = '/projects/' + this.project.key + '/repos/' + this.slug + '/pull-requests';
            return this.client.http_get('api', path).then(function (data) {
                return new _clientBase.PagedResponse(_pullRequest2['default'], _this4.client, path, data);
            });
        }
    }, {
        key: 'pull_request',
        value: function pull_request(id, opt) {
            var _this5 = this;

            var path = '/projects/' + this.project.key + '/repos/' + this.slug + '/pull-requests/' + id;
            return this.client.http_get('api', path).then(function (data) {
                return new _pullRequest2['default'](_this5.client, data);
            });
        }
    }]);

    return RepositoryModel;
})(_entity2['default']);

exports['default'] = RepositoryModel;
module.exports = exports['default'];



},{"../client-base":1,"./change":3,"./entity":5,"./project":7,"./pull-request":8}],10:[function(require,module,exports){
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

var UserModel = (function (_EntityModel) {
    function UserModel(data) {
        _classCallCheck(this, UserModel);

        _get(Object.getPrototypeOf(UserModel.prototype), 'constructor', this).call(this, data);
    }

    _inherits(UserModel, _EntityModel);

    return UserModel;
})(_entity2['default']);

exports['default'] = UserModel;
module.exports = exports['default'];



},{"./entity":5}]},{},[1,2,3,4,5,6,7,8,9,10]);