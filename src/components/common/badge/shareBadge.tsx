import React from 'react';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {COLORS} from '@/constants/colors';
import CustomText from '@/utils/CustomText';

interface ShareBadgeProps {
    text: string;
}

const ShareBadge = ({text}: ShareBadgeProps): React.JSX.Element => {
    return (
        <BadgeContainer>
        <CustomText
            style={{fontSize: scale(8), color: COLORS.text.white}}
            font="NPSfont_bold">
            {text}
        </CustomText>
        </BadgeContainer>
    );
};

const BadgeContainer = styled.View`
    background-color:${COLORS.primary};
    border-radius: ${scale(12)}px;
    padding-horizontal: ${scale(8)}px;
    padding-vertical: ${scale(4)}px;
    align-self: flex-start;
`;
export default ShareBadge;