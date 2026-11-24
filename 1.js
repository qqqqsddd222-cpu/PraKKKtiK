const budgetData = [
  { id: 1,  name: "Аренда квартиры",     category: "Жильё",       expenses: 35000, planned: 32000, date: "2026-01-10", rating: 5, inStock: true },
  { id: 2,  name: "Коммунальные услуги", category: "Жильё",       expenses: 6000,  planned: 5500,  date: "2026-01-05", rating: 5, inStock: true },
  { id: 3,  name: "Продукты на месяц",   category: "Продукты",    expenses: 20000, planned: 17000, date: "2026-01-15", rating: 5, inStock: true },
  { id: 4,  name: "Бытовые расходы",     category: "Продукты",    expenses: 2000,  planned: 1800,  date: "2026-01-14", rating: 3, inStock: true },
  { id: 5,  name: "Проездной на метро",  category: "Транспорт",   expenses: 2500,  planned: 2500,  date: "2026-01-01", rating: 4, inStock: true },
  { id: 6,  name: "Бензин",              category: "Транспорт",   expenses: 3000,  planned: 3500,  date: "2026-01-22", rating: 3, inStock: true },
  { id: 7,  name: "Кафе и рестораны",    category: "Развлечения", expenses: 5000,  planned: 4000,  date: "2026-01-25", rating: 2, inStock: false },
  { id: 8,  name: "Подписки на сервисы", category: "Развлечения", expenses: 800,   planned: 800,   date: "2026-01-03", rating: 2, inStock: true },
  { id: 9,  name: "Подарки",             category: "Развлечения", expenses: 1500,  planned: 1500,  date: "2026-01-28", rating: 3, inStock: false },
  { id: 10, name: "Одежда",              category: "Развлечения", expenses: 3000,  planned: 3000,  date: "2026-01-20", rating: 3, inStock: false },
  { id: 11, name: "Книги и обучение",    category: "Образование", expenses: 2000,  planned: 1500,  date: "2026-01-12", rating: 4, inStock: true },
  { id: 12, name: "Онлайн-курсы",        category: "Образование", expenses: 5000,  planned: 4500,  date: "2026-01-16", rating: 4, inStock: false },
  { id: 13, name: "Медицина",            category: "Здоровье",    expenses: 4000,  planned: 3000,  date: "2026-01-18", rating: 5, inStock: true },
  { id: 14, name: "Спортзал",            category: "Здоровье",    expenses: 3000,  planned: 2500,  date: "2026-01-08", rating: 4, inStock: true },
  { id: 15, name: "Накопления",          category: "Накопления",  expenses: 10000, planned: 8000,  date: "2026-01-31", rating: 5, inStock: true },
  { id: 16, name: "Резервный фонд",      category: "Накопления",  expenses: 5000,  planned: 5000,  date: "2026-01-31", rating: 4, inStock: true }
];

const sortByPrice = (direction = "asc") =>
  [...budgetData].sort((a, b) => direction === "asc" ? a.expenses - b.expenses : b.expenses - a.expenses);

const sortByRating = () => [...budgetData].sort((a, b) => b.rating - a.rating);

const sortByDate = () => [...budgetData].sort((a, b) => new Date(a.date) - new Date(b.date));

const totalExpenses = () => budgetData.reduce((sum, p) => sum + p.expenses, 0);

const averageExpenses = () => totalExpenses() / budgetData.length;

const averageRating = () => budgetData.reduce((s, p) => s + p.rating, 0) / budgetData.length;

function getStatistics() {
  return {
    total: budgetData.length,
    totalSum: totalExpenses(),
    avgPrice: averageExpenses(),
    avgRating: averageRating(),
    categories: new Set(budgetData.map(p => p.category)).size
  };
}

function renderProductRow(product) {
  const tr = document.createElement("tr");
  tr.dataset.id = product.id;
  tr.addEventListener("click", () => openModal(product));

  const cells = [
    product.id,
    product.name,
    product.category,
    `${product.expenses} руб.`,
    `${product.planned} руб.`
  ];

  cells.forEach(value => {
    const td = document.createElement("td");
    td.textContent = value;
    tr.appendChild(td);
  });

  const tdDate = document.createElement("td");
  tdDate.textContent = product.date;
  tr.appendChild(tdDate);

  const tdRating = document.createElement("td");
  tdRating.textContent = "★".repeat(product.rating);
  tr.appendChild(tdRating);

  return tr;
}

function renderTable(products) {
  const tbody = document.createElement("tbody");
  tbody.id = "expenses-tbody";
  products.forEach(p => tbody.appendChild(renderProductRow(p)));
  return tbody;
}

