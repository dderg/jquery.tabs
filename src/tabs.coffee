((factory) ->
    # Try to register as an anonymous AMD module
    if typeof define == 'function' and define.amd
        define [ 'jquery' ], factory
    else
        factory jQuery
    return
) ($) ->
    class Tab
        constructor: (@toggle, @tab, @tabs) ->
            @activeToggleClass = "tabs__toggle_active"
            @activeTabClass = "tabs__tab_active"
            @toggle.click =>
                @tabs.changeActive(this)
        setActive: ->
            @toggle.addClass @activeToggleClass
            @tab.addClass @activeTabClass
            @tab.show()
            return
        setInactive: ->
            @toggle.removeClass @activeToggleClass
            @tab.removeClass @activeTabClass
            @tab.hide()
            return


    class Tabs
        constructor: (@container) ->
            _ = this;
            @controls = [];
            @container.find(".tabs__toggle").each () ->
                control = this;
                if $(control).closest('.tabs')[0] == _.container[0]
                    _.controls.push(control);
                
            @tabs = [];
            @container.find(".tabs__tab").each () ->
                tab = this;
                if $(tab).closest('.tabs')[0] == _.container[0]
                    _.tabs.push(tab);
                

            if @tabs.length != @controls.length
              console.error "there's unmatched tab toggles and tabs"
            @activeClass = "tabs__toggle_active"
            @tabsClasses = []
            do @initControls
        initControls: ->
            for control, index in @controls
                # index = @controls.index control
                tab = new Tab $(@controls[index]), $(@tabs[index]), this
                if $(control).hasClass @activeClass
                    @active = tab
                else
                    tab.setInactive()
                @tabsClasses.push tab
            @active = @tabsClasses[0] unless @active
            @active.setActive()
            return
        changeActive: (newActive) ->
            @active.setInactive()
            newActive.setActive()
            @active = newActive
            return



    'use strict'
    prefix = 'tabs'

    
    ###*
    # Counters manager
    ###

    ###*
    # jQuery plugin
    ###

    $.fn.tabs = (options) ->
        @each ->
            elem = $(this)
            instance = elem.data(prefix)
            if instance
                if $.isPlainObject(options)
                    instance.update options
            else
                instance = new Tabs(elem)
                elem.data prefix, instance
            return


    $ ->
        $('.' + prefix).tabs()
        return
    return