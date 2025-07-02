import React from "react";
import { useSelector } from "react-redux";

const FileViewer = () => {
  const selectedFile = useSelector((state) => state.fileSystem.selectedFile);

  if (!selectedFile) return <p>Select a file to view its content.</p>;

  return (
    <div>
      <h3>{selectedFile.name}</h3>
      <pre>{selectedFile.content}</pre>
    </div>
  );
};

export default FileViewer;
