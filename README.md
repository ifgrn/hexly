# Hexly - Gestor de Cuentas de League of Legends

Sistema completo para gestionar cuentas de League of Legends, incluyendo estadísticas, skins, historial de partidas y más.

## 📋 Stack Tecnológico

### Frontend
- **Vue 3** + **Vite**
- **Vue Router** (navegación)
- **Pinia Store** (gestión de estado)
- UI Framework (a definir: Vuetify, Quasar, o Tailwind CSS)

### Backend
- **Bun** (runtime)
- **Hono** (framework web)
- **PostgreSQL** o **SQLite** (base de datos)
- **SQL directo** (sin ORM, queries manuales)
- **JWT** + **Cookies** (autenticación)

## 🗺️ Arquitectura del Proyecto

```
hexly/
├── frontend/          # Aplicación Vue 3
├── backend/           # API con Bun + Hono
├── README.md          # Este archivo
└── docs/              # Documentación adicional
```

## 📝 Plan de Desarrollo

### FASE 1: Configuración Inicial del Proyecto

#### ✅ Paso 1.1: Estructura del Proyecto
- [x] Crear estructura de carpetas (frontend/backend)
- [x] Inicializar repositorio Git
- [x] Configurar .gitignore

#### ✅ Paso 1.2: Configuración del Backend
- [ ] Inicializar proyecto Bun en `backend/`
- [ ] Instalar dependencias: Hono, @hono/node-server
- [ ] Instalar cliente de BD: `postgres` (si PostgreSQL) o `better-sqlite3` (si SQLite)
- [ ] Configurar base de datos (PostgreSQL o SQLite)
- [ ] Configurar variables de entorno (.env)
- [ ] Crear estructura de carpetas del backend:
  ```
  backend/
  ├── src/
  │   ├── routes/
  │   ├── middleware/
  │   ├── db/
  │   │   ├── connection.ts    # Conexión a BD
  │   │   └── queries/         # Funciones de queries SQL
  │   ├── migrations/          # Scripts SQL de migraciones
  │   ├── utils/
  │   └── index.ts
  ├── .env
  └── package.json
  ```
- [ ] Crear archivo de conexión a base de datos (`src/db/connection.ts`)

#### ✅ Paso 1.3: Configuración del Frontend
- [ ] Inicializar proyecto Vue 3 + Vite en `frontend/`
- [ ] Instalar dependencias: vue-router, pinia
- [ ] Configurar estructura de carpetas:
  ```
  frontend/
  ├── src/
  │   ├── components/
  │   ├── views/
  │   ├── stores/
  │   ├── router/
  │   ├── services/
  │   ├── utils/
  │   └── main.ts
  └── package.json
  ```

---

### FASE 2: Sistema de Autenticación

#### ✅ Paso 2.1: Backend - Tabla de Usuario
- [ ] Crear script SQL de migración para tabla `users`
- [ ] Definir estructura: id, email, password (hasheado), username, createdAt, updatedAt
- [ ] Ejecutar migración para crear la tabla
- [ ] Crear funciones de queries en `src/db/queries/users.ts`:
  - `createUser()`, `getUserByEmail()`, `getUserById()`

#### ✅ Paso 2.2: Backend - Rutas de Autenticación
- [ ] Crear ruta POST `/api/auth/register` (registro)
  - Usar query SQL: `INSERT INTO users (email, password, username) VALUES (?, ?, ?)`
- [ ] Crear ruta POST `/api/auth/login` (login)
  - Usar query SQL: `SELECT * FROM users WHERE email = ?`
- [ ] Crear ruta POST `/api/auth/logout` (logout)
  - Limpiar cookie del token
- [ ] Implementar hash de contraseñas (bcrypt)
- [ ] Implementar generación de JWT
- [ ] Configurar cookies HTTP-only para el token
- [ ] Manejar errores de SQL apropiadamente

#### ✅ Paso 2.3: Backend - Middleware de Autenticación
- [ ] Crear middleware para verificar JWT
- [ ] Crear middleware para proteger rutas privadas

#### ✅ Paso 2.4: Frontend - Vistas de Autenticación
- [ ] Crear vista `Login.vue`
- [ ] Crear vista `Signup.vue`
- [ ] Crear componente de formulario reutilizable
- [ ] Implementar validación de formularios

#### ✅ Paso 2.5: Frontend - Store de Autenticación (Pinia)
- [ ] Crear store `useAuthStore`
- [ ] Implementar acciones: login, register, logout
- [ ] Implementar estado: user, isAuthenticated, token
- [ ] Implementar persistencia del estado (localStorage)

#### ✅ Paso 2.6: Frontend - Router y Guards
- [ ] Configurar Vue Router
- [ ] Crear rutas: `/`, `/login`, `/signup`, `/dashboard`
- [ ] Implementar guards de navegación (proteger rutas privadas)
- [ ] Redirigir usuarios autenticados desde login/signup

---

### FASE 3: Sistema de Cuentas de LOL

