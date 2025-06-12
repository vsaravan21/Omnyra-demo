import { useState } from 'react';
import logo from './assets/logo.png';
import './App.css';

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('synthetic');
  const [inputSequence, setInputSequence] = useState('');
  const [isSynthetic, setIsSynthetic] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showInvestigationForm, setShowInvestigationForm] = useState(false);
  const [investigationMethod, setInvestigationMethod] = useState('');
  const [priorityLevel, setPriorityLevel] = useState('');
  const [notes, setNotes] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  const handleSubmit = () => {
    setLoadingAnalysis(true);
  
    setTimeout(() => {
      const isSyntheticMatch = inputSequence.includes('OMNYRA_SYNTHETIC_01');
      setIsSynthetic(isSyntheticMatch);
      setActiveTab(isSyntheticMatch ? 'synthetic' : 'natural');
      setSubmitted(true);
      setLoadingAnalysis(false);
    }, 1000); // simulate 1 second of "analysis"
  };
  

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setInputSequence(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleInvestigationSubmit = () => {
    console.log("Investigation Submitted:", {
      method: investigationMethod,
      priority: priorityLevel,
      notes: notes,
    });
    alert("Investigation report submitted successfully.");
    setShowInvestigationForm(false);
  };
  
  
  const heatmapSummary = [
    {
      label: '0–50 bp',
      color: '#a8e6cf',
      tooltip: 'No hits in this interval.'
    },
    {
      label: '51–100 bp',
      color: '#fff59d',
      tooltip: '1 Hit in 51–100 bp<br>Medium Confidence<br>Sequence ID: seq00025'
    },
    {
      label: '101–200 bp',
      color: '#ff8a80',
      tooltip: '3 Hits in 101–200 bp<br>2 High, 1 Medium Confidence<br>Sequence IDs: seq00010, seq00025'
    }
  ];
  if (loadingAnalysis) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p>Analyzing sequences...</p>
        <p>Scanning 5,240 sequences</p>
      </div>
    );
  }
  
  return (
    <>
      <div className="banner">
        <img src={logo} alt="Omnyra Logo" className="logo" />
      </div>

      <div className="description-box">
        Omnyra is an AI-powered screening platform built for national security use cases: from real-time triage of synthetic DNA to forensic analysis of suspect sequences. Unlike traditional tools, it detects engineered threats by analyzing biological function, not just sequence similarity. The system highlights regions of concern, scales to large datasets, and is designed to integrate with law and intelligence workflows. Explore our early-stage demo to see the core capabilities in action.
      </div>

      <div className="fasta-container" style={{ textAlign: 'center' }}>
        <h2>FASTA Input</h2>

        <textarea
          className="fasta-input"
          rows="8"
          value={inputSequence}
          onChange={(e) => setInputSequence(e.target.value)}
          style={{ width: '90%', maxWidth: '800px', margin: '10px auto', display: 'block' }}
        />

        <div style={{ width: '90%', maxWidth: '800px', margin: '10px auto' }}>
          <label className="file-upload" style={{ width: '100%', display: 'inline-block', textAlign: 'center', padding: '12px', marginBottom: '8px' }}>
            <input type="file" accept=".fa,.fasta,.txt" onChange={handleFileUpload} />
            📎 Choose File or Drag File Here
          </label>

          <p className="file-format-note" style={{ textAlign: 'center', marginTop: '4px' }}>
            Accepted formats: <code>.fa</code>, <code>.fasta</code>, <code>.txt</code>
            {uploadedFileName && ` — Loaded: ${uploadedFileName}`}
          </p>
        </div>

        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
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

          {activeTab === 'synthetic' && isSynthetic && (
            <div className="heatmap-section">
              <p><strong>4 of 5240 sequences flagged</strong></p>
              <p>3 Synthetic</p>
              <div className="unified-heatmap" style={{ display: 'flex', gap: '12px', justifyContent: 'center', margin: '12px 0' }}>
                {heatmapSummary.map((block, index) => (
                  <div className="tooltip-container" key={index}>
                    <div
                      style={{
                        width: '80px',
                        height: '30px',
                        borderRadius: '6px',
                        backgroundColor: block.color,
                        cursor: 'help',
                        boxShadow: '0 0 2px rgba(0,0,0,0.2)'
                      }}
                    ></div>
                    <div
                      className="tooltip-box"
                      dangerouslySetInnerHTML={{ __html: block.tooltip }}
                    />
                  </div>
                ))}
              </div>
              <p className="result-confirmation">
                ⚠️ Pathogen Detected: Synthetic analog of <em>Variola virus</em>. Confidence level: <strong>High</strong>
              </p>
              <button className="analysis-button" onClick={() => setShowModal(true)}>
                View Threat Analysis
              </button>
            </div>
          )}

          {activeTab === 'natural' && (
            <div className="heatmap-section">
              <p><strong>4 of 5240 sequences flagged</strong></p>
              <p>1 Natural</p>
              <div className="unified-heatmap" style={{ display: 'flex', gap: '12px', justifyContent: 'center', margin: '12px 0' }}>
                <div className="tooltip-container">
                  <div
                    style={{
                      width: '80px',
                      height: '30px',
                      borderRadius: '6px',
                      backgroundColor: '#ff8a80',
                      cursor: 'help',
                      boxShadow: '0 0 2px rgba(0,0,0,0.2)'
                    }}
                  ></div>
                  <div
                    className="tooltip-box"
                    dangerouslySetInnerHTML={{
                      __html: '1 Hit in 101–200 bp<br>High Confidence Match<br>Sequence ID: seq00171'
                    }}
                  />
                </div>
              </div>
              <p className="result-confirmation">
                ✅ Natural variant detected: 95% identity to <em>Variola virus</em>. Confidence level: <strong>High</strong>
              </p>
              <button className="analysis-button" onClick={() => setShowModal(true)}>
                View Threat Analysis
              </button>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Threat Analysis Report</h2>
              <p><strong>Threat Interval:</strong> 0–150 bp</p>
              <p><strong>Virulence Score:</strong> High</p>
              <p><strong>Explore reporting options:</strong></p>

              <div className="modal-button-row centered-buttons">
                <button className="modal-action-button" onClick={() => setShowInvestigationForm(true)}>
                  Launch Investigation
                </button>
                <button className="modal-action-button">View Full Report</button>
              </div>
            </div>

            <p><strong>Related variants in GenBank:</strong></p>
            <p className="genbank-links">
              <a href="#">AY999001.1</a>{' '}
              <a href="#">AY999002.1</a>{' '}
              <a href="#">AY999003.1</a>
            </p>

            {showInvestigationForm && (
              <>

                <label className="modal-label">Method of Investigation:</label>
                <input
                  type="text"
                  className="modal-input"
                  placeholder="e.g. Contact San Francisco WMD Coordinator (Kari Montoya)"
                  value={investigationMethod}
                  onChange={(e) => setInvestigationMethod(e.target.value)}
                />

                <label className="modal-label">Threat Priority Level:</label>
                <select
                  className="modal-input"
                  value={priorityLevel}
                  onChange={(e) => setPriorityLevel(e.target.value)}
                >
                  <option value="">Select Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>

                <label className="modal-label">Notes:</label>
                <textarea
                  className="modal-input"
                  placeholder="Add any relevant context or comments..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="4"
                />

                <button className="submit-button" onClick={handleInvestigationSubmit}>
                  Send Report
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
