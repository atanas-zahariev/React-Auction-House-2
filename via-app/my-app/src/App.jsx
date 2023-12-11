import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { ErrorProvider } from './context/ErrorContext';

import Home from './component/common/HomeComponent';
import Header from './component/common/HeaderComponents';
import Default from './component/common/DefaultComponent';
import Error from './component/common/ErrorComponent';

import Login from './component/auth/LoginComponent';
import Logout from './component/auth/LogoutComponent';
import Register from './component/auth/RegisterComponent';

import Details from './component/details/DetailsComponent';
import Edit from './component/action/EditItemComponent';
import CreateItem from './component/action/CreateComponent';

const Catalog = lazy(() => import('./component/common/catalog/CatalogComponent'));

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
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/catalog' element={<Catalog />} />
              <Route path='/details/:id' element={<Details />} />
              <Route path='/edit/:id' element={<Edit />} />
              <Route path='/create' element={<CreateItem />} />
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
