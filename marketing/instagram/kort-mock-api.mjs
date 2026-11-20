// API de demonstração do KORT (só para capturar telas). Dados fictícios.
import http from 'node:http';

const TZ = 'America/Recife';
const pad = (n) => String(n).padStart(2, '0');
const now = new Date();
const today = new Date(now.getTime() - 3 * 3600e3).toISOString().slice(0, 10); // data em Recife
const at = (hhmm, date = today) => new Date(`${date}T${hhmm}:00-03:00`).toISOString();
const addMin = (iso, m) => new Date(new Date(iso).getTime() + m * 60e3).toISOString();

const tenant = {
  name: 'Barbearia do Zé',
  slug: 'barbearia-do-ze',
  accentColor: '#1E4D40',
  logoUrl: null,
  phone: '87999990001',
  address: 'Rua Principal, 120 · Centro, Ibimirim-PE',
  timezone: TZ,
  bookingAvailable: true,
  minAdvanceMinutes: 30,
  maxAdvanceDays: 30,
  cancelLimitHours: 2,
  openWeekdays: [1, 2, 3, 4, 5, 6],
  extraDates: [],
  waitlist: true,
  today: { status: 'open', opensAt: '08:00', closesAt: '19:00' },
  loyalty: { goal: 10, rewardText: 'Corte grátis' },
};

const services = [
  { id: 's1', name: 'Corte', description: 'Tesoura ou máquina, com acabamento.', priceCents: 3000, durationMinutes: 30, countsForLoyalty: true },
  { id: 's2', name: 'Barba', description: 'Toalha quente e navalha.', priceCents: 2000, durationMinutes: 30, countsForLoyalty: true },
  { id: 's3', name: 'Corte + Barba', description: 'O combo completo.', priceCents: 4500, durationMinutes: 60, countsForLoyalty: true },
  { id: 's4', name: 'Sobrancelha', description: null, priceCents: 1000, durationMinutes: 15, countsForLoyalty: false },
];
const professionals = [
  { id: 'p1', name: 'Zé', avatarUrl: null },
  { id: 'p2', name: 'Carlos', avatarUrl: null },
];

const people = ['João Pedro', 'Marcos Silva', 'Rafael Costa', 'Lucas Andrade', 'Bruno Melo', 'Diego Santos', 'Felipe Rocha', 'Thiago Lima'];
const todayList = [
  ['08:30', 0, 's1', 'DONE'], ['09:00', 1, 's3', 'DONE'], ['10:00', 2, 's1', 'DONE'], ['10:30', 3, 's2', 'DONE'],
  ['11:00', 4, 's3', 'CONFIRMED'], ['14:00', 5, 's1', 'CONFIRMED'], ['14:30', 6, 's3', 'SCHEDULED'], ['16:00', 7, 's1', 'SCHEDULED'],
].map(([t, i, sid, status], k) => {
  const s = services.find((x) => x.id === sid);
  const startsAt = at(t);
  return {
    id: `a${k}`, startsAt, endsAt: addMin(startsAt, s.durationMinutes), status,
    source: k % 3 === 0 ? 'MANUAL' : 'ONLINE', serviceName: s.name, priceCents: s.priceCents,
    pendingApproval: false, customer: { id: `c${i}`, name: people[i], phone: '8798888000' + i },
    walkInName: null, professional: professionals[k % 2],
  };
});
const doneRev = todayList.filter((a) => a.status === 'DONE').reduce((s, a) => s + a.priceCents, 0);
const allRev = todayList.reduce((s, a) => s + a.priceCents, 0);

const overview = {
  date: today, timezone: TZ, loyaltyActive: true,
  today: { total: todayList.length, done: 4, remaining: 4, expectedRevenueCents: allRev, doneRevenueCents: doneRev },
  next7Days: { total: 46, revenueCents: 151500 },
  customers: { total: 128, newThisMonth: 17 },
  pendingApproval: 0,
  next: todayList.find((a) => a.status !== 'DONE'),
  todayList,
};

