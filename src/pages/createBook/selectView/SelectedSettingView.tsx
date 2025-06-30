import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '@/constants/colors';
import {scale} from 'react-native-size-matters';
import CustomText from '@/utils/CustomText';
import {FormData} from '@/types/form';

const RowDetailView = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <RowDetailContainer>
      <SubTitleText font="NPSfont_bold">{title}</SubTitleText>
      <DescriptionText font="NanumSquareNeo-cBd">{description}</DescriptionText>
    </RowDetailContainer>
  );
};

const DetailView = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <DetailContainer>
      <SubTitleText font="NPSfont_bold">{title}</SubTitleText>
      <DescriptionText font="NanumSquareNeo-cBd">{description}</DescriptionText>
    </DetailContainer>
  );
};
const SelectedSettingView = ({data}: {data: FormData}) => {
  console.log(data);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SelectedSettingContainer>
        <ViewContainer>
          <TitleText font="NPSfont_bold">이야기 설정</TitleText>
          <RowContainer>
            <RowDetailView title="제목" description={data.title} />
            <RowDetailView title="장르" description={data.genre.join(', ')} />
            <RowDetailView
              title="게임 모드"
              description={data.gameMode ? '켜기' : '끄기'}
            />
          </RowContainer>
          <RowDetailView title="줄거리" description={data.story.plot} />
          <RowDetailView
            title="시대적 배경"
            description={data.story.background}
          />
        </ViewContainer>
        <ViewContainer>
          <TitleText font="NPSfont_bold">주인공 설정</TitleText>
          <RowContainer>
            <RowDetailView title="이름" description={data.character.name} />
            <RowDetailView title="성별" description={data.character.gender} />
            <RowDetailView title="나이" description={data.character.age} />
          </RowContainer>
          <RowDetailView
            title="설명"
            description={data.character.description}
          />
        </ViewContainer>
      </SelectedSettingContainer>
    </ScrollView>
  );
};

const ScrollView = styled.ScrollView`
  width: 100%;
`;

const SelectedSettingContainer = styled.View`
  gap: ${scale(20)}px;
  padding: ${scale(20)}px 0;
`;

const ViewContainer = styled.View`
  gap: ${scale(10)}px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  gap: ${scale(10)}px;
  justify-content: space-between;
  align-items: center;
`;

const TitleText = styled(CustomText)`
  font-size: ${scale(10)}px;
  font-weight: bold;
`;

const SubTitleText = styled(CustomText)`
  font-size: ${scale(8)}px;
  color: ${COLORS.primary};
`;

const DescriptionText = styled(CustomText)`
  font-size: ${scale(8)}px;
  color: ${COLORS.text.primary};
`;

const RowDetailContainer = styled.View`
  gap: ${scale(10)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DetailContainer = styled.View`
  gap: ${scale(10)}px;
`;

export default SelectedSettingView;
