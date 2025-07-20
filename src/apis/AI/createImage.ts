import {AI_BASE_URL} from '@/constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createImage = async (bookId: number, pageNumber: number) => {
    const url = `${AI_BASE_URL}/book/${bookId}/image/${pageNumber}`;
    console.log(url);
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await (
            await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `${accessToken}`,
                },
            })
        ).json();
        console.log(response);
        return response.result.s3_filename;
    } catch (error) {
        console.log(error);
    }
};
