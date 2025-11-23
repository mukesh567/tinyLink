import React from 'react';
import { Link } from 'react-router-dom';

function truncate(s, n = 60) {
    if (!s) return '';
    return s.length > n ? s.slice(0, n) + '…' : s;
}

export default function LinkTable({ links, onDelete }) {
    if (!links || links.length === 0) {
        return <div className="text-slate-500">No links yet. Add one above.</div>
    }
    return (
        <div className="mt-4 overflow-x-auto">
            <table className="min-w-full bg-white rounded-md shadow-sm">
                <thead>
                    <tr className="text-left text-sm text-slate-500">
                        <th className="px-4 py-3">Code</th>
                        <th className="px-4 py-3">Target</th>
                        <th className="px-4 py-3">Clicks</th>
                        <th className="px-4 py-3">Last Clicked</th>
                        <th className="px-4 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {links.map(l => (
                        <tr key={l.code} className="border-t">
                            <td className="px-4 py-3">
                                <a className="font-mono text-sky-600" href={`${import.meta.env.VITE_API_BASE}/${l.code}`} target="_blank" rel="noreferrer">{l.code}</a>
                            </td>
                            <td className="px-4 py-3">
                                <div className="max-w-xl">
                                    <div className="text-sm text-slate-700">{truncate(l.targetUrl, 80)}</div>
                                </div>
                            </td>
                            <td className="px-4 py-3">{l.clicks}</td>
                            <td className="px-4 py-3">{l.lastClicked ? new Date(l.lastClicked).toLocaleString() : '—'}</td>
                            <td className="px-4 py-3 space-x-2">
                                <Link to={`/code/${l.code}`} className="text-sm px-2 py-1 bg-slate-100 rounded">Stats</Link>
                                <button onClick={() => navigator.clipboard.writeText(import.meta.env.VITE_API_BASE + '/' + l.code)} className="text-sm px-2 py-1 bg-sky-50 rounded">Copy</button>
                                <button onClick={() => onDelete(l.code)} className="text-sm px-2 py-1 bg-red-50 text-red-600 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