#### ✅ Paso 3.1: Backend - Tabla de Cuenta
- [ ] Crear script SQL de migración para tabla `lol_accounts`
- [ ] Definir estructura: id, userId, nick, tag, server, apiKey (encriptado), rank, winRate, createdAt, updatedAt
- [ ] Agregar foreign key a tabla `users`
- [ ] Ejecutar migración para crear la tabla
- [ ] Crear funciones de queries en `src/db/queries/accounts.ts`:
  - `getAccountsByUserId()`, `getAccountById()`, `createAccount()`, `updateAccount()`, `deleteAccount()`

#### ✅ Paso 3.2: Backend - Rutas de Cuentas
- [ ] Crear ruta GET `/api/accounts` (obtener todas las cuentas del usuario)
  - Usar query SQL: `SELECT * FROM lol_accounts WHERE userId = ?`
- [ ] Crear ruta GET `/api/accounts/:id` (obtener cuenta específica)
  - Usar query SQL: `SELECT * FROM lol_accounts WHERE id = ? AND userId = ?`
- [ ] Crear ruta POST `/api/accounts` (crear nueva cuenta)
  - Usar query SQL: `INSERT INTO lol_accounts (...) VALUES (...)`
- [ ] Crear ruta PUT `/api/accounts/:id` (actualizar cuenta)
  - Usar query SQL: `UPDATE lol_accounts SET ... WHERE id = ? AND userId = ?`
- [ ] Crear ruta DELETE `/api/accounts/:id` (eliminar cuenta)
  - Usar query SQL: `DELETE FROM lol_accounts WHERE id = ? AND userId = ?`
- [ ] Implementar validación de datos
- [ ] Implementar encriptación del API key
- [ ] Manejar errores de SQL apropiadamente

#### ✅ Paso 3.3: Frontend - Componente AccountCard
- [ ] Crear componente `AccountCard.vue`
- [ ] Mostrar: icono, nick#tag, server, rank, win rate
- [ ] Implementar botón para copiar nick#tag
- [ ] Implementar toggle para mostrar/ocultar API key
- [ ] Implementar estados: activa/inactiva

#### ✅ Paso 3.4: Frontend - Vista Dashboard
- [ ] Crear vista `Dashboard.vue`
- [ ] Implementar layout: logo, menú de usuario, botón "Add Account"
- [ ] Mostrar lista de AccountCards
- [ ] Implementar card activa destacada
- [ ] Implementar diseño responsive

#### ✅ Paso 3.5: Frontend - Store de Cuentas (Pinia)
- [ ] Crear store `useAccountStore`
- [ ] Implementar acciones: fetchAccounts, addAccount, updateAccount, deleteAccount, setActiveAccount
- [ ] Implementar estado: accounts, activeAccount

#### ✅ Paso 3.6: Frontend - Formulario de Cuenta
- [ ] Crear componente `AccountForm.vue` (modal o página)
- [ ] Campos: nick, tag, server, apiKey
- [ ] Implementar validación
- [ ] Integrar con store para crear/editar

---

### FASE 4: Integración con API de Riot Games

#### ✅ Paso 4.1: Backend - Servicio de Riot API
- [ ] Crear servicio para consumir Riot Games API
- [ ] Implementar funciones para obtener:
  - Información del jugador
  - Rank y estadísticas
  - Historial de partidas
  - Skins del jugador
  - Maestría de campeones
- [ ] Manejar rate limiting de Riot API
- [ ] Implementar caché de respuestas

#### ✅ Paso 4.2: Backend - Rutas de Estadísticas
- [ ] Crear ruta GET `/api/accounts/:id/stats` (estadísticas generales)
- [ ] Crear ruta GET `/api/accounts/:id/matches` (historial de partidas)
- [ ] Crear ruta GET `/api/accounts/:id/mastery` (maestría de campeones)
- [ ] Crear ruta GET `/api/accounts/:id/skins` (inventario de skins)

---

### FASE 5: Historial de Partidas

#### ✅ Paso 5.1: Backend - Tabla de Partidas
- [ ] Crear script SQL de migración para tabla `matches`
- [ ] Definir estructura: id, accountId, matchId, champion, result, kda, date, etc.
- [ ] Agregar foreign key a tabla `lol_accounts`
- [ ] Ejecutar migración para crear la tabla
- [ ] Crear funciones de queries en `src/db/queries/matches.ts`:
  - `getMatchesByAccountId()`, `createMatch()`, `getRecentMatches()`, `calculateWinRate()`

#### ✅ Paso 5.2: Backend - Sincronización de Partidas
- [ ] Implementar job/cron para sincronizar partidas
- [ ] Obtener últimas partidas desde Riot API
- [ ] Guardar en base de datos usando INSERT SQL
  - Usar query: `INSERT INTO matches (accountId, matchId, champion, result, kda, date) VALUES (?, ?, ?, ?, ?, ?)`
- [ ] Calcular win rate de últimas partidas
  - Usar query: `SELECT COUNT(*) FROM matches WHERE accountId = ? AND result = 'win'`

