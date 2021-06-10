import './App.css';
import theme from './theme';
import { ThemeProvider } from '@material-ui/styles';
import Cowin from './components/Cowin';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <Cowin />
      </ThemeProvider>
    </div>
  );
}

export default App;
