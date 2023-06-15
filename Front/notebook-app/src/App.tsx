import './App.css';
import Header from './Components/Header/Header';
import { ThemeProvider } from './Components/ThemeProvider/ThemeContext';

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <Header></Header>
      </ThemeProvider>
    </div>
  );
}

export default App;
