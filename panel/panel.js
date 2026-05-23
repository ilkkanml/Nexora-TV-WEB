const STORAGE_KEY = "nexora_tv_console_v1";
const ADMIN_CODE = "ADMIN-2026";

const plans = [
  { id: "monthly", name: "Aylik", price: 149, durationDays: 30, credits: 1 },
  { id: "yearly", name: "Yillik", price: 799, durationDays: 365, credits: 4 },
  { id: "lifetime", name: "Omur boyu", price: 1499, durationDays: 3650, credits: 7 },
];

const state = {
  auth: null,
  tab: "devices",
  mode: document.body.dataset.panelMode || "admin",
};

const ui = {
  loginView: document.querySelector("#loginView"),
  panelView: document.querySelector("#panelView"),
  loginForm: document.querySelector("#panelLoginForm"),
  roleSelect: document.querySelector("#roleSelect"),
  accessCodeInput: document.querySelector("#accessCodeInput"),
  logoutBtn: document.querySelector("#logoutBtn"),
  roleEyebrow: document.querySelector("#roleEyebrow"),
  panelHeading: document.querySelector("#panelHeading"),
  scopePill: document.querySelector("#scopePill"),
  panelStats: document.querySelector("#panelStats"),
  licenseFormHelp: document.querySelector("#licenseFormHelp"),
  licenseCreateForm: document.querySelector("#licenseCreateForm"),
  panelDeviceId: document.querySelector("#panelDeviceId"),
  panelDeviceKey: document.querySelector("#panelDeviceKey"),
  panelPlatform: document.querySelector("#panelPlatform"),
  panelPlan: document.querySelector("#panelPlan"),
  resellerCreateSurface: document.querySelector("#resellerCreateSurface"),
  resellerCreateForm: document.querySelector("#resellerCreateForm"),
  newResellerName: document.querySelector("#newResellerName"),
  newResellerCode: document.querySelector("#newResellerCode"),
  newResellerCredits: document.querySelector("#newResellerCredits"),
  resetPanelDemoBtn: document.querySelector("#resetPanelDemoBtn"),
  panelSearch: document.querySelector("#panelSearch"),
  panelTableHead: document.querySelector("#panelTableHead"),
  panelTableBody: document.querySelector("#panelTableBody"),
  panelToast: document.querySelector("#panelToast"),
};

function simpleHash(value) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return `h${Math.abs(hash)}`;
}

function safeEncode(value) {
  return btoa(unescape(encodeURIComponent(value)));
}

