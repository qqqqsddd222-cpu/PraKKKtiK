import { projects, expenses } from './data.js';
import { renderProjectCard, renderExpenseTable, renderEmpty, renderSkeleton, createElement } from './render.js';

function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }
}

function initTabs() {
  const tablist = document.querySelector('[role="tablist"]');
  if (!tablist) return;
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const panels = [...document.querySelectorAll('[role="tabpanel"]')];

  function activate(idx) {
    tabs.forEach((t, i) => {
      const on = i === idx;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      if (panels[i]) panels[i].hidden = !on;
    });
  }

  tablist.addEventListener('click', e => {
    const tab = e.target.closest('[role="tab"]');
    if (tab) activate(tabs.indexOf(tab));
  });

  tablist.addEventListener('keydown', e => {
    const i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); activate((i + 1) % tabs.length); tabs[(i + 1) % tabs.length].focus(); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); activate((i - 1 + tabs.length) % tabs.length); tabs[(i - 1 + tabs.length) % tabs.length].focus(); }
  });

  activate(0);
}

function initModal() {
  const modal = document.getElementById('deal-modal');
  if (!modal) return;
  const backdrop = modal.querySelector('.modal__backdrop');
  const closeBtns = modal.querySelectorAll('.modal__close');
  let lastFocused = null;

  function open(data) {
    lastFocused = document.activeElement;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    
    const body = modal.querySelector('.modal__body');
    body.replaceChildren();
    
    const { item, type } = data;
    
    body.append(
      createElement('h3', '', item.title),
      createElement('p', '', item.description || 'Описание отсутствует'),
      createElement('p', '', `Статус: ${item.status}`)
    );

    if (type === 'project') {
      body.append(createElement('p', '', `План: ${item.budgetPlan.toLocaleString()} ₽`));
      body.append(createElement('p', '', `Руководитель: ${item.manager}`));
    } else {
      body.append(createElement('p', '', `Факт: ${item.fact.toLocaleString()} ₽`));
      body.append(createElement('p', '', `Категория: ${item.category}`));
      body.append(createElement('p', '', `Согласовал: ${item.approvedBy}`));
    }

    modal.querySelector('.modal__close')?.focus();
  }

  function close() {
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    lastFocused?.focus();
  }

  document.addEventListener('open-modal', (e) => open(e.detail));
  backdrop.addEventListener('click', close);
  closeBtns.forEach(btn => btn.addEventListener('click', close));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hidden) close();
  });
}

export function showToast(message, type = 'info') {
  let root = document.querySelector('.toast-stack');
  if (!root) {
    root = document.createElement('section');
    root.className = 'toast-stack';
    root.setAttribute('aria-live', 'polite');
    document.body.append(root);
  }
  const t = document.createElement('output');
  t.className = `toast toast--${type}`;
  t.textContent = message;
  root.append(t);
  requestAnimationFrame(() => t.classList.add('is-visible'));
  setTimeout(() => {
    t.classList.remove('is-visible');
    setTimeout(() => t.remove(), 300);
  }, 3000);
}

function initValidation() {
  const form = document.getElementById('deal-form');
  if (!form) return;

  const rules = {
    title: v => v.trim().length >= 3 || 'Минимум 3 символа',
    amount: v => Number(v) > 0 || 'Сумма должна быть больше 0',
  };

  const fields = form.querySelectorAll('[data-rule]');

  function validateField(el) {
    const rule = rules[el.dataset.rule];
    const result = rule ? rule(el.value) : true;
    const errorEl = form.querySelector(`#${el.id}-error`);
    const ok = result === true;
    el.setAttribute('aria-invalid', String(!ok));
    if (errorEl) errorEl.textContent = ok ? '' : result;
    return ok;
  }

  fields.forEach(el => {
    el.addEventListener('blur', () => validateField(el));
    el.addEventListener('input', () => {
      clearTimeout(el._timer);
      el._timer = setTimeout(() => validateField(el), 300);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    fields.forEach(el => { if (!validateField(el)) isValid = false; });
    if (isValid) {
      showToast('Заявка на бюджет успешно отправлена', 'success');
      form.reset();
      fields.forEach(el => el.setAttribute('aria-invalid', 'false'));
    }
  });
}

function initDataRender() {
  const listContainer = document.getElementById('app-list');
  if (!listContainer) return;

  listContainer.append(renderSkeleton());

  setTimeout(() => {
    listContainer.replaceChildren();
    if (projects.length === 0) {
      listContainer.append(renderEmpty());
    } else {
      projects.forEach(project => {
        const card = renderProjectCard(project);
        listContainer.append(card);
      });
    }
  }, 800);

  const tableContainer = document.getElementById('app-table');
  if (tableContainer) {
    tableContainer.append(renderExpenseTable(expenses));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTabs();
  initModal();
  initValidation();
  initDataRender();
});
