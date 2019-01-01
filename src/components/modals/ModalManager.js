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
  let renderedModal;

  if (openModal) {
    const { modalType, modalProps } = openModal;
    const ModalComponent = modalIndex[modalType];

    renderedModal = <ModalComponent {...modalProps} />;
  }
  return <span>{renderedModal}</span>;
};

export default connect(mapStateToProps)(ModalManager);
