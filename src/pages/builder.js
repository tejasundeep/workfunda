import React, { useCallback, useState } from "react";
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Background,
    BackgroundVariant,
    Controls,
} from "react-flow-renderer";

import Sidebar from "../components/Sidebar";
import NodeConfigPanel from "../components/NodeConfigPanel";

import { Container, Row, Col, Button } from "react-bootstrap";

function genId() {
    return `node_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

export default function Builder() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [selectedNodeId, setSelectedNodeId] = useState(null);

    const onConnect = useCallback(
        (params) =>
            setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
        []
    );

    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    };

    const onDrop = (event) => {
        event.preventDefault();
        const reactFlowBounds = event.currentTarget.getBoundingClientRect();
        const nodeType = event.dataTransfer.getData("application/reactflow");

        const position = {
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        };
        const id = genId();

        setNodes((nds) => [
            ...nds,
            {
                id,
                type: "default",
                position,
                data: { label: nodeType, nodeType, config: {} },
            },
        ]);
    };

    const onNodeClick = (event, node) => {
        setSelectedNodeId(node.id);
    };

    const onSave = async () => {
        const name = prompt("Enter a name for this workflow:", "My Workflow");
        if (!name) return;

        const payload = {
            name,
            nodes,
            edges,
        };

        try {
            const res = await fetch("/api/workflows", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const errData = await res.json();
                alert(
                    "Error saving workflow: " +
                        (errData.error || "Unknown error")
                );
                return;
            }
            alert("Workflow saved successfully!");
        } catch (err) {
            console.error(err);
            alert("Network error saving workflow.");
        }
    };

    return (
        <Container
            fluid
            className="vh-100 d-flex flex-column bg-dark text-light"
        >
            <Row className="flex-grow-1">
                {/* Sidebar */}
                <Col xs={12} md="auto" className="p-0">
                    <Sidebar />
                </Col>

                {/* Main Canvas */}
                <Col
                    className="p-0 position-relative"
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                >
                    <ReactFlowProvider>
                        <ReactFlow
                            className="w-100 h-100"
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            onNodeClick={onNodeClick}
                            fitView
                        >
                            <Controls className="bg-secondary rounded" />
                            <Background
                                variant={BackgroundVariant.Dots}
                                gap={16}
                                size={1}
                                color="#444"
                            />
                        </ReactFlow>
                    </ReactFlowProvider>
                    <Button
                        variant="primary"
                        className="position-absolute"
                        style={{ top: "1rem", right: "1rem", zIndex: 9999 }}
                        onClick={onSave}
                    >
                        Save Workflow
                    </Button>
                </Col>

                {/* Node Config Panel */}
                <Col xs={12} md="auto" className="p-0">
                    <NodeConfigPanel
                        nodes={nodes}
                        setNodes={setNodes}
                        selectedNodeId={selectedNodeId}
                    />
                </Col>
            </Row>
        </Container>
    );
}
