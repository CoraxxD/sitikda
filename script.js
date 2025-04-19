
let orders = JSON.parse(localStorage.getItem('orders')) || {
  narzki: [],
  emotes: [],
  startscreen: [],
  history: []
};

async function loadOrders() {
  renderTable('narzki', orders.narzki);
  renderTable('emotes', orders.emotes);
  renderTable('startscreen', orders.startscreen);
  renderTable('history', orders.history, true);
}

function renderTable(id, list, showType = false) {
  const container = document.getElementById(id);
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  let headers = ['#', 'Ник', 'Статус'];
  if (showType) headers.push('Тип');

  thead.innerHTML = '<tr>' + headers.map(h => `<th>${h}</th>`).join('') + '</tr>';

  list.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td>${item.status}</td>
      ${showType ? `<td>${item.type}</td>` : ''}
    `;
    tbody.appendChild(row);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  container.innerHTML = '';
  container.appendChild(table);
}

document.querySelectorAll('.tabs button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.getElementById(btn.dataset.tab).style.display = 'block';
    btn.classList.add('active');
  });
});

document.getElementById('type').addEventListener('change', (e) => {
  document.getElementById('typeField').style.display = e.target.value === 'history' ? 'block' : 'none';
});

document.getElementById('adminForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const status = document.getElementById('status').value.trim();
  const type = document.getElementById('type').value;
  const historyType = document.getElementById('historyType').value.trim();

  if (!name || !status || (type === 'history' && !historyType)) {
    alert('Пожалуйста, заполните все поля.');
    return;
  }

  const newOrder = { name, status };
  if (type === 'history') newOrder.type = historyType;

  orders[type].push(newOrder);
  localStorage.setItem('orders', JSON.stringify(orders));
  loadOrders();
  this.reset();
  document.getElementById('typeField').style.display = 'none';
});

function checkPassword() {
  const password = document.getElementById('adminPassword').value;
  if (password === 'admin123') {
    document.getElementById('passwordModal').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
  } else {
    document.getElementById('wrongPass').style.display = 'block';
  }
}

if (window.location.search.includes('admin=1')) {
  document.getElementById('passwordModal').style.display = 'flex';
}

loadOrders();
