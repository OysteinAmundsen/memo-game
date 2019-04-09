'use strict';

import { Component } from '../framework/component.js';

export class GameStats extends Component {
  tries = 0;
  matches = 0;
  total = 0;
  stopWatch;

  constructor() {
    super(`
      <style>
        :host {
          display: block;
          padding: 0 4px 8px 0;
        }
        .stats {
          display: flex;
          align-items: baseline;
        }
        .stats > span {
          flex: 1;
        }
        .stats > span:last-of-type {
          text-align: right;
        }
      </style>

      <div class="stats">
        📈
        <span>
          Attempts: <span class="tries">0</span> |
          Matches: <span class="matches">0</span>
        </span>
        <span class="complete"></span>
        <span>⏱ <span class="time">00:00</span></span>
      </div>
    `);
  }

  /**
   * On render
   */
  connectedCallback() {
    super.connectedCallback();
    this.startTimer();
  }

  /**
   * Start the internal stop watch keeping track of
   * the game duration.
   */
  startTimer() {
    if (this.stopWatch) { clearInterval(this.stopWatch); }

    const timer = this.query('.time');
    const start = Date.now();

    this.stopWatch = setInterval(() => {
      const diff = new Date(Date.now() - start);
      let hours = diff.getHours() - 1;
      let minutes = diff.getMinutes() < 10 ? '0' + diff.getMinutes() : diff.getMinutes();
      let seconds = diff.getSeconds() < 10 ? '0' + diff.getSeconds() : diff.getSeconds();
      timer.innerHTML = `${hours > 0 ? hours + ':' : ''}${minutes}:${seconds}`;
    }, 1000);
  }

  /**
   * Called by the GameBoard with information of total number
   * of matches in current setup.
   *
   * @param {number} total
   */
  setTotal(total) {
    this.total = total;
  }

  /**
   * Null out all current stats and start over
   */
  restart() {
    this.query('.matches').innerHTML = this.matches = 0;
    this.query('.tries').innerHTML = this.tries = 0;
    this.query('.complete').innerHTML = '';
    this.query('.time').innerHTML = '00:00';
    this.startTimer();
  }

  /**
   * Increase stats by on attempt or a match. If all matches are found,
   * this will also stop the timer and end the game.
   *
   * @param {boolean} match
   */
  addAttempt(match) {
    if (match) {
      this.query('.matches').innerHTML = ++this.matches;
    } else {
      this.query('.tries').innerHTML = ++this.tries;
    }

    if (this.tries === this.total) {
      clearInterval(this.stopWatch);
      this.query('.complete').innerHTML = 'COMPLETE!!';
    }
  }
}
customElements.define('game-stats', GameStats);