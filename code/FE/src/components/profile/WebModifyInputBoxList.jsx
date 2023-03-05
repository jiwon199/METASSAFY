import { CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  fetchProfileModify,
  fetchTechSave,
} from '../../services/profile-service';
import CalendarInput from './Inputs/CalendarInput';
import DropdownInput from './Inputs/DropdownInput';
import RowRadioButtonsGroup from './Inputs/RowRadioButtonGroup';
import useInfo from '../../hooks/use-info';
import { BiSave } from 'react-icons/bi';
import MultipleSelectChip from './Inputs/MultipleSelectChip';
import { useNavigate } from 'react-router-dom/dist';

const genderList = {
  label: '성별',
  data: ['남성', '여성', '미정'],
};

const generationList = {
  key: 'generation',
  label: '기수',
  data: [9, 8, 7, 6, 5, 4, 3, 2, 1],
};

const areaList = {
  label: '지역',
  data: ['서울', '대전', '구미', '광주', '부울경'],
};

const trackList = {
  label: '트랙',
  data: ['자바', '파이썬', '모바일', '임베디드'],
};

const majorList = {
  label: '전공',
  data: ['전공', '비전공'],
};

const positionList = {
  label: '희망 포지션',
  data: [
    { label: 'BE', value: 'BE', name: 'interest', id: 'BE' },
    { label: 'FE', value: 'FE', name: 'interest', id: 'FE' },
    {
      label: '기타',
      value: '기타',
      name: 'interest',
      id: 'posNull',
    },
  ],
};

