import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNode,
  renameNode,
  deleteNode,
} from "../features/fileSystem/fileSystemSlice";

const Toolbar = () => {
  const dispatch = useDispatch();
  const selectedFile = useSelector((state) => state.fileSystem.selectedFile);

  const handleCreate = () => {
    const name = prompt("Enter new file/folder name:");
    const type = prompt("Type 'file' or 'folder':");

    if (!name || !type) return alert("Name and type are required.");
    if (type !== "file" && type !== "folder") return alert("Invalid type entered.");

    if (!selectedFile || selectedFile.type !== "folder") {
      return alert("Please select a folder to add new file/folder inside.");
    }

    const newNode = {
      id: Date.now().toString(),
      name,
      type,
      content: type === "file" ? "" : undefined,
      children: type === "folder" ? [] : undefined,
    };

    dispatch(createNode({ parentId: selectedFile.id, newNode }));
  };

  const handleRename = () => {
    if (!selectedFile) return alert("Select a file or folder to rename");
    const newName = prompt("Enter new name:", selectedFile.name);
    if (!newName) return alert("Name cannot be empty");
    dispatch(renameNode({ nodeId: selectedFile.id, newName }));
  };

  const handleDelete = () => {
    if (!selectedFile) return alert("Select a file or folder to delete");
    const confirm = window.confirm(`Delete "${selectedFile.name}"?`);
    if (confirm) dispatch(deleteNode(selectedFile.id));
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <button onClick={handleCreate}>Create</button>{" "}
      <button onClick={handleRename}>Rename</button>{" "}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Toolbar;