function renderProductRow(product) {
  const tr = document.createElement("tr");
  tr.dataset.id = product.id;

  const createCell = (text, label) => {
    const td = document.createElement("td");
    td.textContent = text;
    if (label) td.setAttribute("data-label", label);
    return td;
  };

  tr.appendChild(createCell(product.id, "ID"));
  tr.appendChild(createCell(product.name, "Заголовок"));
  tr.appendChild(createCell(product.category, "Категория"));

  const tdStatus = document.createElement("td");
  tdStatus.setAttribute("data-label", "Статус");
  const badge = document.createElement("span");
  
  badge.className = "badge " + (product.inStock ? "badge-success" : "badge-danger");
  badge.textContent = product.status;
  
  tdStatus.appendChild(badge);
  tr.appendChild(tdStatus);

  tr.appendChild(createCell(`${product.expenses} руб.`, "Факт. расходы"));
  tr.appendChild(createCell(product.date, "Дата"));
  tr.appendChild(createCell("★".repeat(product.rating), "Рейтинг"));

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
  
  section.appendChild(dl);
  return section;
}
