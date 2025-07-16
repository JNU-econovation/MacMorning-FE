import { useState, useEffect } from 'react';
import {cloudFrontDomain} from '@/constants/api';

//title_img_url에 /가 안붙어있어서 없다면 붙이는 함수 
export const useImageUrl = (url: string | undefined | null): string => {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    if (!url) {
      setImageUrl('');
      return;
    }

    if (url.startsWith(cloudFrontDomain) && !url.includes(cloudFrontDomain + '/')) {
      setImageUrl(url.replace(cloudFrontDomain, cloudFrontDomain + '/'));
    } else {
      setImageUrl(url);
    }
  }, [url]);

  return imageUrl;
};