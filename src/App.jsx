import { useState } from 'react';
import logo from './assets/logo.png';
import './App.css';

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('natural');
  const [inputSequence, setInputSequence] = useState('');
  const [isSynthetic, setIsSynthetic] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showInvestigationForm, setShowInvestigationForm] = useState(false);
  const [investigationMethod, setInvestigationMethod] = useState('');
  const [priorityLevel, setPriorityLevel] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    setSubmitted(true);
    setIsSynthetic(inputSequence.includes('OMNYRA_SYNTHETIC_01'));
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

  const genbankRefs = {
    natural: ['NC_001611.1', 'AY243312.1', 'AY243313.1'],
    synthetic: ['AY999001.1', 'AY999002.1', 'AY999003.1']
  };

  return (
    <>
      <div className="banner">
        <img src={logo} alt="Omnyra Logo" className="logo" />
      </div>

      <div className="description-box">
        Omnyra is an AI-powered screening tool that detects synthetic and engineered DNA sequences traditional homology-based systems miss. By analyzing functional signals with protein language models, Omnyra flags novel threats in real time and highlights regions of concern. It supports rapid triage and enables streamlined reporting to national security partners like the FBI—making sequence screening smarter, faster, and threat-aware. Check out our system demo (in progress) to explore how it works in action!
      </div>

      <div className="fasta-container">
        <h2>FASTA Input</h2>
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
                <div className="bar-label"><small>0–50 bp</small><div className="bar high"></div></div>
                <div className="bar-label"><small>51–100 bp</small><div className="bar medium"></div></div>
                <div className="bar-label"><small>101–200 bp</small><div className="bar low"></div></div>
              </div>
              <p className="result-confirmation">
                ✅ Match found: 95% identity to <em>Variola virus strain India-1967</em> (<code>NC_001611.1</code>)
              </p>
              <button className="analysis-button" onClick={() => setShowModal(true)}>
                View Threat Analysis
              </button>
            </div>
          )}

          {activeTab === 'synthetic' && isSynthetic && (
            <div className="heatmap-section">
              <p><strong>Synthetic Functional Analog</strong></p>
              <div className="bar-group">
                <div className="bar-label"><small>0–50 bp</small><div className="bar high"></div></div>
                <div className="bar-label"><small>51–100 bp</small><div className="bar medium"></div></div>
                <div className="bar-label"><small>101–200 bp</small><div className="bar low"></div></div>
              </div>
              <p className="result-confirmation">
                ⚠️ Pathogen Detected: Synthetic analog of <em>Variola virus</em>. Confidence level: <strong>High</strong>
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
            <button className="close-button" onClick={() => setShowModal(false)}>✕</button>
            <h3 className="modal-title">Threat Analysis Report</h3>
            <p><strong>Threat Interval:</strong> 0–150 bp</p>
            <p><strong>Virulence Score:</strong> High</p>
            <p><strong>Explore reporting options:</strong></p>
            <div className="button-group">
              <button className="report-button" onClick={() => setShowInvestigationForm(!showInvestigationForm)}>
                Launch Investigation
              </button>
              <a
                href="https://drive.google.com/file/d/10bgaN2ci3K_L9kONJqLom7cyONZQhidc/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="report-button"
              >
                View Full Report
              </a>
            </div>

            <p><strong>Related variants in GenBank:</strong></p>
            <div className="genbank-refs">
              {(activeTab === 'natural' ? genbankRefs.natural : genbankRefs.synthetic).map(id => (
                <a
                  key={id}
                  href={`https://www.ncbi.nlm.nih.gov/nuccore/${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="genbank-link"
                >
                  {id}
                </a>
              ))}
            </div>

            {showInvestigationForm && (
              <div className="investigation-form centered">
                <h4>Launch Investigation</h4>
                <div className="form-group">
                  <label htmlFor="method">Method of Investigation:</label>
                  <input
                    type="text"
                    id="method"
                    className="input-field transparent"
                    placeholder="e.g. Contact San Francisco WMD Coordinator (Kari Montoya)"
                    value={investigationMethod}
                    onChange={(e) => setInvestigationMethod(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="priority">Threat Priority Level:</label>
                  <select
                    id="priority"
                    className="input-field transparent"
                    value={priorityLevel}
                    onChange={(e) => setPriorityLevel(e.target.value)}
                  >
                    <option value="">Select Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="notes">Notes:</label>
                  <textarea
                    id="notes"
                    className="input-field transparent"
                    rows="4"
                    placeholder="Add any relevant context or comments..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                </div>
                <button className="submit-button" onClick={handleInvestigationSubmit}>
                  Send Report
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
