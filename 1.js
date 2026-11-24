const budgetData = [
  { id: 1,  name: "Аренда квартиры",     category: "Жильё",       expenses: 35000, planned: 32000, date: "2026-01-10", rating: 5, inStock: true,  tags: ["обязательное", "жильё"] },
  { id: 2,  name: "Коммунальные услуги", category: "Жильё",       expenses: 6000,  planned: 5500,  date: "2026-01-05", rating: 5, inStock: true,  tags: ["обязательное"] },
  { id: 3,  name: "Продукты на месяц",   category: "Продукты",    expenses: 20000, planned: 17000, date: "2026-01-15", rating: 5, inStock: true,  tags: ["обязательное", "ежемесячное"] },
  { id: 4,  name: "Бытовые расходы",     category: "Продукты",    expenses: 2000,  planned: 1800,  date: "2026-01-14", rating: 3, inStock: true,  tags: ["мелкое"] },
  { id: 5,  name: "Проездной на метро",  category: "Транспорт",   expenses: 2500,  planned: 2500,  date: "2026-01-01", rating: 4, inStock: true,  tags: ["ежемесячное"] },
  { id: 6,  name: "Бензин",              category: "Транспорт",   expenses: 3000,  planned: 3500,  date: "2026-01-22", rating: 3, inStock: true,  tags: ["переменное"] },
  { id: 7,  name: "Кафе и рестораны",    category: "Развлечения", expenses: 5000,  planned: 4000,  date: "2026-01-25", rating: 2, inStock: false, tags: ["необязательное"] },
  { id: 8,  name: "Подписки на сервисы", category: "Развлечения", expenses: 800,   planned: 800,   date: "2026-01-03", rating: 2, inStock: true,  tags: ["ежемесячное"] },
  { id: 9,  name: "Подарки",             category: "Развлечения", expenses: 1500,  planned: 1500,  date: "2026-01-28", rating: 3, inStock: false, tags: ["разовое"] },
  { id: 10, name: "Одежда",              category: "Развлечения", expenses: 3000,  planned: 3000,  date: "2026-01-20", rating: 3, inStock: false, tags: ["разовое"] },
  { id: 11, name: "Книги и обучение",    category: "Образование", expenses: 2000,  planned: 1500,  date: "2026-01-12", rating: 4, inStock: true,  tags: ["развитие"] },
  { id: 12, name: "Онлайн-курсы",        category: "Образование", expenses: 5000,  planned: 4500,  date: "2026-01-16", rating: 4, inStock: false, tags: ["развитие"] },
  { id: 13, name: "Медицина",            category: "Здоровье",    expenses: 4000,  planned: 3000,  date: "2026-01-18", rating: 5, inStock: true,  tags: ["обязательное"] },
  { id: 14, name: "Спортзал",            category: "Здоровье",    expenses: 3000,  planned: 2500,  date: "2026-01-08", rating: 4, inStock: true,  tags: ["здоровье"] },
  { id: 15, name: "Накопления",          category: "Накопления",  expenses: 10000, planned: 8000,  date: "2026-01-31", rating: 5, inStock: true,  tags: ["обязательное", "цель"] },
  { id: 16, name: "Резервный фонд",      category: "Накопления",  expenses: 5000,  planned: 5000,  date: "2026-01-31", rating: 4, inStock: true,  tags: ["подушка"] }
];

function printAllProducts() {
  console.log("=== Каталог расходов ===");
  for (let i = 0; i < budgetData.length; i++) {
    const p = budgetData[i];
    console.log(`${p.name} — ${p.expenses} руб. — ${p.category}`);
  }
}

function countProducts() {
  let total = 0;
  let inStockCount = 0;
  for (const p of budgetData) {
    total++;
    if (p.inStock) inStockCount++;
  }
  return { total, inStock: inStockCount };
}

function findById(id) {
  let i = 0;
  while (i < budgetData.length) {
    if (budgetData[i].id === id) return budgetData[i];
    i++;
  }
  return undefined;
}

function findMostExpensive() {
  let most = budgetData[0];
  for (const p of budgetData) {
    if (p.expenses > most.expenses) most = p;
  }
  return most;
}

function findCheapest() {
  let min = budgetData[0];
  for (const p of budgetData) {
    if (p.expenses < min.expenses) min = p;
  }
  return min;
}

function getRatingDescription(rating) {
  switch (rating) {
    case 1: return "Очень плохой";
    case 2: return "Плохой";
    case 3: return "Средний";
    case 4: return "Хороший";
    case 5: return "Отличный";
    default: return "Неизвестный";
  }
}

const filterByCategory   = (cat)      => budgetData.filter(p => p.category === cat);
const filterByPriceRange = (min, max) => budgetData.filter(p => p.expenses >= min && p.expenses <= max);
const getInStock         = ()         => budgetData.filter(p => p.inStock);

const searchByName = (query) =>
  budgetData.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

