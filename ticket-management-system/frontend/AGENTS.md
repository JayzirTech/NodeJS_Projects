Objetivo
Desarrollar una aplicación web que permita gestionar tickets de soporte técnico,
implementando:
• Autenticación mediante un servicio independiente
• Manejo de roles (Administrador y Técnico)
• Persistencia de sesión
• CRUD de tickets
• Consumo de APIs simuladas con json-server
Contexto del problema
Una empresa de soporte técnico necesita un sistema interno para gestionar incidencias
reportadas por los usuarios.
El sistema debe permitir que los técnicos registren tickets y que los administradores gestionen
la asignación de los mismos.
Roles del sistema
Administrador (admin)
Puede:
• Ver todos los tickets
• Crear tickets
• Editar tickets
• Eliminar tickets
• Asignar técnico responsable a cualquier ticket
• Ver todos los usuarios técnicos
• Asignar estado del ticket (En proceso, Asignado, Solucionado) se podrá seleccionar el
estado asignado solo cuando se asignó un técnico.
Técnico (tecnico)
Puede:
• Crear tickets
• Ver los tickets creados por él
• Editar sus propios tickets
• Asignar estado del ticket (En proceso, asignado, Solucionado)
Restricciones:
• No puede asignar técnicos
• Al crear un ticket se asigna automáticamente como responsable
Cliente (cliente)
Puede:
• Crear tickets
• Ver los tickets creados por él
• Editar sus propios tickets siempre y cuando no tengan un técnico asignado o si el
estado del caso es igual a cerrado
Restricciones:
• No puede asignar técnicos
• Al crear un ticket se asigna automáticamente como responsable
1. Autenticación
La aplicación debe incluir:
• Formulario de login
• Validación de credenciales contra un json-server de autenticación
• Manejo de errores
Importante
Debe existir dos servicios json-server separados:
1. Servicio de autenticación
o Usuarios
o Roles
o Login simulado
2. Servicio de datos
o Tickets
o Técnicos
o Información de negocio
2. Funcionalidad de Usuarios
• Debe existir un sistema de registro de usuarios del sistema, el cual permitirá que los
clientes se registran y queden automáticamente con el rol Cliente
• El sistema debe iniciar con usuarios de tipo administrador y técnicos cargados en el
json
• Debe haber como mínimo:
o 1 administrador
o 2 técnicos
3. Gestión de Tickets
Cada ticket debe contener:
• Nombre del ticket
• Tipo de caso (ej: incidente, requerimiento, soporte)
• Descripción
• Técnico asignado
• Cliente que solicita que realiza el reporte
4. CRUD de tickets
Se debe implementar:
• GET → Obtener tickets
• POST → Crear tickets
• PUT/PATCH → Editar tickets
• DELETE → Eliminar tickets (solo admin)
5. Reglas de negocio
• Si un técnico crea un ticket:
o Se asigna automáticamente como responsable
• Si un administrador crea o edita un ticket:
o Puede asignar cualquier técnico existente en el sistema
• Si un cliente crea un ticket:
o No podrá seleccionar un técnico, solo podrá registrar el ticket y esperar que un
administrador asigne un técnico
o El cliente podrá ver todos sus tickets y editarlos siempre y cuando aún no tenga
un técnico asignado
6. Protección de rutas
Debe incluir:
• Restricción de acceso según autenticación
• Restricción por rol:
o Técnico o un cliente no puede acceder a funcionalidades administrativas
• Redirecciones automáticas
• Logout funcional
• Si se intenta ingresar a una ruta del sistema dedicada a los usuarios con rol
administrador sin serlo, se deberá mostrar un mensaje de acceso denegado, lo mismo
ocurrirá si un cliente intenta ingresar a la url dedicada a los técnicos
7. SPA (Single Page Application)
La aplicación debe:
• No recargar la página
• Tener navegación dinámica
• Renderizar el contenido mediante JavaScript
8. Interfaz de usuario
Puede usarse:
• CSS
• Tailwind
• Bootstrap
• Cualquier librería de estilos
Se evaluará:
• Organización visual
• Experiencia de usuario
• Responsividad
• Claridad en la interfaz
9. Persistencia de sesión
Debe implementarse usando:
• localStorage / sessionStorage / cookies
Requisitos:
• Mantener sesión al refrescar
• Logout funcional mediante botón de cerrar sesión
• Logout funcional mediante tiempo, es decir pasado 5 minutos de inactividad se debe
cerrar la sesión automáticamente
• Limpieza de sesión
10. Documentación (Inglés obligatorio)
Debe incluir un archivo README.md con:
• Project name
• Description
• Technologies used
• Installation
• How to run both json-server services
• Project structure
• Role behavior explanation
• Technical decisions
Requisitos técnicos
Debe incluir:
• Código modular (Capaz de ser utilizado en otros proyectos con gran facilidad)
• Manejo de eventos
• Consumo de APIs mediante axios
• Manejo de errores
• Código limpio y organizado
• Uso de middleware simulados para la funcionalidad de protección de rutas y
autenticación
Uso de json-server
Se deben levantar dos instancias independientes:
Ejemplo:
# Autenticación
json-server --watch auth-db.json --port 3001
# Datos de la aplicación
json-server --watch data-db.json --port 3002
Entregables
Se deberá realizar en grupos de máximo 4 Coders, los cuales deben entregar:
• Proyecto completo
• auth-db.json
• data-db.json
• README.md con el detalle del proyecto y sus integrantes
• (Opcional) evidencias visuales
• Comprimido en formato zip cargado en Moodle, sin la carpeta nodemodules
• Indicar quién será el líder exponente de la solución
• Cada integrante debe cargar su entrega en Moodle.
Cronograma
• Martes: Inicio del desarrollo
• Miércoles: Finalización del desarrollo
• Jueves 4 de junio: Sustentación técnica
Restricciones
Prohibido:
• Uso de IA generativa
• Copiar proyectos completos
• Uso de plantillas CRUD listas
Permitido:
• Documentación oficial
• MDN
• StackOverflow
• Recursos educativos
Mensaje final
El enfoque está en la lógica, arquitectura y manejo real de escenarios.
Diseña pensando como si fuera un sistema productivo real.



