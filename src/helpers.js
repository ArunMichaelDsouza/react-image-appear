// Helper functions

import { ANIMATIONS } from './constants';

const injectAnimationsScript = () => {
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

export { injectAnimationsScript };