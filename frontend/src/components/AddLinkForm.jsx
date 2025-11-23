import React, { useState } from 'react';

export default function AddLinkForm({ onCreate }) {
    const [targetUrl, setTargetUrl] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const validateCode = (c) => !c || /^[A-Za-z0-9]{6,8}$/.test(c);

    async function submit(e) {
        e.preventDefault();
        setError(null);
        if (!targetUrl) return setError('Please enter a URL');
        if (code && !validateCode(code)) return setError('Code must be 6-8 alphanumeric characters');
        setLoading(true);
        try {
            await onCreate({ targetUrl, code: code || undefined });
            setTargetUrl(''); setCode('');
        } catch (err) {
            setError(err.message || 'Failed');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={submit} className="space-y-3">
            <div>
                <label className="text-sm font-medium text-slate-600">Target URL</label>
                <input value={targetUrl} onChange={e => setTargetUrl(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" placeholder="https://example.com/path" />
            </div>
            <div>
                <label className="text-sm font-medium text-slate-600">Custom Code (optional)</label>
                <input value={code} onChange={e => setCode(e.target.value)} className="mt-1 block w-1/2 rounded-md border px-3 py-2" placeholder="6-8 letters/numbers" />
            </div>
            {error && <div className="text-sm text-red-600">{error}</div>}
            <div>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-sky-600 text-white rounded-md disabled:opacity-60">
                    {loading ? 'Creating...' : 'Create'}
                </button>
            </div>
        </form>
    );
}