# AGENTS.md

Guia para agentes y colaboradores que trabajen en `TaskFlowSPA`.

## Mision del proyecto

Construir una SPA de gestion de tareas con JavaScript Vanilla, HTML, CSS y Tailwind CSS que sirva como practica de arquitectura frontend moderna, modularizacion, routing del lado del cliente y control de acceso sin usar frameworks SPA.

## Tipo de arquitectura

Este repositorio usa una arquitectura frontend simple por capas (`layered architecture`) pensada para una primera SPA.

La prioridad no es aplicar una estructura compleja, sino ayudar a que el estudiante entienda con claridad como se separan las responsabilidades principales de la aplicacion:

- `main.js` inicia la app.
- `router/` gestiona navegacion y proteccion basica de rutas.
- `views/` contiene las pantallas.
- `components/` agrupa piezas reutilizables.
- `services/` maneja datos, sesion y backend fake.
- `utils/` concentra helpers pequenos.
- `styles/` organiza estilos globales.

## Prioridades del repositorio

1. Mantener la aplicacion simple y entendible.
2. Separar vista, logica, estado y acceso a datos.
3. Evitar soluciones acopladas o dificiles de explicar.
4. Conservar una experiencia SPA fluida sin recargas completas.
5. Respetar roles, permisos y proteccion de rutas en cada cambio.

## Stack y restricciones

- JavaScript Vanilla con modulos ES.
- HTML y CSS.
- Tailwind CSS para la construccion de vistas y utilidades de interfaz.
- Vite como entorno de desarrollo.
- Backend fake con `json-server`.
- No introducir React, Vue, Angular ni librerias que desplacen el objetivo pedagogico del proyecto.

## Principios de implementacion

