let pacientes = [];
let indiceEditar = -1;

function registrarPaciente() {
  const nombre = document.getElementById('nombre').value.trim();
  const dni = document.getElementById('dni').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const edad = document.getElementById('edad').value.trim();
  const direccion = document.getElementById('direccion').value.trim();
  const motivo = document.getElementById('motivo').value.trim();

  if (nombre === '' || dni === '' || telefono === '' || edad === '' || direccion === '' || motivo === '') {
    alert("Por favor, complete todos los campos.");
    return;
  }

  if (dni.length !== 8 || isNaN(dni)) {
    alert("El DNI debe tener 8 dígitos numéricos.");
    return;
  }

  if (telefono.length !== 9 || isNaN(telefono)) {
    alert("El Telefono debe tener 9 dígitos numéricos.");
    return;
  }

  if (parseInt(edad) <= 0) {
    alert("La edad debe ser un número positivo.");
    return;
  }

  const paciente = { nombre, dni, telefono, edad, direccion, motivo };

  if (indiceEditar === -1) {
    pacientes.push(paciente);
  } else {
    pacientes[indiceEditar] = paciente;
    indiceEditar = -1;
    document.getElementById('cancelarBtn').classList.add('d-none');
  }

  limpiarFormulario();
  mostrarPacientes();
}

function mostrarPacientes() {
  const tabla = document.getElementById('tablaPacientes');
  tabla.innerHTML = '';

  pacientes.forEach((p, i) => {
    tabla.innerHTML += `
      <tr>
        <td>${p.nombre}</td>
        <td>${p.dni}</td>
        <td>${p.telefono}</td>
        <td>${p.edad}</td>
        <td>${p.direccion}</td>
        <td>${p.motivo}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editarPaciente(${i})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="eliminarPaciente(${i})">Eliminar</button>
        </td>
      </tr>`;
  });
}

function editarPaciente(i) {
  const p = pacientes[i];
  document.getElementById('nombre').value = p.nombre;
  document.getElementById('dni').value = p.dni;
  document.getElementById('telefono').value = p.telefono;
  document.getElementById('edad').value = p.edad;
  document.getElementById('direccion').value = p.direccion;
  document.getElementById('motivo').value = p.motivo;
  indiceEditar = i;
  document.getElementById('cancelarBtn').classList.remove('d-none');
}

function eliminarPaciente(i) {
  if (confirm("¿Deseas eliminar este registro?")) {
    pacientes.splice(i, 1);
    mostrarPacientes();
  }
}

function cancelarEdicion() {
  limpiarFormulario();
  indiceEditar = -1;
  document.getElementById('cancelarBtn').classList.add('d-none');
}

function limpiarFormulario() {
  document.getElementById('nombre').value = '';
  document.getElementById('dni').value = '';
  document.getElementById('telefono').value = '';
  document.getElementById('edad').value = '';
  document.getElementById('direccion').value = '';
  document.getElementById('motivo').value = '';
}

mostrarPacientes();
