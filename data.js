export const projects = [
  { id: 'p1', title: 'Внедрение CRM', description: 'Автоматизация отдела продаж', status: 'approved', budgetPlan: 500000, createdAt: '2026-01-10', department: 'ИТ', manager: 'Анна Смирнова', tags: ['IT', 'Приоритет 1'] },
  { id: 'p2', title: 'Реконструкция офиса', description: 'Ремонт 3-го этажа', status: 'pending', budgetPlan: 1200000, createdAt: '2026-02-15', department: 'Администрация', manager: 'Олег Иванов', tags: ['Стройка'] },
  { id: 'p3', title: 'Маркетинговая кампания', description: 'Запуск нового продукта', status: 'approved', budgetPlan: 300000, createdAt: '2026-03-01', department: 'Маркетинг', manager: 'Мария Петрова', tags: ['Реклама', 'Digital'] },
  { id: 'p4', title: 'Обновление парка ПК', description: 'Закупка 50 рабочих станций', status: 'rejected', budgetPlan: 2500000, createdAt: '2026-03-12', department: 'ИТ', manager: 'Сергей Сидоров', tags: ['Hardware'] },
  { id: 'p5', title: 'Обучение персонала', description: 'Курсы по кибербезопасности', status: 'approved', budgetPlan: 150000, createdAt: '2026-04-05', department: 'HR', manager: 'Елена Козлова', tags: ['Обучение'] },
  { id: 'p6', title: 'Разработка мобильного приложения', description: 'iOS и Android версии', status: 'pending', budgetPlan: 800000, createdAt: '2026-04-20', department: 'ИТ', manager: 'Анна Смирнова', tags: ['Mobile', 'IT'] },
  { id: 'p7', title: 'Логистический аудит', description: 'Оптимизация цепочек поставок', status: 'approved', budgetPlan: 200000, createdAt: '2026-05-02', department: 'Логистика', manager: 'Дмитрий Волков', tags: ['Аудит'] },
  { id: 'p8', title: 'Юридическое сопровождение', description: 'Абонентское обслуживание', status: 'approved', budgetPlan: 350000, createdAt: '2026-05-15', department: 'Юристы', manager: 'Ольга Соколова', tags: ['Legal'] },
  { id: 'p9', title: 'Запуск нового цеха', description: 'Производство упаковки', status: 'pending', budgetPlan: 5000000, createdAt: '2026-06-01', department: 'Производство', manager: 'Илья Морозов', tags: ['Стройка', 'Оборудование'] },
  { id: 'p10', title: 'Ребрендинг', description: 'Смена визуального стиля', status: 'rejected', budgetPlan: 450000, createdAt: '2026-06-10', department: 'Маркетинг', manager: 'Мария Петрова', tags: ['Дизайн'] },
  { id: 'p11', title: 'Корпоративный портал', description: 'Внутренняя база знаний', status: 'approved', budgetPlan: 250000, createdAt: '2026-07-01', department: 'ИТ', manager: 'Сергей Сидоров', tags: ['IT'] },
  { id: 'p12', title: 'Программа лояльности', description: 'Бонусы для клиентов', status: 'approved', budgetPlan: 600000, createdAt: '2026-07-14', department: 'Маркетинг', manager: 'Алексей Смирнов', tags: ['CRM'] },
  { id: 'p13', title: 'Энергоаудит зданий', description: 'Снижение затрат на электричество', status: 'pending', budgetPlan: 180000, createdAt: '2026-08-02', department: 'Администрация', manager: 'Олег Иванов', tags: ['Экология'] },
  { id: 'p14', title: 'Автоматизация склада', description: 'Внедрение WMS', status: 'approved', budgetPlan: 1500000, createdAt: '2026-08-20', department: 'Логистика', manager: 'Дмитрий Волков', tags: ['IT', 'Склад'] },
  { id: 'p15', title: 'Найм топ-менеджеров', description: 'Поиск директора по развитию', status: 'pending', budgetPlan: 900000, createdAt: '2026-09-05', department: 'HR', manager: 'Елена Козлова', tags: ['HR'] }
];

