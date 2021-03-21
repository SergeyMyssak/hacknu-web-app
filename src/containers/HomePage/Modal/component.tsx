import React, { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Close from './close.png';
import { FormInputs, FormValues, ModalProps } from './types';

import './styles.scss';

function ProjectModal(props: ModalProps): JSX.Element {
  const { onCloseModal, submitPhone } = props;

  const { handleSubmit, register } = useForm<FormValues>({
    mode: 'onChange',
  });

  const onFormSubmit = useCallback<SubmitHandler<FormValues>>(
    (values) => {
      submitPhone({
        phone: values.telephone,
      });
    },
    [submitPhone]
  );

  return (
    <div className="project-modal">
      <div className="project-modal-header">
        <div style={{ cursor: 'pointer', marginLeft: '-16px' }}>
          <img src={Close} alt="close" onClick={onCloseModal} />
        </div>
      </div>
      <div
        style={{
          paddingLeft: '18px',
          paddingRight: '18px',
          marginBottom: '20px',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontFamily: 'DM Sans', fontWeight: 'bold' }}>
          To add a request enter your phone number
        </span>
      </div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="input-wrp">
          <span className=""> Phone number </span>
          <input
            name={FormInputs.Telephone}
            id={FormInputs.Telephone}
            type="tel"
            className="inputText typography__variant-text my-8 mr-8"
            ref={register({
              required: 'Required',
            })}
            placeholder="Enter phone number"
            required
            style={{ marginTop: '10px', width: '90%' }}
          />
        </div>
        <div
          style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          <button
            className="main-button"
            style={{
              marginTop: '32px',
              fontFamily: 'DM Sans',
              fontSize: '14px',
            }}
            type="submit"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProjectModal;
