import React from 'react';
import { connect } from 'react-redux';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const modalIndex = {
  LoginModal,
  RegisterModal
};

const mapStateToProps = state => ({
  openModal: state.modal
});

const ModalManager = ({ openModal }) => {
  let renderModal;

  if (openModal) {
    const { modalType, modalProps } = openModal;
    const ModalComponent = modalIndex[modalType];

    renderModal = <ModalComponent {...modalProps} />;
  }
  return <span>{renderModal}</span>;
};

export default connect(mapStateToProps)(ModalManager);
