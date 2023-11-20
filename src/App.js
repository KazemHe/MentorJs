import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Lobby from "./pages/Lobby";
import CodeBlock from "./pages/CodeBlock";
import codeBlocks from "./data/codeBlocksData";
import Header from "./cmps/Header";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Header />
        </header>
        <Routes>
          <Route path="/" element={<Lobby codeBlocks={codeBlocks} />}></Route>
          <Route path="/code/:id" element={<CodeBlock />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
