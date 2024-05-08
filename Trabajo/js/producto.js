// Lista de productos
let products = [];

// Función para agregar producto a la lista
function addProduct(id, productName, productDescription, productQuantity, productPrice, productIVA, productDiscount, productState) {
  products.push({ id, productName, productDescription, productQuantity, productPrice, productIVA, productDiscount, productState });
}

// Función para renderizar la tabla de productos
function renderProductTable() {
  const tableBody = document.querySelector('#productTable tbody');
  tableBody.innerHTML = '';
  products.forEach(product => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${product.id}</td>
      <td>${product.productName}</td>
      <td>${product.productDescription}</td>
      <td>${product.productQuantity}</td>
      <td>${product.productPrice}</td>
      <td>${product.productIVA}</td>
      <td>${product.productDiscount}</td>
      <td>${product.productState}</td>
      <td class="actions">
        <button class="edit" onclick="editProduct('${product.id}')">Editar</button>
        <button class="delete" onclick="confirmDeleteProduct('${product.id}')">Eliminar</button>
        <button class="toggle-status" onclick="toggleProductStatus('${product.id}')">${product.productState === 'activo' ? 'Desactivar' : 'Activar'}</button>
      </td>
    `;
    tableBody.appendChild(newRow);
  });
}

// Función para mostrar una alerta
function showAlert(message) {
  alert(message);
}

// Función para agregar un nuevo producto
function addProductForm() {
  console.log('Agregando nuevo producto...');
  const id = prompt('Ingrese el ID del producto:');
  console.log('ID del producto:', id);
  const productName = prompt('Ingrese el nombre del producto:');
  console.log('Nombre del producto:', productName);
  const productDescription = prompt('Ingrese la descripción del producto:');
  console.log('Descripción del producto:', productDescription);
  const productQuantity = prompt('Ingrese la cantidad del producto:');
  console.log('Cantidad del producto:', productQuantity);
  const productPrice = prompt('Ingrese el precio del producto:');
  console.log('Precio del producto:', productPrice);
  const productIVA = prompt('Ingrese el IVA del producto:');
  console.log('IVA del producto:', productIVA);
  const productDiscount = prompt('Ingrese el descuento del producto:');
  console.log('Descuento del producto:', productDiscount);
  const productState = prompt('Ingrese el estado del producto:');
  console.log('Estado del producto:', productState);
  if (id && productName && productDescription && productQuantity && productPrice && productIVA && productDiscount && productState) {
    addProduct(id, productName, productDescription, productQuantity, productPrice, productIVA, productDiscount, productState); // Por defecto, el nuevo producto se agrega como activo
    renderProductTable();
    showAlert('Producto agregado correctamente');
  }
}

// Función para editar un producto
function editProduct(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    const newProductName = prompt('Editar nombre del producto:', product.productName);
    const newProductDescription = prompt('Editar descripción del producto:', product.productDescription);
    const newProductQuantity = prompt('Editar cantidad del producto:', product.productQuantity);
    const newProductPrice = prompt('Editar precio del producto:', product.productPrice);
    const newProductIVA = prompt('Editar IVA del producto:', product.productIVA);
    const newProductDiscount = prompt('Editar descuento del producto:', product.productDiscount);
    const newProductState = prompt('Editar estado del producto:', product.productState);
    if (newProductName && newProductDescription && newProductQuantity && newProductPrice && newProductIVA && newProductDiscount && newProductState) {
      product.productName = newProductName;
      product.productDescription = newProductDescription;
      product.productQuantity = newProductQuantity;
      product.productPrice = newProductPrice;
      product.productIVA = newProductIVA;
      product.productDiscount = newProductDiscount;
      product.productState = newProductState;
      renderProductTable();
      showAlert('Producto actualizado correctamente');
    }
  }
}

// Función para confirmar la eliminación de un producto
function confirmDeleteProduct(id) {
  const confirmDelete = confirm('¿Está seguro de eliminar este producto?');
  if (confirmDelete) {
    deleteProduct(id);
  }
}

// Función para eliminar un producto
function deleteProduct(id) {
  products = products.filter(product => product.id !== id);
  renderProductTable();
  showAlert('Producto eliminado correctamente');
}

// Función para activar o desactivar un producto
function toggleProductStatus(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    product.productState = product.productState === 'activo' ? 'inactivo' : 'activo';
    renderProductTable();
    showAlert(`Producto ${product.productState === 'activo' ? 'activado' : 'desactivado'} correctamente`);
  }
}

// Inicializar la tabla con algunos productos de ejemplo
addProduct('001', 'Producto 1', 'Descripción 1', '15', '100.00', '10%', '5%', 'activo');
addProduct('002', 'Producto 2', 'Descripción 2', '12', '200.00', '15%', '8%', 'inactivo');
addProduct('003', 'Producto 3', 'Descripción 3', '20', '300.00', '20%', '3%', 'activo');
addProduct('004', 'Producto 4', 'Descripción 4', '25', '400.00', '25%', '5%', 'activo');
renderProductTable();

// Mostrar u ocultar la gestión de productos al hacer clic en el botón
document.getElementById('btnShowProductManagement').addEventListener('click', function() {
  var productManagement = document.getElementById('productManagement');
  if (productManagement.style.display === 'none') {
    productManagement.style.display = 'block';
  } else {
    productManagement.style.display = 'none';
  }
});

document.getElementById('btnAddProduct').addEventListener('click', function() {
  var formContainer = document.getElementById('addProductFormContainer');
  if (formContainer.style.display === 'none' || formContainer.style.display === '') {
    formContainer.style.display = 'block';
  } else {
    formContainer.style.display = 'none';
  }
});

document.getElementById('addProductForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar que el formulario se envíe de forma convencional
  // Aquí puedes agregar la lógica para manejar el envío del formulario
  // Por ejemplo, obtener los valores de los campos del formulario y agregar el nuevo producto
  // Luego puedes restablecer el formulario o cerrar el contenedor del formulario
});
