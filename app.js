const STORAGE_KEY = "nexora_tv_console_v1";

const plans = [
  {
    id: "monthly",
    name: "Aylik",
    price: 149,
    durationDays: 30,
    credits: 1,
    description: "Tek cihaz icin kisa donem aktivasyon.",
    features: ["1 cihaz", "Web profil", "IPTV kaynak senkronu"],
  },
  {
    id: "yearly",
    name: "Yillik",
    price: 799,
    durationDays: 365,
    credits: 4,
    featured: true,
    description: "Ana satis plani, uzun sureli aktivasyon.",
    features: ["1 cihaz", "Yenileme hatirlatici", "Oncelikli destek"],
  },
  {
    id: "lifetime",
    name: "Omur boyu",
    price: 1499,
    durationDays: 3650,
    credits: 7,
    description: "Tek cihaza uzun sureli lisans.",
    features: ["1 cihaz", "Kalici cihaz kaydi", "Admin onay akisi"],
  },
];

const downloadMap = {
  "android-tv": {
    label: "Android TV",
    app: "./dl/nexoratvplayer-android-tv.apk",
    zip: "./dl/nexoratvplayer-android-tv.zip",
  },
  "fire-tv": {
    label: "Fire TV",
    app: "./dl/nexoratvplayer-fire-tv.apk",
    zip: "./dl/nexoratvplayer-fire-tv.zip",
  },
  "android-mobile": {
    label: "Android Mobile",
    app: "./dl/nexoratvplayer-android-mobile.apk",
    zip: "./dl/nexoratvplayer-android-mobile.zip",
  },
};

const views = {
  home: document.querySelector("#view-home"),
  profile: document.querySelector("#view-profile"),
};

const routeButtons = Array.from(document.querySelectorAll("[data-route]"));
const ui = {
  sessionPill: document.querySelector("#sessionPill"),
  pageLoader: document.querySelector("#pageLoader"),
  pricingGrid: document.querySelector("#pricingGrid"),
  downloadBtn: document.querySelector("#downloadBtn"),
  downloadMeta: document.querySelector("#downloadMeta"),
  profileGate: document.querySelector("#profileGate"),
  profileContent: document.querySelector("#profileContent"),
  deviceLoginForm: document.querySelector("#deviceLoginForm"),
  deviceIdInput: document.querySelector("#deviceIdInput"),
  deviceKeyInput: document.querySelector("#deviceKeyInput"),
  fillDemoDevice: document.querySelector("#fillDemoDevice"),
  resetDemoBtn: document.querySelector("#resetDemoBtn"),
  profileIntro: document.querySelector("#profileIntro"),
  profileStatus: document.querySelector("#profileStatus"),
  purchaseSurface: document.querySelector("#purchaseSurface"),
  purchaseForm: document.querySelector("#purchaseForm"),
  legalAcceptInput: document.querySelector("#legalAcceptInput"),
  planSelect: document.querySelector("#planSelect"),
  resellerCodeInput: document.querySelector("#resellerCodeInput"),
  iptvForm: document.querySelector("#iptvForm"),
  sourceNameInput: document.querySelector("#sourceNameInput"),
  sourceUrlInput: document.querySelector("#sourceUrlInput"),
  sourceUserInput: document.querySelector("#sourceUserInput"),
  sourcePassInput: document.querySelector("#sourcePassInput"),
  syncDeviceBtn: document.querySelector("#syncDeviceBtn"),
  deviceTableBody: document.querySelector("#deviceTableBody"),
  toast: document.querySelector("#toast"),
};

