import React from 'react';
import style from './googleMaps.module.css';

const InfoWindoqContent = ({project}) => {
    
    return (
        <div>
            <table className={style.infoWindowTable}>
            <tr>
    <th>Name</th>
    <td>${project?.properties?.name}</td>
  </tr>
   <tr>
    <th>Category</th>
    <td> ${project?.properties?.category}</td>
  </tr>
  <tr>
    <th>Area Name</th>
    <td> ${project?.properties?.area}</td>
  </tr>
   <tr>
    <th>Area (acres)</th>
    <td> ${project?.properties?.acres}</td>
  </tr>
 <tr>
    <th>City</th>
    <td>${project?.properties?.city}</td>
  </tr>
   <tr>
    <th>Country</th>
    <td>${project?.properties?.country}</td>
  </tr>
  <tr>
    <th>Supplier</th>
    <td>${project?.properties?.supplier}</td>
  </tr>
  <tr>
    <th>Description</th>
    <td>${project?.properties?.description}</td>
  </tr>
</table>
        </div>
    );
}

export  {InfoWindoqContent};
