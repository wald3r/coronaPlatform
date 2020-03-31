import React from 'react'

import {XYPlot, XAxis, YAxis, VerticalBarSeriesCanvas, LabelSeries} from 'react-vis'

const Global = ({ globalData }) => {



  const container = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }


  if(globalData === undefined || globalData === null){
    return(
      <div>
        Loading...
      </div>
    )
  }else{

    const data = [
      {x: "Confirmed", y: Number(globalData[0].Confirmed), yOffset: -5},
      {x: "Deaths", y: Number(globalData[0].Deaths), yOffset: -5},
      {x: "Recovered", y: Number(globalData[0].Recovered), yOffset: -5},
      {x: "Active", y: Number(globalData[0].Active), yOffset: -5}

    ]


    return (
        <div style={container}>
          <div>  
            <XYPlot
              margin={50}
              xType='ordinal'
              width={550}
              height={500}>
              <VerticalBarSeriesCanvas
                data={data}
                color='#760D14'
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


export default Global