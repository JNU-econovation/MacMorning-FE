import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {checkAndRequestPhotoPermission} from './permission';

export const onSelectImage = async (): Promise<ImagePickerResponse> => {
  try {
    // 권한 체크 및 요청
    const hasPermission = await checkAndRequestPhotoPermission();

    if (!hasPermission) {
      console.log('권한이 없어서 이미지 선택을 취소합니다.');
      return {
        didCancel: true,
        errorMessage: '권한이 거부되었습니다.',
      } as ImagePickerResponse;
    }

    return new Promise((resolve, reject) => {
      launchImageLibrary(
        {
          mediaType: 'photo',
          includeBase64: true,
          maxWidth: 1024,
          maxHeight: 1024,
          quality: 0.8,
          selectionLimit: 1,
        },
        response => {
          console.log('ImagePicker Response:', response);

          if (response.didCancel) {
            console.log('사용자가 선택을 취소했습니다.');
            resolve(response);
          } else if (response.errorCode) {
            console.log('Image Error : ' + response.errorCode);
            console.log('Error Message : ' + response.errorMessage);
            reject(new Error(response.errorMessage));
          } else {
            console.log('이미지 선택 성공:', response.assets);
            resolve(response);
          }
        },
      );
    });
  } catch (error) {
    console.error('이미지 선택 중 오류:', error);
    throw error;
  }
};
