(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var global = window;
if (typeof global.console !== 'undefined' && typeof global.console.log !== 'undefined') {
    global.console.log('Crafted and created by Storyblok. Visit www.storyblok.com');
}
else {
    global.console = {};
    global.console.log = global.console.error = function () { };
}

},{}],2:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Controller_1 = require('../lib/Controller');
var AppController = (function (_super) {
    __extends(AppController, _super);
    function AppController(element) {
        _super.call(this, element);
    }
    AppController.selector = '#content';
    return AppController;
}(Controller_1.Controller));
exports.AppController = AppController;

},{"../lib/Controller":4}],3:[function(require,module,exports){
"use strict";
var AppController_1 = require('./AppController');
exports.AppController = AppController_1.AppController;

},{"./AppController":2}],4:[function(require,module,exports){
"use strict";
/**
 * Generic controller class to entcapsulate the parsing
 * and other generic stuff
 *
 * @export
 * @class Controller
 */
var Controller = (function () {
    /**
     * Creates an instance of a Controller.
     *
     * @param {Element} root The element where the controller has been applied
     */
    function Controller(element) {
        this._element = element;
    }
    Object.defineProperty(Controller.prototype, "$", {
        /**
         * Access element or query by selector
         */
        get: function () {
            return function (selector) {
                if (!(this._element instanceof Element)) {
                    throw new Error('This controller has no element!');
                }
                return selector ? this._element.querySelectorAll(selector) : this._element;
            };
        },
        set: function (value) {
            throw new Error('Setting $ is not allowed');
        },
        enumerable: true,
        configurable: true
    });
    Controller.prototype.getControllersByClass = function (controllerClass) {
        var instances = Controller._instances;
        var result = [];
        for (var i = 0, max = instances.length; i < max; i++) {
            var instance = instances[i];
            if (instance instanceof controllerClass) {
                result.push(instance);
            }
        }
        return result;
    };
    /**
     * Hook for running code before the controller is instantiated
     *
     * @static
     * @param {NodeListOf<Element>} elements List of elements where the controller will be applied
     */
    Controller.beforeInstantiating = function (elements) { };
    /**
     * Hook for running code after the controller has been instantiated.
     *
     * @static
     * @param {NodeListOf<Element>} elements List of elements where the controller has been applied
     * @param {Array<Controller>} instances List of controller instances created
     */
    Controller.afterInstantiating = function (elements, instances) { };
    /**
     * Look for elements with a specific selector and creates an instance for
     * every element.
     *
     * @static
     * @param {string} selector Dom selector
     * @param {Element} [root=document.body] Starting element for parsing
     */
    Controller.parse = function (selector, root) {
        if (root === void 0) { root = document.body; }
        if (typeof this.selector === 'string' && this.selector.length) {
            selector = this.selector;
        }
        else if (!selector) {
            throw new Error('No Selector for Controller found!');
        }
        var elements = root.querySelectorAll(selector);
        this.beforeInstantiating(elements);
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var className = /^function\s+([\w\$]+)\s*\(/.exec(this.toString())[1];
            className = className.toLocaleLowerCase();
            if (element.getAttribute(Controller.PARSE_ID_ATTRIBUTE + '-' + className)) {
                continue;
            }
            element.setAttribute(Controller.PARSE_ID_ATTRIBUTE + '-' + className, Math.floor(Math.random() * 10 + 1) * Date.now() + '');
            Controller._instances.push(new this(element));
        }
        this.afterInstantiating(elements, Controller._instances);
    };
    /**
     * Instances of the Controller
     *
     * @static
     * @type {Array<Controller>}
     */
    Controller._instances = [];
    /**
     * HTML attribute to mark elements which are already parsed
     *
     * @static
     */
    Controller.PARSE_ID_ATTRIBUTE = 'data-parse-id';
    return Controller;
}());
exports.Controller = Controller;

},{}],5:[function(require,module,exports){
"use strict";
var controllers = require('../controllers/Controllers');
/**
 * Import's all Controllers which are exported in the Controllers.ts
 * so we can initialize all Types of Controller easier.
 *
 * This function also allows us to execute the initialization of
 * Controllers only for a part type of the DOM - let's say a
 * newly generated and added DOM Component. So we won't have to
 * reinitialize all Components - only the Components which are
 * inside that newly created HTMLElement.
 *
 * @export
 * @param {HTMLElement} [element] DOM Element in which the Controller should be initialized - if not set we're using the document.body;
 */
function parse(element) {
    var controllerClasses = controllers;
    if (!element) {
        element = document.body;
    }
    for (var key in controllerClasses) {
        if (controllerClasses.hasOwnProperty(key)) {
            var controllerClass = controllerClasses[key];
            if (typeof controllerClass.parse === 'function') {
                controllerClass.parse('', element);
            }
        }
    }
}
exports.parse = parse;

},{"../controllers/Controllers":3}],6:[function(require,module,exports){
"use strict";
require('./companyNotice');
require('bootstrap');
// this will iterate over all exported Controllers from the
// ./controllers/Controllers.ts file. simply have a look at 
// it if you want to add a new controller
var Runtime_1 = require('./lib/Runtime');
Runtime_1.parse();

},{"./companyNotice":1,"./lib/Runtime":5,"bootstrap":7}],7:[function(require,module,exports){
// This file is autogenerated via the `commonjs` Grunt task. You can require() this file in a CommonJS environment.
require('./umd/util.js')
require('./umd/alert.js')
require('./umd/button.js')
require('./umd/carousel.js')
require('./umd/collapse.js')
require('./umd/dropdown.js')
require('./umd/modal.js')
require('./umd/scrollspy.js')
require('./umd/tab.js')
require('./umd/tooltip.js')
require('./umd/popover.js')
},{"./umd/alert.js":8,"./umd/button.js":9,"./umd/carousel.js":10,"./umd/collapse.js":11,"./umd/dropdown.js":12,"./umd/modal.js":13,"./umd/popover.js":14,"./umd/scrollspy.js":15,"./umd/tab.js":16,"./umd/tooltip.js":17,"./umd/util.js":18}],8:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './util'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./util'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.Util);
    global.alert = mod.exports;
  }
})(this, function (exports, module, _util) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _Util = _interopRequireDefault(_util);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.2): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Alert = (function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'alert';
    var VERSION = '4.0.0-alpha';
    var DATA_KEY = 'bs.alert';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 150;

    var Selector = {
      DISMISS: '[data-dismiss="alert"]'
    };

    var Event = {
      CLOSE: 'close' + EVENT_KEY,
      CLOSED: 'closed' + EVENT_KEY,
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
    };

    var ClassName = {
      ALERT: 'alert',
      FADE: 'fade',
      IN: 'in'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Alert = (function () {
      function Alert(element) {
        _classCallCheck(this, Alert);

        this._element = element;
      }

      /**
       * ------------------------------------------------------------------------
       * Data Api implementation
       * ------------------------------------------------------------------------
       */

      // getters

      _createClass(Alert, [{
        key: 'close',

        // public

        value: function close(element) {
          element = element || this._element;

          var rootElement = this._getRootElement(element);
          var customEvent = this._triggerCloseEvent(rootElement);

          if (customEvent.isDefaultPrevented()) {
            return;
          }

          this._removeElement(rootElement);
        }
      }, {
        key: 'dispose',
        value: function dispose() {
          $.removeData(this._element, DATA_KEY);
          this._element = null;
        }

        // private

      }, {
        key: '_getRootElement',
        value: function _getRootElement(element) {
          var selector = _Util['default'].getSelectorFromElement(element);
          var parent = false;

          if (selector) {
            parent = $(selector)[0];
          }

          if (!parent) {
            parent = $(element).closest('.' + ClassName.ALERT)[0];
          }

          return parent;
        }
      }, {
        key: '_triggerCloseEvent',
        value: function _triggerCloseEvent(element) {
          var closeEvent = $.Event(Event.CLOSE);

          $(element).trigger(closeEvent);
          return closeEvent;
        }
      }, {
        key: '_removeElement',
        value: function _removeElement(element) {
          $(element).removeClass(ClassName.IN);

          if (!_Util['default'].supportsTransitionEnd() || !$(element).hasClass(ClassName.FADE)) {
            this._destroyElement(element);
            return;
          }

          $(element).one(_Util['default'].TRANSITION_END, $.proxy(this._destroyElement, this, element)).emulateTransitionEnd(TRANSITION_DURATION);
        }
      }, {
        key: '_destroyElement',
        value: function _destroyElement(element) {
          $(element).detach().trigger(Event.CLOSED).remove();
        }

        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Alert(this);
              $element.data(DATA_KEY, data);
            }

            if (config === 'close') {
              data[config](this);
            }
          });
        }
      }, {
        key: '_handleDismiss',
        value: function _handleDismiss(alertInstance) {
          return function (event) {
            if (event) {
              event.preventDefault();
            }

            alertInstance.close(this);
          };
        }
      }, {
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }]);

      return Alert;
    })();

    $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Alert._jQueryInterface;
    $.fn[NAME].Constructor = Alert;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Alert._jQueryInterface;
    };

    return Alert;
  })(jQuery);

  module.exports = Alert;
});

},{"./util":18}],9:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.button = mod.exports;
  }
})(this, function (exports, module) {
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.2): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var Button = (function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'button';
    var VERSION = '4.0.0-alpha';
    var DATA_KEY = 'bs.button';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];

    var ClassName = {
      ACTIVE: 'active',
      BUTTON: 'btn',
      FOCUS: 'focus'
    };

    var Selector = {
      DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
      DATA_TOGGLE: '[data-toggle="buttons"]',
      INPUT: 'input',
      ACTIVE: '.active',
      BUTTON: '.btn'
    };

    var Event = {
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
      FOCUS_BLUR_DATA_API: 'focus' + EVENT_KEY + DATA_API_KEY + ' ' + ('blur' + EVENT_KEY + DATA_API_KEY)
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Button = (function () {
      function Button(element) {
        _classCallCheck(this, Button);

        this._element = element;
      }

      /**
       * ------------------------------------------------------------------------
       * Data Api implementation
       * ------------------------------------------------------------------------
       */

      // getters

      _createClass(Button, [{
        key: 'toggle',

        // public

        value: function toggle() {
          var triggerChangeEvent = true;
          var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

          if (rootElement) {
            var input = $(this._element).find(Selector.INPUT)[0];

            if (input) {
              if (input.type === 'radio') {
                if (input.checked && $(this._element).hasClass(ClassName.ACTIVE)) {
                  triggerChangeEvent = false;
                } else {
                  var activeElement = $(rootElement).find(Selector.ACTIVE)[0];

                  if (activeElement) {
                    $(activeElement).removeClass(ClassName.ACTIVE);
                  }
                }
              }

              if (triggerChangeEvent) {
                input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
                $(this._element).trigger('change');
              }
            }
          } else {
            this._element.setAttribute('aria-pressed', !$(this._element).hasClass(ClassName.ACTIVE));
          }

          if (triggerChangeEvent) {
            $(this._element).toggleClass(ClassName.ACTIVE);
          }
        }
      }, {
        key: 'dispose',
        value: function dispose() {
          $.removeData(this._element, DATA_KEY);
          this._element = null;
        }

        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var data = $(this).data(DATA_KEY);

            if (!data) {
              data = new Button(this);
              $(this).data(DATA_KEY, data);
            }

            if (config === 'toggle') {
              data[config]();
            }
          });
        }
      }, {
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }]);

      return Button;
    })();

    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      event.preventDefault();

      var button = event.target;

      if (!$(button).hasClass(ClassName.BUTTON)) {
        button = $(button).closest(Selector.BUTTON);
      }

      Button._jQueryInterface.call($(button), 'toggle');
    }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      var button = $(event.target).closest(Selector.BUTTON)[0];
      $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Button._jQueryInterface;
    $.fn[NAME].Constructor = Button;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Button._jQueryInterface;
    };

    return Button;
  })(jQuery);

  module.exports = Button;
});

},{}],10:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './util'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./util'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.Util);
    global.carousel = mod.exports;
  }
})(this, function (exports, module, _util) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _Util = _interopRequireDefault(_util);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.2): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Carousel = (function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'carousel';
    var VERSION = '4.0.0-alpha';
    var DATA_KEY = 'bs.carousel';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 600;

    var Default = {
      interval: 5000,
      keyboard: true,
      slide: false,
      pause: 'hover',
      wrap: true
    };

    var DefaultType = {
      interval: '(number|boolean)',
      keyboard: 'boolean',
      slide: '(boolean|string)',
      pause: '(string|boolean)',
      wrap: 'boolean'
    };

    var Direction = {
      NEXT: 'next',
      PREVIOUS: 'prev'
    };

    var Event = {
      SLIDE: 'slide' + EVENT_KEY,
      SLID: 'slid' + EVENT_KEY,
      KEYDOWN: 'keydown' + EVENT_KEY,
      MOUSEENTER: 'mouseenter' + EVENT_KEY,
      MOUSELEAVE: 'mouseleave' + EVENT_KEY,
      LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY,
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
    };

    var ClassName = {
      CAROUSEL: 'carousel',
      ACTIVE: 'active',
      SLIDE: 'slide',
      RIGHT: 'right',
      LEFT: 'left',
      ITEM: 'carousel-item'
    };

    var Selector = {
      ACTIVE: '.active',
      ACTIVE_ITEM: '.active.carousel-item',
      ITEM: '.carousel-item',
      NEXT_PREV: '.next, .prev',
      INDICATORS: '.carousel-indicators',
      DATA_SLIDE: '[data-slide], [data-slide-to]',
      DATA_RIDE: '[data-ride="carousel"]'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Carousel = (function () {
      function Carousel(element, config) {
        _classCallCheck(this, Carousel);

        this._items = null;
        this._interval = null;
        this._activeElement = null;

        this._isPaused = false;
        this._isSliding = false;

        this._config = this._getConfig(config);
        this._element = $(element)[0];
        this._indicatorsElement = $(this._element).find(Selector.INDICATORS)[0];

        this._addEventListeners();
      }

      /**
       * ------------------------------------------------------------------------
       * Data Api implementation
       * ------------------------------------------------------------------------
       */

      // getters

      _createClass(Carousel, [{
        key: 'next',

        // public

        value: function next() {
          if (!this._isSliding) {
            this._slide(Direction.NEXT);
          }
        }
      }, {
        key: 'nextWhenVisible',
        value: function nextWhenVisible() {
          // Don't call next when the page isn't visible
          if (!document.hidden) {
            this.next();
          }
        }
      }, {
        key: 'prev',
        value: function prev() {
          if (!this._isSliding) {
            this._slide(Direction.PREVIOUS);
          }
        }
      }, {
        key: 'pause',
        value: function pause(event) {
          if (!event) {
            this._isPaused = true;
          }

          if ($(this._element).find(Selector.NEXT_PREV)[0] && _Util['default'].supportsTransitionEnd()) {
            _Util['default'].triggerTransitionEnd(this._element);
            this.cycle(true);
          }

          clearInterval(this._interval);
          this._interval = null;
        }
      }, {
        key: 'cycle',
        value: function cycle(event) {
          if (!event) {
            this._isPaused = false;
          }

          if (this._interval) {
            clearInterval(this._interval);
            this._interval = null;
          }

          if (this._config.interval && !this._isPaused) {
            this._interval = setInterval($.proxy(document.visibilityState ? this.nextWhenVisible : this.next, this), this._config.interval);
          }
        }
      }, {
        key: 'to',
        value: function to(index) {
          var _this = this;

          this._activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];

          var activeIndex = this._getItemIndex(this._activeElement);

          if (index > this._items.length - 1 || index < 0) {
            return;
          }

          if (this._isSliding) {
            $(this._element).one(Event.SLID, function () {
              return _this.to(index);
            });
            return;
          }

          if (activeIndex === index) {
            this.pause();
            this.cycle();
            return;
          }

          var direction = index > activeIndex ? Direction.NEXT : Direction.PREVIOUS;

          this._slide(direction, this._items[index]);
        }
      }, {
        key: 'dispose',
        value: function dispose() {
          $(this._element).off(EVENT_KEY);
          $.removeData(this._element, DATA_KEY);

          this._items = null;
          this._config = null;
          this._element = null;
          this._interval = null;
          this._isPaused = null;
          this._isSliding = null;
          this._activeElement = null;
          this._indicatorsElement = null;
        }

        // private

      }, {
        key: '_getConfig',
        value: function _getConfig(config) {
          config = $.extend({}, Default, config);
          _Util['default'].typeCheckConfig(NAME, config, DefaultType);
          return config;
        }
      }, {
        key: '_addEventListeners',
        value: function _addEventListeners() {
          if (this._config.keyboard) {
            $(this._element).on(Event.KEYDOWN, $.proxy(this._keydown, this));
          }

          if (this._config.pause === 'hover' && !('ontouchstart' in document.documentElement)) {
            $(this._element).on(Event.MOUSEENTER, $.proxy(this.pause, this)).on(Event.MOUSELEAVE, $.proxy(this.cycle, this));
          }
        }
      }, {
        key: '_keydown',
        value: function _keydown(event) {
          event.preventDefault();

          if (/input|textarea/i.test(event.target.tagName)) {
            return;
          }

          switch (event.which) {
            case 37:
              this.prev();break;
            case 39:
              this.next();break;
            default:
              return;
          }
        }
      }, {
        key: '_getItemIndex',
        value: function _getItemIndex(element) {
          this._items = $.makeArray($(element).parent().find(Selector.ITEM));
          return this._items.indexOf(element);
        }
      }, {
        key: '_getItemByDirection',
        value: function _getItemByDirection(direction, activeElement) {
          var isNextDirection = direction === Direction.NEXT;
          var isPrevDirection = direction === Direction.PREVIOUS;
          var activeIndex = this._getItemIndex(activeElement);
          var lastItemIndex = this._items.length - 1;
          var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

          if (isGoingToWrap && !this._config.wrap) {
            return activeElement;
          }

          var delta = direction === Direction.PREVIOUS ? -1 : 1;
          var itemIndex = (activeIndex + delta) % this._items.length;

          return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
        }
      }, {
        key: '_triggerSlideEvent',
        value: function _triggerSlideEvent(relatedTarget, directionalClassname) {
          var slideEvent = $.Event(Event.SLIDE, {
            relatedTarget: relatedTarget,
            direction: directionalClassname
          });

          $(this._element).trigger(slideEvent);

          return slideEvent;
        }
      }, {
        key: '_setActiveIndicatorElement',
        value: function _setActiveIndicatorElement(element) {
          if (this._indicatorsElement) {
            $(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

            var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

            if (nextIndicator) {
              $(nextIndicator).addClass(ClassName.ACTIVE);
            }
          }
        }
      }, {
        key: '_slide',
        value: function _slide(direction, element) {
          var _this2 = this;

          var activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];
          var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

          var isCycling = Boolean(this._interval);

          var directionalClassName = direction === Direction.NEXT ? ClassName.LEFT : ClassName.RIGHT;

          if (nextElement && $(nextElement).hasClass(ClassName.ACTIVE)) {
            this._isSliding = false;
            return;
          }

          var slideEvent = this._triggerSlideEvent(nextElement, directionalClassName);
          if (slideEvent.isDefaultPrevented()) {
            return;
          }

          if (!activeElement || !nextElement) {
            // some weirdness is happening, so we bail
            return;
          }

          this._isSliding = true;

          if (isCycling) {
            this.pause();
          }

          this._setActiveIndicatorElement(nextElement);

          var slidEvent = $.Event(Event.SLID, {
            relatedTarget: nextElement,
            direction: directionalClassName
          });

          if (_Util['default'].supportsTransitionEnd() && $(this._element).hasClass(ClassName.SLIDE)) {

            $(nextElement).addClass(direction);

            _Util['default'].reflow(nextElement);

            $(activeElement).addClass(directionalClassName);
            $(nextElement).addClass(directionalClassName);

            $(activeElement).one(_Util['default'].TRANSITION_END, function () {
              $(nextElement).removeClass(directionalClassName).removeClass(direction);

              $(nextElement).addClass(ClassName.ACTIVE);

              $(activeElement).removeClass(ClassName.ACTIVE).removeClass(direction).removeClass(directionalClassName);

              _this2._isSliding = false;

              setTimeout(function () {
                return $(_this2._element).trigger(slidEvent);
              }, 0);
            }).emulateTransitionEnd(TRANSITION_DURATION);
          } else {
            $(activeElement).removeClass(ClassName.ACTIVE);
            $(nextElement).addClass(ClassName.ACTIVE);

            this._isSliding = false;
            $(this._element).trigger(slidEvent);
          }

          if (isCycling) {
            this.cycle();
          }
        }

        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var data = $(this).data(DATA_KEY);
            var _config = $.extend({}, Default, $(this).data());

            if (typeof config === 'object') {
              $.extend(_config, config);
            }

            var action = typeof config === 'string' ? config : _config.slide;

            if (!data) {
              data = new Carousel(this, _config);
              $(this).data(DATA_KEY, data);
            }

            if (typeof config === 'number') {
              data.to(config);
            } else if (typeof action === 'string') {
              if (data[action] === undefined) {
                throw new Error('No method named "' + action + '"');
              }
              data[action]();
            } else if (_config.interval) {
              data.pause();
              data.cycle();
            }
          });
        }
      }, {
        key: '_dataApiClickHandler',
        value: function _dataApiClickHandler(event) {
          var selector = _Util['default'].getSelectorFromElement(this);

          if (!selector) {
            return;
          }

          var target = $(selector)[0];

          if (!target || !$(target).hasClass(ClassName.CAROUSEL)) {
            return;
          }

          var config = $.extend({}, $(target).data(), $(this).data());
          var slideIndex = this.getAttribute('data-slide-to');

          if (slideIndex) {
            config.interval = false;
          }

          Carousel._jQueryInterface.call($(target), config);

          if (slideIndex) {
            $(target).data(DATA_KEY).to(slideIndex);
          }

          event.preventDefault();
        }
      }, {
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }, {
        key: 'Default',
        get: function get() {
          return Default;
        }
      }]);

      return Carousel;
    })();

    $(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);

    $(window).on(Event.LOAD_DATA_API, function () {
      $(Selector.DATA_RIDE).each(function () {
        var $carousel = $(this);
        Carousel._jQueryInterface.call($carousel, $carousel.data());
      });
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Carousel._jQueryInterface;
    $.fn[NAME].Constructor = Carousel;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Carousel._jQueryInterface;
    };

    return Carousel;
  })(jQuery);

  module.exports = Carousel;
});

},{"./util":18}],11:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './util'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./util'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.Util);
    global.collapse = mod.exports;
  }
})(this, function (exports, module, _util) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _Util = _interopRequireDefault(_util);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.2): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Collapse = (function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'collapse';
    var VERSION = '4.0.0-alpha';
    var DATA_KEY = 'bs.collapse';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 600;

    var Default = {
      toggle: true,
      parent: ''
    };

    var DefaultType = {
      toggle: 'boolean',
      parent: 'string'
    };

    var Event = {
      SHOW: 'show' + EVENT_KEY,
      SHOWN: 'shown' + EVENT_KEY,
      HIDE: 'hide' + EVENT_KEY,
      HIDDEN: 'hidden' + EVENT_KEY,
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
    };

    var ClassName = {
      IN: 'in',
      COLLAPSE: 'collapse',
      COLLAPSING: 'collapsing',
      COLLAPSED: 'collapsed'
    };

    var Dimension = {
      WIDTH: 'width',
      HEIGHT: 'height'
    };

    var Selector = {
      ACTIVES: '.panel > .in, .panel > .collapsing',
      DATA_TOGGLE: '[data-toggle="collapse"]'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Collapse = (function () {
      function Collapse(element, config) {
        _classCallCheck(this, Collapse);

        this._isTransitioning = false;
        this._element = element;
        this._config = this._getConfig(config);
        this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));

        this._parent = this._config.parent ? this._getParent() : null;

        if (!this._config.parent) {
          this._addAriaAndCollapsedClass(this._element, this._triggerArray);
        }

        if (this._config.toggle) {
          this.toggle();
        }
      }

      /**
       * ------------------------------------------------------------------------
       * Data Api implementation
       * ------------------------------------------------------------------------
       */

      // getters

      _createClass(Collapse, [{
        key: 'toggle',

        // public

        value: function toggle() {
          if ($(this._element).hasClass(ClassName.IN)) {
            this.hide();
          } else {
            this.show();
          }
        }
      }, {
        key: 'show',
        value: function show() {
          var _this = this;

          if (this._isTransitioning || $(this._element).hasClass(ClassName.IN)) {
            return;
          }

          var actives = undefined;
          var activesData = undefined;

          if (this._parent) {
            actives = $.makeArray($(Selector.ACTIVES));
            if (!actives.length) {
              actives = null;
            }
          }

          if (actives) {
            activesData = $(actives).data(DATA_KEY);
            if (activesData && activesData._isTransitioning) {
              return;
            }
          }

          var startEvent = $.Event(Event.SHOW);
          $(this._element).trigger(startEvent);
          if (startEvent.isDefaultPrevented()) {
            return;
          }

          if (actives) {
            Collapse._jQueryInterface.call($(actives), 'hide');
            if (!activesData) {
              $(actives).data(DATA_KEY, null);
            }
          }

          var dimension = this._getDimension();

          $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);

          this._element.style[dimension] = 0;
          this._element.setAttribute('aria-expanded', true);

          if (this._triggerArray.length) {
            $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
          }

          this.setTransitioning(true);

          var complete = function complete() {
            $(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.IN);

            _this._element.style[dimension] = '';

            _this.setTransitioning(false);

            $(_this._element).trigger(Event.SHOWN);
          };

          if (!_Util['default'].supportsTransitionEnd()) {
            complete();
            return;
          }

          var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
          var scrollSize = 'scroll' + capitalizedDimension;

          $(this._element).one(_Util['default'].TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);

          this._element.style[dimension] = this._element[scrollSize] + 'px';
        }
      }, {
        key: 'hide',
        value: function hide() {
          var _this2 = this;

          if (this._isTransitioning || !$(this._element).hasClass(ClassName.IN)) {
            return;
          }

          var startEvent = $.Event(Event.HIDE);
          $(this._element).trigger(startEvent);
          if (startEvent.isDefaultPrevented()) {
            return;
          }

          var dimension = this._getDimension();
          var offsetDimension = dimension === Dimension.WIDTH ? 'offsetWidth' : 'offsetHeight';

          this._element.style[dimension] = this._element[offsetDimension] + 'px';

          _Util['default'].reflow(this._element);

          $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.IN);

          this._element.setAttribute('aria-expanded', false);

          if (this._triggerArray.length) {
            $(this._triggerArray).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
          }

          this.setTransitioning(true);

          var complete = function complete() {
            _this2.setTransitioning(false);
            $(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
          };

          this._element.style[dimension] = 0;

          if (!_Util['default'].supportsTransitionEnd()) {
            complete();
            return;
          }

          $(this._element).one(_Util['default'].TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
        }
      }, {
        key: 'setTransitioning',
        value: function setTransitioning(isTransitioning) {
          this._isTransitioning = isTransitioning;
        }
      }, {
        key: 'dispose',
        value: function dispose() {
          $.removeData(this._element, DATA_KEY);

          this._config = null;
          this._parent = null;
          this._element = null;
          this._triggerArray = null;
          this._isTransitioning = null;
        }

        // private

      }, {
        key: '_getConfig',
        value: function _getConfig(config) {
          config = $.extend({}, Default, config);
          config.toggle = Boolean(config.toggle); // coerce string values
          _Util['default'].typeCheckConfig(NAME, config, DefaultType);
          return config;
        }
      }, {
        key: '_getDimension',
        value: function _getDimension() {
          var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
          return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
        }
      }, {
        key: '_getParent',
        value: function _getParent() {
          var _this3 = this;

          var parent = $(this._config.parent)[0];
          var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

          $(parent).find(selector).each(function (i, element) {
            _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
          });

          return parent;
        }
      }, {
        key: '_addAriaAndCollapsedClass',
        value: function _addAriaAndCollapsedClass(element, triggerArray) {
          if (element) {
            var isOpen = $(element).hasClass(ClassName.IN);
            element.setAttribute('aria-expanded', isOpen);

            if (triggerArray.length) {
              $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
            }
          }
        }

        // static

      }], [{
        key: '_getTargetFromElement',
        value: function _getTargetFromElement(element) {
          var selector = _Util['default'].getSelectorFromElement(element);
          return selector ? $(selector)[0] : null;
        }
      }, {
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $this = $(this);
            var data = $this.data(DATA_KEY);
            var _config = $.extend({}, Default, $this.data(), typeof config === 'object' && config);

            if (!data && _config.toggle && /show|hide/.test(config)) {
              _config.toggle = false;
            }

            if (!data) {
              data = new Collapse(this, _config);
              $this.data(DATA_KEY, data);
            }

            if (typeof config === 'string') {
              if (data[config] === undefined) {
                throw new Error('No method named "' + config + '"');
              }
              data[config]();
            }
          });
        }
      }, {
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }, {
        key: 'Default',
        get: function get() {
          return Default;
        }
      }]);

      return Collapse;
    })();

    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();

      var target = Collapse._getTargetFromElement(this);
      var data = $(target).data(DATA_KEY);
      var config = data ? 'toggle' : $(this).data();

      Collapse._jQueryInterface.call($(target), config);
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Collapse._jQueryInterface;
    $.fn[NAME].Constructor = Collapse;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Collapse._jQueryInterface;
    };

    return Collapse;
  })(jQuery);

  module.exports = Collapse;
});

},{"./util":18}],12:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './util'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./util'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.Util);
    global.dropdown = mod.exports;
  }
})(this, function (exports, module, _util) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _Util = _interopRequireDefault(_util);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.2): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Dropdown = (function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'dropdown';
    var VERSION = '4.0.0-alpha';
    var DATA_KEY = 'bs.dropdown';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];

    var Event = {
      HIDE: 'hide' + EVENT_KEY,
      HIDDEN: 'hidden' + EVENT_KEY,
      SHOW: 'show' + EVENT_KEY,
      SHOWN: 'shown' + EVENT_KEY,
      CLICK: 'click' + EVENT_KEY,
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
      KEYDOWN_DATA_API: 'keydown' + EVENT_KEY + DATA_API_KEY
    };

    var ClassName = {
      BACKDROP: 'dropdown-backdrop',
      DISABLED: 'disabled',
      OPEN: 'open'
    };

    var Selector = {
      BACKDROP: '.dropdown-backdrop',
      DATA_TOGGLE: '[data-toggle="dropdown"]',
      FORM_CHILD: '.dropdown form',
      ROLE_MENU: '[role="menu"]',
      ROLE_LISTBOX: '[role="listbox"]',
      NAVBAR_NAV: '.navbar-nav',
      VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, ' + '[role="listbox"] li:not(.disabled) a'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Dropdown = (function () {
      function Dropdown(element) {
        _classCallCheck(this, Dropdown);

        this._element = element;

        this._addEventListeners();
      }

      /**
       * ------------------------------------------------------------------------
       * Data Api implementation
       * ------------------------------------------------------------------------
       */

      // getters

      _createClass(Dropdown, [{
        key: 'toggle',

        // public

        value: function toggle() {
          if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
            return false;
          }

          var parent = Dropdown._getParentFromElement(this);
          var isActive = $(parent).hasClass(ClassName.OPEN);

          Dropdown._clearMenus();

          if (isActive) {
            return false;
          }

          if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {

            // if mobile we use a backdrop because click events don't delegate
            var dropdown = document.createElement('div');
            dropdown.className = ClassName.BACKDROP;
            $(dropdown).insertBefore(this);
            $(dropdown).on('click', Dropdown._clearMenus);
          }

          var relatedTarget = { relatedTarget: this };
          var showEvent = $.Event(Event.SHOW, relatedTarget);

          $(parent).trigger(showEvent);

          if (showEvent.isDefaultPrevented()) {
            return false;
          }

          this.focus();
          this.setAttribute('aria-expanded', 'true');

          $(parent).toggleClass(ClassName.OPEN);
          $(parent).trigger($.Event(Event.SHOWN, relatedTarget));

          return false;
        }
      }, {
        key: 'dispose',
        value: function dispose() {
          $.removeData(this._element, DATA_KEY);
          $(this._element).off(EVENT_KEY);
          this._element = null;
        }

        // private

      }, {
        key: '_addEventListeners',
        value: function _addEventListeners() {
          $(this._element).on(Event.CLICK, this.toggle);
        }

        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var data = $(this).data(DATA_KEY);

            if (!data) {
              $(this).data(DATA_KEY, data = new Dropdown(this));
            }

            if (typeof config === 'string') {
              if (data[config] === undefined) {
                throw new Error('No method named "' + config + '"');
              }
              data[config].call(this);
            }
          });
        }
      }, {
        key: '_clearMenus',
        value: function _clearMenus(event) {
          if (event && event.which === 3) {
            return;
          }

          var backdrop = $(Selector.BACKDROP)[0];
          if (backdrop) {
            backdrop.parentNode.removeChild(backdrop);
          }

          var toggles = $.makeArray($(Selector.DATA_TOGGLE));

          for (var i = 0; i < toggles.length; i++) {
            var _parent = Dropdown._getParentFromElement(toggles[i]);
            var relatedTarget = { relatedTarget: toggles[i] };

            if (!$(_parent).hasClass(ClassName.OPEN)) {
              continue;
            }

            if (event && event.type === 'click' && /input|textarea/i.test(event.target.tagName) && $.contains(_parent, event.target)) {
              continue;
            }

            var hideEvent = $.Event(Event.HIDE, relatedTarget);
            $(_parent).trigger(hideEvent);
            if (hideEvent.isDefaultPrevented()) {
              continue;
            }

            toggles[i].setAttribute('aria-expanded', 'false');

            $(_parent).removeClass(ClassName.OPEN).trigger($.Event(Event.HIDDEN, relatedTarget));
          }
        }
      }, {
        key: '_getParentFromElement',
        value: function _getParentFromElement(element) {
          var parent = undefined;
          var selector = _Util['default'].getSelectorFromElement(element);

          if (selector) {
            parent = $(selector)[0];
          }

          return parent || element.parentNode;
        }
      }, {
        key: '_dataApiKeydownHandler',
        value: function _dataApiKeydownHandler(event) {
          if (!/(38|40|27|32)/.test(event.which) || /input|textarea/i.test(event.target.tagName)) {
            return;
          }

          event.preventDefault();
          event.stopPropagation();

          if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
            return;
          }

          var parent = Dropdown._getParentFromElement(this);
          var isActive = $(parent).hasClass(ClassName.OPEN);

          if (!isActive && event.which !== 27 || isActive && event.which === 27) {

            if (event.which === 27) {
              var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
              $(toggle).trigger('focus');
            }

            $(this).trigger('click');
            return;
          }

          var items = $.makeArray($(Selector.VISIBLE_ITEMS));

          items = items.filter(function (item) {
            return item.offsetWidth || item.offsetHeight;
          });

          if (!items.length) {
            return;
          }

          var index = items.indexOf(event.target);

          if (event.which === 38 && index > 0) {
            // up
            index--;
          }

          if (event.which === 40 && index < items.length - 1) {
            // down
            index++;
          }

          if (! ~index) {
            index = 0;
          }

          items[index].focus();
        }
      }, {
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }]);

      return Dropdown;
    })();

    $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_MENU, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_LISTBOX, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, Dropdown.prototype.toggle).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
      e.stopPropagation();
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Dropdown._jQueryInterface;
    $.fn[NAME].Constructor = Dropdown;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Dropdown._jQueryInterface;
    };

    return Dropdown;
  })(jQuery);

  module.exports = Dropdown;
});

},{"./util":18}],13:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './util'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./util'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.Util);
    global.modal = mod.exports;
  }
})(this, function (exports, module, _util) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _Util = _interopRequireDefault(_util);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.2): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Modal = (function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'modal';
    var VERSION = '4.0.0-alpha';
    var DATA_KEY = 'bs.modal';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 300;
    var BACKDROP_TRANSITION_DURATION = 150;

    var Default = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: true
    };

    var DefaultType = {
      backdrop: '(boolean|string)',
      keyboard: 'boolean',
      focus: 'boolean',
      show: 'boolean'
    };

    var Event = {
      HIDE: 'hide' + EVENT_KEY,
      HIDDEN: 'hidden' + EVENT_KEY,
      SHOW: 'show' + EVENT_KEY,
      SHOWN: 'shown' + EVENT_KEY,
      FOCUSIN: 'focusin' + EVENT_KEY,
      RESIZE: 'resize' + EVENT_KEY,
      CLICK_DISMISS: 'click.dismiss' + EVENT_KEY,
      KEYDOWN_DISMISS: 'keydown.dismiss' + EVENT_KEY,
      MOUSEUP_DISMISS: 'mouseup.dismiss' + EVENT_KEY,
      MOUSEDOWN_DISMISS: 'mousedown.dismiss' + EVENT_KEY,
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
    };

    var ClassName = {
      SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
      BACKDROP: 'modal-backdrop',
      OPEN: 'modal-open',
      FADE: 'fade',
      IN: 'in'
    };

    var Selector = {
      DIALOG: '.modal-dialog',
      DATA_TOGGLE: '[data-toggle="modal"]',
      DATA_DISMISS: '[data-dismiss="modal"]',
      FIXED_CONTENT: '.navbar-fixed-top, .navbar-fixed-bottom, .is-fixed'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Modal = (function () {
      function Modal(element, config) {
        _classCallCheck(this, Modal);

        this._config = this._getConfig(config);
        this._element = element;
        this._dialog = $(element).find(Selector.DIALOG)[0];
        this._backdrop = null;
        this._isShown = false;
        this._isBodyOverflowing = false;
        this._ignoreBackdropClick = false;
        this._originalBodyPadding = 0;
        this._scrollbarWidth = 0;
      }

      /**
       * ------------------------------------------------------------------------
       * Data Api implementation
       * ------------------------------------------------------------------------
       */

      // getters

      _createClass(Modal, [{
        key: 'toggle',

        // public

        value: function toggle(relatedTarget) {
          return this._isShown ? this.hide() : this.show(relatedTarget);
        }
      }, {
        key: 'show',
        value: function show(relatedTarget) {
          var _this = this;

          var showEvent = $.Event(Event.SHOW, {
            relatedTarget: relatedTarget
          });

          $(this._element).trigger(showEvent);

          if (this._isShown || showEvent.isDefaultPrevented()) {
            return;
          }

          this._isShown = true;

          this._checkScrollbar();
          this._setScrollbar();

          $(document.body).addClass(ClassName.OPEN);

          this._setEscapeEvent();
          this._setResizeEvent();

          $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, $.proxy(this.hide, this));

          $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
            $(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
              if ($(event.target).is(_this._element)) {
                _this._ignoreBackdropClick = true;
              }
            });
          });

          this._showBackdrop($.proxy(this._showElement, this, relatedTarget));
        }
      }, {
        key: 'hide',
        value: function hide(event) {
          if (event) {
            event.preventDefault();
          }

          var hideEvent = $.Event(Event.HIDE);

          $(this._element).trigger(hideEvent);

          if (!this._isShown || hideEvent.isDefaultPrevented()) {
            return;
          }

          this._isShown = false;

          this._setEscapeEvent();
          this._setResizeEvent();

          $(document).off(Event.FOCUSIN);

          $(this._element).removeClass(ClassName.IN);

          $(this._element).off(Event.CLICK_DISMISS);
          $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

          if (_Util['default'].supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {

            $(this._element).one(_Util['default'].TRANSITION_END, $.proxy(this._hideModal, this)).emulateTransitionEnd(TRANSITION_DURATION);
          } else {
            this._hideModal();
          }
        }
      }, {
        key: 'dispose',
        value: function dispose() {
          $.removeData(this._element, DATA_KEY);

          $(window).off(EVENT_KEY);
          $(document).off(EVENT_KEY);
          $(this._element).off(EVENT_KEY);
          $(this._backdrop).off(EVENT_KEY);

          this._config = null;
          this._element = null;
          this._dialog = null;
          this._backdrop = null;
          this._isShown = null;
          this._isBodyOverflowing = null;
          this._ignoreBackdropClick = null;
          this._originalBodyPadding = null;
          this._scrollbarWidth = null;
        }

        // private

      }, {
        key: '_getConfig',
        value: function _getConfig(config) {
          config = $.extend({}, Default, config);
          _Util['default'].typeCheckConfig(NAME, config, DefaultType);
          return config;
        }
      }, {
        key: '_showElement',
        value: function _showElement(relatedTarget) {
          var _this2 = this;

          var transition = _Util['default'].supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

          if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
            // don't move modals dom position
            document.body.appendChild(this._element);
          }

          this._element.style.display = 'block';
          this._element.scrollTop = 0;

          if (transition) {
            _Util['default'].reflow(this._element);
          }

          $(this._element).addClass(ClassName.IN);

          if (this._config.focus) {
            this._enforceFocus();
          }

          var shownEvent = $.Event(Event.SHOWN, {
            relatedTarget: relatedTarget
          });

          var transitionComplete = function transitionComplete() {
            if (_this2._config.focus) {
              _this2._element.focus();
            }
            $(_this2._element).trigger(shownEvent);
          };

          if (transition) {
            $(this._dialog).one(_Util['default'].TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
          } else {
            transitionComplete();
          }
        }
      }, {
        key: '_enforceFocus',
        value: function _enforceFocus() {
          var _this3 = this;

          $(document).off(Event.FOCUSIN) // guard against infinite focus loop
          .on(Event.FOCUSIN, function (event) {
            if (_this3._element !== event.target && !$(_this3._element).has(event.target).length) {
              _this3._element.focus();
            }
          });
        }
      }, {
        key: '_setEscapeEvent',
        value: function _setEscapeEvent() {
          var _this4 = this;

          if (this._isShown && this._config.keyboard) {
            $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
              if (event.which === 27) {
                _this4.hide();
              }
            });
          } else if (!this._isShown) {
            $(this._element).off(Event.KEYDOWN_DISMISS);
          }
        }
      }, {
        key: '_setResizeEvent',
        value: function _setResizeEvent() {
          if (this._isShown) {
            $(window).on(Event.RESIZE, $.proxy(this._handleUpdate, this));
          } else {
            $(window).off(Event.RESIZE);
          }
        }
      }, {
        key: '_hideModal',
        value: function _hideModal() {
          var _this5 = this;

          this._element.style.display = 'none';
          this._showBackdrop(function () {
            $(document.body).removeClass(ClassName.OPEN);
            _this5._resetAdjustments();
            _this5._resetScrollbar();
            $(_this5._element).trigger(Event.HIDDEN);
          });
        }
      }, {
        key: '_removeBackdrop',
        value: function _removeBackdrop() {
          if (this._backdrop) {
            $(this._backdrop).remove();
            this._backdrop = null;
          }
        }
      }, {
        key: '_showBackdrop',
        value: function _showBackdrop(callback) {
          var _this6 = this;

          var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

          if (this._isShown && this._config.backdrop) {
            var doAnimate = _Util['default'].supportsTransitionEnd() && animate;

            this._backdrop = document.createElement('div');
            this._backdrop.className = ClassName.BACKDROP;

            if (animate) {
              $(this._backdrop).addClass(animate);
            }

            $(this._backdrop).appendTo(document.body);

            $(this._element).on(Event.CLICK_DISMISS, function (event) {
              if (_this6._ignoreBackdropClick) {
                _this6._ignoreBackdropClick = false;
                return;
              }
              if (event.target !== event.currentTarget) {
                return;
              }
              if (_this6._config.backdrop === 'static') {
                _this6._element.focus();
              } else {
                _this6.hide();
              }
            });

            if (doAnimate) {
              _Util['default'].reflow(this._backdrop);
            }

            $(this._backdrop).addClass(ClassName.IN);

            if (!callback) {
              return;
            }

            if (!doAnimate) {
              callback();
              return;
            }

            $(this._backdrop).one(_Util['default'].TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
          } else if (!this._isShown && this._backdrop) {
            $(this._backdrop).removeClass(ClassName.IN);

            var callbackRemove = function callbackRemove() {
              _this6._removeBackdrop();
              if (callback) {
                callback();
              }
            };

            if (_Util['default'].supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
              $(this._backdrop).one(_Util['default'].TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
            } else {
              callbackRemove();
            }
          } else if (callback) {
            callback();
          }
        }

        // ----------------------------------------------------------------------
        // the following methods are used to handle overflowing modals
        // todo (fat): these should probably be refactored out of modal.js
        // ----------------------------------------------------------------------

      }, {
        key: '_handleUpdate',
        value: function _handleUpdate() {
          this._adjustDialog();
        }
      }, {
        key: '_adjustDialog',
        value: function _adjustDialog() {
          var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

          if (!this._isBodyOverflowing && isModalOverflowing) {
            this._element.style.paddingLeft = this._scrollbarWidth + 'px';
          }

          if (this._isBodyOverflowing && !isModalOverflowing) {
            this._element.style.paddingRight = this._scrollbarWidth + 'px~';
          }
        }
      }, {
        key: '_resetAdjustments',
        value: function _resetAdjustments() {
          this._element.style.paddingLeft = '';
          this._element.style.paddingRight = '';
        }
      }, {
        key: '_checkScrollbar',
        value: function _checkScrollbar() {
          var fullWindowWidth = window.innerWidth;
          if (!fullWindowWidth) {
            // workaround for missing window.innerWidth in IE8
            var documentElementRect = document.documentElement.getBoundingClientRect();
            fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
          }
          this._isBodyOverflowing = document.body.clientWidth < fullWindowWidth;
          this._scrollbarWidth = this._getScrollbarWidth();
        }
      }, {
        key: '_setScrollbar',
        value: function _setScrollbar() {
          var bodyPadding = parseInt($(Selector.FIXED_CONTENT).css('padding-right') || 0, 10);

          this._originalBodyPadding = document.body.style.paddingRight || '';

          if (this._isBodyOverflowing) {
            document.body.style.paddingRight = bodyPadding + this._scrollbarWidth + 'px';
          }
        }
      }, {
        key: '_resetScrollbar',
        value: function _resetScrollbar() {
          document.body.style.paddingRight = this._originalBodyPadding;
        }
      }, {
        key: '_getScrollbarWidth',
        value: function _getScrollbarWidth() {
          // thx d.walsh
          var scrollDiv = document.createElement('div');
          scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
          document.body.appendChild(scrollDiv);
          var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
          document.body.removeChild(scrollDiv);
          return scrollbarWidth;
        }

        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config, relatedTarget) {
          return this.each(function () {
            var data = $(this).data(DATA_KEY);
            var _config = $.extend({}, Modal.Default, $(this).data(), typeof config === 'object' && config);

            if (!data) {
              data = new Modal(this, _config);
              $(this).data(DATA_KEY, data);
            }

            if (typeof config === 'string') {
              if (data[config] === undefined) {
                throw new Error('No method named "' + config + '"');
              }
              data[config](relatedTarget);
            } else if (_config.show) {
              data.show(relatedTarget);
            }
          });
        }
      }, {
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }, {
        key: 'Default',
        get: function get() {
          return Default;
        }
      }]);

      return Modal;
    })();

    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      var _this7 = this;

      var target = undefined;
      var selector = _Util['default'].getSelectorFromElement(this);

      if (selector) {
        target = $(selector)[0];
      }

      var config = $(target).data(DATA_KEY) ? 'toggle' : $.extend({}, $(target).data(), $(this).data());

      if (this.tagName === 'A') {
        event.preventDefault();
      }

      var $target = $(target).one(Event.SHOW, function (showEvent) {
        if (showEvent.isDefaultPrevented()) {
          // only register focus restorer if modal will actually get shown
          return;
        }

        $target.one(Event.HIDDEN, function () {
          if ($(_this7).is(':visible')) {
            _this7.focus();
          }
        });
      });

      Modal._jQueryInterface.call($(target), config, this);
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Modal._jQueryInterface;
    $.fn[NAME].Constructor = Modal;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Modal._jQueryInterface;
    };

    return Modal;
  })(jQuery);

  module.exports = Modal;
});

},{"./util":18}],14:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './tooltip'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./tooltip'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.Tooltip);
    global.popover = mod.exports;
  }
})(this, function (exports, module, _tooltip) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var _Tooltip2 = _interopRequireDefault(_tooltip);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.2): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Popover = (function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'popover';
    var VERSION = '4.0.0-alpha';
    var DATA_KEY = 'bs.popover';
    var EVENT_KEY = '.' + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];

    var Default = $.extend({}, _Tooltip2['default'].Default, {
      placement: 'right',
      trigger: 'click',
      content: '',
      template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-title"></h3>' + '<div class="popover-content"></div></div>'
    });

    var DefaultType = $.extend({}, _Tooltip2['default'].DefaultType, {
      content: '(string|element|function)'
    });

    var ClassName = {
      FADE: 'fade',
      IN: 'in'
    };

    var Selector = {
      TITLE: '.popover-title',
      CONTENT: '.popover-content',
      ARROW: '.popover-arrow'
    };

    var Event = {
      HIDE: 'hide' + EVENT_KEY,
      HIDDEN: 'hidden' + EVENT_KEY,
      SHOW: 'show' + EVENT_KEY,
      SHOWN: 'shown' + EVENT_KEY,
      INSERTED: 'inserted' + EVENT_KEY,
      CLICK: 'click' + EVENT_KEY,
      FOCUSIN: 'focusin' + EVENT_KEY,
      FOCUSOUT: 'focusout' + EVENT_KEY,
      MOUSEENTER: 'mouseenter' + EVENT_KEY,
      MOUSELEAVE: 'mouseleave' + EVENT_KEY
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Popover = (function (_Tooltip) {
      _inherits(Popover, _Tooltip);

      function Popover() {
        _classCallCheck(this, Popover);

        _get(Object.getPrototypeOf(Popover.prototype), 'constructor', this).apply(this, arguments);
      }

      /**
       * ------------------------------------------------------------------------
       * jQuery
       * ------------------------------------------------------------------------
       */

      _createClass(Popover, [{
        key: 'isWithContent',

        // overrides

        value: function isWithContent() {
          return this.getTitle() || this._getContent();
        }
      }, {
        key: 'getTipElement',
        value: function getTipElement() {
          return this.tip = this.tip || $(this.config.template)[0];
        }
      }, {
        key: 'setContent',
        value: function setContent() {
          var $tip = $(this.getTipElement());

          // we use append for html objects to maintain js events
          this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
          this.setElementContent($tip.find(Selector.CONTENT), this._getContent());

          $tip.removeClass(ClassName.FADE).removeClass(ClassName.IN);

          this.cleanupTether();
        }

        // private

      }, {
        key: '_getContent',
        value: function _getContent() {
          return this.element.getAttribute('data-content') || (typeof this.config.content === 'function' ? this.config.content.call(this.element) : this.config.content);
        }

        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var data = $(this).data(DATA_KEY);
            var _config = typeof config === 'object' ? config : null;

            if (!data && /destroy|hide/.test(config)) {
              return;
            }

            if (!data) {
              data = new Popover(this, _config);
              $(this).data(DATA_KEY, data);
            }

            if (typeof config === 'string') {
              if (data[config] === undefined) {
                throw new Error('No method named "' + config + '"');
              }
              data[config]();
            }
          });
        }
      }, {
        key: 'VERSION',

        // getters

        get: function get() {
          return VERSION;
        }
      }, {
        key: 'Default',
        get: function get() {
          return Default;
        }
      }, {
        key: 'NAME',
        get: function get() {
          return NAME;
        }
      }, {
        key: 'DATA_KEY',
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: 'Event',
        get: function get() {
          return Event;
        }
      }, {
        key: 'EVENT_KEY',
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: 'DefaultType',
        get: function get() {
          return DefaultType;
        }
      }]);

      return Popover;
    })(_Tooltip2['default']);

    $.fn[NAME] = Popover._jQueryInterface;
    $.fn[NAME].Constructor = Popover;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Popover._jQueryInterface;
    };

    return Popover;
  })(jQuery);

  module.exports = Popover;
});

},{"./tooltip":17}],15:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './util'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./util'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.Util);
    global.scrollspy = mod.exports;
  }
})(this, function (exports, module, _util) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _Util = _interopRequireDefault(_util);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.2): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var ScrollSpy = (function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'scrollspy';
    var VERSION = '4.0.0-alpha';
    var DATA_KEY = 'bs.scrollspy';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];

    var Default = {
      offset: 10,
      method: 'auto',
      target: ''
    };

    var DefaultType = {
      offset: 'number',
      method: 'string',
      target: '(string|element)'
    };

    var Event = {
      ACTIVATE: 'activate' + EVENT_KEY,
      SCROLL: 'scroll' + EVENT_KEY,
      LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY
    };

    var ClassName = {
      DROPDOWN_ITEM: 'dropdown-item',
      DROPDOWN_MENU: 'dropdown-menu',
      NAV_LINK: 'nav-link',
      NAV: 'nav',
      ACTIVE: 'active'
    };

    var Selector = {
      DATA_SPY: '[data-spy="scroll"]',
      ACTIVE: '.active',
      LIST_ITEM: '.list-item',
      LI: 'li',
      LI_DROPDOWN: 'li.dropdown',
      NAV_LINKS: '.nav-link',
      DROPDOWN: '.dropdown',
      DROPDOWN_ITEMS: '.dropdown-item',
      DROPDOWN_TOGGLE: '.dropdown-toggle'
    };

    var OffsetMethod = {
      OFFSET: 'offset',
      POSITION: 'position'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var ScrollSpy = (function () {
      function ScrollSpy(element, config) {
        _classCallCheck(this, ScrollSpy);

        this._element = element;
        this._scrollElement = element.tagName === 'BODY' ? window : element;
        this._config = this._getConfig(config);
        this._selector = this._config.target + ' ' + Selector.NAV_LINKS + ',' + (this._config.target + ' ' + Selector.DROPDOWN_ITEMS);
        this._offsets = [];
        this._targets = [];
        this._activeTarget = null;
        this._scrollHeight = 0;

        $(this._scrollElement).on(Event.SCROLL, $.proxy(this._process, this));

        this.refresh();
        this._process();
      }

      /**
       * ------------------------------------------------------------------------
       * Data Api implementation
       * ------------------------------------------------------------------------
       */

      // getters

      _createClass(ScrollSpy, [{
        key: 'refresh',

        // public

        value: function refresh() {
          var _this = this;

          var autoMethod = this._scrollElement !== this._scrollElement.window ? OffsetMethod.POSITION : OffsetMethod.OFFSET;

          var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;

          var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;

          this._offsets = [];
          this._targets = [];

          this._scrollHeight = this._getScrollHeight();

          var targets = $.makeArray($(this._selector));

          targets.map(function (element) {
            var target = undefined;
            var targetSelector = _Util['default'].getSelectorFromElement(element);

            if (targetSelector) {
              target = $(targetSelector)[0];
            }

            if (target && (target.offsetWidth || target.offsetHeight)) {
              // todo (fat): remove sketch reliance on jQuery position/offset
              return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
            }
          }).filter(function (item) {
            return item;
          }).sort(function (a, b) {
            return a[0] - b[0];
          }).forEach(function (item) {
            _this._offsets.push(item[0]);
            _this._targets.push(item[1]);
          });
        }
      }, {
        key: 'dispose',
        value: function dispose() {
          $.removeData(this._element, DATA_KEY);
          $(this._scrollElement).off(EVENT_KEY);

          this._element = null;
          this._scrollElement = null;
          this._config = null;
          this._selector = null;
          this._offsets = null;
          this._targets = null;
          this._activeTarget = null;
          this._scrollHeight = null;
        }

        // private

      }, {
        key: '_getConfig',
        value: function _getConfig(config) {
          config = $.extend({}, Default, config);

          if (typeof config.target !== 'string') {
            var id = $(config.target).attr('id');
            if (!id) {
              id = _Util['default'].getUID(NAME);
              $(config.target).attr('id', id);
            }
            config.target = '#' + id;
          }

          _Util['default'].typeCheckConfig(NAME, config, DefaultType);

          return config;
        }
      }, {
        key: '_getScrollTop',
        value: function _getScrollTop() {
          return this._scrollElement === window ? this._scrollElement.scrollY : this._scrollElement.scrollTop;
        }
      }, {
        key: '_getScrollHeight',
        value: function _getScrollHeight() {
          return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        }
      }, {
        key: '_process',
        value: function _process() {
          var scrollTop = this._getScrollTop() + this._config.offset;
          var scrollHeight = this._getScrollHeight();
          var maxScroll = this._config.offset + scrollHeight - this._scrollElement.offsetHeight;

          if (this._scrollHeight !== scrollHeight) {
            this.refresh();
          }

          if (scrollTop >= maxScroll) {
            var target = this._targets[this._targets.length - 1];

            if (this._activeTarget !== target) {
              this._activate(target);
            }
          }

          if (this._activeTarget && scrollTop < this._offsets[0]) {
            this._activeTarget = null;
            this._clear();
            return;
          }

          for (var i = this._offsets.length; i--;) {
            var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (this._offsets[i + 1] === undefined || scrollTop < this._offsets[i + 1]);

            if (isActiveTarget) {
              this._activate(this._targets[i]);
            }
          }
        }
      }, {
        key: '_activate',
        value: function _activate(target) {
          this._activeTarget = target;

          this._clear();

          var queries = this._selector.split(',');
          queries = queries.map(function (selector) {
            return selector + '[data-target="' + target + '"],' + (selector + '[href="' + target + '"]');
          });

          var $link = $(queries.join(','));

          if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
            $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
            $link.addClass(ClassName.ACTIVE);
          } else {
            // todo (fat) this is kinda sus…
            // recursively add actives to tested nav-links
            $link.parents(Selector.LI).find(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
          }

          $(this._scrollElement).trigger(Event.ACTIVATE, {
            relatedTarget: target
          });
        }
      }, {
        key: '_clear',
        value: function _clear() {
          $(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
        }

        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var data = $(this).data(DATA_KEY);
            var _config = typeof config === 'object' && config || null;

            if (!data) {
              data = new ScrollSpy(this, _config);
              $(this).data(DATA_KEY, data);
            }

            if (typeof config === 'string') {
              if (data[config] === undefined) {
                throw new Error('No method named "' + config + '"');
              }
              data[config]();
            }
          });
        }
      }, {
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }, {
        key: 'Default',
        get: function get() {
          return Default;
        }
      }]);

      return ScrollSpy;
    })();

    $(window).on(Event.LOAD_DATA_API, function () {
      var scrollSpys = $.makeArray($(Selector.DATA_SPY));

      for (var i = scrollSpys.length; i--;) {
        var $spy = $(scrollSpys[i]);
        ScrollSpy._jQueryInterface.call($spy, $spy.data());
      }
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = ScrollSpy._jQueryInterface;
    $.fn[NAME].Constructor = ScrollSpy;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return ScrollSpy._jQueryInterface;
    };

    return ScrollSpy;
  })(jQuery);

  module.exports = ScrollSpy;
});

},{"./util":18}],16:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './util'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./util'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.Util);
    global.tab = mod.exports;
  }
})(this, function (exports, module, _util) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _Util = _interopRequireDefault(_util);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.2): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tab = (function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'tab';
    var VERSION = '4.0.0-alpha';
    var DATA_KEY = 'bs.tab';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 150;

    var Event = {
      HIDE: 'hide' + EVENT_KEY,
      HIDDEN: 'hidden' + EVENT_KEY,
      SHOW: 'show' + EVENT_KEY,
      SHOWN: 'shown' + EVENT_KEY,
      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
    };

    var ClassName = {
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active',
      FADE: 'fade',
      IN: 'in'
    };

    var Selector = {
      A: 'a',
      LI: 'li',
      DROPDOWN: '.dropdown',
      UL: 'ul:not(.dropdown-menu)',
      FADE_CHILD: '> .nav-item .fade, > .fade',
      ACTIVE: '.active',
      ACTIVE_CHILD: '> .nav-item > .active, > .active',
      DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"]',
      DROPDOWN_TOGGLE: '.dropdown-toggle',
      DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Tab = (function () {
      function Tab(element) {
        _classCallCheck(this, Tab);

        this._element = element;
      }

      /**
       * ------------------------------------------------------------------------
       * Data Api implementation
       * ------------------------------------------------------------------------
       */

      // getters

      _createClass(Tab, [{
        key: 'show',

        // public

        value: function show() {
          var _this = this;

          if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE)) {
            return;
          }

          var target = undefined;
          var previous = undefined;
          var ulElement = $(this._element).closest(Selector.UL)[0];
          var selector = _Util['default'].getSelectorFromElement(this._element);

          if (ulElement) {
            previous = $.makeArray($(ulElement).find(Selector.ACTIVE));
            previous = previous[previous.length - 1];
          }

          var hideEvent = $.Event(Event.HIDE, {
            relatedTarget: this._element
          });

          var showEvent = $.Event(Event.SHOW, {
            relatedTarget: previous
          });

          if (previous) {
            $(previous).trigger(hideEvent);
          }

          $(this._element).trigger(showEvent);

          if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
            return;
          }

          if (selector) {
            target = $(selector)[0];
          }

          this._activate(this._element, ulElement);

          var complete = function complete() {
            var hiddenEvent = $.Event(Event.HIDDEN, {
              relatedTarget: _this._element
            });

            var shownEvent = $.Event(Event.SHOWN, {
              relatedTarget: previous
            });

            $(previous).trigger(hiddenEvent);
            $(_this._element).trigger(shownEvent);
          };

          if (target) {
            this._activate(target, target.parentNode, complete);
          } else {
            complete();
          }
        }
      }, {
        key: 'dispose',
        value: function dispose() {
          $.removeClass(this._element, DATA_KEY);
          this._element = null;
        }

        // private

      }, {
        key: '_activate',
        value: function _activate(element, container, callback) {
          var active = $(container).find(Selector.ACTIVE_CHILD)[0];
          var isTransitioning = callback && _Util['default'].supportsTransitionEnd() && (active && $(active).hasClass(ClassName.FADE) || Boolean($(container).find(Selector.FADE_CHILD)[0]));

          var complete = $.proxy(this._transitionComplete, this, element, active, isTransitioning, callback);

          if (active && isTransitioning) {
            $(active).one(_Util['default'].TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
          } else {
            complete();
          }

          if (active) {
            $(active).removeClass(ClassName.IN);
          }
        }
      }, {
        key: '_transitionComplete',
        value: function _transitionComplete(element, active, isTransitioning, callback) {
          if (active) {
            $(active).removeClass(ClassName.ACTIVE);

            var dropdownChild = $(active).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

            if (dropdownChild) {
              $(dropdownChild).removeClass(ClassName.ACTIVE);
            }

            active.setAttribute('aria-expanded', false);
          }

          $(element).addClass(ClassName.ACTIVE);
          element.setAttribute('aria-expanded', true);

          if (isTransitioning) {
            _Util['default'].reflow(element);
            $(element).addClass(ClassName.IN);
          } else {
            $(element).removeClass(ClassName.FADE);
          }

          if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {

            var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];
            if (dropdownElement) {
              $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
            }

            element.setAttribute('aria-expanded', true);
          }

          if (callback) {
            callback();
          }
        }

        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $this = $(this);
            var data = $this.data(DATA_KEY);

            if (!data) {
              data = data = new Tab(this);
              $this.data(DATA_KEY, data);
            }

            if (typeof config === 'string') {
              if (data[config] === undefined) {
                throw new Error('No method named "' + config + '"');
              }
              data[config]();
            }
          });
        }
      }, {
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }]);

      return Tab;
    })();

    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();
      Tab._jQueryInterface.call($(this), 'show');
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Tab._jQueryInterface;
    $.fn[NAME].Constructor = Tab;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tab._jQueryInterface;
    };

    return Tab;
  })(jQuery);

  module.exports = Tab;
});

},{"./util":18}],17:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './util'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./util'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.Util);
    global.tooltip = mod.exports;
  }
})(this, function (exports, module, _util) {
  /* global Tether */

  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _Util = _interopRequireDefault(_util);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.2): tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tooltip = (function ($) {

    /**
     * Check for Tether dependency
     * Tether - http://github.hubspot.com/tether/
     */
    if (window.Tether === undefined) {
      throw new Error('Bootstrap tooltips require Tether (http://github.hubspot.com/tether/)');
    }

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'tooltip';
    var VERSION = '4.0.0-alpha';
    var DATA_KEY = 'bs.tooltip';
    var EVENT_KEY = '.' + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 150;
    var CLASS_PREFIX = 'bs-tether';

    var Default = {
      animation: true,
      template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div></div>',
      trigger: 'hover focus',
      title: '',
      delay: 0,
      html: false,
      selector: false,
      placement: 'top',
      offset: '0 0',
      constraints: []
    };

    var DefaultType = {
      animation: 'boolean',
      template: 'string',
      title: '(string|element|function)',
      trigger: 'string',
      delay: '(number|object)',
      html: 'boolean',
      selector: '(string|boolean)',
      placement: '(string|function)',
      offset: 'string',
      constraints: 'array'
    };

    var AttachmentMap = {
      TOP: 'bottom center',
      RIGHT: 'middle left',
      BOTTOM: 'top center',
      LEFT: 'middle right'
    };

    var HoverState = {
      IN: 'in',
      OUT: 'out'
    };

    var Event = {
      HIDE: 'hide' + EVENT_KEY,
      HIDDEN: 'hidden' + EVENT_KEY,
      SHOW: 'show' + EVENT_KEY,
      SHOWN: 'shown' + EVENT_KEY,
      INSERTED: 'inserted' + EVENT_KEY,
      CLICK: 'click' + EVENT_KEY,
      FOCUSIN: 'focusin' + EVENT_KEY,
      FOCUSOUT: 'focusout' + EVENT_KEY,
      MOUSEENTER: 'mouseenter' + EVENT_KEY,
      MOUSELEAVE: 'mouseleave' + EVENT_KEY
    };

    var ClassName = {
      FADE: 'fade',
      IN: 'in'
    };

    var Selector = {
      TOOLTIP: '.tooltip',
      TOOLTIP_INNER: '.tooltip-inner'
    };

    var TetherClass = {
      element: false,
      enabled: false
    };

    var Trigger = {
      HOVER: 'hover',
      FOCUS: 'focus',
      CLICK: 'click',
      MANUAL: 'manual'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Tooltip = (function () {
      function Tooltip(element, config) {
        _classCallCheck(this, Tooltip);

        // private
        this._isEnabled = true;
        this._timeout = 0;
        this._hoverState = '';
        this._activeTrigger = {};
        this._tether = null;

        // protected
        this.element = element;
        this.config = this._getConfig(config);
        this.tip = null;

        this._setListeners();
      }

      /**
       * ------------------------------------------------------------------------
       * jQuery
       * ------------------------------------------------------------------------
       */

      // getters

      _createClass(Tooltip, [{
        key: 'enable',

        // public

        value: function enable() {
          this._isEnabled = true;
        }
      }, {
        key: 'disable',
        value: function disable() {
          this._isEnabled = false;
        }
      }, {
        key: 'toggleEnabled',
        value: function toggleEnabled() {
          this._isEnabled = !this._isEnabled;
        }
      }, {
        key: 'toggle',
        value: function toggle(event) {
          if (event) {
            var dataKey = this.constructor.DATA_KEY;
            var context = $(event.currentTarget).data(dataKey);

            if (!context) {
              context = new this.constructor(event.currentTarget, this._getDelegateConfig());
              $(event.currentTarget).data(dataKey, context);
            }

            context._activeTrigger.click = !context._activeTrigger.click;

            if (context._isWithActiveTrigger()) {
              context._enter(null, context);
            } else {
              context._leave(null, context);
            }
          } else {

            if ($(this.getTipElement()).hasClass(ClassName.IN)) {
              this._leave(null, this);
              return;
            }

            this._enter(null, this);
          }
        }
      }, {
        key: 'dispose',
        value: function dispose() {
          clearTimeout(this._timeout);

          this.cleanupTether();

          $.removeData(this.element, this.constructor.DATA_KEY);

          $(this.element).off(this.constructor.EVENT_KEY);

          if (this.tip) {
            $(this.tip).remove();
          }

          this._isEnabled = null;
          this._timeout = null;
          this._hoverState = null;
          this._activeTrigger = null;
          this._tether = null;

          this.element = null;
          this.config = null;
          this.tip = null;
        }
      }, {
        key: 'show',
        value: function show() {
          var _this = this;

          var showEvent = $.Event(this.constructor.Event.SHOW);

          if (this.isWithContent() && this._isEnabled) {
            $(this.element).trigger(showEvent);

            var isInTheDom = $.contains(this.element.ownerDocument.documentElement, this.element);

            if (showEvent.isDefaultPrevented() || !isInTheDom) {
              return;
            }

            var tip = this.getTipElement();
            var tipId = _Util['default'].getUID(this.constructor.NAME);

            tip.setAttribute('id', tipId);
            this.element.setAttribute('aria-describedby', tipId);

            this.setContent();

            if (this.config.animation) {
              $(tip).addClass(ClassName.FADE);
            }

            var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

            var attachment = this._getAttachment(placement);

            $(tip).data(this.constructor.DATA_KEY, this).appendTo(document.body);

            $(this.element).trigger(this.constructor.Event.INSERTED);

            this._tether = new Tether({
              attachment: attachment,
              element: tip,
              target: this.element,
              classes: TetherClass,
              classPrefix: CLASS_PREFIX,
              offset: this.config.offset,
              constraints: this.config.constraints,
              addTargetClasses: false
            });

            _Util['default'].reflow(tip);
            this._tether.position();

            $(tip).addClass(ClassName.IN);

            var complete = function complete() {
              var prevHoverState = _this._hoverState;
              _this._hoverState = null;

              $(_this.element).trigger(_this.constructor.Event.SHOWN);

              if (prevHoverState === HoverState.OUT) {
                _this._leave(null, _this);
              }
            };

            if (_Util['default'].supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
              $(this.tip).one(_Util['default'].TRANSITION_END, complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);
              return;
            }

            complete();
          }
        }
      }, {
        key: 'hide',
        value: function hide(callback) {
          var _this2 = this;

          var tip = this.getTipElement();
          var hideEvent = $.Event(this.constructor.Event.HIDE);
          var complete = function complete() {
            if (_this2._hoverState !== HoverState.IN && tip.parentNode) {
              tip.parentNode.removeChild(tip);
            }

            _this2.element.removeAttribute('aria-describedby');
            $(_this2.element).trigger(_this2.constructor.Event.HIDDEN);
            _this2.cleanupTether();

            if (callback) {
              callback();
            }
          };

          $(this.element).trigger(hideEvent);

          if (hideEvent.isDefaultPrevented()) {
            return;
          }

          $(tip).removeClass(ClassName.IN);

          if (_Util['default'].supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {

            $(tip).one(_Util['default'].TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
          } else {
            complete();
          }

          this._hoverState = '';
        }

        // protected

      }, {
        key: 'isWithContent',
        value: function isWithContent() {
          return Boolean(this.getTitle());
        }
      }, {
        key: 'getTipElement',
        value: function getTipElement() {
          return this.tip = this.tip || $(this.config.template)[0];
        }
      }, {
        key: 'setContent',
        value: function setContent() {
          var $tip = $(this.getTipElement());

          this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());

          $tip.removeClass(ClassName.FADE).removeClass(ClassName.IN);

          this.cleanupTether();
        }
      }, {
        key: 'setElementContent',
        value: function setElementContent($element, content) {
          var html = this.config.html;
          if (typeof content === 'object' && (content.nodeType || content.jquery)) {
            // content is a DOM node or a jQuery
            if (html) {
              if (!$(content).parent().is($element)) {
                $element.empty().append(content);
              }
            } else {
              $element.text($(content).text());
            }
          } else {
            $element[html ? 'html' : 'text'](content);
          }
        }
      }, {
        key: 'getTitle',
        value: function getTitle() {
          var title = this.element.getAttribute('data-original-title');

          if (!title) {
            title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
          }

          return title;
        }
      }, {
        key: 'cleanupTether',
        value: function cleanupTether() {
          if (this._tether) {
            this._tether.destroy();
          }
        }

        // private

      }, {
        key: '_getAttachment',
        value: function _getAttachment(placement) {
          return AttachmentMap[placement.toUpperCase()];
        }
      }, {
        key: '_setListeners',
        value: function _setListeners() {
          var _this3 = this;

          var triggers = this.config.trigger.split(' ');

          triggers.forEach(function (trigger) {
            if (trigger === 'click') {
              $(_this3.element).on(_this3.constructor.Event.CLICK, _this3.config.selector, $.proxy(_this3.toggle, _this3));
            } else if (trigger !== Trigger.MANUAL) {
              var eventIn = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSEENTER : _this3.constructor.Event.FOCUSIN;
              var eventOut = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSELEAVE : _this3.constructor.Event.FOCUSOUT;

              $(_this3.element).on(eventIn, _this3.config.selector, $.proxy(_this3._enter, _this3)).on(eventOut, _this3.config.selector, $.proxy(_this3._leave, _this3));
            }
          });

          if (this.config.selector) {
            this.config = $.extend({}, this.config, {
              trigger: 'manual',
              selector: ''
            });
          } else {
            this._fixTitle();
          }
        }
      }, {
        key: '_fixTitle',
        value: function _fixTitle() {
          var titleType = typeof this.element.getAttribute('data-original-title');
          if (this.element.getAttribute('title') || titleType !== 'string') {
            this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
            this.element.setAttribute('title', '');
          }
        }
      }, {
        key: '_enter',
        value: function _enter(event, context) {
          var dataKey = this.constructor.DATA_KEY;

          context = context || $(event.currentTarget).data(dataKey);

          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $(event.currentTarget).data(dataKey, context);
          }

          if (event) {
            context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
          }

          if ($(context.getTipElement()).hasClass(ClassName.IN) || context._hoverState === HoverState.IN) {
            context._hoverState = HoverState.IN;
            return;
          }

          clearTimeout(context._timeout);

          context._hoverState = HoverState.IN;

          if (!context.config.delay || !context.config.delay.show) {
            context.show();
            return;
          }

          context._timeout = setTimeout(function () {
            if (context._hoverState === HoverState.IN) {
              context.show();
            }
          }, context.config.delay.show);
        }
      }, {
        key: '_leave',
        value: function _leave(event, context) {
          var dataKey = this.constructor.DATA_KEY;

          context = context || $(event.currentTarget).data(dataKey);

          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $(event.currentTarget).data(dataKey, context);
          }

          if (event) {
            context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
          }

          if (context._isWithActiveTrigger()) {
            return;
          }

          clearTimeout(context._timeout);

          context._hoverState = HoverState.OUT;

          if (!context.config.delay || !context.config.delay.hide) {
            context.hide();
            return;
          }

          context._timeout = setTimeout(function () {
            if (context._hoverState === HoverState.OUT) {
              context.hide();
            }
          }, context.config.delay.hide);
        }
      }, {
        key: '_isWithActiveTrigger',
        value: function _isWithActiveTrigger() {
          for (var trigger in this._activeTrigger) {
            if (this._activeTrigger[trigger]) {
              return true;
            }
          }

          return false;
        }
      }, {
        key: '_getConfig',
        value: function _getConfig(config) {
          config = $.extend({}, this.constructor.Default, $(this.element).data(), config);

          if (config.delay && typeof config.delay === 'number') {
            config.delay = {
              show: config.delay,
              hide: config.delay
            };
          }

          _Util['default'].typeCheckConfig(NAME, config, this.constructor.DefaultType);

          return config;
        }
      }, {
        key: '_getDelegateConfig',
        value: function _getDelegateConfig() {
          var config = {};

          if (this.config) {
            for (var key in this.config) {
              if (this.constructor.Default[key] !== this.config[key]) {
                config[key] = this.config[key];
              }
            }
          }

          return config;
        }

        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var data = $(this).data(DATA_KEY);
            var _config = typeof config === 'object' ? config : null;

            if (!data && /destroy|hide/.test(config)) {
              return;
            }

            if (!data) {
              data = new Tooltip(this, _config);
              $(this).data(DATA_KEY, data);
            }

            if (typeof config === 'string') {
              if (data[config] === undefined) {
                throw new Error('No method named "' + config + '"');
              }
              data[config]();
            }
          });
        }
      }, {
        key: 'VERSION',
        get: function get() {
          return VERSION;
        }
      }, {
        key: 'Default',
        get: function get() {
          return Default;
        }
      }, {
        key: 'NAME',
        get: function get() {
          return NAME;
        }
      }, {
        key: 'DATA_KEY',
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: 'Event',
        get: function get() {
          return Event;
        }
      }, {
        key: 'EVENT_KEY',
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: 'DefaultType',
        get: function get() {
          return DefaultType;
        }
      }]);

      return Tooltip;
    })();

    $.fn[NAME] = Tooltip._jQueryInterface;
    $.fn[NAME].Constructor = Tooltip;
    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tooltip._jQueryInterface;
    };

    return Tooltip;
  })(jQuery);

  module.exports = Tooltip;
});

},{"./util":18}],18:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.util = mod.exports;
  }
})(this, function (exports, module) {
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.0.0-alpha.2): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  'use strict';

  var Util = (function ($) {

    /**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */

    var transition = false;

    var TransitionEndEvent = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
      transition: 'transitionend'
    };

    // shoutout AngusCroll (https://goo.gl/pxwQGp)
    function toType(obj) {
      return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }

    function isElement(obj) {
      return (obj[0] || obj).nodeType;
    }

    function getSpecialTransitionEndEvent() {
      return {
        bindType: transition.end,
        delegateType: transition.end,
        handle: function handle(event) {
          if ($(event.target).is(this)) {
            return event.handleObj.handler.apply(this, arguments);
          }
        }
      };
    }

    function transitionEndTest() {
      if (window.QUnit) {
        return false;
      }

      var el = document.createElement('bootstrap');

      for (var _name in TransitionEndEvent) {
        if (el.style[_name] !== undefined) {
          return { end: TransitionEndEvent[_name] };
        }
      }

      return false;
    }

    function transitionEndEmulator(duration) {
      var _this = this;

      var called = false;

      $(this).one(Util.TRANSITION_END, function () {
        called = true;
      });

      setTimeout(function () {
        if (!called) {
          Util.triggerTransitionEnd(_this);
        }
      }, duration);

      return this;
    }

    function setTransitionEndSupport() {
      transition = transitionEndTest();

      $.fn.emulateTransitionEnd = transitionEndEmulator;

      if (Util.supportsTransitionEnd()) {
        $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
      }
    }

    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */

    var Util = {

      TRANSITION_END: 'bsTransitionEnd',

      getUID: function getUID(prefix) {
        do {
          prefix += ~ ~(Math.random() * 1000000); // "~~" acts like a faster Math.floor() here
        } while (document.getElementById(prefix));
        return prefix;
      },

      getSelectorFromElement: function getSelectorFromElement(element) {
        var selector = element.getAttribute('data-target');

        if (!selector) {
          selector = element.getAttribute('href') || '';
          selector = /^#[a-z]/i.test(selector) ? selector : null;
        }

        return selector;
      },

      reflow: function reflow(element) {
        new Function('bs', 'return bs')(element.offsetHeight);
      },

      triggerTransitionEnd: function triggerTransitionEnd(element) {
        $(element).trigger(transition.end);
      },

      supportsTransitionEnd: function supportsTransitionEnd() {
        return Boolean(transition);
      },

      typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
        for (var property in configTypes) {
          if (configTypes.hasOwnProperty(property)) {
            var expectedTypes = configTypes[property];
            var value = config[property];
            var valueType = undefined;

            if (value && isElement(value)) {
              valueType = 'element';
            } else {
              valueType = toType(value);
            }

            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
            }
          }
        }
      }
    };

    setTransitionEndSupport();

    return Util;
  })(jQuery);

  module.exports = Util;
});

},{}]},{},[6])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9jb21wYW55Tm90aWNlLnRzIiwiYXBwL3NjcmlwdHMvY29udHJvbGxlcnMvQXBwQ29udHJvbGxlci50cyIsImFwcC9zY3JpcHRzL2NvbnRyb2xsZXJzL0NvbnRyb2xsZXJzLnRzIiwiYXBwL3NjcmlwdHMvbGliL0NvbnRyb2xsZXIudHMiLCJhcHAvc2NyaXB0cy9saWIvUnVudGltZS50cyIsImFwcC9zY3JpcHRzL21haW4udHMiLCJub2RlX21vZHVsZXMvYm9vdHN0cmFwL2Rpc3QvanMvbnBtLmpzIiwibm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9kaXN0L2pzL3VtZC9hbGVydC5qcyIsIm5vZGVfbW9kdWxlcy9ib290c3RyYXAvZGlzdC9qcy91bWQvYnV0dG9uLmpzIiwibm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9kaXN0L2pzL3VtZC9jYXJvdXNlbC5qcyIsIm5vZGVfbW9kdWxlcy9ib290c3RyYXAvZGlzdC9qcy91bWQvY29sbGFwc2UuanMiLCJub2RlX21vZHVsZXMvYm9vdHN0cmFwL2Rpc3QvanMvdW1kL2Ryb3Bkb3duLmpzIiwibm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9kaXN0L2pzL3VtZC9tb2RhbC5qcyIsIm5vZGVfbW9kdWxlcy9ib290c3RyYXAvZGlzdC9qcy91bWQvcG9wb3Zlci5qcyIsIm5vZGVfbW9kdWxlcy9ib290c3RyYXAvZGlzdC9qcy91bWQvc2Nyb2xsc3B5LmpzIiwibm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9kaXN0L2pzL3VtZC90YWIuanMiLCJub2RlX21vZHVsZXMvYm9vdHN0cmFwL2Rpc3QvanMvdW1kL3Rvb2x0aXAuanMiLCJub2RlX21vZHVsZXMvYm9vdHN0cmFwL2Rpc3QvanMvdW1kL3V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFJLE1BQU0sR0FBUSxNQUFNLENBQUM7QUFDekIsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLENBQUMsT0FBTyxLQUFLLFdBQVcsSUFBSSxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDeEYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkRBQTJELENBQUMsQ0FBQztBQUNqRixDQUFDO0FBQUMsSUFBSSxDQUFDLENBQUM7SUFDUCxNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNwQixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxjQUFZLENBQUMsQ0FBQztBQUMzRCxDQUFDOzs7Ozs7Ozs7QUNORCwyQkFBMkIsbUJBQW1CLENBQUMsQ0FBQTtBQUUvQztJQUFtQyxpQ0FBVTtJQUl6Qyx1QkFBWSxPQUFvQjtRQUM1QixrQkFBTSxPQUFPLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBSk0sc0JBQVEsR0FBVyxVQUFVLENBQUM7SUFLekMsb0JBQUM7QUFBRCxDQVBBLEFBT0MsQ0FQa0MsdUJBQVUsR0FPNUM7QUFQWSxxQkFBYSxnQkFPekIsQ0FBQTs7OztBQ1RELDhCQUE0QixpQkFBaUIsQ0FBQztBQUF0QyxzREFBc0M7Ozs7QUNBOUM7Ozs7OztHQU1HO0FBQ0g7SUEyQ0M7Ozs7T0FJTTtJQUNILG9CQUFZLE9BQWdCO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFwQkQsc0JBQUkseUJBQUM7UUFITDs7V0FFRzthQUNIO1lBQ0ksTUFBTSxDQUFDLFVBQVUsUUFBaUI7Z0JBQzlCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxZQUFZLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO2dCQUN2RCxDQUFDO2dCQUNELE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQy9FLENBQUMsQ0FBQTtRQUNMLENBQUM7YUFDRCxVQUFNLEtBQUs7WUFDUCxNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDaEQsQ0FBQzs7O09BSEE7SUFlRCwwQ0FBcUIsR0FBckIsVUFBc0IsZUFBeUI7UUFDM0MsSUFBTSxTQUFTLEdBQXNCLFVBQVUsQ0FBQyxVQUFVLENBQUM7UUFDM0QsSUFBTSxNQUFNLEdBQXNCLEVBQUUsQ0FBQztRQUNyQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ25ELElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixFQUFFLENBQUMsQ0FBQyxRQUFRLFlBQVksZUFBZSxDQUFDLENBQUMsQ0FBQztnQkFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMxQixDQUFDO1FBQ0wsQ0FBQztRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksOEJBQW1CLEdBQTFCLFVBQTJCLFFBQTZCLElBQVUsQ0FBQztJQUVuRTs7Ozs7O09BTUc7SUFDSSw2QkFBa0IsR0FBekIsVUFBMEIsUUFBNkIsRUFBRSxTQUE0QixJQUFVLENBQUM7SUFFaEc7Ozs7Ozs7T0FPRztJQUNJLGdCQUFLLEdBQVosVUFBYSxRQUFpQixFQUFFLElBQTZCO1FBQTdCLG9CQUE2QixHQUE3QixPQUFnQixRQUFRLENBQUMsSUFBSTtRQUN6RCxFQUFFLENBQUEsQ0FBQyxPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMzRCxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM3QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDekQsQ0FBQztRQUNELElBQU0sUUFBUSxHQUF3QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRW5DLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3ZDLElBQUksT0FBTyxHQUFZLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLFNBQVMsR0FBRyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEUsU0FBUyxHQUFHLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLGtCQUFrQixHQUFDLEdBQUcsR0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BFLFFBQVEsQ0FBQztZQUNiLENBQUM7WUFDRCxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsR0FBQyxHQUFHLEdBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDeEgsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBRUQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQTFHRDs7Ozs7T0FLRztJQUNJLHFCQUFVLEdBQXNCLEVBQUUsQ0FBQztJQUUxQzs7OztPQUlHO0lBQ0ksNkJBQWtCLEdBQUcsZUFBZSxDQUFDO0lBOEZoRCxpQkFBQztBQUFELENBL0dBLEFBK0dDLElBQUE7QUEvR1ksa0JBQVUsYUErR3RCLENBQUE7Ozs7QUN0SEQsSUFBWSxXQUFXLFdBQU0sNEJBQTRCLENBQUMsQ0FBQTtBQUUxRDs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxlQUFzQixPQUFxQjtJQUN2QyxJQUFJLGlCQUFpQixHQUFRLFdBQVcsQ0FBQztJQUN6QyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDWCxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztJQUM1QixDQUFDO0lBQ0QsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsSUFBSSxlQUFlLEdBQVEsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEQsRUFBRSxDQUFDLENBQUMsT0FBTyxlQUFlLENBQUMsS0FBSyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZDLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztBQUNMLENBQUM7QUFiZSxhQUFLLFFBYXBCLENBQUE7Ozs7QUM1QkQsUUFBTyxpQkFBaUIsQ0FBQyxDQUFBO0FBQ3pCLFFBQU8sV0FBVyxDQUFDLENBQUE7QUFFbkIsMkRBQTJEO0FBQzNELDREQUE0RDtBQUM1RCx5Q0FBeUM7QUFDekMsd0JBQW9CLGVBQWUsQ0FBQyxDQUFBO0FBQ3BDLGVBQUssRUFBRSxDQUFDOzs7QUNQUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzaUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25WQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzluQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJsZXQgZ2xvYmFsOiBhbnkgPSB3aW5kb3c7XG5pZiAodHlwZW9mIGdsb2JhbC5jb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZ2xvYmFsLmNvbnNvbGUubG9nICE9PSAndW5kZWZpbmVkJykge1xuXHRnbG9iYWwuY29uc29sZS5sb2coJ0NyYWZ0ZWQgYW5kIGNyZWF0ZWQgYnkgU3RvcnlibG9rLiBWaXNpdCB3d3cuc3RvcnlibG9rLmNvbScpO1xufSBlbHNlIHtcblx0Z2xvYmFsLmNvbnNvbGUgPSB7fTtcblx0Z2xvYmFsLmNvbnNvbGUubG9nID0gZ2xvYmFsLmNvbnNvbGUuZXJyb3IgPSBmdW5jdGlvbigpIHt9O1xufVxuIiwiaW1wb3J0IHsgQ29udHJvbGxlciB9IGZyb20gJy4uL2xpYi9Db250cm9sbGVyJztcblxuZXhwb3J0IGNsYXNzIEFwcENvbnRyb2xsZXIgZXh0ZW5kcyBDb250cm9sbGVyIHtcblxuICAgIHN0YXRpYyBzZWxlY3Rvcjogc3RyaW5nID0gJyNjb250ZW50JztcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnQpO1xuICAgIH1cbn0iLCJleHBvcnQge0FwcENvbnRyb2xsZXJ9IGZyb20gJy4vQXBwQ29udHJvbGxlcic7IiwiLyoqXG4gKiBHZW5lcmljIGNvbnRyb2xsZXIgY2xhc3MgdG8gZW50Y2Fwc3VsYXRlIHRoZSBwYXJzaW5nXG4gKiBhbmQgb3RoZXIgZ2VuZXJpYyBzdHVmZlxuICogXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgQ29udHJvbGxlclxuICovXG5leHBvcnQgY2xhc3MgQ29udHJvbGxlciB7XG4gICAgXG4gICAgc3RhdGljIHNlbGVjdG9yOiBzdHJpbmc7XG4gICAgXG4gICAgLyoqXG4gICAgICogSW5zdGFuY2VzIG9mIHRoZSBDb250cm9sbGVyXG4gICAgICogXG4gICAgICogQHN0YXRpY1xuICAgICAqIEB0eXBlIHtBcnJheTxDb250cm9sbGVyPn1cbiAgICAgKi9cbiAgICBzdGF0aWMgX2luc3RhbmNlczogQXJyYXk8Q29udHJvbGxlcj4gPSBbXTtcblxuICAgIC8qKlxuICAgICAqIEhUTUwgYXR0cmlidXRlIHRvIG1hcmsgZWxlbWVudHMgd2hpY2ggYXJlIGFscmVhZHkgcGFyc2VkXG4gICAgICogXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBQQVJTRV9JRF9BVFRSSUJVVEUgPSAnZGF0YS1wYXJzZS1pZCc7XG5cbiAgICAvKipcbiAgICAgKiBFbGVtZW50IHdoZXJlIHRoZSBpbnN0YW5jZSBpcyBhcHBsaWVkXG4gICAgICogXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7RWxlbWVudH1cbiAgICAgKi9cbiAgICBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50OyAgICBcblxuICAgIC8qKlxuICAgICAqIEFjY2VzcyBlbGVtZW50IG9yIHF1ZXJ5IGJ5IHNlbGVjdG9yXG4gICAgICovXG4gICAgZ2V0ICQoKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc2VsZWN0b3I/OiBzdHJpbmcpOiBhbnkge1xuICAgICAgICAgICAgaWYgKCEodGhpcy5fZWxlbWVudCBpbnN0YW5jZW9mIEVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIGNvbnRyb2xsZXIgaGFzIG5vIGVsZW1lbnQhJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0b3IgPyB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpIDogdGhpcy5fZWxlbWVudDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXQgJCh2YWx1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NldHRpbmcgJCBpcyBub3QgYWxsb3dlZCcpO1xuICAgIH0gICAgXG5cblxuXHQvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIGEgQ29udHJvbGxlci5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHJvb3QgVGhlIGVsZW1lbnQgd2hlcmUgdGhlIGNvbnRyb2xsZXIgaGFzIGJlZW4gYXBwbGllZFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgZ2V0Q29udHJvbGxlcnNCeUNsYXNzKGNvbnRyb2xsZXJDbGFzczogRnVuY3Rpb24pOiBBcnJheTxDb250cm9sbGVyPiB7XG4gICAgICAgIGNvbnN0IGluc3RhbmNlczogQXJyYXk8Q29udHJvbGxlcj4gPSBDb250cm9sbGVyLl9pbnN0YW5jZXM7XG4gICAgICAgIGNvbnN0IHJlc3VsdDogQXJyYXk8Q29udHJvbGxlcj4gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IGluc3RhbmNlcy5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGluc3RhbmNlID0gaW5zdGFuY2VzW2ldO1xuICAgICAgICAgICAgaWYgKGluc3RhbmNlIGluc3RhbmNlb2YgY29udHJvbGxlckNsYXNzKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaW5zdGFuY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSG9vayBmb3IgcnVubmluZyBjb2RlIGJlZm9yZSB0aGUgY29udHJvbGxlciBpcyBpbnN0YW50aWF0ZWRcbiAgICAgKiBcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtOb2RlTGlzdE9mPEVsZW1lbnQ+fSBlbGVtZW50cyBMaXN0IG9mIGVsZW1lbnRzIHdoZXJlIHRoZSBjb250cm9sbGVyIHdpbGwgYmUgYXBwbGllZFxuICAgICAqL1xuICAgIHN0YXRpYyBiZWZvcmVJbnN0YW50aWF0aW5nKGVsZW1lbnRzOiBOb2RlTGlzdE9mPEVsZW1lbnQ+KTogdm9pZCB7IH1cblxuICAgIC8qKlxuICAgICAqIEhvb2sgZm9yIHJ1bm5pbmcgY29kZSBhZnRlciB0aGUgY29udHJvbGxlciBoYXMgYmVlbiBpbnN0YW50aWF0ZWQuXG4gICAgICogXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7Tm9kZUxpc3RPZjxFbGVtZW50Pn0gZWxlbWVudHMgTGlzdCBvZiBlbGVtZW50cyB3aGVyZSB0aGUgY29udHJvbGxlciBoYXMgYmVlbiBhcHBsaWVkXG4gICAgICogQHBhcmFtIHtBcnJheTxDb250cm9sbGVyPn0gaW5zdGFuY2VzIExpc3Qgb2YgY29udHJvbGxlciBpbnN0YW5jZXMgY3JlYXRlZFxuICAgICAqL1xuICAgIHN0YXRpYyBhZnRlckluc3RhbnRpYXRpbmcoZWxlbWVudHM6IE5vZGVMaXN0T2Y8RWxlbWVudD4sIGluc3RhbmNlczogQXJyYXk8Q29udHJvbGxlcj4pOiB2b2lkIHsgfVxuXG4gICAgLyoqXG4gICAgICogTG9vayBmb3IgZWxlbWVudHMgd2l0aCBhIHNwZWNpZmljIHNlbGVjdG9yIGFuZCBjcmVhdGVzIGFuIGluc3RhbmNlIGZvclxuICAgICAqIGV2ZXJ5IGVsZW1lbnQuXG4gICAgICogXG4gICAgICogQHN0YXRpY1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgRG9tIHNlbGVjdG9yXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBbcm9vdD1kb2N1bWVudC5ib2R5XSBTdGFydGluZyBlbGVtZW50IGZvciBwYXJzaW5nXG4gICAgICovXG4gICAgc3RhdGljIHBhcnNlKHNlbGVjdG9yPzogc3RyaW5nLCByb290OiBFbGVtZW50ID0gZG9jdW1lbnQuYm9keSk6IHZvaWQge1xuICAgICAgICBpZih0eXBlb2YgdGhpcy5zZWxlY3RvciA9PT0gJ3N0cmluZycgJiYgdGhpcy5zZWxlY3Rvci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNlbGVjdG9yID0gdGhpcy5zZWxlY3RvcjtcbiAgICAgICAgfSBlbHNlIGlmKCFzZWxlY3Rvcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBTZWxlY3RvciBmb3IgQ29udHJvbGxlciBmb3VuZCEnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBlbGVtZW50czogTm9kZUxpc3RPZjxFbGVtZW50PiA9IHJvb3QucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgIHRoaXMuYmVmb3JlSW5zdGFudGlhdGluZyhlbGVtZW50cyk7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudDogRWxlbWVudCA9IGVsZW1lbnRzW2ldO1xuICAgICAgICAgICAgbGV0IGNsYXNzTmFtZSA9IC9eZnVuY3Rpb25cXHMrKFtcXHdcXCRdKylcXHMqXFwoLy5leGVjKHRoaXMudG9TdHJpbmcoKSlbMV07XG4gICAgICAgICAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZShDb250cm9sbGVyLlBBUlNFX0lEX0FUVFJJQlVURSsnLScrY2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoQ29udHJvbGxlci5QQVJTRV9JRF9BVFRSSUJVVEUrJy0nK2NsYXNzTmFtZSwgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAgKyAxKSAqIERhdGUubm93KCkgKyAnJyk7XG4gICAgICAgICAgICBDb250cm9sbGVyLl9pbnN0YW5jZXMucHVzaChuZXcgdGhpcyhlbGVtZW50KSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFmdGVySW5zdGFudGlhdGluZyhlbGVtZW50cywgQ29udHJvbGxlci5faW5zdGFuY2VzKTsgICAgICAgIFxuICAgIH1cbn0iLCJpbXBvcnQgKiBhcyBjb250cm9sbGVycyBmcm9tICcuLi9jb250cm9sbGVycy9Db250cm9sbGVycyc7XG5cbi8qKlxuICogSW1wb3J0J3MgYWxsIENvbnRyb2xsZXJzIHdoaWNoIGFyZSBleHBvcnRlZCBpbiB0aGUgQ29udHJvbGxlcnMudHNcbiAqIHNvIHdlIGNhbiBpbml0aWFsaXplIGFsbCBUeXBlcyBvZiBDb250cm9sbGVyIGVhc2llci5cbiAqIFxuICogVGhpcyBmdW5jdGlvbiBhbHNvIGFsbG93cyB1cyB0byBleGVjdXRlIHRoZSBpbml0aWFsaXphdGlvbiBvZlxuICogQ29udHJvbGxlcnMgb25seSBmb3IgYSBwYXJ0IHR5cGUgb2YgdGhlIERPTSAtIGxldCdzIHNheSBhIFxuICogbmV3bHkgZ2VuZXJhdGVkIGFuZCBhZGRlZCBET00gQ29tcG9uZW50LiBTbyB3ZSB3b24ndCBoYXZlIHRvIFxuICogcmVpbml0aWFsaXplIGFsbCBDb21wb25lbnRzIC0gb25seSB0aGUgQ29tcG9uZW50cyB3aGljaCBhcmVcbiAqIGluc2lkZSB0aGF0IG5ld2x5IGNyZWF0ZWQgSFRNTEVsZW1lbnQuXG4gKiBcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtlbGVtZW50XSBET00gRWxlbWVudCBpbiB3aGljaCB0aGUgQ29udHJvbGxlciBzaG91bGQgYmUgaW5pdGlhbGl6ZWQgLSBpZiBub3Qgc2V0IHdlJ3JlIHVzaW5nIHRoZSBkb2N1bWVudC5ib2R5O1xuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2UoZWxlbWVudD86IEhUTUxFbGVtZW50KSB7XG4gICAgbGV0IGNvbnRyb2xsZXJDbGFzc2VzOiBhbnkgPSBjb250cm9sbGVycztcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LmJvZHk7XG4gICAgfVxuICAgIGZvciAobGV0IGtleSBpbiBjb250cm9sbGVyQ2xhc3Nlcykge1xuICAgICAgICBpZiAoY29udHJvbGxlckNsYXNzZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgbGV0IGNvbnRyb2xsZXJDbGFzczogYW55ID0gY29udHJvbGxlckNsYXNzZXNba2V5XTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29udHJvbGxlckNsYXNzLnBhcnNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlckNsYXNzLnBhcnNlKCcnLCBlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgJy4vY29tcGFueU5vdGljZSc7XG5pbXBvcnQgJ2Jvb3RzdHJhcCc7XG5cbi8vIHRoaXMgd2lsbCBpdGVyYXRlIG92ZXIgYWxsIGV4cG9ydGVkIENvbnRyb2xsZXJzIGZyb20gdGhlXG4vLyAuL2NvbnRyb2xsZXJzL0NvbnRyb2xsZXJzLnRzIGZpbGUuIHNpbXBseSBoYXZlIGEgbG9vayBhdCBcbi8vIGl0IGlmIHlvdSB3YW50IHRvIGFkZCBhIG5ldyBjb250cm9sbGVyXG5pbXBvcnQge3BhcnNlfSBmcm9tICcuL2xpYi9SdW50aW1lJztcbnBhcnNlKCk7IiwiLy8gVGhpcyBmaWxlIGlzIGF1dG9nZW5lcmF0ZWQgdmlhIHRoZSBgY29tbW9uanNgIEdydW50IHRhc2suIFlvdSBjYW4gcmVxdWlyZSgpIHRoaXMgZmlsZSBpbiBhIENvbW1vbkpTIGVudmlyb25tZW50LlxucmVxdWlyZSgnLi91bWQvdXRpbC5qcycpXG5yZXF1aXJlKCcuL3VtZC9hbGVydC5qcycpXG5yZXF1aXJlKCcuL3VtZC9idXR0b24uanMnKVxucmVxdWlyZSgnLi91bWQvY2Fyb3VzZWwuanMnKVxucmVxdWlyZSgnLi91bWQvY29sbGFwc2UuanMnKVxucmVxdWlyZSgnLi91bWQvZHJvcGRvd24uanMnKVxucmVxdWlyZSgnLi91bWQvbW9kYWwuanMnKVxucmVxdWlyZSgnLi91bWQvc2Nyb2xsc3B5LmpzJylcbnJlcXVpcmUoJy4vdW1kL3RhYi5qcycpXG5yZXF1aXJlKCcuL3VtZC90b29sdGlwLmpzJylcbnJlcXVpcmUoJy4vdW1kL3BvcG92ZXIuanMnKSIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoWydleHBvcnRzJywgJ21vZHVsZScsICcuL3V0aWwnXSwgZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZmFjdG9yeShleHBvcnRzLCBtb2R1bGUsIHJlcXVpcmUoJy4vdXRpbCcpKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbW9kID0ge1xuICAgICAgZXhwb3J0czoge31cbiAgICB9O1xuICAgIGZhY3RvcnkobW9kLmV4cG9ydHMsIG1vZCwgZ2xvYmFsLlV0aWwpO1xuICAgIGdsb2JhbC5hbGVydCA9IG1vZC5leHBvcnRzO1xuICB9XG59KSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cywgbW9kdWxlLCBfdXRpbCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuICBmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbiAgZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbiAgdmFyIF9VdGlsID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbCk7XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIEJvb3RzdHJhcCAodjQuMC4wLWFscGhhLjIpOiBhbGVydC5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICB2YXIgQWxlcnQgPSAoZnVuY3Rpb24gKCQpIHtcblxuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIENvbnN0YW50c1xuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG4gICAgdmFyIE5BTUUgPSAnYWxlcnQnO1xuICAgIHZhciBWRVJTSU9OID0gJzQuMC4wLWFscGhhJztcbiAgICB2YXIgREFUQV9LRVkgPSAnYnMuYWxlcnQnO1xuICAgIHZhciBFVkVOVF9LRVkgPSAnLicgKyBEQVRBX0tFWTtcbiAgICB2YXIgREFUQV9BUElfS0VZID0gJy5kYXRhLWFwaSc7XG4gICAgdmFyIEpRVUVSWV9OT19DT05GTElDVCA9ICQuZm5bTkFNRV07XG4gICAgdmFyIFRSQU5TSVRJT05fRFVSQVRJT04gPSAxNTA7XG5cbiAgICB2YXIgU2VsZWN0b3IgPSB7XG4gICAgICBESVNNSVNTOiAnW2RhdGEtZGlzbWlzcz1cImFsZXJ0XCJdJ1xuICAgIH07XG5cbiAgICB2YXIgRXZlbnQgPSB7XG4gICAgICBDTE9TRTogJ2Nsb3NlJyArIEVWRU5UX0tFWSxcbiAgICAgIENMT1NFRDogJ2Nsb3NlZCcgKyBFVkVOVF9LRVksXG4gICAgICBDTElDS19EQVRBX0FQSTogJ2NsaWNrJyArIEVWRU5UX0tFWSArIERBVEFfQVBJX0tFWVxuICAgIH07XG5cbiAgICB2YXIgQ2xhc3NOYW1lID0ge1xuICAgICAgQUxFUlQ6ICdhbGVydCcsXG4gICAgICBGQURFOiAnZmFkZScsXG4gICAgICBJTjogJ2luJ1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBDbGFzcyBEZWZpbml0aW9uXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cbiAgICB2YXIgQWxlcnQgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgZnVuY3Rpb24gQWxlcnQoZWxlbWVudCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQWxlcnQpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAgICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICovXG5cbiAgICAgIC8vIGdldHRlcnNcblxuICAgICAgX2NyZWF0ZUNsYXNzKEFsZXJ0LCBbe1xuICAgICAgICBrZXk6ICdjbG9zZScsXG5cbiAgICAgICAgLy8gcHVibGljXG5cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNsb3NlKGVsZW1lbnQpIHtcbiAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudCB8fCB0aGlzLl9lbGVtZW50O1xuXG4gICAgICAgICAgdmFyIHJvb3RFbGVtZW50ID0gdGhpcy5fZ2V0Um9vdEVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgICAgdmFyIGN1c3RvbUV2ZW50ID0gdGhpcy5fdHJpZ2dlckNsb3NlRXZlbnQocm9vdEVsZW1lbnQpO1xuXG4gICAgICAgICAgaWYgKGN1c3RvbUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fcmVtb3ZlRWxlbWVudChyb290RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnZGlzcG9zZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkaXNwb3NlKCkge1xuICAgICAgICAgICQucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSk7XG4gICAgICAgICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwcml2YXRlXG5cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnX2dldFJvb3RFbGVtZW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRSb290RWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgICAgdmFyIHNlbGVjdG9yID0gX1V0aWxbJ2RlZmF1bHQnXS5nZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICAgIHZhciBwYXJlbnQgPSBmYWxzZTtcblxuICAgICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgcGFyZW50ID0gJChzZWxlY3RvcilbMF07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFwYXJlbnQpIHtcbiAgICAgICAgICAgIHBhcmVudCA9ICQoZWxlbWVudCkuY2xvc2VzdCgnLicgKyBDbGFzc05hbWUuQUxFUlQpWzBdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnX3RyaWdnZXJDbG9zZUV2ZW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF90cmlnZ2VyQ2xvc2VFdmVudChlbGVtZW50KSB7XG4gICAgICAgICAgdmFyIGNsb3NlRXZlbnQgPSAkLkV2ZW50KEV2ZW50LkNMT1NFKTtcblxuICAgICAgICAgICQoZWxlbWVudCkudHJpZ2dlcihjbG9zZUV2ZW50KTtcbiAgICAgICAgICByZXR1cm4gY2xvc2VFdmVudDtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdfcmVtb3ZlRWxlbWVudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfcmVtb3ZlRWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgICAgJChlbGVtZW50KS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuSU4pO1xuXG4gICAgICAgICAgaWYgKCFfVXRpbFsnZGVmYXVsdCddLnN1cHBvcnRzVHJhbnNpdGlvbkVuZCgpIHx8ICEkKGVsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5GQURFKSkge1xuICAgICAgICAgICAgdGhpcy5fZGVzdHJveUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJChlbGVtZW50KS5vbmUoX1V0aWxbJ2RlZmF1bHQnXS5UUkFOU0lUSU9OX0VORCwgJC5wcm94eSh0aGlzLl9kZXN0cm95RWxlbWVudCwgdGhpcywgZWxlbWVudCkpLmVtdWxhdGVUcmFuc2l0aW9uRW5kKFRSQU5TSVRJT05fRFVSQVRJT04pO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ19kZXN0cm95RWxlbWVudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfZGVzdHJveUVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICAgICQoZWxlbWVudCkuZGV0YWNoKCkudHJpZ2dlcihFdmVudC5DTE9TRUQpLnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3RhdGljXG5cbiAgICAgIH1dLCBbe1xuICAgICAgICBrZXk6ICdfalF1ZXJ5SW50ZXJmYWNlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSAkKHRoaXMpO1xuICAgICAgICAgICAgdmFyIGRhdGEgPSAkZWxlbWVudC5kYXRhKERBVEFfS0VZKTtcblxuICAgICAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICAgIGRhdGEgPSBuZXcgQWxlcnQodGhpcyk7XG4gICAgICAgICAgICAgICRlbGVtZW50LmRhdGEoREFUQV9LRVksIGRhdGEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY29uZmlnID09PSAnY2xvc2UnKSB7XG4gICAgICAgICAgICAgIGRhdGFbY29uZmlnXSh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdfaGFuZGxlRGlzbWlzcycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlRGlzbWlzcyhhbGVydEluc3RhbmNlKSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFsZXJ0SW5zdGFuY2UuY2xvc2UodGhpcyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdWRVJTSU9OJyxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIFZFUlNJT047XG4gICAgICAgIH1cbiAgICAgIH1dKTtcblxuICAgICAgcmV0dXJuIEFsZXJ0O1xuICAgIH0pKCk7XG5cbiAgICAkKGRvY3VtZW50KS5vbihFdmVudC5DTElDS19EQVRBX0FQSSwgU2VsZWN0b3IuRElTTUlTUywgQWxlcnQuX2hhbmRsZURpc21pc3MobmV3IEFsZXJ0KCkpKTtcblxuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIGpRdWVyeVxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG4gICAgJC5mbltOQU1FXSA9IEFsZXJ0Ll9qUXVlcnlJbnRlcmZhY2U7XG4gICAgJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IEFsZXJ0O1xuICAgICQuZm5bTkFNRV0ubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1Q7XG4gICAgICByZXR1cm4gQWxlcnQuX2pRdWVyeUludGVyZmFjZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEFsZXJ0O1xuICB9KShqUXVlcnkpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gQWxlcnQ7XG59KTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoWydleHBvcnRzJywgJ21vZHVsZSddLCBmYWN0b3J5KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBmYWN0b3J5KGV4cG9ydHMsIG1vZHVsZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIG1vZCA9IHtcbiAgICAgIGV4cG9ydHM6IHt9XG4gICAgfTtcbiAgICBmYWN0b3J5KG1vZC5leHBvcnRzLCBtb2QpO1xuICAgIGdsb2JhbC5idXR0b24gPSBtb2QuZXhwb3J0cztcbiAgfVxufSkodGhpcywgZnVuY3Rpb24gKGV4cG9ydHMsIG1vZHVsZSkge1xuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwICh2NC4wLjAtYWxwaGEuMik6IGJ1dHRvbi5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuICBmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuICB2YXIgQnV0dG9uID0gKGZ1bmN0aW9uICgkKSB7XG5cbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBDb25zdGFudHNcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuICAgIHZhciBOQU1FID0gJ2J1dHRvbic7XG4gICAgdmFyIFZFUlNJT04gPSAnNC4wLjAtYWxwaGEnO1xuICAgIHZhciBEQVRBX0tFWSA9ICdicy5idXR0b24nO1xuICAgIHZhciBFVkVOVF9LRVkgPSAnLicgKyBEQVRBX0tFWTtcbiAgICB2YXIgREFUQV9BUElfS0VZID0gJy5kYXRhLWFwaSc7XG4gICAgdmFyIEpRVUVSWV9OT19DT05GTElDVCA9ICQuZm5bTkFNRV07XG5cbiAgICB2YXIgQ2xhc3NOYW1lID0ge1xuICAgICAgQUNUSVZFOiAnYWN0aXZlJyxcbiAgICAgIEJVVFRPTjogJ2J0bicsXG4gICAgICBGT0NVUzogJ2ZvY3VzJ1xuICAgIH07XG5cbiAgICB2YXIgU2VsZWN0b3IgPSB7XG4gICAgICBEQVRBX1RPR0dMRV9DQVJST1Q6ICdbZGF0YS10b2dnbGVePVwiYnV0dG9uXCJdJyxcbiAgICAgIERBVEFfVE9HR0xFOiAnW2RhdGEtdG9nZ2xlPVwiYnV0dG9uc1wiXScsXG4gICAgICBJTlBVVDogJ2lucHV0JyxcbiAgICAgIEFDVElWRTogJy5hY3RpdmUnLFxuICAgICAgQlVUVE9OOiAnLmJ0bidcbiAgICB9O1xuXG4gICAgdmFyIEV2ZW50ID0ge1xuICAgICAgQ0xJQ0tfREFUQV9BUEk6ICdjbGljaycgKyBFVkVOVF9LRVkgKyBEQVRBX0FQSV9LRVksXG4gICAgICBGT0NVU19CTFVSX0RBVEFfQVBJOiAnZm9jdXMnICsgRVZFTlRfS0VZICsgREFUQV9BUElfS0VZICsgJyAnICsgKCdibHVyJyArIEVWRU5UX0tFWSArIERBVEFfQVBJX0tFWSlcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG4gICAgdmFyIEJ1dHRvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgICBmdW5jdGlvbiBCdXR0b24oZWxlbWVudCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQnV0dG9uKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAqIERhdGEgQXBpIGltcGxlbWVudGF0aW9uXG4gICAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAqL1xuXG4gICAgICAvLyBnZXR0ZXJzXG5cbiAgICAgIF9jcmVhdGVDbGFzcyhCdXR0b24sIFt7XG4gICAgICAgIGtleTogJ3RvZ2dsZScsXG5cbiAgICAgICAgLy8gcHVibGljXG5cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHRvZ2dsZSgpIHtcbiAgICAgICAgICB2YXIgdHJpZ2dlckNoYW5nZUV2ZW50ID0gdHJ1ZTtcbiAgICAgICAgICB2YXIgcm9vdEVsZW1lbnQgPSAkKHRoaXMuX2VsZW1lbnQpLmNsb3Nlc3QoU2VsZWN0b3IuREFUQV9UT0dHTEUpWzBdO1xuXG4gICAgICAgICAgaWYgKHJvb3RFbGVtZW50KSB7XG4gICAgICAgICAgICB2YXIgaW5wdXQgPSAkKHRoaXMuX2VsZW1lbnQpLmZpbmQoU2VsZWN0b3IuSU5QVVQpWzBdO1xuXG4gICAgICAgICAgICBpZiAoaW5wdXQpIHtcbiAgICAgICAgICAgICAgaWYgKGlucHV0LnR5cGUgPT09ICdyYWRpbycpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXQuY2hlY2tlZCAmJiAkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5BQ1RJVkUpKSB7XG4gICAgICAgICAgICAgICAgICB0cmlnZ2VyQ2hhbmdlRXZlbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdmFyIGFjdGl2ZUVsZW1lbnQgPSAkKHJvb3RFbGVtZW50KS5maW5kKFNlbGVjdG9yLkFDVElWRSlbMF07XG5cbiAgICAgICAgICAgICAgICAgIGlmIChhY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICQoYWN0aXZlRWxlbWVudCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKHRyaWdnZXJDaGFuZ2VFdmVudCkge1xuICAgICAgICAgICAgICAgIGlucHV0LmNoZWNrZWQgPSAhJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuQUNUSVZFKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLXByZXNzZWQnLCAhJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuQUNUSVZFKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRyaWdnZXJDaGFuZ2VFdmVudCkge1xuICAgICAgICAgICAgJCh0aGlzLl9lbGVtZW50KS50b2dnbGVDbGFzcyhDbGFzc05hbWUuQUNUSVZFKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnZGlzcG9zZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkaXNwb3NlKCkge1xuICAgICAgICAgICQucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSk7XG4gICAgICAgICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdGF0aWNcblxuICAgICAgfV0sIFt7XG4gICAgICAgIGtleTogJ19qUXVlcnlJbnRlcmZhY2UnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2pRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gJCh0aGlzKS5kYXRhKERBVEFfS0VZKTtcblxuICAgICAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICAgIGRhdGEgPSBuZXcgQnV0dG9uKHRoaXMpO1xuICAgICAgICAgICAgICAkKHRoaXMpLmRhdGEoREFUQV9LRVksIGRhdGEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY29uZmlnID09PSAndG9nZ2xlJykge1xuICAgICAgICAgICAgICBkYXRhW2NvbmZpZ10oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdWRVJTSU9OJyxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIFZFUlNJT047XG4gICAgICAgIH1cbiAgICAgIH1dKTtcblxuICAgICAgcmV0dXJuIEJ1dHRvbjtcbiAgICB9KSgpO1xuXG4gICAgJChkb2N1bWVudCkub24oRXZlbnQuQ0xJQ0tfREFUQV9BUEksIFNlbGVjdG9yLkRBVEFfVE9HR0xFX0NBUlJPVCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB2YXIgYnV0dG9uID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgICBpZiAoISQoYnV0dG9uKS5oYXNDbGFzcyhDbGFzc05hbWUuQlVUVE9OKSkge1xuICAgICAgICBidXR0b24gPSAkKGJ1dHRvbikuY2xvc2VzdChTZWxlY3Rvci5CVVRUT04pO1xuICAgICAgfVxuXG4gICAgICBCdXR0b24uX2pRdWVyeUludGVyZmFjZS5jYWxsKCQoYnV0dG9uKSwgJ3RvZ2dsZScpO1xuICAgIH0pLm9uKEV2ZW50LkZPQ1VTX0JMVVJfREFUQV9BUEksIFNlbGVjdG9yLkRBVEFfVE9HR0xFX0NBUlJPVCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICB2YXIgYnV0dG9uID0gJChldmVudC50YXJnZXQpLmNsb3Nlc3QoU2VsZWN0b3IuQlVUVE9OKVswXTtcbiAgICAgICQoYnV0dG9uKS50b2dnbGVDbGFzcyhDbGFzc05hbWUuRk9DVVMsIC9eZm9jdXMoaW4pPyQvLnRlc3QoZXZlbnQudHlwZSkpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogalF1ZXJ5XG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cbiAgICAkLmZuW05BTUVdID0gQnV0dG9uLl9qUXVlcnlJbnRlcmZhY2U7XG4gICAgJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IEJ1dHRvbjtcbiAgICAkLmZuW05BTUVdLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAkLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUO1xuICAgICAgcmV0dXJuIEJ1dHRvbi5falF1ZXJ5SW50ZXJmYWNlO1xuICAgIH07XG5cbiAgICByZXR1cm4gQnV0dG9uO1xuICB9KShqUXVlcnkpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gQnV0dG9uO1xufSk7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFsnZXhwb3J0cycsICdtb2R1bGUnLCAnLi91dGlsJ10sIGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgIGZhY3RvcnkoZXhwb3J0cywgbW9kdWxlLCByZXF1aXJlKCcuL3V0aWwnKSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIG1vZCA9IHtcbiAgICAgIGV4cG9ydHM6IHt9XG4gICAgfTtcbiAgICBmYWN0b3J5KG1vZC5leHBvcnRzLCBtb2QsIGdsb2JhbC5VdGlsKTtcbiAgICBnbG9iYWwuY2Fyb3VzZWwgPSBtb2QuZXhwb3J0cztcbiAgfVxufSkodGhpcywgZnVuY3Rpb24gKGV4cG9ydHMsIG1vZHVsZSwgX3V0aWwpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbiAgZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG4gIGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG4gIHZhciBfVXRpbCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWwpO1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBCb290c3RyYXAgKHY0LjAuMC1hbHBoYS4yKTogY2Fyb3VzZWwuanNcbiAgICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgdmFyIENhcm91c2VsID0gKGZ1bmN0aW9uICgkKSB7XG5cbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBDb25zdGFudHNcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuICAgIHZhciBOQU1FID0gJ2Nhcm91c2VsJztcbiAgICB2YXIgVkVSU0lPTiA9ICc0LjAuMC1hbHBoYSc7XG4gICAgdmFyIERBVEFfS0VZID0gJ2JzLmNhcm91c2VsJztcbiAgICB2YXIgRVZFTlRfS0VZID0gJy4nICsgREFUQV9LRVk7XG4gICAgdmFyIERBVEFfQVBJX0tFWSA9ICcuZGF0YS1hcGknO1xuICAgIHZhciBKUVVFUllfTk9fQ09ORkxJQ1QgPSAkLmZuW05BTUVdO1xuICAgIHZhciBUUkFOU0lUSU9OX0RVUkFUSU9OID0gNjAwO1xuXG4gICAgdmFyIERlZmF1bHQgPSB7XG4gICAgICBpbnRlcnZhbDogNTAwMCxcbiAgICAgIGtleWJvYXJkOiB0cnVlLFxuICAgICAgc2xpZGU6IGZhbHNlLFxuICAgICAgcGF1c2U6ICdob3ZlcicsXG4gICAgICB3cmFwOiB0cnVlXG4gICAgfTtcblxuICAgIHZhciBEZWZhdWx0VHlwZSA9IHtcbiAgICAgIGludGVydmFsOiAnKG51bWJlcnxib29sZWFuKScsXG4gICAgICBrZXlib2FyZDogJ2Jvb2xlYW4nLFxuICAgICAgc2xpZGU6ICcoYm9vbGVhbnxzdHJpbmcpJyxcbiAgICAgIHBhdXNlOiAnKHN0cmluZ3xib29sZWFuKScsXG4gICAgICB3cmFwOiAnYm9vbGVhbidcbiAgICB9O1xuXG4gICAgdmFyIERpcmVjdGlvbiA9IHtcbiAgICAgIE5FWFQ6ICduZXh0JyxcbiAgICAgIFBSRVZJT1VTOiAncHJldidcbiAgICB9O1xuXG4gICAgdmFyIEV2ZW50ID0ge1xuICAgICAgU0xJREU6ICdzbGlkZScgKyBFVkVOVF9LRVksXG4gICAgICBTTElEOiAnc2xpZCcgKyBFVkVOVF9LRVksXG4gICAgICBLRVlET1dOOiAna2V5ZG93bicgKyBFVkVOVF9LRVksXG4gICAgICBNT1VTRUVOVEVSOiAnbW91c2VlbnRlcicgKyBFVkVOVF9LRVksXG4gICAgICBNT1VTRUxFQVZFOiAnbW91c2VsZWF2ZScgKyBFVkVOVF9LRVksXG4gICAgICBMT0FEX0RBVEFfQVBJOiAnbG9hZCcgKyBFVkVOVF9LRVkgKyBEQVRBX0FQSV9LRVksXG4gICAgICBDTElDS19EQVRBX0FQSTogJ2NsaWNrJyArIEVWRU5UX0tFWSArIERBVEFfQVBJX0tFWVxuICAgIH07XG5cbiAgICB2YXIgQ2xhc3NOYW1lID0ge1xuICAgICAgQ0FST1VTRUw6ICdjYXJvdXNlbCcsXG4gICAgICBBQ1RJVkU6ICdhY3RpdmUnLFxuICAgICAgU0xJREU6ICdzbGlkZScsXG4gICAgICBSSUdIVDogJ3JpZ2h0JyxcbiAgICAgIExFRlQ6ICdsZWZ0JyxcbiAgICAgIElURU06ICdjYXJvdXNlbC1pdGVtJ1xuICAgIH07XG5cbiAgICB2YXIgU2VsZWN0b3IgPSB7XG4gICAgICBBQ1RJVkU6ICcuYWN0aXZlJyxcbiAgICAgIEFDVElWRV9JVEVNOiAnLmFjdGl2ZS5jYXJvdXNlbC1pdGVtJyxcbiAgICAgIElURU06ICcuY2Fyb3VzZWwtaXRlbScsXG4gICAgICBORVhUX1BSRVY6ICcubmV4dCwgLnByZXYnLFxuICAgICAgSU5ESUNBVE9SUzogJy5jYXJvdXNlbC1pbmRpY2F0b3JzJyxcbiAgICAgIERBVEFfU0xJREU6ICdbZGF0YS1zbGlkZV0sIFtkYXRhLXNsaWRlLXRvXScsXG4gICAgICBEQVRBX1JJREU6ICdbZGF0YS1yaWRlPVwiY2Fyb3VzZWxcIl0nXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIENsYXNzIERlZmluaXRpb25cbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuICAgIHZhciBDYXJvdXNlbCA9IChmdW5jdGlvbiAoKSB7XG4gICAgICBmdW5jdGlvbiBDYXJvdXNlbChlbGVtZW50LCBjb25maWcpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENhcm91c2VsKTtcblxuICAgICAgICB0aGlzLl9pdGVtcyA9IG51bGw7XG4gICAgICAgIHRoaXMuX2ludGVydmFsID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYWN0aXZlRWxlbWVudCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5faXNQYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faXNTbGlkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5fY29uZmlnID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZyk7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSAkKGVsZW1lbnQpWzBdO1xuICAgICAgICB0aGlzLl9pbmRpY2F0b3JzRWxlbWVudCA9ICQodGhpcy5fZWxlbWVudCkuZmluZChTZWxlY3Rvci5JTkRJQ0FUT1JTKVswXTtcblxuICAgICAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpO1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAgICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICovXG5cbiAgICAgIC8vIGdldHRlcnNcblxuICAgICAgX2NyZWF0ZUNsYXNzKENhcm91c2VsLCBbe1xuICAgICAgICBrZXk6ICduZXh0JyxcblxuICAgICAgICAvLyBwdWJsaWNcblxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICBpZiAoIXRoaXMuX2lzU2xpZGluZykge1xuICAgICAgICAgICAgdGhpcy5fc2xpZGUoRGlyZWN0aW9uLk5FWFQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICduZXh0V2hlblZpc2libGUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbmV4dFdoZW5WaXNpYmxlKCkge1xuICAgICAgICAgIC8vIERvbid0IGNhbGwgbmV4dCB3aGVuIHRoZSBwYWdlIGlzbid0IHZpc2libGVcbiAgICAgICAgICBpZiAoIWRvY3VtZW50LmhpZGRlbikge1xuICAgICAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ3ByZXYnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcHJldigpIHtcbiAgICAgICAgICBpZiAoIXRoaXMuX2lzU2xpZGluZykge1xuICAgICAgICAgICAgdGhpcy5fc2xpZGUoRGlyZWN0aW9uLlBSRVZJT1VTKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAncGF1c2UnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcGF1c2UoZXZlbnQpIHtcbiAgICAgICAgICBpZiAoIWV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9pc1BhdXNlZCA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCQodGhpcy5fZWxlbWVudCkuZmluZChTZWxlY3Rvci5ORVhUX1BSRVYpWzBdICYmIF9VdGlsWydkZWZhdWx0J10uc3VwcG9ydHNUcmFuc2l0aW9uRW5kKCkpIHtcbiAgICAgICAgICAgIF9VdGlsWydkZWZhdWx0J10udHJpZ2dlclRyYW5zaXRpb25FbmQodGhpcy5fZWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLmN5Y2xlKHRydWUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWwpO1xuICAgICAgICAgIHRoaXMuX2ludGVydmFsID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdjeWNsZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjeWNsZShldmVudCkge1xuICAgICAgICAgIGlmICghZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuX2ludGVydmFsKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX2ludGVydmFsKTtcbiAgICAgICAgICAgIHRoaXMuX2ludGVydmFsID0gbnVsbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5fY29uZmlnLmludGVydmFsICYmICF0aGlzLl9pc1BhdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgkLnByb3h5KGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSA/IHRoaXMubmV4dFdoZW5WaXNpYmxlIDogdGhpcy5uZXh0LCB0aGlzKSwgdGhpcy5fY29uZmlnLmludGVydmFsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAndG8nLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdG8oaW5kZXgpIHtcbiAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgdGhpcy5fYWN0aXZlRWxlbWVudCA9ICQodGhpcy5fZWxlbWVudCkuZmluZChTZWxlY3Rvci5BQ1RJVkVfSVRFTSlbMF07XG5cbiAgICAgICAgICB2YXIgYWN0aXZlSW5kZXggPSB0aGlzLl9nZXRJdGVtSW5kZXgodGhpcy5fYWN0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgICBpZiAoaW5kZXggPiB0aGlzLl9pdGVtcy5sZW5ndGggLSAxIHx8IGluZGV4IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLl9pc1NsaWRpbmcpIHtcbiAgICAgICAgICAgICQodGhpcy5fZWxlbWVudCkub25lKEV2ZW50LlNMSUQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnRvKGluZGV4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChhY3RpdmVJbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgICAgIHRoaXMuY3ljbGUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gaW5kZXggPiBhY3RpdmVJbmRleCA/IERpcmVjdGlvbi5ORVhUIDogRGlyZWN0aW9uLlBSRVZJT1VTO1xuXG4gICAgICAgICAgdGhpcy5fc2xpZGUoZGlyZWN0aW9uLCB0aGlzLl9pdGVtc1tpbmRleF0pO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ2Rpc3Bvc2UnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLm9mZihFVkVOVF9LRVkpO1xuICAgICAgICAgICQucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSk7XG5cbiAgICAgICAgICB0aGlzLl9pdGVtcyA9IG51bGw7XG4gICAgICAgICAgdGhpcy5fY29uZmlnID0gbnVsbDtcbiAgICAgICAgICB0aGlzLl9lbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICB0aGlzLl9pbnRlcnZhbCA9IG51bGw7XG4gICAgICAgICAgdGhpcy5faXNQYXVzZWQgPSBudWxsO1xuICAgICAgICAgIHRoaXMuX2lzU2xpZGluZyA9IG51bGw7XG4gICAgICAgICAgdGhpcy5fYWN0aXZlRWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgdGhpcy5faW5kaWNhdG9yc0VsZW1lbnQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHJpdmF0ZVxuXG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ19nZXRDb25maWcnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2dldENvbmZpZyhjb25maWcpIHtcbiAgICAgICAgICBjb25maWcgPSAkLmV4dGVuZCh7fSwgRGVmYXVsdCwgY29uZmlnKTtcbiAgICAgICAgICBfVXRpbFsnZGVmYXVsdCddLnR5cGVDaGVja0NvbmZpZyhOQU1FLCBjb25maWcsIERlZmF1bHRUeXBlKTtcbiAgICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ19hZGRFdmVudExpc3RlbmVycycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5rZXlib2FyZCkge1xuICAgICAgICAgICAgJCh0aGlzLl9lbGVtZW50KS5vbihFdmVudC5LRVlET1dOLCAkLnByb3h5KHRoaXMuX2tleWRvd24sIHRoaXMpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5fY29uZmlnLnBhdXNlID09PSAnaG92ZXInICYmICEoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSkge1xuICAgICAgICAgICAgJCh0aGlzLl9lbGVtZW50KS5vbihFdmVudC5NT1VTRUVOVEVSLCAkLnByb3h5KHRoaXMucGF1c2UsIHRoaXMpKS5vbihFdmVudC5NT1VTRUxFQVZFLCAkLnByb3h5KHRoaXMuY3ljbGUsIHRoaXMpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnX2tleWRvd24nLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2tleWRvd24oZXZlbnQpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgaWYgKC9pbnB1dHx0ZXh0YXJlYS9pLnRlc3QoZXZlbnQudGFyZ2V0LnRhZ05hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICAgICAgY2FzZSAzNzpcbiAgICAgICAgICAgICAgdGhpcy5wcmV2KCk7YnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgICAgICB0aGlzLm5leHQoKTticmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnX2dldEl0ZW1JbmRleCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0SXRlbUluZGV4KGVsZW1lbnQpIHtcbiAgICAgICAgICB0aGlzLl9pdGVtcyA9ICQubWFrZUFycmF5KCQoZWxlbWVudCkucGFyZW50KCkuZmluZChTZWxlY3Rvci5JVEVNKSk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zLmluZGV4T2YoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnX2dldEl0ZW1CeURpcmVjdGlvbicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0SXRlbUJ5RGlyZWN0aW9uKGRpcmVjdGlvbiwgYWN0aXZlRWxlbWVudCkge1xuICAgICAgICAgIHZhciBpc05leHREaXJlY3Rpb24gPSBkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5ORVhUO1xuICAgICAgICAgIHZhciBpc1ByZXZEaXJlY3Rpb24gPSBkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5QUkVWSU9VUztcbiAgICAgICAgICB2YXIgYWN0aXZlSW5kZXggPSB0aGlzLl9nZXRJdGVtSW5kZXgoYWN0aXZlRWxlbWVudCk7XG4gICAgICAgICAgdmFyIGxhc3RJdGVtSW5kZXggPSB0aGlzLl9pdGVtcy5sZW5ndGggLSAxO1xuICAgICAgICAgIHZhciBpc0dvaW5nVG9XcmFwID0gaXNQcmV2RGlyZWN0aW9uICYmIGFjdGl2ZUluZGV4ID09PSAwIHx8IGlzTmV4dERpcmVjdGlvbiAmJiBhY3RpdmVJbmRleCA9PT0gbGFzdEl0ZW1JbmRleDtcblxuICAgICAgICAgIGlmIChpc0dvaW5nVG9XcmFwICYmICF0aGlzLl9jb25maWcud3JhcCkge1xuICAgICAgICAgICAgcmV0dXJuIGFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGRlbHRhID0gZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uUFJFVklPVVMgPyAtMSA6IDE7XG4gICAgICAgICAgdmFyIGl0ZW1JbmRleCA9IChhY3RpdmVJbmRleCArIGRlbHRhKSAlIHRoaXMuX2l0ZW1zLmxlbmd0aDtcblxuICAgICAgICAgIHJldHVybiBpdGVtSW5kZXggPT09IC0xID8gdGhpcy5faXRlbXNbdGhpcy5faXRlbXMubGVuZ3RoIC0gMV0gOiB0aGlzLl9pdGVtc1tpdGVtSW5kZXhdO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ190cmlnZ2VyU2xpZGVFdmVudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfdHJpZ2dlclNsaWRlRXZlbnQocmVsYXRlZFRhcmdldCwgZGlyZWN0aW9uYWxDbGFzc25hbWUpIHtcbiAgICAgICAgICB2YXIgc2xpZGVFdmVudCA9ICQuRXZlbnQoRXZlbnQuU0xJREUsIHtcbiAgICAgICAgICAgIHJlbGF0ZWRUYXJnZXQ6IHJlbGF0ZWRUYXJnZXQsXG4gICAgICAgICAgICBkaXJlY3Rpb246IGRpcmVjdGlvbmFsQ2xhc3NuYW1lXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoc2xpZGVFdmVudCk7XG5cbiAgICAgICAgICByZXR1cm4gc2xpZGVFdmVudDtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdfc2V0QWN0aXZlSW5kaWNhdG9yRWxlbWVudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfc2V0QWN0aXZlSW5kaWNhdG9yRWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgICAgaWYgKHRoaXMuX2luZGljYXRvcnNFbGVtZW50KSB7XG4gICAgICAgICAgICAkKHRoaXMuX2luZGljYXRvcnNFbGVtZW50KS5maW5kKFNlbGVjdG9yLkFDVElWRSkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSk7XG5cbiAgICAgICAgICAgIHZhciBuZXh0SW5kaWNhdG9yID0gdGhpcy5faW5kaWNhdG9yc0VsZW1lbnQuY2hpbGRyZW5bdGhpcy5fZ2V0SXRlbUluZGV4KGVsZW1lbnQpXTtcblxuICAgICAgICAgICAgaWYgKG5leHRJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgICAgJChuZXh0SW5kaWNhdG9yKS5hZGRDbGFzcyhDbGFzc05hbWUuQUNUSVZFKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnX3NsaWRlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9zbGlkZShkaXJlY3Rpb24sIGVsZW1lbnQpIHtcbiAgICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICAgIHZhciBhY3RpdmVFbGVtZW50ID0gJCh0aGlzLl9lbGVtZW50KS5maW5kKFNlbGVjdG9yLkFDVElWRV9JVEVNKVswXTtcbiAgICAgICAgICB2YXIgbmV4dEVsZW1lbnQgPSBlbGVtZW50IHx8IGFjdGl2ZUVsZW1lbnQgJiYgdGhpcy5fZ2V0SXRlbUJ5RGlyZWN0aW9uKGRpcmVjdGlvbiwgYWN0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgICB2YXIgaXNDeWNsaW5nID0gQm9vbGVhbih0aGlzLl9pbnRlcnZhbCk7XG5cbiAgICAgICAgICB2YXIgZGlyZWN0aW9uYWxDbGFzc05hbWUgPSBkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5ORVhUID8gQ2xhc3NOYW1lLkxFRlQgOiBDbGFzc05hbWUuUklHSFQ7XG5cbiAgICAgICAgICBpZiAobmV4dEVsZW1lbnQgJiYgJChuZXh0RWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzU2xpZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBzbGlkZUV2ZW50ID0gdGhpcy5fdHJpZ2dlclNsaWRlRXZlbnQobmV4dEVsZW1lbnQsIGRpcmVjdGlvbmFsQ2xhc3NOYW1lKTtcbiAgICAgICAgICBpZiAoc2xpZGVFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghYWN0aXZlRWxlbWVudCB8fCAhbmV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIHNvbWUgd2VpcmRuZXNzIGlzIGhhcHBlbmluZywgc28gd2UgYmFpbFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX2lzU2xpZGluZyA9IHRydWU7XG5cbiAgICAgICAgICBpZiAoaXNDeWNsaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fc2V0QWN0aXZlSW5kaWNhdG9yRWxlbWVudChuZXh0RWxlbWVudCk7XG5cbiAgICAgICAgICB2YXIgc2xpZEV2ZW50ID0gJC5FdmVudChFdmVudC5TTElELCB7XG4gICAgICAgICAgICByZWxhdGVkVGFyZ2V0OiBuZXh0RWxlbWVudCxcbiAgICAgICAgICAgIGRpcmVjdGlvbjogZGlyZWN0aW9uYWxDbGFzc05hbWVcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmIChfVXRpbFsnZGVmYXVsdCddLnN1cHBvcnRzVHJhbnNpdGlvbkVuZCgpICYmICQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNMSURFKSkge1xuXG4gICAgICAgICAgICAkKG5leHRFbGVtZW50KS5hZGRDbGFzcyhkaXJlY3Rpb24pO1xuXG4gICAgICAgICAgICBfVXRpbFsnZGVmYXVsdCddLnJlZmxvdyhuZXh0RWxlbWVudCk7XG5cbiAgICAgICAgICAgICQoYWN0aXZlRWxlbWVudCkuYWRkQ2xhc3MoZGlyZWN0aW9uYWxDbGFzc05hbWUpO1xuICAgICAgICAgICAgJChuZXh0RWxlbWVudCkuYWRkQ2xhc3MoZGlyZWN0aW9uYWxDbGFzc05hbWUpO1xuXG4gICAgICAgICAgICAkKGFjdGl2ZUVsZW1lbnQpLm9uZShfVXRpbFsnZGVmYXVsdCddLlRSQU5TSVRJT05fRU5ELCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICQobmV4dEVsZW1lbnQpLnJlbW92ZUNsYXNzKGRpcmVjdGlvbmFsQ2xhc3NOYW1lKS5yZW1vdmVDbGFzcyhkaXJlY3Rpb24pO1xuXG4gICAgICAgICAgICAgICQobmV4dEVsZW1lbnQpLmFkZENsYXNzKENsYXNzTmFtZS5BQ1RJVkUpO1xuXG4gICAgICAgICAgICAgICQoYWN0aXZlRWxlbWVudCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSkucmVtb3ZlQ2xhc3MoZGlyZWN0aW9uKS5yZW1vdmVDbGFzcyhkaXJlY3Rpb25hbENsYXNzTmFtZSk7XG5cbiAgICAgICAgICAgICAgX3RoaXMyLl9pc1NsaWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJChfdGhpczIuX2VsZW1lbnQpLnRyaWdnZXIoc2xpZEV2ZW50KTtcbiAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICB9KS5lbXVsYXRlVHJhbnNpdGlvbkVuZChUUkFOU0lUSU9OX0RVUkFUSU9OKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJChhY3RpdmVFbGVtZW50KS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQUNUSVZFKTtcbiAgICAgICAgICAgICQobmV4dEVsZW1lbnQpLmFkZENsYXNzKENsYXNzTmFtZS5BQ1RJVkUpO1xuXG4gICAgICAgICAgICB0aGlzLl9pc1NsaWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICQodGhpcy5fZWxlbWVudCkudHJpZ2dlcihzbGlkRXZlbnQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChpc0N5Y2xpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuY3ljbGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdGF0aWNcblxuICAgICAgfV0sIFt7XG4gICAgICAgIGtleTogJ19qUXVlcnlJbnRlcmZhY2UnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2pRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gJCh0aGlzKS5kYXRhKERBVEFfS0VZKTtcbiAgICAgICAgICAgIHZhciBfY29uZmlnID0gJC5leHRlbmQoe30sIERlZmF1bHQsICQodGhpcykuZGF0YSgpKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICQuZXh0ZW5kKF9jb25maWcsIGNvbmZpZyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSB0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJyA/IGNvbmZpZyA6IF9jb25maWcuc2xpZGU7XG5cbiAgICAgICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgICBkYXRhID0gbmV3IENhcm91c2VsKHRoaXMsIF9jb25maWcpO1xuICAgICAgICAgICAgICAkKHRoaXMpLmRhdGEoREFUQV9LRVksIGRhdGEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgZGF0YS50byhjb25maWcpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYWN0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBpZiAoZGF0YVthY3Rpb25dID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIG1ldGhvZCBuYW1lZCBcIicgKyBhY3Rpb24gKyAnXCInKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBkYXRhW2FjdGlvbl0oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoX2NvbmZpZy5pbnRlcnZhbCkge1xuICAgICAgICAgICAgICBkYXRhLnBhdXNlKCk7XG4gICAgICAgICAgICAgIGRhdGEuY3ljbGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdfZGF0YUFwaUNsaWNrSGFuZGxlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfZGF0YUFwaUNsaWNrSGFuZGxlcihldmVudCkge1xuICAgICAgICAgIHZhciBzZWxlY3RvciA9IF9VdGlsWydkZWZhdWx0J10uZ2V0U2VsZWN0b3JGcm9tRWxlbWVudCh0aGlzKTtcblxuICAgICAgICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gJChzZWxlY3RvcilbMF07XG5cbiAgICAgICAgICBpZiAoIXRhcmdldCB8fCAhJCh0YXJnZXQpLmhhc0NsYXNzKENsYXNzTmFtZS5DQVJPVVNFTCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgY29uZmlnID0gJC5leHRlbmQoe30sICQodGFyZ2V0KS5kYXRhKCksICQodGhpcykuZGF0YSgpKTtcbiAgICAgICAgICB2YXIgc2xpZGVJbmRleCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXNsaWRlLXRvJyk7XG5cbiAgICAgICAgICBpZiAoc2xpZGVJbmRleCkge1xuICAgICAgICAgICAgY29uZmlnLmludGVydmFsID0gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgQ2Fyb3VzZWwuX2pRdWVyeUludGVyZmFjZS5jYWxsKCQodGFyZ2V0KSwgY29uZmlnKTtcblxuICAgICAgICAgIGlmIChzbGlkZUluZGV4KSB7XG4gICAgICAgICAgICAkKHRhcmdldCkuZGF0YShEQVRBX0tFWSkudG8oc2xpZGVJbmRleCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdWRVJTSU9OJyxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIFZFUlNJT047XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnRGVmYXVsdCcsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBEZWZhdWx0O1xuICAgICAgICB9XG4gICAgICB9XSk7XG5cbiAgICAgIHJldHVybiBDYXJvdXNlbDtcbiAgICB9KSgpO1xuXG4gICAgJChkb2N1bWVudCkub24oRXZlbnQuQ0xJQ0tfREFUQV9BUEksIFNlbGVjdG9yLkRBVEFfU0xJREUsIENhcm91c2VsLl9kYXRhQXBpQ2xpY2tIYW5kbGVyKTtcblxuICAgICQod2luZG93KS5vbihFdmVudC5MT0FEX0RBVEFfQVBJLCBmdW5jdGlvbiAoKSB7XG4gICAgICAkKFNlbGVjdG9yLkRBVEFfUklERSkuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkY2Fyb3VzZWwgPSAkKHRoaXMpO1xuICAgICAgICBDYXJvdXNlbC5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJGNhcm91c2VsLCAkY2Fyb3VzZWwuZGF0YSgpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogalF1ZXJ5XG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cbiAgICAkLmZuW05BTUVdID0gQ2Fyb3VzZWwuX2pRdWVyeUludGVyZmFjZTtcbiAgICAkLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gQ2Fyb3VzZWw7XG4gICAgJC5mbltOQU1FXS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgJC5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVDtcbiAgICAgIHJldHVybiBDYXJvdXNlbC5falF1ZXJ5SW50ZXJmYWNlO1xuICAgIH07XG5cbiAgICByZXR1cm4gQ2Fyb3VzZWw7XG4gIH0pKGpRdWVyeSk7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBDYXJvdXNlbDtcbn0pO1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShbJ2V4cG9ydHMnLCAnbW9kdWxlJywgJy4vdXRpbCddLCBmYWN0b3J5KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBmYWN0b3J5KGV4cG9ydHMsIG1vZHVsZSwgcmVxdWlyZSgnLi91dGlsJykpO1xuICB9IGVsc2Uge1xuICAgIHZhciBtb2QgPSB7XG4gICAgICBleHBvcnRzOiB7fVxuICAgIH07XG4gICAgZmFjdG9yeShtb2QuZXhwb3J0cywgbW9kLCBnbG9iYWwuVXRpbCk7XG4gICAgZ2xvYmFsLmNvbGxhcHNlID0gbW9kLmV4cG9ydHM7XG4gIH1cbn0pKHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzLCBtb2R1bGUsIF91dGlsKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG4gIGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuICBmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuICB2YXIgX1V0aWwgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsKTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwICh2NC4wLjAtYWxwaGEuMik6IGNvbGxhcHNlLmpzXG4gICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIHZhciBDb2xsYXBzZSA9IChmdW5jdGlvbiAoJCkge1xuXG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogQ29uc3RhbnRzXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cbiAgICB2YXIgTkFNRSA9ICdjb2xsYXBzZSc7XG4gICAgdmFyIFZFUlNJT04gPSAnNC4wLjAtYWxwaGEnO1xuICAgIHZhciBEQVRBX0tFWSA9ICdicy5jb2xsYXBzZSc7XG4gICAgdmFyIEVWRU5UX0tFWSA9ICcuJyArIERBVEFfS0VZO1xuICAgIHZhciBEQVRBX0FQSV9LRVkgPSAnLmRhdGEtYXBpJztcbiAgICB2YXIgSlFVRVJZX05PX0NPTkZMSUNUID0gJC5mbltOQU1FXTtcbiAgICB2YXIgVFJBTlNJVElPTl9EVVJBVElPTiA9IDYwMDtcblxuICAgIHZhciBEZWZhdWx0ID0ge1xuICAgICAgdG9nZ2xlOiB0cnVlLFxuICAgICAgcGFyZW50OiAnJ1xuICAgIH07XG5cbiAgICB2YXIgRGVmYXVsdFR5cGUgPSB7XG4gICAgICB0b2dnbGU6ICdib29sZWFuJyxcbiAgICAgIHBhcmVudDogJ3N0cmluZydcbiAgICB9O1xuXG4gICAgdmFyIEV2ZW50ID0ge1xuICAgICAgU0hPVzogJ3Nob3cnICsgRVZFTlRfS0VZLFxuICAgICAgU0hPV046ICdzaG93bicgKyBFVkVOVF9LRVksXG4gICAgICBISURFOiAnaGlkZScgKyBFVkVOVF9LRVksXG4gICAgICBISURERU46ICdoaWRkZW4nICsgRVZFTlRfS0VZLFxuICAgICAgQ0xJQ0tfREFUQV9BUEk6ICdjbGljaycgKyBFVkVOVF9LRVkgKyBEQVRBX0FQSV9LRVlcbiAgICB9O1xuXG4gICAgdmFyIENsYXNzTmFtZSA9IHtcbiAgICAgIElOOiAnaW4nLFxuICAgICAgQ09MTEFQU0U6ICdjb2xsYXBzZScsXG4gICAgICBDT0xMQVBTSU5HOiAnY29sbGFwc2luZycsXG4gICAgICBDT0xMQVBTRUQ6ICdjb2xsYXBzZWQnXG4gICAgfTtcblxuICAgIHZhciBEaW1lbnNpb24gPSB7XG4gICAgICBXSURUSDogJ3dpZHRoJyxcbiAgICAgIEhFSUdIVDogJ2hlaWdodCdcbiAgICB9O1xuXG4gICAgdmFyIFNlbGVjdG9yID0ge1xuICAgICAgQUNUSVZFUzogJy5wYW5lbCA+IC5pbiwgLnBhbmVsID4gLmNvbGxhcHNpbmcnLFxuICAgICAgREFUQV9UT0dHTEU6ICdbZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXSdcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG4gICAgdmFyIENvbGxhcHNlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgIGZ1bmN0aW9uIENvbGxhcHNlKGVsZW1lbnQsIGNvbmZpZykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29sbGFwc2UpO1xuXG4gICAgICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fY29uZmlnID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZyk7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJBcnJheSA9ICQubWFrZUFycmF5KCQoJ1tkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJdW2hyZWY9XCIjJyArIGVsZW1lbnQuaWQgKyAnXCJdLCcgKyAoJ1tkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJdW2RhdGEtdGFyZ2V0PVwiIycgKyBlbGVtZW50LmlkICsgJ1wiXScpKSk7XG5cbiAgICAgICAgdGhpcy5fcGFyZW50ID0gdGhpcy5fY29uZmlnLnBhcmVudCA/IHRoaXMuX2dldFBhcmVudCgpIDogbnVsbDtcblxuICAgICAgICBpZiAoIXRoaXMuX2NvbmZpZy5wYXJlbnQpIHtcbiAgICAgICAgICB0aGlzLl9hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3ModGhpcy5fZWxlbWVudCwgdGhpcy5fdHJpZ2dlckFycmF5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9jb25maWcudG9nZ2xlKSB7XG4gICAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAgICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICovXG5cbiAgICAgIC8vIGdldHRlcnNcblxuICAgICAgX2NyZWF0ZUNsYXNzKENvbGxhcHNlLCBbe1xuICAgICAgICBrZXk6ICd0b2dnbGUnLFxuXG4gICAgICAgIC8vIHB1YmxpY1xuXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiB0b2dnbGUoKSB7XG4gICAgICAgICAgaWYgKCQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLklOKSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdzaG93JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNob3coKSB7XG4gICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgIGlmICh0aGlzLl9pc1RyYW5zaXRpb25pbmcgfHwgJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuSU4pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGFjdGl2ZXMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgdmFyIGFjdGl2ZXNEYXRhID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICAgICAgYWN0aXZlcyA9ICQubWFrZUFycmF5KCQoU2VsZWN0b3IuQUNUSVZFUykpO1xuICAgICAgICAgICAgaWYgKCFhY3RpdmVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICBhY3RpdmVzID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYWN0aXZlcykge1xuICAgICAgICAgICAgYWN0aXZlc0RhdGEgPSAkKGFjdGl2ZXMpLmRhdGEoREFUQV9LRVkpO1xuICAgICAgICAgICAgaWYgKGFjdGl2ZXNEYXRhICYmIGFjdGl2ZXNEYXRhLl9pc1RyYW5zaXRpb25pbmcpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBzdGFydEV2ZW50ID0gJC5FdmVudChFdmVudC5TSE9XKTtcbiAgICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoc3RhcnRFdmVudCk7XG4gICAgICAgICAgaWYgKHN0YXJ0RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYWN0aXZlcykge1xuICAgICAgICAgICAgQ29sbGFwc2UuX2pRdWVyeUludGVyZmFjZS5jYWxsKCQoYWN0aXZlcyksICdoaWRlJyk7XG4gICAgICAgICAgICBpZiAoIWFjdGl2ZXNEYXRhKSB7XG4gICAgICAgICAgICAgICQoYWN0aXZlcykuZGF0YShEQVRBX0tFWSwgbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGRpbWVuc2lvbiA9IHRoaXMuX2dldERpbWVuc2lvbigpO1xuXG4gICAgICAgICAgJCh0aGlzLl9lbGVtZW50KS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0UpLmFkZENsYXNzKENsYXNzTmFtZS5DT0xMQVBTSU5HKTtcblxuICAgICAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9IDA7XG4gICAgICAgICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKTtcblxuICAgICAgICAgIGlmICh0aGlzLl90cmlnZ2VyQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICAkKHRoaXMuX3RyaWdnZXJBcnJheSkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNFRCkuYXR0cignYXJpYS1leHBhbmRlZCcsIHRydWUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuc2V0VHJhbnNpdGlvbmluZyh0cnVlKTtcblxuICAgICAgICAgIHZhciBjb21wbGV0ZSA9IGZ1bmN0aW9uIGNvbXBsZXRlKCkge1xuICAgICAgICAgICAgJChfdGhpcy5fZWxlbWVudCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNJTkcpLmFkZENsYXNzKENsYXNzTmFtZS5DT0xMQVBTRSkuYWRkQ2xhc3MoQ2xhc3NOYW1lLklOKTtcblxuICAgICAgICAgICAgX3RoaXMuX2VsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9ICcnO1xuXG4gICAgICAgICAgICBfdGhpcy5zZXRUcmFuc2l0aW9uaW5nKGZhbHNlKTtcblxuICAgICAgICAgICAgJChfdGhpcy5fZWxlbWVudCkudHJpZ2dlcihFdmVudC5TSE9XTik7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmICghX1V0aWxbJ2RlZmF1bHQnXS5zdXBwb3J0c1RyYW5zaXRpb25FbmQoKSkge1xuICAgICAgICAgICAgY29tcGxldGUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgY2FwaXRhbGl6ZWREaW1lbnNpb24gPSBkaW1lbnNpb25bMF0udG9VcHBlckNhc2UoKSArIGRpbWVuc2lvbi5zbGljZSgxKTtcbiAgICAgICAgICB2YXIgc2Nyb2xsU2l6ZSA9ICdzY3JvbGwnICsgY2FwaXRhbGl6ZWREaW1lbnNpb247XG5cbiAgICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLm9uZShfVXRpbFsnZGVmYXVsdCddLlRSQU5TSVRJT05fRU5ELCBjb21wbGV0ZSkuZW11bGF0ZVRyYW5zaXRpb25FbmQoVFJBTlNJVElPTl9EVVJBVElPTik7XG5cbiAgICAgICAgICB0aGlzLl9lbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSB0aGlzLl9lbGVtZW50W3Njcm9sbFNpemVdICsgJ3B4JztcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdoaWRlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhpZGUoKSB7XG4gICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICBpZiAodGhpcy5faXNUcmFuc2l0aW9uaW5nIHx8ICEkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5JTikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgc3RhcnRFdmVudCA9ICQuRXZlbnQoRXZlbnQuSElERSk7XG4gICAgICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKHN0YXJ0RXZlbnQpO1xuICAgICAgICAgIGlmIChzdGFydEV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGRpbWVuc2lvbiA9IHRoaXMuX2dldERpbWVuc2lvbigpO1xuICAgICAgICAgIHZhciBvZmZzZXREaW1lbnNpb24gPSBkaW1lbnNpb24gPT09IERpbWVuc2lvbi5XSURUSCA/ICdvZmZzZXRXaWR0aCcgOiAnb2Zmc2V0SGVpZ2h0JztcblxuICAgICAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9IHRoaXMuX2VsZW1lbnRbb2Zmc2V0RGltZW5zaW9uXSArICdweCc7XG5cbiAgICAgICAgICBfVXRpbFsnZGVmYXVsdCddLnJlZmxvdyh0aGlzLl9lbGVtZW50KTtcblxuICAgICAgICAgICQodGhpcy5fZWxlbWVudCkuYWRkQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNJTkcpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5DT0xMQVBTRSkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLklOKTtcblxuICAgICAgICAgIHRoaXMuX2VsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpO1xuXG4gICAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgICQodGhpcy5fdHJpZ2dlckFycmF5KS5hZGRDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0VEKS5hdHRyKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuc2V0VHJhbnNpdGlvbmluZyh0cnVlKTtcblxuICAgICAgICAgIHZhciBjb21wbGV0ZSA9IGZ1bmN0aW9uIGNvbXBsZXRlKCkge1xuICAgICAgICAgICAgX3RoaXMyLnNldFRyYW5zaXRpb25pbmcoZmFsc2UpO1xuICAgICAgICAgICAgJChfdGhpczIuX2VsZW1lbnQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5DT0xMQVBTSU5HKS5hZGRDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0UpLnRyaWdnZXIoRXZlbnQuSElEREVOKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gMDtcblxuICAgICAgICAgIGlmICghX1V0aWxbJ2RlZmF1bHQnXS5zdXBwb3J0c1RyYW5zaXRpb25FbmQoKSkge1xuICAgICAgICAgICAgY29tcGxldGUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLm9uZShfVXRpbFsnZGVmYXVsdCddLlRSQU5TSVRJT05fRU5ELCBjb21wbGV0ZSkuZW11bGF0ZVRyYW5zaXRpb25FbmQoVFJBTlNJVElPTl9EVVJBVElPTik7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2V0VHJhbnNpdGlvbmluZycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRUcmFuc2l0aW9uaW5nKGlzVHJhbnNpdGlvbmluZykge1xuICAgICAgICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IGlzVHJhbnNpdGlvbmluZztcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdkaXNwb3NlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgICAgICAgJC5yZW1vdmVEYXRhKHRoaXMuX2VsZW1lbnQsIERBVEFfS0VZKTtcblxuICAgICAgICAgIHRoaXMuX2NvbmZpZyA9IG51bGw7XG4gICAgICAgICAgdGhpcy5fcGFyZW50ID0gbnVsbDtcbiAgICAgICAgICB0aGlzLl9lbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICB0aGlzLl90cmlnZ2VyQXJyYXkgPSBudWxsO1xuICAgICAgICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwcml2YXRlXG5cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnX2dldENvbmZpZycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0Q29uZmlnKGNvbmZpZykge1xuICAgICAgICAgIGNvbmZpZyA9ICQuZXh0ZW5kKHt9LCBEZWZhdWx0LCBjb25maWcpO1xuICAgICAgICAgIGNvbmZpZy50b2dnbGUgPSBCb29sZWFuKGNvbmZpZy50b2dnbGUpOyAvLyBjb2VyY2Ugc3RyaW5nIHZhbHVlc1xuICAgICAgICAgIF9VdGlsWydkZWZhdWx0J10udHlwZUNoZWNrQ29uZmlnKE5BTUUsIGNvbmZpZywgRGVmYXVsdFR5cGUpO1xuICAgICAgICAgIHJldHVybiBjb25maWc7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnX2dldERpbWVuc2lvbicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0RGltZW5zaW9uKCkge1xuICAgICAgICAgIHZhciBoYXNXaWR0aCA9ICQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoRGltZW5zaW9uLldJRFRIKTtcbiAgICAgICAgICByZXR1cm4gaGFzV2lkdGggPyBEaW1lbnNpb24uV0lEVEggOiBEaW1lbnNpb24uSEVJR0hUO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ19nZXRQYXJlbnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2dldFBhcmVudCgpIHtcbiAgICAgICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgICAgIHZhciBwYXJlbnQgPSAkKHRoaXMuX2NvbmZpZy5wYXJlbnQpWzBdO1xuICAgICAgICAgIHZhciBzZWxlY3RvciA9ICdbZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXVtkYXRhLXBhcmVudD1cIicgKyB0aGlzLl9jb25maWcucGFyZW50ICsgJ1wiXSc7XG5cbiAgICAgICAgICAkKHBhcmVudCkuZmluZChzZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoaSwgZWxlbWVudCkge1xuICAgICAgICAgICAgX3RoaXMzLl9hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3MoQ29sbGFwc2UuX2dldFRhcmdldEZyb21FbGVtZW50KGVsZW1lbnQpLCBbZWxlbWVudF0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdfYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3MoZWxlbWVudCwgdHJpZ2dlckFycmF5KSB7XG4gICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBpc09wZW4gPSAkKGVsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5JTik7XG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIGlzT3Blbik7XG5cbiAgICAgICAgICAgIGlmICh0cmlnZ2VyQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICQodHJpZ2dlckFycmF5KS50b2dnbGVDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0VELCAhaXNPcGVuKS5hdHRyKCdhcmlhLWV4cGFuZGVkJywgaXNPcGVuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdGF0aWNcblxuICAgICAgfV0sIFt7XG4gICAgICAgIGtleTogJ19nZXRUYXJnZXRGcm9tRWxlbWVudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0VGFyZ2V0RnJvbUVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICAgIHZhciBzZWxlY3RvciA9IF9VdGlsWydkZWZhdWx0J10uZ2V0U2VsZWN0b3JGcm9tRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgICByZXR1cm4gc2VsZWN0b3IgPyAkKHNlbGVjdG9yKVswXSA6IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnX2pRdWVyeUludGVyZmFjZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgICAgIHZhciBkYXRhID0gJHRoaXMuZGF0YShEQVRBX0tFWSk7XG4gICAgICAgICAgICB2YXIgX2NvbmZpZyA9ICQuZXh0ZW5kKHt9LCBEZWZhdWx0LCAkdGhpcy5kYXRhKCksIHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnICYmIGNvbmZpZyk7XG5cbiAgICAgICAgICAgIGlmICghZGF0YSAmJiBfY29uZmlnLnRvZ2dsZSAmJiAvc2hvd3xoaWRlLy50ZXN0KGNvbmZpZykpIHtcbiAgICAgICAgICAgICAgX2NvbmZpZy50b2dnbGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICAgIGRhdGEgPSBuZXcgQ29sbGFwc2UodGhpcywgX2NvbmZpZyk7XG4gICAgICAgICAgICAgICR0aGlzLmRhdGEoREFUQV9LRVksIGRhdGEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgaWYgKGRhdGFbY29uZmlnXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBtZXRob2QgbmFtZWQgXCInICsgY29uZmlnICsgJ1wiJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZGF0YVtjb25maWddKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnVkVSU0lPTicsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBWRVJTSU9OO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ0RlZmF1bHQnLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gRGVmYXVsdDtcbiAgICAgICAgfVxuICAgICAgfV0pO1xuXG4gICAgICByZXR1cm4gQ29sbGFwc2U7XG4gICAgfSkoKTtcblxuICAgICQoZG9jdW1lbnQpLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1RPR0dMRSwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB2YXIgdGFyZ2V0ID0gQ29sbGFwc2UuX2dldFRhcmdldEZyb21FbGVtZW50KHRoaXMpO1xuICAgICAgdmFyIGRhdGEgPSAkKHRhcmdldCkuZGF0YShEQVRBX0tFWSk7XG4gICAgICB2YXIgY29uZmlnID0gZGF0YSA/ICd0b2dnbGUnIDogJCh0aGlzKS5kYXRhKCk7XG5cbiAgICAgIENvbGxhcHNlLl9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkKHRhcmdldCksIGNvbmZpZyk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBqUXVlcnlcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuICAgICQuZm5bTkFNRV0gPSBDb2xsYXBzZS5falF1ZXJ5SW50ZXJmYWNlO1xuICAgICQuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBDb2xsYXBzZTtcbiAgICAkLmZuW05BTUVdLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAkLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUO1xuICAgICAgcmV0dXJuIENvbGxhcHNlLl9qUXVlcnlJbnRlcmZhY2U7XG4gICAgfTtcblxuICAgIHJldHVybiBDb2xsYXBzZTtcbiAgfSkoalF1ZXJ5KTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IENvbGxhcHNlO1xufSk7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFsnZXhwb3J0cycsICdtb2R1bGUnLCAnLi91dGlsJ10sIGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgIGZhY3RvcnkoZXhwb3J0cywgbW9kdWxlLCByZXF1aXJlKCcuL3V0aWwnKSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIG1vZCA9IHtcbiAgICAgIGV4cG9ydHM6IHt9XG4gICAgfTtcbiAgICBmYWN0b3J5KG1vZC5leHBvcnRzLCBtb2QsIGdsb2JhbC5VdGlsKTtcbiAgICBnbG9iYWwuZHJvcGRvd24gPSBtb2QuZXhwb3J0cztcbiAgfVxufSkodGhpcywgZnVuY3Rpb24gKGV4cG9ydHMsIG1vZHVsZSwgX3V0aWwpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbiAgZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG4gIGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG4gIHZhciBfVXRpbCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWwpO1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBCb290c3RyYXAgKHY0LjAuMC1hbHBoYS4yKTogZHJvcGRvd24uanNcbiAgICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgdmFyIERyb3Bkb3duID0gKGZ1bmN0aW9uICgkKSB7XG5cbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBDb25zdGFudHNcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuICAgIHZhciBOQU1FID0gJ2Ryb3Bkb3duJztcbiAgICB2YXIgVkVSU0lPTiA9ICc0LjAuMC1hbHBoYSc7XG4gICAgdmFyIERBVEFfS0VZID0gJ2JzLmRyb3Bkb3duJztcbiAgICB2YXIgRVZFTlRfS0VZID0gJy4nICsgREFUQV9LRVk7XG4gICAgdmFyIERBVEFfQVBJX0tFWSA9ICcuZGF0YS1hcGknO1xuICAgIHZhciBKUVVFUllfTk9fQ09ORkxJQ1QgPSAkLmZuW05BTUVdO1xuXG4gICAgdmFyIEV2ZW50ID0ge1xuICAgICAgSElERTogJ2hpZGUnICsgRVZFTlRfS0VZLFxuICAgICAgSElEREVOOiAnaGlkZGVuJyArIEVWRU5UX0tFWSxcbiAgICAgIFNIT1c6ICdzaG93JyArIEVWRU5UX0tFWSxcbiAgICAgIFNIT1dOOiAnc2hvd24nICsgRVZFTlRfS0VZLFxuICAgICAgQ0xJQ0s6ICdjbGljaycgKyBFVkVOVF9LRVksXG4gICAgICBDTElDS19EQVRBX0FQSTogJ2NsaWNrJyArIEVWRU5UX0tFWSArIERBVEFfQVBJX0tFWSxcbiAgICAgIEtFWURPV05fREFUQV9BUEk6ICdrZXlkb3duJyArIEVWRU5UX0tFWSArIERBVEFfQVBJX0tFWVxuICAgIH07XG5cbiAgICB2YXIgQ2xhc3NOYW1lID0ge1xuICAgICAgQkFDS0RST1A6ICdkcm9wZG93bi1iYWNrZHJvcCcsXG4gICAgICBESVNBQkxFRDogJ2Rpc2FibGVkJyxcbiAgICAgIE9QRU46ICdvcGVuJ1xuICAgIH07XG5cbiAgICB2YXIgU2VsZWN0b3IgPSB7XG4gICAgICBCQUNLRFJPUDogJy5kcm9wZG93bi1iYWNrZHJvcCcsXG4gICAgICBEQVRBX1RPR0dMRTogJ1tkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJdJyxcbiAgICAgIEZPUk1fQ0hJTEQ6ICcuZHJvcGRvd24gZm9ybScsXG4gICAgICBST0xFX01FTlU6ICdbcm9sZT1cIm1lbnVcIl0nLFxuICAgICAgUk9MRV9MSVNUQk9YOiAnW3JvbGU9XCJsaXN0Ym94XCJdJyxcbiAgICAgIE5BVkJBUl9OQVY6ICcubmF2YmFyLW5hdicsXG4gICAgICBWSVNJQkxFX0lURU1TOiAnW3JvbGU9XCJtZW51XCJdIGxpOm5vdCguZGlzYWJsZWQpIGEsICcgKyAnW3JvbGU9XCJsaXN0Ym94XCJdIGxpOm5vdCguZGlzYWJsZWQpIGEnXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIENsYXNzIERlZmluaXRpb25cbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuICAgIHZhciBEcm9wZG93biA9IChmdW5jdGlvbiAoKSB7XG4gICAgICBmdW5jdGlvbiBEcm9wZG93bihlbGVtZW50KSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBEcm9wZG93bik7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICAgICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAqIERhdGEgQXBpIGltcGxlbWVudGF0aW9uXG4gICAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAqL1xuXG4gICAgICAvLyBnZXR0ZXJzXG5cbiAgICAgIF9jcmVhdGVDbGFzcyhEcm9wZG93biwgW3tcbiAgICAgICAga2V5OiAndG9nZ2xlJyxcblxuICAgICAgICAvLyBwdWJsaWNcblxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdG9nZ2xlKCkge1xuICAgICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8ICQodGhpcykuaGFzQ2xhc3MoQ2xhc3NOYW1lLkRJU0FCTEVEKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBwYXJlbnQgPSBEcm9wZG93bi5fZ2V0UGFyZW50RnJvbUVsZW1lbnQodGhpcyk7XG4gICAgICAgICAgdmFyIGlzQWN0aXZlID0gJChwYXJlbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5PUEVOKTtcblxuICAgICAgICAgIERyb3Bkb3duLl9jbGVhck1lbnVzKCk7XG5cbiAgICAgICAgICBpZiAoaXNBY3RpdmUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmICEkKHBhcmVudCkuY2xvc2VzdChTZWxlY3Rvci5OQVZCQVJfTkFWKS5sZW5ndGgpIHtcblxuICAgICAgICAgICAgLy8gaWYgbW9iaWxlIHdlIHVzZSBhIGJhY2tkcm9wIGJlY2F1c2UgY2xpY2sgZXZlbnRzIGRvbid0IGRlbGVnYXRlXG4gICAgICAgICAgICB2YXIgZHJvcGRvd24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRyb3Bkb3duLmNsYXNzTmFtZSA9IENsYXNzTmFtZS5CQUNLRFJPUDtcbiAgICAgICAgICAgICQoZHJvcGRvd24pLmluc2VydEJlZm9yZSh0aGlzKTtcbiAgICAgICAgICAgICQoZHJvcGRvd24pLm9uKCdjbGljaycsIERyb3Bkb3duLl9jbGVhck1lbnVzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgcmVsYXRlZFRhcmdldCA9IHsgcmVsYXRlZFRhcmdldDogdGhpcyB9O1xuICAgICAgICAgIHZhciBzaG93RXZlbnQgPSAkLkV2ZW50KEV2ZW50LlNIT1csIHJlbGF0ZWRUYXJnZXQpO1xuXG4gICAgICAgICAgJChwYXJlbnQpLnRyaWdnZXIoc2hvd0V2ZW50KTtcblxuICAgICAgICAgIGlmIChzaG93RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuXG4gICAgICAgICAgJChwYXJlbnQpLnRvZ2dsZUNsYXNzKENsYXNzTmFtZS5PUEVOKTtcbiAgICAgICAgICAkKHBhcmVudCkudHJpZ2dlcigkLkV2ZW50KEV2ZW50LlNIT1dOLCByZWxhdGVkVGFyZ2V0KSk7XG5cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnZGlzcG9zZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkaXNwb3NlKCkge1xuICAgICAgICAgICQucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSk7XG4gICAgICAgICAgJCh0aGlzLl9lbGVtZW50KS5vZmYoRVZFTlRfS0VZKTtcbiAgICAgICAgICB0aGlzLl9lbGVtZW50ID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHByaXZhdGVcblxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdfYWRkRXZlbnRMaXN0ZW5lcnMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2FkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICAgICQodGhpcy5fZWxlbWVudCkub24oRXZlbnQuQ0xJQ0ssIHRoaXMudG9nZ2xlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN0YXRpY1xuXG4gICAgICB9XSwgW3tcbiAgICAgICAga2V5OiAnX2pRdWVyeUludGVyZmFjZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSAkKHRoaXMpLmRhdGEoREFUQV9LRVkpO1xuXG4gICAgICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgICAgJCh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhID0gbmV3IERyb3Bkb3duKHRoaXMpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIGlmIChkYXRhW2NvbmZpZ10gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gbWV0aG9kIG5hbWVkIFwiJyArIGNvbmZpZyArICdcIicpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRhdGFbY29uZmlnXS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ19jbGVhck1lbnVzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9jbGVhck1lbnVzKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LndoaWNoID09PSAzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGJhY2tkcm9wID0gJChTZWxlY3Rvci5CQUNLRFJPUClbMF07XG4gICAgICAgICAgaWYgKGJhY2tkcm9wKSB7XG4gICAgICAgICAgICBiYWNrZHJvcC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGJhY2tkcm9wKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgdG9nZ2xlcyA9ICQubWFrZUFycmF5KCQoU2VsZWN0b3IuREFUQV9UT0dHTEUpKTtcblxuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG9nZ2xlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIF9wYXJlbnQgPSBEcm9wZG93bi5fZ2V0UGFyZW50RnJvbUVsZW1lbnQodG9nZ2xlc1tpXSk7XG4gICAgICAgICAgICB2YXIgcmVsYXRlZFRhcmdldCA9IHsgcmVsYXRlZFRhcmdldDogdG9nZ2xlc1tpXSB9O1xuXG4gICAgICAgICAgICBpZiAoISQoX3BhcmVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLk9QRU4pKSB7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQudHlwZSA9PT0gJ2NsaWNrJyAmJiAvaW5wdXR8dGV4dGFyZWEvaS50ZXN0KGV2ZW50LnRhcmdldC50YWdOYW1lKSAmJiAkLmNvbnRhaW5zKF9wYXJlbnQsIGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBoaWRlRXZlbnQgPSAkLkV2ZW50KEV2ZW50LkhJREUsIHJlbGF0ZWRUYXJnZXQpO1xuICAgICAgICAgICAgJChfcGFyZW50KS50cmlnZ2VyKGhpZGVFdmVudCk7XG4gICAgICAgICAgICBpZiAoaGlkZUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0b2dnbGVzW2ldLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuXG4gICAgICAgICAgICAkKF9wYXJlbnQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5PUEVOKS50cmlnZ2VyKCQuRXZlbnQoRXZlbnQuSElEREVOLCByZWxhdGVkVGFyZ2V0KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ19nZXRQYXJlbnRGcm9tRWxlbWVudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0UGFyZW50RnJvbUVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICAgIHZhciBwYXJlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgdmFyIHNlbGVjdG9yID0gX1V0aWxbJ2RlZmF1bHQnXS5nZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW1lbnQpO1xuXG4gICAgICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICBwYXJlbnQgPSAkKHNlbGVjdG9yKVswXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gcGFyZW50IHx8IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdfZGF0YUFwaUtleWRvd25IYW5kbGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9kYXRhQXBpS2V5ZG93bkhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgICBpZiAoIS8oMzh8NDB8Mjd8MzIpLy50ZXN0KGV2ZW50LndoaWNoKSB8fCAvaW5wdXR8dGV4dGFyZWEvaS50ZXN0KGV2ZW50LnRhcmdldC50YWdOYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCAkKHRoaXMpLmhhc0NsYXNzKENsYXNzTmFtZS5ESVNBQkxFRCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgcGFyZW50ID0gRHJvcGRvd24uX2dldFBhcmVudEZyb21FbGVtZW50KHRoaXMpO1xuICAgICAgICAgIHZhciBpc0FjdGl2ZSA9ICQocGFyZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuT1BFTik7XG5cbiAgICAgICAgICBpZiAoIWlzQWN0aXZlICYmIGV2ZW50LndoaWNoICE9PSAyNyB8fCBpc0FjdGl2ZSAmJiBldmVudC53aGljaCA9PT0gMjcpIHtcblxuICAgICAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAyNykge1xuICAgICAgICAgICAgICB2YXIgdG9nZ2xlID0gJChwYXJlbnQpLmZpbmQoU2VsZWN0b3IuREFUQV9UT0dHTEUpWzBdO1xuICAgICAgICAgICAgICAkKHRvZ2dsZSkudHJpZ2dlcignZm9jdXMnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJCh0aGlzKS50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBpdGVtcyA9ICQubWFrZUFycmF5KCQoU2VsZWN0b3IuVklTSUJMRV9JVEVNUykpO1xuXG4gICAgICAgICAgaXRlbXMgPSBpdGVtcy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLm9mZnNldFdpZHRoIHx8IGl0ZW0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKCFpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaW5kZXggPSBpdGVtcy5pbmRleE9mKGV2ZW50LnRhcmdldCk7XG5cbiAgICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IDM4ICYmIGluZGV4ID4gMCkge1xuICAgICAgICAgICAgLy8gdXBcbiAgICAgICAgICAgIGluZGV4LS07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSA0MCAmJiBpbmRleCA8IGl0ZW1zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIC8vIGRvd25cbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCEgfmluZGV4KSB7XG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaXRlbXNbaW5kZXhdLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnVkVSU0lPTicsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBWRVJTSU9OO1xuICAgICAgICB9XG4gICAgICB9XSk7XG5cbiAgICAgIHJldHVybiBEcm9wZG93bjtcbiAgICB9KSgpO1xuXG4gICAgJChkb2N1bWVudCkub24oRXZlbnQuS0VZRE9XTl9EQVRBX0FQSSwgU2VsZWN0b3IuREFUQV9UT0dHTEUsIERyb3Bkb3duLl9kYXRhQXBpS2V5ZG93bkhhbmRsZXIpLm9uKEV2ZW50LktFWURPV05fREFUQV9BUEksIFNlbGVjdG9yLlJPTEVfTUVOVSwgRHJvcGRvd24uX2RhdGFBcGlLZXlkb3duSGFuZGxlcikub24oRXZlbnQuS0VZRE9XTl9EQVRBX0FQSSwgU2VsZWN0b3IuUk9MRV9MSVNUQk9YLCBEcm9wZG93bi5fZGF0YUFwaUtleWRvd25IYW5kbGVyKS5vbihFdmVudC5DTElDS19EQVRBX0FQSSwgRHJvcGRvd24uX2NsZWFyTWVudXMpLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1RPR0dMRSwgRHJvcGRvd24ucHJvdG90eXBlLnRvZ2dsZSkub24oRXZlbnQuQ0xJQ0tfREFUQV9BUEksIFNlbGVjdG9yLkZPUk1fQ0hJTEQsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogalF1ZXJ5XG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cbiAgICAkLmZuW05BTUVdID0gRHJvcGRvd24uX2pRdWVyeUludGVyZmFjZTtcbiAgICAkLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gRHJvcGRvd247XG4gICAgJC5mbltOQU1FXS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgJC5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVDtcbiAgICAgIHJldHVybiBEcm9wZG93bi5falF1ZXJ5SW50ZXJmYWNlO1xuICAgIH07XG5cbiAgICByZXR1cm4gRHJvcGRvd247XG4gIH0pKGpRdWVyeSk7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBEcm9wZG93bjtcbn0pO1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShbJ2V4cG9ydHMnLCAnbW9kdWxlJywgJy4vdXRpbCddLCBmYWN0b3J5KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBmYWN0b3J5KGV4cG9ydHMsIG1vZHVsZSwgcmVxdWlyZSgnLi91dGlsJykpO1xuICB9IGVsc2Uge1xuICAgIHZhciBtb2QgPSB7XG4gICAgICBleHBvcnRzOiB7fVxuICAgIH07XG4gICAgZmFjdG9yeShtb2QuZXhwb3J0cywgbW9kLCBnbG9iYWwuVXRpbCk7XG4gICAgZ2xvYmFsLm1vZGFsID0gbW9kLmV4cG9ydHM7XG4gIH1cbn0pKHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzLCBtb2R1bGUsIF91dGlsKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG4gIGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuICBmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuICB2YXIgX1V0aWwgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlsKTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwICh2NC4wLjAtYWxwaGEuMik6IG1vZGFsLmpzXG4gICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIHZhciBNb2RhbCA9IChmdW5jdGlvbiAoJCkge1xuXG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogQ29uc3RhbnRzXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cbiAgICB2YXIgTkFNRSA9ICdtb2RhbCc7XG4gICAgdmFyIFZFUlNJT04gPSAnNC4wLjAtYWxwaGEnO1xuICAgIHZhciBEQVRBX0tFWSA9ICdicy5tb2RhbCc7XG4gICAgdmFyIEVWRU5UX0tFWSA9ICcuJyArIERBVEFfS0VZO1xuICAgIHZhciBEQVRBX0FQSV9LRVkgPSAnLmRhdGEtYXBpJztcbiAgICB2YXIgSlFVRVJZX05PX0NPTkZMSUNUID0gJC5mbltOQU1FXTtcbiAgICB2YXIgVFJBTlNJVElPTl9EVVJBVElPTiA9IDMwMDtcbiAgICB2YXIgQkFDS0RST1BfVFJBTlNJVElPTl9EVVJBVElPTiA9IDE1MDtcblxuICAgIHZhciBEZWZhdWx0ID0ge1xuICAgICAgYmFja2Ryb3A6IHRydWUsXG4gICAgICBrZXlib2FyZDogdHJ1ZSxcbiAgICAgIGZvY3VzOiB0cnVlLFxuICAgICAgc2hvdzogdHJ1ZVxuICAgIH07XG5cbiAgICB2YXIgRGVmYXVsdFR5cGUgPSB7XG4gICAgICBiYWNrZHJvcDogJyhib29sZWFufHN0cmluZyknLFxuICAgICAga2V5Ym9hcmQ6ICdib29sZWFuJyxcbiAgICAgIGZvY3VzOiAnYm9vbGVhbicsXG4gICAgICBzaG93OiAnYm9vbGVhbidcbiAgICB9O1xuXG4gICAgdmFyIEV2ZW50ID0ge1xuICAgICAgSElERTogJ2hpZGUnICsgRVZFTlRfS0VZLFxuICAgICAgSElEREVOOiAnaGlkZGVuJyArIEVWRU5UX0tFWSxcbiAgICAgIFNIT1c6ICdzaG93JyArIEVWRU5UX0tFWSxcbiAgICAgIFNIT1dOOiAnc2hvd24nICsgRVZFTlRfS0VZLFxuICAgICAgRk9DVVNJTjogJ2ZvY3VzaW4nICsgRVZFTlRfS0VZLFxuICAgICAgUkVTSVpFOiAncmVzaXplJyArIEVWRU5UX0tFWSxcbiAgICAgIENMSUNLX0RJU01JU1M6ICdjbGljay5kaXNtaXNzJyArIEVWRU5UX0tFWSxcbiAgICAgIEtFWURPV05fRElTTUlTUzogJ2tleWRvd24uZGlzbWlzcycgKyBFVkVOVF9LRVksXG4gICAgICBNT1VTRVVQX0RJU01JU1M6ICdtb3VzZXVwLmRpc21pc3MnICsgRVZFTlRfS0VZLFxuICAgICAgTU9VU0VET1dOX0RJU01JU1M6ICdtb3VzZWRvd24uZGlzbWlzcycgKyBFVkVOVF9LRVksXG4gICAgICBDTElDS19EQVRBX0FQSTogJ2NsaWNrJyArIEVWRU5UX0tFWSArIERBVEFfQVBJX0tFWVxuICAgIH07XG5cbiAgICB2YXIgQ2xhc3NOYW1lID0ge1xuICAgICAgU0NST0xMQkFSX01FQVNVUkVSOiAnbW9kYWwtc2Nyb2xsYmFyLW1lYXN1cmUnLFxuICAgICAgQkFDS0RST1A6ICdtb2RhbC1iYWNrZHJvcCcsXG4gICAgICBPUEVOOiAnbW9kYWwtb3BlbicsXG4gICAgICBGQURFOiAnZmFkZScsXG4gICAgICBJTjogJ2luJ1xuICAgIH07XG5cbiAgICB2YXIgU2VsZWN0b3IgPSB7XG4gICAgICBESUFMT0c6ICcubW9kYWwtZGlhbG9nJyxcbiAgICAgIERBVEFfVE9HR0xFOiAnW2RhdGEtdG9nZ2xlPVwibW9kYWxcIl0nLFxuICAgICAgREFUQV9ESVNNSVNTOiAnW2RhdGEtZGlzbWlzcz1cIm1vZGFsXCJdJyxcbiAgICAgIEZJWEVEX0NPTlRFTlQ6ICcubmF2YmFyLWZpeGVkLXRvcCwgLm5hdmJhci1maXhlZC1ib3R0b20sIC5pcy1maXhlZCdcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG4gICAgdmFyIE1vZGFsID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgIGZ1bmN0aW9uIE1vZGFsKGVsZW1lbnQsIGNvbmZpZykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTW9kYWwpO1xuXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IHRoaXMuX2dldENvbmZpZyhjb25maWcpO1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fZGlhbG9nID0gJChlbGVtZW50KS5maW5kKFNlbGVjdG9yLkRJQUxPRylbMF07XG4gICAgICAgIHRoaXMuX2JhY2tkcm9wID0gbnVsbDtcbiAgICAgICAgdGhpcy5faXNTaG93biA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc0JvZHlPdmVyZmxvd2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pZ25vcmVCYWNrZHJvcENsaWNrID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX29yaWdpbmFsQm9keVBhZGRpbmcgPSAwO1xuICAgICAgICB0aGlzLl9zY3JvbGxiYXJXaWR0aCA9IDA7XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgKiBEYXRhIEFwaSBpbXBsZW1lbnRhdGlvblxuICAgICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgKi9cblxuICAgICAgLy8gZ2V0dGVyc1xuXG4gICAgICBfY3JlYXRlQ2xhc3MoTW9kYWwsIFt7XG4gICAgICAgIGtleTogJ3RvZ2dsZScsXG5cbiAgICAgICAgLy8gcHVibGljXG5cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHRvZ2dsZShyZWxhdGVkVGFyZ2V0KSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2lzU2hvd24gPyB0aGlzLmhpZGUoKSA6IHRoaXMuc2hvdyhyZWxhdGVkVGFyZ2V0KTtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdzaG93JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNob3cocmVsYXRlZFRhcmdldCkge1xuICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICB2YXIgc2hvd0V2ZW50ID0gJC5FdmVudChFdmVudC5TSE9XLCB7XG4gICAgICAgICAgICByZWxhdGVkVGFyZ2V0OiByZWxhdGVkVGFyZ2V0XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoc2hvd0V2ZW50KTtcblxuICAgICAgICAgIGlmICh0aGlzLl9pc1Nob3duIHx8IHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX2lzU2hvd24gPSB0cnVlO1xuXG4gICAgICAgICAgdGhpcy5fY2hlY2tTY3JvbGxiYXIoKTtcbiAgICAgICAgICB0aGlzLl9zZXRTY3JvbGxiYXIoKTtcblxuICAgICAgICAgICQoZG9jdW1lbnQuYm9keSkuYWRkQ2xhc3MoQ2xhc3NOYW1lLk9QRU4pO1xuXG4gICAgICAgICAgdGhpcy5fc2V0RXNjYXBlRXZlbnQoKTtcbiAgICAgICAgICB0aGlzLl9zZXRSZXNpemVFdmVudCgpO1xuXG4gICAgICAgICAgJCh0aGlzLl9lbGVtZW50KS5vbihFdmVudC5DTElDS19ESVNNSVNTLCBTZWxlY3Rvci5EQVRBX0RJU01JU1MsICQucHJveHkodGhpcy5oaWRlLCB0aGlzKSk7XG5cbiAgICAgICAgICAkKHRoaXMuX2RpYWxvZykub24oRXZlbnQuTU9VU0VET1dOX0RJU01JU1MsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoX3RoaXMuX2VsZW1lbnQpLm9uZShFdmVudC5NT1VTRVVQX0RJU01JU1MsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICBpZiAoJChldmVudC50YXJnZXQpLmlzKF90aGlzLl9lbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIF90aGlzLl9pZ25vcmVCYWNrZHJvcENsaWNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLl9zaG93QmFja2Ryb3AoJC5wcm94eSh0aGlzLl9zaG93RWxlbWVudCwgdGhpcywgcmVsYXRlZFRhcmdldCkpO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ2hpZGUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaGlkZShldmVudCkge1xuICAgICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaGlkZUV2ZW50ID0gJC5FdmVudChFdmVudC5ISURFKTtcblxuICAgICAgICAgICQodGhpcy5fZWxlbWVudCkudHJpZ2dlcihoaWRlRXZlbnQpO1xuXG4gICAgICAgICAgaWYgKCF0aGlzLl9pc1Nob3duIHx8IGhpZGVFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX2lzU2hvd24gPSBmYWxzZTtcblxuICAgICAgICAgIHRoaXMuX3NldEVzY2FwZUV2ZW50KCk7XG4gICAgICAgICAgdGhpcy5fc2V0UmVzaXplRXZlbnQoKTtcblxuICAgICAgICAgICQoZG9jdW1lbnQpLm9mZihFdmVudC5GT0NVU0lOKTtcblxuICAgICAgICAgICQodGhpcy5fZWxlbWVudCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLklOKTtcblxuICAgICAgICAgICQodGhpcy5fZWxlbWVudCkub2ZmKEV2ZW50LkNMSUNLX0RJU01JU1MpO1xuICAgICAgICAgICQodGhpcy5fZGlhbG9nKS5vZmYoRXZlbnQuTU9VU0VET1dOX0RJU01JU1MpO1xuXG4gICAgICAgICAgaWYgKF9VdGlsWydkZWZhdWx0J10uc3VwcG9ydHNUcmFuc2l0aW9uRW5kKCkgJiYgJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSkpIHtcblxuICAgICAgICAgICAgJCh0aGlzLl9lbGVtZW50KS5vbmUoX1V0aWxbJ2RlZmF1bHQnXS5UUkFOU0lUSU9OX0VORCwgJC5wcm94eSh0aGlzLl9oaWRlTW9kYWwsIHRoaXMpKS5lbXVsYXRlVHJhbnNpdGlvbkVuZChUUkFOU0lUSU9OX0RVUkFUSU9OKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5faGlkZU1vZGFsKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ2Rpc3Bvc2UnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgICAgICAgICAkLnJlbW92ZURhdGEodGhpcy5fZWxlbWVudCwgREFUQV9LRVkpO1xuXG4gICAgICAgICAgJCh3aW5kb3cpLm9mZihFVkVOVF9LRVkpO1xuICAgICAgICAgICQoZG9jdW1lbnQpLm9mZihFVkVOVF9LRVkpO1xuICAgICAgICAgICQodGhpcy5fZWxlbWVudCkub2ZmKEVWRU5UX0tFWSk7XG4gICAgICAgICAgJCh0aGlzLl9iYWNrZHJvcCkub2ZmKEVWRU5UX0tFWSk7XG5cbiAgICAgICAgICB0aGlzLl9jb25maWcgPSBudWxsO1xuICAgICAgICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgICAgICAgIHRoaXMuX2RpYWxvZyA9IG51bGw7XG4gICAgICAgICAgdGhpcy5fYmFja2Ryb3AgPSBudWxsO1xuICAgICAgICAgIHRoaXMuX2lzU2hvd24gPSBudWxsO1xuICAgICAgICAgIHRoaXMuX2lzQm9keU92ZXJmbG93aW5nID0gbnVsbDtcbiAgICAgICAgICB0aGlzLl9pZ25vcmVCYWNrZHJvcENsaWNrID0gbnVsbDtcbiAgICAgICAgICB0aGlzLl9vcmlnaW5hbEJvZHlQYWRkaW5nID0gbnVsbDtcbiAgICAgICAgICB0aGlzLl9zY3JvbGxiYXJXaWR0aCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwcml2YXRlXG5cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnX2dldENvbmZpZycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0Q29uZmlnKGNvbmZpZykge1xuICAgICAgICAgIGNvbmZpZyA9ICQuZXh0ZW5kKHt9LCBEZWZhdWx0LCBjb25maWcpO1xuICAgICAgICAgIF9VdGlsWydkZWZhdWx0J10udHlwZUNoZWNrQ29uZmlnKE5BTUUsIGNvbmZpZywgRGVmYXVsdFR5cGUpO1xuICAgICAgICAgIHJldHVybiBjb25maWc7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnX3Nob3dFbGVtZW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9zaG93RWxlbWVudChyZWxhdGVkVGFyZ2V0KSB7XG4gICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICB2YXIgdHJhbnNpdGlvbiA9IF9VdGlsWydkZWZhdWx0J10uc3VwcG9ydHNUcmFuc2l0aW9uRW5kKCkgJiYgJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSk7XG5cbiAgICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnQucGFyZW50Tm9kZSB8fCB0aGlzLl9lbGVtZW50LnBhcmVudE5vZGUubm9kZVR5cGUgIT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAvLyBkb24ndCBtb3ZlIG1vZGFscyBkb20gcG9zaXRpb25cbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5fZWxlbWVudCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICB0aGlzLl9lbGVtZW50LnNjcm9sbFRvcCA9IDA7XG5cbiAgICAgICAgICBpZiAodHJhbnNpdGlvbikge1xuICAgICAgICAgICAgX1V0aWxbJ2RlZmF1bHQnXS5yZWZsb3codGhpcy5fZWxlbWVudCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJCh0aGlzLl9lbGVtZW50KS5hZGRDbGFzcyhDbGFzc05hbWUuSU4pO1xuXG4gICAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5mb2N1cykge1xuICAgICAgICAgICAgdGhpcy5fZW5mb3JjZUZvY3VzKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHNob3duRXZlbnQgPSAkLkV2ZW50KEV2ZW50LlNIT1dOLCB7XG4gICAgICAgICAgICByZWxhdGVkVGFyZ2V0OiByZWxhdGVkVGFyZ2V0XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB2YXIgdHJhbnNpdGlvbkNvbXBsZXRlID0gZnVuY3Rpb24gdHJhbnNpdGlvbkNvbXBsZXRlKCkge1xuICAgICAgICAgICAgaWYgKF90aGlzMi5fY29uZmlnLmZvY3VzKSB7XG4gICAgICAgICAgICAgIF90aGlzMi5fZWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJChfdGhpczIuX2VsZW1lbnQpLnRyaWdnZXIoc2hvd25FdmVudCk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICAgICAgICAkKHRoaXMuX2RpYWxvZykub25lKF9VdGlsWydkZWZhdWx0J10uVFJBTlNJVElPTl9FTkQsIHRyYW5zaXRpb25Db21wbGV0ZSkuZW11bGF0ZVRyYW5zaXRpb25FbmQoVFJBTlNJVElPTl9EVVJBVElPTik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb25Db21wbGV0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdfZW5mb3JjZUZvY3VzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9lbmZvcmNlRm9jdXMoKSB7XG4gICAgICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgICAgICAkKGRvY3VtZW50KS5vZmYoRXZlbnQuRk9DVVNJTikgLy8gZ3VhcmQgYWdhaW5zdCBpbmZpbml0ZSBmb2N1cyBsb29wXG4gICAgICAgICAgLm9uKEV2ZW50LkZPQ1VTSU4sIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYgKF90aGlzMy5fZWxlbWVudCAhPT0gZXZlbnQudGFyZ2V0ICYmICEkKF90aGlzMy5fZWxlbWVudCkuaGFzKGV2ZW50LnRhcmdldCkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIF90aGlzMy5fZWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ19zZXRFc2NhcGVFdmVudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfc2V0RXNjYXBlRXZlbnQoKSB7XG4gICAgICAgICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICAgICAgICBpZiAodGhpcy5faXNTaG93biAmJiB0aGlzLl9jb25maWcua2V5Ym9hcmQpIHtcbiAgICAgICAgICAgICQodGhpcy5fZWxlbWVudCkub24oRXZlbnQuS0VZRE9XTl9ESVNNSVNTLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAyNykge1xuICAgICAgICAgICAgICAgIF90aGlzNC5oaWRlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX2lzU2hvd24pIHtcbiAgICAgICAgICAgICQodGhpcy5fZWxlbWVudCkub2ZmKEV2ZW50LktFWURPV05fRElTTUlTUyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ19zZXRSZXNpemVFdmVudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfc2V0UmVzaXplRXZlbnQoKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX2lzU2hvd24pIHtcbiAgICAgICAgICAgICQod2luZG93KS5vbihFdmVudC5SRVNJWkUsICQucHJveHkodGhpcy5faGFuZGxlVXBkYXRlLCB0aGlzKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQod2luZG93KS5vZmYoRXZlbnQuUkVTSVpFKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnX2hpZGVNb2RhbCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfaGlkZU1vZGFsKCkge1xuICAgICAgICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIHRoaXMuX3Nob3dCYWNrZHJvcChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKGRvY3VtZW50LmJvZHkpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5PUEVOKTtcbiAgICAgICAgICAgIF90aGlzNS5fcmVzZXRBZGp1c3RtZW50cygpO1xuICAgICAgICAgICAgX3RoaXM1Ll9yZXNldFNjcm9sbGJhcigpO1xuICAgICAgICAgICAgJChfdGhpczUuX2VsZW1lbnQpLnRyaWdnZXIoRXZlbnQuSElEREVOKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdfcmVtb3ZlQmFja2Ryb3AnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX3JlbW92ZUJhY2tkcm9wKCkge1xuICAgICAgICAgIGlmICh0aGlzLl9iYWNrZHJvcCkge1xuICAgICAgICAgICAgJCh0aGlzLl9iYWNrZHJvcCkucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLl9iYWNrZHJvcCA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ19zaG93QmFja2Ryb3AnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX3Nob3dCYWNrZHJvcChjYWxsYmFjaykge1xuICAgICAgICAgIHZhciBfdGhpczYgPSB0aGlzO1xuXG4gICAgICAgICAgdmFyIGFuaW1hdGUgPSAkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5GQURFKSA/IENsYXNzTmFtZS5GQURFIDogJyc7XG5cbiAgICAgICAgICBpZiAodGhpcy5faXNTaG93biAmJiB0aGlzLl9jb25maWcuYmFja2Ryb3ApIHtcbiAgICAgICAgICAgIHZhciBkb0FuaW1hdGUgPSBfVXRpbFsnZGVmYXVsdCddLnN1cHBvcnRzVHJhbnNpdGlvbkVuZCgpICYmIGFuaW1hdGU7XG5cbiAgICAgICAgICAgIHRoaXMuX2JhY2tkcm9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9iYWNrZHJvcC5jbGFzc05hbWUgPSBDbGFzc05hbWUuQkFDS0RST1A7XG5cbiAgICAgICAgICAgIGlmIChhbmltYXRlKSB7XG4gICAgICAgICAgICAgICQodGhpcy5fYmFja2Ryb3ApLmFkZENsYXNzKGFuaW1hdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKHRoaXMuX2JhY2tkcm9wKS5hcHBlbmRUbyhkb2N1bWVudC5ib2R5KTtcblxuICAgICAgICAgICAgJCh0aGlzLl9lbGVtZW50KS5vbihFdmVudC5DTElDS19ESVNNSVNTLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgaWYgKF90aGlzNi5faWdub3JlQmFja2Ryb3BDbGljaykge1xuICAgICAgICAgICAgICAgIF90aGlzNi5faWdub3JlQmFja2Ryb3BDbGljayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ICE9PSBldmVudC5jdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChfdGhpczYuX2NvbmZpZy5iYWNrZHJvcCA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgICAgICAgICBfdGhpczYuX2VsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfdGhpczYuaGlkZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGRvQW5pbWF0ZSkge1xuICAgICAgICAgICAgICBfVXRpbFsnZGVmYXVsdCddLnJlZmxvdyh0aGlzLl9iYWNrZHJvcCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQodGhpcy5fYmFja2Ryb3ApLmFkZENsYXNzKENsYXNzTmFtZS5JTik7XG5cbiAgICAgICAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWRvQW5pbWF0ZSkge1xuICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQodGhpcy5fYmFja2Ryb3ApLm9uZShfVXRpbFsnZGVmYXVsdCddLlRSQU5TSVRJT05fRU5ELCBjYWxsYmFjaykuZW11bGF0ZVRyYW5zaXRpb25FbmQoQkFDS0RST1BfVFJBTlNJVElPTl9EVVJBVElPTik7XG4gICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5faXNTaG93biAmJiB0aGlzLl9iYWNrZHJvcCkge1xuICAgICAgICAgICAgJCh0aGlzLl9iYWNrZHJvcCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLklOKTtcblxuICAgICAgICAgICAgdmFyIGNhbGxiYWNrUmVtb3ZlID0gZnVuY3Rpb24gY2FsbGJhY2tSZW1vdmUoKSB7XG4gICAgICAgICAgICAgIF90aGlzNi5fcmVtb3ZlQmFja2Ryb3AoKTtcbiAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKF9VdGlsWydkZWZhdWx0J10uc3VwcG9ydHNUcmFuc2l0aW9uRW5kKCkgJiYgJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSkpIHtcbiAgICAgICAgICAgICAgJCh0aGlzLl9iYWNrZHJvcCkub25lKF9VdGlsWydkZWZhdWx0J10uVFJBTlNJVElPTl9FTkQsIGNhbGxiYWNrUmVtb3ZlKS5lbXVsYXRlVHJhbnNpdGlvbkVuZChCQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrUmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIC8vIHRoZSBmb2xsb3dpbmcgbWV0aG9kcyBhcmUgdXNlZCB0byBoYW5kbGUgb3ZlcmZsb3dpbmcgbW9kYWxzXG4gICAgICAgIC8vIHRvZG8gKGZhdCk6IHRoZXNlIHNob3VsZCBwcm9iYWJseSBiZSByZWZhY3RvcmVkIG91dCBvZiBtb2RhbC5qc1xuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnX2hhbmRsZVVwZGF0ZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlVXBkYXRlKCkge1xuICAgICAgICAgIHRoaXMuX2FkanVzdERpYWxvZygpO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ19hZGp1c3REaWFsb2cnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2FkanVzdERpYWxvZygpIHtcbiAgICAgICAgICB2YXIgaXNNb2RhbE92ZXJmbG93aW5nID0gdGhpcy5fZWxlbWVudC5zY3JvbGxIZWlnaHQgPiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgICAgaWYgKCF0aGlzLl9pc0JvZHlPdmVyZmxvd2luZyAmJiBpc01vZGFsT3ZlcmZsb3dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUucGFkZGluZ0xlZnQgPSB0aGlzLl9zY3JvbGxiYXJXaWR0aCArICdweCc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuX2lzQm9keU92ZXJmbG93aW5nICYmICFpc01vZGFsT3ZlcmZsb3dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gdGhpcy5fc2Nyb2xsYmFyV2lkdGggKyAncHh+JztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnX3Jlc2V0QWRqdXN0bWVudHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX3Jlc2V0QWRqdXN0bWVudHMoKSB7XG4gICAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5wYWRkaW5nTGVmdCA9ICcnO1xuICAgICAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gJyc7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnX2NoZWNrU2Nyb2xsYmFyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9jaGVja1Njcm9sbGJhcigpIHtcbiAgICAgICAgICB2YXIgZnVsbFdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgICAgaWYgKCFmdWxsV2luZG93V2lkdGgpIHtcbiAgICAgICAgICAgIC8vIHdvcmthcm91bmQgZm9yIG1pc3Npbmcgd2luZG93LmlubmVyV2lkdGggaW4gSUU4XG4gICAgICAgICAgICB2YXIgZG9jdW1lbnRFbGVtZW50UmVjdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGZ1bGxXaW5kb3dXaWR0aCA9IGRvY3VtZW50RWxlbWVudFJlY3QucmlnaHQgLSBNYXRoLmFicyhkb2N1bWVudEVsZW1lbnRSZWN0LmxlZnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9pc0JvZHlPdmVyZmxvd2luZyA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggPCBmdWxsV2luZG93V2lkdGg7XG4gICAgICAgICAgdGhpcy5fc2Nyb2xsYmFyV2lkdGggPSB0aGlzLl9nZXRTY3JvbGxiYXJXaWR0aCgpO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ19zZXRTY3JvbGxiYXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX3NldFNjcm9sbGJhcigpIHtcbiAgICAgICAgICB2YXIgYm9keVBhZGRpbmcgPSBwYXJzZUludCgkKFNlbGVjdG9yLkZJWEVEX0NPTlRFTlQpLmNzcygncGFkZGluZy1yaWdodCcpIHx8IDAsIDEwKTtcblxuICAgICAgICAgIHRoaXMuX29yaWdpbmFsQm9keVBhZGRpbmcgPSBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCB8fCAnJztcblxuICAgICAgICAgIGlmICh0aGlzLl9pc0JvZHlPdmVyZmxvd2luZykge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSBib2R5UGFkZGluZyArIHRoaXMuX3Njcm9sbGJhcldpZHRoICsgJ3B4JztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnX3Jlc2V0U2Nyb2xsYmFyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9yZXNldFNjcm9sbGJhcigpIHtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9IHRoaXMuX29yaWdpbmFsQm9keVBhZGRpbmc7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnX2dldFNjcm9sbGJhcldpZHRoJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRTY3JvbGxiYXJXaWR0aCgpIHtcbiAgICAgICAgICAvLyB0aHggZC53YWxzaFxuICAgICAgICAgIHZhciBzY3JvbGxEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICBzY3JvbGxEaXYuY2xhc3NOYW1lID0gQ2xhc3NOYW1lLlNDUk9MTEJBUl9NRUFTVVJFUjtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcm9sbERpdik7XG4gICAgICAgICAgdmFyIHNjcm9sbGJhcldpZHRoID0gc2Nyb2xsRGl2Lm9mZnNldFdpZHRoIC0gc2Nyb2xsRGl2LmNsaWVudFdpZHRoO1xuICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoc2Nyb2xsRGl2KTtcbiAgICAgICAgICByZXR1cm4gc2Nyb2xsYmFyV2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdGF0aWNcblxuICAgICAgfV0sIFt7XG4gICAgICAgIGtleTogJ19qUXVlcnlJbnRlcmZhY2UnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2pRdWVyeUludGVyZmFjZShjb25maWcsIHJlbGF0ZWRUYXJnZXQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gJCh0aGlzKS5kYXRhKERBVEFfS0VZKTtcbiAgICAgICAgICAgIHZhciBfY29uZmlnID0gJC5leHRlbmQoe30sIE1vZGFsLkRlZmF1bHQsICQodGhpcykuZGF0YSgpLCB0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyAmJiBjb25maWcpO1xuXG4gICAgICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgICAgZGF0YSA9IG5ldyBNb2RhbCh0aGlzLCBfY29uZmlnKTtcbiAgICAgICAgICAgICAgJCh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIGlmIChkYXRhW2NvbmZpZ10gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gbWV0aG9kIG5hbWVkIFwiJyArIGNvbmZpZyArICdcIicpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRhdGFbY29uZmlnXShyZWxhdGVkVGFyZ2V0KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoX2NvbmZpZy5zaG93KSB7XG4gICAgICAgICAgICAgIGRhdGEuc2hvdyhyZWxhdGVkVGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdWRVJTSU9OJyxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIFZFUlNJT047XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnRGVmYXVsdCcsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBEZWZhdWx0O1xuICAgICAgICB9XG4gICAgICB9XSk7XG5cbiAgICAgIHJldHVybiBNb2RhbDtcbiAgICB9KSgpO1xuXG4gICAgJChkb2N1bWVudCkub24oRXZlbnQuQ0xJQ0tfREFUQV9BUEksIFNlbGVjdG9yLkRBVEFfVE9HR0xFLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHZhciBfdGhpczcgPSB0aGlzO1xuXG4gICAgICB2YXIgdGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgICAgdmFyIHNlbGVjdG9yID0gX1V0aWxbJ2RlZmF1bHQnXS5nZXRTZWxlY3RvckZyb21FbGVtZW50KHRoaXMpO1xuXG4gICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgdGFyZ2V0ID0gJChzZWxlY3RvcilbMF07XG4gICAgICB9XG5cbiAgICAgIHZhciBjb25maWcgPSAkKHRhcmdldCkuZGF0YShEQVRBX0tFWSkgPyAndG9nZ2xlJyA6ICQuZXh0ZW5kKHt9LCAkKHRhcmdldCkuZGF0YSgpLCAkKHRoaXMpLmRhdGEoKSk7XG5cbiAgICAgIGlmICh0aGlzLnRhZ05hbWUgPT09ICdBJykge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgJHRhcmdldCA9ICQodGFyZ2V0KS5vbmUoRXZlbnQuU0hPVywgZnVuY3Rpb24gKHNob3dFdmVudCkge1xuICAgICAgICBpZiAoc2hvd0V2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgLy8gb25seSByZWdpc3RlciBmb2N1cyByZXN0b3JlciBpZiBtb2RhbCB3aWxsIGFjdHVhbGx5IGdldCBzaG93blxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgICR0YXJnZXQub25lKEV2ZW50LkhJRERFTiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICgkKF90aGlzNykuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgICAgICAgIF90aGlzNy5mb2N1cygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgTW9kYWwuX2pRdWVyeUludGVyZmFjZS5jYWxsKCQodGFyZ2V0KSwgY29uZmlnLCB0aGlzKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIGpRdWVyeVxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG4gICAgJC5mbltOQU1FXSA9IE1vZGFsLl9qUXVlcnlJbnRlcmZhY2U7XG4gICAgJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IE1vZGFsO1xuICAgICQuZm5bTkFNRV0ubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1Q7XG4gICAgICByZXR1cm4gTW9kYWwuX2pRdWVyeUludGVyZmFjZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIE1vZGFsO1xuICB9KShqUXVlcnkpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gTW9kYWw7XG59KTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoWydleHBvcnRzJywgJ21vZHVsZScsICcuL3Rvb2x0aXAnXSwgZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZmFjdG9yeShleHBvcnRzLCBtb2R1bGUsIHJlcXVpcmUoJy4vdG9vbHRpcCcpKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbW9kID0ge1xuICAgICAgZXhwb3J0czoge31cbiAgICB9O1xuICAgIGZhY3RvcnkobW9kLmV4cG9ydHMsIG1vZCwgZ2xvYmFsLlRvb2x0aXApO1xuICAgIGdsb2JhbC5wb3BvdmVyID0gbW9kLmV4cG9ydHM7XG4gIH1cbn0pKHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzLCBtb2R1bGUsIF90b29sdGlwKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG4gIHZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGRlc2MgPSBwYXJlbnQgPSB1bmRlZmluZWQ7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuICBmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbiAgZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbiAgZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuICB2YXIgX1Rvb2x0aXAyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdG9vbHRpcCk7XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIEJvb3RzdHJhcCAodjQuMC4wLWFscGhhLjIpOiBwb3BvdmVyLmpzXG4gICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIHZhciBQb3BvdmVyID0gKGZ1bmN0aW9uICgkKSB7XG5cbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBDb25zdGFudHNcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuICAgIHZhciBOQU1FID0gJ3BvcG92ZXInO1xuICAgIHZhciBWRVJTSU9OID0gJzQuMC4wLWFscGhhJztcbiAgICB2YXIgREFUQV9LRVkgPSAnYnMucG9wb3Zlcic7XG4gICAgdmFyIEVWRU5UX0tFWSA9ICcuJyArIERBVEFfS0VZO1xuICAgIHZhciBKUVVFUllfTk9fQ09ORkxJQ1QgPSAkLmZuW05BTUVdO1xuXG4gICAgdmFyIERlZmF1bHQgPSAkLmV4dGVuZCh7fSwgX1Rvb2x0aXAyWydkZWZhdWx0J10uRGVmYXVsdCwge1xuICAgICAgcGxhY2VtZW50OiAncmlnaHQnLFxuICAgICAgdHJpZ2dlcjogJ2NsaWNrJyxcbiAgICAgIGNvbnRlbnQ6ICcnLFxuICAgICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwicG9wb3ZlclwiIHJvbGU9XCJ0b29sdGlwXCI+JyArICc8ZGl2IGNsYXNzPVwicG9wb3Zlci1hcnJvd1wiPjwvZGl2PicgKyAnPGgzIGNsYXNzPVwicG9wb3Zlci10aXRsZVwiPjwvaDM+JyArICc8ZGl2IGNsYXNzPVwicG9wb3Zlci1jb250ZW50XCI+PC9kaXY+PC9kaXY+J1xuICAgIH0pO1xuXG4gICAgdmFyIERlZmF1bHRUeXBlID0gJC5leHRlbmQoe30sIF9Ub29sdGlwMlsnZGVmYXVsdCddLkRlZmF1bHRUeXBlLCB7XG4gICAgICBjb250ZW50OiAnKHN0cmluZ3xlbGVtZW50fGZ1bmN0aW9uKSdcbiAgICB9KTtcblxuICAgIHZhciBDbGFzc05hbWUgPSB7XG4gICAgICBGQURFOiAnZmFkZScsXG4gICAgICBJTjogJ2luJ1xuICAgIH07XG5cbiAgICB2YXIgU2VsZWN0b3IgPSB7XG4gICAgICBUSVRMRTogJy5wb3BvdmVyLXRpdGxlJyxcbiAgICAgIENPTlRFTlQ6ICcucG9wb3Zlci1jb250ZW50JyxcbiAgICAgIEFSUk9XOiAnLnBvcG92ZXItYXJyb3cnXG4gICAgfTtcblxuICAgIHZhciBFdmVudCA9IHtcbiAgICAgIEhJREU6ICdoaWRlJyArIEVWRU5UX0tFWSxcbiAgICAgIEhJRERFTjogJ2hpZGRlbicgKyBFVkVOVF9LRVksXG4gICAgICBTSE9XOiAnc2hvdycgKyBFVkVOVF9LRVksXG4gICAgICBTSE9XTjogJ3Nob3duJyArIEVWRU5UX0tFWSxcbiAgICAgIElOU0VSVEVEOiAnaW5zZXJ0ZWQnICsgRVZFTlRfS0VZLFxuICAgICAgQ0xJQ0s6ICdjbGljaycgKyBFVkVOVF9LRVksXG4gICAgICBGT0NVU0lOOiAnZm9jdXNpbicgKyBFVkVOVF9LRVksXG4gICAgICBGT0NVU09VVDogJ2ZvY3Vzb3V0JyArIEVWRU5UX0tFWSxcbiAgICAgIE1PVVNFRU5URVI6ICdtb3VzZWVudGVyJyArIEVWRU5UX0tFWSxcbiAgICAgIE1PVVNFTEVBVkU6ICdtb3VzZWxlYXZlJyArIEVWRU5UX0tFWVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBDbGFzcyBEZWZpbml0aW9uXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cbiAgICB2YXIgUG9wb3ZlciA9IChmdW5jdGlvbiAoX1Rvb2x0aXApIHtcbiAgICAgIF9pbmhlcml0cyhQb3BvdmVyLCBfVG9vbHRpcCk7XG5cbiAgICAgIGZ1bmN0aW9uIFBvcG92ZXIoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQb3BvdmVyKTtcblxuICAgICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihQb3BvdmVyLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgKiBqUXVlcnlcbiAgICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICovXG5cbiAgICAgIF9jcmVhdGVDbGFzcyhQb3BvdmVyLCBbe1xuICAgICAgICBrZXk6ICdpc1dpdGhDb250ZW50JyxcblxuICAgICAgICAvLyBvdmVycmlkZXNcblxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaXNXaXRoQ29udGVudCgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5nZXRUaXRsZSgpIHx8IHRoaXMuX2dldENvbnRlbnQoKTtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRUaXBFbGVtZW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldFRpcEVsZW1lbnQoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudGlwID0gdGhpcy50aXAgfHwgJCh0aGlzLmNvbmZpZy50ZW1wbGF0ZSlbMF07XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2V0Q29udGVudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRDb250ZW50KCkge1xuICAgICAgICAgIHZhciAkdGlwID0gJCh0aGlzLmdldFRpcEVsZW1lbnQoKSk7XG5cbiAgICAgICAgICAvLyB3ZSB1c2UgYXBwZW5kIGZvciBodG1sIG9iamVjdHMgdG8gbWFpbnRhaW4ganMgZXZlbnRzXG4gICAgICAgICAgdGhpcy5zZXRFbGVtZW50Q29udGVudCgkdGlwLmZpbmQoU2VsZWN0b3IuVElUTEUpLCB0aGlzLmdldFRpdGxlKCkpO1xuICAgICAgICAgIHRoaXMuc2V0RWxlbWVudENvbnRlbnQoJHRpcC5maW5kKFNlbGVjdG9yLkNPTlRFTlQpLCB0aGlzLl9nZXRDb250ZW50KCkpO1xuXG4gICAgICAgICAgJHRpcC5yZW1vdmVDbGFzcyhDbGFzc05hbWUuRkFERSkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLklOKTtcblxuICAgICAgICAgIHRoaXMuY2xlYW51cFRldGhlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHJpdmF0ZVxuXG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ19nZXRDb250ZW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRDb250ZW50KCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbnRlbnQnKSB8fCAodHlwZW9mIHRoaXMuY29uZmlnLmNvbnRlbnQgPT09ICdmdW5jdGlvbicgPyB0aGlzLmNvbmZpZy5jb250ZW50LmNhbGwodGhpcy5lbGVtZW50KSA6IHRoaXMuY29uZmlnLmNvbnRlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3RhdGljXG5cbiAgICAgIH1dLCBbe1xuICAgICAgICBrZXk6ICdfalF1ZXJ5SW50ZXJmYWNlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9ICQodGhpcykuZGF0YShEQVRBX0tFWSk7XG4gICAgICAgICAgICB2YXIgX2NvbmZpZyA9IHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnID8gY29uZmlnIDogbnVsbDtcblxuICAgICAgICAgICAgaWYgKCFkYXRhICYmIC9kZXN0cm95fGhpZGUvLnRlc3QoY29uZmlnKSkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgICBkYXRhID0gbmV3IFBvcG92ZXIodGhpcywgX2NvbmZpZyk7XG4gICAgICAgICAgICAgICQodGhpcykuZGF0YShEQVRBX0tFWSwgZGF0YSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBpZiAoZGF0YVtjb25maWddID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIG1ldGhvZCBuYW1lZCBcIicgKyBjb25maWcgKyAnXCInKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBkYXRhW2NvbmZpZ10oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdWRVJTSU9OJyxcblxuICAgICAgICAvLyBnZXR0ZXJzXG5cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIFZFUlNJT047XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnRGVmYXVsdCcsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBEZWZhdWx0O1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ05BTUUnLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gTkFNRTtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdEQVRBX0tFWScsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBEQVRBX0tFWTtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdFdmVudCcsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBFdmVudDtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdFVkVOVF9LRVknLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gRVZFTlRfS0VZO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ0RlZmF1bHRUeXBlJyxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIERlZmF1bHRUeXBlO1xuICAgICAgICB9XG4gICAgICB9XSk7XG5cbiAgICAgIHJldHVybiBQb3BvdmVyO1xuICAgIH0pKF9Ub29sdGlwMlsnZGVmYXVsdCddKTtcblxuICAgICQuZm5bTkFNRV0gPSBQb3BvdmVyLl9qUXVlcnlJbnRlcmZhY2U7XG4gICAgJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IFBvcG92ZXI7XG4gICAgJC5mbltOQU1FXS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgJC5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVDtcbiAgICAgIHJldHVybiBQb3BvdmVyLl9qUXVlcnlJbnRlcmZhY2U7XG4gICAgfTtcblxuICAgIHJldHVybiBQb3BvdmVyO1xuICB9KShqUXVlcnkpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gUG9wb3Zlcjtcbn0pO1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShbJ2V4cG9ydHMnLCAnbW9kdWxlJywgJy4vdXRpbCddLCBmYWN0b3J5KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBmYWN0b3J5KGV4cG9ydHMsIG1vZHVsZSwgcmVxdWlyZSgnLi91dGlsJykpO1xuICB9IGVsc2Uge1xuICAgIHZhciBtb2QgPSB7XG4gICAgICBleHBvcnRzOiB7fVxuICAgIH07XG4gICAgZmFjdG9yeShtb2QuZXhwb3J0cywgbW9kLCBnbG9iYWwuVXRpbCk7XG4gICAgZ2xvYmFsLnNjcm9sbHNweSA9IG1vZC5leHBvcnRzO1xuICB9XG59KSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cywgbW9kdWxlLCBfdXRpbCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuICBmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbiAgZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbiAgdmFyIF9VdGlsID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbCk7XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIEJvb3RzdHJhcCAodjQuMC4wLWFscGhhLjIpOiBzY3JvbGxzcHkuanNcbiAgICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgdmFyIFNjcm9sbFNweSA9IChmdW5jdGlvbiAoJCkge1xuXG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogQ29uc3RhbnRzXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cbiAgICB2YXIgTkFNRSA9ICdzY3JvbGxzcHknO1xuICAgIHZhciBWRVJTSU9OID0gJzQuMC4wLWFscGhhJztcbiAgICB2YXIgREFUQV9LRVkgPSAnYnMuc2Nyb2xsc3B5JztcbiAgICB2YXIgRVZFTlRfS0VZID0gJy4nICsgREFUQV9LRVk7XG4gICAgdmFyIERBVEFfQVBJX0tFWSA9ICcuZGF0YS1hcGknO1xuICAgIHZhciBKUVVFUllfTk9fQ09ORkxJQ1QgPSAkLmZuW05BTUVdO1xuXG4gICAgdmFyIERlZmF1bHQgPSB7XG4gICAgICBvZmZzZXQ6IDEwLFxuICAgICAgbWV0aG9kOiAnYXV0bycsXG4gICAgICB0YXJnZXQ6ICcnXG4gICAgfTtcblxuICAgIHZhciBEZWZhdWx0VHlwZSA9IHtcbiAgICAgIG9mZnNldDogJ251bWJlcicsXG4gICAgICBtZXRob2Q6ICdzdHJpbmcnLFxuICAgICAgdGFyZ2V0OiAnKHN0cmluZ3xlbGVtZW50KSdcbiAgICB9O1xuXG4gICAgdmFyIEV2ZW50ID0ge1xuICAgICAgQUNUSVZBVEU6ICdhY3RpdmF0ZScgKyBFVkVOVF9LRVksXG4gICAgICBTQ1JPTEw6ICdzY3JvbGwnICsgRVZFTlRfS0VZLFxuICAgICAgTE9BRF9EQVRBX0FQSTogJ2xvYWQnICsgRVZFTlRfS0VZICsgREFUQV9BUElfS0VZXG4gICAgfTtcblxuICAgIHZhciBDbGFzc05hbWUgPSB7XG4gICAgICBEUk9QRE9XTl9JVEVNOiAnZHJvcGRvd24taXRlbScsXG4gICAgICBEUk9QRE9XTl9NRU5VOiAnZHJvcGRvd24tbWVudScsXG4gICAgICBOQVZfTElOSzogJ25hdi1saW5rJyxcbiAgICAgIE5BVjogJ25hdicsXG4gICAgICBBQ1RJVkU6ICdhY3RpdmUnXG4gICAgfTtcblxuICAgIHZhciBTZWxlY3RvciA9IHtcbiAgICAgIERBVEFfU1BZOiAnW2RhdGEtc3B5PVwic2Nyb2xsXCJdJyxcbiAgICAgIEFDVElWRTogJy5hY3RpdmUnLFxuICAgICAgTElTVF9JVEVNOiAnLmxpc3QtaXRlbScsXG4gICAgICBMSTogJ2xpJyxcbiAgICAgIExJX0RST1BET1dOOiAnbGkuZHJvcGRvd24nLFxuICAgICAgTkFWX0xJTktTOiAnLm5hdi1saW5rJyxcbiAgICAgIERST1BET1dOOiAnLmRyb3Bkb3duJyxcbiAgICAgIERST1BET1dOX0lURU1TOiAnLmRyb3Bkb3duLWl0ZW0nLFxuICAgICAgRFJPUERPV05fVE9HR0xFOiAnLmRyb3Bkb3duLXRvZ2dsZSdcbiAgICB9O1xuXG4gICAgdmFyIE9mZnNldE1ldGhvZCA9IHtcbiAgICAgIE9GRlNFVDogJ29mZnNldCcsXG4gICAgICBQT1NJVElPTjogJ3Bvc2l0aW9uJ1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBDbGFzcyBEZWZpbml0aW9uXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cbiAgICB2YXIgU2Nyb2xsU3B5ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgIGZ1bmN0aW9uIFNjcm9sbFNweShlbGVtZW50LCBjb25maWcpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFNjcm9sbFNweSk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX3Njcm9sbEVsZW1lbnQgPSBlbGVtZW50LnRhZ05hbWUgPT09ICdCT0RZJyA/IHdpbmRvdyA6IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IHRoaXMuX2dldENvbmZpZyhjb25maWcpO1xuICAgICAgICB0aGlzLl9zZWxlY3RvciA9IHRoaXMuX2NvbmZpZy50YXJnZXQgKyAnICcgKyBTZWxlY3Rvci5OQVZfTElOS1MgKyAnLCcgKyAodGhpcy5fY29uZmlnLnRhcmdldCArICcgJyArIFNlbGVjdG9yLkRST1BET1dOX0lURU1TKTtcbiAgICAgICAgdGhpcy5fb2Zmc2V0cyA9IFtdO1xuICAgICAgICB0aGlzLl90YXJnZXRzID0gW107XG4gICAgICAgIHRoaXMuX2FjdGl2ZVRhcmdldCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3Njcm9sbEhlaWdodCA9IDA7XG5cbiAgICAgICAgJCh0aGlzLl9zY3JvbGxFbGVtZW50KS5vbihFdmVudC5TQ1JPTEwsICQucHJveHkodGhpcy5fcHJvY2VzcywgdGhpcykpO1xuXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICB0aGlzLl9wcm9jZXNzKCk7XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgKiBEYXRhIEFwaSBpbXBsZW1lbnRhdGlvblxuICAgICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgKi9cblxuICAgICAgLy8gZ2V0dGVyc1xuXG4gICAgICBfY3JlYXRlQ2xhc3MoU2Nyb2xsU3B5LCBbe1xuICAgICAgICBrZXk6ICdyZWZyZXNoJyxcblxuICAgICAgICAvLyBwdWJsaWNcblxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVmcmVzaCgpIHtcbiAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgdmFyIGF1dG9NZXRob2QgPSB0aGlzLl9zY3JvbGxFbGVtZW50ICE9PSB0aGlzLl9zY3JvbGxFbGVtZW50LndpbmRvdyA/IE9mZnNldE1ldGhvZC5QT1NJVElPTiA6IE9mZnNldE1ldGhvZC5PRkZTRVQ7XG5cbiAgICAgICAgICB2YXIgb2Zmc2V0TWV0aG9kID0gdGhpcy5fY29uZmlnLm1ldGhvZCA9PT0gJ2F1dG8nID8gYXV0b01ldGhvZCA6IHRoaXMuX2NvbmZpZy5tZXRob2Q7XG5cbiAgICAgICAgICB2YXIgb2Zmc2V0QmFzZSA9IG9mZnNldE1ldGhvZCA9PT0gT2Zmc2V0TWV0aG9kLlBPU0lUSU9OID8gdGhpcy5fZ2V0U2Nyb2xsVG9wKCkgOiAwO1xuXG4gICAgICAgICAgdGhpcy5fb2Zmc2V0cyA9IFtdO1xuICAgICAgICAgIHRoaXMuX3RhcmdldHMgPSBbXTtcblxuICAgICAgICAgIHRoaXMuX3Njcm9sbEhlaWdodCA9IHRoaXMuX2dldFNjcm9sbEhlaWdodCgpO1xuXG4gICAgICAgICAgdmFyIHRhcmdldHMgPSAkLm1ha2VBcnJheSgkKHRoaXMuX3NlbGVjdG9yKSk7XG5cbiAgICAgICAgICB0YXJnZXRzLm1hcChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHZhciB0YXJnZXRTZWxlY3RvciA9IF9VdGlsWydkZWZhdWx0J10uZ2V0U2VsZWN0b3JGcm9tRWxlbWVudChlbGVtZW50KTtcblxuICAgICAgICAgICAgaWYgKHRhcmdldFNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgIHRhcmdldCA9ICQodGFyZ2V0U2VsZWN0b3IpWzBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGFyZ2V0ICYmICh0YXJnZXQub2Zmc2V0V2lkdGggfHwgdGFyZ2V0Lm9mZnNldEhlaWdodCkpIHtcbiAgICAgICAgICAgICAgLy8gdG9kbyAoZmF0KTogcmVtb3ZlIHNrZXRjaCByZWxpYW5jZSBvbiBqUXVlcnkgcG9zaXRpb24vb2Zmc2V0XG4gICAgICAgICAgICAgIHJldHVybiBbJCh0YXJnZXQpW29mZnNldE1ldGhvZF0oKS50b3AgKyBvZmZzZXRCYXNlLCB0YXJnZXRTZWxlY3Rvcl07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICB9KS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYVswXSAtIGJbMF07XG4gICAgICAgICAgfSkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgX3RoaXMuX29mZnNldHMucHVzaChpdGVtWzBdKTtcbiAgICAgICAgICAgIF90aGlzLl90YXJnZXRzLnB1c2goaXRlbVsxXSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnZGlzcG9zZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkaXNwb3NlKCkge1xuICAgICAgICAgICQucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSk7XG4gICAgICAgICAgJCh0aGlzLl9zY3JvbGxFbGVtZW50KS5vZmYoRVZFTlRfS0VZKTtcblxuICAgICAgICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgICAgICAgIHRoaXMuX3Njcm9sbEVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgIHRoaXMuX2NvbmZpZyA9IG51bGw7XG4gICAgICAgICAgdGhpcy5fc2VsZWN0b3IgPSBudWxsO1xuICAgICAgICAgIHRoaXMuX29mZnNldHMgPSBudWxsO1xuICAgICAgICAgIHRoaXMuX3RhcmdldHMgPSBudWxsO1xuICAgICAgICAgIHRoaXMuX2FjdGl2ZVRhcmdldCA9IG51bGw7XG4gICAgICAgICAgdGhpcy5fc2Nyb2xsSGVpZ2h0ID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHByaXZhdGVcblxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdfZ2V0Q29uZmlnJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRDb25maWcoY29uZmlnKSB7XG4gICAgICAgICAgY29uZmlnID0gJC5leHRlbmQoe30sIERlZmF1bHQsIGNvbmZpZyk7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZy50YXJnZXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB2YXIgaWQgPSAkKGNvbmZpZy50YXJnZXQpLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgICBpZiAoIWlkKSB7XG4gICAgICAgICAgICAgIGlkID0gX1V0aWxbJ2RlZmF1bHQnXS5nZXRVSUQoTkFNRSk7XG4gICAgICAgICAgICAgICQoY29uZmlnLnRhcmdldCkuYXR0cignaWQnLCBpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25maWcudGFyZ2V0ID0gJyMnICsgaWQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgX1V0aWxbJ2RlZmF1bHQnXS50eXBlQ2hlY2tDb25maWcoTkFNRSwgY29uZmlnLCBEZWZhdWx0VHlwZSk7XG5cbiAgICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ19nZXRTY3JvbGxUb3AnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2dldFNjcm9sbFRvcCgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fc2Nyb2xsRWxlbWVudCA9PT0gd2luZG93ID8gdGhpcy5fc2Nyb2xsRWxlbWVudC5zY3JvbGxZIDogdGhpcy5fc2Nyb2xsRWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnX2dldFNjcm9sbEhlaWdodCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0U2Nyb2xsSGVpZ2h0KCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9zY3JvbGxFbGVtZW50LnNjcm9sbEhlaWdodCB8fCBNYXRoLm1heChkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnX3Byb2Nlc3MnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX3Byb2Nlc3MoKSB7XG4gICAgICAgICAgdmFyIHNjcm9sbFRvcCA9IHRoaXMuX2dldFNjcm9sbFRvcCgpICsgdGhpcy5fY29uZmlnLm9mZnNldDtcbiAgICAgICAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gdGhpcy5fZ2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgICAgICAgdmFyIG1heFNjcm9sbCA9IHRoaXMuX2NvbmZpZy5vZmZzZXQgKyBzY3JvbGxIZWlnaHQgLSB0aGlzLl9zY3JvbGxFbGVtZW50Lm9mZnNldEhlaWdodDtcblxuICAgICAgICAgIGlmICh0aGlzLl9zY3JvbGxIZWlnaHQgIT09IHNjcm9sbEhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNjcm9sbFRvcCA+PSBtYXhTY3JvbGwpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSB0aGlzLl90YXJnZXRzW3RoaXMuX3RhcmdldHMubGVuZ3RoIC0gMV07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9hY3RpdmVUYXJnZXQgIT09IHRhcmdldCkge1xuICAgICAgICAgICAgICB0aGlzLl9hY3RpdmF0ZSh0YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLl9hY3RpdmVUYXJnZXQgJiYgc2Nyb2xsVG9wIDwgdGhpcy5fb2Zmc2V0c1swXSkge1xuICAgICAgICAgICAgdGhpcy5fYWN0aXZlVGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX2NsZWFyKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMuX29mZnNldHMubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgICAgICB2YXIgaXNBY3RpdmVUYXJnZXQgPSB0aGlzLl9hY3RpdmVUYXJnZXQgIT09IHRoaXMuX3RhcmdldHNbaV0gJiYgc2Nyb2xsVG9wID49IHRoaXMuX29mZnNldHNbaV0gJiYgKHRoaXMuX29mZnNldHNbaSArIDFdID09PSB1bmRlZmluZWQgfHwgc2Nyb2xsVG9wIDwgdGhpcy5fb2Zmc2V0c1tpICsgMV0pO1xuXG4gICAgICAgICAgICBpZiAoaXNBY3RpdmVUYXJnZXQpIHtcbiAgICAgICAgICAgICAgdGhpcy5fYWN0aXZhdGUodGhpcy5fdGFyZ2V0c1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ19hY3RpdmF0ZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfYWN0aXZhdGUodGFyZ2V0KSB7XG4gICAgICAgICAgdGhpcy5fYWN0aXZlVGFyZ2V0ID0gdGFyZ2V0O1xuXG4gICAgICAgICAgdGhpcy5fY2xlYXIoKTtcblxuICAgICAgICAgIHZhciBxdWVyaWVzID0gdGhpcy5fc2VsZWN0b3Iuc3BsaXQoJywnKTtcbiAgICAgICAgICBxdWVyaWVzID0gcXVlcmllcy5tYXAoZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0b3IgKyAnW2RhdGEtdGFyZ2V0PVwiJyArIHRhcmdldCArICdcIl0sJyArIChzZWxlY3RvciArICdbaHJlZj1cIicgKyB0YXJnZXQgKyAnXCJdJyk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB2YXIgJGxpbmsgPSAkKHF1ZXJpZXMuam9pbignLCcpKTtcblxuICAgICAgICAgIGlmICgkbGluay5oYXNDbGFzcyhDbGFzc05hbWUuRFJPUERPV05fSVRFTSkpIHtcbiAgICAgICAgICAgICRsaW5rLmNsb3Nlc3QoU2VsZWN0b3IuRFJPUERPV04pLmZpbmQoU2VsZWN0b3IuRFJPUERPV05fVE9HR0xFKS5hZGRDbGFzcyhDbGFzc05hbWUuQUNUSVZFKTtcbiAgICAgICAgICAgICRsaW5rLmFkZENsYXNzKENsYXNzTmFtZS5BQ1RJVkUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0b2RvIChmYXQpIHRoaXMgaXMga2luZGEgc3Vz4oCmXG4gICAgICAgICAgICAvLyByZWN1cnNpdmVseSBhZGQgYWN0aXZlcyB0byB0ZXN0ZWQgbmF2LWxpbmtzXG4gICAgICAgICAgICAkbGluay5wYXJlbnRzKFNlbGVjdG9yLkxJKS5maW5kKFNlbGVjdG9yLk5BVl9MSU5LUykuYWRkQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJCh0aGlzLl9zY3JvbGxFbGVtZW50KS50cmlnZ2VyKEV2ZW50LkFDVElWQVRFLCB7XG4gICAgICAgICAgICByZWxhdGVkVGFyZ2V0OiB0YXJnZXRcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdfY2xlYXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2NsZWFyKCkge1xuICAgICAgICAgICQodGhpcy5fc2VsZWN0b3IpLmZpbHRlcihTZWxlY3Rvci5BQ1RJVkUpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5BQ1RJVkUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3RhdGljXG5cbiAgICAgIH1dLCBbe1xuICAgICAgICBrZXk6ICdfalF1ZXJ5SW50ZXJmYWNlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9ICQodGhpcykuZGF0YShEQVRBX0tFWSk7XG4gICAgICAgICAgICB2YXIgX2NvbmZpZyA9IHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnICYmIGNvbmZpZyB8fCBudWxsO1xuXG4gICAgICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgICAgZGF0YSA9IG5ldyBTY3JvbGxTcHkodGhpcywgX2NvbmZpZyk7XG4gICAgICAgICAgICAgICQodGhpcykuZGF0YShEQVRBX0tFWSwgZGF0YSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBpZiAoZGF0YVtjb25maWddID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIG1ldGhvZCBuYW1lZCBcIicgKyBjb25maWcgKyAnXCInKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBkYXRhW2NvbmZpZ10oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdWRVJTSU9OJyxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIFZFUlNJT047XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnRGVmYXVsdCcsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBEZWZhdWx0O1xuICAgICAgICB9XG4gICAgICB9XSk7XG5cbiAgICAgIHJldHVybiBTY3JvbGxTcHk7XG4gICAgfSkoKTtcblxuICAgICQod2luZG93KS5vbihFdmVudC5MT0FEX0RBVEFfQVBJLCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc2Nyb2xsU3B5cyA9ICQubWFrZUFycmF5KCQoU2VsZWN0b3IuREFUQV9TUFkpKTtcblxuICAgICAgZm9yICh2YXIgaSA9IHNjcm9sbFNweXMubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgIHZhciAkc3B5ID0gJChzY3JvbGxTcHlzW2ldKTtcbiAgICAgICAgU2Nyb2xsU3B5Ll9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkc3B5LCAkc3B5LmRhdGEoKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBqUXVlcnlcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuICAgICQuZm5bTkFNRV0gPSBTY3JvbGxTcHkuX2pRdWVyeUludGVyZmFjZTtcbiAgICAkLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gU2Nyb2xsU3B5O1xuICAgICQuZm5bTkFNRV0ubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1Q7XG4gICAgICByZXR1cm4gU2Nyb2xsU3B5Ll9qUXVlcnlJbnRlcmZhY2U7XG4gICAgfTtcblxuICAgIHJldHVybiBTY3JvbGxTcHk7XG4gIH0pKGpRdWVyeSk7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBTY3JvbGxTcHk7XG59KTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoWydleHBvcnRzJywgJ21vZHVsZScsICcuL3V0aWwnXSwgZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZmFjdG9yeShleHBvcnRzLCBtb2R1bGUsIHJlcXVpcmUoJy4vdXRpbCcpKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbW9kID0ge1xuICAgICAgZXhwb3J0czoge31cbiAgICB9O1xuICAgIGZhY3RvcnkobW9kLmV4cG9ydHMsIG1vZCwgZ2xvYmFsLlV0aWwpO1xuICAgIGdsb2JhbC50YWIgPSBtb2QuZXhwb3J0cztcbiAgfVxufSkodGhpcywgZnVuY3Rpb24gKGV4cG9ydHMsIG1vZHVsZSwgX3V0aWwpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbiAgZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG4gIGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG4gIHZhciBfVXRpbCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWwpO1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBCb290c3RyYXAgKHY0LjAuMC1hbHBoYS4yKTogdGFiLmpzXG4gICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIHZhciBUYWIgPSAoZnVuY3Rpb24gKCQpIHtcblxuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIENvbnN0YW50c1xuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG4gICAgdmFyIE5BTUUgPSAndGFiJztcbiAgICB2YXIgVkVSU0lPTiA9ICc0LjAuMC1hbHBoYSc7XG4gICAgdmFyIERBVEFfS0VZID0gJ2JzLnRhYic7XG4gICAgdmFyIEVWRU5UX0tFWSA9ICcuJyArIERBVEFfS0VZO1xuICAgIHZhciBEQVRBX0FQSV9LRVkgPSAnLmRhdGEtYXBpJztcbiAgICB2YXIgSlFVRVJZX05PX0NPTkZMSUNUID0gJC5mbltOQU1FXTtcbiAgICB2YXIgVFJBTlNJVElPTl9EVVJBVElPTiA9IDE1MDtcblxuICAgIHZhciBFdmVudCA9IHtcbiAgICAgIEhJREU6ICdoaWRlJyArIEVWRU5UX0tFWSxcbiAgICAgIEhJRERFTjogJ2hpZGRlbicgKyBFVkVOVF9LRVksXG4gICAgICBTSE9XOiAnc2hvdycgKyBFVkVOVF9LRVksXG4gICAgICBTSE9XTjogJ3Nob3duJyArIEVWRU5UX0tFWSxcbiAgICAgIENMSUNLX0RBVEFfQVBJOiAnY2xpY2snICsgRVZFTlRfS0VZICsgREFUQV9BUElfS0VZXG4gICAgfTtcblxuICAgIHZhciBDbGFzc05hbWUgPSB7XG4gICAgICBEUk9QRE9XTl9NRU5VOiAnZHJvcGRvd24tbWVudScsXG4gICAgICBBQ1RJVkU6ICdhY3RpdmUnLFxuICAgICAgRkFERTogJ2ZhZGUnLFxuICAgICAgSU46ICdpbidcbiAgICB9O1xuXG4gICAgdmFyIFNlbGVjdG9yID0ge1xuICAgICAgQTogJ2EnLFxuICAgICAgTEk6ICdsaScsXG4gICAgICBEUk9QRE9XTjogJy5kcm9wZG93bicsXG4gICAgICBVTDogJ3VsOm5vdCguZHJvcGRvd24tbWVudSknLFxuICAgICAgRkFERV9DSElMRDogJz4gLm5hdi1pdGVtIC5mYWRlLCA+IC5mYWRlJyxcbiAgICAgIEFDVElWRTogJy5hY3RpdmUnLFxuICAgICAgQUNUSVZFX0NISUxEOiAnPiAubmF2LWl0ZW0gPiAuYWN0aXZlLCA+IC5hY3RpdmUnLFxuICAgICAgREFUQV9UT0dHTEU6ICdbZGF0YS10b2dnbGU9XCJ0YWJcIl0sIFtkYXRhLXRvZ2dsZT1cInBpbGxcIl0nLFxuICAgICAgRFJPUERPV05fVE9HR0xFOiAnLmRyb3Bkb3duLXRvZ2dsZScsXG4gICAgICBEUk9QRE9XTl9BQ1RJVkVfQ0hJTEQ6ICc+IC5kcm9wZG93bi1tZW51IC5hY3RpdmUnXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIENsYXNzIERlZmluaXRpb25cbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuICAgIHZhciBUYWIgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgZnVuY3Rpb24gVGFiKGVsZW1lbnQpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFRhYik7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgKiBEYXRhIEFwaSBpbXBsZW1lbnRhdGlvblxuICAgICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgKi9cblxuICAgICAgLy8gZ2V0dGVyc1xuXG4gICAgICBfY3JlYXRlQ2xhc3MoVGFiLCBbe1xuICAgICAgICBrZXk6ICdzaG93JyxcblxuICAgICAgICAvLyBwdWJsaWNcblxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2hvdygpIHtcbiAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgaWYgKHRoaXMuX2VsZW1lbnQucGFyZW50Tm9kZSAmJiB0aGlzLl9lbGVtZW50LnBhcmVudE5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFICYmICQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHZhciBwcmV2aW91cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB2YXIgdWxFbGVtZW50ID0gJCh0aGlzLl9lbGVtZW50KS5jbG9zZXN0KFNlbGVjdG9yLlVMKVswXTtcbiAgICAgICAgICB2YXIgc2VsZWN0b3IgPSBfVXRpbFsnZGVmYXVsdCddLmdldFNlbGVjdG9yRnJvbUVsZW1lbnQodGhpcy5fZWxlbWVudCk7XG5cbiAgICAgICAgICBpZiAodWxFbGVtZW50KSB7XG4gICAgICAgICAgICBwcmV2aW91cyA9ICQubWFrZUFycmF5KCQodWxFbGVtZW50KS5maW5kKFNlbGVjdG9yLkFDVElWRSkpO1xuICAgICAgICAgICAgcHJldmlvdXMgPSBwcmV2aW91c1twcmV2aW91cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaGlkZUV2ZW50ID0gJC5FdmVudChFdmVudC5ISURFLCB7XG4gICAgICAgICAgICByZWxhdGVkVGFyZ2V0OiB0aGlzLl9lbGVtZW50XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB2YXIgc2hvd0V2ZW50ID0gJC5FdmVudChFdmVudC5TSE9XLCB7XG4gICAgICAgICAgICByZWxhdGVkVGFyZ2V0OiBwcmV2aW91c1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKHByZXZpb3VzKSB7XG4gICAgICAgICAgICAkKHByZXZpb3VzKS50cmlnZ2VyKGhpZGVFdmVudCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKHNob3dFdmVudCk7XG5cbiAgICAgICAgICBpZiAoc2hvd0V2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpIHx8IGhpZGVFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgdGFyZ2V0ID0gJChzZWxlY3RvcilbMF07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fYWN0aXZhdGUodGhpcy5fZWxlbWVudCwgdWxFbGVtZW50KTtcblxuICAgICAgICAgIHZhciBjb21wbGV0ZSA9IGZ1bmN0aW9uIGNvbXBsZXRlKCkge1xuICAgICAgICAgICAgdmFyIGhpZGRlbkV2ZW50ID0gJC5FdmVudChFdmVudC5ISURERU4sIHtcbiAgICAgICAgICAgICAgcmVsYXRlZFRhcmdldDogX3RoaXMuX2VsZW1lbnRcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgc2hvd25FdmVudCA9ICQuRXZlbnQoRXZlbnQuU0hPV04sIHtcbiAgICAgICAgICAgICAgcmVsYXRlZFRhcmdldDogcHJldmlvdXNcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkKHByZXZpb3VzKS50cmlnZ2VyKGhpZGRlbkV2ZW50KTtcbiAgICAgICAgICAgICQoX3RoaXMuX2VsZW1lbnQpLnRyaWdnZXIoc2hvd25FdmVudCk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2YXRlKHRhcmdldCwgdGFyZ2V0LnBhcmVudE5vZGUsIGNvbXBsZXRlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29tcGxldGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnZGlzcG9zZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkaXNwb3NlKCkge1xuICAgICAgICAgICQucmVtb3ZlQ2xhc3ModGhpcy5fZWxlbWVudCwgREFUQV9LRVkpO1xuICAgICAgICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHJpdmF0ZVxuXG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ19hY3RpdmF0ZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfYWN0aXZhdGUoZWxlbWVudCwgY29udGFpbmVyLCBjYWxsYmFjaykge1xuICAgICAgICAgIHZhciBhY3RpdmUgPSAkKGNvbnRhaW5lcikuZmluZChTZWxlY3Rvci5BQ1RJVkVfQ0hJTEQpWzBdO1xuICAgICAgICAgIHZhciBpc1RyYW5zaXRpb25pbmcgPSBjYWxsYmFjayAmJiBfVXRpbFsnZGVmYXVsdCddLnN1cHBvcnRzVHJhbnNpdGlvbkVuZCgpICYmIChhY3RpdmUgJiYgJChhY3RpdmUpLmhhc0NsYXNzKENsYXNzTmFtZS5GQURFKSB8fCBCb29sZWFuKCQoY29udGFpbmVyKS5maW5kKFNlbGVjdG9yLkZBREVfQ0hJTEQpWzBdKSk7XG5cbiAgICAgICAgICB2YXIgY29tcGxldGUgPSAkLnByb3h5KHRoaXMuX3RyYW5zaXRpb25Db21wbGV0ZSwgdGhpcywgZWxlbWVudCwgYWN0aXZlLCBpc1RyYW5zaXRpb25pbmcsIGNhbGxiYWNrKTtcblxuICAgICAgICAgIGlmIChhY3RpdmUgJiYgaXNUcmFuc2l0aW9uaW5nKSB7XG4gICAgICAgICAgICAkKGFjdGl2ZSkub25lKF9VdGlsWydkZWZhdWx0J10uVFJBTlNJVElPTl9FTkQsIGNvbXBsZXRlKS5lbXVsYXRlVHJhbnNpdGlvbkVuZChUUkFOU0lUSU9OX0RVUkFUSU9OKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29tcGxldGUoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgICAgICAkKGFjdGl2ZSkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLklOKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnX3RyYW5zaXRpb25Db21wbGV0ZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfdHJhbnNpdGlvbkNvbXBsZXRlKGVsZW1lbnQsIGFjdGl2ZSwgaXNUcmFuc2l0aW9uaW5nLCBjYWxsYmFjaykge1xuICAgICAgICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgICAgICQoYWN0aXZlKS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQUNUSVZFKTtcblxuICAgICAgICAgICAgdmFyIGRyb3Bkb3duQ2hpbGQgPSAkKGFjdGl2ZSkuZmluZChTZWxlY3Rvci5EUk9QRE9XTl9BQ1RJVkVfQ0hJTEQpWzBdO1xuXG4gICAgICAgICAgICBpZiAoZHJvcGRvd25DaGlsZCkge1xuICAgICAgICAgICAgICAkKGRyb3Bkb3duQ2hpbGQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5BQ1RJVkUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhY3RpdmUuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICQoZWxlbWVudCkuYWRkQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSk7XG4gICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKTtcblxuICAgICAgICAgIGlmIChpc1RyYW5zaXRpb25pbmcpIHtcbiAgICAgICAgICAgIF9VdGlsWydkZWZhdWx0J10ucmVmbG93KGVsZW1lbnQpO1xuICAgICAgICAgICAgJChlbGVtZW50KS5hZGRDbGFzcyhDbGFzc05hbWUuSU4pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKGVsZW1lbnQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5GQURFKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZWxlbWVudC5wYXJlbnROb2RlICYmICQoZWxlbWVudC5wYXJlbnROb2RlKS5oYXNDbGFzcyhDbGFzc05hbWUuRFJPUERPV05fTUVOVSkpIHtcblxuICAgICAgICAgICAgdmFyIGRyb3Bkb3duRWxlbWVudCA9ICQoZWxlbWVudCkuY2xvc2VzdChTZWxlY3Rvci5EUk9QRE9XTilbMF07XG4gICAgICAgICAgICBpZiAoZHJvcGRvd25FbGVtZW50KSB7XG4gICAgICAgICAgICAgICQoZHJvcGRvd25FbGVtZW50KS5maW5kKFNlbGVjdG9yLkRST1BET1dOX1RPR0dMRSkuYWRkQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN0YXRpY1xuXG4gICAgICB9XSwgW3tcbiAgICAgICAga2V5OiAnX2pRdWVyeUludGVyZmFjZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgICAgIHZhciBkYXRhID0gJHRoaXMuZGF0YShEQVRBX0tFWSk7XG5cbiAgICAgICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgICBkYXRhID0gZGF0YSA9IG5ldyBUYWIodGhpcyk7XG4gICAgICAgICAgICAgICR0aGlzLmRhdGEoREFUQV9LRVksIGRhdGEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgaWYgKGRhdGFbY29uZmlnXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBtZXRob2QgbmFtZWQgXCInICsgY29uZmlnICsgJ1wiJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZGF0YVtjb25maWddKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnVkVSU0lPTicsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBWRVJTSU9OO1xuICAgICAgICB9XG4gICAgICB9XSk7XG5cbiAgICAgIHJldHVybiBUYWI7XG4gICAgfSkoKTtcblxuICAgICQoZG9jdW1lbnQpLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1RPR0dMRSwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgVGFiLl9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkKHRoaXMpLCAnc2hvdycpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICogalF1ZXJ5XG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cbiAgICAkLmZuW05BTUVdID0gVGFiLl9qUXVlcnlJbnRlcmZhY2U7XG4gICAgJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IFRhYjtcbiAgICAkLmZuW05BTUVdLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAkLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUO1xuICAgICAgcmV0dXJuIFRhYi5falF1ZXJ5SW50ZXJmYWNlO1xuICAgIH07XG5cbiAgICByZXR1cm4gVGFiO1xuICB9KShqUXVlcnkpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gVGFiO1xufSk7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFsnZXhwb3J0cycsICdtb2R1bGUnLCAnLi91dGlsJ10sIGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgIGZhY3RvcnkoZXhwb3J0cywgbW9kdWxlLCByZXF1aXJlKCcuL3V0aWwnKSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIG1vZCA9IHtcbiAgICAgIGV4cG9ydHM6IHt9XG4gICAgfTtcbiAgICBmYWN0b3J5KG1vZC5leHBvcnRzLCBtb2QsIGdsb2JhbC5VdGlsKTtcbiAgICBnbG9iYWwudG9vbHRpcCA9IG1vZC5leHBvcnRzO1xuICB9XG59KSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cywgbW9kdWxlLCBfdXRpbCkge1xuICAvKiBnbG9iYWwgVGV0aGVyICovXG5cbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbiAgZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG4gIGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG4gIHZhciBfVXRpbCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWwpO1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBCb290c3RyYXAgKHY0LjAuMC1hbHBoYS4yKTogdG9vbHRpcC5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICB2YXIgVG9vbHRpcCA9IChmdW5jdGlvbiAoJCkge1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgZm9yIFRldGhlciBkZXBlbmRlbmN5XG4gICAgICogVGV0aGVyIC0gaHR0cDovL2dpdGh1Yi5odWJzcG90LmNvbS90ZXRoZXIvXG4gICAgICovXG4gICAgaWYgKHdpbmRvdy5UZXRoZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdCb290c3RyYXAgdG9vbHRpcHMgcmVxdWlyZSBUZXRoZXIgKGh0dHA6Ly9naXRodWIuaHVic3BvdC5jb20vdGV0aGVyLyknKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBDb25zdGFudHNcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuICAgIHZhciBOQU1FID0gJ3Rvb2x0aXAnO1xuICAgIHZhciBWRVJTSU9OID0gJzQuMC4wLWFscGhhJztcbiAgICB2YXIgREFUQV9LRVkgPSAnYnMudG9vbHRpcCc7XG4gICAgdmFyIEVWRU5UX0tFWSA9ICcuJyArIERBVEFfS0VZO1xuICAgIHZhciBKUVVFUllfTk9fQ09ORkxJQ1QgPSAkLmZuW05BTUVdO1xuICAgIHZhciBUUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwO1xuICAgIHZhciBDTEFTU19QUkVGSVggPSAnYnMtdGV0aGVyJztcblxuICAgIHZhciBEZWZhdWx0ID0ge1xuICAgICAgYW5pbWF0aW9uOiB0cnVlLFxuICAgICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwidG9vbHRpcFwiIHJvbGU9XCJ0b29sdGlwXCI+JyArICc8ZGl2IGNsYXNzPVwidG9vbHRpcC1hcnJvd1wiPjwvZGl2PicgKyAnPGRpdiBjbGFzcz1cInRvb2x0aXAtaW5uZXJcIj48L2Rpdj48L2Rpdj4nLFxuICAgICAgdHJpZ2dlcjogJ2hvdmVyIGZvY3VzJyxcbiAgICAgIHRpdGxlOiAnJyxcbiAgICAgIGRlbGF5OiAwLFxuICAgICAgaHRtbDogZmFsc2UsXG4gICAgICBzZWxlY3RvcjogZmFsc2UsXG4gICAgICBwbGFjZW1lbnQ6ICd0b3AnLFxuICAgICAgb2Zmc2V0OiAnMCAwJyxcbiAgICAgIGNvbnN0cmFpbnRzOiBbXVxuICAgIH07XG5cbiAgICB2YXIgRGVmYXVsdFR5cGUgPSB7XG4gICAgICBhbmltYXRpb246ICdib29sZWFuJyxcbiAgICAgIHRlbXBsYXRlOiAnc3RyaW5nJyxcbiAgICAgIHRpdGxlOiAnKHN0cmluZ3xlbGVtZW50fGZ1bmN0aW9uKScsXG4gICAgICB0cmlnZ2VyOiAnc3RyaW5nJyxcbiAgICAgIGRlbGF5OiAnKG51bWJlcnxvYmplY3QpJyxcbiAgICAgIGh0bWw6ICdib29sZWFuJyxcbiAgICAgIHNlbGVjdG9yOiAnKHN0cmluZ3xib29sZWFuKScsXG4gICAgICBwbGFjZW1lbnQ6ICcoc3RyaW5nfGZ1bmN0aW9uKScsXG4gICAgICBvZmZzZXQ6ICdzdHJpbmcnLFxuICAgICAgY29uc3RyYWludHM6ICdhcnJheSdcbiAgICB9O1xuXG4gICAgdmFyIEF0dGFjaG1lbnRNYXAgPSB7XG4gICAgICBUT1A6ICdib3R0b20gY2VudGVyJyxcbiAgICAgIFJJR0hUOiAnbWlkZGxlIGxlZnQnLFxuICAgICAgQk9UVE9NOiAndG9wIGNlbnRlcicsXG4gICAgICBMRUZUOiAnbWlkZGxlIHJpZ2h0J1xuICAgIH07XG5cbiAgICB2YXIgSG92ZXJTdGF0ZSA9IHtcbiAgICAgIElOOiAnaW4nLFxuICAgICAgT1VUOiAnb3V0J1xuICAgIH07XG5cbiAgICB2YXIgRXZlbnQgPSB7XG4gICAgICBISURFOiAnaGlkZScgKyBFVkVOVF9LRVksXG4gICAgICBISURERU46ICdoaWRkZW4nICsgRVZFTlRfS0VZLFxuICAgICAgU0hPVzogJ3Nob3cnICsgRVZFTlRfS0VZLFxuICAgICAgU0hPV046ICdzaG93bicgKyBFVkVOVF9LRVksXG4gICAgICBJTlNFUlRFRDogJ2luc2VydGVkJyArIEVWRU5UX0tFWSxcbiAgICAgIENMSUNLOiAnY2xpY2snICsgRVZFTlRfS0VZLFxuICAgICAgRk9DVVNJTjogJ2ZvY3VzaW4nICsgRVZFTlRfS0VZLFxuICAgICAgRk9DVVNPVVQ6ICdmb2N1c291dCcgKyBFVkVOVF9LRVksXG4gICAgICBNT1VTRUVOVEVSOiAnbW91c2VlbnRlcicgKyBFVkVOVF9LRVksXG4gICAgICBNT1VTRUxFQVZFOiAnbW91c2VsZWF2ZScgKyBFVkVOVF9LRVlcbiAgICB9O1xuXG4gICAgdmFyIENsYXNzTmFtZSA9IHtcbiAgICAgIEZBREU6ICdmYWRlJyxcbiAgICAgIElOOiAnaW4nXG4gICAgfTtcblxuICAgIHZhciBTZWxlY3RvciA9IHtcbiAgICAgIFRPT0xUSVA6ICcudG9vbHRpcCcsXG4gICAgICBUT09MVElQX0lOTkVSOiAnLnRvb2x0aXAtaW5uZXInXG4gICAgfTtcblxuICAgIHZhciBUZXRoZXJDbGFzcyA9IHtcbiAgICAgIGVsZW1lbnQ6IGZhbHNlLFxuICAgICAgZW5hYmxlZDogZmFsc2VcbiAgICB9O1xuXG4gICAgdmFyIFRyaWdnZXIgPSB7XG4gICAgICBIT1ZFUjogJ2hvdmVyJyxcbiAgICAgIEZPQ1VTOiAnZm9jdXMnLFxuICAgICAgQ0xJQ0s6ICdjbGljaycsXG4gICAgICBNQU5VQUw6ICdtYW51YWwnXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIENsYXNzIERlZmluaXRpb25cbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKi9cblxuICAgIHZhciBUb29sdGlwID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgIGZ1bmN0aW9uIFRvb2x0aXAoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBUb29sdGlwKTtcblxuICAgICAgICAvLyBwcml2YXRlXG4gICAgICAgIHRoaXMuX2lzRW5hYmxlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX3RpbWVvdXQgPSAwO1xuICAgICAgICB0aGlzLl9ob3ZlclN0YXRlID0gJyc7XG4gICAgICAgIHRoaXMuX2FjdGl2ZVRyaWdnZXIgPSB7fTtcbiAgICAgICAgdGhpcy5fdGV0aGVyID0gbnVsbDtcblxuICAgICAgICAvLyBwcm90ZWN0ZWRcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5jb25maWcgPSB0aGlzLl9nZXRDb25maWcoY29uZmlnKTtcbiAgICAgICAgdGhpcy50aXAgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX3NldExpc3RlbmVycygpO1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICogalF1ZXJ5XG4gICAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAqL1xuXG4gICAgICAvLyBnZXR0ZXJzXG5cbiAgICAgIF9jcmVhdGVDbGFzcyhUb29sdGlwLCBbe1xuICAgICAgICBrZXk6ICdlbmFibGUnLFxuXG4gICAgICAgIC8vIHB1YmxpY1xuXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgICAgICAgdGhpcy5faXNFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdkaXNhYmxlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gICAgICAgICAgdGhpcy5faXNFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAndG9nZ2xlRW5hYmxlZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiB0b2dnbGVFbmFibGVkKCkge1xuICAgICAgICAgIHRoaXMuX2lzRW5hYmxlZCA9ICF0aGlzLl9pc0VuYWJsZWQ7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAndG9nZ2xlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHRvZ2dsZShldmVudCkge1xuICAgICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgdmFyIGRhdGFLZXkgPSB0aGlzLmNvbnN0cnVjdG9yLkRBVEFfS0VZO1xuICAgICAgICAgICAgdmFyIGNvbnRleHQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoZGF0YUtleSk7XG5cbiAgICAgICAgICAgIGlmICghY29udGV4dCkge1xuICAgICAgICAgICAgICBjb250ZXh0ID0gbmV3IHRoaXMuY29uc3RydWN0b3IoZXZlbnQuY3VycmVudFRhcmdldCwgdGhpcy5fZ2V0RGVsZWdhdGVDb25maWcoKSk7XG4gICAgICAgICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YShkYXRhS2V5LCBjb250ZXh0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29udGV4dC5fYWN0aXZlVHJpZ2dlci5jbGljayA9ICFjb250ZXh0Ll9hY3RpdmVUcmlnZ2VyLmNsaWNrO1xuXG4gICAgICAgICAgICBpZiAoY29udGV4dC5faXNXaXRoQWN0aXZlVHJpZ2dlcigpKSB7XG4gICAgICAgICAgICAgIGNvbnRleHQuX2VudGVyKG51bGwsIGNvbnRleHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29udGV4dC5fbGVhdmUobnVsbCwgY29udGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgaWYgKCQodGhpcy5nZXRUaXBFbGVtZW50KCkpLmhhc0NsYXNzKENsYXNzTmFtZS5JTikpIHtcbiAgICAgICAgICAgICAgdGhpcy5fbGVhdmUobnVsbCwgdGhpcyk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fZW50ZXIobnVsbCwgdGhpcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ2Rpc3Bvc2UnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZW91dCk7XG5cbiAgICAgICAgICB0aGlzLmNsZWFudXBUZXRoZXIoKTtcblxuICAgICAgICAgICQucmVtb3ZlRGF0YSh0aGlzLmVsZW1lbnQsIHRoaXMuY29uc3RydWN0b3IuREFUQV9LRVkpO1xuXG4gICAgICAgICAgJCh0aGlzLmVsZW1lbnQpLm9mZih0aGlzLmNvbnN0cnVjdG9yLkVWRU5UX0tFWSk7XG5cbiAgICAgICAgICBpZiAodGhpcy50aXApIHtcbiAgICAgICAgICAgICQodGhpcy50aXApLnJlbW92ZSgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX2lzRW5hYmxlZCA9IG51bGw7XG4gICAgICAgICAgdGhpcy5fdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgdGhpcy5faG92ZXJTdGF0ZSA9IG51bGw7XG4gICAgICAgICAgdGhpcy5fYWN0aXZlVHJpZ2dlciA9IG51bGw7XG4gICAgICAgICAgdGhpcy5fdGV0aGVyID0gbnVsbDtcblxuICAgICAgICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgdGhpcy5jb25maWcgPSBudWxsO1xuICAgICAgICAgIHRoaXMudGlwID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdzaG93JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNob3coKSB7XG4gICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgIHZhciBzaG93RXZlbnQgPSAkLkV2ZW50KHRoaXMuY29uc3RydWN0b3IuRXZlbnQuU0hPVyk7XG5cbiAgICAgICAgICBpZiAodGhpcy5pc1dpdGhDb250ZW50KCkgJiYgdGhpcy5faXNFbmFibGVkKSB7XG4gICAgICAgICAgICAkKHRoaXMuZWxlbWVudCkudHJpZ2dlcihzaG93RXZlbnQpO1xuXG4gICAgICAgICAgICB2YXIgaXNJblRoZURvbSA9ICQuY29udGFpbnModGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB0aGlzLmVsZW1lbnQpO1xuXG4gICAgICAgICAgICBpZiAoc2hvd0V2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpIHx8ICFpc0luVGhlRG9tKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHRpcCA9IHRoaXMuZ2V0VGlwRWxlbWVudCgpO1xuICAgICAgICAgICAgdmFyIHRpcElkID0gX1V0aWxbJ2RlZmF1bHQnXS5nZXRVSUQodGhpcy5jb25zdHJ1Y3Rvci5OQU1FKTtcblxuICAgICAgICAgICAgdGlwLnNldEF0dHJpYnV0ZSgnaWQnLCB0aXBJZCk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWRlc2NyaWJlZGJ5JywgdGlwSWQpO1xuXG4gICAgICAgICAgICB0aGlzLnNldENvbnRlbnQoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLmFuaW1hdGlvbikge1xuICAgICAgICAgICAgICAkKHRpcCkuYWRkQ2xhc3MoQ2xhc3NOYW1lLkZBREUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcGxhY2VtZW50ID0gdHlwZW9mIHRoaXMuY29uZmlnLnBsYWNlbWVudCA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMuY29uZmlnLnBsYWNlbWVudC5jYWxsKHRoaXMsIHRpcCwgdGhpcy5lbGVtZW50KSA6IHRoaXMuY29uZmlnLnBsYWNlbWVudDtcblxuICAgICAgICAgICAgdmFyIGF0dGFjaG1lbnQgPSB0aGlzLl9nZXRBdHRhY2htZW50KHBsYWNlbWVudCk7XG5cbiAgICAgICAgICAgICQodGlwKS5kYXRhKHRoaXMuY29uc3RydWN0b3IuREFUQV9LRVksIHRoaXMpLmFwcGVuZFRvKGRvY3VtZW50LmJvZHkpO1xuXG4gICAgICAgICAgICAkKHRoaXMuZWxlbWVudCkudHJpZ2dlcih0aGlzLmNvbnN0cnVjdG9yLkV2ZW50LklOU0VSVEVEKTtcblxuICAgICAgICAgICAgdGhpcy5fdGV0aGVyID0gbmV3IFRldGhlcih7XG4gICAgICAgICAgICAgIGF0dGFjaG1lbnQ6IGF0dGFjaG1lbnQsXG4gICAgICAgICAgICAgIGVsZW1lbnQ6IHRpcCxcbiAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLmVsZW1lbnQsXG4gICAgICAgICAgICAgIGNsYXNzZXM6IFRldGhlckNsYXNzLFxuICAgICAgICAgICAgICBjbGFzc1ByZWZpeDogQ0xBU1NfUFJFRklYLFxuICAgICAgICAgICAgICBvZmZzZXQ6IHRoaXMuY29uZmlnLm9mZnNldCxcbiAgICAgICAgICAgICAgY29uc3RyYWludHM6IHRoaXMuY29uZmlnLmNvbnN0cmFpbnRzLFxuICAgICAgICAgICAgICBhZGRUYXJnZXRDbGFzc2VzOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIF9VdGlsWydkZWZhdWx0J10ucmVmbG93KHRpcCk7XG4gICAgICAgICAgICB0aGlzLl90ZXRoZXIucG9zaXRpb24oKTtcblxuICAgICAgICAgICAgJCh0aXApLmFkZENsYXNzKENsYXNzTmFtZS5JTik7XG5cbiAgICAgICAgICAgIHZhciBjb21wbGV0ZSA9IGZ1bmN0aW9uIGNvbXBsZXRlKCkge1xuICAgICAgICAgICAgICB2YXIgcHJldkhvdmVyU3RhdGUgPSBfdGhpcy5faG92ZXJTdGF0ZTtcbiAgICAgICAgICAgICAgX3RoaXMuX2hvdmVyU3RhdGUgPSBudWxsO1xuXG4gICAgICAgICAgICAgICQoX3RoaXMuZWxlbWVudCkudHJpZ2dlcihfdGhpcy5jb25zdHJ1Y3Rvci5FdmVudC5TSE9XTik7XG5cbiAgICAgICAgICAgICAgaWYgKHByZXZIb3ZlclN0YXRlID09PSBIb3ZlclN0YXRlLk9VVCkge1xuICAgICAgICAgICAgICAgIF90aGlzLl9sZWF2ZShudWxsLCBfdGhpcyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChfVXRpbFsnZGVmYXVsdCddLnN1cHBvcnRzVHJhbnNpdGlvbkVuZCgpICYmICQodGhpcy50aXApLmhhc0NsYXNzKENsYXNzTmFtZS5GQURFKSkge1xuICAgICAgICAgICAgICAkKHRoaXMudGlwKS5vbmUoX1V0aWxbJ2RlZmF1bHQnXS5UUkFOU0lUSU9OX0VORCwgY29tcGxldGUpLmVtdWxhdGVUcmFuc2l0aW9uRW5kKFRvb2x0aXAuX1RSQU5TSVRJT05fRFVSQVRJT04pO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbXBsZXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ2hpZGUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaGlkZShjYWxsYmFjaykge1xuICAgICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgICAgdmFyIHRpcCA9IHRoaXMuZ2V0VGlwRWxlbWVudCgpO1xuICAgICAgICAgIHZhciBoaWRlRXZlbnQgPSAkLkV2ZW50KHRoaXMuY29uc3RydWN0b3IuRXZlbnQuSElERSk7XG4gICAgICAgICAgdmFyIGNvbXBsZXRlID0gZnVuY3Rpb24gY29tcGxldGUoKSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMyLl9ob3ZlclN0YXRlICE9PSBIb3ZlclN0YXRlLklOICYmIHRpcC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgIHRpcC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRpcCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF90aGlzMi5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1kZXNjcmliZWRieScpO1xuICAgICAgICAgICAgJChfdGhpczIuZWxlbWVudCkudHJpZ2dlcihfdGhpczIuY29uc3RydWN0b3IuRXZlbnQuSElEREVOKTtcbiAgICAgICAgICAgIF90aGlzMi5jbGVhbnVwVGV0aGVyKCk7XG5cbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICAkKHRoaXMuZWxlbWVudCkudHJpZ2dlcihoaWRlRXZlbnQpO1xuXG4gICAgICAgICAgaWYgKGhpZGVFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICQodGlwKS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuSU4pO1xuXG4gICAgICAgICAgaWYgKF9VdGlsWydkZWZhdWx0J10uc3VwcG9ydHNUcmFuc2l0aW9uRW5kKCkgJiYgJCh0aGlzLnRpcCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZBREUpKSB7XG5cbiAgICAgICAgICAgICQodGlwKS5vbmUoX1V0aWxbJ2RlZmF1bHQnXS5UUkFOU0lUSU9OX0VORCwgY29tcGxldGUpLmVtdWxhdGVUcmFuc2l0aW9uRW5kKFRSQU5TSVRJT05fRFVSQVRJT04pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb21wbGV0ZSgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX2hvdmVyU3RhdGUgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHByb3RlY3RlZFxuXG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ2lzV2l0aENvbnRlbnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaXNXaXRoQ29udGVudCgpIHtcbiAgICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLmdldFRpdGxlKCkpO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldFRpcEVsZW1lbnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VGlwRWxlbWVudCgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy50aXAgPSB0aGlzLnRpcCB8fCAkKHRoaXMuY29uZmlnLnRlbXBsYXRlKVswXTtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdzZXRDb250ZW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNldENvbnRlbnQoKSB7XG4gICAgICAgICAgdmFyICR0aXAgPSAkKHRoaXMuZ2V0VGlwRWxlbWVudCgpKTtcblxuICAgICAgICAgIHRoaXMuc2V0RWxlbWVudENvbnRlbnQoJHRpcC5maW5kKFNlbGVjdG9yLlRPT0xUSVBfSU5ORVIpLCB0aGlzLmdldFRpdGxlKCkpO1xuXG4gICAgICAgICAgJHRpcC5yZW1vdmVDbGFzcyhDbGFzc05hbWUuRkFERSkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLklOKTtcblxuICAgICAgICAgIHRoaXMuY2xlYW51cFRldGhlcigpO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ3NldEVsZW1lbnRDb250ZW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNldEVsZW1lbnRDb250ZW50KCRlbGVtZW50LCBjb250ZW50KSB7XG4gICAgICAgICAgdmFyIGh0bWwgPSB0aGlzLmNvbmZpZy5odG1sO1xuICAgICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ29iamVjdCcgJiYgKGNvbnRlbnQubm9kZVR5cGUgfHwgY29udGVudC5qcXVlcnkpKSB7XG4gICAgICAgICAgICAvLyBjb250ZW50IGlzIGEgRE9NIG5vZGUgb3IgYSBqUXVlcnlcbiAgICAgICAgICAgIGlmIChodG1sKSB7XG4gICAgICAgICAgICAgIGlmICghJChjb250ZW50KS5wYXJlbnQoKS5pcygkZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5lbXB0eSgpLmFwcGVuZChjb250ZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJGVsZW1lbnQudGV4dCgkKGNvbnRlbnQpLnRleHQoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRlbGVtZW50W2h0bWwgPyAnaHRtbCcgOiAndGV4dCddKGNvbnRlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRUaXRsZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRUaXRsZSgpIHtcbiAgICAgICAgICB2YXIgdGl0bGUgPSB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLW9yaWdpbmFsLXRpdGxlJyk7XG5cbiAgICAgICAgICBpZiAoIXRpdGxlKSB7XG4gICAgICAgICAgICB0aXRsZSA9IHR5cGVvZiB0aGlzLmNvbmZpZy50aXRsZSA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMuY29uZmlnLnRpdGxlLmNhbGwodGhpcy5lbGVtZW50KSA6IHRoaXMuY29uZmlnLnRpdGxlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0aXRsZTtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdjbGVhbnVwVGV0aGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNsZWFudXBUZXRoZXIoKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX3RldGhlcikge1xuICAgICAgICAgICAgdGhpcy5fdGV0aGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwcml2YXRlXG5cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnX2dldEF0dGFjaG1lbnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2dldEF0dGFjaG1lbnQocGxhY2VtZW50KSB7XG4gICAgICAgICAgcmV0dXJuIEF0dGFjaG1lbnRNYXBbcGxhY2VtZW50LnRvVXBwZXJDYXNlKCldO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ19zZXRMaXN0ZW5lcnMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX3NldExpc3RlbmVycygpIHtcbiAgICAgICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgICAgIHZhciB0cmlnZ2VycyA9IHRoaXMuY29uZmlnLnRyaWdnZXIuc3BsaXQoJyAnKTtcblxuICAgICAgICAgIHRyaWdnZXJzLmZvckVhY2goZnVuY3Rpb24gKHRyaWdnZXIpIHtcbiAgICAgICAgICAgIGlmICh0cmlnZ2VyID09PSAnY2xpY2snKSB7XG4gICAgICAgICAgICAgICQoX3RoaXMzLmVsZW1lbnQpLm9uKF90aGlzMy5jb25zdHJ1Y3Rvci5FdmVudC5DTElDSywgX3RoaXMzLmNvbmZpZy5zZWxlY3RvciwgJC5wcm94eShfdGhpczMudG9nZ2xlLCBfdGhpczMpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHJpZ2dlciAhPT0gVHJpZ2dlci5NQU5VQUwpIHtcbiAgICAgICAgICAgICAgdmFyIGV2ZW50SW4gPSB0cmlnZ2VyID09PSBUcmlnZ2VyLkhPVkVSID8gX3RoaXMzLmNvbnN0cnVjdG9yLkV2ZW50Lk1PVVNFRU5URVIgOiBfdGhpczMuY29uc3RydWN0b3IuRXZlbnQuRk9DVVNJTjtcbiAgICAgICAgICAgICAgdmFyIGV2ZW50T3V0ID0gdHJpZ2dlciA9PT0gVHJpZ2dlci5IT1ZFUiA/IF90aGlzMy5jb25zdHJ1Y3Rvci5FdmVudC5NT1VTRUxFQVZFIDogX3RoaXMzLmNvbnN0cnVjdG9yLkV2ZW50LkZPQ1VTT1VUO1xuXG4gICAgICAgICAgICAgICQoX3RoaXMzLmVsZW1lbnQpLm9uKGV2ZW50SW4sIF90aGlzMy5jb25maWcuc2VsZWN0b3IsICQucHJveHkoX3RoaXMzLl9lbnRlciwgX3RoaXMzKSkub24oZXZlbnRPdXQsIF90aGlzMy5jb25maWcuc2VsZWN0b3IsICQucHJveHkoX3RoaXMzLl9sZWF2ZSwgX3RoaXMzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAodGhpcy5jb25maWcuc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnID0gJC5leHRlbmQoe30sIHRoaXMuY29uZmlnLCB7XG4gICAgICAgICAgICAgIHRyaWdnZXI6ICdtYW51YWwnLFxuICAgICAgICAgICAgICBzZWxlY3RvcjogJydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9maXhUaXRsZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdfZml4VGl0bGUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2ZpeFRpdGxlKCkge1xuICAgICAgICAgIHZhciB0aXRsZVR5cGUgPSB0eXBlb2YgdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1vcmlnaW5hbC10aXRsZScpO1xuICAgICAgICAgIGlmICh0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0aXRsZScpIHx8IHRpdGxlVHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtb3JpZ2luYWwtdGl0bGUnLCB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0aXRsZScpIHx8ICcnKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdfZW50ZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2VudGVyKGV2ZW50LCBjb250ZXh0KSB7XG4gICAgICAgICAgdmFyIGRhdGFLZXkgPSB0aGlzLmNvbnN0cnVjdG9yLkRBVEFfS0VZO1xuXG4gICAgICAgICAgY29udGV4dCA9IGNvbnRleHQgfHwgJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKGRhdGFLZXkpO1xuXG4gICAgICAgICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICAgICAgICBjb250ZXh0ID0gbmV3IHRoaXMuY29uc3RydWN0b3IoZXZlbnQuY3VycmVudFRhcmdldCwgdGhpcy5fZ2V0RGVsZWdhdGVDb25maWcoKSk7XG4gICAgICAgICAgICAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoZGF0YUtleSwgY29udGV4dCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICBjb250ZXh0Ll9hY3RpdmVUcmlnZ2VyW2V2ZW50LnR5cGUgPT09ICdmb2N1c2luJyA/IFRyaWdnZXIuRk9DVVMgOiBUcmlnZ2VyLkhPVkVSXSA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCQoY29udGV4dC5nZXRUaXBFbGVtZW50KCkpLmhhc0NsYXNzKENsYXNzTmFtZS5JTikgfHwgY29udGV4dC5faG92ZXJTdGF0ZSA9PT0gSG92ZXJTdGF0ZS5JTikge1xuICAgICAgICAgICAgY29udGV4dC5faG92ZXJTdGF0ZSA9IEhvdmVyU3RhdGUuSU47XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KGNvbnRleHQuX3RpbWVvdXQpO1xuXG4gICAgICAgICAgY29udGV4dC5faG92ZXJTdGF0ZSA9IEhvdmVyU3RhdGUuSU47XG5cbiAgICAgICAgICBpZiAoIWNvbnRleHQuY29uZmlnLmRlbGF5IHx8ICFjb250ZXh0LmNvbmZpZy5kZWxheS5zaG93KSB7XG4gICAgICAgICAgICBjb250ZXh0LnNob3coKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0Ll90aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoY29udGV4dC5faG92ZXJTdGF0ZSA9PT0gSG92ZXJTdGF0ZS5JTikge1xuICAgICAgICAgICAgICBjb250ZXh0LnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBjb250ZXh0LmNvbmZpZy5kZWxheS5zaG93KTtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdfbGVhdmUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2xlYXZlKGV2ZW50LCBjb250ZXh0KSB7XG4gICAgICAgICAgdmFyIGRhdGFLZXkgPSB0aGlzLmNvbnN0cnVjdG9yLkRBVEFfS0VZO1xuXG4gICAgICAgICAgY29udGV4dCA9IGNvbnRleHQgfHwgJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKGRhdGFLZXkpO1xuXG4gICAgICAgICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICAgICAgICBjb250ZXh0ID0gbmV3IHRoaXMuY29uc3RydWN0b3IoZXZlbnQuY3VycmVudFRhcmdldCwgdGhpcy5fZ2V0RGVsZWdhdGVDb25maWcoKSk7XG4gICAgICAgICAgICAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoZGF0YUtleSwgY29udGV4dCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICBjb250ZXh0Ll9hY3RpdmVUcmlnZ2VyW2V2ZW50LnR5cGUgPT09ICdmb2N1c291dCcgPyBUcmlnZ2VyLkZPQ1VTIDogVHJpZ2dlci5IT1ZFUl0gPSBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5faXNXaXRoQWN0aXZlVHJpZ2dlcigpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KGNvbnRleHQuX3RpbWVvdXQpO1xuXG4gICAgICAgICAgY29udGV4dC5faG92ZXJTdGF0ZSA9IEhvdmVyU3RhdGUuT1VUO1xuXG4gICAgICAgICAgaWYgKCFjb250ZXh0LmNvbmZpZy5kZWxheSB8fCAhY29udGV4dC5jb25maWcuZGVsYXkuaGlkZSkge1xuICAgICAgICAgICAgY29udGV4dC5oaWRlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5fdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGNvbnRleHQuX2hvdmVyU3RhdGUgPT09IEhvdmVyU3RhdGUuT1VUKSB7XG4gICAgICAgICAgICAgIGNvbnRleHQuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGNvbnRleHQuY29uZmlnLmRlbGF5LmhpZGUpO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ19pc1dpdGhBY3RpdmVUcmlnZ2VyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9pc1dpdGhBY3RpdmVUcmlnZ2VyKCkge1xuICAgICAgICAgIGZvciAodmFyIHRyaWdnZXIgaW4gdGhpcy5fYWN0aXZlVHJpZ2dlcikge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZVRyaWdnZXJbdHJpZ2dlcl0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ19nZXRDb25maWcnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2dldENvbmZpZyhjb25maWcpIHtcbiAgICAgICAgICBjb25maWcgPSAkLmV4dGVuZCh7fSwgdGhpcy5jb25zdHJ1Y3Rvci5EZWZhdWx0LCAkKHRoaXMuZWxlbWVudCkuZGF0YSgpLCBjb25maWcpO1xuXG4gICAgICAgICAgaWYgKGNvbmZpZy5kZWxheSAmJiB0eXBlb2YgY29uZmlnLmRlbGF5ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgY29uZmlnLmRlbGF5ID0ge1xuICAgICAgICAgICAgICBzaG93OiBjb25maWcuZGVsYXksXG4gICAgICAgICAgICAgIGhpZGU6IGNvbmZpZy5kZWxheVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBfVXRpbFsnZGVmYXVsdCddLnR5cGVDaGVja0NvbmZpZyhOQU1FLCBjb25maWcsIHRoaXMuY29uc3RydWN0b3IuRGVmYXVsdFR5cGUpO1xuXG4gICAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdfZ2V0RGVsZWdhdGVDb25maWcnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2dldERlbGVnYXRlQ29uZmlnKCkge1xuICAgICAgICAgIHZhciBjb25maWcgPSB7fTtcblxuICAgICAgICAgIGlmICh0aGlzLmNvbmZpZykge1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuY29uZmlnKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmNvbnN0cnVjdG9yLkRlZmF1bHRba2V5XSAhPT0gdGhpcy5jb25maWdba2V5XSkge1xuICAgICAgICAgICAgICAgIGNvbmZpZ1trZXldID0gdGhpcy5jb25maWdba2V5XTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBjb25maWc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdGF0aWNcblxuICAgICAgfV0sIFt7XG4gICAgICAgIGtleTogJ19qUXVlcnlJbnRlcmZhY2UnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2pRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gJCh0aGlzKS5kYXRhKERBVEFfS0VZKTtcbiAgICAgICAgICAgIHZhciBfY29uZmlnID0gdHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcgPyBjb25maWcgOiBudWxsO1xuXG4gICAgICAgICAgICBpZiAoIWRhdGEgJiYgL2Rlc3Ryb3l8aGlkZS8udGVzdChjb25maWcpKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICAgIGRhdGEgPSBuZXcgVG9vbHRpcCh0aGlzLCBfY29uZmlnKTtcbiAgICAgICAgICAgICAgJCh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIGlmIChkYXRhW2NvbmZpZ10gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gbWV0aG9kIG5hbWVkIFwiJyArIGNvbmZpZyArICdcIicpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRhdGFbY29uZmlnXSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ1ZFUlNJT04nLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gVkVSU0lPTjtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdEZWZhdWx0JyxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIERlZmF1bHQ7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnTkFNRScsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBOQU1FO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ0RBVEFfS0VZJyxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIERBVEFfS0VZO1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ0V2ZW50JyxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIEV2ZW50O1xuICAgICAgICB9XG4gICAgICB9LCB7XG4gICAgICAgIGtleTogJ0VWRU5UX0tFWScsXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgIHJldHVybiBFVkVOVF9LRVk7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnRGVmYXVsdFR5cGUnLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICByZXR1cm4gRGVmYXVsdFR5cGU7XG4gICAgICAgIH1cbiAgICAgIH1dKTtcblxuICAgICAgcmV0dXJuIFRvb2x0aXA7XG4gICAgfSkoKTtcblxuICAgICQuZm5bTkFNRV0gPSBUb29sdGlwLl9qUXVlcnlJbnRlcmZhY2U7XG4gICAgJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IFRvb2x0aXA7XG4gICAgJC5mbltOQU1FXS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgJC5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVDtcbiAgICAgIHJldHVybiBUb29sdGlwLl9qUXVlcnlJbnRlcmZhY2U7XG4gICAgfTtcblxuICAgIHJldHVybiBUb29sdGlwO1xuICB9KShqUXVlcnkpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gVG9vbHRpcDtcbn0pO1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShbJ2V4cG9ydHMnLCAnbW9kdWxlJ10sIGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgIGZhY3RvcnkoZXhwb3J0cywgbW9kdWxlKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbW9kID0ge1xuICAgICAgZXhwb3J0czoge31cbiAgICB9O1xuICAgIGZhY3RvcnkobW9kLmV4cG9ydHMsIG1vZCk7XG4gICAgZ2xvYmFsLnV0aWwgPSBtb2QuZXhwb3J0cztcbiAgfVxufSkodGhpcywgZnVuY3Rpb24gKGV4cG9ydHMsIG1vZHVsZSkge1xuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwICh2NC4wLjAtYWxwaGEuMik6IHV0aWwuanNcbiAgICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBVdGlsID0gKGZ1bmN0aW9uICgkKSB7XG5cbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiBQcml2YXRlIFRyYW5zaXRpb25FbmQgSGVscGVyc1xuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqL1xuXG4gICAgdmFyIHRyYW5zaXRpb24gPSBmYWxzZTtcblxuICAgIHZhciBUcmFuc2l0aW9uRW5kRXZlbnQgPSB7XG4gICAgICBXZWJraXRUcmFuc2l0aW9uOiAnd2Via2l0VHJhbnNpdGlvbkVuZCcsXG4gICAgICBNb3pUcmFuc2l0aW9uOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgICBPVHJhbnNpdGlvbjogJ29UcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kJyxcbiAgICAgIHRyYW5zaXRpb246ICd0cmFuc2l0aW9uZW5kJ1xuICAgIH07XG5cbiAgICAvLyBzaG91dG91dCBBbmd1c0Nyb2xsIChodHRwczovL2dvby5nbC9weHdRR3ApXG4gICAgZnVuY3Rpb24gdG9UeXBlKG9iaikge1xuICAgICAgcmV0dXJuICh7fSkudG9TdHJpbmcuY2FsbChvYmopLm1hdGNoKC9cXHMoW2EtekEtWl0rKS8pWzFdLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNFbGVtZW50KG9iaikge1xuICAgICAgcmV0dXJuIChvYmpbMF0gfHwgb2JqKS5ub2RlVHlwZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTcGVjaWFsVHJhbnNpdGlvbkVuZEV2ZW50KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYmluZFR5cGU6IHRyYW5zaXRpb24uZW5kLFxuICAgICAgICBkZWxlZ2F0ZVR5cGU6IHRyYW5zaXRpb24uZW5kLFxuICAgICAgICBoYW5kbGU6IGZ1bmN0aW9uIGhhbmRsZShldmVudCkge1xuICAgICAgICAgIGlmICgkKGV2ZW50LnRhcmdldCkuaXModGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiBldmVudC5oYW5kbGVPYmouaGFuZGxlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2l0aW9uRW5kVGVzdCgpIHtcbiAgICAgIGlmICh3aW5kb3cuUVVuaXQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdib290c3RyYXAnKTtcblxuICAgICAgZm9yICh2YXIgX25hbWUgaW4gVHJhbnNpdGlvbkVuZEV2ZW50KSB7XG4gICAgICAgIGlmIChlbC5zdHlsZVtfbmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiB7IGVuZDogVHJhbnNpdGlvbkVuZEV2ZW50W19uYW1lXSB9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2l0aW9uRW5kRW11bGF0b3IoZHVyYXRpb24pIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHZhciBjYWxsZWQgPSBmYWxzZTtcblxuICAgICAgJCh0aGlzKS5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgZnVuY3Rpb24gKCkge1xuICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgfSk7XG5cbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWNhbGxlZCkge1xuICAgICAgICAgIFV0aWwudHJpZ2dlclRyYW5zaXRpb25FbmQoX3RoaXMpO1xuICAgICAgICB9XG4gICAgICB9LCBkdXJhdGlvbik7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFRyYW5zaXRpb25FbmRTdXBwb3J0KCkge1xuICAgICAgdHJhbnNpdGlvbiA9IHRyYW5zaXRpb25FbmRUZXN0KCk7XG5cbiAgICAgICQuZm4uZW11bGF0ZVRyYW5zaXRpb25FbmQgPSB0cmFuc2l0aW9uRW5kRW11bGF0b3I7XG5cbiAgICAgIGlmIChVdGlsLnN1cHBvcnRzVHJhbnNpdGlvbkVuZCgpKSB7XG4gICAgICAgICQuZXZlbnQuc3BlY2lhbFtVdGlsLlRSQU5TSVRJT05fRU5EXSA9IGdldFNwZWNpYWxUcmFuc2l0aW9uRW5kRXZlbnQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqIFB1YmxpYyBVdGlsIEFwaVxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICovXG5cbiAgICB2YXIgVXRpbCA9IHtcblxuICAgICAgVFJBTlNJVElPTl9FTkQ6ICdic1RyYW5zaXRpb25FbmQnLFxuXG4gICAgICBnZXRVSUQ6IGZ1bmN0aW9uIGdldFVJRChwcmVmaXgpIHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgIHByZWZpeCArPSB+IH4oTWF0aC5yYW5kb20oKSAqIDEwMDAwMDApOyAvLyBcIn5+XCIgYWN0cyBsaWtlIGEgZmFzdGVyIE1hdGguZmxvb3IoKSBoZXJlXG4gICAgICAgIH0gd2hpbGUgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHByZWZpeCkpO1xuICAgICAgICByZXR1cm4gcHJlZml4O1xuICAgICAgfSxcblxuICAgICAgZ2V0U2VsZWN0b3JGcm9tRWxlbWVudDogZnVuY3Rpb24gZ2V0U2VsZWN0b3JGcm9tRWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIHZhciBzZWxlY3RvciA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpO1xuXG4gICAgICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgICAgICBzZWxlY3RvciA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgJyc7XG4gICAgICAgICAgc2VsZWN0b3IgPSAvXiNbYS16XS9pLnRlc3Qoc2VsZWN0b3IpID8gc2VsZWN0b3IgOiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yO1xuICAgICAgfSxcblxuICAgICAgcmVmbG93OiBmdW5jdGlvbiByZWZsb3coZWxlbWVudCkge1xuICAgICAgICBuZXcgRnVuY3Rpb24oJ2JzJywgJ3JldHVybiBicycpKGVsZW1lbnQub2Zmc2V0SGVpZ2h0KTtcbiAgICAgIH0sXG5cbiAgICAgIHRyaWdnZXJUcmFuc2l0aW9uRW5kOiBmdW5jdGlvbiB0cmlnZ2VyVHJhbnNpdGlvbkVuZChlbGVtZW50KSB7XG4gICAgICAgICQoZWxlbWVudCkudHJpZ2dlcih0cmFuc2l0aW9uLmVuZCk7XG4gICAgICB9LFxuXG4gICAgICBzdXBwb3J0c1RyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uIHN1cHBvcnRzVHJhbnNpdGlvbkVuZCgpIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4odHJhbnNpdGlvbik7XG4gICAgICB9LFxuXG4gICAgICB0eXBlQ2hlY2tDb25maWc6IGZ1bmN0aW9uIHR5cGVDaGVja0NvbmZpZyhjb21wb25lbnROYW1lLCBjb25maWcsIGNvbmZpZ1R5cGVzKSB7XG4gICAgICAgIGZvciAodmFyIHByb3BlcnR5IGluIGNvbmZpZ1R5cGVzKSB7XG4gICAgICAgICAgaWYgKGNvbmZpZ1R5cGVzLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgICAgICAgdmFyIGV4cGVjdGVkVHlwZXMgPSBjb25maWdUeXBlc1twcm9wZXJ0eV07XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBjb25maWdbcHJvcGVydHldO1xuICAgICAgICAgICAgdmFyIHZhbHVlVHlwZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgaWYgKHZhbHVlICYmIGlzRWxlbWVudCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgdmFsdWVUeXBlID0gJ2VsZW1lbnQnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdmFsdWVUeXBlID0gdG9UeXBlKHZhbHVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFuZXcgUmVnRXhwKGV4cGVjdGVkVHlwZXMpLnRlc3QodmFsdWVUeXBlKSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoY29tcG9uZW50TmFtZS50b1VwcGVyQ2FzZSgpICsgJzogJyArICgnT3B0aW9uIFwiJyArIHByb3BlcnR5ICsgJ1wiIHByb3ZpZGVkIHR5cGUgXCInICsgdmFsdWVUeXBlICsgJ1wiICcpICsgKCdidXQgZXhwZWN0ZWQgdHlwZSBcIicgKyBleHBlY3RlZFR5cGVzICsgJ1wiLicpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2V0VHJhbnNpdGlvbkVuZFN1cHBvcnQoKTtcblxuICAgIHJldHVybiBVdGlsO1xuICB9KShqUXVlcnkpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gVXRpbDtcbn0pO1xuIl19
