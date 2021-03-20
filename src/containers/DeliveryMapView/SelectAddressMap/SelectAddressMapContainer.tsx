import { FC, memo, useCallback, useMemo, useRef, useState } from 'react';

// import { IAddress, ICity, IRegion } from '@interfaces/location';
import SelectAddressMapView from './SelectAddressMapView';

interface IProps {
  // region?: IRegion;
  // city?: ICity;
  // address?: IAddress;
  height: number;
  onChangeAddress: (data?: any) => void;
}

const SelectAddressMapContainer: FC<IProps> = ({
  onChangeAddress,
  ...props
}): JSX.Element | null => {
  const mapState = useMemo(
    () => ({
      center: [71.449074, 51.169392],
      zoom: 12,
    }),
    []
  );

  const ymapsRef = useRef<any>();
  const mapRef = useRef<any>();
  const placemarkRef = useRef<any>();
  const searchControlRef = useRef<any>();

  const [isMapLoading, handleMapLoading] = useState(true);

  const centerMap = (): void => {
    mapRef?.current?.setCenter([71.449074, 51.169392], 12, {
      duration: 400,
    });
  };

  const onClickPolygon = useCallback(
    (e: any, zoneId: number): void => {
      const coords = e.get('coords');
      placemarkRef.current.geometry.setCoordinates(coords);

      if (ymapsRef.current) {
        ymapsRef.current.geocode(coords).then(function (res: any) {
          const firstGeoObject = res.geoObjects.get(0);
          const address = firstGeoObject.getAddressLine();

          onChangeAddress({
            zoneId,
            longitude: coords[0],
            latitude: coords[1],
            address,
          });
        });
      }
    },
    [onChangeAddress]
  );

  const onLoad = useCallback((ymaps): void => {
    ymapsRef.current = ymaps;
    centerMap();
    handleMapLoading(false);
  }, []);

  const onResultShow = useCallback(() => {
    const arr = searchControlRef.current.getResultsArray();
    const index = searchControlRef.current.getSelectedIndex();
    const coords = arr[index].geometry.getCoordinates();
    mapRef?.current?.setCenter(coords, 19, {
      duration: 400,
    });
  }, [searchControlRef, mapRef]);

  return (
    <SelectAddressMapView
      {...props}
      mapRef={mapRef}
      placemarkRef={placemarkRef}
      searchControlRef={searchControlRef}
      mapState={mapState}
      // zonesJson={zonesJson}
      isMapLoading={isMapLoading}
      onClickPolygon={onClickPolygon}
      onLoad={onLoad}
      onResultShow={onResultShow}
    />
  );
};

export default memo(SelectAddressMapContainer);
