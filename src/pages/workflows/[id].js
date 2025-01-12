import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function WorkflowDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [workflow, setWorkflow] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        fetch("/api/workflows")
            .then((res) => res.json())
            .then((data) => {
                const wf = data.find((w) => w.id === id);
                if (wf) setWorkflow(wf);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const handleExecute = async () => {
        try {
            const res = await fetch(`/api/workflows/${id}/execute`, {
                method: "POST",
            });
            const json = await res.json();
            if (!res.ok) {
                alert("Execution error: " + (json.error || "Unknown error"));
                return;
            }
            alert(json.message || "Workflow executed!");
        } catch (err) {
            console.error(err);
            alert("Network error executing workflow.");
        }
    };

    if (loading) return <p style={{ padding: "1rem" }}>Loading...</p>;
    if (!workflow)
        return <p style={{ padding: "1rem" }}>Workflow not found.</p>;

    return (
        <div style={{ padding: "1rem" }}>
            <h1>Workflow: {workflow.name}</h1>
            <p>ID: {workflow.id}</p>
            <div style={{ marginBottom: "1rem" }}>
                <Link href="/">← Home</Link>
                {" | "}
                <Link href="/builder">Open Builder</Link>
            </div>
            <button onClick={handleExecute}>Execute Workflow</button>
            <h2>Nodes</h2>
            {workflow.nodes && workflow.nodes.length > 0 ? (
                <ul>
                    {workflow.nodes.map((n) => (
                        <li key={n.id}>
                            {n.data.label} (type: {n.data.nodeType})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No nodes in this workflow.</p>
            )}
        </div>
    );
}
