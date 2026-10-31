const iconPaths = {
  graduation: '<path d="m2 10 10-5 10 5-10 5-10-5Z"/><path d="M6 12v5c3.5 2.6 8.5 2.6 12 0v-5M22 10v6"/>',
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-6h-4v6H4a1 1 0 0 1-1-1V10Z"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 8v6M23 11h-6"/>',
  settings: '<path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.6-1.4-2.4 1.4-1.1a7 7 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.6 1.4 2.4-1.4 1.1a7 7 0 0 1 0 2Z"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  send: '<path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13"/>',
  message: '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  checkCheck: '<path d="m18 6-7 7-3-3M22 10l-7 7-2-2M2 12l4 4 3-3"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
  calendar: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/><path d="M3 12h4l2-3 3 6 2-3h7"/>',
  person: '<circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0M19 8h3M20.5 6.5v3"/>',
  alert: '<path d="m10.3 3.9-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3.1l-8-14a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
  sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M2 14h4M10 8h4M18 16h4"/>',
  arrowRight: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  arrowUp: '<path d="M7 17 17 7M7 7h10v10"/>',
  arrowDown: '<path d="M7 7 17 17M17 7v10H7"/>',
  filter: '<path d="M4 7h16M7 12h10M10 17h4"/>',
  x: '<path d="m18 6-12 12M6 6l12 12"/>',
  more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
}