const appState = {
  route: "home",
  downloadPlatform: "android-tv",
  downloadKind: "app",
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

function money(value) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
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

function findDevice(data, deviceId) {
  return data.devices.find((device) => device.id === deviceId);
}

function findActiveLicense(data, deviceId) {
  const now = Date.now();
  return data.licenses
    .filter((license) => license.deviceId === deviceId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .find((license) => license.status === "active" && new Date(license.expiresAt).getTime() > now);
}

function sourcesForDevice(data, deviceId) {
  return data.iptvSources.filter((source) => source.deviceId === deviceId);
}

function statusBadge(status) {
  const classes = {
    active: "ok",
    synced: "ok",
    pending: "warn",
    suspended: "danger",
    expired: "danger",
    disabled: "danger",
  };
  const labels = {
    active: "Aktif",
    synced: "Senkron",
    pending: "Bekliyor",
    suspended: "Askida",
    expired: "Suresi doldu",
    disabled: "Kapali",
  };
  return `<span class="badge ${classes[status] || ""}">${labels[status] || status}</span>`;
}

function audit(data, actor, action) {
  data.audit = data.audit || [];
  data.audit.unshift({
    id: uid("AUD"),
    actor,
    action,
    createdAt: nowIso(),
  });
  data.audit = data.audit.slice(0, 40);
}

function toast(message) {
  ui.toast.textContent = message;
  ui.toast.classList.add("is-visible");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => ui.toast.classList.remove("is-visible"), 2800);
}

function setLoading(active) {
  ui.pageLoader.classList.toggle("is-visible", active);
}

function applyRoute(route) {
  const nextRoute = views[route] ? route : "home";
  appState.route = nextRoute;

  Object.entries(views).forEach(([key, view]) => {
    view.classList.toggle("is-visible", key === nextRoute);
  });

  routeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.route === nextRoute);
  });

  if (window.location.hash !== `#${nextRoute}`) {
    history.replaceState(null, "", `#${nextRoute}`);
  }

  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showRoute(route, animate = true) {
  if (!animate) {
    applyRoute(route);
    return;
  }

  setLoading(true);
  window.setTimeout(() => {
    applyRoute(route);
    window.setTimeout(() => setLoading(false), 220);
  }, 260);
}

function fillPlanSelect() {
  ui.planSelect.innerHTML = plans
    .map((plan) => `<option value="${plan.id}">${plan.name} - ${money(plan.price)}</option>`)
    .join("");
}

function renderPricing() {
  ui.pricingGrid.innerHTML = plans
    .map(
      (plan) => `
        <article class="pricing-card ${plan.featured ? "is-featured" : ""}">
          <h3>${plan.name}</h3>
          <p>${plan.description}</p>
          <div class="price">${money(plan.price)}</div>
          <div class="plan-meta">${plan.durationDays} gun player lisansi</div>
          <ul class="plan-list">
            ${plan.features.map((feature) => `<li>${feature}</li>`).join("")}
            <li>Yayin veya playlist icermez</li>
          </ul>
          <button class="primary-action full plan-pick" data-plan="${plan.id}" type="button">Bu plani sec</button>
        </article>
      `
    )
    .join("");
}

function renderDownload() {
  const platform = downloadMap[appState.downloadPlatform];
  const kind = appState.downloadKind;
  const extension = kind === "zip" ? "ZIP paket" : "uygulama dosyasi";

  document.querySelectorAll("[data-download-platform]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.downloadPlatform === appState.downloadPlatform);
  });
  document.querySelectorAll("[data-download-kind]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.downloadKind === appState.downloadKind);
  });

  ui.downloadBtn.href = platform[kind];
  ui.downloadBtn.setAttribute("download", "");
  ui.downloadBtn.textContent = `${platform.label} ${kind === "zip" ? "ZIP indir" : "indir"}`;
  ui.downloadMeta.textContent = `${platform.label} icin ${extension} secildi. Hesap olusturmadan indirebilirsin.`;
}

function renderSession(data) {
  const device = data.currentDeviceId ? findDevice(data, data.currentDeviceId) : null;
  if (!device) {
    ui.sessionPill.textContent = "Cihaz bekleniyor";
    return;
  }

  const license = findActiveLicense(data, device.id);
  ui.sessionPill.textContent = `${device.id} · ${license ? "aktif" : "lisans yok"}`;
}

