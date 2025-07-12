// src/apis/upload/imageUpload.ts
import axios from 'axios';
import {onSelectImage} from '@/utils/ImagePicker';
import {baseUrl} from '@/constants/api';
import {useAuthStore} from '@/store/authStore';

interface UploadResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

const getPresignedUrl = async (
  image: string,
  bookId: number,
  accessToken: string,
) => {
  try {
    if (!accessToken) {
      const authError = new Error('인증 토큰이 없습니다. 다시 로그인해주세요.');
      console.error(authError.message);
      throw authError;
    }
    const url = `https://api.ilovejokbal.monster/v1/book/${bookId}/story/image`;

    const response = await axios.post(
      url,
      {
        filename: image.split('/').pop(),
      },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : '알 수 없는 오류';
    console.error('Presigned URL 요청 오류:', errorMessage);

    throw new Error(`업로드 오류: ${errorMessage}`);
  }
};

const uploadImageToS3 = async (
  image: string,
  bookId: number,
  accessToken: string,
) => {
  try {
    const presignedData = await getPresignedUrl(image, bookId, accessToken);

    const uploadResponse = await fetch(presignedData.data.presignedUrl, {
      method: 'PUT',
      body: image,
      headers: {
        'Content-Type': 'image/jpeg',
      },
    });

    if (!uploadResponse.ok) {
      throw new Error(`S3 업로드 실패: ${uploadResponse.status}`);
    }

    return presignedData.imageUrl;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : '알 수 없는 오류';
    console.error('S3 업로드 오류:', errorMessage);
    throw new Error(`이미지 업로드 실패: ${errorMessage}`);
  }
};

export {uploadImageToS3};
