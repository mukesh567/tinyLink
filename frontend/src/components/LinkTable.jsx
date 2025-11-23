import React from "react";
import { Link } from "react-router-dom";

function truncate(s, n = 60) {
    if (!s) return "";
    return s.length > n ? s.slice(0, n) + "…" : s;
}

export default function LinkTable({ links, onDelete }) {
    if (!links || links.length === 0) {
        return <div className="text-slate-500">No links yet. Add one above.</div>;
    }

    return (
        <div className="mt-4 overflow-x-auto rounded-lg border bg-white shadow-sm">
            <table className="min-w-full text-sm sm:text-base">
                <thead className="bg-slate-50">
                    <tr className="text-left text-slate-600">
                        <th className="px-3 py-3 sm:px-4">Code</th>
                        <th className="px-3 py-3 sm:px-4">Target</th>
                        <th className="px-3 py-3 sm:px-4">Clicks</th>
                        <th className="px-3 py-3 sm:px-4">Last Clicked</th>
                        <th className="px-3 py-3 sm:px-4">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {links.map((l) => (
                        <tr key={l.code} className="border-t hover:bg-slate-50 transition">
                            <td className="px-3 py-3 sm:px-4 font-mono text-sky-600">
                                <a
                                    href={`${import.meta.env.VITE_API_BASE}/${l.code}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="break-all"
                                >
                                    {l.code}
                                </a>
                            </td>

                            <td className="px-3 py-3 sm:px-4 max-w-[200px] sm:max-w-md break-words">
                                <span className="text-slate-700">{truncate(l.targetUrl, 80)}</span>
                            </td>

                            <td className="px-3 py-3 sm:px-4">{l.clicks}</td>

                            <td className="px-3 py-3 sm:px-4 whitespace-nowrap">
                                {l.lastClicked ? new Date(l.lastClicked).toLocaleString() : "—"}
                            </td>

                            <td className="px-3 py-3 sm:px-4 space-x-1 sm:space-x-2">
                                <Link
                                    to={`/code/${l.code}`}
                                    className="text-xs sm:text-sm px-2 py-1 bg-slate-100 rounded"
                                >
                                    Stats
                                </Link>

                                <button
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            import.meta.env.VITE_API_BASE + "/" + l.code
                                        )
                                    }
                                    className="text-xs sm:text-sm px-2 py-1 bg-sky-50 rounded"
                                >
                                    Copy
                                </button>

                                <button
                                    onClick={() => onDelete(l.code)}
                                    className="text-xs sm:text-sm px-2 py-1 bg-red-50 text-red-600 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
