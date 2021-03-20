import React, { FC, memo, useCallback } from 'react';

// import { IAddress, ICity, IRegion } from '@interfaces/location';
// import { capitalizeFirstLetter } from '@utils/serialization';
import SelectAddressMap from './SelectAddressMap';

import './index.scss';

// interface IProps {
//   isSelectAddressBottomSheetOpen: boolean;
//   openSelectAddressBottomSheet: () => void;
//   handleAddress?: (data?: any) => void;
//   onChangeState: (state: boolean) => void;
// }

interface IProps {
  handleAddress: (data?: any) => void;
}

const MAP_HEIGHT = 420;

const DeliveryMap: FC<IProps> = ({
  //   region,
  //   city,
  //   address,
  handleAddress,
}): JSX.Element => {
  const renderMap = useCallback(
    (): JSX.Element => (
      <div
        className="delivery-map"
        style={{ height: MAP_HEIGHT + 2, paddingBottom: 2 }}
      >
        <SelectAddressMap
          //   region={region}
          //   address={address}
          //   city={city}
          height={MAP_HEIGHT}
          onChangeAddress={handleAddress}
        />
      </div>
    ),
    [handleAddress]
  );

  //   const labelText = 'LABEL TEXT';
  //   const { address: addressName } = address || {};

  return (
    <>
      {/* <p className="react-select__label delivery-map__label">{labelText}</p> */}
      {renderMap()}
      {/* {addressName && <p className="delivery-map__address"> {addressName} </p>} */}
      <div className="delivery-map__divider" />
    </>
  );
};

export default memo(DeliveryMap);
