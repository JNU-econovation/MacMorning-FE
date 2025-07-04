// src/apis/upload/imageUpload.ts
import axios from 'axios';
import {onSelectImage} from '@/utils/ImagePicker';

interface UploadResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

const uploadImage = async (): Promise<UploadResult> => {
  try {
    console.log('uploadImage');
    const response = await onSelectImage();

    if (response.didCancel) {
      return {
        success: false,
        error: '이미지 선택이 취소되었습니다.',
      };
    }

    if (response.errorCode) {
      return {
        success: false,
        error: `이미지 선택 오류: ${response.errorMessage}`,
      };
    }

    if (response.assets && response.assets.length > 0) {
      const asset = response.assets[0];
      console.log('선택된 이미지:', asset);

      // const uploadResult = await uploadToS3(asset);

      return {
        success: true,
        imageUrl: asset.uri,
      };
    }

    return {
      success: false,
      error: '이미지를 선택하지 않았습니다.',
    };
  } catch (error) {
    console.error('업로드 중 오류:', error);
    return {
      success: false,
      error: '업로드 중 오류가 발생했습니다.',
    };
  }
};

export default uploadImage;
