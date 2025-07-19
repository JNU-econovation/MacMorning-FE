import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {COLORS} from '@/constants/colors';
import CustomText from '@/utils/CustomText';
import { Illust } from '@/types/book';
import {cloudFrontDomain} from '@/constants/api';

const ChooseThumbnailView = ({illust}: {illust: any}) => {
    const getImageUrl = (imageUrl: string | null | undefined): string => {
        if (!imageUrl) return '';
        return `${cloudFrontDomain}/${imageUrl}`;
    };

    const renderThumbnailItem = ({item}: {item: Illust}) => {
    const imageUrl = getImageUrl(item.image_url);
    
    return (
        <ThumbnailOption>
        {imageUrl ? (
            <ThumbnailImage source={{uri: imageUrl}} />
        ) : (
            <ThumbnailPlaceholder />
        )}
        </ThumbnailOption>
    );
    };
    return (
        <ChooseThumbnailViewContainer>
            <ChooseTextContainer>
                <CustomText font="NPSfont_bold" style={{fontSize: scale(10)}}>
                    이야기를 대표할 이미지를 선택해주세요.
                </CustomText>
            </ChooseTextContainer>
            <ThumbnailFlatListContainer>
                <FlatList
                    data={illust}
                    renderItem={renderThumbnailItem}
                    keyExtractor={(item) => item.illust_id.toString()}
                    numColumns={4}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                    contentContainerStyle={{
                        paddingTop: scale(20),
                        paddingBottom: scale(20),
                    }}
                    columnWrapperStyle={{
                        width: '100%',
                        marginBottom: scale(15),
                        gap:'4%',
                    }}
                />
            </ThumbnailFlatListContainer>
        </ChooseThumbnailViewContainer>
    );
};

const ChooseThumbnailViewContainer = styled.View`
    background-color: ${COLORS.background.white};
    width: 90%;
    height: 100%;
    border-radius: ${scale(10)}px;
    padding-vertical : ${scale(15)}px;
    padding-horizontal : 5%;
`;

const ChooseTextContainer = styled.View`
    width: 100%;
    align-items : center;
    padding-top : ${scale(15)}px;
    padding-bottom : ${scale(15)}px;
`;

const ThumbnailFlatListContainer = styled.View`
    flex: 1;
    width: 100%;
`;

const ThumbnailOption = styled.TouchableOpacity`
    width: 22%;
    aspect-ratio: 0.8;
    border-radius: ${scale(8)}px;
    border-width: ${scale(1)}px;
    border-color: ${COLORS.background.lightGray};
    background-color: ${COLORS.background.lightGray};
`;

const ThumbnailPlaceholder = styled.View`
    flex: 1;
    border-radius: ${scale(6)}px;
    background-color: ${COLORS.background.lightGray};
`;

const ThumbnailImage = styled.Image`
    flex: 1;
    width: 100%;
    height: 100%;
    border-radius: ${scale(6)}px;
`;

export default ChooseThumbnailView;