import React, { useState } from 'react'
import {XYPlot, XAxis, YAxis, VerticalBarSeries, LabelSeries, Crosshair} from 'react-vis'


const Countries = ({ data }) => {

  const [crosshair, setCrosshair] = useState([])

  const container = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
  
  const handleCrosshair = (datapoint, event) => {
    let arr = []

    arr.push(data[event.index])
    setCrosshair(arr)
  }

  const removeCrosshair = () => {
    setCrosshair([])
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
              onMouseLeave={() => removeCrosshair()}           
              margin={80}
              yDomain={[0, 150000]}
              xType='ordinal'
              width={8000}
              height={500}>
              <VerticalBarSeries
                data={data}
                color='#760D14'
                onValueClick={(datapoint, event)=>{
                  console.log(datapoint)
                }}
                onNearestX={(datapoint, event) => {
                  handleCrosshair(datapoint, event)
                }}
              
              />
              <LabelSeries 
                data={data} 
                getLabel={d => d.y}
                labelAnchorX='middle'
                labelAnchorY='top'
                onValueClick={(datapoint, event)=>{
                  console.log(datapoint)
                }}
              />
              <Crosshair 
                values={crosshair}
              >
              <div>
                <div>Country:{crosshair[0] === undefined ? '' : crosshair[0].x}</div>
                <div>Confirmed:{crosshair[0] === undefined ? '' : crosshair[0].y}</div>
              </div>
              </Crosshair>
             
              <XAxis tickLabelAngle={-50}/>
              <YAxis  />
              
            </XYPlot>
          </div>
        </div>
      </div>
    )
  }

}




export default Countries