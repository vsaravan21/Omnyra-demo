// Omnyra Heatmap Toggle Update
import { useState } from 'react';
import logo from './assets/logo.png';
import './App.css';

const relatedVariants = [
  "NC_001611.1", "AY243312.1", "AY243313.1", "AY243314.1",
  "AY243315.1", "AY243316.1", "AY243317.1", "AY243318.1",
  "AY243319.1", "AY243320.1", "AY243321.1", "AY243322.1"
];

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('natural');
  const [inputSequence, setInputSequence] = useState('');
  const [isSynthetic, setIsSynthetic] = useState(false);
  const [showThreatPanel, setShowThreatPanel] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setIsSynthetic(inputSequence.includes('OMNYRA_SYNTHETIC_01'));
    setShowThreatPanel(false);
    setIsFlagged(false);
    setIsBlocked(false);
  };

  const handleThreatReportClick = () => {
    setShowThreatPanel(true);
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
          {!showThreatPanel ? (
            <>
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
                  <button className="submit-button" style={{ marginTop: '12px' }} onClick={handleThreatReportClick}>View Threat Analysis Report</button>
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
                  <button className="submit-button" style={{ marginTop: '12px' }} onClick={handleThreatReportClick}>View Threat Analysis Report</button>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h3 style={{ color: '#264766', textAlign: 'center', marginBottom: '24px' }}>Threat Analysis Report</h3>
              <div style={{ marginBottom: '12px' }}>
                <strong>Threat Interval</strong><br />
                <div style={{ textAlign: 'center' }}>0–150 bp</div>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Virulence Score</strong><br />
                <div style={{ textAlign: 'center' }}>High</div>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Explore reporting options:</strong>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '10px' }}>
                  <button
                    className="submit-button"
                    style={isFlagged ? {
                      width: 'auto', padding: '8px 16px', backgroundColor: '#ffffff', color: '#000000', border: '1px solid black'
                    } : {
                      width: 'auto', padding: '8px 16px'
                    }}
                    onClick={() => setIsFlagged(true)}
                  >
                    {isFlagged ? '✔️ Flagged' : 'Flag Order'}
                  </button>
                  <button
                    className="submit-button"
                    style={isBlocked ? {
                      width: 'auto', padding: '8px 16px', backgroundColor: '#ffffff', color: '#000000', border: '1px solid black'
                    } : {
                      width: 'auto', padding: '8px 16px'
                    }}
                    onClick={() => setIsBlocked(true)}
                  >
                    {isBlocked ? '✔️ Blocked' : 'Block Order'}
                  </button>
                  <button className="submit-button" style={{ width: 'auto', padding: '8px 16px' }}>Report to FBI</button>
                </div>
                {(isFlagged || isBlocked) && (
                  <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    <a href="#" style={{ fontSize: '0.9rem', color: '#3367d6' }}>View all flagged and blocked orders</a>
                  </div>
                )}
              </div>
              <p style={{ marginTop: '24px', textAlign: 'center' }}><strong>Related variants in GenBank:</strong></p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                {relatedVariants.map((id, idx) => (
                  <a key={idx} href={`https://www.ncbi.nlm.nih.gov/nuccore/${id}`} target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: '#3367d6' }}>{id}</a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;

