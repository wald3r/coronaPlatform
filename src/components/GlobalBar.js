import React from 'react'
import { Spinner  } from 'react-bootstrap'
import {XYPlot, XAxis, YAxis, VerticalBarSeriesCanvas, LabelSeries} from 'react-vis'
import { globalColor } from '../config'

const GlobalBar = ({ globalData }) => {

 

  if(globalData === undefined || globalData === null){
    return(
      <div>
        <Spinner animation="border" role="status" /> Loading...     
      </div>
    )
  }else{

    var data = [
      {x: "Confirmed", y: Number(globalData[0].Confirmed), yOffset: -5, color: globalColor.confirmed},
      {x: "Active", y: Number(globalData[0].Active), yOffset: -5, color: globalColor.active},
      {x: "Deaths", y: Number(globalData[0].Deaths), yOffset: -5, color: globalColor.death},
      {x: "Recovered", y: Number(globalData[0].Recovered), yOffset: -5, color: globalColor.recovered}
    ]
    return (
      <div>
          Worldwide distribution <br/>
          <XYPlot
            
            margin={50}
            xType='ordinal'
            width={550}
            height={500}
            colorType="literal"
          >
          <VerticalBarSeriesCanvas
            data={data}
          />
          <LabelSeries 
            data={data} 
            getLabel={d => d.y}
            labelAnchorX='middle'
            labelAnchorY='top'
            style={{fill: '#FFFFFF'}}
            color='#FFFFFF'
          />
        
          <XAxis style={{text: {fill: '#FFFFFF'} }}/>
          <YAxis hideTicks hideLine />
          </XYPlot>
      </div>
    )
  }
}


export default GlobalBar