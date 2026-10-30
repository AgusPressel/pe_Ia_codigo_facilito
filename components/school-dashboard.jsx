"use client"

import { useMemo, useState } from "react"
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  FileText,
  Filter,
  GraduationCap,
  HeartPulse,
  Home,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Users,
  UserRoundCheck,
  X,
} from "lucide-react"

const initialNotices = [
  { id: 1, title: "Salida al Museo de Ciencias", type: "Autorización", group: "3.º A · Primaria", date: "Hoy, 16:00", total: 28, confirmed: 19, delivered: 26, status: "Requiere atención", icon: "trip", urgent: true },
  { id: 2, title: "Encuentro de familias", type: "Evento", group: "Toda primaria", date: "Lun, 2 nov.", total: 94, confirmed: 67, delivered: 90, status: "En seguimiento", icon: "event", urgent: true },
  { id: 3, title: "Actualización de cartilla de vacunación", type: "Vacunas", group: "1.º A · Primaria", date: "Mié, 4 nov.", total: 24, confirmed: 15, delivered: 24, status: "En seguimiento", icon: "health", urgent: true },
  { id: 4, title: "Autorización de retiro por terceros", type: "Autorización", group: "2.º B · Primaria", date: "Vie, 6 nov.", total: 26, confirmed: 21, delivered: 26, status: "Casi completo", icon: "pickup", urgent: false },
  { id: 5, title: "Festival de primavera", type: "Evento", group: "Jardín · Salas 4 y 5", date: "Sáb, 7 nov.", total: 43, confirmed: 31, delivered: 41, status: "En seguimiento", icon: "event", urgent: false },
]

const students = [
  { id: "AL-2048", name: "Mateo García", room: "3.º A", guardian: "Lucía García", phone: "+54 9 11 5555 0124", missing: "Firma de salida", initials: "MG", tone: "sage" },
  { id: "AL-2051", name: "Sofía Fernández", room: "3.º A", guardian: "Marcos Fernández", phone: "+54 9 11 5555 0186", missing: "Confirmación de asistencia", initials: "SF", tone: "peach" },
  { id: "AL-1983", name: "Valentina López", room: "1.º A", guardian: "Carolina López", phone: "+54 9 11 5555 0108", missing: "Cartilla de vacunación", initials: "VL", tone: "lilac" },
  { id: "AL-2110", name: "Joaquín Romero", room: "2.º B", guardian: "Paula Romero", phone: "+54 9 11 5555 0145", missing: "Persona autorizada", initials: "JR", tone: "blue" },
  { id: "AL-2014", name: "Emma Torres", room: "Sala de 5", guardian: "Daniela Torres", phone: "+54 9 11 5555 0137", missing: "Firma de autorización", initials: "ET", tone: "peach" },
  { id: "AL-2092", name: "Benjamín Díaz", room: "3.º A", guardian: "Carla Díaz", phone: "+54 9 11 5555 0172", missing: "Confirmación de asistencia", initials: "BD", tone: "sage" },
]

const navigation = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "notificaciones", label: "Notificaciones", icon: Bell, count: "12" },
  { id: "alumnos", label: "Alumnos", icon: Users },
  { id: "administracion", label: "Administración", icon: Settings2 },
]

const categoryIcon = { trip: FileCheck2, event: CalendarDays, health: HeartPulse, pickup: UserRoundCheck }

function initials(name) {
  return name.split(" ").map((part) => part[0]).slice(0, 2).join("")
}

function Avatar({ name, tone = "sage", small = false }) {
  return <span className={`avatar avatar-${tone}${small ? " avatar-small" : ""}`} aria-label={name}>{initials(name)}</span>
}

function Status({ status }) {
  const classes = status === "Requiere atención" ? "status status-urgent" : status === "Casi completo" ? "status status-near" : "status status-progress"
  return <span className={classes}><span className="status-dot" />{status}</span>
}

