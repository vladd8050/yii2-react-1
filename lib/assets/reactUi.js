(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
;(function (document, window) {

    window.ReactUJS = {
        CLASS_NAME_ATTR: 'data-react-class',
        PROPS_ATTR: 'data-react-props',

        getElements: function getElements() {
            var finder = function finder(selector) {
                if (typeof jQuery === 'undefined') {
                    return document.querySelectorAll(selector);
                }
                else {
                    return jQuery(selector);
                }
            };

            return finder('[' + ReactUJS.CLASS_NAME_ATTR + ']');
        },

        mountComponents: function mountComponents() {
            var elements = ReactUJS.getElements();

            var element;
            var reactClass;
            var props;

            var index = function index(obj, i) {
                return obj[i];
            };

            for (var i = 0; i < elements.length; i++) {
                element = elements[i];
                reactClass = element.getAttribute(ReactUJS.CLASS_NAME_ATTR).split('.').reduce(index, window);
                props = JSON.parse(element.getAttribute(ReactUJS.PROPS_ATTR));

                ReactDOM.render(React.createElement(reactClass, props), element);
            }
        },

        unmountComponents: function unmountComponents() {
            var elements = ReactUJS.getElements();

            for (var i = 0; i < elements.length; i++) {
                ReactDOM.unmountComponentAtNode(elements[i]);
            }
        },

        handleEvents: function handleEvents() {

            if (document.readyState == "complete" || document.readyState == "loaded" || document.readyState == "interactive") {
                ReactUJS.mountComponents();
            }
            else {
                document.addEventListener('DOMContentLoaded', ReactUJS.mountComponents);
            }
            window.addEventListener('unload', ReactUJS.unmountComponents);
        }
    };

    ReactUJS.handleEvents();

})(document, window);

},{}]},{},[1]);