function renderProfile(data) {
  const device = data.currentDeviceId ? findDevice(data, data.currentDeviceId) : null;

  ui.profileGate.hidden = Boolean(device);
  ui.profileContent.hidden = !device;

  if (!device) {
    return;
  }

  const license = findActiveLicense(data, device.id);
  const sources = sourcesForDevice(data, device.id);
  const licensePlan = license ? planById(license.planId) : null;

  ui.profileIntro.textContent = `${device.id} cihazi icin profil acik.`;
  ui.profileStatus.innerHTML = `
    <div class="status-row ${license ? "status-ok" : "status-warn"}">
      <strong>${license ? `${licensePlan.name} lisans aktif` : "Lisans gerekli"}</strong>
      <span>${license ? `${formatDate(license.expiresAt)} tarihine kadar aktif.` : "Uygulamayi 7 gun test ettikten sonra memnunsan lisans satin al."}</span>
    </div>
    <div class="status-row ${sources.length ? "status-ok" : "status-warn"}">
      <strong>${sources.length} IPTV kaynagi</strong>
      <span>${sources.length ? "Son kaynak uygulamaya gonderildi." : "Kaynak eklenince cihaz uygulamasi senkronize olur."}</span>
    </div>
    <div class="status-row ${device.status === "suspended" ? "status-danger" : "status-ok"}">
      <strong>Cihaz durumu: ${device.status === "suspended" ? "Askida" : "Kullanilabilir"}</strong>
      <span>Platform: ${device.platform} · Son gorulme: ${formatDate(device.lastSeenAt)}</span>
    </div>
  `;

  ui.purchaseSurface.hidden = Boolean(license);
  ui.deviceTableBody.innerHTML = `
    <tr>
      <td><strong>${device.id}</strong></td>
      <td>${device.platform}</td>
      <td>${license ? statusBadge("active") : statusBadge("pending")}</td>
      <td>${license ? formatDate(license.expiresAt) : "-"}</td>
      <td>${formatDate(device.lastSyncAt)}</td>
    </tr>
  `;
}

function render() {
  const data = readData();
  renderSession(data);
  renderDownload();
  renderProfile(data);
}

function loginDevice(event) {
  event.preventDefault();
  const data = readData();
  const deviceId = ui.deviceIdInput.value.trim().toUpperCase();
  const deviceKey = ui.deviceKeyInput.value.trim().toUpperCase();

  if (!deviceId || !deviceKey) {
    toast("Cihaz kimligi ve anahtar kodu gerekli.");
    return;
  }

  let device = findDevice(data, deviceId);
  if (device && device.keyHash !== simpleHash(deviceKey)) {
    toast("Anahtar kodu bu cihazla eslesmedi.");
    return;
  }

  if (!device) {
    device = {
      id: deviceId,
      keyHash: simpleHash(deviceKey),
      platform: "Bilinmeyen TV",
      model: "Uygulamadan gelen cihaz",
      status: "pending",
      createdAt: nowIso(),
      lastSeenAt: nowIso(),
      lastSyncAt: null,
    };
    data.devices.unshift(device);
    audit(data, "device", `${deviceId} on kayit olarak eklendi`);
  }

  device.lastSeenAt = nowIso();
  data.currentDeviceId = device.id;
  writeData(data);
  setLoading(true);
  window.setTimeout(() => {
    toast(`${device.id} profili acildi.`);
    render();
    setLoading(false);
  }, 420);
}

function activateCurrentDevice(event) {
  event.preventDefault();
  const data = readData();
  const device = data.currentDeviceId ? findDevice(data, data.currentDeviceId) : null;

  if (!device) {
    toast("Once cihazla giris yapmalisin.");
    return;
  }

  if (!ui.legalAcceptInput.checked) {
    toast("Yasal bilgilendirmeyi okuyup kabul etmelisin.");
    return;
  }

  if (device.status === "suspended") {
    toast("Bu cihaz askida. Admin panelinden acilmasi gerekiyor.");
    return;
  }

  const plan = planById(ui.planSelect.value);
  const resellerCode = ui.resellerCodeInput.value.trim().toUpperCase();
  const reseller = resellerCode ? data.resellers.find((item) => item.code === resellerCode && item.status === "active") : null;

  if (resellerCode && !reseller) {
    toast("Reseller kodu bulunamadi veya pasif.");
    return;
  }

  const license = {
    id: uid("LIC"),
    deviceId: device.id,
    planId: plan.id,
    source: reseller ? "reseller-code" : "direct",
    status: "active",
    resellerId: reseller?.id || null,
    createdAt: nowIso(),
    activatedAt: nowIso(),
    expiresAt: addDays(plan.durationDays),
  };

  data.licenses.unshift(license);
  device.status = "active";
  device.lastSyncAt = nowIso();

  if (reseller) {
    reseller.sales += 1;
  }

  audit(data, "customer", `${device.id} icin ${plan.name} lisans aktiflestirildi`);
  writeData(data);
  setLoading(true);
  window.setTimeout(() => {
    toast("Lisans olusturuldu ve cihaz aktiflestirildi.");
    ui.purchaseForm.reset();
    render();
    setLoading(false);
  }, 420);
}

