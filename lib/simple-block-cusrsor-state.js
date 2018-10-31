'use babel';

export default class SimpleBlockCursorState {

  constructor(serializedState) {
    this.data = serializedState || {};
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {
    return {
      deserializer: "SimpleBlockCursorState",
      data: this.data
    }
  }

  setState(key, value){
    this.data[key] = value
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }
}
