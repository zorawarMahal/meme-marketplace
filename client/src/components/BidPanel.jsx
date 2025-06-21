import React, { useState, useEffect } from "react";
import socket from "../socket.js";

const BidPanel = () => {
  const [currentBid, setCurrentBid] = useState(0);
  const [bidInput, setBidInput] = useState("");

  useEffect(() => {
    // listening for bid updates
    socket.on("bidUpdate", (newBid) => {
      console.log("Received bid update:", newBid);
      setCurrentBid(newBid.amount);
    });

    return () => socket.off("bidUpdate");
  }, []);

  const placeBid = () => {
    const bid = { amount: parseInt(bidInput), bidder: "user123" };
    if (bid.amount > currentBid) {
      socket.emit("newBid", bid);
      setCurrentBid(bid.amount);
      setBidInput("");
    } else {
      alert("Bid Invalid: Please enter a higher bid than the current bid");
    }
  };

  return (
    <div className="BidPanel-div bg-black text-green-400 p-4 rounded-xl max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">💸 Live Bidding</h2>
      <p>Current Bid: ₹{currentBid}</p>
      <input
        type="number"
        value={bidInput}
        onChange={(e) => {
          // console.log(e.target.value);
          setBidInput(e.target.value);
        }}
        placeholder="Enter your bid"
        className="text-white mt-2 p-1 rounded"
      />
      <button
        onClick={placeBid}
        className="ml-2 bg-green-700 px-3 py-1 rounded"
      >
        Place Bid
      </button>
    </div>
  );
};

export default BidPanel;
