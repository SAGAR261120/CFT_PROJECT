import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedFile } from "../features/fileSystem/fileSystemSlice";

const SearchBar = ({ root }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const searchNode = (node, name) => {
    if (node.name.toLowerCase().includes(name.toLowerCase())) return node;
    for (let child of node.children || []) {
      const found = searchNode(child, name);
      if (found) return found;
    }
    return null;
  };

  const handleSearch = () => {
    const result = searchNode(root, query);
    if (result) {
      dispatch(setSelectedFile(result));
    } else {
      alert("No match found.");
    }
  };

  return (
    <div style={{ marginBottom: 10 }}>
      <input
        type="text"
        placeholder="Search files/folders..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;