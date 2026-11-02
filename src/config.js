// Contact details and event facts shared by both pages.
export const HOST_WHATSAPP = '916397056448'
export const HOST_PHONE_DISPLAY = '+91 63970 56448'
export const COMMUNITY_CHAT_URL = 'https://chat.whatsapp.com/EcYa7bY2Li93aJ0anOloV4'
export const EMAILS = ['mugdharoy2291@gmail.com', 'frekvncy@gmail.com']

export const DIWALI = {
  startsAt: '2026-11-07T17:00:00+05:30',
  price: 999,
  maxPasses: 5,
  upiId: 'mugdharoy2291@oksbi',
  payee: 'Mugdha Roy',
}

export const waLink = (text) =>
  `https://wa.me/${HOST_WHATSAPP}${text ? `?text=${encodeURIComponent(text)}` : ''}`
