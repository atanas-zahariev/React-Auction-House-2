/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-debugging-utils */
import * as React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
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
  });

  it('test for changes in nav when user login and logout.', async () => {

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

    await act(async () => {
      userEvent.click(screen.getByRole('link', { name: 'Logout' }));
    });

    await waitFor(() => {
      const loginLink = screen.getByRole('link',{name:'Login'});
      expect(loginLink).toBeInTheDocument();
    });
  });

  it('test for appearance of the catalog', async () => {

    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await act(async () => {
      userEvent.click(screen.getByRole('link', { name: 'Browse' }));
    });

    await waitFor(() => {
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(5);
    });

    await waitFor(() => {
      const element = screen.getAllByRole('list')[1];
      expect(element).toHaveClass('catalog cards');
    });

    await waitFor(() => {
      const elements = container.getElementsByClassName('item');
      expect(elements.length).toBe(4);
    });

    await waitFor(() => {
      const ulForlistItems = screen.getAllByRole('list')[1];
      const listItems = within(ulForlistItems).getAllByRole('listitem');
      expect(listItems).toHaveLength(4);
    });

  });
});

describe('test details', () => {
  it('test for details show up without user', async () => {
    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const catalogButton = screen.getByRole('link', { name: 'Browse' });
    expect(catalogButton).toBeInTheDocument();

    act(() => {
      userEvent.click(catalogButton);
    });

    await waitFor(async () => {
      const ulList = screen.getAllByRole('list');

      const item = within(ulList[1]).queryAllByRole('listitem')[0];

      const detailsLink = within(item).getByRole('link', { name: 'See details' });

      expect(detailsLink).toHaveClass('action');

      userEvent.click(detailsLink);

      await waitFor(() => {
        const category = screen.getByText('vehicles');
        expect(category).toBeInTheDocument();
      });

    });

    await waitFor(async () => {
      const detailsDivContainer = container.getElementsByClassName('item padded')[0];
      expect(detailsDivContainer).toBeInTheDocument();
    });
  });


  it('test for details show up with user how is not Owner and is hire bider.', async () => {
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

    await waitFor(async () => {
      const catalogButton = screen.getByRole('link', { name: 'Browse Listings' });

      userEvent.click(catalogButton);

      await waitFor(async () => {
        const ulList = screen.getAllByRole('list')[1];

        const item = within(ulList).getAllByRole('listitem')[0];

        const detailsButton = within(item).getByRole('link', { name: 'See details' });

        userEvent.click(detailsButton);

        await waitFor(() => {
          const isHighestBider = screen.getByText('highest bidder');
          expect(isHighestBider).toBeInTheDocument();
        });

      });

    });

  });
});