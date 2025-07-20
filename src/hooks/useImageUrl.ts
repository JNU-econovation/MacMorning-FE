import { useState, useEffect } from 'react';
import {cloudFrontDomain} from '@/constants/domain';

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

//페이지 따로 이미지 받을때는 domain없이 받아와서 기존 도메인에 이미지 주소 붙이는 함수
export const useStoryImageUrl = (imageUrl: string | undefined | null): string => {
  const [storyImageUrl, setStoryImageUrl] = useState<string>('');

  useEffect(() => {
    if (!imageUrl) {
      const basicUrl = `${cloudFrontDomain}/basic.png`;
      setStoryImageUrl(basicUrl);
      return;
    }

    // cloudFrontDomain + imageUrl 조합
    const fullUrl = `${cloudFrontDomain}/${imageUrl}`;
    setStoryImageUrl(fullUrl);
  }, [imageUrl]);

  return storyImageUrl;
};