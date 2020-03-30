import React, { useState } from 'react'
import {XYPlot, XAxis, YAxis, VerticalBarSeries, LabelSeries, Crosshair} from 'react-vis'
import Country from './Country'
import activeDataFile from '../data/country_information_active.csv'
import confirmedDataFile from '../data/country_information_confirmed.csv'
import deathsDataFile from '../data/country_information_deaths.csv'
import recoveredDataFile from '../data/country_information_recovered.csv'
import {csv} from 'd3-request'

const Countries = ({ data }) => {

  const [crosshair, setCrosshair] = useState([])
  const [graph, setGraph] = useState(false)
  const [filter, setFilter] = useState('')

  const [activeData, setActiveData] = useState(null)
  const [confirmedData, setConfirmedData] = useState(null)
  const [deathsData, setDeathsData] = useState(null)
  const [recoveredData, setRecoveredData] = useState(null)

  
  const container = {
    height: '100%',
    width: '100%',
    display: 'inline-block',
    overflow: 'auto',
  }
  
  const handleShowGraph = (datapoint, event) => {
    setFilter(datapoint.x)
    setGraph(true)

    csv(activeDataFile, (err, data) => {
      const filteredData = data.filter(point => point.Country  === datapoint.x )   
      setActiveData(filteredData[0])
    }) 
    csv(confirmedDataFile, (err, data) => {
      const filteredData = data.filter(point => point.Country  === datapoint.x )   
      setConfirmedData(filteredData[0])
    }) 
    csv(deathsDataFile, (err, data) => {
      const filteredData = data.filter(point => point.Country  === datapoint.x )   
      setDeathsData(filteredData[0])
    }) 
    csv(recoveredDataFile, (err, data) => {
      const filteredData = data.filter(point => point.Country  === datapoint.x )   
      setRecoveredData(filteredData[0])
    }) 
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
        <Country
          handleGraph={setGraph}
          showGraph={graph}
          filter={filter}
          activeData={activeData}
          confirmedData={confirmedData}
          deathsData={deathsData}
          recoveredData={recoveredData}
        />
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
                  handleShowGraph(datapoint, event)
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
                  handleShowGraph(datapoint, event)
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