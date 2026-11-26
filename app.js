document.addEventListener("DOMContentLoaded", () => {
  // 1. Первичная отрисовка
  const oldTbody = document.getElementById("expenses-tbody");
  if (oldTbody) {
    oldTbody.replaceWith(renderTable(budgetData));
  }

  const statsContainer = document.getElementById("stats-container");
  if (statsContainer) {
    const totalSum = budgetData.reduce((sum, p) => sum + p.expenses, 0);
    const avgPrice = totalSum / budgetData.length;
    const avgRating = budgetData.reduce((s, p) => s + p.rating, 0) / budgetData.length;
    statsContainer.replaceChildren(renderStatistics({
      total: budgetData.length,
      totalSum: totalSum,
      avgPrice: avgPrice,
      avgRating: avgRating
    }));
  }

  // 2. Темы
  const themeSelect = document.getElementById("theme-select");
  const accentPicker = document.getElementById("accent-color");
  if (themeSelect && accentPicker) {
    themeSelect.value = localStorage.getItem('app-theme') || 'dark';
    accentPicker.value = localStorage.getItem('app-accent') || '#06b6d4';

    themeSelect.addEventListener("change", (e) => {
      document.documentElement.setAttribute("data-theme", e.target.value);
      localStorage.setItem('app-theme', e.target.value);
    });

    accentPicker.addEventListener("input", (e) => {
      const hex = e.target.value;
      document.documentElement.style.setProperty('--accent', hex);
      document.documentElement.style.setProperty('--accent-rgb', 
        `${parseInt(hex.slice(1,3),16)}, ${parseInt(hex.slice(3,5),16)}, ${parseInt(hex.slice(5,7),16)}`);
      localStorage.setItem('app-accent', hex);
    });
  }

  // 3. Элементы фильтров
  const searchInput = document.getElementById("search-input");
  const categorySelect = document.getElementById("category-filter");
  const minPriceInput = document.getElementById("min-price");
  const maxPriceInput = document.getElementById("max-price");
  const resetBtn = document.getElementById("reset-btn");
  const instockCheckbox = document.getElementById("filter-instock");

  // Заполняем категории
  if (categorySelect) {
    [...new Set(budgetData.map(p => p.category))].sort().forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      categorySelect.appendChild(opt);
    });
  }

  // Функция обновления таблицы
  function updateTable(products) {
    const tbody = document.getElementById("expenses-tbody");
    if (tbody) tbody.replaceWith(renderTable(products));
  }

  // Функция фильтрации (поиск, категория, цена, наличие)
  function applyFilters() {
    let result = [...budgetData];
    
    if (searchInput && searchInput.value.trim()) {
      const q = searchInput.value.trim().toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q));
    }
    
    if (categorySelect && categorySelect.value) {
      result = result.filter(p => p.category === categorySelect.value);
    }
    
    if (minPriceInput && minPriceInput.value) {
      result = result.filter(p => p.expenses >= Number(minPriceInput.value));
    }
    
    if (maxPriceInput && maxPriceInput.value) {
      result = result.filter(p => p.expenses <= Number(maxPriceInput.value));
    }
    
    if (instockCheckbox && instockCheckbox.checked) {
      result = result.filter(p => p.inStock);
    }
    
    updateTable(result);
  }

  // Слушатели для фильтров
  if (searchInput) searchInput.addEventListener("input", applyFilters);
  if (categorySelect) categorySelect.addEventListener("change", applyFilters);
  if (minPriceInput) minPriceInput.addEventListener("input", applyFilters);
  if (maxPriceInput) maxPriceInput.addEventListener("input", applyFilters);
  if (instockCheckbox) instockCheckbox.addEventListener("change", applyFilters);

  // Кнопка сброса
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (categorySelect) categorySelect.value = "";
      if (minPriceInput) minPriceInput.value = "";
      if (maxPriceInput) maxPriceInput.value = "";
      if (instockCheckbox) instockCheckbox.checked = false;
      updateTable(budgetData);
    });
  }

  // 4. СОРТИРОВКА
  let sortDirPrice = "asc";
  let sortDirRating = "desc";
  let sortDirDate = "asc";

  if (document.getElementById("sort-price-btn")) {
    document.getElementById("sort-price-btn").addEventListener("click", () => {
      let sorted = [...budgetData].sort((a, b) => sortDirPrice === "asc" ? a.expenses - b.expenses : b.expenses - a.expenses);
      updateTable(sorted);
      sortDirPrice = sortDirPrice === "asc" ? "desc" : "asc";
    });
  }

  if (document.getElementById("sort-rating-btn")) {
    document.getElementById("sort-rating-btn").addEventListener("click", () => {
      let sorted = [...budgetData].sort((a, b) => sortDirRating === "asc" ? a.rating - b.rating : b.rating - a.rating);
      updateTable(sorted);
      sortDirRating = sortDirRating === "asc" ? "desc" : "asc";
    });
  }

  if (document.getElementById("sort-date-btn")) {
    document.getElementById("sort-date-btn").addEventListener("click", () => {
      let sorted = [...budgetData].sort((a, b) => sortDirDate === "asc" ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date));
      updateTable(sorted);
      sortDirDate = sortDirDate === "asc" ? "desc" : "asc";
    });
  }

  // 5. МОДАЛЬНОЕ ОКНО
  const modalOverlay = document.getElementById("modal-overlay");
  const modalBody = document.getElementById("modal-body");
  const modalClose = document.getElementById("modal-close");
  const modalOk = document.getElementById("modal-ok");
  let focusedElementBeforeModal;

  if (modalOverlay) {
    document.getElementById("main-table").addEventListener("click", (e) => {
      const tr = e.target.closest("tr");
      if (tr && tr.dataset.id) {
        const product = budgetData.find(p => p.id == tr.dataset.id);
        if (product) {
          focusedElementBeforeModal = document.activeElement;
          modalBody.replaceChildren();
          
          const info = [
            { label: "Название", value: product.name },
            { label: "Категория", value: product.category },
            { label: "Статус", value: product.status },
            { label: "Факт. расходы", value: `${product.expenses} руб.` },
            { label: "План. расходы", value: `${product.planned} руб.` },
            { label: "Дата", value: product.date }
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
          setTimeout(() => modalClose.focus(), 50);
        }
      }
    });

    const closeModal = () => {
      modalOverlay.classList.remove("show");
      document.body.classList.remove("modal-open");
      if (focusedElementBeforeModal) focusedElementBeforeModal.focus();
    };

    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modalOk) modalOk.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // 6. МОБИЛЬНОЕ МЕНЮ И ESCAPE
  const hamburger = document.getElementById("hamburger");
  const mobileOverlay = document.getElementById("mobile-overlay");
  const header = document.querySelector("header");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      header.classList.toggle("active");
      if (mobileOverlay) mobileOverlay.classList.toggle("active");
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (modalOverlay && modalOverlay.classList.contains("show")) {
        modalOverlay.classList.remove("show");
        document.body.classList.remove("modal-open");
        if (focusedElementBeforeModal) focusedElementBeforeModal.focus();
      }
      if (header && header.classList.contains("active")) {
        hamburger.classList.remove("active");
        header.classList.remove("active");
        if (mobileOverlay) mobileOverlay.classList.remove("active");
      }
    }
  });
});
