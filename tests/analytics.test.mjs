// GAの本番境界、固定パラメータ、イベント委譲と計測失敗時の回帰を検証します。
// DOMと送信キューをfakeに置換し、実際のGAへ試験データを送りません。
import test from 'node:test';
import assert from 'node:assert/strict';
import { describeLink, initializeAnalytics, isProductionPage } from '../src/analytics.mjs';

function link(href, { work, navigation = false, hero = false } = {}) {
  return {
    getAttribute: () => href,
    closest: (selector) => {
      if (selector === 'nav') return navigation ? {} : null;
      if (selector === '#home') return hero ? {} : null;
      if (selector === '[data-analytics-work]') return work ? { getAttribute: () => work } : null;
      return null;
    },
  };
}

function environment(href) {
  const scripts = [];
  const listeners = [];
  const win = { location: { href } };
  const doc = {
    getElementById: (id) => scripts.find((script) => script.id === id),
    createElement: () => ({}),
    head: { appendChild: (script) => scripts.push(script) },
    addEventListener: (name, handler) => listeners.push({ name, handler }),
  };
  return { win, doc, scripts, listeners };
}

test('production URL boundary', () => {
  for (const url of ['https://czmirror.github.io/portfolio/', 'https://czmirror.github.io/portfolio/index.html?utm_source=zenn#portfolio']) assert.equal(isProductionPage(url), true);
  for (const url of ['http://127.0.0.1:4173/portfolio/', 'http://localhost:5173/', 'http://[::1]/portfolio/', 'file:///portfolio/index.html', 'https://czmirror.github.io/Pulse/', 'https://czmirror.github.io/portfolio-other/', 'https://czmirror.github.io.evil.test/portfolio/', 'https://czmirror.github.io:444/portfolio/', 'http://czmirror.github.io/portfolio/', 'invalid', undefined]) assert.equal(isProductionPage(url), false, url);
});

test('work link classification', () => {
  assert.deepEqual(describeLink(link('https://czmirror.github.io/Pulse/?secret=ignored', { work: 'pulse' })), { name: 'work_link_click', params: { item_id: 'pulse', link_type: 'web_app' } });
  assert.deepEqual(describeLink(link('https://store.steampowered.com/app/3612510/RAYSER/', { work: 'game-1' })).params, { item_id: 'game-1', link_type: 'steam' });
  assert.equal(describeLink(link('https://unityroom.com/games/typegunner', { work: 'game-2' })).params.link_type, 'unityroom');
  assert.equal(describeLink(link('https://note.com/cz_mirror/n/example', { work: 'mimilab' })).params.link_type, 'article');
  for (const href of ['javascript:alert(1)', 'http://note.com/example', 'https://unknown.test/', 'invalid', null]) assert.equal(describeLink(link(href, { work: 'pulse' })), null);
  assert.equal(describeLink(link('https://note.com/example', { work: 'private@example.test' })), null);
  assert.equal(describeLink(link('https://note.com/example')), null);
});

test('consultation link classification', () => {
  assert.deepEqual(describeLink(link('#contact', { navigation: true })), { name: 'contact_click', params: { placement: 'navigation' } });
  assert.deepEqual(describeLink(link('#consultation', { hero: true })), { name: 'consultation_click', params: { placement: 'hero' } });
  assert.deepEqual(describeLink(link('#contact')).params, { placement: 'content' });
  assert.equal(describeLink(link('#portfolio')), null);
});

test('no local collection', () => {
  const env = environment('http://127.0.0.1:4173/portfolio/');
  assert.equal(initializeAnalytics(env.win, env.doc), false);
  assert.equal(env.scripts.length, 0);
  assert.equal(env.listeners.length, 0);
  assert.equal(env.win.gtag, undefined);
  assert.equal(env.win.dataLayer, undefined);
});

test('production initialization and delegated clicks', () => {
  const env = environment('https://czmirror.github.io/portfolio/');
  assert.equal(initializeAnalytics(env.win, env.doc), true);
  assert.equal(initializeAnalytics(env.win, env.doc), false);
  assert.equal(env.scripts.length, 1);
  assert.equal(env.scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=G-JS9MLQN89W');
  assert.deepEqual(Array.from(env.win.dataLayer[1]), ['config', 'G-JS9MLQN89W']);
  assert.equal(env.listeners.length, 1);
  assert.equal(env.listeners[0].name, 'click');
  const laterLink = link('https://czmirror.github.io/UInya/', { work: 'uinya' });
  env.listeners[0].handler({ target: { closest: () => laterLink } });
  assert.deepEqual(Array.from(env.win.dataLayer[2]), ['event', 'work_link_click', { item_id: 'uinya', link_type: 'web_app', send_to: 'G-JS9MLQN89W' }]);
  env.listeners[0].handler({ target: { closest: () => laterLink }, defaultPrevented: true });
  env.listeners[0].handler({ target: {} });
  // ナビのスムーズスクロールは既定動作を抑止するため、そのクリックも記録します。
  assert.equal(env.win.dataLayer.length, 4);
});

test('tracking failure preserves navigation', () => {
  const env = environment('https://czmirror.github.io/portfolio/');
  initializeAnalytics(env.win, env.doc);
  env.win.gtag = () => { throw new Error('blocked'); };
  let prevented = false;
  assert.doesNotThrow(() => env.listeners[0].handler({ target: { closest: () => link('#contact') }, preventDefault: () => { prevented = true; } }));
  assert.equal(prevented, false);
});
