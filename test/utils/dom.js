'use stricts';

import jsdom from 'jsdom';

let doc = jsdom.jsdom('<!doctype html><html><body></body></html>'),
    win = doc.defaultView;

global.document = doc;
global.window = win;

function propagateToGlobal (window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) {
      continue;
    }
    if (key in global) {
      continue;
    }

    global[key] = window[key];
  }
}

propagateToGlobal(win);
