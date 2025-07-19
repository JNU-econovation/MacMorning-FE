import React, {useState} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {COLORS} from '@/constants/colors';
import CustomText from '@/utils/CustomText';
import { Illust } from '@/types/book';
import {cloudFrontDomain} from '@/constants/api';

interface ChooseThumbnailViewProps {
    illust: Illust[];
    onSelectThumbnail: (selectedId: number | null) => void;
}

const ChooseThumbnailView = ({illust, onSelectThumbnail}: ChooseThumbnailViewProps) => {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    // illust가 배열로 받아와져서 hook이 안먹혀서 만든 함수
    const getImageUrl = (imageUrl: string | null | undefined): string => {
        if (!imageUrl) {
            return `${cloudFrontDomain}/basic.png`;
        }
        return `${cloudFrontDomain}/${imageUrl}`;
    };


    const renderThumbnailItem = ({item}: {item: Illust}) => {
        const imageUrl = getImageUrl(item.image_url);
        const isSelected = selectedId === item.illust_id;

        return (
            <ThumbnailOption 
            isSelected={isSelected}
            onPress={() => handleSelectThumbnail(item.illust_id)}
            >
                {imageUrl ? (
                    <ThumbnailImage source={{uri: imageUrl}} />
                ) : (
                    <ThumbnailPlaceholder />
                )}
            </ThumbnailOption>
        );
    };

    const handleSelectThumbnail = (illustId: number) => {
        setSelectedId(illustId);
        onSelectThumbnail(illustId);
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
    border-width: ${(props: {isSelected: boolean}) => props.isSelected ? scale(2) : scale(1)}px;
    border-color: ${(props: {isSelected: boolean}) => props.isSelected ? COLORS.primary : COLORS.background.lightGray};
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