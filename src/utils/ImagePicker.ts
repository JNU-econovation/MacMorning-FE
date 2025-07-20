import {
  launchImageLibrary,
} from 'react-native-image-picker';
import {checkAndRequestPhotoPermission} from './permission';

export const onSelectImage = async (): Promise<{blob: Blob, filename: string} | null> => {
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
        async response => {
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
              try {
                // URI를 Blob으로 변환
                const response = await fetch(asset.uri);
                const blob = await response.blob();
                
                console.log('Blob 생성 성공:', {
                  size: blob.size,
                  type: blob.type,
                  filename: asset.fileName || 'image.jpg'
                });
                
                resolve({
                  blob: blob,
                  filename: asset.fileName || 'image.jpg'
                });
              } catch (error) {
                console.error('Blob 생성 실패:', error);
                reject(error);
              }
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
