// Lista de usuarios
let users = [];

// Función para agregar usuario a la lista
function addUser(id, identificationType, identificationNumber, name, lastName, phone, address, city, state) {
  users.push({ id, identificationType, identificationNumber, name, lastName, phone, address, city, state });
}

// Función para renderizar la tabla de usuarios
function renderUserTable() {
  const tableBody = document.querySelector('#userTable tbody');
  tableBody.innerHTML = '';
  users.forEach(user => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${user.id}</td>
      <td>${user.identificationType}</td>
      <td>${user.identificationNumber}</td>
      <td>${user.name}</td>
      <td>${user.lastName}</td>
      <td>${user.phone}</td>
      <td>${user.address}</td>
      <td>${user.city}</td>
      <td>${user.state}</td>
      <td class="actions">
        <button class="edit" onclick="editUser('${user.id}')">Editar</button>
        <button class="delete" onclick="confirmDeleteUser('${user.id}')">Eliminar</button>
        <button class="toggle-status" onclick="toggleUserStatus('${user.id}')">${user.state === 'activo' ? 'Desactivar' : 'Activar'}</button>
      </td>
    `;
    tableBody.appendChild(newRow);
  });
}

// Función para mostrar una alerta
function showAlert(message) {
  alert(message);
}

// Función para agregar un nuevo usuario
function addUserForm() {
  const id = prompt('Ingrese el ID del cliente:');
  const identificationType = prompt('Ingrese el tipo de identificación:');
  const identificationNumber = prompt('Ingrese el número de identificación:');
  const name = prompt('Ingrese el nombre del cliente:');
  const lastName = prompt('Ingrese el apellido del cliente:');
  const phone = prompt('Ingrese el teléfono del cliente:');
  const address = prompt('Ingrese la dirección del cliente:');
  const city = prompt('Ingrese la ciudad del cliente:');
  if (id && identificationType && identificationNumber && name && lastName && phone && address && city) {
    addUser(id, identificationType, identificationNumber, name, lastName, phone, address, city, 'activo'); // Por defecto, el nuevo usuario se agrega como activo
    renderUserTable();
    showAlert('Cliente agregado correctamente');
  }
}

// Función para editar un usuario
function editUser(id) {
  const user = users.find(u => u.id === id);
  if (user) {
    const newName = prompt('Editar nombre del cliente:', user.name);
    const newLastName = prompt('Editar apellido del cliente:', user.lastName);
    const newPhone = prompt('Editar teléfono del cliente:', user.phone);
    const newAddress = prompt('Editar dirección del cliente:', user.address);
    const newCity = prompt('Editar ciudad del cliente:', user.city);
    if (newName && newLastName && newPhone && newAddress && newCity) {
      user.name = newName;
      user.lastName = newLastName;
      user.phone = newPhone;
      user.address = newAddress;
      user.city = newCity;
      renderUserTable();
      showAlert('Cliente actualizado correctamente');
    }
  }
}

// Función para confirmar la eliminación de un usuario
function confirmDeleteUser(id) {
  const confirmDelete = confirm('¿Está seguro de eliminar este cliente?');
  if (confirmDelete) {
    deleteUser(id);
  }
}

// Función para eliminar un usuario
function deleteUser(id) {
  users = users.filter(user => user.id !== id);
  renderUserTable();
  showAlert('Cliente eliminado correctamente');
}

// Función para activar o desactivar un usuario
function toggleUserStatus(id) {
  const user = users.find(u => u.id === id);
  if (user) {
    user.state = user.state === 'activo' ? 'inactivo' : 'activo';
    renderUserTable();
    showAlert(`Cliente ${user.state === 'activo' ? 'activado' : 'desactivado'} correctamente`);
  }
}

// Inicializar la tabla con algunos usuarios de ejemplo
addUser('001', 'DNI', '12345678', 'Juan', 'Pérez', '555-123-456', 'Calle Principal 123', 'Buenos Aires', 'activo');
addUser('002', 'CUIL', '87654321', 'María', 'García', '555-987-654', 'Avenida Central 456', 'Madrid', 'activo');
addUser('003', 'RUC', '54321678', 'Luis', 'Martínez', '555-789-012', 'Plaza Mayor 789', 'Barcelona', 'inactivo');
renderUserTable();

// Mostrar u ocultar la gestión de clientes al hacer clic en el botón
document.getElementById('btnShowUserManagement').addEventListener('click', function() {
  var userManagement = document.getElementById('userManagement');
  if (userManagement.style.display === 'none') {
    userManagement.style.display = 'block';
  } else {
    userManagement.style.display = 'none';
  }
});
