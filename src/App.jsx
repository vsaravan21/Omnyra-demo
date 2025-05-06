// Omnyra Heatmap Toggle Update
import { useState } from 'react';
import logo from './assets/logo.png';
import './App.css';

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('natural');
  const [inputSequence, setInputSequence] = useState('');
  const [isSynthetic, setIsSynthetic] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setIsSynthetic(inputSequence.includes('OMNYRA_SYNTHETIC_01'));
  };

  return (
    <>
      <div className="banner">
        <img src={logo} alt="Omnyra Logo" className="logo" />
      </div>

      <div className="description-box">
        Omnyra is an AI-driven platform designed to detect synthetic biological sequences that evade traditional homology-based screening tools. We offer streamlined FBI reporting options based on flagged risk levels. Our team is actively evaluating various sequence encoders, fine-tuning strategies, dataset curation pipelines, and embedding-based detection methods. Check out our demo to learn more about our vision!
      </div>

      <div className="fasta-container">
        <h2>FASTA input</h2>
        <textarea
          className="fasta-input"
          rows="8"
          value={inputSequence}
          onChange={(e) => setInputSequence(e.target.value)}
        />
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>

      {submitted && (
        <div className="fasta-container">
          <div className="tabs">
            <button
              className={`submit-button ${activeTab === 'natural' ? 'active' : ''}`}
              onClick={() => setActiveTab('natural')}
            >
              Natural Matches
            </button>
            <button
              className={`submit-button ${activeTab === 'synthetic' ? 'active' : ''}`}
              onClick={() => setActiveTab('synthetic')}
            >
              AI-Edited Variants
            </button>
          </div>

          {activeTab === 'natural' && (
            <div className="heatmap-section">
              <p><strong>Variola virus</strong></p>
              <div className="bar-group">
                <div className="bar-label">
                  <small>0–50 bp</small>
                  <div className="bar high"></div>
                </div>
                <div className="bar-label">
                  <small>51–100 bp</small>
                  <div className="bar medium"></div>
                </div>
                <div className="bar-label">
                  <small>101–150 bp</small>
                  <div className="bar low"></div>
                </div>
              </div>

              <p style={{ marginTop: '20px' }}><strong>Influenza A/H1N1</strong></p>
              <div className="bar-group">
                <div className="bar-label">
                  <small>0–50 bp</small>
                  <div className="bar medium"></div>
                </div>
                <div className="bar-label">
                  <small>51–100 bp</small>
                  <div className="bar low"></div>
                </div>
              </div>

              <p className="result-confirmation">
                ✅ Match found: 95% identity to <em>Variola virus strain India-1967</em> (<code>NC_001611.1</code>)
              </p>
            </div>
          )}

          {activeTab === 'synthetic' && isSynthetic && (
            <div className="heatmap-section">
              <p><strong>Synthetic Functional Analog</strong></p>
              <div className="bar-group">
                <div className="bar-label">
                  <small>0–50 bp</small>
                  <div className="bar synthetic"></div>
                </div>
                <div className="bar-label">
                  <small>51–100 bp</small>
                  <div className="bar synthetic"></div>
                </div>
                <div className="bar-label">
                  <small>101–150 bp</small>
                  <div className="bar synthetic"></div>
                </div>
              </div>
              <p className="result-confirmation">
                ⚠️ Pathogen Detected: Synthetic analog of <em>Variola virus</em>. Confidence level: <strong>High</strong>
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
