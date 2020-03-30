import React, { useState, useEffect } from 'react'
import {XYPlot, XAxis, YAxis, LineSeries, Crosshair} from 'react-vis'
import activeDataFile from '../data/country_information_active.csv'
import confirmedDataFile from '../data/country_information_confirmed.csv'
import deathsDataFile from '../data/country_information_deaths.csv'
import recoveredDataFile from '../data/country_information_recovered.csv'

import {csv} from 'd3-request'


const Country = () => {

  const [activeData, setActiveData] = useState(null)
  const [confirmedData, setConfirmedData] = useState(null)
  const [deathsData, setDeathsData] = useState(null)
  const [recoveredData, setRecoveredData] = useState(null)
  
  const [crosshair1, setCrosshair1] = useState([])
  const [crosshair2, setCrosshair2] = useState([])
  const [crosshair3, setCrosshair3] = useState([])
  const [crosshair4, setCrosshair4] = useState([])


  const [filter, setFilter] = useState('China')


  useEffect(() => {
    csv(activeDataFile, (err, data) => {
      const filteredData = data.filter(point => point.Country  === filter )   
      setActiveData(filteredData[0])
    }) 
    csv(confirmedDataFile, (err, data) => {
      const filteredData = data.filter(point => point.Country  === filter )   
      setConfirmedData(filteredData[0])
    }) 
    csv(deathsDataFile, (err, data) => {
      const filteredData = data.filter(point => point.Country  === filter )   
      setDeathsData(filteredData[0])
    }) 
    csv(recoveredDataFile, (err, data) => {
      const filteredData = data.filter(point => point.Country  === filter )   
      setRecoveredData(filteredData[0])
    }) 
  }, [])

  const container = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const handleCrosshair = (datapoint, event, elem) => {
    let keys = Object.keys(activeData)
    let arr = []
    if(elem === 1){
      arr.push({x: keys[event.index], y: activeData[keys[event.index]]})    
      setCrosshair1(arr)
    }
    else if(elem === 2){
      arr.push({x: keys[event.index], y: confirmedData[keys[event.index]]})    
      setCrosshair2(arr)
    }
    else if(elem === 3){
      arr.push({x: keys[event.index], y: deathsData[keys[event.index]]})    
      setCrosshair3(arr)
    }else{
      arr.push({x: keys[event.index], y: recoveredData[keys[event.index]]})    
      setCrosshair4(arr)
    }
  }

  

  const removeCrosshair = () => {
    setCrosshair1([])
    setCrosshair2([])
    setCrosshair3([])
    setCrosshair4([])
  }


  if(recoveredData !== null && confirmedData !== null && activeData !== null && deathsData !== null){
   
    const handleData = () => {
      let keys = Object.keys(activeData)
      let data = []
      let data1 = []
      let data2 = []
      let data3 = []
      let data4 = []
      for (let a = 1; a < keys.length; a++){
        let tmp1 = activeData[keys[a]]
        let tmp2 = confirmedData[keys[a]]
        let tmp3 = deathsData[keys[a]]
        let tmp4 = recoveredData[keys[a]]
  
        data1.push({x: keys[a], y: tmp1})
        data2.push({x: keys[a], y: tmp2})
        data3.push({x: keys[a], y: tmp3})
        data4.push({x: keys[a], y: tmp4})
      }
      data.push(data1)
      data.push(data2)
      data.push(data3)
      data.push(data4)
      
      return data
  
    }
   
    return (
      <div>
          <br></br>
          {filter}
          <div style={container}>
            <br/>
            <br/>
            <div>  
              <XYPlot
                onMouseLeave={() => removeCrosshair()}
                margin={50}
                xType='ordinal'
                yDomain={[0, 100000]}
                width={1000}
                height={500}>
                <LineSeries
                  data={handleData()[0]}
                  color='red'
                  onNearestX={(datapoint, event) => {
                    handleCrosshair(datapoint, event, 1)
                  }}
                />
                <LineSeries
                  data={handleData()[1]}
                  color='blue'
                  onNearestX={(datapoint, event) => {
                    handleCrosshair(datapoint, event, 2)
                  }}
          
                />
                <LineSeries
                  data={handleData()[2]}
                  color='black'
                  onNearestX={(datapoint, event) => {
                    handleCrosshair(datapoint, event, 3)
                  }}
                />

                <LineSeries
                  data={handleData()[3]}
                  color='green'
                  onNearestX={(datapoint, event) => {
                    handleCrosshair(datapoint, event, 4)
                  }}
                />  
                <Crosshair 
                  values={[crosshair1[0]]}
                >
                <div>
                  <div>Date:{crosshair1[0] === undefined ? '' : crosshair1[0].x}</div>
                  <div>Active:{crosshair1[0] === undefined ? '' : crosshair1[0].y}</div>
                  <div>Confirmed:{crosshair2[0] === undefined ? '' : crosshair2[0].y}</div>
                  <div>Deaths:{crosshair3[0] === undefined ? '' : crosshair3[0].y}</div>
                  <div>Recovered:{crosshair4[0] === undefined ? '' : crosshair4[0].y}</div>
                </div>
                </Crosshair>
            
              
                <XAxis tickLabelAngle={-50}/>
                <YAxis />
              </XYPlot>
            </div>
          </div>
        </div>
    )
  }
  else{
    return(
      <div>
        Loading...
      </div>
    )
  }
}


export default Country