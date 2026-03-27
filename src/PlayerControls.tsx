import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

export default function PlayerControls() {
  const [status, setStatus] = useState("Ready");

  const loadTrack = async () => {
    try {
      setStatus("Loading...");
      // Simulate file load for now
      await invoke("load_audio", { data: [] });
      setStatus("Loaded! Click Play");
    } catch (error) {
      setStatus("Error: " + error);
    }
  };

  const playTrack = async () => {
    try {
      await invoke("play_audio");
      setStatus("🎵 Playing...");
    } catch (error) {
      setStatus("Play error");
    }
  };

  return (
    <div style={{ 
      padding: 20, 
      fontFamily: "Arial", 
      maxWidth: 400, 
      margin: "auto",
      textAlign: "center"
    }}>
      <h1>🎵 SOFIANOS SOUND ENGINE™</h1>
      <p>Raw tracks → Radio ready</p>
      
      <button 
        onClick={loadTrack}
        style={{
          padding: "12px 24px",
          fontSize: 16,
          background: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: 8,
          margin: 10,
          cursor: "pointer"
        }}
      >
        📁 Load Raw Track
      </button>
      
      <br />
      <button 
        onClick={playTrack}
        style={{
          padding: "12px 24px",
          fontSize: 16,
          background: "#10b981",
          color: "white",
          border: "none",
          borderRadius: 8,
          margin: 10,
          cursor: "pointer"
        }}
      >
        ▶️ Play
      </button>
      
      <div style={{ marginTop: 20, fontSize: 18 }}>
        {status}
      </div>
    </div>
  );
}
