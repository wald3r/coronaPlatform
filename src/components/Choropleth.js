import React, {useState, useEffect} from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import ReactTooltip from 'react-tooltip'
import Country from './Country'
import {csv} from 'd3-request'
import activeDataFile from '../data/country_information_active.csv'
import confirmedDataFile from '../data/country_information_confirmed.csv'
import deathsDataFile from '../data/country_information_deaths.csv'
import recoveredDataFile from '../data/country_information_recovered.csv'
import { scaleQuantile } from "d3-scale"
import { Spinner } from 'react-bootstrap'
import jsonFile from '../data/world-110m.json'

const Choropleth = ( { data } ) => {

  const [content, setContent] = useState('')
  const [filter, setFilter] = useState(null)
  const [graph, setGraph] = useState(false)
  const [domain, setDomain] = useState(null)
  const [activeData, setActiveData] = useState(null)
  const [confirmedData, setConfirmedData] = useState(null)
  const [deathData, setDeathData] = useState(null)
  const [recoveredData, setRecoveredData] = useState(null)

  //const geoUrl ="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"
  const geoUrl=jsonFile

  var colorScale = null
  if(data !== null && data !== undefined){
    colorScale = scaleQuantile()
    .domain(data.map(d => d.y))
    .range([
      "#AED6F1",
      "#85C1E9",
      "#5DADE2",
      "#3498DB",
      "#2E86C1",
      "#2874A6",
      "#21618C",
      "#1B4F72",
    ]);
  }
  
  const handleClick = (country) => {
    const datapoint = data.filter((d, index )=> (d.x === country.properties.NAME || d.x === country.properties.NAME_LONG || d.x === country.properties.ISO_A2))[0]

    if(datapoint !== undefined){

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
        console.log(filteredData[0][keys[keys.length-1]])
        setDomain(filteredData[0][keys[keys.length-1]])
      }) 
      csv(deathsDataFile, (err, data) => {
        const filteredData = data.filter(point => point.Country  === datapoint.x )   
        setDeathData(filteredData[0])
      }) 
      csv(recoveredDataFile, (err, data) => {
        const filteredData = data.filter(point => point.Country  === datapoint.x )   
        setRecoveredData(filteredData[0])
      }) 
    }
  }
  if(data !== null && data !== undefined){
    return(
      <div>
          <Country
            handleGraph={setGraph}
            showGraph={graph}
            filter={filter}
            activeData={activeData}
            confirmedData={confirmedData}
            deathsData={deathData}
            recoveredData={recoveredData}
            domain={domain}
          />
        <ComposableMap data-tip="" > 
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map(geo => {

                  const d = data.filter((d, index )=> (d.x === geo.properties.NAME || d.x === geo.properties.NAME_LONG || d.x === geo.properties.ISO_A2))[0]
                  
                  return(
                    <Geography 
                      key={geo.rsmKey} 
                      geography={geo} 
                      fill={d ? colorScale(d.y) : '#BDBDBD'}
                      onMouseEnter={() => {
                        const file = data.filter((d, index )=> (d.x === geo.properties.NAME || d.x === geo.properties.NAME_LONG || d.x === geo.properties.ISO_A2))[0]
                        if(file !== undefined){
                          setContent(`${file.x} - Confirmed: ${file.y}`)
                        }
                        else{
                          setContent(`${geo.properties.NAME} - No Data`)
                        }
                      }}
                      onMouseLeave={() => {
                        setContent("");
                      }}
                      onClick={() => {
                        handleClick(geo)
                      }}

                      style={{hover: {
                        fill: "#404346",
                        outline: "none"
                        }
                      }}
                    />)
                }
                )}
            </Geographies>
        </ComposableMap>
        <ReactTooltip>{content}</ReactTooltip>
      </div>

    )
  }
  else{
    return(
      <div>
        <Spinner animation="border" role="status" /> Loading...     
      </div>
    )
  }

}


export default Choropleth 