import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FiVolume2, FiPause, FiSquare } from 'react-icons/fi';
import '../css/audio-reader.css';

const AudioReader = ({ contentRef, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [synth, setSynth] = useState(null);
  const [utterance, setUtterance] = useState(null);
  
  // To keep track of the text nodes and their positions
  const textMap = useRef([]);

  useEffect(() => {
    if (window.speechSynthesis) {
      setSynth(window.speechSynthesis);
    }
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const buildTextMap = useCallback(() => {
    if (!contentRef.current) return "";
    
    const map = [];
    let fullText = title + ". "; // Start with title
    
    // Simple recursive function to find all text nodes
    const walk = (node) => {
      if (node.nodeType === 3) { // Text node
        const text = node.textContent;
        map.push({
          node: node,
          start: fullText.length,
          end: fullText.length + text.length
        });
        fullText += text;
      } else {
        for (let child of node.childNodes) {
          walk(child);
        }
        // Add a small pause for block elements
        if (['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'BR'].includes(node.nodeName)) {
          fullText += " ";
        }
      }
    };

    walk(contentRef.current);
    textMap.current = map;
    return fullText;
  }, [contentRef, title]);

  const highlightWord = (charIndex, charLength) => {
    // Remove previous highlights
    window.getSelection().removeAllRanges();

    // Find the text node that contains this index
    const entry = textMap.current.find(item => charIndex >= item.start && charIndex < item.end);
    
    if (entry) {
      const range = document.createRange();
      const relativeStart = charIndex - entry.start;
      
      // Ensure we don't go out of bounds
      const nodeLength = entry.node.textContent.length;
      const start = Math.min(relativeStart, nodeLength);
      const end = Math.min(relativeStart + (charLength || 1), nodeLength);
      
      try {
        range.setStart(entry.node, start);
        range.setEnd(entry.node, end);
        
        const selection = window.getSelection();
        selection.addRange(range);

        // Scroll to the highlighted text if it's not in view
        const rect = range.getBoundingClientRect();
        if (rect.top < 150 || rect.bottom > window.innerHeight - 50) {
          window.scrollBy({ top: rect.top - 200, behavior: 'smooth' });
        }
      } catch (e) {
        console.warn("Highlight error", e);
      }
    }
  };

  const handleSpeak = () => {
    if (isPaused) {
      synth.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    if (isPlaying) {
      synth.pause();
      setIsPaused(true);
      setIsPlaying(true);
      return;
    }

    const fullText = buildTextMap();
    const u = new SpeechSynthesisUtterance(fullText);
    
    u.onboundary = (event) => {
      if (event.name === 'word') {
        highlightWord(event.charIndex, event.charLength);
      }
    };

    u.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      window.getSelection().removeAllRanges();
    };

    u.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      window.getSelection().removeAllRanges();
    };

    setUtterance(u);
    synth.speak(u);
    setIsPlaying(true);
  };

  const handleStop = () => {
    synth.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    window.getSelection().removeAllRanges();
  };

  return (
    <div className="audio-reader-container">
      <button 
        onClick={handleSpeak} 
        className={`audio-reader-btn ${isPlaying && !isPaused ? 'active' : ''}`}
        title={isPlaying ? (isPaused ? "Resume" : "Pause") : "Listen to Story"}
      >
        {isPlaying ? (isPaused ? <FiVolume2 size={22} /> : <FiPause size={22} />) : <FiVolume2 size={22} />}
        <span>{isPlaying ? (isPaused ? "Resume" : "Pause") : "Listen"}</span>
      </button>
      
      {isPlaying && (
        <button onClick={handleStop} className="audio-reader-stop-btn" title="Stop">
          <FiSquare size={18} />
        </button>
      )}
    </div>
  );
};

export default AudioReader;
