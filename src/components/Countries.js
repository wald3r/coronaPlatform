import React, { useState } from 'react'
import {XYPlot, XAxis, YAxis, VerticalBarSeries, LabelSeries, Crosshair} from 'react-vis'
import Country from './Country'
import activeDataFile from '../data/country_information_active.csv'
import confirmedDataFile from '../data/country_information_confirmed.csv'
import deathsDataFile from '../data/country_information_deaths.csv'
import recoveredDataFile from '../data/country_information_recovered.csv'
import {csv} from 'd3-request'
import { Spinner } from 'react-bootstrap'

const Countries = ({ data, info }) => {

  const [crosshair, setCrosshair] = useState([])
  const [graph, setGraph] = useState(false)
  const [filter, setFilter] = useState('')

  const [activeData, setActiveData] = useState(null)
  const [confirmedData, setConfirmedData] = useState(null)
  const [deathsData, setDeathsData] = useState(null)
  const [recoveredData, setRecoveredData] = useState(null)
  const [domain, setDomain] = useState(null)

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
      let keys = Object.keys(filteredData[0])
      setDomain(filteredData[0][keys[keys.length-1]])
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
        <Spinner animation="border" role="status" /> Loading...     
      </div>
    )
  }else{

    return (
      <div id={info} style={{overflow: 'auto'}}>
        <Country
          handleGraph={setGraph}
          showGraph={graph}
          filter={filter}
          activeData={activeData}
          confirmedData={confirmedData}
          deathsData={deathsData}
          recoveredData={recoveredData}
          domain={domain}
        />
      
      
          <div>  
            {info} - Cases
            <XYPlot   
              onMouseLeave={() => removeCrosshair()}           
              margin={90}
              yDomain={[0, data[0].y]}
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
                <div>{info}:{crosshair[0] === undefined ? '' : crosshair[0].y}</div>
              </div>
              </Crosshair>
             
              <XAxis tickLabelAngle={-50}/>
              <YAxis  hideTicks />
              
            </XYPlot>
          </div>
        </div>
    )
  }

}




export default Countries