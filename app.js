// ===== Theme Toggle =====
(function(){
  const t = document.querySelector('[data-theme-toggle]');
  const r = document.documentElement;
  let d = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  r.setAttribute('data-theme', d);
  if(t) {
    updateThemeIcon();
    t.addEventListener('click', () => {
      d = d === 'dark' ? 'light' : 'dark';
      r.setAttribute('data-theme', d);
      updateThemeIcon();
    });
  }
  function updateThemeIcon() {
    if(!t) return;
    t.setAttribute('aria-label', 'Switch to '+(d==='dark'?'light':'dark')+' mode');
    t.innerHTML = d === 'dark'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
})();

// ===== Data =====
const LOCATIONS = {
  manisa:    { lat: 38.6191, lng: 27.4289, name: "Manisa" },
  izmir:     { lat: 38.4237, lng: 27.1428, name: "İzmir Adnan Menderes Havalimanı" },
  istanbul:  { lat: 41.2753, lng: 28.7519, name: "İstanbul Sabiha Gökçen Havalimanı" },
  istanbulHbf: { lat: 41.0082, lng: 28.9784, name: "İstanbul Otogar" },
  koln:      { lat: 50.9375, lng: 6.9603, name: "Köln" },
  kolnDom:   { lat: 50.9413, lng: 6.9583, name: "Köln Katedrali (Dom)" },
  kolnAirport: { lat: 50.8659, lng: 7.1427, name: "Köln/Bonn Havalimanı" },
  hohenzollern: { lat: 50.9414, lng: 6.9663, name: "Hohenzollern Köprüsü" },
  chocoMuseum: { lat: 50.9322, lng: 6.9644, name: "Çikolata Müzesi" },
  altstadt:  { lat: 50.9387, lng: 6.9599, name: "Altstadt (Eski Şehir)" },
  schildergasse: { lat: 50.9358, lng: 6.9495, name: "Schildergasse Alışveriş Caddesi" },
  ehrenstrasse: { lat: 50.9388, lng: 6.9398, name: "Ehrenstraße Alışveriş" },
  neumarkt:  { lat: 50.9351, lng: 6.9485, name: "Neumarkt Galerie AVM" },
  hoheStrasse: { lat: 50.9380, lng: 6.9560, name: "Hohe Straße Alışveriş" },
  ludwig:    { lat: 50.9404, lng: 6.9629, name: "Museum Ludwig" },
  romMuseum: { lat: 50.9404, lng: 6.9580, name: "Roma-Germen Müzesi" },
  kolnTriangle: { lat: 50.9412, lng: 6.9727, name: "KölnTriangle Panorama" },
  rheinauhafen: { lat: 50.9282, lng: 6.9640, name: "Rheinauhafen Liman Bölgesi" },
  belgisches: { lat: 50.9418, lng: 6.9337, name: "Belçika Mahallesi" },
  farina:    { lat: 50.9376, lng: 6.9533, name: "Farina Kolonya Müzesi" },
  sofia:     { lat: 42.6977, lng: 23.3219, name: "Sofya (Aktarma)" },
  belgrad:   { lat: 44.7866, lng: 20.4489, name: "Belgrad (Aktarma)" },
  budapes:   { lat: 47.4979, lng: 19.0402, name: "Budapeşte (Aktarma)" },
  viyana:    { lat: 48.2082, lng: 16.3738, name: "Viyana (Aktarma)" },
  munchen:   { lat: 48.1351, lng: 11.5820, name: "Münih (Aktarma)" },
  ankara:    { lat: 39.9334, lng: 32.8597, name: "Ankara" },
  dusseldorf:{ lat: 51.2277, lng: 6.7735, name: "Düsseldorf" },
};

const BUDGETS = {
  low: {
    level: "low",
    label: "Düşük Bütçe",
    icon: "🪙",
    range: "~₺12.000 - ₺18.000",
    transport: {
      title: "Ulaşım (Gidiş)",
      icon: "✈️",
      type: "transport",
      subtitle: "Ekonomik uçuş — AJet / Pegasus",
      details: [
        { label: "Araç", value: "İzmir → Köln aktarmalı uçuş (AJet veya Pegasus)" },
        { label: "Süre", value: "~5-7 saat (1 aktarma, İstanbul üzeri)" },
        { label: "Kalkış", value: "Manisa → İzmir Havalimanı (otobüs ~45 dk, ~₺150)" },
        { label: "Not", value: "Çarşamba/Perşembe kalkışları en ucuz. 2-3 hafta önceden alın." },
      ],
      price: "₺2.500 - ₺4.500",
      priceNum: 3500,
      route: ["manisa", "izmir", "istanbul", "kolnAirport", "koln"],
      routeColor: "#e74c3c",
    },
    accommodation: {
      title: "Konaklama (3 Gece)",
      icon: "🏠",
      type: "accommodation",
      subtitle: "Hostel / Bütçe dostu pansiyon",
      details: [
        { label: "Yer", value: "Hostel Köln, Station Hostel, a&o Köln Dom" },
        { label: "Fiyat", value: "Gecelik ~€12-25 (₺450-900 arası)" },
        { label: "Konum", value: "Neumarkt veya Altstadt bölgesi" },
        { label: "Dahil", value: "Ücretsiz kahvaltı, WiFi, ortak mutfak" },
      ],
      price: "₺1.500 - ₺2.700",
      priceNum: 2100,
    },
    sightseeing: {
      title: "Gezilecek Yerler",
      icon: "🏛️",
      type: "sightseeing",
      subtitle: "Ücretsiz & düşük maliyetli rotalar",
      details: [
        { label: "Ücretsiz", value: "Köln Katedrali, Hohenzollern Köprüsü, Altstadt yürüyüşü, Ren Nehri kıyısı" },
        { label: "Ücretsiz", value: "Fischmarkt Meydanı, Heumarkt, Alter Markt, St. Martin Kilisesi" },
        { label: "Düşük", value: "KölnTriangle Panorama (~€5), Roma-Germen Müzesi (~€9)" },
        { label: "Yemek", value: "Döner/street food ~€5-8 per öğün" },
      ],
      price: "₺1.200 - ₺2.500",
      priceNum: 1800,
    },
    shopping: {
      title: "Alışveriş",
      icon: "🛍️",
      type: "shopping",
      subtitle: "Hediyelik eşya & sınırlı alışveriş",
      details: [
        { label: "Cadde", value: "Hohe Straße — ücretsiz gezinme, hediyelik eşya" },
        { label: "Pazar", value: "Bit pazarları (Flohmarkt) — uygun fiyatlı buluntular" },
        { label: "Hediye", value: "4711 Kolonya, magnet, kartpostal (~€10-20)" },
        { label: "Bütçe", value: "Sınırlı alışveriş, hediyelik odaklı" },
      ],
      price: "₺500 - ₺1.500",
      priceNum: 1000,
    },
    returnTrip: {
      title: "Dönüş Yolu",
      icon: "🔄",
      type: "return-trip",
      subtitle: "Ekonomik uçuş — aynı rota",
      details: [
        { label: "Araç", value: "Köln → İzmir aktarmalı uçuş (AJet veya Pegasus)" },
        { label: "Süre", value: "~5-7 saat (1 aktarma, İstanbul üzeri)" },
        { label: "Varış", value: "İzmir Havalimanı → Manisa (otobüs ~45 dk)" },
        { label: "İpucu", value: "Gidiş-dönüş alarak %15-20 tasarruf edin." },
      ],
      price: "₺2.500 - ₺4.500",
      priceNum: 3500,
      route: ["koln", "kolnAirport", "istanbul", "izmir", "manisa"],
      routeColor: "#2ecc71",
    },
  },
  mid: {
    level: "mid",
    label: "Orta Bütçe",
    icon: "💰",
    range: "~₺22.000 - ₺30.000",
    transport: {
      title: "Ulaşım (Gidiş)",
      icon: "✈️",
      type: "transport",
      subtitle: "Direkt veya 1 aktarmalı konforlu uçuş",
      details: [
        { label: "Araç", value: "İzmir → Köln direkt uçuş (SunExpress/Pegasus direkt)" },
        { label: "Süre", value: "~3-3.5 saat direkt uçuş" },
        { label: "Kalkış", value: "Manisa → İzmir Havalimanı (özel transfer ~₺400)" },
        { label: "Ekstra", value: "Bagaj 20kg dahil, koltuk seçimi" },
      ],
      price: "₺5.000 - ₺7.000",
      priceNum: 6000,
      route: ["manisa", "izmir", "kolnAirport", "koln"],
      routeColor: "#e74c3c",
    },
    accommodation: {
      title: "Konaklama (4 Gece)",
      icon: "🏨",
      type: "accommodation",
      subtitle: "3-4 yıldızlı şehir merkezi oteli",
      details: [
        { label: "Yer", value: "Premier Inn Köln City, Ibis Am Dom, Kommerzhotel" },
        { label: "Fiyat", value: "Gecelik ~€80-120 (₺3.000-4.500)" },
        { label: "Konum", value: "Katedral ve Hauptbahnhof'a yürüme mesafesi" },
        { label: "Dahil", value: "Kahvaltı, WiFi, klima, özel banyo" },
      ],
      price: "₺6.000 - ₺9.000",
      priceNum: 7500,
    },
    sightseeing: {
      title: "Gezilecek Yerler",
      icon: "🏛️",
      type: "sightseeing",
      subtitle: "Müzeler, turlar ve gastronomi",
      details: [
        { label: "Müze", value: "Çikolata Müzesi (~€14.50), Ludwig Müzesi (~€13), Farina (~€5)" },
        { label: "Tur", value: "Katedrale çıkış (~€6), Ren Nehri tekne turu (~€12)" },
        { label: "Kültür", value: "Belçika Mahallesi kafeler, Rheinauhafen yürüyüşü" },
        { label: "Yemek", value: "Kölsch bira & restoran deneyimi ~€15-25 per öğün" },
      ],
      price: "₺3.000 - ₺5.000",
      priceNum: 4000,
    },
    shopping: {
      title: "Alışveriş",
      icon: "🛍️",
      type: "shopping",
      subtitle: "Alışveriş caddeleri & AVM",
      details: [
        { label: "Cadde", value: "Schildergasse — Avrupa'nın en işlek alışveriş caddesi" },
        { label: "AVM", value: "Neumarkt Galerie, Opern Passagen" },
        { label: "Özel", value: "Ehrenstraße — butik mağazalar, genç moda" },
        { label: "Bütçe", value: "Giyim, aksesuar, hediyelik (~€100-200)" },
      ],
      price: "₺2.000 - ₺4.000",
      priceNum: 3000,
    },
    returnTrip: {
      title: "Dönüş Yolu",
      icon: "🔄",
      type: "return-trip",
      subtitle: "Direkt uçuş ile konforlu dönüş",
      details: [
        { label: "Araç", value: "Köln → İzmir direkt uçuş (SunExpress/Pegasus)" },
        { label: "Süre", value: "~3.5 saat direkt" },
        { label: "Varış", value: "İzmir Havalimanı → Manisa (özel transfer ~₺400)" },
        { label: "İpucu", value: "Hafta içi dönüş uçuşları daha uygun." },
      ],
      price: "₺5.000 - ₺7.000",
      priceNum: 6000,
      route: ["koln", "kolnAirport", "izmir", "manisa"],
      routeColor: "#2ecc71",
    },
  },
  high: {
    level: "high",
    label: "Yüksek Bütçe",
    icon: "💎",
    range: "~₺45.000 - ₺65.000",
    transport: {
      title: "Ulaşım (Gidiş)",
      icon: "✈️",
      type: "transport",
      subtitle: "THY Business / Premium uçuş",
      details: [
        { label: "Araç", value: "İzmir → Köln THY Business Class (İstanbul aktarma, CIP lounge)" },
        { label: "Süre", value: "~5 saat (kısa aktarma, lounge erişimi)" },
        { label: "Kalkış", value: "Manisa → İzmir (VIP transfer ~₺800)" },
        { label: "Ekstra", value: "Lounge, öncelikli biniş, geniş koltuk, premium yemek" },
      ],
      price: "₺10.000 - ₺15.000",
      priceNum: 12500,
      route: ["manisa", "izmir", "istanbul", "kolnAirport", "koln"],
      routeColor: "#e74c3c",
    },
    accommodation: {
      title: "Konaklama (5 Gece)",
      icon: "🏰",
      type: "accommodation",
      subtitle: "5 yıldızlı lüks otel",
      details: [
        { label: "Yer", value: "Excelsior Hotel Ernst, Hilton Cologne, Hyatt Regency" },
        { label: "Fiyat", value: "Gecelik ~€250-450 (₺9.500-17.000)" },
        { label: "Konum", value: "Katedrale karşı, Ren Nehri manzaralı" },
        { label: "Dahil", value: "Spa, fine dining restoran, concierge, oda servisi" },
      ],
      price: "₺15.000 - ₺25.000",
      priceNum: 20000,
    },
    sightseeing: {
      title: "Gezilecek Yerler",
      icon: "🏛️",
      type: "sightseeing",
      subtitle: "VIP turlar, özel deneyimler",
      details: [
        { label: "VIP", value: "Özel rehberli Katedral turu, Wallraf-Richartz Müzesi" },
        { label: "Premium", value: "Ren Nehri özel yat turu, Çikolata Müzesi VIP" },
        { label: "Gezi", value: "Günübirlik Düsseldorf / Bonn gezisi (1. sınıf tren)" },
        { label: "Yemek", value: "Michelin restoranlarda fine dining ~€50-100 per öğün" },
      ],
      price: "₺5.000 - ₺10.000",
      priceNum: 7500,
    },
    shopping: {
      title: "Alışveriş",
      icon: "🛍️",
      type: "shopping",
      subtitle: "Lüks markalar & tasarım butikler",
      details: [
        { label: "Lüks", value: "Mittelstraße — Louis Vuitton, Gucci, Prada" },
        { label: "Tasarım", value: "Belgisches Viertel — yerel tasarımcı butikler" },
        { label: "Hediyelik", value: "Farina Haus — orijinal Eau de Cologne" },
        { label: "Bütçe", value: "Premium alışveriş (~€500-1000)" },
      ],
      price: "₺5.000 - ₺10.000",
      priceNum: 7500,
    },
    returnTrip: {
      title: "Dönüş Yolu",
      icon: "🔄",
      type: "return-trip",
      subtitle: "Alternatif rota: Tren ile Avrupa turu + uçuş",
      details: [
        { label: "Rota", value: "Köln → Münih (ICE tren, 4.5 saat, 1. sınıf)" },
        { label: "Aktarma", value: "Münih → İstanbul (THY Business, 2.5 saat)" },
        { label: "Varış", value: "İstanbul → İzmir (iç hat) → Manisa" },
        { label: "Bonus", value: "Münih'te 1 gece ekstra konaklama imkanı" },
      ],
      price: "₺10.000 - ₺15.000",
      priceNum: 12500,
      route: ["koln", "munchen", "istanbul", "izmir", "manisa"],
      routeColor: "#2ecc71",
    },
  }
};

const BUDGET_KEYS = ["low", "mid", "high"];

// ===== Map Setup =====
const map = L.map('map', {
  scrollWheelZoom: true,
  zoomControl: true,
}).setView([44.5, 20], 5);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> &copy; <a href="https://carto.com/" target="_blank" rel="noopener noreferrer">CARTO</a>',
  maxZoom: 18,
}).addTo(map);