function renderStatistics(stats) {
  const section = document.createElement("section");
  section.className = "stats";
  
  const h2 = document.createElement("h2");
  h2.textContent = "Статистика по каталогу";
  section.appendChild(h2);
  
  const dl = document.createElement("dl");
  const addItem = (term, value) => {
    const dt = document.createElement("dt");
    dt.textContent = term;
    const dd = document.createElement("dd");
    dd.textContent = value;
    dl.append(dt, dd);
  };

  addItem("Всего записей:", stats.total);
  addItem("Общая сумма:", `${stats.totalSum} руб.`);
  addItem("Средний расход:", `${stats.avgPrice.toFixed(2)} руб.`);
  addItem("Средний рейтинг:", stats.avgRating.toFixed(2));
  addItem("Количество категорий:", stats.categories);
  
  section.appendChild(dl);
  return section;
}

const modalOverlay = document.getElementById("modal-overlay");
const modalBody = document.getElementById("modal-body");
const modalClose = document.getElementById("modal-close");
const modalOk = document.getElementById("modal-ok");

function openModal(product) {
  modalBody.replaceChildren();
  
  const info = [
    { label: "Название", value: product.name },
    { label: "Категория", value: product.category },
    { label: "Фактические расходы", value: `${product.expenses} руб.` },
    { label: "Запланированные расходы", value: `${product.planned} руб.` },
    { label: "Дата", value: product.date },
    { label: "Рейтинг", value: `${product.rating} из 5` },
    { label: "В наличии", value: product.inStock ? "Да" : "Нет" }
  ];
  
  info.forEach(item => {
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = item.label + ": ";
    p.appendChild(strong);
    p.appendChild(document.createTextNode(item.value));
    p.style.marginBottom = "10px";
    modalBody.appendChild(p);
  });

  modalOverlay.classList.add("show");
  document.body.classList.add("modal-open");
}

function closeModal() {
  modalOverlay.classList.remove("show");
  document.body.classList.remove("modal-open");
}

modalClose.addEventListener("click", closeModal);
modalOk.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalOverlay.classList.contains("show")) {
    closeModal();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const statsContainer = document.getElementById("stats-container");
  const searchInput    = document.getElementById("search-input");
  const categorySelect = document.getElementById("category-filter");
  const minPriceInput  = document.getElementById("min-price");
  const maxPriceInput  = document.getElementById("max-price");

  [...new Set(budgetData.map(p => p.category))].sort().forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });

  function updateTable(products) {
    const oldTbody = document.getElementById("expenses-tbody");
    const newTbody = renderTable(products);
    if (oldTbody) oldTbody.replaceWith(newTbody);
  }

  function updateStats() {
    statsContainer.replaceChildren(renderStatistics(getStatistics()));
  }

  function applyFilters() {
    let result = [...budgetData];
    const q = searchInput.value.trim().toLowerCase();
    if (q) result = result.filter(p => p.name.toLowerCase().includes(q));
    if (categorySelect.value) result = result.filter(p => p.category === categorySelect.value);
    const min = Number(minPriceInput.value) || 0;
    const max = Number(maxPriceInput.value) || Infinity;
    result = result.filter(p => p.expenses >= min && p.expenses <= max);
    updateTable(result);
  }

  updateTable(budgetData);
  updateStats();

  searchInput.addEventListener("input", applyFilters);
  categorySelect.addEventListener("change", applyFilters);
  minPriceInput.addEventListener("input", applyFilters);
  maxPriceInput.addEventListener("input", applyFilters);

  document.getElementById("reset-btn").addEventListener("click", () => {
    searchInput.value = "";
    categorySelect.value = "";
    minPriceInput.value = "";
    maxPriceInput.value = "";
    updateTable(budgetData);
  });

  let sortDirection = "asc";
  document.querySelectorAll(".sortable").forEach(th => {
    th.addEventListener("click", () => {
      const field = th.dataset.sort;
      
      document.querySelectorAll(".sort-arrow").forEach(arrow => {
        arrow.classList.remove("asc", "desc");
      });

      const arrow = th.querySelector(".sort-arrow");
      arrow.classList.add(sortDirection);

      if (field === "expenses") {
        updateTable(sortByPrice(sortDirection));
      } else if (field === "rating") {
        updateTable(sortByRating());
      } else if (field === "date") {
        updateTable(sortByDate());
      }
      
      sortDirection = sortDirection === "asc" ? "desc" : "asc";
    });
  });
});
