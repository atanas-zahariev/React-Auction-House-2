
export const itemValidationHook = (value) => {
    let error;
    const arrOfCategories = ['vehicles', ' real', 'estate', 'electronics', 'furniture', 'other'];

    const IMAGE_URL = /^https?:\/\/.*/i;

    const { title, category, imgUrl, price, description } = value;


    if (Object.values(value).some(x => x === '')) {
        error = ['All fields are required.'];
        throw error;
    }

    if (title) {
        if (title.length < 4) {
            error = ['Title must be at least 4 characters.'];
            throw error;
        }
    }

    if (category) {
        if (!arrOfCategories.includes(category)) {
            error = ['It is not in the list of categories.'];
            throw error;
        }
    }

    if (imgUrl) {
        if (!IMAGE_URL.test(imgUrl)) {
            error = ['Invalid Url.'];
            throw error;
        }
    }

    if (price) {
        if (Number(price) <= 0) {
            error = ['This price cannot be real.'];
            throw error;

        }
    }

    if (description) {
        if (description.length > 200) {
            error = ['Description must be at most 200 characters.'];
            throw error;
        };
    }

};