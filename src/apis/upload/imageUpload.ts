import axios from 'axios';
import {baseUrl} from '@/constants/api';

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
    const url = `${baseUrl}/book/${bookId}/story/image`;

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
  asset: File,
) => {
  try {
    const presignedData = await getPresignedUrl(image, bookId, accessToken);
    console.log('Presigned Data:', presignedData);

    const uploadResponse = await fetch(presignedData.data.presigned_url, {
      method: 'PUT',
      body: asset,
      headers: {
        'Content-Type': presignedData.data.content_type || 'image/jpeg',
      },
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error('S3 업로드 응답:', uploadResponse.status, errorText);
      throw new Error(
        `S3 업로드 실패: ${uploadResponse.status} - ${errorText}`,
      );
    }

    return uploadResponse.url;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : '알 수 없는 오류';
    console.error('S3 업로드 오류 상세:', error);
    throw new Error(`이미지 업로드 실패: ${errorMessage}`);
  }
};

export {uploadImageToS3};