function NoticeRows({ notices, onSelect }) {
  if (!notices.length) return <div className="empty-state"><Search size={20} /><strong>No encontramos resultados</strong><span>Prueba con otro nombre o cambia el filtro.</span></div>
  return <div className="table-scroll"><table className="notice-table"><thead><tr><th>NOTIFICACIÓN</th><th>GRUPO</th><th>RESPUESTAS</th><th>VENCE</th><th>ESTADO</th><th><span className="sr-only">Abrir</span></th></tr></thead><tbody>
    {notices.map((notice) => {
      const Icon = categoryIcon[notice.icon] || FileText
      return <tr key={notice.id} onClick={() => onSelect(notice)} tabIndex={0} onKeyDown={(event) => event.key === "Enter" && onSelect(notice)}>
        <td><div className="notice-name"><span className={`notice-icon notice-icon-${notice.icon}`}><Icon size={16} /></span><span><strong>{notice.title}</strong><small>{notice.type}</small></span></div></td>
        <td><span className="group-name">{notice.group}</span></td>
        <td><div className="response-cell"><div className="response-track"><span style={{ width: `${Math.round((notice.confirmed / notice.total) * 100)}%` }} /></div><span>{notice.confirmed}<span className="muted">/{notice.total}</span></span></div></td>
        <td><span className={notice.urgent ? "due-date due-date-urgent" : "due-date"}>{notice.date}</span></td>
        <td><Status status={notice.status} /></td>
        <td><button className="icon-button row-action" aria-label={`Ver ${notice.title}`} onClick={(event) => { event.stopPropagation(); onSelect(notice) }}><ChevronRight size={17} /></button></td>
      </tr>
    })}
  </tbody></table></div>
}

