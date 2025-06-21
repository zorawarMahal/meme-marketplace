import BidPanel from "./components/BidPanel";
import MemeForm from "./components/MemeForm";
import MemeGallery from "./components/MemeGallery";
import { useState } from "react";

function App() {
  const [newMeme, setNewMeme] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-mono">
      <h1 className="Hover-glitch hover-neon border-none text-4xl text-center font-bold text-pink-500 px-6 py-4 rounded-lg font-mono">
        ⚡ Glitch in the Meme Matrix Detected ⚡
      </h1>
      <h1 className="glitch text-3xl neon text-center mb-8">
        🚀 CyberPunk Madness !!!
      </h1>
      <BidPanel />
      <MemeForm onNewMeme={setNewMeme} />
      <MemeGallery newMeme={newMeme} />
    </div>
  );
}

export default App;
