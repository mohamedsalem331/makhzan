import axios from "axios";

export const BASE_URL = "https://cloudinary.com";

export const fetchImages = async () => {
    try {
        return await axios.get(`${BASE_URL}/images`);
    } catch (e) {
        return [];
    }
};