'use strict';

import { Component } from '../framework/component.js';

export class GameStats extends Component {
  tries = 0;
  matches = 0;
  bonus = 0;
  total = 0;
  stopWatch;
  timeSinceLastMatch = Date.now;

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
  startTimer(start) {
    if (this.stopWatch) { clearInterval(this.stopWatch); }

    const timer = this.query('.time');
    start = start || Date.now();

    const timerFn = () => {
      const difference = Date.now() - start;
      let hours = 0;
      let minutes = '-00';
      let seconds;
      if (difference < 0) {
        seconds = '0' + Math.abs(Math.floor(difference / 1000));
      } else {
        const diff = new Date(difference);
        hours = diff.getHours() - 1;
        minutes = diff.getMinutes() < 10 ? '0' + diff.getMinutes() : diff.getMinutes();
        seconds = diff.getSeconds() < 10 ? '0' + diff.getSeconds() : diff.getSeconds();
      }
      timer.innerHTML = `${hours > 0 ? hours + ':' : ''}${minutes}:${seconds}`;
    }
    timerFn();
    this.stopWatch = setInterval(() => timerFn(), 1000);
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
  restart(start) {
    this.query('.matches').innerHTML = this.matches = 0;
    this.query('.tries').innerHTML = this.tries = 0;
    this.query('.complete').innerHTML = '';
    this.startTimer(start);
  }

  /**
   * Increase stats by on attempt or a match. If all matches are found,
   * this will also stop the timer and end the game.
   *
   * @param {boolean} match
   */
  addAttempt(match) {
    const diff = new Date(Date.now() - this.timeSinceLastMatch);
    let timeBonus = 0;
    if (diff.getSeconds() < 40) timeBonus++;
    if (diff.getSeconds() < 20) timeBonus++;
    if (diff.getSeconds() < 10) timeBonus++;
    if (diff.getSeconds() < 5) timeBonus++;
    console.debug('timeBonus', timeBonus);

    if (match) {
      this.query('.matches').innerHTML = ++this.matches;
      this.dispatchEvent(new CustomEvent('addScore', { detail: ++this.bonus + timeBonus }));
      this.timeSinceLastMatch = Date.now;
    } else {
      this.bonus = 0;
    }
    this.query('.tries').innerHTML = ++this.tries;

    if (this.matches === this.total) {
      clearInterval(this.stopWatch);
      this.query('.complete').innerHTML = 'COMPLETE!!';
      this.dispatchEvent(new CustomEvent('gameComplete'));
    }
  }
}
customElements.define('game-stats', GameStats);