function sendIptvSource(event) {
  event.preventDefault();
  const data = readData();
  const device = data.currentDeviceId ? findDevice(data, data.currentDeviceId) : null;

  if (!device) {
    toast("IPTV bilgisi gondermek icin once cihazla giris yap.");
    return;
  }

  const license = findActiveLicense(data, device.id);
  if (!license) {
    toast("Kaynak gonderimi icin aktif lisans gerekli.");
    return;
  }

  const source = {
    id: uid("SRC"),
    deviceId: device.id,
    name: ui.sourceNameInput.value.trim(),
    url: ui.sourceUrlInput.value.trim(),
    username: ui.sourceUserInput.value.trim(),
    passwordVault: safeEncode(ui.sourcePassInput.value),
    status: "synced",
    createdAt: nowIso(),
    syncedAt: nowIso(),
  };

  data.iptvSources.unshift(source);
  device.lastSyncAt = nowIso();
  audit(data, "customer", `${device.id} cihazina IPTV kaynagi gonderildi`);
  writeData(data);
  ui.iptvForm.reset();
  toast("IPTV hesap bilgisi uygulamaya gonderildi.");
  render();
}

function syncCurrentDevice() {
  const data = readData();
  const device = data.currentDeviceId ? findDevice(data, data.currentDeviceId) : null;
  if (!device) {
    toast("Senkron icin once cihazla giris yap.");
    return;
  }

  device.lastSyncAt = nowIso();
  audit(data, "customer", `${device.id} manuel senkron yapti`);
  writeData(data);
  toast("Cihaz senkronize edildi.");
  render();
}

function resetDemo() {
  writeData(createSeedData());
  ui.deviceLoginForm.reset();
  toast("Demo verisi sifirlandi.");
  render();
}

function bindEvents() {
  routeButtons.forEach((button) => {
    button.addEventListener("click", () => showRoute(button.dataset.route));
  });

  document.querySelectorAll("[data-scroll-target]").forEach((button) => {
    button.addEventListener("click", () => {
      showRoute("home");
      window.setTimeout(() => {
        document.querySelector(`#${button.dataset.scrollTarget}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 620);
    });
  });

  document.querySelectorAll("[data-download-platform]").forEach((button) => {
    button.addEventListener("click", () => {
      appState.downloadPlatform = button.dataset.downloadPlatform;
      renderDownload();
    });
  });

  document.querySelectorAll("[data-download-kind]").forEach((button) => {
    button.addEventListener("click", () => {
      appState.downloadKind = button.dataset.downloadKind;
      renderDownload();
    });
  });

  ui.pricingGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-plan]");
    if (!button) return;
    ui.planSelect.value = button.dataset.plan;
    showRoute("profile");
  });

  window.addEventListener("hashchange", () => {
    const route = window.location.hash.replace("#", "") || "home";
    if (route === appState.route) return;
    showRoute(route, false);
  });

  ui.deviceLoginForm.addEventListener("submit", loginDevice);
  ui.purchaseForm.addEventListener("submit", activateCurrentDevice);
  ui.iptvForm.addEventListener("submit", sendIptvSource);
  ui.syncDeviceBtn.addEventListener("click", syncCurrentDevice);
  ui.resetDemoBtn.addEventListener("click", resetDemo);

  ui.fillDemoDevice.addEventListener("click", () => {
    ui.deviceIdInput.value = "NXTV-8F42-A9C1";
    ui.deviceKeyInput.value = "4219-77AB";
  });
}

fillPlanSelect();
renderPricing();
bindEvents();
showRoute(window.location.hash.replace("#", "") || "home", false);