const InputBoxList = ({ setIsSubmit }) => {
  const navigate = useNavigate();
  const user = useInfo();
  const [isLoad, setIsLoad] = useState(false);

  const [info, setInfo] = useState({
    user_id: '',
    name: '',
    genderF: '', //남성, 여성
    birthday: '',
    generation: 0, // 기수
    area: '', // 지역
    common_class: '',
    first_semester: '', // 트랙
    major: '', // 전공
    interest: '', // 희망 포지션
    profile_txt: '', // 자기소개
  });
  const [techList, setTechList] = useState([]); // tech_id 기술스택

  useEffect(() => {
    const initInfo = {
      user_id: user.user_id,
      name: user.name || '',
      genderF: user.genderF || '', // 남성, 여성
      birthday: user.birthday || '',
      generation: user.generation || '', // 기수
      area: user.area || '', // 지역
      common_class: user.common_class || '',
      first_semester: user.first_semester || '', // 트랙
      major: user.major || '', // 전공
      interest: user.interest || '', // 희망 포지션
      profile_txt: user.profile_txt || '', // 자기소개
    };
    setInfo({ ...initInfo });
  }, [user]);

  const handleChange = (e, key) => {
    setInfo((preState) => {
      const state = { ...preState };
      state[key] = e.target.value;
      return state;
    });
  };

  const onSubmitHandler = async () => {
    setIsLoad(true);
    await fetchProfileModify(info);

    const techs = techList.map((tech) => tech.tech_id);
    await fetchTechSave(user.user_id, techs);
    // submit
    setIsSubmit(true); // 제출 체크 -> 프로필 이미지 업로드

    setTimeout(() => {
      navigate(`/profile/${user.user_id}`);
    }, '2000');
  };

  return (
    <InputListStyle>
      {/* 이름 */}
      <FlexDiv>
        <InputLineStyle>
          <LabelStyle>이름</LabelStyle>
          <InputsStyle>
            <TextField
              id="standard-basic"
              variant="standard"
              value={info.name || ''}
              onChange={(e) => handleChange(e, 'name')}
            />
          </InputsStyle>
        </InputLineStyle>
        <InputLineStyle>
          <LabelStyle style={{ margin: '0rem 0rem 0.2rem 2rem' }}>
            반
          </LabelStyle>
          <InputsStyle>
            <TextField
              style={{ width: '6.5rem', margin: '0rem 0rem 0rem 2rem' }}
              type="number"
              id="standard-basic"
              variant="standard"
              value={info.common_class || ''}
              onChange={(e) => handleChange(e, 'common_class')}
            />
          </InputsStyle>
        </InputLineStyle>
      </FlexDiv>
      {/* 개인정보 */}
      <InputLineStyle>
        <LabelStyle>개인정보</LabelStyle>
        <InputsStyle>
          <DropdownInput
            data={genderList}
            width="30%"
            value={info.genderF || ''}
            defaultValue={info.genderF || ''}
            onChange={(e) => handleChange(e, 'genderF')}
          />
          <CalendarInput
            value={info.birthday}
            // value="2023-02-03T04:09:23.840Z"
            onChange={(e) => {
              setInfo((preState) => {
                const state = { ...preState };
                const birthday = String(e['$d']).substring(4, 15);
                const year = birthday.substring(7, 11);
                const month = birthday.substring(0, 3);
                const day = birthday.substring(4, 6);

                let newBirthday = '';
                newBirthday += year;

                if (String(month) === 'Jan') {
                  newBirthday += '/01/';
                } else if (month === 'Feb') {
                  newBirthday += '/02/';
                } else if (month === 'Mar') {
                  newBirthday += '/03/';
                } else if (month === 'Apr') {
                  newBirthday += '/04/';
                } else if (month === 'May') {
                  newBirthday += '/05/';
                } else if (month === 'Jun') {
                  newBirthday += '/06/';
                } else if (month === 'Jul') {
                  newBirthday += '/07/';
                } else if (month === 'Aug') {
                  newBirthday += '/08/';
                } else if (month === 'Sep') {
                  newBirthday += '/09/';
                } else if (month === 'Oct') {
                  newBirthday += '/10/';
                } else if (month === 'Nov') {
                  newBirthday += '/11/';
                } else if (month === 'Dec') {
                  newBirthday += '/12/';
                }

                newBirthday += day;

                state['birthday'] = newBirthday;
                return state;
              });
            }}
          />
        </InputsStyle>
      </InputLineStyle>
      {/* SSAFY */}
      <InputLineStyle>
        <LabelStyle>SSAFY</LabelStyle>
        <InputsStyle>
          <DropdownInput
            data={generationList}
            width="25%"
            value={info.generation || ''}
            defaultValue={info.generation || ''}
            onChange={(e) => handleChange(e, 'generation')}
          />
          <DropdownInput
            data={areaList}
            width="25%"
            value={info.area || ''}
            defaultValue={info.area || ''}
            onChange={(e) => handleChange(e, 'area')}
          />
          <DropdownInput
            data={trackList}
            width="25%"
            value={info.first_semester || ''}
            defaultValue={info.first_semester || ''}
            onChange={(e) => handleChange(e, 'first_semester')}
          />
          <DropdownInput
            data={majorList}
            width="25%"
            value={info.major || ''}
            defaultValue={info.major || ''}
            onChange={(e) => handleChange(e, 'major')}
          />
        </InputsStyle>
      </InputLineStyle>
      {/* 희망 포지션 */}
      <InputLineStyle>
        <LabelStyle>희망 포지션</LabelStyle>
        <InputsStyle>
          <RowRadioButtonsGroup
            defaultValue={info.interest}
            data={positionList}
            value={info.interest}
            onChange={(e) => handleChange(e, 'interest')}
          />
        </InputsStyle>
      </InputLineStyle>
      {/* 자기소개 */}
      <InputLineStyle>
        <LabelStyle>자기소개</LabelStyle>
        <InputsStyle>
          <TextField
            fullWidth
            id="standard-basic"
            variant="standard"
            multiline
            maxRows={4}
            value={info.profile_txt || ''}
            onChange={(e) => handleChange(e, 'profile_txt')}
          />
        </InputsStyle>
      </InputLineStyle>
      {/* 기술스택 */}
      <InputLineStyle>
        <LabelStyle>기술스택</LabelStyle>
        <InputsStyle>
          <MultipleSelectChip
            techList={techList}
            setTechList={setTechList}
          ></MultipleSelectChip>
        </InputsStyle>
      </InputLineStyle>

      <ButtonStyle onClick={onSubmitHandler}>
        저장
        <BiSave />
      </ButtonStyle>
      {isLoad && (
        <ProgressStyle>
          <CircularProgress />
        </ProgressStyle>
      )}
    </InputListStyle>
  );
};

export default InputBoxList;

const InputListStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.3rem 2rem;
  width: 100%;
  position: relative;
`;

const LabelStyle = styled.label`
  font-size: 0.8rem;
  color: #617485;
  margin-bottom: 0.2rem;
`;

const InputsStyle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const InputLineStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const ButtonStyle = styled.button`
  width: 5rem;
  height: 2rem;
  background-color: #799fc1;
  border: 1px solid #799fc0;
  border-radius: 8px;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
  font-family: 'korail_bold';
  cursor: pointer;
`;

const FlexDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const ProgressStyle = styled.div`
  position: sticky;
  bottom: 9rem;
`;