const findFirstByRating = (minRating) =>
  budgetData.find(p => p.rating > minRating);

const sortByPrice = (direction = "asc") =>
  [...budgetData].sort((a, b) =>
    direction === "asc" ? a.expenses - b.expenses : b.expenses - a.expenses
  );

const sortByRating = () => [...budgetData].sort((a, b) => b.rating - a.rating);
const sortByName   = () => [...budgetData].sort((a, b) => a.name.localeCompare(b.name));

const toNamePriceStrings = () => budgetData.map(p => `${p.name} — ${p.expenses} руб.`);

const applyDiscount = (percent) =>
  budgetData.map(p => ({ ...p, expenses: Math.round(p.expenses * (1 - percent / 100)) }));

const totalExpenses   = () => budgetData.reduce((sum, p) => sum + p.expenses, 0);
const averageExpenses = () => totalExpenses() / budgetData.length;
const averageRating   = () => budgetData.reduce((s, p) => s + p.rating, 0) / budgetData.length;

const groupByCategory = () =>
  budgetData.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {});

const getAvailableByCategorySorted = (category) =>
  budgetData
    .filter(p => p.category === category)
    .filter(p => p.inStock)
    .sort((a, b) => a.expenses - b.expenses);

const getShowcase = (category, n) =>
  budgetData
    .filter(p => p.category === category)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, n)
    .map(p => `${p.name} — ${p.expenses} руб. — ★${p.rating}`);

function getStatistics() {
  return {
    total:      budgetData.length,
    inStock:    budgetData.filter(p => p.inStock).length,
    totalSum:   totalExpenses(),
    avgPrice:   averageExpenses(),
    avgRating:  averageRating(),
    most:       findMostExpensive(),
    cheapest:   findCheapest(),
    categories: new Set(budgetData.map(p => p.category)).size
  };
}

function renderProductRow(product) {
  const tr = document.createElement("tr");

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
  const time = document.createElement("time");
  time.setAttribute("datetime", product.date);
  time.textContent = product.date;
  tdDate.appendChild(time);
  tr.appendChild(tdDate);

  const tdRating = document.createElement("td");
  tdRating.textContent = "★".repeat(product.rating);
  tdRating.title = getRatingDescription(product.rating);
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

  addItem("Всего записей:",        stats.total);
  addItem("Оплачено:",             stats.inStock);
  addItem("Общая сумма:",          `${stats.totalSum} руб.`);
  addItem("Средний расход:",       `${stats.avgPrice.toFixed(2)} руб.`);
  addItem("Средний рейтинг:",      stats.avgRating.toFixed(2));
  addItem("Самый дорогой:",        `${stats.most.name} — ${stats.most.expenses} руб.`);
  addItem("Самый дешёвый:",        `${stats.cheapest.name} — ${stats.cheapest.expenses} руб.`);
  addItem("Количество категорий:", stats.categories);

  section.appendChild(dl);
  return section;
}

document.addEventListener("DOMContentLoaded", () => {
  const statsContainer = document.getElementById("stats-container");
  const searchInput    = document.getElementById("search-input");
  const categorySelect = document.getElementById("category-filter");
  const minPriceInput  = document.getElementById("min-price");
  const maxPriceInput  = document.getElementById("max-price");
  const discountInput  = document.getElementById("discount-percent");

  [...new Set(budgetData.map(p => p.category))].sort().forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });

  function updateTable(products) {
    const oldTbody = document.getElementById("expenses-tbody");
    const newTbody = renderTable(products);
    if (oldTbody) {
      oldTbody.replaceWith(newTbody);
    }
  }

  function updateStats() {
    statsContainer.replaceChildren(renderStatistics(getStatistics()));
  }

  function applyFilters() {
    let result = [...budgetData];

    const q = searchInput.value.trim().toLowerCase();
    if (q) result = result.filter(p => p.name.toLowerCase().includes(q));

    if (categorySelect.value) {
      result = result.filter(p => p.category === categorySelect.value);
    }

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

  document.getElementById("sort-price-asc")
    .addEventListener("click", () => updateTable(sortByPrice("asc")));
  document.getElementById("sort-price-desc")
    .addEventListener("click", () => updateTable(sortByPrice("desc")));
  document.getElementById("sort-rating")
    .addEventListener("click", () => updateTable(sortByRating()));
  document.getElementById("sort-name")
    .addEventListener("click", () => updateTable(sortByName()));

  document.getElementById("apply-discount")
    .addEventListener("click", () => {
      const percent = Number(discountInput.value);
      if (percent > 0 && percent < 100) {
        updateTable(applyDiscount(percent));
      }
    });

  document.getElementById("reset-btn")
    .addEventListener("click", () => {
      searchInput.value = "";
      categorySelect.value = "";
      minPriceInput.value = "";
      maxPriceInput.value = "";
      discountInput.value = "";
      updateTable(budgetData);
    });

  printAllProducts();
  console.log("Статистика:", getStatistics());
});
