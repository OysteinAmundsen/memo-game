'use strict';

import { Component } from '../framework/component.js';

export class GameBlock extends Component {

  isTurned = false;
  isMatched = false;

  constructor() {
    super(`
      <style>
        :host {
          display: flex;
          justify-content: center;
          flex: 1;
          padding: 15px;
          cursor: pointer;
          border: 2px solid black;
          width: 20%;
          padding-bottom: 13%;
          transition-property: transform, background;
          transition-duration: 0.1s;
          transition-timing-function: ease-in;
          position: relative;
          box-shadow: 0 0 5px var(--board-border) inset;
          perspective: 1000px;
          transform-style: preserve-3d;
          transform-origin: center;
          user-select: none;
        }
        :host(:hover) {
          transform: scale(1.08);
          background: rgba(255,255,255,0.1);
        }
        :host(:not(.turned)) {
          transform: rotateY(180deg);
        }
        :host(.match) {
          background: white;
        }
        .front, .back {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          text-align: center;
          backface-visibility: hidden;
        }
        :host div {
          height: 100%;
          font-size: 2em;
          text-shadow: 0 0 30px rgba(255,255,255,0.5);
        }
      </style>

      <div>
        <div class="front"></div>
        <div class="back"></div>
      </div>
    `);
    this.turn = this.turn.bind(this);
  }

  /**
   * On render
   */
  connectedCallback() {
    super.connectedCallback();
    this.query('.front').innerHTML = this.getAttribute('data-symbol');
    this.addEventListener('click', this.turn);
  }

  /**
   * Helper function to get the symbol on this block
   *
   * @return {string} the ascii emoticon symbol
   */
  getSymbol() {
    return this.getAttribute('data-symbol');
  }

  /**
   * Turn the block around to see it's front face.
   */
  turn() {
    if (!this.isMatched) {
      this.isTurned = !this.isTurned;
      this.classList.toggle('turned', this.isTurned);
      this.dispatchEvent(new CustomEvent('blockTurned', { detail: this.isTurned }));
    }
  }

  /**
   * Determine if this block is matched by another block.
   * Set appropriate state.
   *
   * @param {GameBlock} block
   */
  matchedBy(block) {
    if (block === this) { return false; } // Cannot match the same element
    this.isMatched = this.getSymbol() === block.getSymbol();
    this.isTurned = true;
    this.classList.toggle('turned', this.isTurned);
    this.classList.toggle('match', this.isMatched);
    return this.isMatched;
  }
}
customElements.define('game-block', GameBlock);