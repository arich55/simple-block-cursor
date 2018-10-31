'use babel';

import { Disposable, CompositeDisposable } from 'atom';

var style;

export default {
  subscriptions: null,
  enabled: false,
  config: [
    ['atom-text-editor.editor .cursors .cursor', {
      'border': '1px solid white;',
      'border-radius': '0px;',
      'background': 'white !important;',
      'opacity': '0.8 !important;'
    }],
    ['atom-text-editor .cursors',{
      'mix-blend-mode': 'difference;'
    }]
  ],

  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'simple-block-cursor:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
    this.subscriptions = null;
  },

  setupStylesheet() {
    this.createStylesheet();
    this.applyStyles();
  },

  createStylesheet() {
    style = document.createElement('style');
    style.type = 'text/css';
    document.querySelector('head atom-styles').appendChild(style);
    this.enabled = true;
    return new Disposable(() => {
      this.removeStylesheet();
    });
  },

  applyStyles() {
    style.innerHTML = '';
    for(let blockStyles of this.config){
      selector    = blockStyles[0];
      blockStyle  = blockStyles[1];
      style.innerHTML += selector + "{" +this.applyStyleBlock(blockStyle)+ "\n}\n"
    }
  },

  applyStyleBlock(blockStyle) {
    styleResult = '';
    for(let rule in blockStyle){
      selectorRule = rule + ": " + blockStyle[rule];
      styleResult +=  "\n\t" + selectorRule
    }
    return styleResult;
  },

  removeStylesheet() {
    style.parentNode.removeChild(style);
    style = null;
    this.enabled = false;
  },

  // serialize() {
  //   return {
  //     simpleBlockCursorViewState: this.simpleBlockCursorView.serialize()
  //   };
  // },

  toggle() {
    this.enabled ? this.removeStylesheet() : this.setupStylesheet();
  }
};
