import React, {useCallback, useMemo, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

const BottomSheet = () => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // 컴포넌트 마운트 시 자동으로 표시
  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // snapPoints 추가 (바텀시트 높이 설정)
  const snapPoints = useMemo(() => ['70%', '100%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // renders
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <Button
          onPress={handlePresentModalPress}
          title="Present Modal"
          color="black"
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          enablePanDownToClose={false}
          index={0}>
          <BottomSheetView style={styles.contentContainer}>
            <Text>test</Text>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default BottomSheet;
