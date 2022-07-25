import React from 'react';

//internal import
import Common from '@component/login/Common';
import MainModal from '@component/modal/MainModal';

const LoginModal = ({ modalOpen, setModalOpen }) => {
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block w-full max-w-lg p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
        <Common setModalOpen={setModalOpen} />
      </div>
    </MainModal>
  );
};

export default React.memo(LoginModal);