const icon = (name, size = 18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.file}</svg>`
const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char])
const initials = (name = "") => name.trim().split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase()

function uniqueRespondedIds(notice) {
  return [...new Set((notice.respondedIds || []).map(String))]
}

function syncNoticeCounters(notice) {
  notice.respondedIds = uniqueRespondedIds(notice)
  notice.confirmed = notice.respondedIds.length
  notice.delivered = Math.max(notice.confirmed, Math.min(notice.total, Number(notice.delivered) || 0))
  if (notice.confirmed >= notice.total) notice.status = "Casi completo"
  return notice
}

function noticeRoster(notice) {
  const ids = uniqueRespondedIds(notice)
  const matchingGroup = notice.group === "Toda primaria"
    ? students
    : students.filter((student) => student.room === notice.group || student.room.includes(notice.group.split(" · ")[0]))
  const roster = matchingGroup.length ? matchingGroup : students
  return roster.filter((student, index, list) => list.findIndex((item) => item.id === student.id) === index && !ids.includes(student.id))
}

const students = [
  { id: "AL-2048", name: "Mateo García", room: "3.º A · Primaria", guardian: "Lucía García", phone: "+54 9 11 5555 0124", pickupPerson: "Pendiente", missing: "Firma de salida", tone: "sage" },
  { id: "AL-2051", name: "Sofía Fernández", room: "3.º A · Primaria", guardian: "Marcos Fernández", phone: "+54 9 11 5555 0186", pickupPerson: "Marta Fernández", missing: "Confirmación de asistencia", tone: "peach" },
  { id: "AL-1983", name: "Valentina López", room: "1.º A · Primaria", guardian: "Carolina López", phone: "+54 9 11 5555 0108", pickupPerson: "Pendiente", missing: "Cartilla de vacunación", tone: "lilac" },
  { id: "AL-2110", name: "Joaquín Romero", room: "2.º B · Primaria", guardian: "Paula Romero", phone: "+54 9 11 5555 0145", pickupPerson: "Pendiente", missing: "Persona autorizada", tone: "blue" },
  { id: "AL-2014", name: "Emma Torres", room: "Jardín · Salas 4 y 5", guardian: "Daniela Torres", phone: "+54 9 11 5555 0137", pickupPerson: "Roberto Torres", missing: "Firma de autorización", tone: "peach" },
  { id: "AL-2092", name: "Benjamín Díaz", room: "3.º A · Primaria", guardian: "Carla Díaz", phone: "+54 9 11 5555 0172", pickupPerson: "Pendiente", missing: "Confirmación de asistencia", tone: "sage" },
]

const notices = [
  { id: 1, title: "Salida al Museo de Ciencias", type: "Autorización", group: "3.º A · Primaria", date: "Hoy, 16:00", total: 28, confirmed: 2, delivered: 26, status: "Requiere atención", icon: "trip", urgent: true, needsSignature: true, needsReply: true, respondedIds: ["AL-2048", "AL-2092"] },
  { id: 2, title: "Encuentro de familias", type: "Evento", group: "Toda primaria", date: "Lun, 2 nov.", total: 94, confirmed: 3, delivered: 90, status: "En seguimiento", icon: "event", urgent: true, needsSignature: false, needsReply: true, respondedIds: ["AL-2051", "AL-2014", "AL-2110"] },
  { id: 3, title: "Actualización de cartilla de vacunación", type: "Vacunas", group: "1.º A · Primaria", date: "Mié, 4 nov.", total: 24, confirmed: 1, delivered: 24, status: "En seguimiento", icon: "health", urgent: true, needsSignature: false, needsReply: true, respondedIds: ["AL-1983"] },
  { id: 4, title: "Autorización de retiro por terceros", type: "Autorización", group: "2.º B · Primaria", date: "Vie, 6 nov.", total: 26, confirmed: 1, delivered: 26, status: "Casi completo", icon: "pickup", urgent: false, needsSignature: true, needsReply: true, respondedIds: ["AL-2110"] },
  { id: 5, title: "Festival de primavera", type: "Evento", group: "Jardín · Salas 4 y 5", date: "Sáb, 7 nov.", total: 43, confirmed: 1, delivered: 41, status: "En seguimiento", icon: "event", urgent: false, needsSignature: false, needsReply: true, respondedIds: ["AL-2014"] },
]

const groups = ["1.º A · Primaria", "2.º B · Primaria", "3.º A · Primaria", "Toda primaria", "Jardín · Salas 4 y 5"]
const navItems = [
  { id: "inicio", label: "Inicio", icon: "home" },
  { id: "notificaciones", label: "Notificaciones", icon: "bell", count: "12" },
  { id: "alumnos", label: "Alumnos", icon: "users" },
  { id: "administracion", label: "Administración", icon: "settings" },
]
const state = { view: "inicio", filter: "Todos", search: "", studentSearch: "", studentGroup: "Todos los grupos", modal: null, adminOpen: "Estructura escolar", mobileNavOpen: false }
const mainContent = document.querySelector("#mainContent")
const modalRoot = document.querySelector("#modalRoot")
const toastRoot = document.querySelector("#toastRoot")

function avatar(name, tone = "sage", small = false) {
  return `<span class="avatar avatar-${escapeHtml(tone)}${small ? " avatar-small" : ""}" aria-label="${escapeHtml(name)}">${escapeHtml(initials(name))}</span>`
}

function statusBadge(status) {
  const statusClass = status === "Requiere atención" ? "status-urgent" : status === "Casi completo" ? "status-near" : "status-progress"
  return `<span class="status ${statusClass}"><span class="status-dot"></span>${escapeHtml(status)}</span>`
}

function renderSidebar() {
  document.querySelector("#brandIcon").innerHTML = icon("graduation", 21)
  document.querySelector("#sideNav").innerHTML = navItems.map((item) => `<button class="nav-item${state.view === item.id ? " nav-item-active" : ""}" type="button" data-action="navigate" data-view="${item.id}"${state.view === item.id ? ' aria-current="page"' : ""}>${icon(item.icon)}<span>${item.label}</span>${item.count ? `<span class="nav-count">${item.count}</span>` : ""}</button>`).join("")
  document.querySelector("#breadcrumbCurrent").textContent = (navItems.find((item) => item.id === state.view) || navItems[0]).label.toUpperCase()
  document.querySelector(".mobile-menu").innerHTML = icon("menu", 20)
  document.querySelector(".mobile-close").innerHTML = icon("x", 19)
  document.querySelector(".school-switcher .switcher-icon").innerHTML = icon("chevronDown", 15)
  document.querySelector(".school-year .switcher-icon").innerHTML = icon("chevronDown", 14)
  document.querySelector(".notification-button").innerHTML = `${icon("bell", 18)}<i></i>`
  document.querySelector(".sidebar-help .help-chevron").innerHTML = icon("chevronRight", 15)
  document.querySelector(".profile-menu-icon").innerHTML = icon("more", 18)
  document.querySelector("#mobileScrim").hidden = !state.mobileNavOpen
  document.querySelector("#sidebar").classList.toggle("sidebar-open", state.mobileNavOpen)
}

function noticeRows(items) {
  if (!items.length) return `<div class="empty-state">${icon("search", 20)}<strong>No encontramos resultados</strong><span>Prueba con otro nombre o cambia el filtro.</span></div>`
  return `<div class="table-scroll"><table class="notice-table"><thead><tr><th>NOTIFICACIÓN</th><th>GRUPO</th><th>RESPUESTAS</th><th>VENCE</th><th>ESTADO</th><th><span class="sr-only">Abrir</span></th></tr></thead><tbody>${items.map((notice) => {
    const noticeIcon = { trip: "file", event: "calendar", health: "heart", pickup: "person" }[notice.icon] || "file"
    return `<tr data-action="open-notice" data-id="${notice.id}" tabindex="0"><td><div class="notice-name"><span class="notice-icon notice-icon-${notice.icon}">${icon(noticeIcon, 16)}</span><span><strong>${escapeHtml(notice.title)}</strong><small>${escapeHtml(notice.type)}</small></span></div></td><td><span class="group-name">${escapeHtml(notice.group)}</span></td><td><div class="response-cell"><div class="response-track"><span style="width:${Math.round((notice.confirmed / notice.total) * 100)}%"></span></div><span>${notice.confirmed}<span class="muted">/${notice.total}</span></span></div></td><td><span class="${notice.urgent ? "due-date due-date-urgent" : "due-date"}">${escapeHtml(notice.date)}</span></td><td>${statusBadge(notice.status)}</td><td><button class="icon-button row-action" type="button" data-action="open-notice" data-id="${notice.id}" aria-label="Ver ${escapeHtml(notice.title)}">${icon("chevronRight", 17)}</button></td></tr>`
  }).join("")}</tbody></table></div>`
}

function metricCard(label, value, caption, iconName, trend, tone, positive = false) {
  return `<article class="metric-card"><div class="metric-top"><span class="metric-icon metric-${tone}">${icon(iconName, 18)}</span><span class="metric-trend ${positive ? "trend-good" : "trend-neutral"}">${icon(positive ? "arrowUp" : "arrowDown", 13)}${escapeHtml(trend)}</span></div><div class="metric-value">${escapeHtml(value)}</div><div class="metric-label">${escapeHtml(label)}</div><div class="metric-caption">${escapeHtml(caption)}</div></article>`
}

function noticeAggregate() {
  notices.forEach(syncNoticeCounters)
  const total = notices.reduce((sum, notice) => sum + notice.total, 0)
  const confirmed = notices.reduce((sum, notice) => sum + notice.confirmed, 0)
  const delivered = notices.reduce((sum, notice) => sum + Math.min(notice.total, notice.delivered), 0)
  return {
    total,
    confirmed,
    pending: Math.max(0, total - confirmed),
    delivered,
    deliveryRate: total ? Math.round((delivered / total) * 100) : 0
  }
}

function dashboardView() {
  const query = state.search.trim().toLowerCase()
  const aggregate = noticeAggregate()
  const visible = notices.filter((notice) => {
    const matchesQuery = `${notice.title} ${notice.group} ${notice.type}`.toLowerCase().includes(query)
    const matchesFilter = state.filter === "Todos" || (state.filter === "Urgentes" ? notice.urgent : notice.status !== "Casi completo")
    return matchesQuery && matchesFilter
  })
  return `<section class="welcome-row"><div><span class="eyebrow">VIERNES, 30 DE OCTUBRE DE 2026</span><h1>Buen día, Mariana <span class="greeting-mark">.</span></h1><p>Hay información importante que necesita seguimiento hoy.</p></div><button class="button button-primary create-button" type="button" data-action="new-notice">${icon("plus", 17)}Nueva notificación</button></section>
    <section class="metric-grid" aria-label="Resumen del colegio">${metricCard("Avisos activos", String(notices.length), "En seguimiento local", "send", `${notices.filter((notice) => notice.urgent).length} urgentes`, "sage", true)}${metricCard("Respuestas pendientes", String(aggregate.pending), `De ${aggregate.total} familias`, "message", `${aggregate.confirmed} confirmadas`, "amber")}${metricCard("Entregas confirmadas", `${aggregate.deliveryRate}%`, `De ${aggregate.total} avisos`, "checkCheck", `${aggregate.delivered} entregadas`, "blue", true)}${metricCard("Datos incompletos", String(students.filter((student) => student.missing !== "Ficha completa").length), "En el padrón de ejemplo", "file", "Sesión demostrativa", "rose")}</section>
    <div class="dashboard-grid"><section class="panel notices-panel"><div class="panel-heading"><div><span class="eyebrow">SEGUIMIENTO</span><h2>Notificaciones recientes</h2><p>Una vista clara de lo enviado y lo que falta.</p></div><button class="text-link" type="button" data-action="view-all">Ver todas ${icon("arrowRight", 15)}</button></div><div class="notice-toolbar"><div class="filter-tabs" role="tablist" aria-label="Filtrar notificaciones">${["Todos", "Por responder", "Urgentes"].map((tab) => `<button class="filter-tab${state.filter === tab ? " active" : ""}" type="button" role="tab" aria-selected="${state.filter === tab}" data-action="filter" data-filter="${tab}">${tab}${tab === "Urgentes" ? '<span class="tab-count">3</span>' : ""}</button>`).join("")}</div><label class="table-search">${icon("search", 15)}<input aria-label="Buscar notificaciones" data-search="dashboard" value="${escapeHtml(state.search)}" placeholder="Buscar"></label></div><div id="dashboardNoticeRows">${noticeRows(visible)}</div><div class="table-footer"><span>Mostrando <strong>${visible.length}</strong> de <strong>${notices.length}</strong> notificaciones</span><button class="icon-button" type="button" aria-label="Filtros adicionales">${icon("sliders", 15)}</button></div></section>
      <aside class="right-column"><section class="panel urgent-panel"><div class="panel-heading panel-heading-compact"><div><span class="eyebrow eyebrow-amber">ATENCIÓN PRIORITARIA</span><h2>Requieren seguimiento</h2></div><span class="urgent-count">3</span></div><div class="urgent-list"><button class="urgent-item" type="button" data-action="open-notice" data-id="1"><span class="urgent-mark">${icon("alert", 15)}</span><span class="urgent-copy"><strong>Firmas pendientes</strong><small>Salida al Museo de Ciencias</small><span class="urgent-meta">9 alumnos <i>·</i> Vence hoy</span></span>${icon("chevronRight", 16)}</button><button class="urgent-item" type="button" data-action="open-notice" data-id="3"><span class="urgent-mark urgent-mark-soft">${icon("heart", 15)}</span><span class="urgent-copy"><strong>Falta documentación</strong><small>Actualización de vacunas</small><span class="urgent-meta">4 alumnos <i>·</i> En 2 días</span></span>${icon("chevronRight", 16)}</button><button class="urgent-item" type="button" data-action="open-notice" data-id="2"><span class="urgent-mark urgent-mark-blue">${icon("clock", 15)}</span><span class="urgent-copy"><strong>Confirmaciones sin responder</strong><small>Encuentro de familias</small><span class="urgent-meta">27 familias <i>·</i> Mañana</span></span>${icon("chevronRight", 16)}</button></div><button class="urgent-footer" type="button" data-action="open-notice" data-id="1">Ver bandeja de atención ${icon("arrowRight", 15)}</button></section>
      <section class="panel completion-panel"><div class="completion-heading"><span class="completion-icon">${icon("shield", 17)}</span><div><h3>Ficha de alumnos</h3><p>Información esencial completa</p></div><button class="icon-button" type="button" aria-label="Más opciones">${icon("more", 17)}</button></div><div class="completion-count"><strong>286</strong><span>de 300 alumnos</span><strong class="completion-percent">95%</strong></div><div class="completion-track"><span></span></div><div class="completion-foot"><span><i class="legend-dot dot-done"></i>Completa</span><span><i class="legend-dot dot-incomplete"></i>14 por completar</span></div></section></aside>
    </div>`
}

function notificationsView() {
  const query = state.search.trim().toLowerCase()
  const filtered = notices.filter((notice) => `${notice.title} ${notice.group} ${notice.type}`.toLowerCase().includes(query))
  const aggregate = noticeAggregate()
  const needsTracking = notices.filter((notice) => notice.confirmed < notice.total).length
  return `<section class="panel full-panel"><div class="page-title-row"><div><span class="eyebrow">COMUNICACIÓN CON FAMILIAS</span><h1>Notificaciones</h1><p>Administra cada aviso y sigue las respuestas de principio a fin.</p></div><button class="button button-primary" type="button" data-action="new-notice">${icon("plus", 17)}Nueva notificación</button></div><div class="list-summary"><div><strong>${notices.length}</strong><span>avisos activos</span></div><div><strong>${needsTracking}</strong><span>necesitan seguimiento</span></div><div><strong>${aggregate.deliveryRate}%</strong><span>entrega confirmada</span></div><label class="table-search list-search">${icon("search", 15)}<input data-search="notices" aria-label="Buscar por aviso o grupo" value="${escapeHtml(state.search)}" placeholder="Buscar por aviso o grupo"></label></div><div id="allNoticeRows">${noticeRows(filtered)}</div></section>`
}

function studentsView() {
  const query = state.studentSearch.trim().toLowerCase()
  const filtered = students.filter((student) => (state.studentGroup === "Todos los grupos" || student.room === state.studentGroup) && `${student.name} ${student.room} ${student.guardian}`.toLowerCase().includes(query))
  return `<section class="panel full-panel"><div class="page-title-row"><div><span class="eyebrow">COMUNIDAD ESCOLAR</span><h1>Alumnos y familias</h1><p>Consulta la información de contacto y los requisitos pendientes.</p></div><button class="button button-primary" type="button" data-action="new-student">${icon("plus", 17)}Agregar alumno</button></div><div class="list-summary student-summary"><div><strong>${300 + Math.max(0, students.length - 6)}</strong><span>alumnos en el padrón</span></div><div><strong>${groups.length + 7}</strong><span>grupos</span></div><div><strong>${14 + Math.max(0, students.length - 6)}</strong><span>fichas incompletas</span></div><label class="table-search list-search">${icon("search", 15)}<input data-search="students" aria-label="Buscar alumno o familia" value="${escapeHtml(state.studentSearch)}" placeholder="Buscar alumno o familia"></label></div><div class="student-filters"><label class="select-filter">${icon("filter", 15)}<select data-student-group aria-label="Filtrar por grupo"><option>Todos los grupos</option>${[...new Set(students.map((student) => student.room))].map((group) => `<option${state.studentGroup === group ? " selected" : ""}>${escapeHtml(group)}</option>`).join("")}</select>${icon("chevronDown", 14)}</label><span>Mostrando ${filtered.length} registros de ejemplo</span></div><div class="table-scroll"><table class="student-table"><thead><tr><th>ALUMNO</th><th>GRUPO</th><th>PADRE / TUTOR</th><th>INFORMACIÓN FALTANTE</th><th>FICHA</th></tr></thead><tbody>${filtered.map((student) => `<tr data-action="open-student" data-id="${escapeHtml(student.id)}"><td><div class="student-name">${avatar(student.name, student.tone, true)}<span><strong>${escapeHtml(student.name)}</strong><small>${escapeHtml(student.id)}</small></span></div></td><td>${escapeHtml(student.room)}</td><td><span class="guardian-name">${escapeHtml(student.guardian)}</span><small class="student-phone">${escapeHtml(student.phone)}</small></td><td><span class="missing-info">${icon("alert", 14)}${escapeHtml(student.missing)}</span></td><td><span class="profile-progress"><span><i style="width:${student.missing === "Ficha completa" ? "100%" : "80%"}"></i></span>${student.missing === "Ficha completa" ? "5/5" : "4/5"}</span></td></tr>`).join("")}</tbody></table></div></section>`
}

const adminSections = [
  { title: "Estructura escolar", icon: "graduation", desc: "Colegio Horizonte · Ciclo 2026–2027", rows: () => [`Primaria · 8 grupos · 214 alumnos`, `Jardín · 4 salas · ${Math.max(0, 86 + students.length - 6)} alumnos`] },
  { title: "Canales de comunicación", icon: "message", desc: "Medios disponibles para avisar a las familias", rows: () => ["WhatsApp · demostración, no conectado", "Correo electrónico · demostración", "Notificación en la plataforma · activa"] },
  { title: "Tipos de notificación", icon: "file", desc: "Requisitos por tipo de comunicación", rows: () => ["Eventos · asistencia y firma opcional", "Salidas · autorización obligatoria", "Vacunas · documentación requerida"] },
  { title: "Permisos del equipo", icon: "shield", desc: "Acceso a información de alumnos y familias", rows: () => ["Dirección · acceso completo", "Docentes · sus grupos", "Administración · datos y comunicaciones"] },
]

function administrationView() {
  return `<section class="panel full-panel"><div class="page-title-row"><div><span class="eyebrow">AJUSTES DEL SISTEMA</span><h1>Administración</h1><p>La estructura y los canales de comunicación de tu escuela.</p></div><button class="button button-secondary" type="button" data-action="admin-toast">${icon("settings", 16)}Ajustes generales</button></div><div class="admin-layout"><div class="admin-cards">${adminSections.map((section) => `<article class="admin-card${state.adminOpen === section.title ? " admin-card-open" : ""}"><button class="admin-card-heading" type="button" data-action="toggle-admin" data-section="${escapeHtml(section.title)}"><span class="admin-icon">${icon(section.icon, 18)}</span><span class="admin-card-copy"><strong>${escapeHtml(section.title)}</strong><small>${escapeHtml(section.desc)}</small></span><span class="admin-chevron${state.adminOpen === section.title ? " chevron-open" : ""}">${icon("chevronDown", 17)}</span></button>${state.adminOpen === section.title ? `<div class="admin-card-content">${section.rows().map((row) => `<div class="admin-setting"><span>${icon("check", 14)}${escapeHtml(row)}</span><span class="admin-state">Activo</span></div>`).join("")}${section.title === "Estructura escolar" ? `<button class="add-group" type="button" data-action="new-group">${icon("plus", 14)}Agregar grupo</button>` : ""}</div>` : ""}</article>`).join("")}</div><aside class="admin-side-note"><span class="note-icon">${icon("shield", 18)}</span><h3>Datos protegidos</h3><p>La información de alumnos y familias solo es visible para el personal autorizado.</p><button class="text-link" type="button" data-action="admin-toast">Revisar permisos ${icon("arrowRight", 14)}</button></aside></div></section>`
}

function render() {
  renderSidebar()
  const view = state.view === "notificaciones" ? notificationsView() : state.view === "alumnos" ? studentsView() : state.view === "administracion" ? administrationView() : dashboardView()
  mainContent.innerHTML = `${view}<footer class="app-footer"><span>Aula Clara <span class="footer-dot">·</span> Comunicación escolar, con claridad.</span><span>Información de demostración <span class="footer-dot">·</span> Sesión no persistente</span></footer>`
  modalRoot.innerHTML = state.modal ? renderModal() : ""
}

function groupOptions(selected = "Toda primaria") {
  return [...new Set(groups)].map((group) => `<option${group === selected ? " selected" : ""}>${escapeHtml(group)}</option>`).join("")
}

function renderModal() {
  const modal = state.modal
  if (modal.type === "notice-create") return `<div class="modal-backdrop" data-action="backdrop-close"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="new-notice-title"><div class="modal-header"><div><span class="eyebrow">NUEVO AVISO</span><h2 id="new-notice-title">Prepara una notificación</h2><p>Define a quién llega y qué necesitas recibir.</p></div><button class="icon-button" type="button" data-action="close-modal" aria-label="Cerrar">${icon("x", 19)}</button></div><form data-form="notice" class="notice-form"><label>Título del aviso<input name="title" required autofocus placeholder="Ej. Salida al museo"></label><div class="form-row"><label>Tipo<select name="type"><option>Evento</option><option>Autorización</option><option>Vacunas</option><option>Retiro</option></select></label><label>Grupo destinatario<select name="group">${groupOptions()}</select></label></div><label>Fecha límite<input name="date" type="date"></label><div class="requirement-options"><label class="check-option"><input name="needsReply" type="checkbox" checked><span>${icon("message", 17)}<span><strong>Solicitar respuesta</strong><small>Confirmación de asistencia o lectura</small></span></span></label><label class="check-option"><input name="needsSignature" type="checkbox"><span>${icon("file", 17)}<span><strong>Requiere firma</strong><small>Autorización del padre o tutor</small></span></span></label></div><div class="channel-note">${icon("message", 16)}<span>La entrega por WhatsApp y otros canales se mostrará en el seguimiento de demostración.</span></div><div class="modal-actions"><button type="button" class="button button-secondary" data-action="close-modal">Cancelar</button><button type="submit" class="button button-primary">${icon("send", 15)}Crear notificación</button></div></form></section></div>`
  if (modal.type === "student-create") return `<div class="modal-backdrop" data-action="backdrop-close"><section class="modal student-modal" role="dialog" aria-modal="true" aria-labelledby="new-student-title"><div class="modal-header"><div><span class="eyebrow">NUEVO REGISTRO</span><h2 id="new-student-title">Agregar alumno</h2><p>Registra a la familia y a las personas autorizadas.</p></div><button class="icon-button" type="button" data-action="close-modal" aria-label="Cerrar">${icon("x", 19)}</button></div><form class="notice-form" data-form="student"><div class="form-row"><label>Nombre del alumno<input name="name" required autofocus placeholder="Nombre y apellido"></label><label>Grupo<select name="group">${groupOptions("3.º A · Primaria")}</select></label></div><div class="form-row"><label>Padre / tutor<input name="guardian" required placeholder="Nombre y apellido"></label><label>Teléfono de contacto<input name="phone" required type="tel" placeholder="+54 9 ..."></label></div><label>Persona autorizada a retirar<input name="pickupPerson" placeholder="Opcional; quedará como pendiente"></label><label class="check-option vaccine-option"><input type="checkbox" name="vaccineOnFile"><span>${icon("heart", 17)}<span><strong>Cartilla de vacunación recibida</strong><small>Si no está disponible, se marcará como pendiente.</small></span></span></label><div class="channel-note">${icon("shield", 16)}<span>Los datos de contacto y retiro son de ejemplo y no se guardan.</span></div><div class="modal-actions"><button type="button" class="button button-secondary" data-action="close-modal">Cancelar</button><button type="submit" class="button button-primary">${icon("plus", 15)}Guardar alumno</button></div></form></section></div>`
  if (modal.type === "group-create") return `<div class="modal-backdrop" data-action="backdrop-close"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="new-group-title"><div class="modal-header"><div><span class="eyebrow">ESTRUCTURA ESCOLAR</span><h2 id="new-group-title">Agregar grupo</h2><p>Organiza alumnos para segmentar avisos.</p></div><button class="icon-button" type="button" data-action="close-modal" aria-label="Cerrar">${icon("x", 19)}</button></div><form class="notice-form" data-form="group"><label>Nombre del grupo<input name="group" required autofocus placeholder="Ej. 4.º A · Primaria"></label><div class="modal-actions"><button type="button" class="button button-secondary" data-action="close-modal">Cancelar</button><button type="submit" class="button button-primary">${icon("plus", 15)}Agregar grupo</button></div></form></section></div>`
  if (modal.type === "notice-detail") return noticeDetailModal(notices.find((notice) => String(notice.id) === String(modal.id)))
  if (modal.type === "student-detail") return studentDetailModal(students.find((student) => student.id === modal.id))
  return ""
}

function noticeDetailModal(notice) {
  if (!notice) return ""
  syncNoticeCounters(notice)
  const pendingStudents = noticeRoster(notice)
  const repliedStudents = uniqueRespondedIds(notice).map((id) => students.find((student) => student.id === id)).filter(Boolean)
  const activeTab = state.detailTab || "Pendientes"
  const shown = activeTab === "Respondieron" ? repliedStudents : pendingStudents
  const pendingCount = Math.max(0, notice.total - notice.confirmed)
  const deliveredCount = Math.max(notice.confirmed, Math.min(notice.total, notice.delivered))
  return `<div class="modal-backdrop" data-action="backdrop-close"><section class="modal detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title">
    <div class="modal-header"><div><span class="eyebrow">DETALLE DE NOTIFICACIÓN</span><h2 id="detail-title">${escapeHtml(notice.title)}</h2><p>${escapeHtml(notice.group)} <span class="detail-separator">·</span> ${escapeHtml(notice.type)} <span class="detail-separator">·</span> Vence ${escapeHtml(notice.date)}</p></div><button class="icon-button" type="button" data-action="close-modal" aria-label="Cerrar">${icon("x", 19)}</button></div>
    <div class="detail-summary">
      <div><span class="detail-number">${notice.confirmed}<small>/${notice.total}</small></span><span class="detail-label">respuestas recibidas</span></div>
      <div class="detail-summary-divider"></div>
      <div><span class="detail-number">${pendingCount}</span><span class="detail-label">pendientes</span></div>
      <div class="detail-summary-divider"></div>
      <div><span class="detail-number">${deliveredCount}<small>/${notice.total}</small></span><span class="detail-label">avisos entregados</span></div>
    </div>
    <div class="detail-tabs" role="tablist" aria-label="Seguimiento de familias">${["Pendientes", "Respondieron"].map((tab) => `<button class="detail-tab${activeTab === tab ? " active" : ""}" type="button" role="tab" aria-selected="${activeTab === tab}" data-action="detail-tab" data-tab="${tab}">${tab}<span>${tab === "Pendientes" ? pendingCount : notice.confirmed}</span></button>`).join("")}</div>
    <div class="people-list">${shown.length ? shown.map((student) => {
      const replied = activeTab === "Respondieron"
      return `<div class="person-row">${avatar(student.name, student.tone, true)}<span class="person-info"><strong>${escapeHtml(student.name)}</strong><small>${escapeHtml(student.room)} <span class="detail-separator">·</span> Familia ${escapeHtml(student.guardian.split(" ").slice(-1)[0])}</small></span>${replied ? '<span class="person-status person-replied">' + icon("checkCheck", 14) + "Confirmó</span>" : `<button class="response-action" type="button" data-action="mark-response" data-student="${escapeHtml(student.id)}" data-notice="${notice.id}">Registrar respuesta</button>`}</div>`
    }).join("") : '<div class="empty-state">No hay alumnos en esta lista.</div>'}</div>
    <div class="modal-actions detail-actions"><button type="button" class="button button-secondary" data-action="close-modal">Cerrar detalle</button><button type="button" class="button button-primary" data-action="send-reminder" data-id="${notice.id}">${icon("message", 15)}Preparar recordatorio</button></div>
  </section></div>`
}

function studentDetailModal(student) {
  if (!student) return ""
  const complete = student.missing === "Ficha completa"
  return `<div class="modal-backdrop" data-action="backdrop-close"><section class="modal student-modal" role="dialog" aria-modal="true" aria-labelledby="student-title"><div class="modal-header"><div><span class="eyebrow">FICHA DEL ALUMNO</span><h2 id="student-title">${escapeHtml(student.name)}</h2><p>${escapeHtml(student.id)} <span class="detail-separator">·</span> ${escapeHtml(student.room)}</p></div><button class="icon-button" type="button" data-action="close-modal" aria-label="Cerrar">${icon("x", 19)}</button></div><div class="student-detail-card">${avatar(student.name, student.tone)}<div><strong>${escapeHtml(student.name)}</strong><small>${escapeHtml(student.room)} · ${escapeHtml(student.id)}</small></div><span class="status ${complete ? "status-near" : "status-urgent"}"><span class="status-dot"></span>${complete ? "Ficha completa" : "Ficha incompleta"}</span></div><div class="student-info-grid"><div><span>PADRE / TUTOR PRINCIPAL</span><strong>${escapeHtml(student.guardian)}</strong><small>${escapeHtml(student.phone)}</small></div><div><span>INFORMACIÓN PENDIENTE</span><strong class="${complete ? "" : "missing-info"}">${complete ? icon("check", 14) + "Sin pendientes" : icon("alert", 14) + escapeHtml(student.missing)}</strong><small>Solicitar actualización a la familia</small></div><div><span>PERSONA AUTORIZADA A RETIRAR</span><strong>${escapeHtml(student.pickupPerson || "Información pendiente")}</strong><small>${student.pickupPerson && student.pickupPerson !== "Pendiente" ? "Autorización registrada" : "Agregar persona autorizada"}</small></div><div><span>ÚLTIMA ACTIVIDAD</span><strong>Ficha actualizada</strong><small>Hace 3 días</small></div></div><div class="modal-actions"><button type="button" class="button button-secondary" data-action="close-modal">Cerrar</button><button type="button" class="button button-primary" data-action="student-reminder">${icon("message", 15)}Solicitar información</button></div></section></div>`
}

let toastTimer
function showToast(message) {
  toastRoot.innerHTML = `<div class="toast-message" role="status">${icon("check", 16)}<span>${escapeHtml(message)}</span><button class="icon-button" type="button" data-action="close-toast" aria-label="Cerrar mensaje">${icon("x", 15)}</button></div>`
  window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => { toastRoot.innerHTML = "" }, 3600)
}

function openModal(type, id) {
  state.detailTab = "Pendientes"
  state.modal = { type, id }
  render()
  window.setTimeout(() => modalRoot.querySelector("input[autofocus]")?.focus(), 0)
}

function closeModal() {
  state.modal = null
  render()
}

function handleClick(event) {
  const control = event.target.closest("[data-action]")
  if (!control) return
  const action = control.dataset.action
  if (action === "navigate") { state.view = control.dataset.view; state.search = ""; state.studentSearch = ""; state.mobileNavOpen = false; render(); return }
  if (action === "open-nav") { state.mobileNavOpen = true; renderSidebar(); return }
  if (action === "close-nav") { state.mobileNavOpen = false; renderSidebar(); return }
  if (action === "new-notice") { openModal("notice-create"); return }
  if (action === "new-student") { openModal("student-create"); return }
  if (action === "new-group") { openModal("group-create"); return }
  if (action === "close-modal" || (action === "backdrop-close" && event.target === control)) { closeModal(); return }
  if (action === "close-toast") { toastRoot.innerHTML = ""; return }
  if (action === "view-all") { state.view = "notificaciones"; state.search = ""; render(); return }
  if (action === "filter") { state.filter = control.dataset.filter; render(); return }
  if (action === "open-notice") { openModal("notice-detail", control.dataset.id); return }
  if (action === "open-student") { openModal("student-detail", control.dataset.id); return }
  if (action === "detail-tab") { state.detailTab = control.dataset.tab; render(); return }
  if (action === "mark-response") {
    const notice = notices.find((item) => String(item.id) === control.dataset.notice)
    const studentId = control.dataset.student
    if (notice && studentId && !uniqueRespondedIds(notice).includes(studentId) && notice.confirmed < notice.total) {
      notice.respondedIds = [...uniqueRespondedIds(notice), studentId]
      syncNoticeCounters(notice)
      showToast("Respuesta registrada para este aviso.")
      render()
    }
    return
  }
  if (action === "send-reminder") { closeModal(); showToast("Recordatorio preparado para las familias pendientes."); return }
  if (action === "student-reminder") { closeModal(); showToast("Solicitud de información preparada."); return }
  if (action === "toggle-admin") { state.adminOpen = state.adminOpen === control.dataset.section ? "" : control.dataset.section; render(); return }
  if (action === "admin-toast" || action === "system-notifications") { showToast("Esta función está disponible en la versión conectada."); return }
}

document.addEventListener("click", handleClick)

document.addEventListener("input", (event) => {
  const input = event.target.closest("[data-search]")
  if (!input) return
  const kind = input.dataset.search
  if (kind === "students") state.studentSearch = input.value
  else state.search = input.value
  const cursor = input.selectionStart
  render()
  const restored = mainContent.querySelector(`[data-search="${kind}"]`)
  restored?.focus()
  restored?.setSelectionRange(cursor, cursor)
})

document.addEventListener("change", (event) => {
  if (event.target.matches("[data-student-group]")) { state.studentGroup = event.target.value; render() }
})

document.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-form]")
  if (!form) return
  event.preventDefault()
  const data = new FormData(form)
  if (form.dataset.form === "notice") {
    const title = String(data.get("title") || "").trim()
    const titleInput = form.elements.title
    if (!title) {
      titleInput.setCustomValidity("Escribe un título que no esté vacío ni contenga solo espacios.")
      titleInput.reportValidity()
      return
    }
    titleInput.setCustomValidity("")
    const type = String(data.get("type") || "Evento")
    const group = String(data.get("group") || "Toda primaria")
    const iconType = type === "Evento" ? "event" : type === "Vacunas" ? "health" : type === "Retiro" ? "pickup" : "trip"
    const dueDate = data.get("date") ? new Intl.DateTimeFormat("es", { day: "numeric", month: "short" }).format(new Date(`${data.get("date")}T12:00:00`)) : "Sin fecha"
    const totalsByGroup = { "1.º A · Primaria": 24, "2.º B · Primaria": 26, "3.º A · Primaria": 28, "Toda primaria": 94, "Jardín · Salas 4 y 5": 43 }
    notices.unshift({ id: Date.now(), title, type, group, date: dueDate, total: totalsByGroup[group] || 28, confirmed: 0, delivered: 0, status: "En seguimiento", icon: iconType, urgent: false, needsSignature: data.has("needsSignature"), needsReply: data.has("needsReply"), respondedIds: [] })
    state.modal = null
    render()
    showToast("Notificación creada. Ya puedes iniciar su seguimiento.")
    return
  }
  if (form.dataset.form === "student") {
    const name = String(data.get("name") || "").trim()
    const pickupPerson = String(data.get("pickupPerson") || "").trim()
    const missing = !pickupPerson ? "Persona autorizada" : !data.has("vaccineOnFile") ? "Cartilla de vacunación" : "Ficha completa"
    students.unshift({ id: `AL-${String(Date.now()).slice(-4)}`, name, room: String(data.get("group") || "3.º A · Primaria"), guardian: String(data.get("guardian") || "").trim(), phone: String(data.get("phone") || "").trim(), pickupPerson: pickupPerson || "Pendiente", missing, tone: "sage" })
    state.modal = null
    render()
    showToast("Alumno agregado al padrón de esta sesión.")
    return
  }
  if (form.dataset.form === "group") {
    const name = String(data.get("group") || "").trim()
    if (name && !groups.includes(name)) groups.push(name)
    state.modal = null
    render()
    showToast(name ? "Grupo agregado a esta sesión." : "Escribe un nombre para el grupo.")
  }
})

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && state.modal) closeModal()
  if ((event.key === "Enter" || event.key === " ") && event.target.matches('tr[data-action="open-notice"]')) {
    event.preventDefault()
    openModal("notice-detail", event.target.dataset.id)
  }
})

render()
