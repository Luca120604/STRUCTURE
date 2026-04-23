// Kompass Datenmodell — direkt aus profil-und-karriere-kompass.md
// Jedes Modul: { id, title, description, group, tags, related, webUrl?, appScheme?, stars?, meta? }

window.KOMPASS_DATA = {
  profile: {
    title: "Systemischer Generalist",
    subtitle: "Strukturelles Denken + Abduktion",
    stand: "Stand April 2026",
    kern: [
      { title: "Meta-Lerner", text: "Weiß wie man sich alles aneignet. 50% Tiefe × viele Domänen = Hebel an Schnittstellen." },
      { title: "Kognitive Empathie", text: "Hohe kognitive Empathie, niedrige emotionale Reaktivität. Präzise lesen, ungetriggert bleiben." },
      { title: "Bewusste Antizipation", text: "Denke jede Handlung vor. Selten reaktiv." },
      { title: "Symmetrisches Auge", text: "Erkenne Richtigkeit in Bildern, Menschen, Märkten durch Proportion und Logik." },
      { title: "Werte-Kern", text: "Ehrlichkeit + Loyalität. Klein, aber hart. Nicht verhandelbar." }
    ],
    motor: "Ich lese das Grundgerüst hinter Systemen, Menschen, Märkten und leite daraus Dinge ab, die ich nie gelernt habe. Struktur als Universal-Schlüssel.",
    nichtBin: [
      "Kein Spezialist mit Expertentum in einer einzigen Disziplin",
      "Kein Auswendig-Lerner — klassisches Schulformat passt nicht",
      "Kein Hobby-Zapper ohne Substanz — nutze Breite strategisch",
      "Kein Ideologe — Werte-Kern ist klein, aber hart",
      "Kein Filialbanker-Typus — Struktur + ROI-Denken passt nicht zu Sachbearbeitung"
    ],
    bindungsQuote: "Ist das Illoyalität oder ist das Angst?",
    bindungsContext: "Prüffrage im Bindungs-Modus, bevor Werte-Logik zu früh cuttet.",
    lernkanaele: [
      "Kausalketten + Mechanik → sofort absorbiert",
      "Definitionen ohne Kontext → unbrauchbar",
      "Mentoren > Kurse. Podcasts > Lehrbücher. Machen > Auswendiglernen."
    ],
    menschen: [
      { kontext: "Menschen allgemein", system: "Neutral, ohne Urteil", modus: "Beobachter" },
      { kontext: "Werteverletzung", system: "Delete ohne Drama", modus: "ROI-basiert" },
      { kontext: "Innerer Kreis", system: "Geschützt, Puffer", modus: "Loyalitäts-Modus" },
      { kontext: "Romantisch", system: "Schwachstelle im System", modus: "Bindungs-Modus" }
    ],
    nordsterne: [
      "Unternehmerische Unabhängigkeit vor Angestellten-Sicherheit",
      "Hebel statt Stundenlohn — skalierbare Modelle bevorzugen",
      "System > Motivation — saubere Struktur schlägt emotionale Spitzen",
      "Loyalität zum inneren Kreis, Effizienz gegenüber allen anderen",
      "Ehrlichkeit ohne Verletzung als Standard-Modus",
      "Eigenständigkeit im Denken — Trends lesen, aber nicht jagen"
    ],
    baustellen: [
      { title: "Offener Loop", text: "Romantische Verbindung — Delete damals nicht sauber. Entscheidung offen: Kontakt / inneres Schließen / Akzeptanz." },
      { title: "Bindungs- vs. Werte-Modus", text: "Bei nächster Verbindung zuerst prüfen: Illoyalität oder Angst? Nur bei Illoyalität → Delete." },
      { title: "Berufsschul-Noten", text: "Kein Fähigkeitsproblem, Kanal-Mismatch. Minimalaufwand für 2,5er-Schnitt reicht." },
      { title: "Breite ohne Fokus", text: "Vor jedem neuen Projekt prüfen: zahlt es auf MCH oder PM ein? Wenn nein → ablehnen." }
    ],
    review: [
      { cadence: "Wöchentlich", time: "15 Min", task: "Checkliste durchgehen, Fortschritt notieren" },
      { cadence: "Monatlich", time: "45 Min", task: "Prioritäten checken, Anpassungen" },
      { cadence: "Quartalsweise", time: "2 Std", task: "Strategische Ausrichtung, neue Baustellen" },
      { cadence: "Halbjährlich", time: "4 Std", task: "Komplette Überarbeitung des Dokuments" }
    ]
  },

  karrierepfade: [
    { id: "pm", title: "Produktmanagement", stars: 5, gehalt: "45–160k", desc: "Schnittstelle Kunde × Business × Tech × Design. Volle Profil-Passung.", tags: ["Schnittstelle","Strategie","Tech"], related: ["mch","bizdev","growth"] },
    { id: "bizdev", title: "Business Development / Strategy", stars: 5, gehalt: "55–95k", desc: "Systeme analysieren, Hebel finden, Deals aufsetzen. Mittelstand oder Tech.", tags: ["Strategie","Deals"], related: ["pm","consulting"] },
    { id: "growth", title: "Growth / Performance Marketing", stars: 4, gehalt: "55–100k", desc: "Struktur in Funnels, Daten lesen. System-Marketing, nicht Kreativ.", tags: ["Marketing","Daten"], related: ["pm","mch"] },
    { id: "ma", title: "M&A / Private Equity / Corp Finance", stars: 4, gehalt: "70–150k", desc: "Steileres Gehalt, härter ohne Studium. Banken-Background hilft.", tags: ["Finance","Deals"], related: ["bizdev"] },
    { id: "consulting", title: "Consulting — Mittelstands-Digitalisierung", stars: 5, gehalt: "60–120k", desc: "Riesiger Bedarf im DACH-Raum. Direkter Markt aus Bank-Erfahrung.", tags: ["DACH","KMU"], related: ["mch","bizdev"] },
    { id: "ux", title: "UX / Service Designer", stars: 4, gehalt: "50–90k", desc: "Symmetrisches Auge + Menschen-Verstehen. Schnittstellen-Rolle.", tags: ["Design","Research"], related: ["pm"] },
    { id: "founder", title: "Founder / Solopreneur", stars: 5, gehalt: "—", desc: "Content-Business, SaaS, Info-Produkte. Profil für Bootstrapping gebaut.", tags: ["Indie","SaaS"], related: ["mch"] },
    { id: "sales", title: "Technical / Enterprise Sales", stars: 3, gehalt: "60–150k OTE", desc: "Komplexe Produkte an Entscheider. Provisionsbasiert.", tags: ["Sales"], related: ["bizdev"] },
    { id: "agency", title: "Digital Agency Owner", stars: 5, gehalt: "—", desc: "MCH Media. Laufendes Hauptprojekt.", tags: ["MCH","Agentur"], related: ["mch","consulting"] }
  ],

  pmDetail: {
    was: "Der PM entscheidet was gebaut wird — nicht wie. Schnittstelle zwischen Kunden, Business, Tech und Design. Sagt zu 90% der Ideen Nein, damit die 10% richtig gebaut werden.",
    aufgaben: [
      { title: "Discovery", text: "Nutzer-Interviews, Markt lesen, Probleme verstehen" },
      { title: "Roadmap", text: "Prioritäten setzen, Quartalsziele" },
      { title: "Spec-Writing", text: "Klare Produkt-Briefs an Dev und Design" },
      { title: "Stakeholder-Mgmt", text: "C-Level, Vertrieb, Marketing auf Linie" },
      { title: "Metriken", text: "Impact messen, nachweisen ob geliefert wurde" }
    ],
    match: [
      "Meta-Leser → versteht Kundenbedürfnis-Systeme",
      "Kognitive Empathie → managed Stakeholder ohne persönlich zu werden",
      "Werte → essentiell bei Prioritätskonflikten",
      "ROI-Mindset → deckt 100% mit PM-Arbeit",
      "Delete-System → PMs töten Features, stoppen Projekte",
      "Breite > Tiefe → PM muss überall genug wissen, nirgends alles"
    ],
    pfadA: [
      "MCH Media als Produkt behandeln: Roadmap, Segmentierung, Retention",
      "PM-Dokumentation aufbauen (Cases, Journey, Feature-Matrix)",
      "Nach 1–2 Jahren mit Output: Junior/Assoc. PM bei Tech-Startup",
      "Vorteil: echter Track-Record, nicht nur Zertifikate"
    ],
    pfadB: [
      "Self-Education via Ressourcen",
      "Side-Projekt mit echten Metriken",
      "Direktbewerbung bei Tech-Startups",
      "Associate/Junior PM Programme"
    ],
    nichtPM: [
      "Nicht Projektmanager — macht Deadlines, nicht Strategie",
      "Nicht Business Analyst — analysiert, entscheidet aber nicht",
      "Nicht Scrum Master — moderiert Prozesse, kein Produkt-Mandat",
      "Nicht Product Owner (eng) — PO oft taktisch, PM strategisch"
    ],
    gehalt: [
      { level: "Junior / Assoc. PM", range: "45–65k" },
      { level: "Mid-Level PM", range: "65–90k" },
      { level: "Senior PM", range: "90–125k" },
      { level: "Principal / Staff PM", range: "120–160k" },
      { level: "Head of Product", range: "120–180k+" },
      { level: "VP Product", range: "150–250k+" }
    ]
  },

  apmProgramme: [
    { name: "Axel Springer", program: "ASAPP", url: "https://jobs.axelspringer.com/" },
    { name: "Zalando", program: "PM Career Path", url: "https://jobs.zalando.com/" },
    { name: "Delivery Hero", program: "Product Roles", url: "https://careersatdeliveryhero.com/" },
    { name: "HelloFresh", program: "Product Roles", url: "https://careers.hellofresh.com/" },
    { name: "N26", program: "Product Manager", url: "https://n26.com/en/careers" },
    { name: "Personio", program: "Associate PM", url: "https://www.personio.com/careers/" },
    { name: "Celonis", program: "PM Associate", url: "https://www.celonis.com/careers/" },
    { name: "SumUp", program: "PM Roles", url: "https://sumup.com/careers/" },
    { name: "Scout24", program: "PM Positions", url: "https://www.scout24.com/jobs" }
  ],

  jobBoards: [
    { name: "Lenny's Job Board", focus: "Product International", url: "https://jobs.lennysnewsletter.com/" },
    { name: "Mind the Product", focus: "Product Jobs", url: "https://www.mindtheproduct.com/jobs" },
    { name: "LinkedIn Jobs", focus: "Allgemein", url: "https://www.linkedin.com/jobs/" },
    { name: "StepStone", focus: "DE Allgemein", url: "https://www.stepstone.de/" },
    { name: "Get in IT", focus: "DE Tech", url: "https://www.get-in-it.de/" },
    { name: "Berlin Startup Jobs", focus: "Berlin Startups", url: "https://berlinstartupjobs.com/" },
    { name: "German Tech Jobs", focus: "DE Tech Remote", url: "https://germantechjobs.de/" },
    { name: "Kununu", focus: "Gehalt + Reviews", url: "https://www.kununu.com/" },
    { name: "eFinancialCareers", focus: "Finance DE", url: "https://www.efinancialcareers.de/" },
    { name: "Xing Jobs", focus: "DACH Mittelstand", url: "https://www.xing.com/jobs" }
  ],

  mch: {
    status: "Co-Founder. Digital Agency im Schwarzwald/Ortenau. Web Design, Branding, digitale Medien für regionale KMU. Brand: dark minimal.",
    farben: ["#0D0D0D","#174E17","#EEF3EE"],
    warum: [
      "Marktgelegenheit — regionaler Mittelstand unterdigitalisiert, Zahlungsbereitschaft vorhanden",
      "Eigener ROI-Kanal — keine Klausuren, direktes Kunden-Feedback",
      "Portfolio für spätere Optionen — PM-Rolle, Consulting, Scale-up",
      "Übungsfeld für jedes Skill-Upgrade: Marketing, Sales, Produkt, Führung"
    ],
    prioritaeten: [
      "Retainer-Modell statt Einzelprojekte → planbarer Umsatz",
      "Spezialisierung auf 1–2 Branchen (Hotels, Handwerk, Gastro)",
      "Portfolio mit messbarem Impact dokumentieren",
      "LinkedIn-Präsenz als Digitalisierungs-Stimme für die Region"
    ],
    ressourcen: [
      { title: "Built to Sell", autor: "John Warrillow", url: "https://www.amazon.de/dp/1591845823" },
      { title: "The E-Myth Revisited", autor: "Michael Gerber", url: "https://www.amazon.de/dp/0887307280" },
      { title: "Company of One", autor: "Paul Jarvis", url: "https://www.amazon.de/dp/1328972356" },
      { title: "Hourly Billing Is Nuts", autor: "Jonathan Stark", url: "https://hourlybillingisnuts.com/" },
      { title: "Agency Mavericks", autor: "Community", url: "https://agencymavericks.com/" }
    ]
  },

  kompassReihenfolge: [
    { step: 1, title: "Ausbildung sauber beenden", text: "Banking-Abschluss als Gatekeeper-Nachweis." },
    { step: 2, title: "MCH Media als Hauptbusiness ausbauen", text: "Retainer, Spezialisierung, Portfolio." },
    { step: 3, title: "PM-Skills parallel aufbauen", text: "Self-Learning + Anwendung auf MCH." },
    { step: 4, title: "Nach Ausbildung entscheiden", text: "MCH-Fulltime oder PM-Einstieg bei Tech-Firma." }
  ],

  plattformen: [
    { id: "linkedin", prio: 1, name: "LinkedIn", desc: "B2B in Deutschland, besonders Mittelstand. Content + Netzwerk.", url: "https://www.linkedin.com/", scheme: "linkedin://" },
    { id: "malt", prio: 2, name: "Malt", desc: "Europäischer Freelance-Markt. Tagessätze 400–1000€.", url: "https://www.malt.de/" },
    { id: "upwork", prio: 3, name: "Upwork", desc: "International, Consulting/Strategy. Ergänzend.", url: "https://www.upwork.com/" },
    { id: "xing", prio: 4, name: "Xing", desc: "Nur noch für deutschen Mittelstand. Lokale Akquise.", url: "https://www.xing.com/" }
  ],

  // Apps (Tool Stack). color = brand, initials = 1-3 Zeichen
  apps: [
    // AI / Research
    { cat: "AI", name: "Claude", initials: "C", color: "#CC785C", textColor: "#fff", url: "https://claude.ai/", scheme: "claude://", star: true },
    { cat: "AI", name: "ChatGPT", initials: "G", color: "#10A37F", textColor: "#fff", url: "https://chatgpt.com/", scheme: "chatgpt://" },
    { cat: "AI", name: "Gemini", initials: "✦", color: "linear-gradient(135deg,#4285F4,#9B72CB)", textColor: "#fff", url: "https://gemini.google.com/" },
    { cat: "AI", name: "Grok", initials: "𝕏", color: "#000", textColor: "#fff", url: "https://grok.com/" },
    { cat: "AI", name: "Perplexity", initials: "P", color: "#20808D", textColor: "#fff", url: "https://www.perplexity.ai/", scheme: "perplexity://" },
    { cat: "AI", name: "NotebookLM", initials: "NL", color: "#1A73E8", textColor: "#fff", url: "https://notebooklm.google.com/" },
    // Trading
    { cat: "Trading", name: "Capital", initials: "C", color: "#0B1533", textColor: "#fff", url: "https://capital.com/" },
    { cat: "Trading", name: "TradingView", initials: "TV", color: "#131722", textColor: "#fff", url: "https://www.tradingview.com/", scheme: "tradingview://" },
    // SEO / Analytics
    { cat: "SEO", name: "Ahrefs", initials: "A", color: "#1D65F0", textColor: "#fff", url: "https://ahrefs.com/", star: true },
    { cat: "SEO", name: "Search Console", initials: "SC", color: "#4285F4", textColor: "#fff", url: "https://search.google.com/search-console" },
    { cat: "SEO", name: "PageSpeed", initials: "PS", color: "#34A853", textColor: "#fff", url: "https://pagespeed.web.dev/" },
    // Creative / Design
    { cat: "Creative", name: "Canva", initials: "C", color: "linear-gradient(135deg,#00C4CC,#7D2AE8)", textColor: "#fff", url: "https://www.canva.com/", scheme: "canva://" },
    { cat: "Creative", name: "Figma", initials: "F", color: "#0D0D0D", textColor: "#fff", url: "https://www.figma.com/", scheme: "figma://" },
    { cat: "Creative", name: "CapCut", initials: "CC", color: "#000", textColor: "#fff", url: "https://www.capcut.com/", scheme: "capcut://" },
    { cat: "Creative", name: "Ideogram", initials: "ID", color: "#EF4444", textColor: "#fff", url: "https://ideogram.ai/" },
    { cat: "Creative", name: "Suno", initials: "S", color: "#000", textColor: "#fff", url: "https://suno.com/" },
    { cat: "Creative", name: "ElevenLabs", initials: "11", color: "#000", textColor: "#fff", url: "https://elevenlabs.io/" },
    // Business / MCH
    { cat: "Business", name: "LinkedIn", initials: "in", color: "#0A66C2", textColor: "#fff", url: "https://www.linkedin.com/", scheme: "linkedin://", star: true },
    { cat: "Business", name: "Notion", initials: "N", color: "#fff", textColor: "#000", url: "https://www.notion.so/", scheme: "notion://" },
    { cat: "Business", name: "Linear", initials: "L", color: "#5E6AD2", textColor: "#fff", url: "https://linear.app/", scheme: "linear://" },
    { cat: "Business", name: "Hostinger", initials: "H", color: "#673DE6", textColor: "#fff", url: "https://www.hostinger.com/", star: true },
    { cat: "Business", name: "Stripe", initials: "S", color: "#635BFF", textColor: "#fff", url: "https://stripe.com/" },
    { cat: "Business", name: "Malt", initials: "M", color: "#FC5757", textColor: "#fff", url: "https://www.malt.de/" },
    // Google
    { cat: "Google", name: "Gmail", initials: "M", color: "#fff", textColor: "#EA4335", url: "https://mail.google.com/", scheme: "googlegmail://" },
    { cat: "Google", name: "Drive", initials: "D", color: "linear-gradient(135deg,#4285F4,#34A853,#FBBC05)", textColor: "#fff", url: "https://drive.google.com/", scheme: "googledrive://" },
    { cat: "Google", name: "Calendar", initials: "31", color: "#fff", textColor: "#4285F4", url: "https://calendar.google.com/", scheme: "googlecalendar://" },
    // Social / Content
    { cat: "Social", name: "Instagram", initials: "IG", color: "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)", textColor: "#fff", url: "https://www.instagram.com/", scheme: "instagram://" },
    { cat: "Social", name: "TikTok", initials: "T", color: "#000", textColor: "#fff", url: "https://www.tiktok.com/", scheme: "tiktok://" },
    { cat: "Social", name: "YouTube", initials: "Y", color: "#FF0000", textColor: "#fff", url: "https://studio.youtube.com/", scheme: "youtube://" },
    { cat: "Social", name: "X", initials: "𝕏", color: "#000", textColor: "#fff", url: "https://x.com/", scheme: "twitter://" },
    { cat: "Social", name: "Telegram", initials: "T", color: "#229ED9", textColor: "#fff", url: "https://web.telegram.org/", scheme: "tg://" },
    // Sport / Car
    { cat: "Sport", name: "Tipico", initials: "T", color: "#D40029", textColor: "#fff", url: "https://www.tipico.de/" },
    { cat: "Car", name: "OBDeleven", initials: "OB", color: "#0E1730", textColor: "#fff", url: "https://obdeleven.com/" }
  ],

  // Bücher, Newsletter, Podcasts, Kurse
  buecherPM: [
    { title: "Inspired", autor: "Marty Cagan", url: "https://www.amazon.de/dp/B07BKZFQMK", star: true, note: "Standardwerk" },
    { title: "Empowered", autor: "Marty Cagan", url: "https://www.amazon.de/dp/B08PQPYZ2S" },
    { title: "The Mom Test", autor: "Rob Fitzpatrick", url: "https://www.momtestbook.com/", star: true, note: "User Interviews" },
    { title: "Continuous Discovery Habits", autor: "Teresa Torres", url: "https://www.amazon.de/dp/B09FJHCJD5", star: true },
    { title: "Shape Up", autor: "Ryan Singer", url: "https://basecamp.com/shapeup", star: true, note: "kostenlos" },
    { title: "Hooked", autor: "Nir Eyal", url: "https://www.amazon.de/dp/B00LMGLXTS" },
    { title: "Lean Analytics", autor: "Alistair Croll", url: "https://www.amazon.de/dp/1449335675" }
  ],
  buecherStrategie: [
    { title: "The Hard Thing About Hard Things", autor: "Ben Horowitz", url: "https://www.amazon.de/dp/B00DQ845EA" },
    { title: "Zero to One", autor: "Peter Thiel", url: "https://www.amazon.de/dp/B00J6YBOFQ" },
    { title: "Good Strategy Bad Strategy", autor: "Richard Rumelt", url: "https://www.amazon.de/dp/B0051G2CM2" },
    { title: "Competing Against Luck", autor: "Clayton Christensen", url: "https://www.amazon.de/dp/B01BHFZE86", star: true, note: "Jobs-to-be-done" }
  ],
  buecherMarketing: [
    { title: "Building a StoryBrand", autor: "Donald Miller", url: "https://www.amazon.de/dp/B0746J5JG9" },
    { title: "Made to Stick", autor: "Chip & Dan Heath", url: "https://www.amazon.de/dp/B000Q6ZLTS" },
    { title: "Influence", autor: "Robert Cialdini", url: "https://www.amazon.de/dp/B01LZJ3LSU" },
    { title: "SPIN Selling", autor: "Neil Rackham", url: "https://www.amazon.de/dp/0070511136" }
  ],
  buecherMindset: [
    { title: "Deep Work", autor: "Cal Newport", url: "https://www.amazon.de/dp/B013UWFM52" },
    { title: "7 Habits of Highly Effective People", autor: "Stephen Covey", url: "https://www.amazon.de/dp/B01069X4H0" },
    { title: "Thinking, Fast and Slow", autor: "Daniel Kahneman", url: "https://www.amazon.de/dp/B005MJFA2W" }
  ],
  newsletter: [
    { name: "Lenny's Newsletter", topic: "Product / Growth", url: "https://www.lennysnewsletter.com/", star: true },
    { name: "First Round Review", topic: "Startup / Leadership", url: "https://review.firstround.com/" },
    { name: "Stratechery", topic: "Tech Strategy", url: "https://stratechery.com/" },
    { name: "Not Boring", topic: "Tech + Narrative", url: "https://www.notboring.co/" },
    { name: "The Hustle", topic: "Business News", url: "https://thehustle.co/" },
    { name: "Justin Welsh", topic: "Solopreneur / LinkedIn", url: "https://www.justinwelsh.me/" },
    { name: "Marketing Examples", topic: "Copywriting", url: "https://marketingexamples.com/" },
    { name: "Demand Curve", topic: "Growth", url: "https://www.demandcurve.com/newsletter" }
  ],
  podcasts: [
    { name: "Lenny's Podcast", topic: "PM / Growth / Career", url: "https://www.lennyspodcast.com/", star: true },
    { name: "Acquired", topic: "Company Deep Dives", url: "https://www.acquired.fm/" },
    { name: "My First Million", topic: "Business Ideas", url: "https://www.mfmpod.com/" },
    { name: "The Knowledge Project", topic: "Mental Models", url: "https://fs.blog/knowledge-project-podcast/" },
    { name: "Masters of Scale", topic: "Founder Stories", url: "https://mastersofscale.com/" },
    { name: "Invest Like the Best", topic: "Business + Finance", url: "https://www.joincolossus.com/episodes" }
  ],
  kurse: [
    { name: "Reforge", topic: "PM / Growth", url: "https://www.reforge.com/", star: true, paid: true },
    { name: "Product School", topic: "PM Zertifikate", url: "https://productschool.com/", paid: true },
    { name: "CXL Institute", topic: "Marketing / Growth", url: "https://cxl.com/", paid: true },
    { name: "Maven", topic: "Cohort-based", url: "https://maven.com/", paid: true },
    { name: "HBS Online", topic: "Business", url: "https://online.hbs.edu/", paid: true },
    { name: "YC Startup School", topic: "Startups", url: "https://www.startupschool.org/" },
    { name: "Google Digital Garage", topic: "Digital Skills", url: "https://learndigital.withgoogle.com/" },
    { name: "HubSpot Academy", topic: "Sales / Marketing", url: "https://academy.hubspot.com/" }
  ],
  blogs: [
    { name: "First Round Review", url: "https://review.firstround.com/" },
    { name: "Signal v Noise", url: "https://world.hey.com/jason" },
    { name: "Paul Graham Essays", url: "http://paulgraham.com/articles.html" },
    { name: "a16z", url: "https://a16z.com/" },
    { name: "Intercom Blog", url: "https://www.intercom.com/blog/" },
    { name: "Mind the Product", url: "https://www.mindtheproduct.com/" }
  ],

  // Gesundheit — Marker, Referenzbereiche, Pattern-Erkennung
  gesundheit: {
    intro: "Lade Laborbefunde oder Arztbriefe hoch — die App erkennt Werte automatisch und markiert Auffälligkeiten (z. B. Eisenmangel, Bluthochdruck, Vitamin-D-Mangel). Alles bleibt lokal auf deinem Gerät.",
    markers: [
      // Blutbild / Eisen
      { id: "haemoglobin", label: "Hämoglobin", group: "Blut & Eisen",
        keywords: ["hämoglobin","haemoglobin","\\bhb\\b","hgb"],
        unit: "g/dL", lo: 12.0, hi: 17.5,
        implicationLo: "Anämie-Verdacht — häufig Eisenmangel oder B12/Folsäure-Mangel.",
        implicationHi: "Erhöht — möglich durch Dehydration, Rauchen oder seltene Polyzythämie." },
      { id: "ferritin", label: "Ferritin", group: "Blut & Eisen",
        keywords: ["ferritin"],
        unit: "ng/mL", lo: 30, hi: 300,
        implicationLo: "Niedrig = leere Eisenspeicher. Klassischer Hinweis auf Eisenmangel.",
        implicationHi: "Erhöht — oft akute Entzündung, seltener Eisenüberschuss (Hämochromatose)." },
      { id: "eisen", label: "Serum-Eisen", group: "Blut & Eisen",
        keywords: ["serumeisen","serum-eisen","serum eisen","\\beisen\\b","iron"],
        unit: "µg/dL", lo: 50, hi: 175,
        implicationLo: "Niedriges Serum-Eisen — zusammen mit Ferritin ein starker Hinweis auf Eisenmangel." },
      { id: "transferrin", label: "Transferrin-Sättigung", group: "Blut & Eisen",
        keywords: ["transferrin-sättigung","transferrin sättigung","tsat"],
        unit: "%", lo: 16, hi: 45 },
      { id: "erythrozyten", label: "Erythrozyten", group: "Blutbild",
        keywords: ["erythrozyten","rbc"],
        unit: "Mio/µL", lo: 4.0, hi: 5.9 },
      { id: "leukozyten", label: "Leukozyten", group: "Blutbild",
        keywords: ["leukozyten","leucozyten","wbc"],
        unit: "G/L", lo: 4.0, hi: 10.0,
        implicationHi: "Erhöht — oft Hinweis auf Infektion oder Entzündung." },
      { id: "thrombozyten", label: "Thrombozyten", group: "Blutbild",
        keywords: ["thrombozyten","plt"],
        unit: "G/L", lo: 150, hi: 400 },
      // Blutdruck / Kreislauf
      { id: "blutdruck", label: "Blutdruck", group: "Kreislauf", custom: "bp",
        keywords: ["blutdruck","\\brr\\b","systolisch"],
        unit: "mmHg", lo: 90, hi: 130 },
      { id: "puls", label: "Ruhepuls", group: "Kreislauf",
        keywords: ["ruhepuls","herzfrequenz","puls","\\bhr\\b"],
        unit: "bpm", lo: 50, hi: 90 },
      // Fette
      { id: "cholesterin", label: "Gesamt-Cholesterin", group: "Blutfette",
        keywords: ["gesamtcholesterin","gesamt-cholesterin","cholesterin gesamt","cholesterin"],
        unit: "mg/dL", lo: 0, hi: 200,
        implicationHi: "Erhöht — Risiko für Arteriosklerose. LDL, HDL und Triglyceride zusätzlich prüfen." },
      { id: "ldl", label: "LDL-Cholesterin", group: "Blutfette",
        keywords: ["ldl-cholesterin","ldl cholesterin","\\bldl\\b"],
        unit: "mg/dL", lo: 0, hi: 130,
        implicationHi: "Zu hoher LDL-Wert — schlechtes Cholesterin. Ernährung + Bewegung prüfen." },
      { id: "hdl", label: "HDL-Cholesterin", group: "Blutfette",
        keywords: ["hdl-cholesterin","hdl cholesterin","\\bhdl\\b"],
        unit: "mg/dL", lo: 40, hi: 200, reversed: true,
        implicationLo: "HDL (gutes Cholesterin) niedrig — Bewegung und gesunde Fette helfen." },
      { id: "triglyceride", label: "Triglyceride", group: "Blutfette",
        keywords: ["triglyceride","triglyzeride"],
        unit: "mg/dL", lo: 0, hi: 150 },
      // Zucker
      { id: "glukose", label: "Glukose (nüchtern)", group: "Zuckerstoffwechsel",
        keywords: ["nüchternglukose","nüchtern-glukose","blutzucker","glukose","glucose"],
        unit: "mg/dL", lo: 70, hi: 99,
        implicationHi: "Erhöht — Prädiabetes / Diabetes-Verdacht. HbA1c + Kontrolle sinnvoll." },
      { id: "hba1c", label: "HbA1c", group: "Zuckerstoffwechsel",
        keywords: ["hba1c","langzeitzucker"],
        unit: "%", lo: 4.0, hi: 5.7,
        implicationHi: "5.7–6.4 % = Prädiabetes, ab 6.5 % = Diabetes." },
      // Vitamine
      { id: "vitaminD", label: "Vitamin D (25-OH)", group: "Vitamine & Mineralstoffe",
        keywords: ["vitamin d","25-oh-d","25\\(oh\\)d","25 oh d"],
        unit: "ng/mL", lo: 30, hi: 100,
        implicationLo: "Vitamin-D-Mangel — besonders Winter / wenig Sonne. Oft Supplement sinnvoll." },
      { id: "vitaminB12", label: "Vitamin B12", group: "Vitamine & Mineralstoffe",
        keywords: ["vitamin b12","cobalamin","\\bb12\\b"],
        unit: "pg/mL", lo: 200, hi: 900,
        implicationLo: "B12-Mangel — typisch bei vegetarischer/veganer Ernährung, Müdigkeit, Konzentrationsprobleme." },
      { id: "folsaeure", label: "Folsäure", group: "Vitamine & Mineralstoffe",
        keywords: ["folsäure","folate","folat"],
        unit: "ng/mL", lo: 3.0, hi: 20.0 },
      { id: "magnesium", label: "Magnesium", group: "Vitamine & Mineralstoffe",
        keywords: ["magnesium"],
        unit: "mmol/L", lo: 0.75, hi: 1.05 },
      { id: "zink", label: "Zink", group: "Vitamine & Mineralstoffe",
        keywords: ["zink","zinc"],
        unit: "µg/dL", lo: 70, hi: 120 },
      // Schilddrüse
      { id: "tsh", label: "TSH", group: "Schilddrüse",
        keywords: ["\\btsh\\b","thyreotropin"],
        unit: "mU/L", lo: 0.4, hi: 4.0,
        implicationLo: "TSH niedrig — Schilddrüsen-Überfunktion möglich.",
        implicationHi: "TSH erhöht — Unterfunktion möglich (Hashimoto, Jodmangel)." },
      { id: "ft3", label: "fT3", group: "Schilddrüse",
        keywords: ["\\bft3\\b","freies t3"],
        unit: "pg/mL", lo: 2.0, hi: 4.4 },
      { id: "ft4", label: "fT4", group: "Schilddrüse",
        keywords: ["\\bft4\\b","freies t4"],
        unit: "ng/dL", lo: 0.8, hi: 1.8 },
      // Niere
      { id: "kreatinin", label: "Kreatinin", group: "Niere",
        keywords: ["kreatinin","creatinin","creatinine"],
        unit: "mg/dL", lo: 0.7, hi: 1.3,
        implicationHi: "Erhöht — Nierenfunktion ggf. eingeschränkt, Hausarzt konsultieren." },
      { id: "gfr", label: "GFR (eGFR)", group: "Niere",
        keywords: ["\\begfr\\b","\\bgfr\\b","glomeruläre"],
        unit: "mL/min", lo: 90, hi: 200, reversed: true },
      { id: "harnstoff", label: "Harnstoff", group: "Niere",
        keywords: ["harnstoff","urea","bun"],
        unit: "mg/dL", lo: 10, hi: 50 },
      // Leber
      { id: "gpt", label: "GPT / ALT", group: "Leber",
        keywords: ["\\bgpt\\b","\\balt\\b","alanin-aminotransferase"],
        unit: "U/L", lo: 0, hi: 45,
        implicationHi: "Erhöht — Hinweis auf Leberzellschädigung (Fettleber, Alkohol, Medikamente)." },
      { id: "got", label: "GOT / AST", group: "Leber",
        keywords: ["\\bgot\\b","\\bast\\b","aspartat-aminotransferase"],
        unit: "U/L", lo: 0, hi: 45 },
      { id: "ggt", label: "Gamma-GT", group: "Leber",
        keywords: ["gamma-gt","gamma gt","\\bggt\\b"],
        unit: "U/L", lo: 0, hi: 60,
        implicationHi: "Erhöht — häufig Leber/Galle-Belastung, Alkohol-Marker." },
      // Entzündung
      { id: "crp", label: "CRP", group: "Entzündung",
        keywords: ["\\bcrp\\b","c-reaktives protein"],
        unit: "mg/L", lo: 0, hi: 5,
        implicationHi: "Erhöht — akute Entzündung oder Infektion." },
      // Elektrolyte
      { id: "natrium", label: "Natrium", group: "Elektrolyte",
        keywords: ["natrium","\\bna\\+","sodium"],
        unit: "mmol/L", lo: 135, hi: 145 },
      { id: "kalium", label: "Kalium", group: "Elektrolyte",
        keywords: ["kalium","\\bk\\+","potassium"],
        unit: "mmol/L", lo: 3.5, hi: 5.0 },
      { id: "calcium", label: "Calcium", group: "Elektrolyte",
        keywords: ["calcium","kalzium"],
        unit: "mmol/L", lo: 2.15, hi: 2.55 }
    ],
    onboardingFragen: [
      { id: "geschlecht", label: "Geschlecht", options: ["männlich","weiblich","divers"] },
      { id: "alter", label: "Alter", type: "number" },
      { id: "ziele", label: "Ziele", options: ["Energie","Schlaf","Gewicht","Leistung","Mental","Prävention"], multi: true }
    ]
  },

  // Checkliste
  checklist: {
    "30": [
      "LinkedIn-Profil überarbeiten — Positionierung als Digitalisierer für regionalen Mittelstand",
      "Inspired von Marty Cagan gelesen",
      "Lenny's Newsletter abonniert, 3 Podcast-Episoden gehört",
      "MCH: aktuellen Kundenstamm segmentieren (Branche, Größe, Marge)",
      "Justin Welsh LinkedIn-Guide durchgearbeitet"
    ],
    "60": [
      "2 MCH-Cases als Mini-Portfolio dokumentiert (Problem → Lösung → Impact)",
      "Retainer-Angebot für MCH strukturiert (Pakete, Preis, Laufzeit)",
      "4 LinkedIn-Posts veröffentlicht (Mittelstand, eigene Cases)",
      "PM-Spec für ein MCH-internes Produkt geschrieben",
      "The Mom Test gelesen",
      "Erstes Nutzer-Interview nach Mom-Test durchgeführt"
    ],
    "90": [
      "Mindestens 2 Retainer-Kunden geschlossen oder migriert",
      "1 Mentor-Gespräch mit Agentur-Owner oder PM geführt",
      "Entscheidung: MCH-Fulltime oder PM-Einstieg nach Ausbildung",
      "Berufsschul-Noten auf 2,5er-Niveau halten",
      "Shape Up gelesen + auf MCH angewendet"
    ],
    "365": [
      "MCH Jahresumsatz auf sauberes 6-stelliges Niveau",
      "LinkedIn auf 2.000+ regionale Follower",
      "1 Case Study mit messbarem Impact publiziert",
      "5 PM-Kernbücher + 2 Reforge/Maven-Kurse absolviert"
    ]
  }
};
