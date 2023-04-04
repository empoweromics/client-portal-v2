import React from 'react';
import style from './style/googleMaps.module.css';

const InfoWindowContent = ({ project }) => {
  return (
    <div>
      <table className={style.infoWindowTable}>
        <tbody>
          <tr>
            <th>Name</th>
            <td>{project?.properties?.name}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export { InfoWindowContent };
