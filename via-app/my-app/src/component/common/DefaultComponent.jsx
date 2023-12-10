/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Link } from 'react-router-dom';

export const Default = () => {
    return (
        <section id="catalog-section" className="narrow align-center padded">

            <h1 className="item">404 Not Found</h1>

            <div>
                <p>
                    The requested item doesn't exist
                </p>
                <div className="align-center">
                    <Link class="action" to="/catalog">Back to catalog</Link>
                </div>
            </div>

        </section>
    );
};