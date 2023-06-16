import './App.css';
import ExistingNotesSection from './Components/ExistingNotesSection/ExistingNotesSection';
import Header from './Components/Header/Header';
import { ThemeProvider } from './Components/ThemeProvider/ThemeContext';

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <Header></Header>
        <ExistingNotesSection></ExistingNotesSection>
      </ThemeProvider>
    </div>
  );
}

export default App;
