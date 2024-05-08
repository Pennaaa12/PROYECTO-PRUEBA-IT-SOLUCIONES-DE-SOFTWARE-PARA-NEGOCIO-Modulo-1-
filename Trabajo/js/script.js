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
  console.log('Agregando nuevo usuario...');
  const id = prompt('Ingrese el ID del cliente:');
  console.log('ID del cliente:', id);
  const identificationType = prompt('Ingrese el tipo de identificación:');
  console.log('Tipo de identificación:', identificationType);
  const identificationNumber = prompt('Ingrese el número de identificación:');
  console.log('Número de identificación:', identificationNumber);
  const name = prompt('Ingrese el nombre del cliente:');
  console.log('Nombre del cliente:', name);
  const lastName = prompt('Ingrese el apellido del cliente:');
  console.log('Apellido del cliente:', lastName);
  const phone = prompt('Ingrese el teléfono del cliente:');
  console.log('Teléfono del cliente:', phone);
  const address = prompt('Ingrese la dirección del cliente:');
  console.log('Dirección del cliente:', address);
  const city = prompt('Ingrese la ciudad del cliente:');
  console.log('Ciudad del cliente:', city);
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
addUser('01', 'DNI', '12345678', 'Juan', 'Pérez', '555-123-456', 'Calle Principal 123', 'Buenos Aires', 'activo');
addUser('02', 'CUIL', '87654321', 'María', 'García', '555-987-654', 'Avenida Central 456', 'Madrid', 'activo');
addUser('03', 'RUC', '54321678', 'Luis', 'Martínez', '555-789-012', 'Plaza Mayor 789', 'Barcelona', 'inactivo');
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

document.getElementById('btnAddUser').addEventListener('click', function() {
  var formContainer = document.getElementById('addUserFormContainer');
  if (formContainer.style.display === 'none' || formContainer.style.display === '') {
    formContainer.style.display = 'block';
  } else {
    formContainer.style.display = 'none';
  }
});

document.getElementById('addUserForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar que el formulario se envíe de forma convencional
  // Aquí puedes agregar la lógica para manejar el envío del formulario
  // Por ejemplo, obtener los valores de los campos del formulario y agregar el nuevo cliente
  // Luego puedes restablecer el formulario o cerrar el contenedor del formulario
});