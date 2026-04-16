import { Bell, Download, FileText } from "lucide-react";
import { useMemo, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";

const reportsByRange = {
  last7: {
    metrics: [
      { label: "TOTAL REVENUE", value: "$38,400", delta: "+4%", tone: "up" },
      { label: "AVG. PATIENT RATING", value: "4.7/5.0", delta: "+0.1", tone: "up" },
      { label: "NEW PATIENTS", value: "196", delta: "+2%", tone: "up" },
      { label: "COMPLETION RATE", value: "93.4%", delta: "-1%", tone: "down" },
    ],
    chartPoints: "40,190 140,184 240,175 340,168 440,160 540,152 640,145",
  },
  last30: {
    metrics: [
      { label: "TOTAL REVENUE", value: "$142,500", delta: "+12%", tone: "up" },
      { label: "AVG. PATIENT RATING", value: "4.8/5.0", delta: "+0.3", tone: "up" },
      { label: "NEW PATIENTS", value: "842", delta: "~0%", tone: "flat" },
      { label: "COMPLETION RATE", value: "94.2%", delta: "-2%", tone: "down" },
    ],
    chartPoints: "40,190 140,176 240,168 340,152 440,146 540,132 640,118",
  },
  quarterly: {
    metrics: [
      { label: "TOTAL REVENUE", value: "$421,900", delta: "+18%", tone: "up" },
      { label: "AVG. PATIENT RATING", value: "4.9/5.0", delta: "+0.5", tone: "up" },
      { label: "NEW PATIENTS", value: "2,364", delta: "+7%", tone: "up" },
      { label: "COMPLETION RATE", value: "95.1%", delta: "+1%", tone: "up" },
    ],
    chartPoints: "40,198 140,186 240,170 340,154 440,138 540,124 640,108",
  },
};

const specializations = [
  { label: "Cardiology", percent: 35, color: "#1a9cdd" },
  { label: "Neurology", percent: 25, color: "#10968f" },
  { label: "Pediatrics", percent: 20, color: "#2fc4b2" },
  { label: "Other", percent: 20, color: "#72c1eb" },
];

const satisfaction = [
  { label: "Communication", score: "4.9/5.0", width: "98%", color: "#12968e" },
  { label: "Wait Time", score: "4.2/5.0", width: "84%", color: "#1a9cdd" },
  { label: "Facility Cleanliness", score: "4.8/5.0", width: "96%", color: "#12968e" },
  { label: "Staff Friendliness", score: "4.7/5.0", width: "94%", color: "#12968e" },
];

const initialNotifications = [
  { id: 1, text: "Monthly finance report is ready", read: false },
  { id: 2, text: "3 appointments marked completed", read: false },
  { id: 3, text: "System backup completed", read: true },
];

function RevenueChart({ points }) {
  return (
    <svg className="reports-chart" viewBox="0 0 680 260" preserveAspectRatio="none">
      <line x1="20" y1="30" x2="660" y2="30" className="reports-grid" />
      <line x1="20" y1="95" x2="660" y2="95" className="reports-grid" />
      <line x1="20" y1="160" x2="660" y2="160" className="reports-grid" />
      <line x1="20" y1="225" x2="660" y2="225" className="reports-grid" />

      <polyline className="reports-line" points={points} />
    </svg>
  );
}

export default function ReportsPage() {
  const [selectedRange, setSelectedRange] = useState("last30");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const rangeData = reportsByRange[selectedRange];
  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications],
  );

  function handleMarkAllRead() {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  }

  function handleClearNotifications() {
    setNotifications([]);
  }

  function handleExportCsv() {
    const rows = [
      ["Section", "Label", "Value", "Delta"],
      ...rangeData.metrics.map((metric) => ["Metrics", metric.label, metric.value, metric.delta]),
      ...specializations.map((item) => ["Top Specializations", item.label, `${item.percent}%`, ""]),
      ...satisfaction.map((item) => ["Patient Satisfaction", item.label, item.score, ""]),
    ];

    const csvContent = rows
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `healthcare-report-${selectedRange}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function handleExportPdf() {
    const popup = window.open("", "_blank", "width=900,height=700");
    if (!popup) return;

    const metricRows = rangeData.metrics
      .map((metric) => `<tr><td>${metric.label}</td><td>${metric.value}</td><td>${metric.delta}</td></tr>`)
      .join("");

    popup.document.write(`
      <html>
        <head>
          <title>Healthcare Report (${selectedRange})</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; color: #1f2937; }
            h1 { margin: 0 0 8px; }
            p { margin: 0 0 16px; color: #64748b; }
            table { width: 100%; border-collapse: collapse; margin-top: 12px; }
            th, td { border: 1px solid #dbe2f0; padding: 10px; text-align: left; }
            th { background: #f4f6fb; }
          </style>
        </head>
        <body>
          <h1>Healthcare Reports Dashboard</h1>
          <p>Range: ${selectedRange}</p>
          <h2>Performance Metrics</h2>
          <table>
            <thead><tr><th>Metric</th><th>Value</th><th>Delta</th></tr></thead>
            <tbody>${metricRows}</tbody>
          </table>
        </body>
      </html>
    `);

    popup.document.close();
    popup.focus();
    popup.print();
  }

  return (
    <div className="admin-shell reports-shell">
      <AdminSidebar />

      <main className="reports-main">
        <header className="reports-topbar">
          <h1>Healthcare Reports Dashboard</h1>

          <div className="reports-top-actions">
            <button type="button" className="reports-outline-btn" onClick={handleExportPdf}>
              <FileText size={16} />
              <span>Export PDF</span>
            </button>
            <button type="button" className="reports-outline-btn" onClick={handleExportCsv}>
              <Download size={16} />
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              className="reports-notify"
              aria-label="Notifications"
              onClick={() => setShowNotifications((prev) => !prev)}
            >
              <Bell size={18} />
              {unreadCount > 0 ? <span className="reports-notify-dot" /> : null}
            </button>
          </div>
        </header>

        {showNotifications ? (
          <section className="reports-notify-panel">
            <div className="reports-notify-head">
              <h3>Notifications</h3>
              <div>
                <button type="button" onClick={handleMarkAllRead}>Mark all read</button>
                <button type="button" onClick={handleClearNotifications}>Clear</button>
              </div>
            </div>
            <div className="reports-notify-list">
              {notifications.length === 0 ? (
                <p>No notifications.</p>
              ) : (
                notifications.map((item) => (
                  <p key={item.id} className={item.read ? "" : "unread"}>
                    {item.text}
                  </p>
                ))
              )}
            </div>
          </section>
        ) : null}

        <div className="reports-content">
          <div className="reports-head-row">
            <div>
              <h2>Performance Analytics</h2>
              <p>Comprehensive overview of clinic operational and financial data.</p>
            </div>

            <div className="reports-range-switch">
              <button
                type="button"
                className={selectedRange === "last7" ? "active" : ""}
                onClick={() => setSelectedRange("last7")}
              >
                Last 7 Days
              </button>
              <button
                type="button"
                className={selectedRange === "last30" ? "active" : ""}
                onClick={() => setSelectedRange("last30")}
              >
                Last 30 Days
              </button>
              <button
                type="button"
                className={selectedRange === "quarterly" ? "active" : ""}
                onClick={() => setSelectedRange("quarterly")}
              >
                Quarterly
              </button>
            </div>
          </div>

          <section className="reports-metric-grid">
            {rangeData.metrics.map((item) => (
              <article className="reports-metric-card" key={item.label}>
                <p>{item.label}</p>
                <div>
                  <strong>{item.value}</strong>
                  <span className={`reports-delta ${item.tone}`}>{item.delta}</span>
                </div>
              </article>
            ))}
          </section>

          <section className="reports-mid-grid">
            <article className="reports-card reports-revenue-card">
              <div className="reports-card-head">
                <div>
                  <h3>Revenue Trends</h3>
                  <p>Monthly revenue growth from consultations and procedures</p>
                </div>
                <span className="reports-legend-dot">Revenue</span>
              </div>

              <RevenueChart points={rangeData.chartPoints} />

              <div className="reports-months">
                <span>JAN</span>
                <span>FEB</span>
                <span>MAR</span>
                <span>APR</span>
                <span>MAY</span>
                <span>JUN</span>
              </div>
            </article>

            <article className="reports-card reports-special-card">
              <h3>Top Specializations</h3>

              <div className="reports-donut-wrap">
                <div className="reports-donut" aria-hidden>
                  <span>1.2k</span>
                </div>
              </div>

              <div className="reports-list">
                {specializations.map((item) => (
                  <div key={item.label}>
                    <p>
                      <i style={{ background: item.color }} />
                      {item.label}
                    </p>
                    <span>{item.percent}%</span>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="reports-bottom-grid">
            <article className="reports-card">
              <div className="reports-card-head">
                <h3>Patient Satisfaction</h3>
                <span className="reports-target">Target: 4.9/5</span>
              </div>

              <div className="reports-bars">
                {satisfaction.map((item) => (
                  <div key={item.label} className="reports-bar-row">
                    <div>
                      <span>{item.label}</span>
                      <strong>{item.score}</strong>
                    </div>
                    <div className="reports-bar-track">
                      <div style={{ width: item.width, background: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="reports-card">
              <h3>Service Distribution</h3>
              <div className="reports-service-grid">
                <div>
                  <p>IN-PERSON</p>
                  <strong>1,240</strong>
                  <span>Consultations</span>
                </div>
                <div>
                  <p>TELE-HEALTH</p>
                  <strong>642</strong>
                  <span>Virtual Sessions</span>
                </div>
                <div>
                  <p>EMERGENCY</p>
                  <strong>124</strong>
                  <span>Priority Cases</span>
                </div>
                <div>
                  <p>SURGERY</p>
                  <strong>48</strong>
                  <span>Scheduled Procedures</span>
                </div>
              </div>

              <div className="reports-compliance">
                <p>Compliance Score</p>
                <span>99.2%</span>
              </div>
            </article>
          </section>
        </div>
      </main>
    </div>
  );
}
