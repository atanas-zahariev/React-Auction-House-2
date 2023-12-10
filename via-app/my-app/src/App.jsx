
import { Route, Routes } from 'react-router-dom';
import Home from './component/common/HomeComponent';
import Header from './component/common/HeaderComponents';
import { Default } from './component/common/DefaultComponent';
import { AuthProvider } from './context/AuthContext';
import Error from './component/common/ErrorComponent';
import Login from './component/auth/LoginComponent';
import { ErrorProvider } from './context/ErrorContext';
import Logout from './component/auth/LogoutComponent';

function App() {

  return (
    <AuthProvider>
      <ErrorProvider>
      <div id="page-content">
        <Header />
        <Error />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='*' element={<Default />} />
          </Routes>
        </main>
        <footer>SoftUni &copy; 2023 React Exam</footer>
      </div>
      </ErrorProvider>
    </AuthProvider>
  );
}

export default App;
