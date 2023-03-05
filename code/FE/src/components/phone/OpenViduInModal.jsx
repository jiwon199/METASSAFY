import React from 'react';
import PhoneModal from '../UI/modal/PhoneModal';
import PhoneClose from './PhoneClose';
import OpenViduPage from '../../pages/OpenViduPage';

const OpenViduInModal = (props) => {
  console.log(props.roomSection);
  return (
    <PhoneModal>
      <PhoneClose onClose={props.onClose} />
      <OpenViduPage roomSection={props.roomSection}></OpenViduPage>
    </PhoneModal>
  );
};

export default OpenViduInModal;
