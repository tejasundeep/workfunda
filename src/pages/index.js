import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
    const [workflows, setWorkflows] = useState([]);

    useEffect(() => {
        fetch("/api/workflows")
            .then((res) => res.json())
            .then((data) => setWorkflows(data))
            .catch((err) => console.error("Failed to load workflows:", err));
    }, []);

    return (
        <div style={{ padding: "2rem" }}>
            <h1>My n8n-like Clone</h1>
            <p>
                <Link href="/builder">Go to Workflow Builder</Link>
            </p>

            <h2>Saved Workflows</h2>
            {workflows.length === 0 ? (
                <p>No workflows found.</p>
            ) : (
                <ul>
                    {workflows.map((w) => (
                        <li key={w.id}>
                            <Link href={`/workflows/${w.id}`}>
                                {w.name || w.id}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
