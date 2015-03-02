(function() {
  (function(factory) {
    if (typeof define === 'function' && define.amd) {
      define(['jquery'], factory);
    } else {
      factory(jQuery);
    }
  })(function($) {
    var Tab, Tabs, prefix;
    Tab = (function() {
      function Tab(toggle, tab1, tabs) {
        this.toggle = toggle;
        this.tab = tab1;
        this.tabs = tabs;
        this.activeToggleClass = "tabs__toggle_active";
        this.activeTabClass = "tabs__tab_active";
        this.toggle.click((function(_this) {
          return function() {
            return _this.tabs.changeActive(_this);
          };
        })(this));
      }

      Tab.prototype.setActive = function() {
        this.toggle.addClass(this.activeToggleClass);
        this.tab.addClass(this.activeTabClass);
        this.tab.show();
      };

      Tab.prototype.setInactive = function() {
        this.toggle.removeClass(this.activeToggleClass);
        this.tab.removeClass(this.activeTabClass);
        this.tab.hide();
      };

      return Tab;

    })();
    Tabs = (function() {
      function Tabs(container) {
        this.container = container;
        this.controls = this.container.find(".tabs__toggle");
        this.tabs = this.container.find(".tabs__tab");
        if (this.tabs.length !== this.controls.length) {
          console.error("there's unmatched tab toggles and tabs");
        }
        this.activeClass = "tabs__toggle_active";
        this.tabsClasses = [];
        this.initControls();
      }

      Tabs.prototype.initControls = function() {
        var control, i, index, len, ref, tab;
        ref = this.controls;
        for (index = i = 0, len = ref.length; i < len; index = ++i) {
          control = ref[index];
          tab = new Tab($(this.controls[index]), $(this.tabs[index]), this);
          if ($(control).hasClass(this.activeClass)) {
            this.active = tab;
          } else {
            tab.setInactive();
          }
          this.tabsClasses.push(tab);
        }
        if (!this.active) {
          this.active = this.tabsClasses[0];
        }
        this.active.setActive();
      };

      Tabs.prototype.changeActive = function(newActive) {
        this.active.setInactive();
        newActive.setActive();
        this.active = newActive;
      };

      return Tabs;

    })();
    'use strict';
    prefix = 'tabs';

    /**
     * Counters manager
     */

    /**
     * jQuery plugin
     */
    $.fn.tabs = function(options) {
      return this.each(function() {
        var elem, instance;
        elem = $(this);
        instance = elem.data(prefix);
        if (instance) {
          if ($.isPlainObject(options)) {
            instance.update(options);
          }
        } else {
          instance = new Tabs(elem);
          elem.data(prefix, instance);
        }
      });
    };
    $(function() {
      $('.' + prefix).tabs();
    });
  });

}).call(this);
