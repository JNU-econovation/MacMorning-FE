import React, {useCallback, useMemo, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {ReduceMotion} from 'react-native-reanimated';

interface CustomBottomSheetProps {
  BackgroundComponent?: () => React.JSX.Element;
  ViewComponent?: () => React.JSX.Element;
}

const CustomBottomSheet = ({
  ViewComponent,
  BackgroundComponent,
}: CustomBottomSheetProps): React.JSX.Element => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['60%', '100%'], []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {BackgroundComponent && <BackgroundComponent />}
      <BottomSheet
        animateOnMount={false}
        overrideReduceMotion={ReduceMotion.Never}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        backgroundStyle={{
          borderRadius: 70,
        }}
        handleStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0.0)',
        }}>
        <BottomSheetScrollView style={{flex: 1, padding: 36}}>
          {ViewComponent && <ViewComponent />}
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default CustomBottomSheet;
