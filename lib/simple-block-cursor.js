'use babel';

import SimpleBlockCursorView from './simple-block-cursor-view';
import { Disposable, CompositeDisposable } from 'atom';

var style;

export default {
  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'simple-block-cursor:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
    this.subscriptions = null;
    // this.simpleBlockCursorView.destroy();
  },

  // serialize() {
  //   return {
  //     simpleBlockCursorViewState: this.simpleBlockCursorView.serialize()
  //   };
  // },

  toggle() {
    style = document.createElement('style');
    style.type = 'text/css';
    document.querySelector('head atom-styles').appendChild(style);

    // return a disposable for easy removal
    return new Disposable(() => {
      // dispose: {
      //   console.log("DISPOSE OF STYLESHEET")
      //   style.parentNode.removeChild(style);
      //   style = null;
      // }
    });
  }

};
