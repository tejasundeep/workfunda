import React, { useCallback, useState, useEffect, useRef } from "react";
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

  // Controls left sidebar (hamburger on mobile)
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Controls the right Node Config Panel
  const [isNodeConfigVisible, setIsNodeConfigVisible] = useState(false);

  // Ref to the Node Config Panel for "click outside" detection
  const nodeConfigRef = useRef(null);

  useEffect(() => {
    // Show/hide sidebar based on screen width
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarVisible(true);
      } else {
        setIsSidebarVisible(false);
      }
    };
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // If right panel is open, listen for outside clicks and close if user clicks elsewhere
  useEffect(() => {
    function handleOutsideClick(e) {
      if (
        nodeConfigRef.current &&
        !nodeConfigRef.current.contains(e.target)
      ) {
        // User clicked outside NodeConfigPanel
        setIsNodeConfigVisible(false);
      }
    }

    if (isNodeConfigVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    // Cleanup listener
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isNodeConfigVisible]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
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
    setIsNodeConfigVisible(true);
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
        alert("Error saving workflow: " + (errData.error || "Unknown error"));
        return;
      }
      alert("Workflow saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Network error saving workflow.");
    }
  };

  const toggleSidebar = () => setIsSidebarVisible((prev) => !prev);
  const toggleNodeConfig = () => setIsNodeConfigVisible((prev) => !prev);

  return (
    <Container fluid className="vh-100 d-flex flex-column bg-dark text-light">
      <Row className="flex-grow-1 d-flex">
        {/* LEFT SIDEBAR */}
        {isSidebarVisible && (
          <Col
            xs={12}
            md={3}
            lg={2}
            className="p-0"
            style={{ maxHeight: "100vh", overflowY: "auto" }}
          >
            <Sidebar />
          </Col>
        )}

        {/* MAIN AREA */}
        <Col
          xs={12}
          md={isSidebarVisible ? (isNodeConfigVisible ? 6 : 9) : 12}
          lg={isSidebarVisible ? (isNodeConfigVisible ? 8 : 10) : 12}
          className="p-0 position-relative d-flex flex-column"
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <ReactFlowProvider>
            <ReactFlow
              className="w-100 h-100 flex-grow-1"
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

          {/* SAVE BUTTON */}
          <Button
            variant="primary"
            className="position-absolute"
            style={{ top: "1rem", right: "1rem", zIndex: 9999 }}
            onClick={onSave}
          >
            Save Workflow
          </Button>

          {/* MOBILE HAMBURGER (d-md-none) */}
          <Button
            variant="secondary"
            className="position-absolute d-md-none"
            style={{ top: "1rem", left: "1rem", zIndex: 9999 }}
            onClick={toggleSidebar}
          >
            <span className="navbar-toggler-icon" />
          </Button>
        </Col>

        {/* RIGHT NODE CONFIG PANEL */}
        {isNodeConfigVisible && (
          <Col
            xs={12}
            md={3}
            lg={2}
            className="p-0"
            style={{ maxHeight: "100vh", overflowY: "auto" }}
            ref={nodeConfigRef} // <-- Important for outside clicks
          >
            <NodeConfigPanel
              nodes={nodes}
              setNodes={setNodes}
              selectedNodeId={selectedNodeId}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
}
