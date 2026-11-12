// Validación automática de la aplicación (se ejecuta en GitHub Actions)
const fs = require("fs");
const assert = require("assert");

let fallos = 0;
function prueba(nombre, fn) {
  try {
    fn();
    console.log("OK   - " + nombre);
  } catch (e) {
    fallos++;
    console.error("FAIL - " + nombre + ": " + e.message);
  }
}

// 1. Archivos obligatorios
["index.html", "style.css", "app.js", "README.md"].forEach(function (f) {
  prueba("existe " + f, function () {
    assert.ok(fs.existsSync(f), f + " no existe");
  });
});

// 2. El HTML enlaza los recursos
prueba("index.html enlaza app.js y style.css", function () {
  const html = fs.readFileSync("index.html", "utf8");
  assert.ok(html.includes("app.js"));
  assert.ok(html.includes("style.css"));
});

// 3. Lógica de negocio
const app = require("./app.js");

prueba("crearIncidencia registra una incidencia", function () {
  const lista = [];
  const inc = app.crearIncidencia(lista, { titulo: "Prueba", descripcion: "d", reportadoPor: "Ana" });
  assert.strictEqual(lista.length, 1);
  assert.strictEqual(inc.estado, "Abierta");
  assert.strictEqual(inc.id, 1);
});

prueba("crearIncidencia exige título", function () {
  assert.throws(function () {
    app.crearIncidencia([], { titulo: "   " });
  });
});

if (fallos > 0) {
  console.error("\n" + fallos + " prueba(s) fallaron");
  process.exit(1);
}
console.log("\nTodas las validaciones pasaron");
