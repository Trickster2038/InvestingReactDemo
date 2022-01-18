// import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';
import AssetCard from './components/AssetCard';
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SearchBar />} />
        <Route path="/stats" element={<AssetCard asset_symbol="A" asset_country="thailand" />} />
      </Routes>
    </div>
  );
}

export default App;
