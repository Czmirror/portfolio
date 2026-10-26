// 実際の表示初期化スクリプトを読み、座標の基準とスクロール復元時の再判定を検証します。
// DOMとイベントのみを置き換え、テストからアニメーションの実装を複製しません。
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '../public/assets/js/animations.js'), 'utf8');

function createPage(tops, reducedMotion = false) {
  const listeners = new Map();
  const elements = tops.map(top => {
    const classes = new Set();
    return {
      top,
      // 親要素基準のoffsetTopは、画面上の位置と一致するとは限りません。
      offsetTop: 0,
      clientHeight: 400,
      classList: { add: name => classes.add(name) },
      getBoundingClientRect() { return { top: this.top }; },
      isVisible: () => classes.has('visible'),
    };
  });
  const context = {
    document: {
      addEventListener(name, callback) { if (name === 'DOMContentLoaded') callback(); },
      documentElement: { classList: { add() {} } },
      querySelectorAll(selector) { return selector === '.slide-in' ? elements : []; },
    },
    window: {
      innerHeight: 800,
      scrollY: 1500,
      matchMedia: () => ({ matches: reducedMotion }),
      addEventListener(name, callback) { listeners.set(name, callback); },
    },
  };
  vm.runInNewContext(source, context);
  return { elements, context, fire: event => listeners.get(event)() };
}

test('途中リロードで画面内・通過済みの入れ子要素を表示する', () => {
  const { elements } = createPage([-1200, -80, 250, 799, 800, 900]);
  assert.deepEqual(elements.map(e => e.isVisible()), [true, true, true, true, false, false]);
});

for (const event of ['load', 'pageshow', 'resize', 'scroll']) {
  test(`${event}でスクロール復元後の位置を再判定する`, () => {
    const { elements, fire } = createPage([1200]);
    assert.equal(elements[0].isVisible(), false);
    elements[0].top = 200;
    fire(event);
    assert.equal(elements[0].isVisible(), true);
    elements[0].top = 1200;
    fire(event);
    assert.equal(elements[0].isVisible(), true);
  });
}

test('動きを減らす設定では画面外の要素も表示する', () => {
  const { elements } = createPage([200, 1200], true);
  assert.ok(elements.every(e => e.isVisible()));
});
