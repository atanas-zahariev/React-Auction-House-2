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

    it('test for details  with user how is not Owner and is the highest bidder.', async () => {
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

        await act(async () => {
            userEvent.click(screen.getByRole('link', { name: 'Logout' }));
        });

        await waitFor(() => {
            const loginLink = screen.getByRole('link', { name: 'Login' });
            expect(loginLink).toBeInTheDocument();
        });

    });

    it('test for details  with user how is Owner and there is a buyer.', async () => {
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

                const item = within(ulList).getAllByRole('listitem')[1];

                const detailsButton = within(item).getByRole('link', { name: 'See details' });

                userEvent.click(detailsButton);

                await waitFor(async () => {
                    const closeActionLink = screen.getByRole('link', { name: 'Close Auction' });
                    expect(closeActionLink).toBeInTheDocument();

                });

            });

        });

        await act(async () => {
            userEvent.click(screen.getByRole('link', { name: 'Logout' }));
        });

        await waitFor(() => {
            const catalogLink = screen.getByRole('link', { name: 'Browse Listings' });
            expect(catalogLink).toBeInTheDocument();
        });
    });

    it('test for details edit item functionality with right input.', async () => {
        const { container } = render(
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
            const catalogLink = screen.getByRole('link', { name: 'Browse Listings' });
            expect(catalogLink).toBeInTheDocument();

            userEvent.click(catalogLink);

            await waitFor(async () => {
                const ulList = container.getElementsByClassName('catalog cards')[0];
                const detailsLink = within(ulList).getAllByRole('link', { name: 'See details' })[1];

                userEvent.click(detailsLink);

                await waitFor(async () => {
                    expect(ulList).not.toBeInTheDocument();

                    const editLink = screen.getByRole('link', { name: 'Edit' });

                    userEvent.click(editLink);

                    await waitFor(async () => {
                        expect(editLink).not.toBeInTheDocument();

                        const title = screen.getByLabelText('Title');

                        const updateButton = screen.getByText('Update Listing');

                        userEvent.clear(title);

                        userEvent.type(title, 'Car for real driver!');

                        await waitFor(async () => {
                            expect(title).toHaveValue('Car for real driver!');

                            userEvent.click(updateButton);

                            await waitFor(async () => {
                                expect(updateButton).not.toBeInTheDocument();
                            });
                        });
                    });
                });

            });
        });

        await act(async () => {
            userEvent.click(screen.getByRole('link', { name: 'Logout' }));
        });

        await waitFor(() => {
            const catalogLink = screen.getByRole('link', { name: 'Browse Listings' });
            expect(catalogLink).toBeInTheDocument();
        });

    });

    it('test for details edit item functionality with wrong input.', async () => {
        const { container } = render(
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
            const catalogLink = screen.getByRole('link', { name: 'Browse Listings' });
            expect(catalogLink).toBeInTheDocument();

            userEvent.click(catalogLink);

            await waitFor(async () => {
                const ulList = container.getElementsByClassName('catalog cards')[0];
                const detailsLink = within(ulList).getAllByRole('link', { name: 'See details' })[1];

                userEvent.click(detailsLink);

                await waitFor(async () => {
                    expect(ulList).not.toBeInTheDocument();

                    const editLink = screen.getByRole('link', { name: 'Edit' });

                    userEvent.click(editLink);

                    await waitFor(async () => {
                        expect(editLink).not.toBeInTheDocument();

                        const title = screen.getByLabelText('Title');

                        const updateButton = screen.getByText('Update Listing');

                        userEvent.clear(title);

                        await waitFor(async () => {
                            userEvent.click(updateButton);

                            await waitFor(async () => {
                                const errorBox = container.getElementsByClassName('error-box')[0];
                                expect(errorBox).toBeInTheDocument();
                            });
                        });
                    });
                });

            });
        });

        await act(async () => {
            userEvent.click(screen.getByRole('link', { name: 'Logout' }));
        });

        await waitFor(() => {
            const catalogLink = screen.getByRole('link', { name: 'Browse Listings' });
            expect(catalogLink).toBeInTheDocument();
        });

    });

    it('test for details  with user how is not Owner and make offer.', async () => {
        //for this test it is necessary to check the database, otherwise it will return an error, which would also affect the other tests.
        const { container } = render(
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

                const item = within(ulList).getAllByRole('listitem')[3];

                const detailsButton = within(item).getByRole('link', { name: 'See details' });

                userEvent.click(detailsButton);

                await waitFor(async () => {
                    const placeBidButton = screen.getByText('Place bid');

                    expect(placeBidButton).toBeInTheDocument();

                    const bidAmount = screen.getByRole('spinbutton');

                    const currentPrice = container.getElementsByTagName('strong')[1];

                    userEvent.type(bidAmount, String(Number(currentPrice.textContent) + Number('1')));
                    userEvent.click(placeBidButton);

                    await waitFor(async () => {
                        expect(placeBidButton).not.toBeInTheDocument();
                        screen.debug();
                    });
                });

            });

        });

        await act(async () => {
            userEvent.click(screen.getByRole('link', { name: 'Logout' }));
        });

        await waitFor(() => {
            const loginLink = screen.getByRole('link', { name: 'Login' });
            expect(loginLink).toBeInTheDocument();
        });

    });
});