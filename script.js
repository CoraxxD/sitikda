async function loadOrders() {
  const res = await fetch('orders.json');
  const data = await res.json();

  renderTable('narzki', data.narzki);
  renderTable('emotes', data.emotes);
  renderTable('startscreen', data.startscreen);
  renderTable('history', data.history, true);
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

loadOrders();
