/* Sistema de Registro de Incidencias - v1.1.0
 * Novedad: filtrado de incidencias por estado y selección de estado al registrar.
 */

var ESTADOS = ["Abierta", "En proceso", "Resuelta"];

function crearIncidencia(lista, datos) {
  var titulo = (datos.titulo || "").trim();
  if (!titulo) {
    throw new Error("El título es obligatorio");
  }
  var estado = datos.estado || "Abierta";
  if (ESTADOS.indexOf(estado) === -1) {
    throw new Error("Estado no válido");
  }
  var incidencia = {
    id: lista.length + 1,
    titulo: titulo,
    descripcion: (datos.descripcion || "").trim(),
    reportadoPor: (datos.reportadoPor || "").trim() || "Anónimo",
    estado: estado,
    fecha: new Date().toISOString().slice(0, 10)
  };
  lista.push(incidencia);
  return incidencia;
}

function filtrarPorEstado(lista, estado) {
  return lista.filter(function (inc) {
    return inc.estado === estado;
  });
}

function claseEstado(estado) {
  return estado.toLowerCase().replace(/\s+/g, "-");
}

/* ---------- Interfaz (solo en el navegador) ---------- */
if (typeof document !== "undefined") {
  var incidencias = [];
  crearIncidencia(incidencias, {
    titulo: "Error al iniciar sesión",
    descripcion: "El botón de ingresar no responde en Firefox.",
    reportadoPor: "María",
    estado: "Abierta"
  });
  crearIncidencia(incidencias, {
    titulo: "Reporte mensual tarda en cargar",
    descripcion: "La pantalla de reportes demora más de 20 segundos.",
    reportadoPor: "Luis",
    estado: "En proceso"
  });
  crearIncidencia(incidencias, {
    titulo: "Texto cortado en móvil",
    descripcion: "El menú se corta en pantallas pequeñas.",
    reportadoPor: "Ana",
    estado: "Resuelta"
  });

  var listaEl = document.getElementById("lista");
  var formEl = document.getElementById("form-incidencia");
  var errorEl = document.getElementById("error");
  var filtroEl = document.getElementById("filtro");

  var render = function () {
    var visibles = filtrarPorEstado(incidencias, filtroEl.value);
    listaEl.innerHTML = "";
    if (visibles.length === 0) {
      var vacio = document.createElement("li");
      vacio.textContent = "No hay incidencias para mostrar.";
      listaEl.appendChild(vacio);
      return;
    }
    visibles.forEach(function (inc) {
      var li = document.createElement("li");
      li.className = "incidencia";

      var h3 = document.createElement("h3");
      h3.textContent = "#" + inc.id + " " + inc.titulo + " ";
      var badge = document.createElement("span");
      badge.className = "badge " + claseEstado(inc.estado);
      badge.textContent = inc.estado;
      h3.appendChild(badge);

      var desc = document.createElement("p");
      desc.textContent = inc.descripcion || "Sin descripción";
      var meta = document.createElement("p");
      meta.textContent = "Reportado por " + inc.reportadoPor + " el " + inc.fecha;

      li.appendChild(h3);
      li.appendChild(desc);
      li.appendChild(meta);
      listaEl.appendChild(li);
    });
  };

  formEl.addEventListener("submit", function (e) {
    e.preventDefault();
    try {
      crearIncidencia(incidencias, {
        titulo: document.getElementById("titulo").value,
        descripcion: document.getElementById("descripcion").value,
        reportadoPor: document.getElementById("reportadoPor").value,
        estado: document.getElementById("estado").value
      });
      errorEl.textContent = "";
      formEl.reset();
      render();
    } catch (err) {
      errorEl.textContent = err.message;
    }
  });

  filtroEl.addEventListener("change", render);
  render();
}

if (typeof module !== "undefined") {
  module.exports = {
    crearIncidencia: crearIncidencia,
    filtrarPorEstado: filtrarPorEstado
  };
}
