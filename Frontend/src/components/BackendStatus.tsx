import React, { useEffect, useState } from 'react';
import api from '@/lib/api';

const BackendStatus = () => {
  const [status, setStatus] = useState<{ ok?: boolean; dbConnected?: boolean; msg?: string } | null>(null);

  useEffect(() => {
    let mounted = true;
    async function check() {
      try {
        // use the explicit health endpoint we added to the API
        const base = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        // normalize: ensure base doesn't end with '/'
        const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
        const health = await fetch(normalizedBase + '/health');
        if (!health.ok) throw new Error(`HTTP ${health.status}`);
        const data = await health.json();
        if (mounted) setStatus({ ok: true, dbConnected: !!data.dbConnected });
      } catch (err: any) {
        if (mounted) setStatus({ ok: false, msg: err.message || String(err) });
      }
    }
    check();
    const interval = setInterval(check, 5000);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  const apiURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const color = status === null ? 'bg-muted' : status.ok ? 'bg-success' : 'bg-danger';
  const title = status === null ? 'Checking backend...' : status.ok ? `Backend Online - DB: ${status.dbConnected ? 'connected' : 'disconnected'}` : `Backend Unreachable: ${status.msg}`;

  return (
    <div className="flex items-center space-x-2">
      <a
        href={apiURL.replace(/\/api$/, '')}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2"
      >
        <span title={title} className={`inline-block h-2 w-2 rounded-full ${color}`} />
      </a>
      <div className="hidden md:flex flex-col text-sm text-muted-foreground">
        <span>{title}</span>
        {status && status.ok === false && (
          <span className="text-xs text-muted-foreground mt-1">Try: <code>cd backend && npm install && npm run dev</code> and ensure MongoDB is running, then press Recheck.</span>
        )}
        <div className="flex items-center space-x-2 mt-1">
          <a href="https://github.com/Hilda-18/PLP-FINAL-PROJECT_SMART-TRAFFIC-SYSTEM/tree/main/backend" target="_blank" rel="noopener noreferrer" className="underline text-xs">View backend on GitHub</a>
          <button className="text-xs underline ml-2" onClick={() => { (async () => { try { const base = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'; await fetch(base + '/health'); setStatus(null); } catch (e) { setStatus({ ok: false, msg: (e as any).message || String(e) }); } })(); }}>Recheck</button>
        </div>
      </div>
    </div>
  );
};

export default BackendStatus;
