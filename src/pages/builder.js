import React, { useCallback, useEffect, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  Controls,
  applyNodeChanges,
  applyEdgeChanges
} from "react-flow-renderer";
import { useSelector, useDispatch } from 'react-redux';
import { 
  setSelectedNodeId, 
  setSidebarVisibility,
  toggleNodeConfig, 
  addNode, 
  setNodes, 
  setEdges 
} from '../store/store';

import Sidebar from "../components/Sidebar";
import NodeConfigPanel from "../components/NodeConfigPanel";
import { Container, Row, Col } from "react-bootstrap";

function genId() {
  return `node_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

export default function Builder() {
  const dispatch = useDispatch();
  const selectedNodeId = useSelector((state) => state.ui.selectedNodeId);
  const isSidebarVisible = useSelector((state) => state.ui.isSidebarVisible);
  const isNodeConfigVisible = useSelector((state) => state.ui.isNodeConfigVisible);
  const nodes = useSelector((state) => state.flow.nodes);
  const edges = useSelector((state) => state.flow.edges);

  const nodeConfigRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        dispatch(setSidebarVisibility(window.innerWidth >= 768));
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [dispatch]);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (nodeConfigRef.current && !nodeConfigRef.current.contains(e.target)) {
        dispatch(toggleNodeConfig());
      }
    }
    if (isNodeConfigVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isNodeConfigVisible, dispatch]);

  const onConnect = useCallback(
    (params) => {
      const newEdge = { ...params, animated: true };
      dispatch(setEdges([...edges, newEdge]));
    },
    [dispatch, edges]
  );

  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = event.currentTarget.getBoundingClientRect();
    const nodeType = event.dataTransfer.getData("application/reactflow");
    
    if (!nodeType) return;

    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    const newNode = {
      id: genId(),
      type: "default",
      position,
      data: { label: nodeType, nodeType, config: {} },
    };

    dispatch(addNode(newNode));
  };

  const onNodesChange = useCallback(
    (changes) => {
      const updatedNodes = applyNodeChanges(changes, nodes);
      dispatch(setNodes(updatedNodes));
    },
    [nodes, dispatch]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      const updatedEdges = applyEdgeChanges(changes, edges);
      dispatch(setEdges(updatedEdges));
    },
    [edges, dispatch]
  );

  const handleNodeClick = (event, node) => {
    dispatch(setSelectedNodeId(node.id));
    dispatch(toggleNodeConfig());
  };

  return (
    <Container fluid className="vh-100 d-flex flex-column bg-dark text-light">
      <Row className="flex-grow-1 d-flex">
        {isSidebarVisible && (
          <Col xs={12} md={3} lg={2} className="p-0" style={{ maxHeight: "100vh", overflowY: "auto" }}>
            <Sidebar />
          </Col>
        )}

        <Col
          xs={12}
          md={isSidebarVisible ? (isNodeConfigVisible ? 6 : 9) : 12}
          lg={isSidebarVisible ? (isNodeConfigVisible ? 8 : 10) : 12}
          className="p-0 position-relative d-flex flex-column"
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
        >
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={handleNodeClick}
              fitView
            >
              <Controls className="bg-secondary rounded" />
              <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#444" />
            </ReactFlow>
          </ReactFlowProvider>
        </Col>

        {isNodeConfigVisible && (
          <Col xs={12} md={3} lg={2} className="p-0" style={{ maxHeight: "100vh", overflowY: "auto" }} ref={nodeConfigRef}>
            <NodeConfigPanel nodes={nodes} setNodes={(nds) => dispatch(setNodes(nds))} selectedNodeId={selectedNodeId} />
          </Col>
        )}
      </Row>
    </Container>
  );
}
