/* Sistema de Registro de Incidencias - v1.0.0
 * Registro y listado de incidencias (sin base de datos, solo en memoria).
 */

function crearIncidencia(lista, datos) {
  var titulo = (datos.titulo || "").trim();
  if (!titulo) {
    throw new Error("El título es obligatorio");
  }
  var incidencia = {
    id: lista.length + 1,
    titulo: titulo,
    descripcion: (datos.descripcion || "").trim(),
    reportadoPor: (datos.reportadoPor || "").trim() || "Anónimo",
    estado: "Abierta",
    fecha: new Date().toISOString().slice(0, 10)
  };
  lista.push(incidencia);
  return incidencia;
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
    reportadoPor: "María"
  });

  var listaEl = document.getElementById("lista");
  var formEl = document.getElementById("form-incidencia");
  var errorEl = document.getElementById("error");

  var render = function () {
    listaEl.innerHTML = "";
    incidencias.forEach(function (inc) {
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
        reportadoPor: document.getElementById("reportadoPor").value
      });
      errorEl.textContent = "";
      formEl.reset();
      render();
    } catch (err) {
      errorEl.textContent = err.message;
    }
  });

  render();
}

if (typeof module !== "undefined") {
  module.exports = { crearIncidencia: crearIncidencia };
}
