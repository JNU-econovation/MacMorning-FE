import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {checkAndRequestPhotoPermission} from './permission';

export const onSelectImage = async (): Promise<File | null> => {
  try {
    // 권한 체크 및 요청
    const hasPermission = await checkAndRequestPhotoPermission();

    if (!hasPermission) {
      console.log('권한이 없어서 이미지 선택을 취소합니다.');
      return null;
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
            resolve(null);
          } else if (response.errorCode) {
            console.log('Image Error : ' + response.errorCode);
            console.log('Error Message : ' + response.errorMessage);
            reject(new Error(response.errorMessage));
          } else if (response.assets && response.assets.length > 0) {
            const asset = response.assets[0];
            if (asset.uri) {
              // File 객체 생성
              const file = new File(
                [asset.uri],
                asset.fileName || 'image.jpg',
                {
                  type: asset.type || 'image/jpeg',
                  lastModified: Date.now(),
                },
              );
              console.log('이미지 선택 성공:', file);
              resolve(file);
            } else {
              resolve(null);
            }
          } else {
            resolve(null);
          }
        },
      );
    });
  } catch (error) {
    console.error('이미지 선택 중 오류:', error);
    throw error;
  }
};
