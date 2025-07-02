import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedFile } from "../features/fileSystem/fileSystemSlice";

const FileTree = ({ node }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const selectedFile = useSelector((state) => state.fileSystem.selectedFile);

  const isSelected = selectedFile?.id === node.id;

  const handleClick = () => {
    dispatch(setSelectedFile(node));
    if (node.type === "folder") setExpanded(!expanded);
  };

  return (
    <div style={{ marginLeft: 16 }}>
      <div
        onClick={handleClick}
        style={{
          cursor: "pointer",
          fontWeight: node.type === "folder" ? "600" : "normal",
          padding: "6px 10px",
          borderRadius: "4px",
          backgroundColor: isSelected ? "#cce6ff" : "transparent",
          border: isSelected ? "1px solid #0078d4" : "none",
        }}
      >
        {node.type === "folder" ? "📁" : "📄"} {node.name}
      </div>

      {expanded &&
        node.children?.map((child) => (
          <FileTree key={child.id} node={child} />
        ))}
    </div>
  );
};

export default FileTree;
