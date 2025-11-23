import React, { useEffect, useState } from 'react';
import AddLinkForm from '../components/AddLinkForm';
import LinkTable from '../components/LinkTable';
import { listLinks, createLink, deleteLink } from '../api';

export default function Dashboard() {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function load() {
        setLoading(true); setError(null);
        try {
            const data = await listLinks();
            setLinks(data);
        } catch (err) {
            setError(err.message || 'Failed to load');
        } finally { setLoading(false); }
    }

    useEffect(() => { load() }, []);

    async function handleCreate(payload) {
        const newLink = await createLink(payload);
        // refresh list
        await load();
        return newLink;
    }

    async function handleDelete(code) {
        if (!confirm(`Delete ${code}?`)) return;
        await deleteLink(code);
        await load();
    }

    return (
        <div>
            <div className="bg-white p-6 rounded-md shadow">
                <h2 className="text-lg font-semibold text-slate-700">Create short link</h2>
                <p className="text-sm text-slate-500 mb-4">Paste a destination URL and optional custom code.</p>
                <AddLinkForm onCreate={handleCreate} />
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold text-slate-700">All links</h3>
                {loading && <div className="py-6 text-slate-500">Loading...</div>}
                {error && <div className="py-6 text-red-600">{error}</div>}
                {!loading && !error && <LinkTable links={links} onDelete={handleDelete} />}
            </div>
        </div>
    );
}
