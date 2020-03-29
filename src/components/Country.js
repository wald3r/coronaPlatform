import React, { useState, useEffect } from 'react'
import {XYPlot, XAxis, YAxis, LineSeriesCanvas} from 'react-vis'
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
  
  const [filter, setFilter] = useState('Austria')


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


  if(activeData !== null && confirmedData !== null && deathsData !== null && recoveredData !== null){
    

    const activeLineData = () => {
      let keys = Object.keys(activeData)
      let data = []
      for (let a = 1; a < keys.length; a++){
        let tmp = activeData[keys[a]]
        data.push({x: keys[a], y: tmp})
      }
      return data
    }

    const confirmedLineData = () => {
      let keys = Object.keys(confirmedData)
      let data = []
      for (let a = 1; a < keys.length; a++){
        let tmp = confirmedData[keys[a]]
        data.push({x: keys[a], y: tmp})
      }
      return data
    }

    const deathsLineData = () => {
      let keys = Object.keys(deathsData)
      let data = []
      for (let a = 1; a < keys.length; a++){
        let tmp = deathsData[keys[a]]
        data.push({x: keys[a], y: tmp})
      }
      return data
    }

    const recoveredLineData = () => {
      let keys = Object.keys(recoveredData)
      let data = []
      for (let a = 1; a < keys.length; a++){
        let tmp = recoveredData[keys[a]]
        data.push({x: keys[a], y: tmp})
      }
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
                margin={50}
                xType='ordinal'
                yDomain={[0, 20000]}
                width={1000}
                height={500}>
                <LineSeriesCanvas
                  data={activeLineData()}
                  color='red'
                />
                <LineSeriesCanvas
                  data={confirmedLineData()}
                  color='#760D14'
                />
                <LineSeriesCanvas
                  data={deathsLineData()}
                  color='black'
                />

                <LineSeriesCanvas
                  data={recoveredLineData()}
                  color='green'
                />  
              
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