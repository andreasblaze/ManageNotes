import './App.css';
import { store } from "./Actions/store";
import { Provider } from "react-redux";
import Notes from './Components/Notes';
import { Container } from '@material-ui/core';
import { ToastProvider } from "react-toast-notifications";


function App() {
  return (
    
    <Provider store = {store}>
  
      <ToastProvider autoDismiss={true}>
      <Container maxWidth = "lg">
      <Notes>
        
      </Notes>
      </Container>    
      </ToastProvider>
    </Provider>
    
  );
}

export default App;