let routeLayers = [];
let markerLayers = [];

function createIcon(emoji, color) {
  return L.divIcon({
    html: `<div style="
      background:${color};
      width:36px;height:36px;border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      font-size:18px;border:3px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,0.25);
    ">${emoji}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
    className: ''
  });
}

function clearMap() {
  routeLayers.forEach(l => map.removeLayer(l));
  markerLayers.forEach(l => map.removeLayer(l));
  routeLayers = [];
  markerLayers = [];
}

function drawRoute(locationKeys, color, dashArray) {
  const coords = locationKeys.map(k => [LOCATIONS[k].lat, LOCATIONS[k].lng]);
  // Create a curved path using intermediate points
  const curvedCoords = [];
  for (let i = 0; i < coords.length - 1; i++) {
    const start = coords[i];
    const end = coords[i+1];
    const steps = 30;
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const lat = start[0] + (end[0] - start[0]) * t;
      const lng = start[1] + (end[1] - start[1]) * t;
      // Add slight curve
      const offset = Math.sin(t * Math.PI) * (Math.abs(end[1] - start[1]) * 0.08);
      curvedCoords.push([lat + offset, lng]);
    }
  }
  
  const line = L.polyline(curvedCoords, {
    color: color,
    weight: 4,
    opacity: 0.8,
    dashArray: dashArray || null,
    smoothFactor: 1,
  }).addTo(map);
  routeLayers.push(line);
}

function addMarker(key, emoji, color, popupHtml) {
  const loc = LOCATIONS[key];
  if (!loc) return;
  const marker = L.marker([loc.lat, loc.lng], {
    icon: createIcon(emoji, color)
  }).addTo(map);
  
  if (popupHtml) {
    marker.bindPopup(popupHtml, { maxWidth: 260 });
  }
  markerLayers.push(marker);
}

function updateMap(budgetKey) {
  clearMap();
  const b = BUDGETS[budgetKey];

  // Start & End markers
  addMarker("manisa", "🏠", "#2c3e50",
    `<div class="popup-title">Manisa</div><div class="popup-desc">Başlangıç Noktası</div>`
  );
  addMarker("kolnDom", "⛪", "#c0392b",
    `<div class="popup-title">Köln Katedrali</div><div class="popup-desc">Hedef — UNESCO Dünya Mirası<br>Gotik mimari başyapıtı, 157m yükseklik</div>`
  );

  // Transport route (gidiş)
  if (b.transport.route) {
    drawRoute(b.transport.route, b.transport.routeColor);
    // Add transit markers
    b.transport.route.forEach((key, i) => {
      if (key !== "manisa" && key !== "koln" && key !== "kolnDom") {
        addMarker(key, "✈️", "#e74c3c",
          `<div class="popup-title">${LOCATIONS[key].name}</div><div class="popup-desc">Gidiş aktarma/kalkış noktası</div>`
        );
      }
    });
  }

  // Return route
  if (b.returnTrip.route) {
    drawRoute(b.returnTrip.route, b.returnTrip.routeColor, "10 8");
    b.returnTrip.route.forEach((key, i) => {
      if (key !== "manisa" && key !== "koln" && key !== "kolnDom" && key !== "kolnAirport" && key !== "izmir" && key !== "istanbul") {
        const existing = markerLayers.find(m => {
          const ll = m.getLatLng();
          return Math.abs(ll.lat - LOCATIONS[key].lat) < 0.01;
        });
        if (!existing) {
          addMarker(key, "🚆", "#2ecc71",
            `<div class="popup-title">${LOCATIONS[key].name}</div><div class="popup-desc">Dönüş rotası aktarma noktası</div>`
          );
        }
      }
    });
  }

  // Sightseeing markers
  const sightseeingPlaces = ["hohenzollern", "chocoMuseum", "altstadt", "ludwig", "romMuseum", "kolnTriangle", "rheinauhafen", "belgisches", "farina"];
  sightseeingPlaces.forEach(key => {
    if (LOCATIONS[key]) {
      addMarker(key, "🏛️", "#f39c12",
        `<div class="popup-title">${LOCATIONS[key].name}</div><div class="popup-desc">Gezilecek yer</div>`
      );
    }
  });

  // Shopping markers
  const shoppingPlaces = ["schildergasse", "ehrenstrasse", "neumarkt", "hoheStrasse"];
  shoppingPlaces.forEach(key => {
    if (LOCATIONS[key]) {
      addMarker(key, "🛍️", "#9b59b6",
        `<div class="popup-title">${LOCATIONS[key].name}</div><div class="popup-desc">Alışveriş noktası</div>`
      );
    }
  });

  // Accommodation marker
  const accommNames = {
    low: "Hostel Köln / a&o Köln Dom",
    mid: "Premier Inn / Ibis Am Dom",
    high: "Excelsior Hotel Ernst / Hilton"
  };
  addMarker("koln", "🏨", "#3498db",
    `<div class="popup-title">${accommNames[budgetKey]}</div><div class="popup-desc">Konaklama</div><div class="popup-price">${b.accommodation.price}</div>`
  );

  // Fit bounds
  const allCoords = [];
  if (b.transport.route) b.transport.route.forEach(k => allCoords.push([LOCATIONS[k].lat, LOCATIONS[k].lng]));
  if (b.returnTrip.route) b.returnTrip.route.forEach(k => { if(LOCATIONS[k]) allCoords.push([LOCATIONS[k].lat, LOCATIONS[k].lng]); });
  if (allCoords.length > 1) {
    map.fitBounds(allCoords, { padding: [50, 50], maxZoom: 6 });
  }
}

// ===== Cards =====
function renderCards(budgetKey) {
  const b = BUDGETS[budgetKey];
  const grid = document.getElementById('cardsGrid');
  const categories = ['transport', 'accommodation', 'sightseeing', 'shopping', 'returnTrip'];
  
  grid.innerHTML = categories.map((cat, i) => {
    const d = b[cat];
    return `
      <div class="detail-card" style="animation-delay:${i * 0.08}s">
        <div class="card-header">
          <div class="card-icon ${d.type}">${d.icon}</div>
          <div>
            <div class="card-title">${d.title}</div>
            <div class="card-subtitle">${d.subtitle}</div>
          </div>
        </div>
        <div class="card-body">
          ${d.details.map(row => `
            <div class="card-row">
              <span class="row-label">${row.label}</span>
              <span class="row-value">${row.value}</span>
            </div>
          `).join('')}
        </div>
        <div class="card-price">
          <span class="price-label">Tahmini Maliyet</span>
          <span class="price-value">${d.price}</span>
        </div>
      </div>
    `;
  }).join('');
}

// ===== Summary =====
function renderSummary(budgetKey) {
  const b = BUDGETS[budgetKey];
  const items = [
    { icon: "✈️", label: "Gidiş Ulaşım", amount: b.transport.priceNum },
    { icon: "🏨", label: "Konaklama", amount: b.accommodation.priceNum },
    { icon: "🏛️", label: "Gezilecek Yerler & Yemek", amount: b.sightseeing.priceNum },
    { icon: "🛍️", label: "Alışveriş", amount: b.shopping.priceNum },
    { icon: "🔄", label: "Dönüş Ulaşım", amount: b.returnTrip.priceNum },
  ];
  const total = items.reduce((sum, item) => sum + item.amount, 0);

  const grid = document.getElementById('summaryGrid');
  grid.innerHTML = items.map(item => `
    <div class="summary-row">
      <div class="summary-category">
        <span class="summary-icon">${item.icon}</span>
        <span>${item.label}</span>
      </div>
      <span class="summary-amount">₺${item.amount.toLocaleString('tr-TR')}</span>
    </div>
  `).join('') + `
    <div class="summary-row total">
      <div class="summary-category">
        <span class="summary-icon">💰</span>
        <span>Toplam Tahmini Bütçe</span>
      </div>
      <span class="summary-amount">~₺${total.toLocaleString('tr-TR')}</span>
    </div>
  `;
}

// ===== Budget Slider Logic =====
const slider = document.getElementById('budgetSlider');
const budgetBadge = document.getElementById('budgetBadge');
const budgetText = document.getElementById('budgetText');
const budgetAmount = document.getElementById('budgetAmount');
const labels = document.querySelectorAll('.budget-label');

function updateBudget(value) {
  const key = BUDGET_KEYS[value];
  const b = BUDGETS[key];

  // Update badge
  budgetText.textContent = b.label;
  budgetAmount.textContent = b.range;
  budgetBadge.className = 'budget-badge ' + key;

  // Update active label
  labels.forEach(l => l.classList.remove('active'));
  labels.forEach(l => {
    if (l.dataset.level === key) l.classList.add('active');
  });

  // Update slider thumb color
  const colors = { low: '#27ae60', mid: '#f39c12', high: '#e74c3c' };
  slider.style.setProperty('--thumb-color', colors[key]);
  document.documentElement.style.setProperty('--color-primary', 
    key === 'low' ? (document.documentElement.getAttribute('data-theme') === 'dark' ? '#4caf50' : '#1a6b3c') :
    key === 'mid' ? '#f39c12' :
    '#e74c3c'
  );

  // Update map, cards, summary
  updateMap(key);
  renderCards(key);
  renderSummary(key);
}

slider.addEventListener('input', (e) => {
  updateBudget(parseInt(e.target.value));
});

// Label clicks
labels.forEach((label, i) => {
  label.addEventListener('click', () => {
    const levelMap = { low: 0, mid: 1, high: 2 };
    const val = levelMap[label.dataset.level];
    slider.value = val;
    updateBudget(val);
  });
});

// Smooth nav
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// ===== Init =====
updateBudget(1);
