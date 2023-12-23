/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-debugging-utils */
import * as React from 'react';
import { render, screen, waitFor,within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { act } from 'react-dom/test-utils';

describe('App', () => {
  it('test for header', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const element = screen.getByRole('banner');

    expect(element).toBeInTheDocument();

  });

  it('test for navigation', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const element = screen.getByRole('navigation');

    expect(element).toBeInTheDocument();

  });

  it('test for navigation li number', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const element = screen.getAllByRole('listitem');

    expect(element).toHaveLength(4);

  });

  it('test for main', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const element = screen.getByRole('main');

    expect(element).toBeInTheDocument();

  });
});

describe('changes in the Dom', () => {
  it('test for login page show up', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await act(async () => {
      /* fire events that update state */
      userEvent.click(screen.getByRole('link', { name: 'Login' }));
    });

    const element = screen.getByText('Email');

    expect(element).toBeInTheDocument();

  });

  it('test for error after login with wrong input', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await act(async () => {
      /* fire events that update state */
      userEvent.click(screen.getByRole('link', { name: 'Login' }));
    });

    await act(async () => {
      userEvent.click(screen.getByText('Sign In'));
    });

    const element = screen.getByText('All fields are required.');

    expect(element).toBeInTheDocument();
    // screen.debug();

  });

  it('test for changes in nav when user login.', async () => {

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await act(async () => {
      userEvent.click(screen.getByRole('link', { name: 'Login' }));
    });

    const email = screen.getByRole('textbox');
    const password = screen.getByLabelText('Password');


    await act(async () => {
      userEvent.type(email, 'peter@abv.bg');
      userEvent.type(password, '123456');
      userEvent.click(screen.getByText('Sign In'));
    });

    await waitFor(() => {
      expect(screen.getByText('Publish')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Closed Auctions')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });
  });

  it('test for appearance of the catalog', async () => {
    
    const {container} = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await act(async () => {
      userEvent.click(screen.getByRole('link',{name:'Browse'}));
    });

    await waitFor(() => {
      const images  = screen.getAllByRole('img');
      expect(images).toHaveLength(5);
    });

    await waitFor(() => {
      const element  = screen.getAllByRole('list')[1];
      expect(element).toHaveClass('catalog cards');
    });

    await waitFor(() => {
      const elements  = container.getElementsByClassName('item');
      expect(elements.length).toBe(4);
    });

    await waitFor(() => {
      const ulForlistItems  = screen.getAllByRole('list')[1];
      const listItems = within(ulForlistItems).getAllByRole('listitem');
      expect(listItems).toHaveLength(4);
    });

  });

});