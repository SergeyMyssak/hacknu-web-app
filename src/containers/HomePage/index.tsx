import React, { FC, useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import DeliveryMap from 'containers/DeliveryMapView/DeliveryMap';
import CodeModal from 'containers/HomePage/FingerPrintModal/component';
import ProjectModal from 'containers/HomePage/Modal/component';
import authActions from 'store/auth/actions';

import { FormInputs, FormValues } from './types';

import './styles.scss';

const HomePage: FC = (props: any): JSX.Element => {
  const { handleSubmit, register, reset } = useForm<FormValues>({
    mode: 'onChange',
  });

  const { signUp, userData, userLoading } = props;

  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<string>('');

  const DEFAULT_VALUES = {
    categoryId: 1,
    address: '',
    need: 'Money',
    problem: 'I got robbed',
    longitude: '',
    latitude: '',
  };

  const [isCodeModal, setIsCodeModal] = useState<boolean>(false);
  const [applicationData, setApplicationData] = useState(DEFAULT_VALUES);

  const onFormSubmit = useCallback<SubmitHandler<FormValues>>((values) => {
    const newData = {
      ...applicationData,
      categoryId: parseInt(values.category, 10),
      need: values.need,
      problem: values.description,
    };
    setApplicationData(newData);
    setTimeout(() => {
      setIsShowModal(true);
      reset({});
    }, 1500);
    console.log(values);
  }, []);

  console.log('the the reducers: ', userData, userLoading);

  const handleSubmitPhone = (phone: any) => {
    setIsShowModal(false);
    openCodeModal();
    setPhoneNumber(phone.phone);
    // signUp({ phone: phone, fingerprint: '12345' });
  };

  const onChangeAddress = (address: any) => {
    console.log('the address: ', address);
    setSelectedAddress(address.address);
    const newData = {
      ...applicationData,
      address: address.address,
      latitude: address.latitude.toString(),
      longitude: address.longitude.toString(),
    };
    setApplicationData(newData);
  };

  const openCodeModal = () => {
    setTimeout(() => {
      setIsCodeModal(true);
    }, 1500);
  };

  const handleSubmitCode = (code: any) => {
    console.log('the code: ', code);
    setIsCodeModal(false);
    setVerificationCode(code.phone);
    signUp({ phone: phoneNumber, fingerprint: code.phone });
    // console.log('heeey', phoneNumber, code);
  };

  console.log('the application data: ', applicationData);

  return (
    <>
      <div className={isShowModal ? 'formContainerModal' : 'formContainer'}>
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
              <DeliveryMap
                // region={region}
                // address={address}
                // city={city}
                handleAddress={onChangeAddress}
              />
              {selectedAddress !== '' && (
                <p
                  className="react-select__label delivery-map__label"
                  style={{ fontWeight: 400 }}
                >
                  Your address is: {selectedAddress}
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
      {isShowModal && (
        <ProjectModal
          submitPhone={handleSubmitPhone}
          onCloseModal={() => setIsShowModal(false)}
        />
      )}
      {isCodeModal && (
        <CodeModal
          submitPhone={handleSubmitCode}
          onCloseModal={() => setIsCodeModal(false)}
        />
      )}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  userLoading: state.authReducer.login.loading,
  userData: state.authReducer.login.data,
});

const mapDispatchToProps = {
  signUp: authActions.signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
