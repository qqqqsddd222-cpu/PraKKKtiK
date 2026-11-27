export function createElement(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

export function renderProjectCard(project) {
  const article = createElement('article', 'card');
  article.setAttribute('data-id', project.id);

  const header = createElement('header', 'card__header');
  const title = createElement('h3', 'card__title', project.title);
  const badge = createElement('span', `badge badge--${project.status}`, project.status);
  header.append(title, badge);

  const desc = createElement('p', 'card__desc', project.description);
  
  const meta = createElement('footer', 'card__meta');
  const time = createElement('time', '', project.createdAt);
  time.setAttribute('datetime', project.createdAt);
  meta.append(time);

  article.append(header, desc, meta);

  article.addEventListener('click', () => {
    const event = new CustomEvent('open-modal', { detail: { item: project, type: 'project' } });
    document.dispatchEvent(event);
  });

  return article;
}

export function renderExpenseTable(rows) {
  const table = createElement('table', 'table');
  const caption = createElement('caption', '', 'Статьи расходов (Факт)');
  const thead = createElement('thead');
  const trHead = createElement('tr');
  const thId = createElement('th', '', 'ID'); thId.scope = 'col';
  const thTitle = createElement('th', '', 'Название'); thTitle.scope = 'col';
  const thCat = createElement('th', '', 'Категория'); thCat.scope = 'col';
  const thFact = createElement('th', '', 'Сумма'); thFact.scope = 'col';
  const thStatus = createElement('th', '', 'Статус'); thStatus.scope = 'col';
  trHead.append(thId, thTitle, thCat, thFact, thStatus);
  thead.append(trHead);

  const tbody = createElement('tbody');
  rows.forEach(row => {
    const tr = createElement('tr');
    const tdId = createElement('td', '', row.id); tdId.setAttribute('data-label', 'ID');
    const tdTitle = createElement('td', '', row.title); tdTitle.setAttribute('data-label', 'Название');
    const tdCat = createElement('td', '', row.category); tdCat.setAttribute('data-label', 'Категория');
    const tdFact = createElement('td', '', `${row.fact.toLocaleString()} ₽`); tdFact.setAttribute('data-label', 'Сумма');
    const tdStatus = createElement('td', '', row.status); tdStatus.setAttribute('data-label', 'Статус');
    tr.append(tdId, tdTitle, tdCat, tdFact, tdStatus);
    tbody.append(tr);
  });

  table.append(caption, thead, tbody);
  return table;
}

export function renderEmpty(message = 'Данных пока нет') {
  const wrap = createElement('section', 'empty-state');
  const icon = createElement('span', 'empty-state__icon', '📭');
  icon.setAttribute('aria-hidden', 'true');
  const text = createElement('p', '', message);
  wrap.append(icon, text);
  return wrap;
}

export function renderSkeleton(count = 4) {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const row = createElement('div', 'skeleton-card');
    row.setAttribute('aria-hidden', 'true');
    frag.append(row);
  }
  return frag;
}
