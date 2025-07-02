import { createSlice } from "@reduxjs/toolkit";
import initialData from "../../data/fileSystemData.json";

const initialState = {
  fileSystem: initialData,
  selectedFile: null,
};

const findNodeById = (node, id) => {
  if (node.id === id) return node;
  if (node.children) {
    for (let child of node.children) {
      const result = findNodeById(child, id);
      if (result) return result;
    }
  }
  return null;
};

const deleteNodeById = (node, id) => {
  if (!node.children) return;
  node.children = node.children.filter((child) => child.id !== id);
  node.children.forEach((child) => deleteNodeById(child, id));
};

const fileSystemSlice = createSlice({
  name: "fileSystem",
  initialState,
  reducers: {
    setSelectedFile: (state, action) => {
      state.selectedFile = action.payload;
    },
    createNode: (state, action) => {
      const { parentId, newNode } = action.payload;
      const parentNode = findNodeById(state.fileSystem, parentId);
      if (parentNode && parentNode.type === "folder") {
        parentNode.children = parentNode.children || [];
        parentNode.children.push(newNode);
      }
    },
    renameNode: (state, action) => {
      const { nodeId, newName } = action.payload;
      const node = findNodeById(state.fileSystem, nodeId);
      if (node) {
        node.name = newName;
      }
    },
    deleteNode: (state, action) => {
      const nodeId = action.payload;
      if (state.fileSystem.id === nodeId) return; 
      deleteNodeById(state.fileSystem, nodeId);
      if (state.selectedFile?.id === nodeId) {
        state.selectedFile = null;
      }
    },
  },
});

export const {
  setSelectedFile,
  createNode,
  renameNode,
  deleteNode,
  setFileSystem,
} = fileSystemSlice.actions;

export default fileSystemSlice.reducer;
