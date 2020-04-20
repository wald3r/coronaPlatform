import React, { useState } from 'react'
import {XYPlot, XAxis, YAxis, VerticalBarSeries, LabelSeries} from 'react-vis'
import PieModal from './PieModal'
import { Spinner } from 'react-bootstrap'

const Countries = ({ data, color, countryFilter1, countryFilter2, pieData }) => {

  const [graph, setGraph] = useState(false)
  const [filter, setFilter] = useState('')

  const filteredData1 = countryFilter1 === '' ? data : data.filter(d => d.x.includes(countryFilter1))
  const filteredData2 = countryFilter2 === '' ? filteredData1 : filteredData1.concat(data.filter(d => d.x.includes(countryFilter2))).sort((a, b) => {
    return b.y - a.y
  })


  const handleShowGraph = (datapoint, event) => {
    setFilter(datapoint.x)
    setGraph(true)
  }

  if(filteredData2 === undefined || filteredData2 === null){
    return(
      <div>
        <Spinner animation="border" role="status" /> Loading...     
      </div>
    )
  }else{
    return (
      <div style={{overflow: 'auto'}}>
        <PieModal
          handleGraph={setGraph}
          showGraph={graph}
          filter={filter}
          data={pieData}
        />
          <div>  
            {filteredData2.length === 0 ? 'No data available!' : 
              <XYPlot   
                margin={{left: 90, bottom: 100, top: 90, right: 90}}
                yDomain={[0, Number(filteredData2[0].y)]}
                xType='ordinal'
                width={60*filteredData2.length}
                height={500}>
                <VerticalBarSeries
                  data={filteredData2}
                  color={color}
                  onValueClick={(datapoint, event)=>{
                    handleShowGraph(datapoint, event)
                  }}
                />
                <LabelSeries 
                  data={filteredData2.map(d => {
                    return {yOffset: Number(d.yOffset), y: Number(d.y), ...d}}
                    )} 
                  getLabel={d => d.y}
                  labelAnchorX='middle'
                  labelAnchorY='top'
                  style={{fill: '#FFFFFF'}}
                  onValueClick={(datapoint, event)=>{
                    handleShowGraph(datapoint, event)
                  }}
                />      
                <XAxis style={{fill: '#FFFFFF'}} tickLabelAngle={-60}/>
                <YAxis  hideTicks />
                
              </XYPlot>
            }
          </div>
        </div>
    )
  }

}




export default Countries