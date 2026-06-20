const cloud = require('wx-server-sdk')
const crypto = require('crypto')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const COLLECTION = 'appointments'
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'Sin30+Cos60=1/2?no'
const TOKEN_SECRET = `fuguang-admin-${ADMIN_PASSWORD}`
const TOKEN_TTL = 7 * 24 * 60 * 60 * 1000

function base64url(value) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

function fromBase64url(value) {
  const normalized = String(value || '').replace(/-/g, '+').replace(/_/g, '/')
  const padding = '='.repeat((4 - (normalized.length % 4)) % 4)
  return Buffer.from(normalized + padding, 'base64').toString()
}

function sign(value) {
  return crypto
    .createHmac('sha256', TOKEN_SECRET)
    .update(value)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

function createToken(openid) {
  const payload = {
    role: 'admin',
    openid,
    exp: Date.now() + TOKEN_TTL
  }
  const body = base64url(JSON.stringify(payload))
  return `${body}.${sign(body)}`
}

function verifyToken(token, openid) {
  const parts = String(token || '').split('.')
  if (parts.length !== 2) return false

  const [body, signature] = parts
  if (sign(body) !== signature) return false

  try {
    const payload = JSON.parse(fromBase64url(body))
    return payload.role === 'admin' &&
      payload.openid === openid &&
      payload.exp &&
      payload.exp > Date.now()
  } catch (err) {
    return false
  }
}

function sanitizeText(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength)
}

function formatItem(item) {
  return {
    id: item.id,
    name: sanitizeText(item.name, 120),
    categoryName: sanitizeText(item.categoryName, 40),
    rackLabel: sanitizeText(item.rackLabel || item.rackCode, 20),
    subtitle: sanitizeText(item.subtitle, 160)
  }
}

function formatAppointment(appointment) {
  return {
    id: appointment._id,
    appointmentNo: appointment.appointmentNo,
    status: appointment.status,
    scene: appointment.scene,
    date: appointment.date,
    people: appointment.people,
    remark: appointment.remark,
    contactName: appointment.contactName,
    contactPhone: appointment.contactPhone,
    itemCount: appointment.itemCount,
    racksText: appointment.racksText,
    categoriesText: appointment.categoriesText,
    createdAt: appointment.createdAt,
    updatedAt: appointment.updatedAt,
    items: (appointment.items || []).map(formatItem)
  }
}

async function ensureCollection() {
  try {
    await db.createCollection(COLLECTION)
  } catch (err) {
    const message = String(err && err.message)
    if (!message.includes('already exists') && !message.includes('Collection already exists')) {
      console.warn('ensure appointments collection skipped', err)
    }
  }
}

async function login(event, wxContext) {
  const username = sanitizeText(event.username, 40)
  const password = String(event.password || '')

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return { ok: false, error: 'INVALID_ADMIN_LOGIN' }
  }

  return {
    ok: true,
    token: createToken(wxContext.OPENID),
    expiresAt: Date.now() + TOKEN_TTL
  }
}

async function list(event, wxContext) {
  if (!verifyToken(event.token, wxContext.OPENID)) {
    return { ok: false, error: 'ADMIN_SESSION_EXPIRED' }
  }

  await ensureCollection()

  const res = await db.collection(COLLECTION)
    .orderBy('createdAt', 'desc')
    .limit(100)
    .get()

  return {
    ok: true,
    appointments: (res.data || []).map(formatAppointment)
  }
}

exports.main = async event => {
  const wxContext = cloud.getWXContext()
  const action = sanitizeText(event.action, 20)

  if (action === 'login') return login(event, wxContext)
  if (action === 'list') return list(event, wxContext)

  return { ok: false, error: 'INVALID_ACTION' }
}
