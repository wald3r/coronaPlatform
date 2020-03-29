import React, { useState } from 'react'
import {XYPlot, XAxis, YAxis, VerticalBarSeriesCanvas, LabelSeries, Crosshair} from 'react-vis'


const Countries = ({ data }) => {

  const [crosshairValue, setCrosshairValue] = useState([])

  const container = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }


  const addCrosshairValue = (datapoint, event) => {
    const arr = []
    arr.push(datapoint)
    setCrosshairValue(arr)
  }

  const removeCrosshairValue = () => {
    setCrosshairValue([])
  }

  if(data === undefined || data === null){
    return(
      <div>
        Loading...
      </div>
    )
  }else{
    return (
      <div>
        <br/>
        <br/>
        <div style={container}>
          <br/>
          <br/>
          <div>  
            <XYPlot
              onMouseLeave={() => removeCrosshairValue()}
              margin={80}
              yDomain={[0, 120000]}
              xType='ordinal'
              width={5000}
              height={500}>
              <VerticalBarSeriesCanvas
                data={data}
                color='#760D14'
                onNearestX={(datapoint, event)=>{
                  addCrosshairValue(datapoint, event)
                }}
              />
              <LabelSeries 
                data={data} 
                getLabel={d => d.y}
                labelAnchorX='middle'
                labelAnchorY='top'
              />
             
              <XAxis tickLabelAngle={-50}/>
              <YAxis  />
              <Crosshair
                values={crosshairValue} 
                className={'test-class-name'}
              />
            </XYPlot>
          </div>
        </div>
      </div>
    )
  }

}




export default Countries