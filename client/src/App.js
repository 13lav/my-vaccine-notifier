import './App.css';
import theme from './theme';
import { ThemeProvider } from '@material-ui/styles';
import Cowin from './components/Cowin';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Cowin />
      </ThemeProvider>
    </div>
  );
}

export default App;
