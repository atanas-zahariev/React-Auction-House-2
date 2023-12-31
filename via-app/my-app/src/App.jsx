import { Suspense, lazy } from 'react';
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
import Search from './component/action/SearchComponent';

import { GuestGuard } from './guards/GuestGuard';
import { AuthGuard } from './guards/UserGuard';
import ErrorBoundary from './guards/errorboundary';
import Spinner from './component/common/Spinner';

const Catalog = lazy(() => import('./component/common/catalog/CatalogComponent'));
const UserClosedOffers = lazy(() => import('./component/closed-offers/UserClosedOffersComponent'));
function App() {

  return (
    <AuthProvider>
      <ErrorProvider>
        <div id="page-content">
          <Header />
          <Error />
          <main>
            <ErrorBoundary fallback={<div>Failed to fetch data!</div>} >
              <Suspense fallback={<Spinner />}>
                <Routes>

                  <Route path='/' element={<Home />} />
                  <Route path='/catalog' element={<Catalog />} />
                  <Route path='/details/:id' element={<Details />} />
                  <Route path='/search' element={<Search />} />

                  <Route element={<GuestGuard />}>
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                  </Route>

                  <Route path='/logout' element={<Logout />} />

                  <Route element={<AuthGuard />}>
                    <Route path='/edit/:id' element={<Edit />} />
                    <Route path='/create' element={<CreateItem />} />
                    <Route path='/closed' element={<UserClosedOffers />} />
                  </Route>

                  <Route path='*' element={<Default />} />

                </Routes>
              </Suspense>
            </ErrorBoundary>
          </main>
          <footer>SoftUni &copy; 2023 React Exam</footer>
        </div>
      </ErrorProvider>
    </AuthProvider>
  );
}

export default App;
