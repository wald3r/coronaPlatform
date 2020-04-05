import React, {useState} from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import ReactTooltip from 'react-tooltip'
import Country from './Country'
import {csv} from 'd3-request'
import activeDataFile from '../data/country_information_active.csv'
import confirmedDataFile from '../data/country_information_confirmed.csv'
import deathsDataFile from '../data/country_information_deaths.csv'
import recoveredDataFile from '../data/country_information_recovered.csv'
import { scaleQuantile } from "d3-scale"
import { Spinner, Button } from 'react-bootstrap'
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

  const [color1, setColor1] = useState(false)
  const [color2, setColor2] = useState(false)
  const [color3, setColor3] = useState(false)
  const [color4, setColor4] = useState(false)
  const [color5, setColor5] = useState(false)
  const [color6, setColor6] = useState(false)
  const [color7, setColor7] = useState(false)
  const [color8, setColor8] = useState(false)

  //const geoUrl ="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"
  const geoUrl=jsonFile

  var colorScale = null
  if(data !== null && data !== undefined){
    colorScale = scaleQuantile()
      .domain([1, 100, 1000, 10000, 50000, 100000, 200000, 5000000])
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

  const highlightLegend = (color) => {
    if(color === '#AED6F1') setColor1(true)
    else if(color === '#85C1E9') setColor2(true)
    else if(color === '#5DADE2') setColor3(true)
    else if(color === '#3498DB') setColor4(true)
    else if(color === '#2E86C1') setColor5(true)
    else if(color === '#2874A6') setColor6(true)
    else if(color === '#21618C') setColor7(true)
    else if(color === '#1B4F72') setColor8(true)
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
            domain={domain} />

        Density of Confirmed Cases from 1 to 500000 <br/>
        <span style={{display: 'inline-block', width: '40px', height: '20px', background: '#AED6F1', outline: color1 ? 'inset' : 'none' }} />
        <span style={{display: 'inline-block', width: '40px', height: '20px', background: '#85C1E9', outline: color2 ? 'solid' : 'none' }} />
        <span style={{display: 'inline-block', width: '40px', height: '20px', background: '#5DADE2', outline: color3 ? 'solid' : 'none' }} />
        <span style={{display: 'inline-block', width: '40px', height: '20px', background: '#3498DB', outline: color4 ? 'solid' : 'none' }}/>
        <span style={{display: 'inline-block', width: '40px', height: '20px', background: '#2E86C1', outline: color5 ? 'solid' : 'none' }}/>
        <span style={{display: 'inline-block', width: '40px', height: '20px', background: '#2874A6', outline: color6 ? 'solid' : 'none' }}/>
        <span style={{display: 'inline-block', width: '40px', height: '20px', background: '#21618C', outline: color7 ? 'solid' : 'none' }}/>
        <span style={{display: 'inline-block', width: '40px', height: '20px', background: '#1B4F72', outline: color8 ? 'solid' : 'none' }}/><br/>
        <Button size='sm' href={'#idGlobalBar'}>More...</Button>
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
                        highlightLegend(d ? colorScale(d.y) : '#BDBDBD')
                        const pop = Number(geo.properties.POP_EST)
                        const file = data.filter((d, index )=> (d.x === geo.properties.NAME || d.x === geo.properties.NAME_LONG || d.x === geo.properties.ISO_A2))[0]
                        if(file !== undefined){
                          const perc = ((Number(file.y) * 100) / pop).toFixed(5)
                          setContent(`${file.x} <br/>- Population: ${pop}  <br /> - Confirmed: ${file.y} (${perc}%)`)
                        }
                        else{
                          setContent(`${geo.properties.NAME} - No Data`)
                        }
                      }}
                      onMouseLeave={() => {
                        setColor1(false)
                        setColor2(false)
                        setColor3(false)
                        setColor4(false)
                        setColor5(false)
                        setColor6(false)
                        setColor7(false)
                        setColor8(false)
                        setContent("");
                      }}
                      onClick={() => {
                        handleClick(geo)
                      }}

                      style={
                        {
                        hover: {
                          fill: "#FFFFFF",
                          outline: "none"
                        }
                      }}
                    />)
                }
                )}
            </Geographies>
        </ComposableMap>
        <ReactTooltip html={true}>{content}</ReactTooltip>
      
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