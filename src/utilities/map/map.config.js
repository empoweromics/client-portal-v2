export const getCentroid = (arr) => {
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

export const setStyle = (feature) => {
  let polygonZIndex = 99999;
  if (feature.getProperty('category') === 'residential') {
    return {
      fillColor: '#009A67',
      strokeColor: 'green',
      strokeWeight: 0.3,
      zIndex: polygonZIndex--,
      fillOpacity: 0.8
    };
  }

  if (feature.getProperty('category') === 'commercial') {
    return {
      fillColor: 'yellow',
      strokeColor: 'yellow',
      strokeWeight: 0.3,
      zIndex: polygonZIndex--,
      fillOpacity: 0.6
    };
  }
  if (feature.getProperty('category') === 'administrative') {
    return {
      fillColor: 'orange',
      strokeColor: 'orange',
      strokeWeight: 0.3,
      zIndex: polygonZIndex--,
      fillOpacity: 0.6
    };
  }
  return {
    fillColor: '#04516A',
    fillOpacity: 0.2,
    strokeColor: 'black',
    strokeWeight: 0.1,
    zIndex: polygonZIndex--
  };
};