const days = [];
const base = new Date(`${today}T12:00:00-03:00`);
for (let i = 29; i >= 0; i--) {
  const d = new Date(base.getTime() - i * 864e5);
  const key = d.toISOString().slice(0, 10);
  const wd = d.getUTCDay();
  const done = wd === 0 ? 0 : 8 + ((i * 7) % 9) + (wd === 6 ? 6 : 0);
  days.push({ key, label: `${pad(d.getUTCDate())}/${pad(d.getUTCMonth() + 1)}`, revenueCents: done * 3400, done });
}
const monthRev = days.reduce((s, d) => s + d.revenueCents, 0);
const monthDone = days.reduce((s, d) => s + d.done, 0);
const dashboard = {
  period: 'month', from: days[0].key, to: days.at(-1).key, timezone: TZ,
  revenueCents: monthRev, previousRevenueCents: Math.round(monthRev * 0.82),
  done: monthDone, noShows: 6, canceled: 9, noShowRate: 6 / (monthDone + 6),
  ticketCents: Math.round(monthRev / monthDone), newCustomers: 17,
  upcoming: 12, upcomingCents: 40500, recovered: 5, recoveredCents: 17500,
  series: days,
  byProfessional: [
    { id: 'p1', name: 'Zé', avatarUrl: null, revenueCents: Math.round(monthRev * 0.58), done: Math.round(monthDone * 0.58) },
    { id: 'p2', name: 'Carlos', avatarUrl: null, revenueCents: Math.round(monthRev * 0.42), done: Math.round(monthDone * 0.42) },
  ],
  byService: [
    { id: 's1', name: 'Corte', revenueCents: Math.round(monthRev * 0.46), done: Math.round(monthDone * 0.55) },
    { id: 's3', name: 'Corte + Barba', revenueCents: Math.round(monthRev * 0.38), done: Math.round(monthDone * 0.27) },
    { id: 's2', name: 'Barba', revenueCents: Math.round(monthRev * 0.13), done: Math.round(monthDone * 0.14) },
    { id: 's4', name: 'Sobrancelha', revenueCents: Math.round(monthRev * 0.03), done: Math.round(monthDone * 0.04) },
  ],
};

const loyaltyOverview = {
  settings: { enabled: true, goal: 10, rewardText: 'Corte grátis' },
  stats: { activeCards: 64, stampsThisMonth: 187, redeemedThisMonth: 9, readyToRedeem: 3 },
  nearReward: [
    { customer: { id: 'c1', name: 'Marcos Silva', phone: '87988880001' }, stamps: 10, goal: 10, missing: 0 },
    { customer: { id: 'c2', name: 'Rafael Costa', phone: '87988880002' }, stamps: 9, goal: 10, missing: 1 },
    { customer: { id: 'c3', name: 'Lucas Andrade', phone: '87988880003' }, stamps: 8, goal: 10, missing: 2 },
  ],
};

const sessionUser = {
  id: 'u1', name: 'Zé', email: 'ze@exemplo.com', role: 'OWNER', avatarUrl: null,
  tenant: { id: 't1', name: tenant.name, slug: tenant.slug, accentColor: tenant.accentColor, logoUrl: null, timezone: TZ, subscriptionStatus: 'ACTIVE' },
  features: ['online_booking', 'loyalty', 'reminders', 'reports', 'multi_professional', 'waitlist'],
  support: false,
};

function slotsFor(date) {
  const out = [];
  const taken = new Set(['09:00', '10:30', '11:00', '14:00', '15:30', '17:00']);
  for (let h = 8; h < 19; h++) for (const m of [0, 30]) {
    if (h === 12) continue;
    const time = `${pad(h)}:${pad(m)}`;
    out.push({ time, startsAt: at(time, date), available: !taken.has(time) });
  }
  return out;
}

const json = (res, code, body) => { res.writeHead(code, { 'content-type': 'application/json' }); res.end(JSON.stringify(body)); };

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  const p = url.pathname;
  if (p === '/auth/me') return json(res, 200, { user: sessionUser });
  if (p === '/appointments/overview') return json(res, 200, overview);
  if (p === '/users') return json(res, 200, [
    { id: 'u1', name: 'Zé', email: 'ze@exemplo.com', role: 'OWNER', active: true },
    { id: 'u2', name: 'Carlos', email: 'carlos@exemplo.com', role: 'BARBER', active: true },
  ]);
  if (p === '/loyalty/overview') return json(res, 200, loyaltyOverview);
  if (p === '/reports/dashboard') return json(res, 200, { ...dashboard, period: url.searchParams.get('period') ?? 'month' });
  if (p === '/professionals') return json(res, 200, { professionals: professionals.map((x) => ({ ...x, active: true })) });
  if (p === '/services') return json(res, 200, { services });
  const m = p.match(/^\/public\/([^/]+)(\/.*)?$/);
  if (m) {
    const rest = m[2] ?? '';
    if (rest === '') return json(res, 200, { tenant, services, professionals });
    if (rest === '/customers/me') return json(res, 200, { customer: { id: 'c9', name: 'João Pedro', phone: '87988880009', loyalty: { stamps: 7, goal: 10, rewardText: 'Corte grátis' } } });
    if (rest === '/gallery') return json(res, 200, { photos: [] });
    if (rest === '/availability') return json(res, 200, { slots: slotsFor(url.searchParams.get('date') ?? today) });
    if (rest === '/appointments') return json(res, 200, { appointments: [] });
    if (rest === '/waitlist') return json(res, 200, { entries: [] });
    if (rest.startsWith('/icon/')) { res.writeHead(404); return res.end(); }
  }
  console.log('404', req.method, p);
  json(res, 404, { message: 'not found' });
}).listen(3333, () => console.log('mock api on 3333'));
