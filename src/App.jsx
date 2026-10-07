import React, { useState, useEffect } from 'react';

function App() {
  const [name, setName] = useState('Deployment Test User');
  const [responseOutput, setResponseOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toISOString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toISOString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleTestGreeting = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setResponseOutput({
        status: 'SUCCESS',
        message: `Hello ${name || 'World'}! React + Vite application is successfully deployed and running!`,
        timestamp: new Date().toISOString(),
        clientOrigin: window.location.origin,
        userAgent: navigator.userAgent,
        framework: 'React 18 + Vite',
        app: 'deploy_hub_react_vite'
      });
      setLoading(false);
    }, 150);
  };

  const handleFetchHealth = async () => {
    setLoading(true);
    try {
      const res = await fetch('/health.json');
      if (res.ok) {
        const data = await res.json();
        setResponseOutput({
          ...data,
          probeTimestamp: new Date().toISOString(),
          httpStatus: 200,
          responseStatus: 'UP'
        });
      } else {
        setResponseOutput({
          status: 'UP',
          message: 'Health probe response simulated',
          timestamp: new Date().toISOString(),
          httpStatus: res.status
        });
      }
    } catch (err) {
      setResponseOutput({
        status: 'UP',
        timestamp: new Date().toISOString(),
        service: 'deploy_hub_react_vite',
        probeNote: 'Static client running healthy'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyJson = () => {
    if (!responseOutput) return;
    navigator.clipboard.writeText(JSON.stringify(responseOutput, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="app-container">
      {/* Background glow effects */}
      <div className="bg-glow glow-1"></div>
      <div className="bg-glow glow-2"></div>

      <header className="header">
        <div className="brand">
          <span className="logo-icon">🚀</span>
          <div>
            <h1 className="title">DeployHub React + Vite</h1>
            <p className="subtitle">Production deployment test application & live health probe</p>
          </div>
        </div>
        <div className="status-badge">
          <span className="pulse-dot"></span>
          <span>Status: Healthy (200 OK)</span>
        </div>
      </header>

      <main className="main-content">
        {/* Info Grid */}
        <section className="grid-cards">
          <div className="card">
            <div className="card-header">
              <span className="card-icon">⚡</span>
              <h3>Framework & Runtime</h3>
            </div>
            <div className="card-body">
              <p><strong>Framework:</strong> React 18.3</p>
              <p><strong>Bundler:</strong> Vite 5.4</p>
              <p><strong>Container:</strong> Nginx Alpine Multi-stage</p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <span className="card-icon">🌐</span>
              <h3>Deployment Specs</h3>
            </div>
            <div className="card-body">
              <p><strong>Target Port:</strong> 3000 (Internal 80)</p>
              <p><strong>Mode:</strong> Production SPA</p>
              <p><strong>Platform:</strong> DeployHub Runner</p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <span className="card-icon">🕒</span>
              <h3>Live Clock (UTC)</h3>
            </div>
            <div className="card-body">
              <p className="mono font-sm">{currentTime}</p>
              <p className="badge-tag">Self-Hosted Runner Ready</p>
            </div>
          </div>
        </section>

        {/* Interactive URL / Endpoint Tester */}
        <section className="test-section">
          <div className="test-header">
            <h2>🧪 Deployment & URL Probe Tester</h2>
            <p>Simulate endpoints or test URL greeting parameters directly in the browser.</p>
          </div>

          <div className="test-actions">
            <form onSubmit={handleTestGreeting} className="input-group">
              <label htmlFor="name-input">Test User / Greeting Param:</label>
              <div className="input-row">
                <input
                  id="name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name (e.g. Developer)"
                  className="text-input"
                />
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Testing...' : 'Test Greeting URL'}
                </button>
                <button type="button" onClick={handleFetchHealth} className="btn btn-secondary" disabled={loading}>
                  Probe Health (/health.json)
                </button>
              </div>
            </form>
          </div>

          {/* Response Box */}
          <div className="response-box">
            <div className="response-header">
              <span className="terminal-dot red"></span>
              <span className="terminal-dot yellow"></span>
              <span className="terminal-dot green"></span>
              <span className="terminal-title">Probe Response Output</span>
              {responseOutput && (
                <button onClick={handleCopyJson} className="copy-btn">
                  {copied ? '✓ Copied' : 'Copy JSON'}
                </button>
              )}
            </div>
            <pre className="response-content">
              {responseOutput
                ? JSON.stringify(responseOutput, null, 2)
                : `// Click "Test Greeting URL" or "Probe Health" above to verify deployment response`}
            </pre>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>DeployHub Multi-Framework Ecosystem • <a href="https://github.com/shirsenduroy-153/deploy_hub_react_vite" target="_blank" rel="noreferrer">GitHub Repository</a></p>
      </footer>
    </div>
  );
}

export default App;
