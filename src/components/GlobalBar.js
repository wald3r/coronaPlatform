import React from 'react'
import { Spinner  } from 'react-bootstrap'
import {XYPlot, XAxis, YAxis, VerticalBarSeriesCanvas, LabelSeries} from 'react-vis'

const GlobalBar = ({ globalData }) => {

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
      {x: "Confirmed", y: Number(globalData[0].Confirmed), yOffset: -5, color: 'blue'},
      {x: "Deaths", y: Number(globalData[0].Deaths), yOffset: -5, color: 'black'},
      {x: "Recovered", y: Number(globalData[0].Recovered), yOffset: -5, color: 'green'},
      {x: "Active", y: Number(globalData[0].Active), yOffset: -5, color: 'red'}
    ]
    return (
      <div style={container}>
        <div>  
          <XYPlot
            
            margin={50}
            xType='ordinal'
            width={550}
            height={500}
            colorType="literal"
          >
          <VerticalBarSeriesCanvas
            data={data}
            //color='#760D14'
          />
          <LabelSeries 
            data={data} 
            getLabel={d => d.y}
            labelAnchorX='middle'
            labelAnchorY='top'
          />
        
          <XAxis />
          <YAxis hideTicks hideLine />
          </XYPlot>
        </div>
      </div>
    )
  }
}


export default GlobalBar