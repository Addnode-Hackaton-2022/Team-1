import Extent from '@arcgis/core/geometry/Extent';
import Point from '@arcgis/core/geometry/Point';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Map from '@arcgis/core/Map';
import TextContent from '@arcgis/core/popup/content/TextContent';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import MapView from '@arcgis/core/views/MapView';
import Fullscreen from '@arcgis/core/widgets/Fullscreen';
import { Spin } from 'antd';
import { useLayoutEffect } from 'react';
import { useFetchAllBoats } from './utils/api';
import { BoatAttributeTypes, TBoat } from './utils/boatArrayMock';

const xmax = 2008524.446127534;
const xmin = 2007387.4453318878;
const ymax = 8255961.586933338;
const ymin = 8255084.949765266;

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

let renderer = new SimpleRenderer({
  symbol: new SimpleMarkerSymbol({
    size: 16,
    color: 'black',
    outline: {
      width: 2,
      color: 'white'
    }
  })
});

export const BoatMapWrapper = () => {
  const boatsQuery = useFetchAllBoats(true);

  if (boatsQuery.isLoading) return <Spin tip="Loading boats..." />;

  if (boatsQuery.data) return <BoatMap boats={boatsQuery.data} />;

  return <div>Error</div>;
};

const BoatMap = ({ boats }: { boats: TBoat[] }) => {
  useLayoutEffect(() => {
    const map = new Map({
      basemap: 'satellite'
    });

    const textContent = new TextContent();
    textContent.text =
      'Current fuel: {tankLevel}% and alarm level: {alarmLevel}%';

    const featureLayer = new FeatureLayer({
      source: boats.map((boat, index) => {
        const tankLevel = boat.boatAttributes.find(
          x => x.type === BoatAttributeTypes.TankLevel
        );
        const alarmLevel = boat.boatAttributes.find(
          x => x.type === BoatAttributeTypes.AlarmLevel
        );

        return {
          attributes: {
            objectId: index,
            id: boat.id,
            timestamp: boat.timestamp,
            tankLevel: tankLevel?.value,
            tankTimestamp: tankLevel?.timestamp,
            alarmLevel: alarmLevel?.value,
            alarmTimestamp: alarmLevel?.timestamp
          },
          geometry: new Point({
            x: getRandomIntInclusive(xmin, xmax),
            y: getRandomIntInclusive(ymin, ymax),
            spatialReference: new SpatialReference({ wkid: 102100 })
          })
        };
      }),
      fields: [
        {
          name: 'objectId',
          type: 'oid',
          alias: 'Object ID'
        },
        {
          name: 'id',
          type: 'string',
          alias: 'Callsign'
        },
        {
          name: 'timestamp',
          type: 'string',
          alias: 'Boat last update'
        },
        {
          name: 'tankLevel',
          type: 'string',
          alias: 'Fuel level'
        },
        {
          name: 'tankTimestamp',
          type: 'string',
          alias: 'Fuel level last update'
        },
        {
          name: 'alarmLevel',
          type: 'string',
          alias: 'Alarm level'
        },
        {
          name: 'alarmTimestamp',
          type: 'string',
          alias: 'Alarm level last update'
        }
      ],
      outFields: ['*'],
      objectIdField: 'objectId',
      popupTemplate: {
        outFields: ['*'],
        title: '{id}',
        content: [textContent]
      },
      renderer
    });

    map.add(featureLayer);

    const view = new MapView({
      map,
      container: 'viewDiv',
      extent: new Extent({
        xmax,
        xmin,
        ymax,
        ymin,
        spatialReference: new SpatialReference({ wkid: 102100 })
      }),
      highlightOptions: {
        color: 'orange'
      }
    });

    const fullscreen = new Fullscreen({
      view
    });

    view.ui.add(fullscreen, 'top-right');

    return () => {};
  }, []);

  return <div id="viewDiv" className="viewDiv" />;
};