function uid(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Date.now().toString(36).slice(-5).toUpperCase()}`;
}

function nowIso() {
  return new Date().toISOString();
}

function addDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

function formatDate(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createSeedData() {
  return {
    currentDeviceId: null,
    devices: [
      {
        id: "NXTV-8F42-A9C1",
        keyHash: simpleHash("4219-77AB"),
        platform: "Android TV",
        model: "Nexora Player 1.0",
        status: "pending",
        createdAt: addDays(-2),
        lastSeenAt: addDays(-1),
        lastSyncAt: null,
      },
      {
        id: "NXTV-FIRE-01D3",
        keyHash: simpleHash("9C2K-54LP"),
        platform: "Fire TV",
        model: "Nexora Fire build",
        status: "active",
        createdAt: addDays(-18),
        lastSeenAt: addDays(-1),
        lastSyncAt: addDays(-1),
      },
    ],
    licenses: [
      {
        id: "LIC-YEAR-8FIRE",
        deviceId: "NXTV-FIRE-01D3",
        planId: "yearly",
        source: "admin",
        status: "active",
        resellerId: "RSL-ATLAS",
        createdAt: addDays(-15),
        activatedAt: addDays(-15),
        expiresAt: addDays(350),
      },
    ],
    iptvSources: [
      {
        id: "SRC-DEMO-001",
        deviceId: "NXTV-FIRE-01D3",
        name: "Yasal aile aboneligi",
        url: "https://provider.example/playlist.m3u",
        username: "demo_user",
        passwordVault: safeEncode("demo-pass"),
        status: "synced",
        createdAt: addDays(-10),
        syncedAt: addDays(-1),
      },
    ],
    resellers: [
      {
        id: "RSL-ATLAS",
        name: "Atlas Media",
        code: "ATLAS25",
        credits: 18,
        sales: 36,
        status: "active",
        createdAt: addDays(-80),
      },
      {
        id: "RSL-NOVA",
        name: "Nova Bayi",
        code: "NOVA10",
        credits: 6,
        sales: 11,
        status: "active",
        createdAt: addDays(-42),
      },
    ],
    audit: [
      {
        id: uid("AUD"),
        actor: "system",
        action: "Demo verisi olusturuldu",
        createdAt: nowIso(),
      },
    ],
  };
}

function readData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seed = createSeedData();
    writeData(seed);
    return seed;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    const seed = createSeedData();
    writeData(seed);
    return seed;
  }
}

function writeData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function planById(planId) {
  return plans.find((plan) => plan.id === planId) || plans[0];
}

function audit(data, actor, action) {
  data.audit = data.audit || [];
  data.audit.unshift({
    id: uid("AUD"),
    actor,
    action,
    createdAt: nowIso(),
  });
  data.audit = data.audit.slice(0, 60);
}

function toast(message) {
  ui.panelToast.textContent = message;
  ui.panelToast.classList.add("is-visible");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => ui.panelToast.classList.remove("is-visible"), 2600);
}

function badge(status) {
  const classes = {
    active: "ok",
    synced: "ok",
    pending: "warn",
    suspended: "danger",
    disabled: "danger",
    expired: "danger",
  };
  const labels = {
    active: "Aktif",
    synced: "Senkron",
    pending: "Bekliyor",
    suspended: "Askida",
    disabled: "Kapali",
    expired: "Suresi doldu",
  };
  return `<span class="badge ${classes[status] || ""}">${labels[status] || escapeHtml(status)}</span>`;
}

function setOptions() {
  ui.panelPlan.innerHTML = plans
    .map((plan) => `<option value="${plan.id}">${plan.name} (${plan.durationDays} gun)</option>`)
    .join("");
}

function isAdmin() {
  return state.auth?.role === "admin";
}

function scopedLicenses(data) {
  if (isAdmin()) return data.licenses;
  return data.licenses.filter((license) => license.resellerId === state.auth.resellerId);
}

function scopedDeviceIds(data) {
  return new Set(scopedLicenses(data).map((license) => license.deviceId));
}

function scopedDevices(data) {
  if (isAdmin()) return data.devices;
  const ids = scopedDeviceIds(data);
  return data.devices.filter((device) => ids.has(device.id));
}

function scopedSources(data) {
  if (isAdmin()) return data.iptvSources;
  const ids = scopedDeviceIds(data);
  return data.iptvSources.filter((source) => ids.has(source.deviceId));
}

function canManageDevice(data, deviceId) {
  if (isAdmin()) return true;
  return scopedDeviceIds(data).has(deviceId);
}

function activeLicenseFor(data, deviceId) {
  const now = Date.now();
  return data.licenses
    .filter((license) => license.deviceId === deviceId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .find((license) => license.status === "active" && new Date(license.expiresAt).getTime() > now);
}

function matchesSearch(row, query) {
  if (!query) return true;
  return JSON.stringify(row).toLowerCase().includes(query.toLowerCase());
}

function renderShell(data) {
  const reseller = state.auth?.resellerId
    ? data.resellers.find((item) => item.id === state.auth.resellerId)
    : null;

  ui.roleEyebrow.textContent = isAdmin() ? "Admin paneli" : "Reseller paneli";
  ui.panelHeading.textContent = isAdmin()
    ? "Tum musterileri, lisanslari ve bayileri yonet."
    : "Kendi musterilerini ve lisanslarini yonet.";
  ui.scopePill.textContent = isAdmin()
    ? "Tam yetki"
    : `${reseller?.name || "Reseller"} · ${reseller?.credits ?? 0} kontor`;
  ui.licenseFormHelp.textContent = isAdmin()
    ? "Admin lisanslari dogrudan olusturur ve cihaz durumunu yonetir."
    : "Reseller lisans olusturdugunda plan kontoru bakiyeden duser.";
  ui.resellerCreateSurface?.classList.toggle("is-hidden", !isAdmin());
  document.querySelectorAll(".admin-only").forEach((item) => item.classList.toggle("is-hidden", !isAdmin()));

  if (!isAdmin() && state.tab === "resellers") {
    state.tab = "devices";
  }

  document.querySelectorAll("[data-panel-tab]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.panelTab === state.tab);
  });
}

function renderStats(data) {
  const devices = scopedDevices(data);
  const licenses = scopedLicenses(data);
  const sources = scopedSources(data);
  const activeLicenses = licenses.filter((license) => activeLicenseFor(data, license.deviceId)?.id === license.id);

  if (isAdmin()) {
    ui.panelStats.innerHTML = `
      <article class="stat-card"><strong>${data.devices.length}</strong><span>Toplam cihaz</span></article>
      <article class="stat-card"><strong>${activeLicenses.length}</strong><span>Aktif lisans</span></article>
      <article class="stat-card"><strong>${data.resellers.length}</strong><span>Reseller</span></article>
      <article class="stat-card"><strong>${data.iptvSources.length}</strong><span>IPTV kaynagi</span></article>
    `;
    return;
  }

  const reseller = data.resellers.find((item) => item.id === state.auth.resellerId);
  ui.panelStats.innerHTML = `
    <article class="stat-card"><strong>${devices.length}</strong><span>Musteri cihazi</span></article>
    <article class="stat-card"><strong>${activeLicenses.length}</strong><span>Aktif lisans</span></article>
    <article class="stat-card"><strong>${sources.length}</strong><span>IPTV kaynagi</span></article>
    <article class="stat-card"><strong>${reseller?.credits ?? 0}</strong><span>Kalan kontor</span></article>
  `;
}

function renderTable(data) {
  const query = ui.panelSearch.value.trim();
  const tab = state.tab;
  const config = {
    devices: {
      head: ["Cihaz", "Platform", "Durum", "Lisans", "Son sync", "Islem"],
      rows: scopedDevices(data)
        .filter((device) => matchesSearch(device, query))
        .map((device) => {
          const license = activeLicenseFor(data, device.id);
          const nextAction = device.status === "suspended" ? "activate-device" : "suspend-device";
          const nextLabel = device.status === "suspended" ? "Ac" : "Askıya al";
          return [
            `<strong>${escapeHtml(device.id)}</strong>`,
            escapeHtml(device.platform),
            badge(device.status),
            license ? `${escapeHtml(planById(license.planId).name)} · ${formatDate(license.expiresAt)}` : "Yok",
            formatDate(device.lastSyncAt),
            `<button class="secondary-action compact" data-action="${nextAction}" data-id="${escapeHtml(device.id)}">${nextLabel}</button>`,
          ];
        }),
    },
    licenses: {
      head: ["Lisans", "Cihaz", "Plan", "Sahip", "Bitis", "Islem"],
      rows: scopedLicenses(data)
        .filter((license) => matchesSearch(license, query))
        .map((license) => {
          const plan = planById(license.planId);
          const reseller = data.resellers.find((item) => item.id === license.resellerId);
          const expired = new Date(license.expiresAt).getTime() <= Date.now();
          const nextAction = license.status === "active" ? "disable-license" : "enable-license";
          const nextLabel = license.status === "active" ? "Kapat" : "Ac";
          return [
            `<strong>${escapeHtml(license.id)}</strong>`,
            escapeHtml(license.deviceId),
            escapeHtml(plan.name),
            escapeHtml(reseller?.name || license.source || "direct"),
            `${formatDate(license.expiresAt)} ${expired ? badge("expired") : badge(license.status)}`,
            `<button class="secondary-action compact" data-action="${nextAction}" data-id="${escapeHtml(license.id)}">${nextLabel}</button>`,
          ];
        }),
    },
    sources: {
      head: ["Kaynak", "Cihaz", "URL", "Kullanici", "Durum", "Islem"],
      rows: scopedSources(data)
        .filter((source) => matchesSearch(source, query))
        .map((source) => {
          const nextAction = source.status === "disabled" ? "enable-source" : "disable-source";
          const nextLabel = source.status === "disabled" ? "Ac" : "Kapat";
          return [
            `<strong>${escapeHtml(source.name)}</strong>`,
            escapeHtml(source.deviceId),
            escapeHtml(source.url),
            escapeHtml(source.username),
            badge(source.status),
            `<button class="secondary-action compact" data-action="${nextAction}" data-id="${escapeHtml(source.id)}">${nextLabel}</button>`,
          ];
        }),
    },
    resellers: {
      head: ["Reseller", "Kod", "Kontor", "Satis", "Durum", "Islem"],
      rows: data.resellers
        .filter((reseller) => matchesSearch(reseller, query))
        .map((reseller) => {
          const nextAction = reseller.status === "active" ? "disable-reseller" : "enable-reseller";
          const nextLabel = reseller.status === "active" ? "Kapat" : "Ac";
          return [
            `<strong>${escapeHtml(reseller.name)}</strong>`,
            escapeHtml(reseller.code),
            escapeHtml(reseller.credits),
            escapeHtml(reseller.sales),
            badge(reseller.status),
            `<button class="secondary-action compact" data-action="add-credit" data-id="${escapeHtml(reseller.id)}">+10 kontor</button>
             <button class="secondary-action compact" data-action="${nextAction}" data-id="${escapeHtml(reseller.id)}">${nextLabel}</button>`,
          ];
        }),
    },
  }[tab];

  ui.panelTableHead.innerHTML = `<tr>${config.head.map((cell) => `<th>${cell}</th>`).join("")}</tr>`;
  ui.panelTableBody.innerHTML = config.rows.length
    ? config.rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")
    : `<tr><td colspan="${config.head.length}">Kayit bulunamadi.</td></tr>`;
}

function render() {
  if (!state.auth) return;
  const data = readData();
  renderShell(data);
  renderStats(data);
  renderTable(data);
}

function login(event) {
  event.preventDefault();
  const role = state.mode === "reseller" ? "reseller" : "admin";
  const code = ui.accessCodeInput.value.trim().toUpperCase();
  const data = readData();

  if (role === "admin" && code === ADMIN_CODE) {
    state.auth = { role: "admin", name: "Admin" };
  } else if (role === "reseller") {
    const reseller = data.resellers.find((item) => item.code === code && item.status === "active");
    if (!reseller) {
      toast("Reseller kodu bulunamadi veya pasif.");
      return;
    }
    state.auth = { role: "reseller", resellerId: reseller.id, name: reseller.name };
  } else {
    toast("Admin erisim kodu hatali.");
    return;
  }

  ui.loginView.hidden = true;
  ui.panelView.hidden = false;
  ui.logoutBtn.hidden = false;
  toast("Panel acildi.");
  render();
}

function logout() {
  state.auth = null;
  ui.loginView.hidden = false;
  ui.panelView.hidden = true;
  ui.logoutBtn.hidden = true;
  ui.accessCodeInput.value = "";
  toast("Cikis yapildi.");
}

function createLicense(event) {
  event.preventDefault();
  const data = readData();
  const deviceId = ui.panelDeviceId.value.trim().toUpperCase();
  const deviceKey = ui.panelDeviceKey.value.trim().toUpperCase();
  const plan = planById(ui.panelPlan.value);
  const actor = isAdmin() ? "admin" : state.auth.name;
  const reseller = state.auth.resellerId ? data.resellers.find((item) => item.id === state.auth.resellerId) : null;

  if (!deviceId) {
    toast("Cihaz kimligi gerekli.");
    return;
  }

  if (reseller && reseller.credits < plan.credits) {
    toast("Reseller kontoru bu plan icin yetersiz.");
    return;
  }

  let device = data.devices.find((item) => item.id === deviceId);
  if (!device) {
    device = {
      id: deviceId,
      keyHash: simpleHash(deviceKey || uid("KEY")),
      platform: ui.panelPlatform.value,
      model: isAdmin() ? "Admin kaydi" : "Reseller kaydi",
      status: "active",
      createdAt: nowIso(),
      lastSeenAt: null,
      lastSyncAt: nowIso(),
    };
    data.devices.unshift(device);
  } else if (!canManageDevice(data, device.id)) {
    toast("Bu cihaz bu reseller hesabina ait degil.");
    return;
  } else {
    device.status = "active";
    device.platform = ui.panelPlatform.value;
    device.lastSyncAt = nowIso();
  }

  const license = {
    id: uid("LIC"),
    deviceId: device.id,
    planId: plan.id,
    source: isAdmin() ? "admin" : "reseller-panel",
    status: "active",
    resellerId: reseller?.id || null,
    createdAt: nowIso(),
    activatedAt: nowIso(),
    expiresAt: addDays(plan.durationDays),
  };

  data.licenses.unshift(license);
  if (reseller) {
    reseller.credits -= plan.credits;
    reseller.sales += 1;
  }

  audit(data, actor, `${device.id} icin ${plan.name} lisans olusturdu`);
  writeData(data);
  ui.licenseCreateForm.reset();
  toast("Lisans olusturuldu.");
  render();
}

function createReseller(event) {
  event.preventDefault();
  if (!isAdmin()) return;
  if (!ui.newResellerName || !ui.newResellerCode || !ui.newResellerCredits) return;
  const data = readData();
  const name = ui.newResellerName.value.trim();
  const code = ui.newResellerCode.value.trim().toUpperCase();
  const credits = Number(ui.newResellerCredits.value);

  if (!name || !code) {
    toast("Reseller adi ve kodu gerekli.");
    return;
  }

  if (data.resellers.some((item) => item.code === code)) {
    toast("Bu reseller kodu zaten kullaniliyor.");
    return;
  }

  data.resellers.unshift({
    id: uid("RSL"),
    name,
    code,
    credits: Number.isFinite(credits) ? credits : 0,
    sales: 0,
    status: "active",
    createdAt: nowIso(),
  });

  audit(data, "admin", `${name} reseller olarak eklendi`);
  writeData(data);
  ui.resellerCreateForm.reset();
  ui.newResellerCredits.value = 10;
  toast("Reseller eklendi.");
  render();
}

function handleAction(action, id) {
  const data = readData();
  const actor = isAdmin() ? "admin" : state.auth.name;

  if (action === "suspend-device" || action === "activate-device") {
    const device = data.devices.find((item) => item.id === id);
    if (!device || !canManageDevice(data, id)) {
      toast("Bu cihazi yonetme yetkin yok.");
      return;
    }
    device.status = action === "suspend-device" ? "suspended" : "active";
    audit(data, actor, `${id} cihazi ${device.status} yapildi`);
  }

  if (action === "disable-license" || action === "enable-license") {
    const license = data.licenses.find((item) => item.id === id);
    if (!license || (!isAdmin() && license.resellerId !== state.auth.resellerId)) {
      toast("Bu lisansi yonetme yetkin yok.");
      return;
    }
    license.status = action === "disable-license" ? "disabled" : "active";
    audit(data, actor, `${id} lisansi ${license.status} yapildi`);
  }

  if (action === "disable-source" || action === "enable-source") {
    const source = data.iptvSources.find((item) => item.id === id);
    if (!source || !canManageDevice(data, source.deviceId)) {
      toast("Bu kaynagi yonetme yetkin yok.");
      return;
    }
    source.status = action === "disable-source" ? "disabled" : "synced";
    audit(data, actor, `${source.name} kaynagi ${source.status} yapildi`);
  }

  if (isAdmin() && (action === "disable-reseller" || action === "enable-reseller" || action === "add-credit")) {
    const reseller = data.resellers.find((item) => item.id === id);
    if (!reseller) return;
    if (action === "add-credit") reseller.credits += 10;
    if (action === "disable-reseller") reseller.status = "disabled";
    if (action === "enable-reseller") reseller.status = "active";
    audit(data, "admin", `${reseller.name} icin ${action} uygulandi`);
  }

  writeData(data);
  toast("Islem uygulandi.");
  render();
}

function resetDemo() {
  writeData(createSeedData());
  toast("Demo verisi sifirlandi.");
  render();
}

function bindEvents() {
  ui.loginForm.addEventListener("submit", login);
  ui.logoutBtn.addEventListener("click", logout);
  ui.licenseCreateForm.addEventListener("submit", createLicense);
  ui.resellerCreateForm?.addEventListener("submit", createReseller);
  ui.resetPanelDemoBtn.addEventListener("click", resetDemo);
  ui.panelSearch.addEventListener("input", render);

  document.querySelectorAll("[data-panel-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("admin-only") && !isAdmin()) return;
      state.tab = button.dataset.panelTab;
      render();
    });
  });

  ui.panelTableBody.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    handleAction(button.dataset.action, button.dataset.id);
  });
}

setOptions();
bindEvents();
