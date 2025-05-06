import logo from './assets/logo.png';
import './App.css';

function App() {
  return (
    <>
      <div className="banner">
        <img src={logo} alt="Omnyra Logo" className="logo" />
      </div>

      <div className="description-box">
        Omnyra is an AI-driven platform designed to detect synthetic biological sequences that evade traditional homology-based screening tools. We offer streamlined FBI reporting options based on flagged risk levels. Our team is actively evaluating various sequence encoders, fine-tuning strategies, dataset curation pipelines, and embedding-based detection methods. Check out our demo to learn more about our vision!
      </div>
    </>
  );
}

export default App;
