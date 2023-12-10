import { Link } from 'react-router-dom';

export const Default = () => {
    return (
        <section id="catalog-section" className="narrow align-center padded">

            <h1 class="item">404 Not Found</h1>

            <div>
                <p>
                    The requested item doesn't exist
                </p>
                <div class="align-center">
                    <Link class="action" to="/catalog">Back to catalog</Link>
                </div>
            </div>

        </section>
    );
};