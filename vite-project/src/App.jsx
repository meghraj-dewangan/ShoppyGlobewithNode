
import './App.css'
import { Outlet } from 'react-router-dom';
import {Provider} from 'react-redux';
import Header from './Components/Header';
import Footer from './Components/Footer';
import appStore from './Components/Utils/AppStore';
import { UserAuthProvider } from './Components/UserContext';







function App() {
  
  return (
    <Provider store={appStore}>
      <UserAuthProvider> {/* Wrap the app with UserAuthProvider */}
        <Header />
        <Outlet />
        <Footer />
      </UserAuthProvider>
    </Provider>
  )
}

export default App;
