import { useEffect, useState } from "react";
import axios from "axios";

const MemeGallery = ({ newMeme }) => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    const fetchMemes = async () => {
      const res = await axios.get("http://localhost:3000/api/memes");
      setMemes(res.data);
    };
    fetchMemes();
  }, []);

  useEffect(() => {
    if (newMeme) {
      setMemes((prev) => [newMeme, ...prev]);
      // fetchMemes();
    }
  }, [newMeme]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <p className="neon-red inline underline text-red-500 text-2xl font-bold mb-4">Your Meme Collection</p>
      {memes.map((meme) => (
        <div
          key={meme.id}
          className="bg-gray-800 p-4 rounded text-center text-white shadow-xl hover:animate-glitch"
        >
          <img
            src={meme.image_url}
            alt={meme.title}
            className="w-full h-64 object-cover rounded"
          />
          <h3 className="text-xl mt-2">{meme.title}</h3>
          <p className="text-sm text-pink-300">Tags: {meme.tags.join(", ")}</p>
          <p className="italic text-green-400">{meme.caption}</p>
          <p className="text-xs text-blue-400">{meme.vibes}</p>
        </div>
      ))}
    </div>
  );
};

export default MemeGallery;
