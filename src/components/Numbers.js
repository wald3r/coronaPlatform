import React from 'react'
import { Spinner } from 'react-bootstrap'
import { globalColor } from '../config'
import '../main.css'

const Numbers = ( { data } ) => {

  if(data !== undefined && data !== null){

 
    return (
      <div className='numbers-grid grid-general'>
        <div><div>Confirmed Cases</div>
        <div style={{color: globalColor.confirmed, fontSize: '40px'}}>{data[0].Confirmed}</div></div>

        <div><div>Active Cases</div> 
        <div style={{color: globalColor.active, fontSize: '40px'}}>{data[0].Active}</div></div>
        <div><div>Death Cases</div>
        <div style={{color: globalColor.death, fontSize: '40px'}}>{data[0].Deaths}</div></div>
        <div><div>Recovered Cases</div> 
        <div  style={{color: globalColor.recovered, fontSize: '40px'}}>{data[0].Recovered}</div></div>
      </div>
    )
  }
  else{
    return (
      <div>
        <Spinner animation="border" role="status" /> Loading...     
      </div>
    )
  }

}


export default Numbers