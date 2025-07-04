// src/utils/permissions.ts
import {Platform, Alert, Linking} from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  checkMultiple,
  requestMultiple,
} from 'react-native-permissions';

export const checkAndRequestPhotoPermission = async (): Promise<boolean> => {
  try {
    let permission;
    const res = await checkMultiple([PERMISSIONS.IOS.PHOTO_LIBRARY]);

    if (res['ios.permission.PHOTO_LIBRARY'] === 'denied') {
      const req = await requestMultiple([PERMISSIONS.IOS.PHOTO_LIBRARY]);
    }

    if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
    } else {
      // Android 13 이상
      permission = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
    }

    const result = await check(permission);
    console.log('권한 상태:', result);

    switch (result) {
      case RESULTS.UNAVAILABLE:
        Alert.alert('권한 오류', '이 기기에서는 갤러리 접근이 불가능합니다.', [
          {text: '확인'},
        ]);
        return false;

      case RESULTS.DENIED:
        const permissionResult = await request(permission);
        console.log('권한 요청 결과:', permissionResult);

        if (permissionResult === RESULTS.GRANTED) {
          return true;
        } else {
          Alert.alert('권한 필요', '갤러리 접근 권한이 필요합니다.', [
            {text: '취소', style: 'cancel'},
            {text: '설정으로 이동', onPress: () => openSettings()},
          ]);
          return false;
        }

      case RESULTS.LIMITED:
        return true;

      case RESULTS.BLOCKED:
        Alert.alert(
          '권한 차단됨',
          '갤러리 접근이 차단되었습니다. 설정에서 권한을 허용해주세요.',
          [
            {text: '취소', style: 'cancel'},
            {text: '설정으로 이동', onPress: () => openSettings()},
          ],
        );
        return false;

      case RESULTS.GRANTED:
        return true;

      default:
        return false;
    }
  } catch (error) {
    console.error('권한 체크 중 오류:', error);
    return false;
  }
};

const openSettings = () => {
  if (Platform.OS === 'ios') {
    Linking.openURL('app-settings:');
  } else {
    Linking.openSettings();
  }
};
