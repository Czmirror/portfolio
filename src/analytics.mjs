// index.htmlから読み込み、本番ポートフォリオのGA送信を担当します。
// 追加イベントは固定の分類だけを送り、リンク移動やフォーム操作を変更しません。
const MEASUREMENT_ID = 'G-JS9MLQN89W';
const WORK_IDS = new Set(['uinya', 'mimilab', 'pulse', 'game-1', 'game-2', 'game-3', 'game-4', 'game-5', 'game-6', 'game-7']);
const LINK_TYPES = new Map([
  ['czmirror.github.io', 'web_app'],
  ['unityroom.com', 'unityroom'],
  ['store.steampowered.com', 'steam'],
  ['note.com', 'article'],
]);

/** URLを解釈し、公開サイトの配信範囲かを返します。不正なURLは拒否します。 */
export function isProductionPage(href) {
  try {
    const url = new URL(href);
    return url.origin === 'https://czmirror.github.io' && url.pathname.startsWith('/portfolio/');
  } catch {
    return false;
  }
}

/** リンクのDOMから固定分類を返します。対象外・不正な値はnullを返し、外部送信しません。 */
export function describeLink(link) {
  const href = link.getAttribute('href');
  if (href === '#contact' || href === '#consultation') {
    return {
      name: href === '#contact' ? 'contact_click' : 'consultation_click',
      params: { placement: link.closest('nav') ? 'navigation' : link.closest('#home') ? 'hero' : 'content' },
    };
  }

  const itemId = link.closest('[data-analytics-work]')?.getAttribute('data-analytics-work');
  if (!WORK_IDS.has(itemId)) return null;
  try {
    const url = new URL(href);
    const linkType = url.protocol === 'https:' && LINK_TYPES.get(url.hostname);
    if (!linkType) return null;
    return { name: 'work_link_click', params: { item_id: itemId, link_type: linkType } };
  } catch {
    return null;
  }
}

/** 本番に限りタグとクリック委譲を一度だけ登録します。戻り値は初期化の有無です。 */
export function initializeAnalytics(win, doc) {
  if (!isProductionPage(win.location.href) || doc.getElementById('portfolio-google-tag')) return false;

  win.dataLayer = win.dataLayer || [];
  win.gtag = function () { win.dataLayer.push(arguments); };
  win.gtag('js', new Date());
  win.gtag('config', MEASUREMENT_ID);

  const tag = doc.createElement('script');
  tag.id = 'portfolio-google-tag';
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  doc.head.appendChild(tag);

  // 文書への委譲で、Reactが後から追加したリンクも一つの経路で計測します。
  doc.addEventListener('click', (event) => {
    const link = event.target?.closest?.('a[href]');
    if (!link) return;
    const interaction = describeLink(link);
    if (!interaction) return;
    try {
      win.gtag('event', interaction.name, { ...interaction.params, send_to: MEASUREMENT_ID });
    } catch {
      // 計測がブロックされても、作品や相談への移動を優先します。
    }
  });
  return true;
}

if (typeof window !== 'undefined') initializeAnalytics(window, document);
