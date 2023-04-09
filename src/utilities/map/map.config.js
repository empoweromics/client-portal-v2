export const getCentroid = (arr=[]) => {
  return arr.reduce(
    function (x, y) {
      return [x[0] + y[0] / arr.length, x[1] + y[1] / arr.length];
    },
    [0, 0]
  );
};

export const mapOptions = {
  streetViewControl: false,
  styles: [
    {
      featureType: 'poi',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'transit',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'road.arterial',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'road.highway',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'road.highway.controlled_access',
      stylers: [{ visibility: 'off' }]
    }
    // {
    //   featureType: 'road.local',
    //   stylers: [{ visibility: 'off' }]
    // }
  ]
};

// export const setStyle = (feature) => {
//   let polygonZIndex = 99999;
//   if (feature.getProperty('category') === 'residential') {
//     return {
//       fillColor: '#009A67',
//       strokeColor: 'green',
//       strokeWeight: 0.3,
//       zIndex: polygonZIndex--,
//       fillOpacity: 0.8
//     };
//   }

//   if (feature.getProperty('category') === 'commercial') {
//     return {
//       fillColor: 'yellow',
//       strokeColor: 'yellow',
//       strokeWeight: 0.3,
//       zIndex: polygonZIndex--,
//       fillOpacity: 0.6
//     };
//   }
//   if (feature.getProperty('category') === 'administrative') {
//     return {
//       fillColor: 'orange',
//       strokeColor: 'orange',
//       strokeWeight: 0.3,
//       zIndex: polygonZIndex--,
//       fillOpacity: 0.6
//     };
//   }
//   return {
//     fillColor: '#04516A',
//     fillOpacity: 0.2,
//     strokeColor: 'black',
//     strokeWeight: 0.1,
//     zIndex: polygonZIndex--
//   };
// };



export const setStyle = (feature) => {
  let polygonZIndex = 99999;
  if (feature.getProperty('category') === 'police') {
    return {
      fillColor: '#f7ac6e',
      strokeColor: '#f7ac6e',
      strokeWeight: 0.3,
      zIndex: polygonZIndex--,
      fillOpacity: 0.8
    };
  }

  if (feature.getProperty('category') === 'public_areas') {
    return {
      fillColor: '#3282a4',
      strokeColor: '#3282a4',
      strokeWeight: 0.3,
      zIndex: polygonZIndex--,
      fillOpacity: 0.6
    };
  }
  if (feature.getProperty('category') === 'residential'||feature.getProperty('category') === 'Constructed'||feature.getProperty('category') === 'res. & comm') {
if(feature.j.units>0)  { 
  return {
      fillColor: '#02692f',
      strokeColor: '#02692f',
      strokeWeight: 0.3,
      zIndex: polygonZIndex--,
      fillOpacity: 0.6
    };
  // eslint-disable-next-line no-else-return
  }else{
      return {
        fillColor: '#04b479',
        strokeColor: '#04b479',
        strokeWeight: 0.3,
        zIndex: polygonZIndex--,
        fillOpacity: 0.6
      };
    }
  }
  // if (feature.getProperty('category') === 'res. & comm') {
  //   return {
  //     fillColor: '#04b479',
  //     strokeColor: '#04b479',
  //     strokeWeight: 0.3,
  //     zIndex: polygonZIndex--,
  //     fillOpacity: 0.6
  //   };
  // }
  // if (feature.getProperty('category') === 'Constructed') {
  //   return {
  //     fillColor: '#04b479',
  //     strokeColor: '#04b479',
  //     strokeWeight: 0.3,
  //     zIndex: polygonZIndex--,
  //     fillOpacity: 0.6
  //   };
  // }
  return {
    fillColor: '#f0ece3',
    fillOpacity: 0.2,
    strokeColor: 'black',
    strokeWeight: 0.1,
    zIndex: polygonZIndex--
  };
};

export function getPolygonCenter(polygon) {
  let sumX = 0;
  let sumY = 0;

  for (let i = 0; i < polygon.length; i++) {
    sumX += polygon[i].lat;
    sumY += polygon[i].lng;
  }

  const centerX = sumX / polygon.length;
  const centerY = sumY / polygon.length;

  const center = { lat: centerX, lng: centerY };

 
  return center
}