export const expenses = [
  { id: 'e1', title: 'Лицензии ПО', description: 'Годовые подписки', status: 'paid', fact: 120000, createdAt: '2026-01-20', projectId: 'p1', category: 'Software', approvedBy: 'Финансовый отдел' },
  { id: 'e2', title: 'Стройматериалы', description: 'Закупка гипсокартона и краски', status: 'approved', fact: 350000, createdAt: '2026-02-18', projectId: 'p2', category: 'Materials', approvedBy: 'Прораб' },
  { id: 'e3', title: 'Реклама в соцсетях', description: 'Таргет ВК и Телеграм', status: 'paid', fact: 80000, createdAt: '2026-03-05', projectId: 'p3', category: 'Marketing', approvedBy: 'Маркетинг' },
  { id: 'e4', title: 'Ноутбуки Dell', description: 'Партия 20 штук', status: 'rejected', fact: 400000, createdAt: '2026-03-15', projectId: 'p4', category: 'Hardware', approvedBy: 'Нет' },
  { id: 'e5', title: 'Курс по безопасности', description: 'Оплата лектору', status: 'pending', fact: 50000, createdAt: '2026-04-10', projectId: 'p5', category: 'Education', approvedBy: 'Ожидает' },
  { id: 'e6', title: 'Дизайн макета', description: 'UI/UX для приложения', status: 'paid', fact: 150000, createdAt: '2026-04-25', projectId: 'p6', category: 'Design', approvedBy: 'Арт-директор' },
  { id: 'e7', title: 'Консалтинг', description: 'Услуги логистической фирмы', status: 'approved', fact: 70000, createdAt: '2026-05-05', projectId: 'p7', category: 'Services', approvedBy: 'Директор' },
  { id: 'e8', title: 'Госпошлины', description: 'Оплата судебных издержек', status: 'paid', fact: 15000, createdAt: '2026-05-20', projectId: 'p8', category: 'Legal', approvedBy: 'Юрист' },
  { id: 'e9', title: 'Станки ЧПУ', description: 'Оборудование для цеха', status: 'pending', fact: 2000000, createdAt: '2026-06-05', projectId: 'p9', category: 'Equipment', approvedBy: 'Ожидает' },
  { id: 'e10', title: 'Полиграфия', description: 'Печать новых визиток', status: 'rejected', fact: 30000, createdAt: '2026-06-15', projectId: 'p10', category: 'Print', approvedBy: 'Нет' },
  { id: 'e11', title: 'Серверное железо', description: 'Стойка и процессоры', status: 'approved', fact: 180000, createdAt: '2026-07-05', projectId: 'p11', category: 'Hardware', approvedBy: 'ИТ-директор' },
  { id: 'e12', title: 'Разработка ПО', description: 'Бэкенд для бонусов', status: 'paid', fact: 250000, createdAt: '2026-07-20', projectId: 'p12', category: 'Software', approvedBy: 'Финансовый отдел' },
  { id: 'e13', title: 'Тепловизоры', description: 'Оборудование для аудита', status: 'pending', fact: 60000, createdAt: '2026-08-10', projectId: 'p13', category: 'Equipment', approvedBy: 'Ожидает' },
  { id: 'e14', title: 'Внедрение WMS', description: 'Оплата интегратору', status: 'approved', fact: 500000, createdAt: '2026-08-25', projectId: 'p14', category: 'Software', approvedBy: 'ИТ-директор' },
  { id: 'e15', title: 'Услуги хедхантера', description: 'Поиск кандидатов', status: 'pending', fact: 300000, createdAt: '2026-09-10', projectId: 'p15', category: 'HR', approvedBy: 'Ожидает' }
];
