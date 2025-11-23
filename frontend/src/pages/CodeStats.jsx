import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLink } from '../api';

export default function CodeStats() {
    const { code } = useParams();
    const [link, setLink] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await getLink(code);
                setLink(data);
            } catch (err) {
                setError(err.message || 'Not found');
            }
        })()
    }, [code]);

    if (error) return <div className="text-red-600">{error}</div>;
    if (!link) return <div className="text-slate-500">Loading...</div>;

    return (
        <div className="bg-white p-6 rounded-md shadow">
            <h2 className="text-2xl font-semibold">{link.code}</h2>
            <p className="text-slate-600 mt-1">{link.targetUrl}</p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border rounded">
                    <div className="text-sm text-slate-500">Clicks</div>
                    <div className="text-2xl font-bold">{link.clicks}</div>
                </div>
                <div className="p-4 border rounded">
                    <div className="text-sm text-slate-500">Last clicked</div>
                    <div className="text-lg">{link.lastClicked ? new Date(link.lastClicked).toLocaleString() : '—'}</div>
                </div>
            </div>

            <div className="mt-6">
                <a className="text-sm text-sky-600" href={`/${link.code}`} target="_blank" rel="noreferrer">Visit short link</a>
            </div>
        </div>
    );
}
