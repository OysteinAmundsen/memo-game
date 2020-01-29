'use strict';

import { Component } from '../framework/component.js';
import { GameBlock } from './block.js';
import { GameStats } from './stats.js';
const emojis = [
  '👮','👷','💂','👶','👴','👵','👱','👼','👸','👹','👺','🙈','🙉','🙊','💀','👽','💩',
  '🔥','✨','🌟','💫','💥','💢','💦','💧','💤','💨','👂','👀','👃','👅','👄','👍','👎','👌',
  '💪','🚶','🏃','💃','🎩','👑','👒','👟','👞','👡','👠','👢','👕','👔','👚','👗','🎽','👖',
  '👘','👙','💼','👜','👝','👛','👓','🎀','🌂','💄','💖','💞','💌','💋','💍','💎','👤','👥',
  '👣','🐶','🐺','🐱','🐭','🐹','🐰','🐸','🐯','🐨','🐻','🐷','🐽','🐮','🐗','🐵','🐒','🐴',
  '🐑','🐘','🐼','🐧','🐦','🐤','🐥','🐣','🐔','🐍','🐢','🐛','🐝','🐜','🐞','🐌','🐙','🐚',
  '🐠','🐟','🐬','🐳','🐋','🐄','🐏','🐀','🐃','🐅','🐇','🐉','🐎','🐐','🐓','🐕','🐖','🐁',
  '🐂','🐲','🐡','🐊','🐫','🐪','🐆','🐈','🐩','🐾','💐','🌸','🌷','🍀','🌹','🌻','🌺','🍁',
  '🍃','🍂','🌿','🌾','🍄','🌵','🌴','🌲','🌳','🌰','🌱','🌼','🌐','🌞','🌝','🌚','🌑','🌒',
  '🌓','🌔','🌕','🌖','🌗','🌘','🌜','🌛','🌙','🌏','🌋','🌌','🌠','⭐','☀','⛅','☁','⚡',
  '☔','❄','⛄','🌀','🌁','🌈','🌊','🎍','💝','🎎','🎒','🎓','🎏','🎆','🎇','🎐','🎑','🎃',
  '👻','🎅','🎄','🎁','🎋','🎉','🎊','🎈','🎌','🔮','🎥','📷','📹','📼','💿','📀','💽','💾',
  '💻','📱','☎','📞','📟','📠','📡','📺','📻','🔊','🔉','🔈','🔇','🔔','🔕','📢','📣','⏳','⏰',
  '⌚','🔒','🔑','🔎','💡','🔦','🔆','🔌','🔋','🔍','🛁','🚿','🚽','🔧','🔩','🔨','🚪','🚬','💣',
  '🔫','🔪','💊','💉','💰','💴','💵','💷','💶','💳','💸','📲','📧','📥','📤','✉','📩','📨','📯',
  '📫','📪','📬','📭','📮','📦','📇','📁','✂','📌','📎','✒','📏','📐','📛','🔬','🔭','📰','🎨',
  '🎬','🎤','🎧','🎼','🎵','🎶','🎹','🎻','🎺','🎷','🎸','👾','🎮','🃏','🎴','🀄','🎲','🎯','🏈',
  '🏀','⚽','⚾','🎾','🎱','🏉','🎳','⛳','🚵','🚴','🏁','🏇','🏆','🎿','🏂','🏊','🏄','🎣','☕',
  '🍵','🍶','🍼','🍺','🍻','🍸','🍹','🍷','🍴','🍕','🍔','🍟','🍗','🍖','🍝','🍛','🍤','🍱','🍣',
  '🍥','🍙','🍘','🍚','🍜','🍲','🍢','🍡','🍳','🍞','🍩','🍮','🍦','🍨','🍧','🎂','🍰','🍪','🍫',
  '🍬','🍭','🍯','🍎','🍏','🍊','🍋','🍒','🍇','🍉','🍓','🍑','🍈','🍌','🍐','🍍','🍠','🍆','🍅',
  '🌽','🏠','🏡','🏫','🏢','🏣','🏥','🏦','🏪','🏩','🏨','💒','⛪','🏬','🏤','🌇','🌆','🏯','🏰',
  '⛺','🏭','🗼','🗾','🗻','🌄','🌅','🌃','🗽','🌉','🎠','🎡','⛲','🎢','🚢','⛵','🚤','🚣','⚓',
  '🚀','✈','💺','🚁','🚂','🚊','🚉','🚞','🚆','🚄','🚅','🚈','🚇','🚝','🚋','🚃','🚎','🚌','🚍',
  '🚙','🚘','🚗','🚕','🚖','🚛','🚚','🚨','🚓','🚔','🚒','🚑','🚐','🚲','🚡','🚟','🚠','🚜','💈',
  '🚏','🎫','🚦','🚥','🚧','🔰','⛽','🏮','🎰','♨','🗿','🎪','🎭','📍','🚩','🚫','🔞','📵','🚯',
  '🚱','🚳','🚷','🚸','⛔','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','⛎','🔯',
  '🏧','💮','💯'
];

export class GameBoard extends Component {

  board = {
    rows: 6,
    cols: 6,
    symbols: []
  };
  score = 0;
  highscore = +localStorage.getItem('highscore') || 0;
  fastest = localStorage.getItem('fastest') || '';

  lastBlock;
  closeTimer;
  previewTime = 5000;

