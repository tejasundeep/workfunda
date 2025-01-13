import { configureStore, createSlice } from '@reduxjs/toolkit';

// UI slice
const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    selectedNodeId: null,
    isSidebarVisible: false,
    isNodeConfigVisible: false,
  },
  reducers: {
    setSelectedNodeId: (state, action) => {
      state.selectedNodeId = action.payload;
    },
    setSidebarVisibility: (state, action) => {
      state.isSidebarVisible = action.payload;
    },
    toggleNodeConfig: (state) => {
      state.isNodeConfigVisible = !state.isNodeConfigVisible;
    },
  },
});

// Flow slice (combining nodes and edges)
const flowSlice = createSlice({
  name: 'flow',
  initialState: {
    nodes: [],
    edges: []
  },
  reducers: {
    setNodes: (state, action) => {
      state.nodes = Array.isArray(action.payload) ? action.payload : [];
    },
    addNode: (state, action) => {
      if (action.payload) {
        state.nodes.push(action.payload);
      }
    },
    updateNodeConfig: (state, action) => {
      const { nodeId, field, value } = action.payload;
      const node = state.nodes.find(n => n.id === nodeId);
      if (node) {
        if (!node.data) node.data = {};
        if (!node.data.config) node.data.config = {};
        node.data.config[field] = value;
      }
    },
    setEdges: (state, action) => {
      state.edges = Array.isArray(action.payload) ? action.payload : [];
    }
  },
});

export const { 
  setSelectedNodeId, 
  setSidebarVisibility,
  toggleNodeConfig 
} = uiSlice.actions;

export const { setNodes, addNode, setEdges, updateNodeConfig } = flowSlice.actions;

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    flow: flowSlice.reducer
  },
});

export default store;
