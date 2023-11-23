import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { ErrorProvider } from './contexts/ErrorContext';
import { DataProvider } from './contexts/DataContext';

import Header from './components/common/HeaderComponents';
import Home from './components/common/HomeComponent';
import Error from './components/common/ErrorComponent';
import Spinner from './components/common/Spiner';
import { Default } from './components/common/DefaultComponent';

import Login from './components/auth/LoginComponent';
import Register from './components/auth/RegisterComponent';
import Logout from './components/auth/LogoutComponent';

import Create from './components/action/CreateComponent';
import EditItem from './components/action/EditItemComponent';
import CloseOffer from './components/action/CloseOfferComponent';
import Search from './components/action/SearchComponent';
import { SearchTable } from './components/action/SearchTable';

import Details from './components/details/DetailsComponent';

import { AuthGuard } from './guards/UserGuard';
import { GuestGuard } from './guards/GuestGuard';
import ErrorBoundary from './guards/errorboundary';

const Catalog = lazy(() => import('./components/common/Catalog/CatalogComponent'));
const UserClosedOffers = lazy(() => import('./components/closed-offers/UserClosedOffersComponent'));

function App() {
  console.log('App is re-render');
  return (
    <AuthProvider>
      <ErrorProvider>
        <DataProvider>
          <div id="page-content">
            <Header />
            <Error />
            <main>
              <ErrorBoundary fallback={<div>Failed to fetch data!</div>} >
                <Suspense fallback={<Spinner />}>
                  <Routes>

                    <Route path='/' element={<Home />} />
                    <Route path='/catalog' element={<Catalog />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/search/table' element={<SearchTable />} />
                    <Route path='/details/:id' element={<Details />} />

                    <Route element={<GuestGuard />}>
                      <Route path='/login' element={<Login />} />
                      <Route path='/register' element={<Register />} />
                    </Route>

                    <Route element={<AuthGuard />}>
                      <Route path='/logout' element={<Logout />} />
                      <Route path='/create' element={<Create />} />
                      <Route path='/edit/:id' element={<EditItem />} />
                      <Route path='/userAction/:id' element={<CloseOffer />} />
                      <Route path='/closed' element={<UserClosedOffers />} />
                    </Route>

                    <Route path='*' element={<Default />} />

                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </main>

            <footer>SoftUni &copy; 2023 React Exam</footer>
          </div>
        </DataProvider>
      </ErrorProvider>
    </AuthProvider>
  );
}

export default App;
