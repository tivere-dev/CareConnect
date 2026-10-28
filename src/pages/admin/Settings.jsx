import { CheckCircle2, HelpCircle, ImagePlus, MinusCircle, UserPlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { SETTINGS_STORAGE_KEY, SETTINGS_UPDATED_EVENT } from "../../constants/adminSettings";

const defaultSettings = {
  platformName: "CareConnect Healthcare",
  adminEmail: "admin@careconnect.com",
  hospitalName: "Central City Medical Center",
  contactNumber: "+1 (555) 000-1234",
  timezone: "EST",
  address: "123 Health Ave, Suite 500, Central City, NY 10001",
  logoDataUrl: "",
  notifications: {
    email: true,
    sms: false,
    logs: true,
  },
  roles: [
    { role: "Administrator", dashboard: true, patients: true, doctors: true, settings: true },
    { role: "Doctor", dashboard: true, patients: true, doctors: false, settings: false },
    { role: "Receptionist", dashboard: true, patients: true, doctors: false, settings: false },
  ],
};

function PermissionIcon({ enabled }) {
  return enabled ? (
    <CheckCircle2 size={16} className="settings-permission-on" />
  ) : (
    <MinusCircle size={16} className="settings-permission-off" />
  );
}

export default function SettingsPage() {
  const navigate = useNavigate();
  const logoInputRef = useRef(null);
  const [settings, setSettings] = useState(defaultSettings);
  const [saveState, setSaveState] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      setSettings((prev) => ({
        ...prev,
        ...parsed,
        notifications: { ...prev.notifications, ...parsed.notifications },
        roles: Array.isArray(parsed.roles) ? parsed.roles : prev.roles,
      }));
    } catch {
      localStorage.removeItem(SETTINGS_STORAGE_KEY);
    }
  }, []);

  function updateField(field, value) {
    setSettings((prev) => ({ ...prev, [field]: value }));
  }

  function updateNotification(field) {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: !prev.notifications[field],
      },
    }));
  }

  function togglePermission(roleIndex, key) {
    setSettings((prev) => ({
      ...prev,
      roles: prev.roles.map((role, index) =>
        index === roleIndex ? { ...role, [key]: !role[key] } : role,
      ),
    }));
  }

  function handleManageRoles() {
    const newRoleName = window.prompt("Enter a new role name:");
    if (!newRoleName || !newRoleName.trim()) return;
    const role = newRoleName.trim();

    setSettings((prev) => {
      if (prev.roles.some((item) => item.role.toLowerCase() === role.toLowerCase())) {
        return prev;
      }

      return {
        ...prev,
        roles: [
          ...prev.roles,
          { role, dashboard: false, patients: false, doctors: false, settings: false },
        ],
      };
    });
  }

  function handleLogoPick(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/png", "image/svg+xml"];
    if (!allowed.includes(file.type) || file.size > 2 * 1024 * 1024) {
      window.alert("Please select JPG, PNG, or SVG under 2MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateField("logoDataUrl", String(reader.result));
      setSaveState("Logo selected. Click Save Changes to persist.");
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  }

  function handleSave() {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    window.dispatchEvent(new CustomEvent(SETTINGS_UPDATED_EVENT, { detail: settings }));
    setSaveState("Settings saved successfully.");
  }

  function handleReset() {
    setSettings(defaultSettings);
    localStorage.removeItem(SETTINGS_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(SETTINGS_UPDATED_EVENT, { detail: defaultSettings }));
    setSaveState("Settings reset to default values.");
  }

  return (
    <div className="admin-shell settings-shell">
      <AdminSidebar />

      <main className="settings-main">
        <header className="settings-topbar">
          <h1>System Settings</h1>
          <div className="settings-top-actions">
            <button
              type="button"
              className="settings-icon-btn"
              aria-label="Help"
              onClick={() =>
                window.alert("Update values, then click Save Changes at the bottom of the page.")
              }
            >
              <HelpCircle size={18} />
            </button>
          </div>
        </header>

        <div className="settings-content">
          {saveState ? <p className="settings-save-state">{saveState}</p> : null}
          <section className="settings-card">
            <div className="settings-card-head">
              <h2>General Configuration</h2>
              <p>Manage your platform name and brand assets.</p>
            </div>

            <div className="settings-grid-2">
              <label>
                Platform Name
                <input
                  type="text"
                  value={settings.platformName}
                  onChange={(event) => updateField("platformName", event.target.value)}
                />
              </label>
              <label>
                Admin Email Address
                <input
                  type="email"
                  value={settings.adminEmail}
                  onChange={(event) => updateField("adminEmail", event.target.value)}
                />
              </label>
            </div>

            <div className="settings-logo-row">
              <div>
                <p className="settings-label">Platform Logo</p>
                <div className="settings-logo-uploader">
                  <div className="settings-logo-box">
                    {settings.logoDataUrl ? (
                      <img src={settings.logoDataUrl} alt="Platform logo preview" />
                    ) : (
                      <ImagePlus size={18} />
                    )}
                  </div>
                  <div>
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept=".jpg,.jpeg,.png,.svg,image/*"
                      className="settings-file-input"
                      onChange={handleLogoPick}
                    />
                    <button
                      type="button"
                      className="settings-secondary-btn"
                      onClick={() => logoInputRef.current?.click()}
                    >
                      {settings.logoDataUrl ? "Replace Logo" : "Change Logo"}
                    </button>
                    <p>JPG, PNG or SVG. Max size 2MB.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="settings-card">
            <div className="settings-card-head">
              <h2>Hospital Information</h2>
              <p>Details used for billing and patient communications.</p>
            </div>

            <div className="settings-grid-1">
              <label>
                Hospital/Clinic Name
                <input
                  type="text"
                  value={settings.hospitalName}
                  onChange={(event) => updateField("hospitalName", event.target.value)}
                />
              </label>
            </div>

            <div className="settings-grid-2">
              <label>
                Contact Number
                <input
                  type="text"
                  value={settings.contactNumber}
                  onChange={(event) => updateField("contactNumber", event.target.value)}
                />
              </label>
              <label>
                Time Zone
                <select
                  value={settings.timezone}
                  onChange={(event) => updateField("timezone", event.target.value)}
                >
                  <option value="EST">Eastern Standard Time (EST)</option>
                  <option value="CST">Central Standard Time (CST)</option>
                  <option value="MST">Mountain Standard Time (MST)</option>
                  <option value="PST">Pacific Standard Time (PST)</option>
                </select>
              </label>
            </div>

            <div className="settings-grid-1">
              <label>
                Physical Address
                <textarea
                  value={settings.address}
                  rows={3}
                  onChange={(event) => updateField("address", event.target.value)}
                />
              </label>
            </div>
          </section>

          <section className="settings-card">
            <div className="settings-card-head">
              <h2>Notifications</h2>
              <p>Choose how patients and staff stay informed.</p>
            </div>

            <div className="settings-toggle-list">
              <div className="settings-toggle-row">
                <div>
                  <h3>Email Notifications</h3>
                  <p>Send appointment confirmations and reminders via email.</p>
                </div>
                <button
                  type="button"
                  className={`settings-toggle ${settings.notifications.email ? "on" : ""}`}
                  onClick={() => updateNotification("email")}
                  aria-label="Toggle email notifications"
                >
                  <span />
                </button>
              </div>

              <div className="settings-toggle-row">
                <div>
                  <h3>SMS Reminders</h3>
                  <p>Send text messages for upcoming appointments (may incur costs).</p>
                </div>
                <button
                  type="button"
                  className={`settings-toggle ${settings.notifications.sms ? "on" : ""}`}
                  onClick={() => updateNotification("sms")}
                  aria-label="Toggle sms reminders"
                >
                  <span />
                </button>
              </div>

              <div className="settings-toggle-row">
                <div>
                  <h3>System Activity Logs</h3>
                  <p>Notify admin about critical system changes or errors.</p>
                </div>
                <button
                  type="button"
                  className={`settings-toggle ${settings.notifications.logs ? "on" : ""}`}
                  onClick={() => updateNotification("logs")}
                  aria-label="Toggle system activity logs"
                >
                  <span />
                </button>
              </div>
            </div>
          </section>

          <section className="settings-card">
            <div className="settings-card-head">
              <h2>User Permissions &amp; Roles</h2>
              <p>Define access levels for different staff groups.</p>
            </div>

            <div className="settings-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>ROLE</th>
                    <th>DASHBOARD</th>
                    <th>PATIENTS</th>
                    <th>DOCTORS</th>
                    <th>SETTINGS</th>
                  </tr>
                </thead>
                <tbody>
                  {settings.roles.map((row, index) => (
                    <tr key={row.role}>
                      <td>{row.role}</td>
                      <td>
                        <button
                          type="button"
                          className="settings-permission-btn"
                          onClick={() => togglePermission(index, "dashboard")}
                          aria-label={`Toggle dashboard permission for ${row.role}`}
                        >
                          <PermissionIcon enabled={row.dashboard} />
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="settings-permission-btn"
                          onClick={() => togglePermission(index, "patients")}
                          aria-label={`Toggle patients permission for ${row.role}`}
                        >
                          <PermissionIcon enabled={row.patients} />
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="settings-permission-btn"
                          onClick={() => togglePermission(index, "doctors")}
                          aria-label={`Toggle doctors permission for ${row.role}`}
                        >
                          <PermissionIcon enabled={row.doctors} />
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="settings-permission-btn"
                          onClick={() => togglePermission(index, "settings")}
                          aria-label={`Toggle settings permission for ${row.role}`}
                        >
                          <PermissionIcon enabled={row.settings} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="settings-table-foot" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <button type="button" className="settings-link-btn" onClick={handleManageRoles}>
                Manage Custom Roles
              </button>
              <button
                type="button"
                className="settings-save-btn"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
                onClick={() => navigate("/admin/admins/new")}
              >
                <UserPlus size={16} />
                Add New Admin
              </button>
            </div>
          </section>

          <div className="settings-footer-actions">
            <button type="button" className="settings-secondary-btn" onClick={handleReset}>
              Reset to Default
            </button>
            <button type="button" className="settings-save-btn" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