- Cada modulo debe tener una responsabilidad clara.
- La manipulacion del DOM debe permanecer organizada y predecible.
- La logica de negocio no debe quedar incrustada en listeners o plantillas extensas.
- El acceso a `localStorage`, `sessionStorage` o APIs remotas debe envolverse en utilidades o servicios.
- Las validaciones de autenticacion y permisos deben centralizarse.

## Dominios funcionales

### Autenticacion

- Login y logout.
- Persistencia de sesion con `localStorage`.
- Restauracion de sesion al recargar desde `localStorage`.
- Edicion del perfil del usuario autenticado.
- Eliminacion de la propia cuenta.

### Routing

- Navegacion con `History API`.
- Rutas publicas y privadas.
- Fallback 404.
- Guards antes del render.

### Tareas

- Listado de tareas.
- Creacion, edicion y eliminacion.
- Filtros o estados basicos si se implementan.
- Restriccion por propietario para usuarios `USER`.

### Administracion

- Solo accesible para `ADMIN`.
- Gestion de usuarios.
- Visualizacion global de tareas.
- Cambio de roles y permisos si el modulo lo incluye.

## Roles base

### `ADMIN`

- Acceso total al sistema.
- Gestiona usuarios.
- Visualiza todas las tareas.
- Modifica roles y permisos.

### `USER`

- Gestiona solo sus tareas.
- Ve solo informacion propia.
- Edita su propio perfil.
- Puede eliminar su propia cuenta.

## Convenciones sugeridas de estructura

Usar o aproximarse a una organizacion como esta:

```text
src/
  main.js
  router/
  views/
  components/
  services/
  utils/
  styles/
```

## Criterios para nuevas contribuciones

- Antes de agregar codigo, identificar si pertenece a `router`, `views`, `components`, `services`, `utils` o `styles`.
- Si una pieza se reutiliza entre vistas, moverla a `components`.
- Si una funcion conoce endpoints, almacenamiento o fetch, moverla a `services`.
- Si una regla depende de autenticacion o permisos, evaluarla dentro del router o en una utilidad sencilla de autorizacion.
- No duplicar plantillas o logica cuando una abstraccion simple pueda resolverlo.

## Reglas de UI y renderizado

- Las vistas deben renderizarse dinamicamente en un contenedor raiz.
- La navegacion interna debe usar el router SPA, no recargas con enlaces tradicionales.
- Tailwind CSS es la base para construir las vistas, manteniendo una interfaz consistente y facil de escalar.
- Mantener la interfaz clara y consistente, priorizando legibilidad y estructura.
- Evitar mezclar estilos inline con logica salvo que exista una razon puntual.

## Datos y persistencia

- El backend fake sera la fuente principal de datos persistentes.
- `json-server` debe manejar principalmente recursos como `users` y `tasks`.
- La sesion activa debe persistirse en `localStorage` para simplificar la autenticacion de esta primera SPA.
- El manejo de `localStorage` debe estar encapsulado en utilidades o servicios.
- No asumir permisos solo por ocultar botones; validar acceso tambien en guards y acciones.
- Las acciones sobre perfil deben limitarse al propio usuario, salvo privilegios administrativos explicitos.

## Calidad esperada

- Funciones pequenas y con nombres claros.
- Modulos cohesivos.
- Flujo de datos facil de seguir.
- Comentarios solo cuando aporten contexto real.
- Evitar codigo muerto y archivos multiproposito.

## Orden recomendado de construccion

1. Router SPA base.
2. Layout principal.
3. Modulo de autenticacion.
4. Manejo de sesion.
5. Guards de rutas.
6. CRUD de tareas.
7. Dashboard.
8. Panel administrativo.

## Que debe evitar un agente

- Introducir frameworks SPA.
- Resolver todo en un solo archivo.
- Acoplar vistas directamente a estructuras rigidas de datos.
- Saltarse validaciones de rol por simplicidad temporal.
- Romper la navegacion SPA usando recargas completas innecesarias.

## Definicion de exito

Una contribucion es correcta si ayuda a que `TaskFlowSPA` siga siendo una SPA modular, entendible y escalable, con autenticacion, rutas protegidas, roles claros y un CRUD de tareas coherente con los permisos de cada usuario.
