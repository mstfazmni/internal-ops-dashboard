import "../../styles/Header.css";

export function Header() {
  return (
    <header className="app-header">
      <div className="app-header-container">
        <div>
          <h5 className="app-title">Internal Operations</h5>
          <div className="app-subtitle">
            Customer Risk & Account Monitoring
          </div>
        </div>

        <div className="app-meta">
          Admin Panel
        </div>
      </div>
    </header>
  );
}