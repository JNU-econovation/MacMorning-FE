import { useMemo } from 'react';

interface UseDateFormatOptions {
    format?: 'YYYY-MM-DD' | 'YYYY.MM.DD' | 'MM/DD/YYYY';
    locale?: 'ko' | 'en';
}

export const useDateFormat = (
    dateString: string | undefined | null,
    options?: UseDateFormatOptions
) => {
    const formattedDate = useMemo(() => {
        if (!dateString) return '';

        try {
        const date = new Date(dateString);
        
        // 유효한 날짜인지 확인
        if (isNaN(date.getTime())) return '';

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        const format = options?.format || 'YYYY-MM-DD';

        switch (format) {
            case 'YYYY-MM-DD':
            return `${year}-${month}-${day}`;
            case 'YYYY.MM.DD':
            return `${year}.${month}.${day}`;
            case 'MM/DD/YYYY':
            return `${month}/${day}/${year}`;
            default:
            return `${year}-${month}-${day}`;
        }
        } catch (error) {
        console.error('날짜 포맷팅 오류:', error);
        return '';
        }
    }, [dateString, options?.format]);

    return formattedDate;
};