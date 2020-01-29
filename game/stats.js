'use strict';

import { Component } from '../framework/component.js';

export class GameStats extends Component {
  tries = 0;
  matches = 0;
  bonus = 0;
  total = 0;
  stopWatch;
  timeSinceLastMatch = Date.now;
  bonusTimer;

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
    if (match) {

      const diff = new Date(Date.now() - this.timeSinceLastMatch);
      let timeBonus = 0;
      let bonusText = '';
      if (diff.getSeconds() < 30) { timeBonus++; bonusText = 'Less than 30 seconds'; }
      if (diff.getSeconds() < 15) { timeBonus++; bonusText = 'Less than 15 seconds! Good job.'; }
      if (diff.getSeconds() < 8)  { timeBonus++; bonusText = `That's fast!!`; }
      if (diff.getSeconds() < 4)  { timeBonus++; bonusText = `Wow! That's really fast!!`; }
      if (diff.getSeconds() < 2)  { timeBonus++; bonusText = `Unbelievable!!!`; }

      this.query('.matches').innerHTML = ++this.matches;
      this.dispatchEvent(new CustomEvent('addScore', { detail: ++this.bonus + timeBonus }));
      this.timeSinceLastMatch = Date.now();
      if (this.bonus > 0 || timeBonus > 0) {
        const bonus = this.bonus + timeBonus;
        this.reward(bonusText + ' ' + (bonus > 0 ? `${bonus} bonus points!` : ''));
      }
    } else {
      this.bonus = 0;
    }
    this.query('.tries').innerHTML = ++this.tries;

    if (this.matches === this.total) {
      clearInterval(this.stopWatch);
      clearTimeout(this.bonusTimer);
      this.query('.complete').innerHTML = 'COMPLETE!!';
      this.dispatchEvent(new CustomEvent('gameComplete'));
    }
  }

  reward(text) {
    if (this.bonusTimer) { clearTimeout(this.bonusTimer); }

    this.query('.complete').innerHTML = text;
    this.bonusTimer = setTimeout(() => this.query('.complete').innerHTML = '', 3000);
  }
}
customElements.define('game-stats', GameStats);