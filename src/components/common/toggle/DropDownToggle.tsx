import React, {useState} from 'react';
import {TouchableOpacity, Text, Animated} from 'react-native';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {COLORS} from '@/constants/colors';

interface DropDownToggleProps {
  title: string;
  list: string[];
  isOpen?: boolean;
  onChange?: (value: string) => void;
  value?: string;
}

const DropDownToggle = ({
  title,
  list,
  isOpen: controlledIsOpen,
  onChange,
  value,
}: DropDownToggleProps): React.JSX.Element => {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  const isOpen = controlledIsOpen ?? uncontrolledIsOpen;
  const [animation] = useState(new Animated.Value(0));

  const onPress = (item: string) => {
    onChange?.(item);
    toggleDropdown();
  };

  const toggleDropdown = () => {
    const newIsOpen = !isOpen;
    setUncontrolledIsOpen(newIsOpen);
    Animated.timing(animation, {
      toValue: newIsOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const rotateAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <Container>
      <Header onPress={toggleDropdown} activeOpacity={1}>
        <Title>{value || title}</Title>
        <ArrowContainer
          style={{
            transform: [{rotate: rotateAnimation}],
          }}>
          <ArrowText>▼</ArrowText>
        </ArrowContainer>
      </Header>
      {isOpen && (
        <Content>
          {list.map(item => (
            <ItemContainer
              key={item}
              onPress={() => onPress(item)}
              activeOpacity={1}>
              <ItemText>{item}</ItemText>
            </ItemContainer>
          ))}
        </Content>
      )}
    </Container>
  );
};

const Container = styled.View`
  border-width: 1px;
  border-color: ${COLORS.background.lightGray};
  border-radius: ${scale(8)}px;
  width: ${scale(50)}px;
  overflow: visible;
  position: relative;
`;

const Header = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${scale(2)}px ${scale(8)}px;
  background-color: ${COLORS.background.white};
  border-radius: ${scale(8)}px;
  z-index: 2;
`;

const Title = styled.Text`
  font-size: ${scale(8)}px;
  font-weight: 500;
`;

const ArrowContainer = styled(Animated.View)`
  height: ${scale(20)}px;
  justify-content: center;
  align-items: center;
`;

const ArrowText = styled.Text`
  font-size: ${scale(8)}px;
  color: ${COLORS.text.secondary};
`;

const Content = styled.View`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${COLORS.background.white};
  border-width: 1px;
  border-color: ${COLORS.background.lightGray};
  border-radius: ${scale(8)}px;
  margin-top: ${scale(4)}px;
  z-index: 1;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

const ItemContainer = styled(TouchableOpacity)`
  padding: ${scale(8)}px ${scale(8)}px;
`;

const ItemText = styled.Text`
  font-size: ${scale(8)}px;
  color: ${COLORS.text.primary};
`;

export default DropDownToggle;
