(function () {
  // --- 1. MOCK DATABASE (6 SCENARIOS) ---
  const scenarios = [
    // ================= 1. CORRECTIVE (Mesin Rusak) =================
    {
      id: "corrective",
      keywords: ["vibration trip", "vshh", "getar", "corrective", "Vibration"],
      modeColor: "var(--accent-red)",
      modeName: "CORRECTIVE WORK",
      requireIsolation: true,
      isUnknown: false,
      isNovel: false,
      discipline: "Mechanical",
      interlock: {
        trip: "VSHH-1201 > 7.4 mm/s",
        desc: "Bearing vibration exceeded High-High critical threshold. Motor tripped to prevent catastrophic failure.",
        base: "2.5 mm/s",
        rt: "7.4 mm/s",
        trend: "Rapid Increase (↑)",
      },
      rootCause: {
        pattern: "Angular Misalignment 0.12 mm/100mm",
        spec: "Dominant 2x RPM Peak",
        desc: "Spectrum analysis shows high amplitude at 2x running speed. History correlates with foundation settlement.",
        history: [
          {
            wo: "WO-240003",
            date: "12 Nov 2023",
            symp: "VSHH Trip (7.4 mm/s)",
            action: "Laser re-aligned, re-shimmed",
          },
        ],
      },
      materials: [
        {
          name: "SS Shim Pack (0.1mm - 1.0mm)",
          stock: "45 Packs",
          color: "var(--accent-green)",
        },
      ],
      sopSteps: [
        "Apply LOTO (Lock-Out Tag-Out) and prove zero energy before starting work.",
        "Set up laser alignment kit (e.g., SKF TKSA) on pump and motor shafts.",
        "Check soft foot and apply Stainless Steel Shim Pack as needed.",
        "Target angular < 0.05 mm/100mm and offset < 0.05 mm (Per OPL-03).",
      ],
      tacit:
        "This is example for tacit knowledge - Fondasi pompa sering turun akibat vibrasi kompresor sebelah. Gunakan shim SS tebal, jangan kuningan. (Catatan: Agus - Spv) ",
      citations: {
        interlock: [
          "Interlock-Logic-Diagram-GA-1201A.pdf",
          "P&ID-GA-1201A.png",
        ],
        rca: [
          "Maintenance-History-(All-Equipment).xlsx",
          "Equipment-GA-Drawing-GA-1201A.pdf",
        ],
        sop: [
          "OPL-03-Pump-Motor-Alignment-Check-(Laser).pdf",
          "Equipment-Datasheet-GA-1201A.pdf",
        ],
      },
    },

    // ================= 2. PREDICTIVE (Inspeksi Rute) =================
    {
      id: "predictive",
      keywords: ["predictive", "trend", "route", "vt1201", "inspection"],
      modeColor: "var(--accent-blue)",
      modeName: "PREDICTIVE INSPECTION",
      requireIsolation: false,
      isUnknown: false,
      isNovel: false,
      discipline: "Instrument",
      interlock: {
        trip: "PdM Route Reading (Online)",
        desc: "Routine vibration and thermal data collection. Equipment is running normally.",
        base: "2.5 mm/s",
        rt: "4.2 mm/s",
        trend: "Slight increase (→)",
      },
      rootCause: {
        pattern: "Normal Degradation Curve",
        spec: "Overall RMS 4.2 mm/s",
        desc: "Trend is within normal operating limits. Alarm setpoint is 4.5 mm/s (VSH-1201).",
        history: [
          {
            wo: "WO-240024",
            date: "10 Jun 2024",
            symp: "PdM Route Reading",
            action: "Data captured and trended",
          },
        ],
      },
      materials: [],
      sopSteps: [
        "Record VT-1201 on the daily PdM route in mm/s RMS (Per OPL-07).",
        "Correlate vibration rise with TI-1201 bearing temperature trend.",
        "A rise greater than 1 mm/s within a week = plan a bearing inspection.",
        "Escalate to reliability engineer if the 1x running-speed component dominates.",
      ],
      tacit:
        "Perhatikan jika suhu TI-1201 naik mendadak bersamaan dengan vibrasi, indikasi pelumas kurang. (Budi - PdM)",
      citations: {
        interlock: ["PDM-ROUTE.PDF"],
        rca: ["MAINTENANCE-LOG.PDF"],
        sop: ["OPL-07.PDF"],
      },
    },

    // ================= 3. PREVENTIVE (Lubrication/Oil Bath) =================
    {
      id: "preventive",
      keywords: ["preventive", "lubrication", "oil", "grease", "lube"],
      modeColor: "var(--accent-green)",
      modeName: "PREVENTIVE MAINTENANCE",
      requireIsolation: true,
      isUnknown: false,
      isNovel: false,
      discipline: "Mechanical",
      interlock: {
        trip: "PM Schedule Trigger",
        desc: "Routine oil bath topping up and constant-level oiler inspection.",
        base: "N/A",
        rt: "N/A",
        trend: "Scheduled",
      },
      rootCause: {
        pattern: "Scheduled Lubrication",
        spec: "ISO VG 68",
        desc: "Maintenance plan triggered based on running hours.",
        history: [],
      },
      materials: [
        {
          name: "ISO VG 68 Lube Oil",
          stock: "10 Pails",
          color: "var(--accent-green)",
        },
      ],
      sopSteps: [
        "Stop pump, isolate electrically (LOTO) before any lube work.",
        "Check the oil sight-glass level sits at the middle mark (OPL-02).",
        "Top-up with ISO VG 68 only — never mix grades.",
        "Record oil condition (colour/water) on the weekly lube route sheet.",
      ],
      tacit:
        "Jangan over-fill oli, karena justru akan menyebabkan bearing overheat. (Joko - Mech)",
      citations: {
        interlock: ["PM-SCHEDULE.PDF"],
        rca: [],
        sop: ["OPL-02.PDF"],
      },
    },

    // ================= 4. OVERHAUL (T/A Major) =================
    {
      id: "overhaul",
      keywords: ["overhaul", "major", "end-of-run", "rbi"],
      modeColor: "var(--accent-purple)",
      modeName: "MAJOR OVERHAUL",
      requireIsolation: true,
      isUnknown: false,
      isNovel: false,
      discipline: "Mechanical",
      interlock: {
        trip: "Scheduled T/A Intervention",
        desc: "End-of-run limit reached per Risk Based Inspection (RBI) plan.",
        base: "N/A",
        rt: "Offline",
        trend: "Zero State",
      },
      rootCause: {
        pattern: "RBI Scheduled Replacement",
        spec: "Clearance Wear Limits",
        desc: "Scheduled replacement of wear rings, bearings, and mechanical seal at Turnaround.",
        history: [],
      },
      materials: [
        {
          name: "JC T2100 Mech Seal",
          stock: "2 Units",
          color: "var(--accent-green)",
        },
        {
          name: "7310 BECBM Bearing",
          stock: "4 Units",
          color: "var(--accent-green)",
        },
      ],
      sopSteps: [
        "Perform complete pump teardown per Vendor Maintenance Manual.",
        "Renew DE/NDE bearings and Mechanical Seal Cartridge JC T2100.",
        "Take cold alignment with specified thermal-growth target offset (OPL-05).",
      ],
      tacit:
        "Hexane saat operasi (80 degC) memuaikan casing. Setelah running awal 2 jam, selalu lakukan hot-check coupling. (Tono - TA Spv)",
      citations: {
        interlock: ["RBI-PLAN.PDF"],
        rca: [],
        sop: ["OPL-05.PDF", "VENDOR-MANUAL.PDF"],
      },
    },

    // ================= 5. NOVEL ANOMALY (CROSS-ASSET) =================
    // ================= 5. NOVEL ANOMALY (PARTIAL MATCH / DIAGNOSTIC MODE) =================
    {
      id: "novel",
      keywords: [
        "tshh",
        "temperature",
        "suhu",
        "bearing temperature",
        "novel",
        "Suhu trip",
        "overheat trip",
      ],
      modeColor: "var(--accent-amber)",
      modeName: "BEARING TEMPERATURE SPIKE",
      requireIsolation: false,
      isUnknown: false,
      isNovel: true,
      discipline: "Mechanical",
      interlock: {
        trip: "TSHH-1201 > 96.0 °C",
        desc: "Bearing temperature reached the High-High critical threshold per Interlock SEQ-1201. System initiated safety interlock to prevent catastrophic seizure.",
        base: "55.0 °C",
        rt: "96.5 °C",
        trend: "Steady Climb (↑)",
      },
      rootCause: {
        pattern: "Unverified Thermal Overload / Restricted Lube Flow",
        spec: "Cross-checked with historical thermal degradation markers",
        desc: "PARTIAL MATCH DETECTED (54%). No exact prior TSHH-1201 trip recorded in SAP PM for GA-1201A due to effective preventive maintenance. However, semantic analysis links this thermal symptom to past bearing temperature trends (WO-240004) and seal flush restrictions (WO-240002).",
        history: [
          {
            wo: "WO-240004",
            date: "12 Oct 2024",
            symp: "Bearing DE noisy with rising temperature TI-1201 trend",
            action:
              "Renewed DE bearing 7310 BECBM, flushed housing, refilled ISO VG 68",
          },
          {
            wo: "WO-240002",
            date: "03 Mar 2024",
            symp: "Seal face ran dry and scored",
            action:
              "Replaced JC T2100 seal, cleaned API Plan 11 orifice RO-1201",
          },
        ],
      },
      materials: [],
      sopSteps: [
        "SYSTEM LOCK: Corrective execution restricted. The exact root cause requires physical field verification.",
        "DIAGNOSTIC TASK 1: Inspect oil sight-glass per OPL-02 to ensure ISO VG 68 level is at the center mark.",
        "DIAGNOSTIC TASK 2: Verify PDI-1201 differential pressure (>1.5 bar) per OPL-01 to ensure seal flush line is clear.",
        "Document your visual findings on site in the Field Note box below for the Reliability Engineer review.",
      ],
      tacit:
        "There are currently no records of tacit knowledge regarding this sudden temperature spike. Prioritize checking the lubricant level and dP flush pressure..",
      citations: {
        interlock: ["Interlock-Logic-Diagram-GA-1201A.pdf"],
        rca: ["Maintenance-History-(All-Equipment).xlsx"],
        sop: [
          "OPL-01-Mechanical-Seal-Flush-(API-Plan-11)-Verification.pdf",
          "OPL-02-Bearing-Oil-Bath-Level-&-Greasing.pdf",
        ],
      },
    },
    // ================= 6. UNKNOWN ANOMALY (MASALAH BARU ZONK) =================
    // ================= 6. UNKNOWN ANOMALY (ZERO DATA / ZONK) =================
    {
      id: "unknown",
      keywords: [
        "unknown",
        "bau",
        "terbakar",
        "frekuensi",
        "hunting",
        "aneh",
        "kosong",
        "elektrik",
        "not good",
        "smell",
      ],
      modeColor: "var(--border)",
      modeName: "UNVERIFIED ANOMALY (ZERO DATA)",
      requireIsolation: false,
      isUnknown: true,
      isNovel: false,
      discipline: "Electrical / General",
      interlock: {},
      rootCause: {},
      materials: [],
      sopSteps: [],
      tacit: "",
      citations: {},
    },
  ];

  // --- 2. UI ELEMENTS ---
  const searchView = document.getElementById("view-search");
  const loadingView = document.getElementById("view-loading");
  const loadingText = document.getElementById("loading-text");
  const dashboardView = document.getElementById("view-dashboard");
  const analyzeBtn = document.getElementById("analyze-btn");
  const inputField = document.getElementById("anomaly-input");
  const equipmentSelect = document.getElementById("equipment-tag");
  const headerTag = document.getElementById("header-tag");
  const dashboardStack = document.getElementById("dashboard-stack");
  const errorToast = document.getElementById("error-toast");
  const newQueryBtn = document.getElementById("new-query-btn");

  const loadingStages = [
    "Connecting to Asset Integrity (AIMS)...",
    "Extracting Telemetry Data...",
    "Verifying SOPs via EDMS (Strict RAG)...",
  ];

  // --- 3. TEMPLATE GENERATORS ---
  function renderCitations(cites) {
    if (!cites || cites.length === 0) return "";
    return cites
      .map((c) => {
        // Deteksi otomatis ikon berdasarkan ekstensi file
        let icon = "fa-file-pdf";
        let color = "inherit";
        if (
          c.toLowerCase().includes(".xls") ||
          c.toLowerCase().includes(".csv")
        ) {
          icon = "fa-file-excel";
          color = "#10b981"; // Hijau untuk Excel
        }

        // href langsung memanggil nama file di root directory
        return `
            <a href="${c}" target="_blank" rel="noopener noreferrer" class="citation-chip inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold tracking-wider" style="text-decoration:none;">
              <i class="fa-solid ${icon}" style="color: ${color}"></i> ${c}
            </a>
            `;
      })
      .join("");
  }
  function renderMaterials(materials) {
    if (!materials || materials.length === 0)
      return '<p class="text-xs text-slate-500 italic">No materials requisitioned for this task.</p>';
    return materials
      .map(
        (m) => `
            <div class="material-chip">
              <span class="text-sm font-medium text-slate-200">${m.name}</span>
              <div class="flex items-center gap-2">
                <span class="text-xs text-slate-400 font-bold">${m.stock}</span>
                <span class="w-2 h-2 rounded-full" style="background: ${m.color}; box-shadow: 0 0 0 2px ${m.color}40;"></span>
              </div>
            </div>
          `,
      )
      .join("");
  }

  // --- 4. BUILD DASHBOARD ---
  function buildDashboard(data) {
    try {
      // Update Header & Confidence Score
      let confHtml = "";
      if (data.isUnknown)
        confHtml = `<span class="text-slate-500">0% MATCH (NO DATA)</span>`;
      else if (data.isNovel)
        confHtml = `<span style="color: var(--accent-amber)">54% MATCH</span>`;
      else
        confHtml = `<span style="color: var(--accent-green)">100% MATCH</span>`;

      const confHeader = document.getElementById("confidence-header");
      if (confHeader) {
        confHeader.innerHTML = `
                <p class="text-xs text-slate-400 mb-1 font-medium uppercase tracking-wider">Confidence Score <span class="tag-source">AI</span></p>
                <p class="text-xl font-bold">${confHtml}</p>
              `;
      }

      headerTag.innerHTML = `${equipmentSelect.value.split(" ")[0]} <span class="text-slate-400 font-sans text-xl font-normal">| ${data.modeName}</span>`;

      const rcCol = data.modeColor;

      // ================= LOGIKA UNTUK SCENARIO "UNKNOWN" (ZONK) =================
      // ================= LOGIKA UNTUK SCENARIO "UNKNOWN" (ZONK) =================
      if (data.isUnknown) {
        const userInputText = inputField.value
          ? inputField.value
          : "Unknown anomaly input";

        dashboardStack.innerHTML = `
                <!-- INPUT ENGINEER BADGE -->
                <div class="bg-slate-900 border border-slate-700 rounded-lg p-4 flex items-center justify-between shadow-inner">
                  <div class="flex items-center gap-3">
                    <span class="w-3 h-3 rounded-full bg-slate-500"></span>
                    <div>
                      <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Raw Engineer Input (Field Report)</p>
                      <p class="text-sm font-semibold text-white">"${userInputText}"</p>
                    </div>
                  </div>
                  <span class="text-[10px] bg-slate-800 text-slate-400 px-2.5 py-1 rounded border border-slate-700">0% Database Match</span>
                </div>

                <!-- CARD 1 DISABLED -->
                <div class="card rounded-lg p-6 shadow-md border border-dashed border-slate-600 bg-slate-900/50 opacity-60">
                  <div class="flex items-center gap-2 mb-2">
                    <h3 class="font-serif-header text-xl font-bold text-slate-500">1. Operational Status</h3>
                  </div>
                  <div class="flex items-center justify-center py-6 text-slate-500 text-sm">
                    <i class="fa-solid fa-link-slash mr-2"></i> No telemetry or interlock data was detected for this anomaly description. 
                  </div>
                </div>

                <!-- CARD 2 DISABLED -->
                <div class="card rounded-lg p-6 shadow-md border border-dashed border-slate-600 bg-slate-900/50 opacity-60">
                  <div class="flex items-center gap-2 mb-2">
                    <h3 class="font-serif-header text-xl font-bold text-slate-500">2. Failure Memory System (RCA)</h3>
                  </div>
                  <div class="flex items-center justify-center py-6 text-slate-500 text-sm">
                    <i class="fa-solid fa-folder-open mr-2"></i> There are no similar work orders (WO/RCA) in SAP PM .
                  </div>
                </div>

                <!-- CARD 3 FIELD NOTE ONLY (ACTIVE) -->
                <div class="card rounded-lg p-6 shadow-2xl border-l-4 border-l-amber-500 bg-[#0f172a] relative overflow-hidden">
                  <div class="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full -z-0"></div>
                  <div class="flex items-center justify-between mb-6 border-b border-slate-700 pb-4 relative z-10">
                    <h3 class="font-serif-header text-xl font-bold text-amber-500">3. Field Observation Required</h3>
                  </div>
                  <div class="flex flex-col items-center justify-center py-8 px-4 text-center relative z-10">
                    <div class="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                      <i class="fa-solid fa-eye text-3xl text-amber-500 animate-pulse"></i>
                    </div>
                    <h4 class="text-lg font-bold text-white mb-2">No Verified Answer Found (Zero-Data State)</h4>
                    <p class="text-sm text-slate-400 max-w-lg mb-8 leading-relaxed">
                     This anomaly report is entirely new and has not been recorded in any system. This scenario requires immediate escalation to the Senior Reliability Engineer and manual logging. 
                    </p>
                    <div class="w-full max-w-2xl bg-[#1e293b] rounded-lg p-6 border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                      <p class="text-[11px] text-amber-400 font-bold mb-4 uppercase tracking-widest text-left flex items-center gap-2">
                        <i class="fa-solid fa-pen-to-square"></i> Tacit Knowledge / Add Field Note 
                        <span class="tag-source bg-amber-500/20 text-amber-200">ACTIVE INPUT</span>
                      </p>
                      <textarea class="w-full bg-[#0f172a] border border-slate-600 rounded p-3 text-sm text-white focus:border-amber-500 focus:outline-none mb-4 transition-colors" rows="4" placeholder="Describe your physical findings in the field in detail... "></textarea>
                      <button onclick="document.getElementById('success-modal').style.display = 'flex'" class="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded text-sm transition-colors shadow-lg cursor-pointer">
  Submit Observation & Trigger MOC Review
</button>
                    </div>
                  </div>
                </div>

                <!-- Q&A ASSISTANT (ACTIVE & HELPFUL) -->
                <div class="mt-6 bg-[#0f172a] rounded-lg border border-slate-700 p-4 shadow-lg flex flex-col gap-3" id="qa-container" data-scenario="unknown">
                  <div class="flex items-center gap-2 border-b border-slate-700 pb-2">
                    <span class="text-xl">🤖</span>
                    <p class="text-[11px] text-blue-400 font-bold uppercase tracking-widest">Strict RAG Assistant <span class="tag-source">Active Guide</span></p>
                  </div>
                  <div id="qa-history" class="flex flex-col gap-3 max-h-[250px] overflow-y-auto pr-2" style="scrollbar-width: thin; scrollbar-color: #334155 #0f172a;">
                    <div class="self-start bg-[#1e293b] border border-slate-600 rounded p-3 max-w-[90%] shadow">
                      <p class="text-sm text-slate-300 leading-relaxed-body">
                        The AI detected no data for this report. However, I am ready to guide you through general safety procedures or emergency escalation steps. What would you like to ask? 
                      </p>
                    </div>
                  </div>
                  <div class="flex flex-col sm:flex-row gap-3 pt-2 mt-2 border-t border-slate-700">
                    <input id="qa-input" type="text" placeholder="Type a guidance question .." class="field flex-grow rounded px-4 py-2.5 text-sm">
                    <button id="qa-btn" class="btn-primary font-bold py-2.5 px-6 rounded text-sm whitespace-nowrap shadow">Ask</button>
                  </div>
                </div>
              `;

        // Aktifkan kembali event Q&A khusus untuk state unknown agar tetap berguna
        const qaBtn = document.getElementById("qa-btn");
        const qaInput = document.getElementById("qa-input");
        if (qaBtn && qaInput) {
          qaBtn.addEventListener("click", processQA);
          qaInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") processQA();
          });
        }
      }
      // ================= LOGIKA UNTUK SCENARIO "NORMAL" & "NOVEL" =================
      else {
        // Teks Sumber Histori (Beda untuk Novel vs Normal)
        const matchSource = data.isNovel ? "CROSS-ASSET (AIMS)" : "SAP PM";

        // Buat tabel histori jika data ada
        let historyTable = "";
        if (data.rootCause.history && data.rootCause.history.length > 0) {
          let trs = data.rootCause.history
            .map(
              (h) => `
                  <tr class="hover:bg-slate-800/50 transition-colors">
                    <td class="px-2 py-2 font-mono text-blue-400">${h.wo}</td>
                    <td class="px-2 py-2 text-slate-400">${h.date}</td>
                    <td class="px-2 py-2 font-semibold text-white truncate max-w-[150px]" title="${h.symp}">${h.symp}</td>
                    <td class="px-2 py-2 text-slate-400 truncate max-w-[150px]" title="${h.action}">${h.action}</td>
                  </tr>
                `,
            )
            .join("");
          historyTable = `
                  <div class="mt-4 bg-[#0b1120] rounded border border-slate-700 p-3 shadow-inner">
                    <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2 flex items-center justify-between">
                      <span>Historical Match <span class="tag-source">${matchSource}</span></span>
                    </p>
                    <div class="overflow-x-auto rounded border border-slate-700" style="scrollbar-width: thin;">
                      <table class="w-full text-left text-[10px] text-slate-300 whitespace-nowrap">
                        <thead class="bg-slate-800 text-slate-400 uppercase">
                          <tr>
                            <th class="px-2 py-2 border-b border-slate-700">WO Number</th>
                            <th class="px-2 py-2 border-b border-slate-700">Date</th>
                            <th class="px-2 py-2 border-b border-slate-700">Reported Symptom</th>
                            <th class="px-2 py-2 border-b border-slate-700">Action Taken</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-700">${trs}</tbody>
                      </table>
                    </div>
                  </div>
                `;
        }

        // Tombol Isolasi DCS Bersyarat
        let isolationButton = "";
        if (data.isNovel) {
          isolationButton = `<span class="bg-amber-900/30 text-amber-400 border border-amber-800 text-xs px-3 py-1.5 rounded font-bold uppercase tracking-wider shadow"><i class="fa-solid fa-lock mr-1"></i> Execution Locked</span>`;
        } else if (data.requireIsolation) {
          isolationButton = `<button class="btn-danger rounded flex items-center gap-2 px-4 py-2 text-sm font-bold shadow-lg"><span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Request DCS Isolation</button>`;
        } else {
          isolationButton = `<span class="bg-blue-900/30 text-blue-400 border border-blue-800 text-xs px-3 py-1.5 rounded font-bold uppercase tracking-wider shadow"><i class="fa-solid fa-shield-check mr-1"></i> No DCS Isolation Required</span>`;
        }

        // Pembuatan List SOP Step (Peringatan Amber jika Novel)
        let stepsHtml = "";
        if (data.isNovel) {
          stepsHtml += `
                  <li class="flex gap-3 bg-amber-900/20 p-3 rounded border border-amber-900/50 mb-3">
                    <span class="text-2xl mt-0.5">⚠️</span>
                    <p class="text-sm text-amber-200 leading-relaxed-body font-medium">The system automatically flags corrective action recommendations for anomalies that have not been historically verified for this asset. A physical investigation is required.</p>
                  </li>
                `;
        }
        stepsHtml += data.sopSteps
          .map(
            (step, idx) => `
                <li class="flex gap-3 items-start">
                  <span class="${data.isNovel ? "bg-slate-800 text-slate-500 border border-slate-700" : "step-marker"} w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">${idx + 1}</span>
                  <p class="text-sm ${data.isNovel ? "text-slate-500 line-through" : "text-slate-300"} leading-relaxed-body">${step}</p>
                </li>
              `,
          )
          .join("");

        dashboardStack.innerHTML = `
                <!-- CARD 1 -->
                <div class="card rounded-lg p-6 shadow-md border-l-4" style="border-left-color: ${rcCol};">
                  <div class="flex items-center gap-2 mb-4">
                    <h3 class="font-serif-header text-xl font-bold" style="color: ${rcCol};">1. Operational Status</h3>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div class="rounded-md p-4 mb-4 border" style="background: ${rcCol}15; border-color: ${rcCol}40;">
                        <p class="text-xs mb-1 font-medium uppercase tracking-wider" style="color: ${rcCol}">Trigger Parameter</p>
                        <p class="text-xl font-bold text-white">${data.interlock.trip}</p>
                      </div>
                      <p class="text-sm text-slate-300 leading-relaxed-body mb-4">${data.interlock.desc}</p>
                      <div class="flex flex-wrap gap-2">${renderCitations(data.citations.interlock)}</div>
                    </div>
                    <div class="bg-[#0f172a] rounded border border-slate-700 p-4 shadow-inner">
                      <p class="text-xs text-slate-400 mb-3 font-bold uppercase tracking-wider">Live Telemetry <span class="tag-source">DCS</span></p>
                      <div class="space-y-3 text-sm text-slate-300">
                        <div class="flex justify-between items-center border-b border-slate-700 pb-2">
                          <span>Baseline</span><span class="text-green-400 font-bold font-mono">${data.interlock.base}</span>
                        </div>
                        <div class="flex justify-between items-center border-b border-slate-700 pb-2">
                          <span>Aktual (Real-time)</span><span class="text-red-400 font-bold font-mono text-base">${data.interlock.rt}</span>
                        </div>
                        <div class="flex justify-between items-center pt-1">
                          <span>Trend Data</span><span class="text-amber-400 font-medium">${data.interlock.trend}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- CARD 2 -->
                <div class="card rounded-lg p-6 shadow-md border-l-4" style="border-left-color: ${rcCol};">
                  <div class="flex items-center gap-2 mb-4">
                    <h3 class="font-serif-header text-xl font-bold" style="color: ${rcCol};">2. Failure Memory System (RCA)</h3>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div class="rounded-md p-4 mb-4 border" style="background: ${rcCol}15; border-color: ${rcCol}40;">
                        <p class="text-xs mb-1 font-medium uppercase tracking-wider" style="color: ${rcCol}">Identified Mode</p>
                        <p class="text-xl font-bold text-white">${data.rootCause.pattern}</p>
                        <div class="mt-4 flex items-center gap-2 bg-[#0f172a] px-3 py-2 rounded border border-slate-700">
                          <span class="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Evidence:</span>
                          <span class="text-sm text-white font-medium">${data.rootCause.spec}</span>
                        </div>
                      </div>
                      <p class="text-sm text-slate-300 leading-relaxed-body mb-4 ${data.isNovel ? "text-amber-200" : ""}">${data.rootCause.desc}</p>
                      ${historyTable}
                      <div class="mt-4 flex flex-wrap gap-2">${renderCitations(data.citations.rca)}</div>
                    </div>
                    
                    <div class="h-full">
                      <div class="w-full h-full min-h-[160px] blueprint-bg rounded-md relative flex items-center justify-center overflow-hidden border border-slate-600 shadow-inner">
                        <span class="absolute top-2 left-3 text-[10px] text-blue-400 font-mono tracking-widest uppercase font-bold">Digital Twin <span class="tag-source">AIMS</span></span>
                        <svg width="300" height="120" viewBox="0 0 300 120">
                          <path d="M 230 60 L 280 60" fill="none" stroke="#64748b" stroke-width="3" stroke-dasharray="4 2" />
                          <rect x="20" y="30" width="80" height="60" rx="4" fill="#1e293b" stroke="#94a3b8" stroke-width="2"/>
                          <text x="60" y="105" font-family="monospace" font-size="10" fill="#94a3b8" text-anchor="middle">MOTOR</text>
                          <rect x="100" y="55" width="40" height="10" fill="#64748b" />
                          <rect x="110" y="45" width="20" height="30" rx="2" fill="#334155" stroke="#cbd5e1" stroke-width="2"/>
                          <circle cx="190" cy="60" r="35" fill="#1e293b" stroke="#94a3b8" stroke-width="2"/>
                          <text x="190" y="110" font-family="monospace" font-size="10" fill="#94a3b8" text-anchor="middle">GA-1201A</text>
                          
                          <!-- Animasi Pinpoint dinamis -->
                          <circle cx="${data.id === "corrective" ? 120 : data.isNovel ? 120 : 190}" cy="60" r="25" fill="none" stroke="${rcCol}" stroke-width="3" stroke-dasharray="4 4">
                            <animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite"/>
                          </circle>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- CARD 3 -->
                <div class="card rounded-lg p-6 shadow-md border-l-4" style="border-left-color: ${data.isNovel ? "var(--border)" : "var(--accent-green)"};">
                  <div class="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-700 pb-4">
                    <h3 class="font-serif-header text-xl font-bold" style="color: ${data.isNovel ? "var(--text-secondary)" : "var(--accent-green)"};">3. Dynamic OPL Execution</h3>
                    ${isolationButton}
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div class="mb-6">
                        <p class="text-[11px] text-slate-400 font-bold mb-2 uppercase tracking-widest">Required Materials <span class="tag-source">SAP MM</span></p>
                        <div class="grid grid-cols-1 gap-2">${renderMaterials(data.materials)}</div>
                      </div>
                      <div>
                        <p class="text-[11px] text-slate-400 font-bold mb-3 uppercase tracking-widest">Execution Steps <span class="tag-source">SOP</span></p>
                        <ol class="space-y-3">
                          ${stepsHtml}
                        </ol>
                      </div>
                    </div>

                    <div class="flex flex-col h-full">
                      <div class="mt-2 mb-4 rounded-md p-5 bg-[#0b1120] border border-slate-700 shadow-inner relative">
                        ${!data.isNovel ? `<div class="absolute top-4 right-4 flex items-center gap-1.5 bg-green-900/30 border border-green-700/50 px-2 py-1 rounded"><span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span><span class="text-[9px] text-green-400 font-bold uppercase tracking-widest">SME Verified</span></div>` : ""}
                        <div class="flex items-start gap-3">
                          <span class="text-2xl mt-1">💡</span>
                          <div class="pr-24">
                            <p class="text-[11px] text-amber-400 font-bold mb-2 tracking-widest uppercase">Tacit Knowledge <span class="tag-source">LOGS</span></p>
                            <p class="text-sm text-slate-300 italic leading-relaxed-body">"${data.tacit}"</p>
                          </div>
                        </div>
                      </div>
                      
                      <button class="w-full mb-6 py-3 text-xs font-bold text-slate-400 border border-dashed border-slate-600 rounded hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] transition-colors">
                        <i class="fa-solid fa-plus mr-1"></i> Add Field Note / MOC Feedback
                      </button>
                      
                      <div class="mt-auto">
                        <p class="text-[11px] text-slate-400 font-bold mb-2 uppercase tracking-widest">Execution Reference Documents</p>
                        <div class="flex flex-wrap gap-2">${renderCitations(data.citations.sop)}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Q&A ASSISTANT -->
                <div class="mt-6 bg-[#0f172a] rounded-lg border border-slate-700 p-4 shadow-lg flex flex-col gap-3" id="qa-container" data-scenario="${data.id}">
                  <div class="flex items-center gap-2 border-b border-slate-700 pb-2">
                    <span class="text-xl">🤖</span>
                    <p class="text-[11px] text-blue-400 font-bold uppercase tracking-widest">Strict RAG Q&A Assistant <span class="tag-source">NLP</span></p>
                  </div>
                  <div id="qa-history" class="flex flex-col gap-3 max-h-[250px] overflow-y-auto pr-2" style="scrollbar-width: thin; scrollbar-color: #334155 #0f172a;">
                    <div class="self-start bg-[#1e293b] border border-slate-600 rounded p-3 max-w-[90%] shadow">
                      <p class="text-sm text-slate-300 leading-relaxed-body">The assistant is ready. Are there any specific parameters not listed in the SOP summary that you’d like to ask about? </p>
                    </div>
                  </div>
                  <div class="flex flex-col sm:flex-row gap-3 pt-2 mt-2 border-t border-slate-700">
                    <input id="qa-input" type="text" placeholder="Type in additional questions (e.g., bolt torque, alarm limits, tolerances)..." class="field flex-grow rounded px-4 py-2.5 text-sm">
                    <button id="qa-btn" class="btn-primary font-bold py-2.5 px-6 rounded text-sm whitespace-nowrap shadow">Ask</button>
                  </div>
                </div>
              `;
      }

      // BINDING EVENT Q&A (Diikat setelah HTML dicetak ke DOM)
      const qaBtn = document.getElementById("qa-btn");
      const qaInput = document.getElementById("qa-input");
      if (qaBtn && qaInput && !data.isUnknown) {
        qaBtn.addEventListener("click", processQA);
        qaInput.addEventListener("keypress", function (e) {
          if (e.key === "Enter") processQA();
        });
      }
    } catch (error) {
      console.error("Dashboard Rendering Error:", error);
      errorToast.innerHTML = `⚠️ Failed to render dashboard data. Please reload the page.`;
      errorToast.classList.remove("hidden");
      loadingView.classList.replace("view-visible", "view-hidden");
      searchView.classList.replace("view-hidden", "view-visible");
    }
  }

  // --- 5. LOGIKA Q&A (ANTI-ERROR) ---
  // --- 5. LOGIKA Q&A (DINAMIS & MULTI-DOKUMEN) ---
  function processQA() {
    const inp = document.getElementById("qa-input");
    if (!inp || inp.disabled) return;

    const val = inp.value.trim();
    const valLower = val.toLowerCase();
    const hist = document.getElementById("qa-history");
    const scID = document.getElementById("qa-container").dataset.scenario;

    if (!val) return;

    // Render Pesan User
    const userMsg = `<div class="self-end bg-blue-900/40 border border-blue-800 text-white text-sm rounded px-3 py-2 max-w-[85%] shadow">${val}</div>`;
    hist.insertAdjacentHTML("beforeend", userMsg);
    inp.value = "";
    hist.scrollTop = hist.scrollHeight;

    // Render Loading Indicator
    const lid = "load-" + Date.now();
    const loadMsg = `
            <div id="${lid}" class="self-start flex items-center gap-2 text-slate-400 text-xs mt-1 mb-1">
              <div class="w-3 h-3 border-2 border-slate-500 border-t-[var(--accent-blue)] rounded-full animate-spin"></div>
              Reviewing EDMS documents and datasheets....
            </div>`;
    hist.insertAdjacentHTML("beforeend", loadMsg);
    hist.scrollTop = hist.scrollHeight;

    // Simulasi Delay AI Processing
    setTimeout(() => {
      const loadEl = document.getElementById(lid);
      if (loadEl) loadEl.remove();

      let ans = "";
      let src = "";

      // Logika Pencarian Pintar (Strict RAG Mencari ke Dokumen Universal)
      if (
        valLower.includes("torsi") ||
        valLower.includes("torque") ||
        valLower.includes("baut")
      ) {
        ans = `According to the design specifications, the standard torque for the holding-down bolts (M16) is <strong class="text-amber-400">120 Nm</strong>.`;
        src = "Equipment-Datasheet-GA-1201A.pdf";
      } else if (
        valLower.includes("suhu") ||
        valLower.includes("panas") ||
        valLower.includes("temperature") ||
        valLower.includes("tshh")
      ) {
        ans = `According to Interlock SEQ-1201, the high-temperature trip limit (*High-High*) for TSHH-1201 is <strong class="text-amber-400">>96 °C</strong>[cite: 14]. Ensure that the cooling and lubrication systems are monitored.`;
        src = "Interlock-Logic-Diagram-GA-1201A.pdf";
      } else if (
        valLower.includes("oli") ||
        valLower.includes("oil") ||
        valLower.includes("lube") ||
        valLower.includes("iso")
      ) {
        ans = `The pump lubrication system uses <strong class="text-amber-400">ISO VG 68</strong> oil, with the level in the *sight glass* at the midpoint (Per OPL-02). `;
        src = "OPL-02-Bearing-Oil-Bath-Level-&-Greasing.pdf";
      } else if (
        valLower.includes("vibrasi") ||
        valLower.includes("getar") ||
        valLower.includes("vibration")
      ) {
        ans = `The critical vibration threshold (*High-High*) for the VSHH-1201 is <strong class="text-amber-400">7.1 mm/s</strong>[cite: 14], with a normal *baseline* in the range of <strong class="text-amber-400">2.5 mm/s</strong>. `;
        src = "Interlock-Logic-Diagram-GA-1201A.pdf";
      } else {
        // Jawaban universal jika pertanyaannya bebas (meskipun di skenario unknown/novel)
        ans = `Although this specific anomaly has not been documented in the SAP PM history, technical documentation indicates that the GA-1201A operational parameters are set according to the standard design. Please double-check the P&ID or escalate the issue to your supervisor if system safety is at stake. `;
        src = "P&ID-GA-1201A.png";
      }

      let srcHtml = src
        ? `<div class="flex items-center gap-2 border-t border-slate-700 pt-2 mt-2"><span class="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Source:</span><span class="inline-flex items-center gap-1 bg-slate-800 border border-slate-600 px-2 py-0.5 rounded text-[9px] text-slate-300"><i class="fa-solid fa-file-pdf"></i> ${src}</span></div>`
        : "";
      const aiMsg = `<div class="self-start bg-[#1e293b] border border-slate-600 rounded p-3 max-w-[95%] text-sm text-slate-200 shadow leading-relaxed-body">${ans}${srcHtml}</div>`;

      hist.insertAdjacentHTML("beforeend", aiMsg);
      hist.scrollTop = hist.scrollHeight;
    }, 1200);
  }
  // --- 6. EVENT HANDLERS UTAMA ---
  function executeSearch() {
    const query = inputField.value.toLowerCase();
    if (query.trim() === "") {
      inputField.focus();
      return;
    }

    // Pencocokan Skenario
    // ================= LOGIKA FILTER DISIPLIN (KILLER FEATURE) =================
    const selectedDiscipline = document.getElementById("discipline").value; // Ambil nilai dropdown

    let matchedData = null;
    let isKeywordRecognized = false;

    // 1. Looping untuk mengecek kecocokan keyword dan disiplin
    for (let i = 0; i < scenarios.length; i++) {
      let sc = scenarios[i];
      const hasKeyword = sc.keywords.some((kw) => query.includes(kw));

      if (hasKeyword) {
        isKeywordRecognized = true; // Sistem mengenali kata kunci ini (misal: "vibration")

        // 2. Cek apakah disiplinnya cocok (atau user memilih "All")
        if (
          selectedDiscipline === "All" ||
          sc.discipline.includes(selectedDiscipline)
        ) {
          matchedData = sc;
          break;
        }
      }
    }

    // 3. JIKA KEYWORD DIKENALI (misal: vibration) TAPI DISIPLINNYA SALAH (misal: Instrument),
    // AI menolak berhalusinasi dan memaksa masuk ke skenario ZONK (0% Match / Zero Data).
    if (!matchedData && isKeywordRecognized) {
      matchedData = scenarios.find((s) => s.id === "unknown");
    }
    // ===========================================================================

    if (matchedData) {
      errorToast.classList.add("hidden");

      // Transisi ke Loading
      searchView.classList.replace("view-visible", "view-hidden");
      loadingView.classList.replace("view-hidden", "view-visible");
      window.scrollTo({ top: 0, behavior: "auto" });

      let stageIndex = 0;
      loadingText.innerText = loadingStages[0];

      // Interval Loading Skenario
      const loadingInterval = setInterval(() => {
        stageIndex++;
        if (stageIndex < loadingStages.length) {
          loadingText.innerText = loadingStages[stageIndex];
        } else {
          clearInterval(loadingInterval);
          buildDashboard(matchedData);

          // Transisi dari Loading ke Dashboard
          loadingView.classList.replace("view-visible", "view-hidden");
          dashboardView.classList.replace("view-hidden", "view-visible");
        }
      }, 700);
    } else {
      // Tampilkan Peringatan Jika Keyword Tidak Ada
      errorToast.innerHTML = `⚠️ Sorry, aside from the Hexana Pump, the other tools are still under development, so please try using the suggested keywords (below the input field), then pay attention to the discipline, and refresh first.</b>.`;
      errorToast.classList.remove("hidden");
      inputField.classList.add("border-red-500");
      setTimeout(() => inputField.classList.remove("border-red-500"), 3000);
    }
  }

  function returnToSearch() {
    inputField.value = "";
    dashboardView.classList.replace("view-visible", "view-hidden");
    searchView.classList.replace("view-hidden", "view-visible");
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  // BINDING EVENT
  analyzeBtn.addEventListener("click", executeSearch);
  inputField.addEventListener("keydown", function (e) {
    if (e.key === "Enter") executeSearch();
  });

  // Listener Global untuk Tombol "New Query"
  document.addEventListener("click", function (e) {
    if (
      e.target &&
      (e.target.id === "new-query-btn" || e.target.closest("#new-query-btn"))
    ) {
      returnToSearch();
    }
  });
})();
function closeModalAndReset() {
  // 1. Sembunyikan modal
  const modal = document.getElementById("success-modal");
  if (modal) modal.style.display = "none";

  // 2. Refresh halaman untuk mereset total ke tampilan form pencarian awal
  window.location.reload();
}