  constructor() {
    super(`
      <style>
        :host {
          display: block;
          width: 100%;
          padding: 5px;
          background: var(--board-background);
          border: 5px solid var(--board-border);
          color: white;
          border-radius: 10px;
          box-shadow: 0px 4px 10px black;
        }
        :host > main > div {
          display: flex;
          border-left: 4px solid black;
          border-right: 4px solid black;
        }
        :host > main > div:first-of-type {
          border-top: 4px solid black;
        }
        :host > main > div:last-of-type {
          border-bottom: 4px solid black;
        }
        :host footer {
          text-align: center;
          margin: 5px 0 0 0;
        }
        button {
          background: var(--board-background);
          padding: 10px;
          border: 4px solid var(--board-border);
          color: white;
          cursor: pointer;
          outline: none;
          transition: border-color 0.02s ease-in;
        }
        button:active {
          border-color: transparent;
        }
      </style>

      <game-stats></game-stats>
      <main></main>
      <footer class="container">
        <span>Score: <b id="score"></b></span>
        <button type="button"><u>R</u>estart</button>
        <span><b id="highscore"></b>: Highscore</span>
      </footer>
    `);
    this.blockTurned = this.blockTurned.bind(this);
    this.closeAll = this.closeAll.bind(this);
    this.restart = this.restart.bind(this);
    this.addScore = this.addScore.bind(this);
    this.calcHighscore = this.calcHighscore.bind(this);
  }

  /**
   * On render
   */
  connectedCallback() {
    super.connectedCallback();
    this.restart();

    // Setup restart events
    this.query('button').addEventListener('click', evt => this.restart());
    window.addEventListener('keypress', evt => (evt.key === 'r' && this.restart()));
  }

  /**
   *
   */
  setup() {
    // Create a flat array of the board setup
    let array = [];
    for (let r=0; r < this.board.rows; r++) {
      for (let c=0; c < this.board.cols; c++) {
        array.push(`${r}_${c}`);
      }
    }
    this.board.symbols = [...Array(20)].reduce((arr, e) => {
      const getEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];
      let emoji = getEmoji();
      while (arr.indexOf(emoji) > -1) { emoji = getEmoji(); }
      arr.push(emoji);
      return arr;
    }, []);

    // Shuffle the board array
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    // Now render the board
    for (let r=0; r < this.board.rows; r++) {
      const row = this.query('main').appendChild(document.createElement('div'));
      for (let c=0; c < this.board.cols; c++) {
        const el = document.createElement('game-block');
        el.setAttribute('id', `${r}_${c}`);
        const idx = Math.floor(array.indexOf(`${r}_${c}`) / 2);
        el.setAttribute('data-symbol', this.board.symbols[idx]);
        row.appendChild(el);

        // Listen for changes in the block state
        el.addEventListener('blockTurned', this.blockTurned);
      }
    }
    this.getStats().setTotal(array.length / 2);
    this.getStats().addEventListener('addScore', this.addScore);
    this.getStats().addEventListener('gameComplete', this.calcHighscore);
  }

  /**
   *
   */
  restart() {
    this.query('main').innerHTML = '';
    this.setup();
    this.score = 0;
    this.addScore({detail: 0});
    this.calcHighscore();
    this.viewAll();
  }

  /**
   * Helper to quickly retreive the stats component
   *
   * @return {GameStats} the stats component
   */
  getStats() {
    return this.query('game-stats');
  }

  /**
   * Event triggered by turning over one block. This will determine if
   * the block is in a matched state with any previously turned blocks,
   * and inform the stats component of the results.
   *
   * @param {*} evt
   */
  blockTurned(evt) {
    const currentBlock = evt.target;
    if (currentBlock.isTurned) {
      if (!this.lastBlock) {
        // First selected block
        this.closeAll(currentBlock);
        this.lastBlock = currentBlock;
      } else if (currentBlock.getSymbol() === this.lastBlock.getSymbol()) {
        // We have a potential match. Check.
        this.getStats().addAttempt(
          currentBlock.matchedBy(this.lastBlock)
          && this.lastBlock.matchedBy(currentBlock)
        );
        this.lastBlock = null;
      } else {
        // No match, close selections
        this.getStats().addAttempt();
        this.lastBlock = null;
        this.closeTimer = setTimeout(() => this.closeAll(), 1000);
      }
    }
    else if (currentBlock === this.lastBlock) {
      this.lastBlock = null;
    }
  }

  addScore(evt) {
    this.query('#score').innerHTML = this.score += evt.detail;
  }

  calcHighscore() {
    if (this.highscore < this.score) {
      this.highscore = this.score;
      localStorage.setItem('highscore', this.highscore);
    }
    this.query('#highscore').innerHTML = this.highscore;
  }

  /**
   * Loop over every block which is not currently in a matched state,
   * and turn them over.
   *
   * @param {GameBlock} except
   */
  closeAll(except) {
    if (this.closeTimer) { clearTimeout(this.closeTimer); }
    const turned = this.queryAll('.turned:not(.match)');
    Array.from(turned).forEach(element => {
      if (except && element == except) { return ; }
      element.turn();
    });
  }

  viewAll() {
    const now = new Date();
    now.setMilliseconds(now.getMilliseconds() + this.previewTime);
    this.getStats().restart(now);

    return new Promise((resolve, reject) => {
      const block = this.queryAll('game-block');
      Array.from(block).forEach(element => element.classList.add('turned'));
      setTimeout(() => {
        Array.from(block).forEach(element => element.classList.remove('turned'));
        resolve();
      }, this.previewTime);
    });
  }
}
customElements.define('game-board', GameBoard);