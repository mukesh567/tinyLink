const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export async function listLinks() {
    const res = await fetch(`${API_BASE}/api/links`);
    if (!res.ok) throw new Error('Failed to fetch links');
    return res.json();
}

export async function createLink(data) {
    const res = await fetch(`${API_BASE}/api/links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) {
        const err = await res.json();
        const msg = err?.error || 'Create failed';
        const status = res.status;
        const e = new Error(msg);
        e.status = status;
        throw e;
    }
    return res.json();
}

export async function deleteLink(code) {
    const res = await fetch(`${API_BASE}/api/links/${encodeURIComponent(code)}`, {
        method: 'DELETE'
    });
    if (!res.ok) throw new Error('Delete failed');
    return res.json();
}

export async function getLink(code) {
    const res = await fetch(`${API_BASE}/api/links/${encodeURIComponent(code)}`);
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const e = new Error(err?.error || 'Not found');
        e.status = res.status;
        throw e;
    }
    return res.json();
}
