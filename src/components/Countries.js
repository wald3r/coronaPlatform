import React, { useState } from 'react'
import {XYPlot, XAxis, YAxis, VerticalBarSeries, LabelSeries} from 'react-vis'
import Country from './Country'
import activeDataFile from '../data/country_information_active.csv'
import confirmedDataFile from '../data/country_information_confirmed.csv'
import deathsDataFile from '../data/country_information_deaths.csv'
import recoveredDataFile from '../data/country_information_recovered.csv'
import {csv} from 'd3-request'
import { Spinner } from 'react-bootstrap'

const Countries = ({ data, info, color }) => {

  const [graph, setGraph] = useState(false)
  const [filter, setFilter] = useState('')

  const [activeData, setActiveData] = useState(null)
  const [confirmedData, setConfirmedData] = useState(null)
  const [deathsData, setDeathsData] = useState(null)
  const [recoveredData, setRecoveredData] = useState(null)
  const [domain, setDomain] = useState(null)

  const [countryFilter1, setCountryFilter1] = useState('')
  const [countryFilter2, setCountryFilter2] = useState('')

  const filteredData1 = countryFilter1 === '' ? data : data.filter(d => d.x.includes(countryFilter1))
  const filteredData2 = countryFilter2 === '' ? filteredData1 : filteredData1.concat(data.filter(d => d.x.includes(countryFilter2)))


  const handleCountryFilter1 = (event) => {
    event.preventDefault()
    setCountryFilter1(event.target.value)
  }

  const handleCountryFilter2 = (event) => {
    event.preventDefault()
    setCountryFilter2(event.target.value)
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

  if(filteredData2 === undefined || filteredData2 === null){
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
            {info} Cases
            <br />
            <br />
            Filter: <input autoComplete='off' type='text' onChange={handleCountryFilter1}/>
            {countryFilter1 === '' ? '' : <input autoComplete='off' type='text' onChange={handleCountryFilter2}/>}<br/>
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
                  getLabel={d => Number(d.y)}
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