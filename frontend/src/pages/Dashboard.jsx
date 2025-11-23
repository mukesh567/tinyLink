import React, { useEffect, useState } from 'react';
import AddLinkForm from '../components/AddLinkForm';
import LinkTable from '../components/LinkTable';
import { listLinks, createLink, deleteLink } from '../api';

export default function Dashboard() {
    const [links, setLinks] = useState([]);
    const [filteredLinks, setFilteredLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    async function load() {
        setLoading(true);
        setError(null);
        try {
            const data = await listLinks();
            setLinks(data);
            setFilteredLinks(data);
        } catch (err) {
            setError(err.message || "Failed to load");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    // search filter handler
    useEffect(() => {
        const term = search.toLowerCase();
        const filtered = links.filter(l =>
            l.code.toLowerCase().includes(term) ||
            l.targetUrl.toLowerCase().includes(term)
        );
        setFilteredLinks(filtered);
    }, [search, links]);

    async function handleCreate(payload) {
        await createLink(payload);
        await load();
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

            {/* 🔍 Search Bar */}
            <div className="mt-6">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by code or URL"
                    className="w-full max-w-sm border rounded-md px-3 py-2 shadow-sm"
                />
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold text-slate-700">All links</h3>
                {loading && <div className="py-6 text-slate-500">Loading...</div>}
                {error && <div className="py-6 text-red-600">{error}</div>}
                {!loading && !error && (
                    <LinkTable links={filteredLinks} onDelete={handleDelete} />
                )}
            </div>
        </div>
    );
}
