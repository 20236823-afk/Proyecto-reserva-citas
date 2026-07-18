# Sistema Web de Reserva de Citas para Servicios Universitarios

## Descripción del proyecto

Este proyecto consiste en el desarrollo de un sistema web para la reserva de citas en servicios universitarios. La aplicación será desarrollada con React y Vite. En esta primera etapa no se utilizará base de datos ni backend, por lo que la información será simulada desde el frontend.

El sistema tendrá dos módulos principales:

* Módulo estudiante/usuario
* Módulo administrador

El módulo estudiante permitirá realizar reservas de servicios universitarios mediante un flujo por pasos. El módulo administrador permitirá gestionar usuarios, reservas, servicios y el inicio de sesión.

## Tecnologías utilizadas

* React
* Vite
* JavaScript
* HTML
* CSS
* Git
* GitHub

## Instalación del proyecto

Para trabajar correctamente en el proyecto, no se debe descargar el archivo `.zip`. Se debe clonar el repositorio usando Git.

### Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

Entrar a la carpeta del proyecto:

```bash
cd Proyecto_sistema_reserva_citas
```

Instalar dependencias:

```bash
npm install
```

Ejecutar el proyecto en local:

```bash
npm run dev
```

Si PowerShell bloquea los scripts de npm, usar:

```bash
npm.cmd install
npm.cmd run dev
```

## Estructura general del proyecto

La estructura base del proyecto será la siguiente:

```txt
src/
├── components/
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── Header.css
│   │
│   ├── SideBar/
│   │   ├── SideBar.jsx
│   │   └── SideBar.css
│   │
│   └── Main/
│       ├── Main.jsx
│       ├── Main.css
│       │
│       ├── Student/
│       │   ├── ReservationStart/
│       │   │   ├── ReservationStart.jsx
│       │   │   └── ReservationStart.css
│       │   │
│       │   ├── ReservationSteps/
│       │   │   ├── ReservationSteps.jsx
│       │   │   └── ReservationSteps.css
│       │   │
│       │   ├── GeneralInfo/
│       │   │   ├── GeneralInfo.jsx
│       │   │   └── GeneralInfo.css
│       │   │
│       │   ├── Participants/
│       │   │   ├── Participants.jsx
│       │   │   └── Participants.css
│       │   │
│       │   └── ReservationSummary/
│       │       ├── ReservationSummary.jsx
│       │       └── ReservationSummary.css
│       │
│       └── Admin/
│           ├── AdminDashboard/
│           ├── UsersList/
│           ├── ReservationsList/
│           ├── ServicesManager/
│           └── Login/
│
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

## Distribución del trabajo

El equipo estará dividido en dos grupos principales: estudiante/usuario y administrador.

### Integrantes encargados del módulo estudiante/usuario

Trabajarán dentro de:

```txt
src/components/Main/Student/
```

Responsabilidades principales:

* Vista de nueva reserva.
* Selección del servicio a reservar.
* Flujo de reserva por pasos.
* Información general de la reserva.
* Registro de participantes.
* Resumen de la reserva.
* Vista de reservas del estudiante, si corresponde para la entrega.

Componentes principales:

```txt
ReservationStart
ReservationSteps
GeneralInfo
Participants
ReservationSummary
```

### Integrantes encargados del módulo administrador

Trabajarán dentro de:

```txt
src/components/Main/Admin/
```

Responsabilidades principales:

* Login del sistema.
* Panel administrador.
* Listado de usuarios.
* Listado de reservas.
* Filtros de reservas.
* Mantenimiento de servicios.
* Gestión visual de información administrativa.

Componentes sugeridos:

```txt
Login
AdminDashboard
UsersList
ReservationsList
ServicesManager
```

El login será desarrollado por el equipo encargado del módulo administrador.

## Organización de ramas

La rama principal del proyecto será:

```txt
main
```

Esta rama debe mantenerse como la versión estable del proyecto. Nadie debe trabajar directamente sobre `main`.

Cada grupo o integrante debe crear su propia rama de trabajo a partir de `main`.

Ramas sugeridas:

```txt
feature/sistema-alumno
feature/admin-login
feature/admin-panel
feature/servicios-admin
```

También se pueden usar nombres equivalentes, pero deben ser claros y consistentes.

## Flujo correcto de trabajo con Git

### 1. Actualizar la rama principal

Antes de crear una nueva rama o empezar a trabajar, ejecutar:

```bash
git checkout main
git pull origin main
```

### 2. Crear una rama nueva

Ejemplo para el módulo estudiante:

```bash
git checkout -b feature/sistema-alumno
```

Ejemplo para login y administrador:

```bash
git checkout -b feature/admin-login
```

Ejemplo para panel administrador:

```bash
git checkout -b feature/admin-panel
```

### 3. Verificar la rama actual

```bash
git branch
```

La rama activa aparecerá con un asterisco:

```txt
* feature/sistema-alumno
  main
```

### 4. Trabajar los archivos correspondientes

Cada integrante debe modificar únicamente los archivos de su módulo, salvo que se haya coordinado un cambio general.

Por ejemplo, el equipo de estudiante debe priorizar:

```txt
src/components/Main/Student/
```

El equipo de administrador debe priorizar:

```txt
src/components/Main/Admin/
```

### 5. Guardar cambios en Git

Después de realizar un avance, ejecutar:

```bash
git add .
git commit -m "Mensaje descriptivo del avance"
```

Ejemplo:

```bash
git commit -m "Crear pantalla inicial de reserva del alumno"
```

### 6. Subir la rama a GitHub

La primera vez que se suba una rama:

```bash
git push -u origin nombre-de-la-rama
```

Ejemplo:

```bash
git push -u origin feature/sistema-alumno
```

Después de la primera vez, se puede usar simplemente:

```bash
git push
```

## Cómo integrar el trabajo a main

Cuando un integrante termine una parte funcional, debe crear un Pull Request en GitHub.

Ejemplo:

```txt
feature/sistema-alumno → main
```

Luego, el líder del grupo revisará:

* Qué archivos fueron modificados.
* Si el proyecto sigue ejecutándose correctamente.
* Si no hay conflictos con otros módulos.
* Si el código respeta la estructura acordada.

Si todo está correcto, se hará Merge hacia `main`.

## Recomendaciones importantes

No trabajar directamente sobre `main`.

No descargar el proyecto como archivo `.zip` si se va a trabajar con ramas.

No modificar archivos de otro módulo sin coordinación.

Antes de empezar a trabajar, siempre ejecutar:

```bash
git checkout main
git pull origin main
```

Luego cambiar a la rama correspondiente:

```bash
git checkout nombre-de-la-rama
```

Si se agregan nuevas dependencias al proyecto, se debe avisar al equipo para que todos ejecuten:

```bash
npm install
```

## Comandos útiles

Ver ramas locales:

```bash
git branch
```

Ver ramas remotas:

```bash
git branch -r
```

Ver todas las ramas:

```bash
git branch -a
```

Cambiar de rama:

```bash
git checkout nombre-de-la-rama
```

Crear una rama nueva:

```bash
git checkout -b nombre-de-la-rama
```

Ver estado de cambios:

```bash
git status
```

Agregar cambios:

```bash
git add .
```

Crear commit:

```bash
git commit -m "Mensaje del commit"
```

Subir cambios:

```bash
git push
```

Traer cambios de main:

```bash
git pull origin main
```

## Estado actual del proyecto

La base del proyecto contiene una estructura inicial con:

* Header
* SideBar
* Main
* Flujo inicial del módulo estudiante

A partir de esta estructura, los integrantes deben continuar el desarrollo respetando la distribución de carpetas y ramas.
