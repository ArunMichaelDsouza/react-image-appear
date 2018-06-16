// Helper functions

import React from 'react';
import { ANIMATIONS } from './constants';

const createElement = (type, props = {}, children = null) => {
    if (!type) {
        return false;
    }

    return React.createElement(type, props, children);
}, cloneElement = (type, props = {}, children = null) => {
    if (!type) {
        return false;
    }

    return React.cloneElement(type, props, children);
}, injectAnimationsScript = () => {
    let css = ANIMATIONS,
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
};

export { createElement, cloneElement, injectAnimationsScript };