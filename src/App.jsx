import React from "react";
import FileTree from "./components/FileTree";
import FileViewer from "./components/FileViewer";
import Toolbar from "./components/Toolbar";
import { useSelector } from "react-redux";
import "./App.css"
import SearchBar from "./components/SearchBar";

function App() {
   const fileSystem = useSelector((state) => state.fileSystem.fileSystem);

  return (
    <div className="app-container">
      <div className="sidebar">
        <SearchBar root={fileSystem} />
        <Toolbar />
        <FileTree node={fileSystem} />
      </div>
      <div className="content">
        <FileViewer />
      </div>
    </div>
  );
};

export default App;