function MetricCard({ label, value, caption, icon: Icon, trend, tone }) {
  return <article className="metric-card"><div className="metric-top"><span className={`metric-icon metric-${tone}`}><Icon size={18} /></span><span className={trend.startsWith("+") ? "metric-trend trend-good" : "metric-trend trend-neutral"}>{trend.startsWith("+") ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{trend}</span></div><div className="metric-value">{value}</div><div className="metric-label">{label}</div><div className="metric-caption">{caption}</div></article>
}

function NewNoticeModal({ onClose, onCreate }) {
  const [title, setTitle] = useState("")
  const [type, setType] = useState("Evento")
  const [group, setGroup] = useState("Toda primaria")
  const [needsSignature, setNeedsSignature] = useState(false)
  const [needsReply, setNeedsReply] = useState(true)
  const submit = (event) => {
    event.preventDefault()
    if (!title.trim()) return
    onCreate({ id: Date.now(), title: title.trim(), type, group, date: "Sin fecha", total: group === "Toda primaria" ? 94 : 28, confirmed: 0, delivered: 0, status: "En seguimiento", icon: type === "Evento" ? "event" : type === "Vacunas" ? "health" : type === "Autorización" ? "trip" : "pickup", urgent: false, needsSignature, needsReply })
  }
  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="new-notice-title"><div className="modal-header"><div><span className="eyebrow">NUEVO AVISO</span><h2 id="new-notice-title">Prepara una notificación</h2><p>Define a quién llega y qué necesitas recibir.</p></div><button className="icon-button" onClick={onClose} aria-label="Cerrar"><X size={19} /></button></div><form onSubmit={submit} className="notice-form"><label>Título del aviso<input required autoFocus value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Ej. Salida al museo" /></label><div className="form-row"><label>Tipo<select value={type} onChange={(event) => setType(event.target.value)}><option>Evento</option><option>Autorización</option><option>Vacunas</option><option>Retiro</option></select></label><label>Grupo destinatario<select value={group} onChange={(event) => setGroup(event.target.value)}><option>Toda primaria</option><option>3.º A · Primaria</option><option>2.º B · Primaria</option><option>Jardín · Salas 4 y 5</option></select></label></div><label>Fecha límite<input type="date" /></label><div className="requirement-options"><label className="check-option"><input type="checkbox" checked={needsReply} onChange={(event) => setNeedsReply(event.target.checked)} /><span><MessageCircle size={17} /><span><strong>Solicitar respuesta</strong><small>Confirmación de asistencia o lectura</small></span></span></label><label className="check-option"><input type="checkbox" checked={needsSignature} onChange={(event) => setNeedsSignature(event.target.checked)} /><span><FileCheck2 size={17} /><span><strong>Requiere firma</strong><small>Autorización digital del padre o tutor</small></span></span></label></div><div className="channel-note"><MessageCircle size={16} /><span>La entrega por WhatsApp y otros canales se mostrará en el seguimiento.</span></div><div className="modal-actions"><button type="button" className="button button-secondary" onClick={onClose}>Cancelar</button><button type="submit" className="button button-primary"><Send size={15} />Crear notificación</button></div></form></section></div>
}

function NoticeDetailModal({ notice, onClose, onMarkDone }) {
  const [tab, setTab] = useState("Pendientes")
  const pendingStudents = students.slice(0, Math.max(2, Math.min(5, notice.total - notice.confirmed)))
  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="modal detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title"><div className="modal-header"><div><span className="eyebrow">DETALLE DE NOTIFICACIÓN</span><h2 id="detail-title">{notice.title}</h2><p>{notice.group} <span className="detail-separator">·</span> {notice.type} <span className="detail-separator">·</span> Vence {notice.date}</p></div><button className="icon-button" onClick={onClose} aria-label="Cerrar"><X size={19} /></button></div><div className="detail-summary"><div><span className="detail-number">{notice.confirmed}<small>/{notice.total}</small></span><span className="detail-label">respuestas recibidas</span></div><div className="detail-summary-divider" /><div><span className="detail-number">{Math.max(notice.delivered - notice.confirmed, 0)}</span><span className="detail-label">por responder</span></div><div className="detail-summary-divider" /><div><span className="detail-number">{notice.delivered}<small>/{notice.total}</small></span><span className="detail-label">avisos entregados</span></div></div><div className="detail-tabs">{["Pendientes", "Respondieron"].map((item) => <button key={item} className={tab === item ? "detail-tab active" : "detail-tab"} onClick={() => setTab(item)}>{item}<span>{item === "Pendientes" ? Math.max(notice.total - notice.confirmed, 0) : notice.confirmed}</span></button>)}</div><div className="people-list">{(tab === "Pendientes" ? pendingStudents : students.slice(1, 4)).map((student, index) => <div className="person-row" key={student.id}><Avatar name={student.name} tone={student.tone} small /><span className="person-info"><strong>{student.name}</strong><small>{student.room} <span className="detail-separator">·</span> Familia {student.guardian.split(" ").slice(-1)}</small></span>{tab === "Pendientes" ? <span className="person-status"><span className="person-status-dot" />{index % 2 ? "Visto, sin respuesta" : "Entregado · sin leer"}</span> : <span className="person-status person-replied"><CheckCheck size={14} />Confirmó</span>}</div>)}</div><div className="modal-actions detail-actions"><button type="button" className="button button-secondary" onClick={onClose}>Cerrar detalle</button><button type="button" className="button button-primary" onClick={onMarkDone}><MessageCircle size={15} />Enviar recordatorio</button></div></section></div>
}

function DashboardView({ notices, onSelect, onCreateClick, onViewAll }) {
  const [filter, setFilter] = useState("Todos")
  const [query, setQuery] = useState("")
  const visibleNotices = useMemo(() => notices.filter((notice) => {
    const matchesQuery = `${notice.title} ${notice.group} ${notice.type}`.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = filter === "Todos" || (filter === "Urgentes" ? notice.urgent : notice.status !== "Casi completo")
    return matchesQuery && matchesFilter
  }), [notices, filter, query])
  return <>
    <section className="welcome-row"><div><span className="eyebrow">VIERNES, 30 DE OCTUBRE DE 2026</span><h1>Buen día, Mariana <span className="greeting-mark">.</span></h1><p>Hay información importante que necesita seguimiento hoy.</p></div><button className="button button-primary create-button" onClick={onCreateClick}><Plus size={17} />Nueva notificación</button></section>
    <section className="metric-grid" aria-label="Resumen del colegio"><MetricCard label="Avisos activos" value="12" caption="En 8 grupos" icon={Send} trend="+3 esta semana" tone="sage" /><MetricCard label="Respuestas pendientes" value="47" caption="De 186 familias" icon={MessageCircle} trend="12 urgentes" tone="amber" /><MetricCard label="Entregas confirmadas" value="94%" caption="Últimos 7 días" icon={CheckCheck} trend="+6% vs. anterior" tone="blue" /><MetricCard label="Datos incompletos" value="14" caption="En 9 alumnos" icon={ClipboardCheck} trend="3 por vencer" tone="rose" /></section>
    <div className="dashboard-grid"><section className="panel notices-panel"><div className="panel-heading"><div><span className="eyebrow">SEGUIMIENTO</span><h2>Notificaciones recientes</h2><p>Una vista clara de lo enviado y lo que falta.</p></div><button className="text-link" onClick={onViewAll} aria-label="Ver todas las notificaciones">Ver todas <ArrowRight size={15} /></button></div><div className="notice-toolbar"><div className="filter-tabs" role="tablist" aria-label="Filtrar notificaciones">{["Todos", "Por responder", "Urgentes"].map((tab) => <button key={tab} className={filter === tab ? "filter-tab active" : "filter-tab"} onClick={() => setFilter(tab)}>{tab}{tab === "Urgentes" && <span className="tab-count">3</span>}</button>)}</div><label className="table-search"><Search size={15} /><input aria-label="Buscar notificaciones" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar" /></label></div><NoticeRows notices={visibleNotices} onSelect={onSelect} /><div className="table-footer"><span>Mostrando <strong>{visibleNotices.length}</strong> de <strong>{notices.length}</strong> notificaciones</span><button className="icon-button" aria-label="Filtros adicionales"><SlidersHorizontal size={15} /></button></div></section>
      <aside className="right-column"><section className="panel urgent-panel"><div className="panel-heading panel-heading-compact"><div><span className="eyebrow eyebrow-amber">ATENCIÓN PRIORITARIA</span><h2>Requieren seguimiento</h2></div><span className="urgent-count">3</span></div><div className="urgent-list"><button className="urgent-item" onClick={() => onSelect(notices[0])}><span className="urgent-mark"><AlertTriangle size={15} /></span><span className="urgent-copy"><strong>Firmas pendientes</strong><small>Salida al Museo de Ciencias</small><span className="urgent-meta">9 alumnos <i>·</i> Vence hoy</span></span><ChevronRight size={16} /></button><button className="urgent-item" onClick={() => onSelect(notices[2])}><span className="urgent-mark urgent-mark-soft"><HeartPulse size={15} /></span><span className="urgent-copy"><strong>Falta documentación</strong><small>Actualización de vacunas</small><span className="urgent-meta">4 alumnos <i>·</i> En 2 días</span></span><ChevronRight size={16} /></button><button className="urgent-item" onClick={() => onSelect(notices[1])}><span className="urgent-mark urgent-mark-blue"><Clock3 size={15} /></span><span className="urgent-copy"><strong>Confirmaciones sin responder</strong><small>Encuentro de familias</small><span className="urgent-meta">27 familias <i>·</i> Mañana</span></span><ChevronRight size={16} /></button></div><button className="urgent-footer" onClick={() => onSelect(notices[0])}>Ver bandeja de atención <ArrowRight size={15} /></button></section>
      <section className="panel completion-panel"><div className="completion-heading"><span className="completion-icon"><ShieldCheck size={17} /></span><div><h3>Ficha de alumnos</h3><p>Información esencial completa</p></div><button className="icon-button" aria-label="Más opciones"><MoreHorizontal size={17} /></button></div><div className="completion-count"><strong>286</strong><span>de 300 alumnos</span><strong className="completion-percent">95%</strong></div><div className="completion-track"><span /></div><div className="completion-foot"><span><i className="legend-dot dot-done" />Completa</span><span><i className="legend-dot dot-incomplete" />14 por completar</span></div></section></aside>
    </div>
  </>
}

function NotificationsView({ notices, onSelect, onCreateClick }) {
  const [query, setQuery] = useState("")
  const filtered = notices.filter((notice) => `${notice.title} ${notice.group} ${notice.type}`.toLowerCase().includes(query.toLowerCase()))
  return <section className="panel full-panel"><div className="page-title-row"><div><span className="eyebrow">COMUNICACIÓN CON FAMILIAS</span><h1>Notificaciones</h1><p>Administra cada aviso y sigue las respuestas de principio a fin.</p></div><button className="button button-primary" onClick={onCreateClick}><Plus size={17} />Nueva notificación</button></div><div className="list-summary"><div><strong>{notices.length}</strong><span>avisos activos</span></div><div><strong>{notices.filter((notice) => notice.urgent).length + 2}</strong><span>necesitan seguimiento</span></div><div><strong>94%</strong><span>entrega confirmada</span></div><label className="table-search list-search"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por aviso o grupo" /></label></div><NoticeRows notices={filtered} onSelect={onSelect} /></section>
}

function StudentsView({ studentsList, onStudentSelect, onAddStudent }) {
  const [query, setQuery] = useState("")
  const [room, setRoom] = useState("Todos los grupos")
  const filtered = studentsList.filter((student) => (room === "Todos los grupos" || student.room === room) && `${student.name} ${student.room} ${student.guardian}`.toLowerCase().includes(query.toLowerCase()))
  return <section className="panel full-panel"><div className="page-title-row"><div><span className="eyebrow">COMUNIDAD ESCOLAR</span><h1>Alumnos y familias</h1><p>Consulta la información de contacto y los requisitos pendientes.</p></div><button className="button button-primary" onClick={onAddStudent}><Plus size={17} />Agregar alumno</button></div><div className="list-summary student-summary"><div><strong>{300 + Math.max(0, studentsList.length - students.length)}</strong><span>alumnos en el padrón</span></div><div><strong>12</strong><span>grupos</span></div><div><strong>14</strong><span>fichas incompletas</span></div><label className="table-search list-search"><Search size={15} /><input aria-label="Buscar alumno o familia" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar alumno o familia" /></label></div><div className="student-filters"><label className="select-filter"><Filter size={15} /><select value={room} onChange={(event) => setRoom(event.target.value)}><option>Todos los grupos</option>{[...new Set(studentsList.map((student) => student.room))].map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={14} /></label><span>Mostrando {filtered.length} registros de ejemplo</span></div><div className="table-scroll"><table className="student-table"><thead><tr><th>ALUMNO</th><th>GRUPO</th><th>PADRE / TUTOR</th><th>INFORMACIÓN FALTANTE</th><th>FICHA</th></tr></thead><tbody>{filtered.map((student) => <tr key={student.id} onClick={() => onStudentSelect(student)}><td><div className="student-name"><Avatar name={student.name} tone={student.tone} small /><span><strong>{student.name}</strong><small>{student.id}</small></span></div></td><td>{student.room}</td><td><span className="guardian-name">{student.guardian}</span><small className="student-phone">{student.phone}</small></td><td><span className="missing-info"><CircleAlert size={14} />{student.missing}</span></td><td><span className="profile-progress"><span><i /></span>{student.missing === "Ficha completa" ? "5/5" : "4/5"}</span></td></tr>)}</tbody></table></div></section>
}

function AdministrationView() {
  const [expanded, setExpanded] = useState("Estructura escolar")
  const sections = [
    { title: "Estructura escolar", icon: GraduationCap, desc: "Colegio Horizonte · Ciclo 2026–2027", rows: ["Primaria · 8 grupos · 214 alumnos", "Jardín · 4 salas · 86 alumnos"] },
    { title: "Canales de comunicación", icon: MessageCircle, desc: "Configura los medios para avisar a las familias", rows: ["WhatsApp · conectado en demostración", "Correo electrónico · disponible", "Notificación en la plataforma · activa"] },
    { title: "Tipos de notificación", icon: FileText, desc: "Define los requisitos de cada comunicación", rows: ["Eventos · asistencia y firma opcional", "Salidas · autorización obligatoria", "Vacunas · documentación requerida"] },
    { title: "Permisos del equipo", icon: ShieldCheck, desc: "Controla quién puede consultar y administrar datos", rows: ["Dirección · acceso completo", "Docentes · sus grupos", "Administración · datos y comunicaciones"] },
  ]
  return <section className="panel full-panel"><div className="page-title-row"><div><span className="eyebrow">AJUSTES DEL SISTEMA</span><h1>Administración</h1><p>La estructura y los canales de comunicación de tu escuela.</p></div><button className="button button-secondary"><Settings2 size={16} />Ajustes generales</button></div><div className="admin-layout"><div className="admin-cards">{sections.map(({ title, icon: Icon, desc, rows }) => <article className={`admin-card${expanded === title ? " admin-card-open" : ""}`} key={title}><button className="admin-card-heading" onClick={() => setExpanded(expanded === title ? "" : title)}><span className="admin-icon"><Icon size={18} /></span><span className="admin-card-copy"><strong>{title}</strong><small>{desc}</small></span><ChevronDown className={expanded === title ? "chevron-open" : ""} size={17} /></button>{expanded === title && <div className="admin-card-content">{rows.map((row) => <div className="admin-setting" key={row}><span><Check size={14} />{row}</span><button className="text-link">Editar <ArrowRight size={14} /></button></div>)}{title === "Estructura escolar" && <button className="add-group"><Plus size={14} />Agregar grupo</button>}</div>}</article>)}</div><aside className="admin-side-note"><span className="note-icon"><ShieldCheck size={18} /></span><h3>Datos protegidos</h3><p>La información de alumnos y familias solo es visible para el personal autorizado.</p><button className="text-link">Revisar permisos <ArrowRight size={14} /></button></aside></div></section>
}

function StudentModal({ student, onClose }) {
  const complete = student.missing === "Ficha completa"
  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="modal student-modal" role="dialog" aria-modal="true" aria-labelledby="student-title"><div className="modal-header"><div><span className="eyebrow">FICHA DEL ALUMNO</span><h2 id="student-title">{student.name}</h2><p>{student.id} <span className="detail-separator">·</span> {student.room}</p></div><button className="icon-button" onClick={onClose} aria-label="Cerrar"><X size={19} /></button></div><div className="student-detail-card"><Avatar name={student.name} tone={student.tone} /><div><strong>{student.name}</strong><small>{student.room} · {student.id}</small></div><span className={complete ? "status status-near" : "status status-urgent"}><span className="status-dot" />{complete ? "Ficha completa" : "Ficha incompleta"}</span></div><div className="student-info-grid"><div><span>PADRE / TUTOR PRINCIPAL</span><strong>{student.guardian}</strong><small>{student.phone}</small></div><div><span>INFORMACIÓN PENDIENTE</span>{complete ? <strong><Check size={14} />Sin pendientes</strong> : <><strong className="missing-info"><CircleAlert size={14} />{student.missing}</strong><small>Solicitar actualización a la familia</small></>}</div><div><span>PERSONA AUTORIZADA A RETIRAR</span><strong>{student.pickupPerson || "Información pendiente"}</strong><small>{student.pickupPerson ? "Autorización registrada" : "Agregar persona autorizada"}</small></div><div><span>ÚLTIMA ACTIVIDAD</span><strong>Ficha actualizada</strong><small>Hace 3 días</small></div></div><div className="modal-actions"><button className="button button-secondary" onClick={onClose}>Cerrar</button><button className="button button-primary" onClick={onClose}><MessageCircle size={15} />Solicitar información</button></div></section></div>
}

function NewStudentModal({ onClose, onCreate }) {
  const [name, setName] = useState("")
  const [room, setRoom] = useState("3.º A")
  const [guardian, setGuardian] = useState("")
  const [phone, setPhone] = useState("")
  const [pickupPerson, setPickupPerson] = useState("")
  const [vaccineOnFile, setVaccineOnFile] = useState(false)
  const submit = (event) => {
    event.preventDefault()
    const missing = !pickupPerson.trim() ? "Persona autorizada" : !vaccineOnFile ? "Cartilla de vacunación" : "Ficha completa"
    onCreate({ id: `AL-${String(Date.now()).slice(-4)}`, name: name.trim(), room, guardian: guardian.trim(), phone: phone.trim(), pickupPerson: pickupPerson.trim(), missing, initials: initials(name), tone: "sage" })
  }
  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="modal student-modal" role="dialog" aria-modal="true" aria-labelledby="new-student-title"><div className="modal-header"><div><span className="eyebrow">NUEVO REGISTRO</span><h2 id="new-student-title">Agregar alumno</h2><p>Registra a la familia y a las personas autorizadas.</p></div><button className="icon-button" onClick={onClose} aria-label="Cerrar"><X size={19} /></button></div><form className="notice-form" onSubmit={submit}><div className="form-row"><label>Nombre del alumno<input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Nombre y apellido" /></label><label>Grupo<select value={room} onChange={(event) => setRoom(event.target.value)}><option>3.º A</option><option>1.º A</option><option>2.º B</option><option>Sala de 5</option><option>Sala de 4</option></select></label></div><div className="form-row"><label>Padre / tutor<input required value={guardian} onChange={(event) => setGuardian(event.target.value)} placeholder="Nombre y apellido" /></label><label>Teléfono de contacto<input required type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+54 9 ..." /></label></div><label>Persona autorizada a retirar<input value={pickupPerson} onChange={(event) => setPickupPerson(event.target.value)} placeholder="Opcional; quedará como pendiente" /></label><label className="check-option vaccine-option"><input type="checkbox" checked={vaccineOnFile} onChange={(event) => setVaccineOnFile(event.target.checked)} /><span><HeartPulse size={17} /><span><strong>Cartilla de vacunación recibida</strong><small>Si no está disponible, se marcará como pendiente.</small></span></span></label><div className="channel-note"><ShieldCheck size={16} /><span>Los datos de contacto y retiro se usan para el seguimiento escolar.</span></div><div className="modal-actions"><button type="button" className="button button-secondary" onClick={onClose}>Cancelar</button><button type="submit" className="button button-primary"><Plus size={15} />Guardar alumno</button></div></form></section></div>
}

export default function SchoolDashboard() {
  const [activeView, setActiveView] = useState("inicio")
  const [notices, setNotices] = useState(initialNotices)
  const [studentRecords, setStudentRecords] = useState(students)
  const [newNoticeOpen, setNewNoticeOpen] = useState(false)
  const [newStudentOpen, setNewStudentOpen] = useState(false)
  const [selectedNotice, setSelectedNotice] = useState(null)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [toast, setToast] = useState("")

  const createNotice = (notice) => {
    setNotices((current) => [notice, ...current])
    setNewNoticeOpen(false)
    setToast("Notificación creada. Ya puedes iniciar su seguimiento.")
    window.setTimeout(() => setToast(""), 3600)
  }

  const markFollowed = () => {
    setSelectedNotice(null)
    setToast("Recordatorio preparado para las familias pendientes.")
    window.setTimeout(() => setToast(""), 3600)
  }

  const createStudent = (student) => {
    setStudentRecords((currentRecords) => [student, ...currentRecords])
    setNewStudentOpen(false)
    setToast("Alumno agregado. La ficha ya aparece en el padrón.")
    window.setTimeout(() => setToast(""), 3600)
  }

  const current = navigation.find((item) => item.id === activeView) || navigation[0]
  const renderView = () => {
    if (activeView === "notificaciones") return <NotificationsView notices={notices} onSelect={setSelectedNotice} onCreateClick={() => setNewNoticeOpen(true)} />
    if (activeView === "alumnos") return <StudentsView studentsList={studentRecords} onStudentSelect={setSelectedStudent} onAddStudent={() => setNewStudentOpen(true)} />
    if (activeView === "administracion") return <AdministrationView />
    return <DashboardView notices={notices} onSelect={setSelectedNotice} onCreateClick={() => setNewNoticeOpen(true)} onViewAll={() => setActiveView("notificaciones")} />
  }

  return <div className="app-shell">
    <aside className={`sidebar${mobileNavOpen ? " sidebar-open" : ""}`}><div className="brand-block"><span className="brand-mark"><GraduationCap size={21} strokeWidth={1.8} /></span><span className="brand-name">aula<span>clara</span></span><button className="mobile-close icon-button" onClick={() => setMobileNavOpen(false)} aria-label="Cerrar navegación"><X size={19} /></button></div><button className="school-switcher"><span className="school-avatar">CH</span><span className="school-copy"><strong>Colegio Horizonte</strong><small>Primaria y Jardín</small></span><ChevronDown size={15} /></button><div className="nav-section-label">ESPACIO ESCOLAR</div><nav className="side-nav" aria-label="Navegación principal">{navigation.map(({ id, label, icon: Icon, count }) => <button key={id} onClick={() => { setActiveView(id); setMobileNavOpen(false) }} className={`nav-item${activeView === id ? " nav-item-active" : ""}`}><Icon size={18} strokeWidth={1.8} /><span>{label}</span>{count && <span className="nav-count">{count}</span>}</button>)}</nav><div className="sidebar-bottom"><div className="sidebar-help"><span className="help-sparkle">i</span><div><strong>¿Necesitas ayuda?</strong><small>Estamos para acompañarte</small></div><ChevronRight size={15} /></div><button className="profile-button"><span className="profile-avatar">MR</span><span className="profile-copy"><strong>Mariana Ruiz</strong><small>Administradora</small></span><MoreHorizontal size={18} /></button></div></aside>
    <div className="main-column"><header className="topbar"><button className="mobile-menu icon-button" onClick={() => setMobileNavOpen(true)} aria-label="Abrir navegación"><Menu size={20} /></button><div className="breadcrumbs"><span>COLEGIO HORIZONTE</span><span className="breadcrumb-divider">/</span><span>{current.label.toUpperCase()}</span></div><div className="topbar-actions"><span className="school-year">Ciclo 2026–2027 <ChevronDown size={14} /></span><button className="icon-button notification-button" aria-label="Notificaciones del sistema"><Bell size={18} /><i /></button><Avatar name="Mariana Ruiz" tone="peach" small /></div></header><main className="main-content" key={activeView}>{renderView()}<footer className="app-footer"><span>Aula Clara <span className="footer-dot">·</span> Comunicación escolar, con claridad.</span><span>Información de demostración <span className="footer-dot">·</span> Sesión no persistente</span></footer></main></div>
    {mobileNavOpen && <button className="mobile-scrim" aria-label="Cerrar menú" onClick={() => setMobileNavOpen(false)} />}
    {newNoticeOpen && <NewNoticeModal onClose={() => setNewNoticeOpen(false)} onCreate={createNotice} />}
    {newStudentOpen && <NewStudentModal onClose={() => setNewStudentOpen(false)} onCreate={createStudent} />}
    {selectedNotice && <NoticeDetailModal notice={selectedNotice} onClose={() => setSelectedNotice(null)} onMarkDone={markFollowed} />}
    {selectedStudent && <StudentModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />}
    {toast && <div className="toast-message" role="status"><Check size={16} />{toast}<button className="icon-button" onClick={() => setToast("")} aria-label="Cerrar mensaje"><X size={15} /></button></div>}
  </div>
}
