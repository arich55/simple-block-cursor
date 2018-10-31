'use babel';

import SimpleBlockCursorState from './simple-block-cusrsor-state'
import { Disposable, CompositeDisposable } from 'atom';

var style;

function isEmpty(hash){
  return Object.keys(hash).length == 0;
}

export default {
  subscriptions: null,
  cursorState: null,
  enabled: true,
  cursorStyles: [
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
    this.applyState(state);
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'simple-block-cursor:toggle': () => this.toggle()
    }));
  },

  applyState(state){
    if (!isEmpty(state)) {
      this.cursorState = atom.deserializers.deserialize(state.simpleBlockCursorState);
    }
    else {
      this.cursorState = new SimpleBlockCursorState();
    }
    this.enabled = this.cursorState.data['enabled']
    if (this.enabled) this.setupStylesheet();
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
    this.setEnableState(true);
    return new Disposable(() => {
      this.removeStylesheet();
    });
  },

  applyStyles() {
    style.innerHTML = '';
    for(let blockStyles of this.cursorStyles){
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
    this.setEnableState(false);
  },

  setEnableState(value){
    this.enabled = value;
    this.cursorState.setState('enabled', value);
  },

  serialize() {
    return {
      simpleBlockCursorState: this.cursorState.serialize()
    };
  },

  deserializeCursorState(state) {
    return new SimpleBlockCursorState(state.data)
  },

  toggle() {
    this.enabled ? this.removeStylesheet() : this.setupStylesheet();
  }
};
