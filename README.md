# Sistema de Registro de Incidencias

Aplicación web sencilla para registrar y consultar incidencias reportadas por usuarios.
Proyecto de la asignatura **Gestión de la Configuración del Software** (Unidad 3, Tema 3: Despliegue continuo).

## Integrantes

| Integrante | Usuario de GitHub |
|---|---|
| Christopher Aguiño | Chriss369 |
| _(completar)_ | _(completar)_ |
| _(completar)_ | _(completar)_ |
| _(completar)_ | _(completar)_ |

## Tecnologías

HTML, CSS y JavaScript (sin base de datos ni servidor), Git, GitHub, GitHub Actions y GitHub Pages.

## Versión actual: v1.0.0

- Registro de incidencias (título, descripción, reportado por).
- Listado de incidencias con su estado y fecha.

## Cómo ejecutarlo

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/<usuario>/<repositorio>.git
   cd <repositorio>
   ```
2. Abrir `index.html` en el navegador (doble clic), o levantar un servidor local:
   ```bash
   npx serve .
   ```
3. Ejecutar las validaciones (requiere Node.js 18 o superior):
   ```bash
   node validate.js
   ```

## Flujo de trabajo del equipo

- Rama `main`: siempre estable; cada push dispara el despliegue.
- Ramas de trabajo: `feature/<tema>` y `fix/<tema>`.
- Todo cambio entra a `main` mediante Pull Request.
- Versionamiento semántico `MAJOR.MINOR.PATCH` con releases en GitHub.

## Despliegue

El workflow `.github/workflows/deploy.yml` ejecuta `node validate.js` y, si todo pasa,
publica la aplicación en GitHub Pages.

URL pública: `https://<usuario>.github.io/<repositorio>/` _(completar)_