#### ✅ Paso 5.3: Frontend - Componente MatchHistory
- [ ] Crear componente `MatchHistory.vue`
- [ ] Mostrar lista de últimas partidas
- [ ] Mostrar: champion, resultado, KDA, fecha
- [ ] Implementar filtros y búsqueda
- [ ] Mostrar win rate de últimas partidas

---

### FASE 6: Inventario de Skins

#### ✅ Paso 6.1: Backend - Tabla de Skins
- [ ] Crear script SQL de migración para tabla `skins`
- [ ] Definir estructura: id, accountId, skinId, champion, name, owned, etc.
- [ ] Agregar foreign key a tabla `lol_accounts`
- [ ] Ejecutar migración para crear la tabla
- [ ] Crear funciones de queries en `src/db/queries/skins.ts`:
  - `getSkinsByAccountId()`, `createSkin()`, `updateSkin()`, `bulkUpdateSkins()`

#### ✅ Paso 6.2: Backend - Rutas de Skins
- [ ] Crear ruta GET `/api/accounts/:id/skins` (obtener skins)
  - Usar query SQL: `SELECT * FROM skins WHERE accountId = ?`
- [ ] Crear ruta PUT `/api/accounts/:id/skins` (actualizar inventario)
  - Usar queries SQL: `UPDATE skins SET owned = ? WHERE id = ? AND accountId = ?`
- [ ] Implementar sincronización con Riot API
- [ ] Implementar bulk insert/update para sincronización masiva

#### ✅ Paso 6.3: Frontend - Componente SkinsInventory
- [ ] Crear componente `SkinsInventory.vue`
- [ ] Mostrar grid de skins
- [ ] Mostrar: imagen, nombre, champion, estado (owned/not owned)
- [ ] Implementar filtros por champion
- [ ] Implementar búsqueda
- [ ] Permitir edición manual del inventario

---

### FASE 7: Maestría de Campeones

#### ✅ Paso 7.1: Frontend - Componente ChampionMastery
- [ ] Crear componente `ChampionMastery.vue`
- [ ] Mostrar lista de campeones con nivel de maestría
- [ ] Mostrar puntos de maestría
- [ ] Ordenar por nivel/puntos
- [ ] Integrar en Dashboard o vista separada

---

### FASE 8: Sistema de Notificaciones (Toasts)

#### ✅ Paso 8.1: Frontend - Sistema de Toasts
- [ ] Crear componente `Toast.vue`
- [ ] Crear composable `useToast` o store `useToastStore`
- [ ] Implementar diferentes tipos: success, error, warning, info
- [ ] Implementar auto-dismiss
- [ ] Integrar en toda la aplicación

---

### FASE 9: Mejoras y Pulido

#### ✅ Paso 9.1: UI/UX
- [ ] Implementar tema oscuro/claro
- [ ] Mejorar diseño responsive
- [ ] Agregar animaciones y transiciones
- [ ] Optimizar carga de imágenes

#### ✅ Paso 9.2: Optimizaciones
- [ ] Implementar lazy loading de componentes
- [ ] Optimizar queries SQL (usar índices, evitar N+1 queries)
- [ ] Implementar paginación donde sea necesario (LIMIT/OFFSET en SQL)
- [ ] Agregar índices en base de datos (crear migración SQL)
  - Índices sugeridos: `users(email)`, `lol_accounts(userId)`, `matches(accountId, date)`, `skins(accountId)`

#### ✅ Paso 9.3: Testing
- [ ] Escribir tests unitarios para stores
- [ ] Escribir tests para componentes críticos
- [ ] Escribir tests para rutas del backend

#### ✅ Paso 9.4: Documentación
- [ ] Documentar API (Swagger/OpenAPI)
- [ ] Documentar componentes principales
- [ ] Crear guía de instalación y despliegue

---

## 🚀 Comandos Útiles

### Backend
```bash
cd backend
bun install
bun run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📚 Recursos

- [Vue 3 Documentation](https://vuejs.org/)
- [Hono Documentation](https://hono.dev/)
- [Bun Documentation](https://bun.sh/)
- [Riot Games API](https://developer.riotgames.com/)

## 📝 Notas de Desarrollo

- Mantener este README actualizado con el progreso
- Marcar pasos como completados usando `[x]`
- Documentar decisiones importantes en este archivo
- Crear issues/branches por cada fase o feature importante

### 🔧 Notas Técnicas

- **Base de Datos**: Se usa SQL directo sin ORM. Todas las queries se escriben manualmente.
- **Migraciones**: Crear scripts SQL en `backend/src/migrations/` con formato: `001_create_users_table.sql`
- **Queries**: Organizar funciones de queries en `backend/src/db/queries/` por entidad (users.ts, accounts.ts, etc.)
- **Seguridad**: 
  - Siempre usar prepared statements para evitar SQL injection
  - Validar y sanitizar inputs antes de ejecutar queries
  - Encriptar datos sensibles (API keys) antes de guardar
- **Conexión BD**: Usar pool de conexiones para mejor rendimiento

---

**Estado Actual**: Fase 1 - Configuración Inicial
**Última Actualización**: 2025-01-23
