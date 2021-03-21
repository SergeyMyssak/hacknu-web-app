import React, { FC, useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop, CircularProgress } from '@material-ui/core';

import DeliveryMap from 'containers/DeliveryMapView/DeliveryMap';
import CodeModal from 'containers/HomePage/FingerPrintModal/component';
import ProjectModal from 'containers/HomePage/Modal/component';

import { AppState } from '../../store';

import { containerId as homePageId, createApplication } from './reducer';
import { FormInputs, FormValues } from './types';

import './styles.scss';

const DEFAULT_VALUES = {
  categoryId: 1,
  address: '',
  need: '',
  problem: '',
  longitude: '',
  latitude: '',
};

const HomePage: FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const { handleSubmit, register, reset } = useForm<FormValues>({
    mode: 'onChange',
  });

  const { isApplicationLoading } = useSelector(
    (state: AppState) => state[homePageId]
  );

  const [phoneNumber, setPhoneNumber] = useState('');

  const [
    isPhoneNumberModalOpen,
    setPhoneNumberModalVisibility,
  ] = useState<boolean>(false);
  const [
    isVerificationCodeModalOpen,
    setVerificationCodeModalVisibility,
  ] = useState<boolean>(false);

  const [addressData, setAddressData] = useState<any>();

  const [applicationData, setApplicationData] = useState(DEFAULT_VALUES);

  const onFormSubmit = useCallback<SubmitHandler<FormValues>>(
    ({ category, need, description }) => {
      const newData = {
        ...applicationData,
        categoryId: parseInt(category, 10),
        need,
        problem: description,
      };

      setApplicationData(newData);
      setPhoneNumberModalVisibility(true);
    },
    []
  );

  const handleSubmitPhone = (phone: any) => {
    setPhoneNumber(phone.phone);
    setPhoneNumberModalVisibility(false);
    setVerificationCodeModalVisibility(true);
  };

  const onChangeAddress = (address: any) => {
    setAddressData(address);
  };

  const handleSubmitForm = (code: any) => {
    setVerificationCodeModalVisibility(false);
    const callback = () => {
      reset();
      setAddressData(undefined);
    };

    dispatch(
      createApplication.request({
        ...applicationData,
        ...addressData,
        phone: phoneNumber,
        code,
        fingerprint: '!@#$',
        reset: callback,
      })
    );
  };

  return (
    <>
      <div
        className={
          isPhoneNumberModalOpen || isVerificationCodeModalOpen
            ? 'formContainerModal'
            : 'formContainer'
        }
      >
        <div className="homepageContainer">
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="input-wrp mt-24">
              <span className="inputLabel">Category</span>
              <div style={{ marginTop: '8px' }}>
                <select
                  ref={register}
                  name={FormInputs.Category}
                  style={{
                    height: '48px',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '5px',
                  }}
                >
                  <option value="1">Medicines</option>
                  <option value="2">Groceries</option>
                  <option value="3">Consultation</option>
                </select>
              </div>
            </div>
            <div className="input-wrp" style={{ marginTop: '16px' }}>
              <span className="inputLabel">Additional Information</span>
              <input
                name={FormInputs.Info}
                id={FormInputs.Info}
                type="text"
                style={{ marginTop: '8px' }}
                className="inputText typography__variant-text my-8 mr-8"
                ref={register()}
                placeholder="Enter additional information"
                required
              />
            </div>
            <div className="input-wrp" style={{ marginTop: '16px' }}>
              <span className="inputLabel">What you need</span>
              <input
                name={FormInputs.Need}
                id={FormInputs.Need}
                style={{ marginTop: '8px' }}
                type="text"
                className="inputText typography__variant-text my-8"
                placeholder="Enter what you need"
                required
                ref={register()}
              />
            </div>
            <div className="input-wrp" style={{ marginTop: '16px' }}>
              <span className="inputLabel">Description of the problem</span>
              <input
                name={FormInputs.Description}
                id={FormInputs.Description}
                style={{ marginTop: '8px' }}
                type="text"
                className="inputText typography__variant-text my-8 mr-8"
                ref={register()}
                placeholder="Enter description"
                required
              />
            </div>
            <div className="input-wrp" style={{ marginTop: '16px' }}>
              <div style={{ marginBottom: '16px' }}>
                <span className="inputLabel">Select address</span>
              </div>
              <DeliveryMap handleAddress={onChangeAddress} />
              {addressData?.address && (
                <p
                  className="react-select__label delivery-map__label"
                  style={{ fontWeight: 400 }}
                >
                  Your address is: {addressData?.address}
                </p>
              )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                className="auth_button"
                style={{ marginTop: '32px', fontFamily: 'DM Sans' }}
                type="submit"
              >
                Request
              </button>
            </div>
          </form>
        </div>
      </div>
      {isPhoneNumberModalOpen && (
        <ProjectModal
          submitPhone={handleSubmitPhone}
          onCloseModal={() => setPhoneNumberModalVisibility(false)}
        />
      )}
      {isVerificationCodeModalOpen && (
        <CodeModal
          submitPhone={handleSubmitForm}
          onCloseModal={() => setVerificationCodeModalVisibility(false)}
        />
      )}
      <Backdrop open={isApplicationLoading} style={{ zIndex: 10000 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default HomePage;
