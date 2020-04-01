import React from 'react'
import { Spinner  } from 'react-bootstrap'
import {RadialChart} from 'react-vis'

const GlobalPie = ({ globalData }) => {

  const container = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  if(globalData === undefined || globalData === null){
    return(
      <div>
        <Spinner animation="border" role="status" /> Loading...     
      </div>
    )
  }else{

    var data = [
      {label: Number(globalData[0].Confirmed), angle: Number(globalData[0].Confirmed), color: 'blue'},
      {label: Number(globalData[0].Deaths), angle: Number(globalData[0].Deaths), color: 'black'},
      {label: Number(globalData[0].Recovered), angle: Number(globalData[0].Recovered), color: 'green'},
      {label: Number(globalData[0].Active), angle: Number(globalData[0].Active), color: 'red'}
    ]
    return (
      <div style={container}>
        <div>  
    
          <RadialChart
            colorType="literal"
            data={data}
            width={550}
            height={500}
          />     
        </div>
      </div>
    )
  }
}


export default GlobalPie