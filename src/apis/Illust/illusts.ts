import {baseUrl} from '@/constants/api';
import {Illust} from '@/types/book';

async function getBookAllIllust(bookId: number, accessToken?: string): Promise<Illust[] | null> {
    const url = `${baseUrl}/book/${bookId}/image`;
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
            Authorization: `${accessToken}`,
            },
        });
        const result = await response.json();
        if (result.success && result.data?.illusts) {
            return result.data.illusts;
        }
    
        return null;
    } catch (error) {
    console.error('getBookAllIllust API 에러:', error);
    return null;
    }
}

async function setThumbnail(bookId: number, titleImg: string, accessToken?: string): Promise<boolean> {
    const url = `${baseUrl}/book/${bookId}/image`;
    
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${accessToken}`,
            },
            body: JSON.stringify({
                title_img: titleImg
            }),
        });

        console.log('응답 상태:', response.status);
        
        if (response.status === 204) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('setThumbnail API 에러:', error);
        return false;
    }
}

export {getBookAllIllust, setThumbnail};
