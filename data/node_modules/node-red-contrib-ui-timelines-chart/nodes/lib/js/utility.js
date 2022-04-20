//! library.js
//! version : 0.0.1
//! authors : sanlike0911
//! license : MIT

(function (global) {
    'use strict';

    // var utility = function () {}
    var utility = {}

    function getStyleSheet(title) {
        let sheet = null;
        for(let i=0; i < document.styleSheets.length; i++) {
            // console.log("sheet: ", sheet);
            if(document.styleSheets[i].title == title) {
                sheet = document.styleSheets[i];
                break;
            }
        }
        return sheet;
    }

    // function getStyleRule(sheet, selectorText) {
    //     let rule = null;
    //     for(let i=0; i < sheet.cssRules.length; i++) {
    //         // console.log("rule: ", rule);
    //         if(sheet.cssRules[i].selectorText == selectorText) {
    //             rule = sheet.cssRules[i];
    //             break;
    //         }
    //     }
    //     return rule;
    // }

    function getStyleRule(selectorText) {
        let rule = null;
        for(let idxSheet=0; idxSheet < document.styleSheets.length; idxSheet++) {
            for(let idxRule=0; idxRule < document.styleSheets[idxSheet].cssRules.length; idxRule++) {
                // console.log("rule: ", document.styleSheets[idxSheet].cssRules[idxRule]);
                if(document.styleSheets[idxSheet].cssRules[idxRule].selectorText == selectorText) {
                    rule = document.styleSheets[idxSheet].cssRules[idxRule];
                    break;
                }
            }
        }
        return rule;
    }

    /* …and here */
    utility.version = '0.0.1';
    utility.getStyleSheet = getStyleSheet;
    utility.getStyleRule = getStyleRule;

    // AMD support
    if (typeof define === 'function' && define.amd) {
        define(function () { return utility; });
    // CommonJS and Node.js module support.
    } else if (typeof exports !== 'undefined') {
        // Support Node.js specific `module.exports` (which can be a function)
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = utility;
        }
        // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        exports.utility = utility;
    } else {
        global.utility = utility;
    }
})(this);