import React, {useCallback, useMemo, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {ReduceMotion} from 'react-native-reanimated';

interface CustomBottomSheetProps {
  BackgroundComponent?: React.FC;
  ViewComponent?: React.FC;
}

const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({
  ViewComponent,
  BackgroundComponent,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['60%', '100%'], []);

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: 'red'}}>
      {BackgroundComponent && <BackgroundComponent />}
      <BottomSheet
        animateOnMount={false}
        overrideReduceMotion={ReduceMotion.Never}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        backgroundStyle={{
          borderRadius: 30,
        }}
        handleStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0.0)',
        }}>
        <BottomSheetView style={{flex: 1, padding: 36, alignItems: 'center'}}>
          {ViewComponent && <ViewComponent />}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default CustomBottomSheet;
