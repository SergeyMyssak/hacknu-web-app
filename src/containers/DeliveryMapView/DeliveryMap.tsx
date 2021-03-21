import React, { FC, memo, useCallback } from 'react';

import SelectAddressMap from './SelectAddressMap';

import './index.scss';

interface IProps {
  handleAddress: (data?: any) => void;
}

const MAP_HEIGHT = 420;

const DeliveryMap: FC<IProps> = ({ handleAddress }): JSX.Element => {
  const renderMap = useCallback(
    (): JSX.Element => (
      <div
        className="delivery-map"
        style={{ height: MAP_HEIGHT + 2, paddingBottom: 2 }}
      >
        <SelectAddressMap height={MAP_HEIGHT} onChangeAddress={handleAddress} />
      </div>
    ),
    [handleAddress]
  );

  return (
    <>
      {renderMap()}
      <div className="delivery-map__divider" />
    </>
  );
};

export default memo(DeliveryMap);
