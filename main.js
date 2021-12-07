let newSW;
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then(result => {
      result.addEventListener('updatefound', () => {
        newSW = result.installing;
        console.log('Hay un nuevo SW', newSW)


      })
    })

  })
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => navigator.serviceWorker.ready)
    .then(registration => {
      if ('SyncManager' in window) {
        registration.sync.register('sync-messages')
      }
    })
}

document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('select', '.datepicker');
  let instances = M.FormSelect.init(elems);

});
$(document).ready(function () {
  $('#txtFecha').datepicker();
});
$(document).ready(function () {
  $('#txtHora').timepicker();
});



document.addEventListener('DOMContentLoaded', () => {
  let txtNombre = document.querySelector('#txtNombre')
  let txtApellidos = document.querySelector('#txtApellidos')
  let txtTelefono = document.querySelector('#txtTelefono')
  let txtEmail = document.querySelector('#txtEmail')
  let txtFecha = document.querySelector('#txtFecha')
  let txtHora = document.querySelector('#txtHora')
  let txtCantidad = document.querySelector('#txtCantidad')
  let txtSeleccion = document.querySelector('#txtSeleccion')
  let btnEnviar = document.querySelector('#btnEnviar')
})

btnEnviar.addEventListener('click', () => {
  let cita = {
    nombre: txtNombre.value,
    apellidos: txtApellidos.value,
    telefono: txtTelefono.value,
    email: txtEmail.value,
    fecha: txtFecha.value,
    hora: txtHora.value,
    cantidad: txtCantidad.value,
    seleccion: txtSeleccion.value,
  }

  console.log(cita)
  let citaObjeto = JSON.stringify(cita)
  fetch('/api/enviarCita', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: citaObjeto
  }).catch(err => {
    saveMessagesInOffline(citaObjeto)
  })
})

async function saveMessagesInOffline(messages) {
  const db = await openDB('messages', 1, {
    upgrade(db) {
      db.createObjectStore('messageToSync', { keyPath: 'id' });
    }
  });
  const tx = db.transaction('messagesToSync', 'readwrite');
  tx.store.put({ ...messages }); //Spread Operator - Hacer copia de un objeto
  await tx.done;
}
let bd;
function iniciar() {
    boton = document.getElementById("btnEnviar")
    boton.addEventListener("click", agregarobjeto, false)
  
    let solicitud = indexedDB.open("mibase");
  
    solicitud.onsuccess = function (e) {
      bd = e.target.result;
    }
    solicitud.onupgradeneeded = function (e) {
      bd = e.target.result;
      bd.createObjectStore('reservacion', { keyPath: 'nombre' });
    }
  }
  function agregarobjeto() {
    let txtNombre=document.getElementById("txtNombre").value;
    let txtApellidos=document.getElementById("txtApellidos").value;
    let txtTelefono=document.getElementById("txtTelefono").value;
    let txtEmail=document.getElementById("txtEmail").value;
    let txtCantidad=document.getElementById("txtCantidad").value;
    let txtFecha=document.getElementById("txtFecha").value;
    let txtHora=document.getElementById("txtHora").value;
    let txtSeleccion=document.getElementById("txtSeleccion").value;
  
    let transaccion=bd.transaction(["reservacion"], "readwrite");
  
    let almacen= transaccion.objectStore("reservacion")

    let reservacion = {nombre: txtNombre,apellidos:txtApellidos,
      telefono: txtTelefono,email:txtEmail,cantidad:txtCantidad,
      date:txtFecha,time:txtHora,seleccion:txtSeleccion

  };
  
    let agregar = almacen.add(reservacion);
  
  
  }

  
  
  
  
  window.addEventListener("load", iniciar, false);