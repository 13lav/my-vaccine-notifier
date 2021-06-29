import './App.css';
import theme from './theme';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import Cowin from './components/Cowin';
import Header from './components/Header';
import Footer from './components/Footer';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
  mainContent: {
    flexGrow: 1
  }
}));

function App() {

  const classes = useStyles();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <div className={classes.wrapper}>
          <div className={classes.mainContent}>
            <Header />
            <Cowin />
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
