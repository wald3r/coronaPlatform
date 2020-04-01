import React, { useState, useEffect } from 'react'
import '../node_modules/react-vis/dist/style.css'
import { Table, Button } from 'react-bootstrap'
import {csv} from 'd3-request'
import GlobalPie from './components/GlobalPie'
import GlobalBar from './components/GlobalBar'
import Countries from './components/Countries'

import globalDataFile from './data/global_information.csv'
import activeCountryDataFile from './data/active_information_countries.csv'
import deathsCountryDataFile from './data/deaths_information_countries.csv'
import recoveredCountryDataFile from './data/recovered_information_countries.csv'
import confirmedCountryDataFile from './data/confirmed_information_countries.csv'


import Footer from './components/Footer'

const App =() => {

  const [globalData, setGlobalData] = useState(null)
  const [globalCountryConfirmed, setGlobalCountryConfirmed] = useState(null)
  const [globalCountryDeaths, setGlobalCountryDeaths] = useState(null)
  const [globalCountryRecovered, setGlobalCountryRecovered] = useState(null)
  const [globalCountryActive, setGlobalCountryActive] = useState(null)

  const [globalChar, setGlobalChar] = useState(true)

  useEffect(() => {
    csv(globalDataFile, (err, data) => {
      setGlobalData(data)
    })  
    csv(confirmedCountryDataFile, (err, data) => {
      setGlobalCountryConfirmed(data)
    })
    csv(recoveredCountryDataFile, (err, data) => {
      setGlobalCountryRecovered(data)
    }) 
    csv(activeCountryDataFile, (err, data) => {
      setGlobalCountryActive(data)
    }) 
    csv(deathsCountryDataFile, (err, data) => {
      setGlobalCountryDeaths(data)
    })  
  }, [])

    const containerStyle = {
      padding: '40px',
      textAlign: 'center',
      position: 'absolute',
      left: '5%',
      right: '5%',
      transform: `translate(-50px, -50px)` 
    }
    
    const table = {
      textAlign:'center',
      width: '1500px',
      tableLayout: 'fixed'
    }

    return (
      <div>
          <div style={containerStyle}>
            <br/>
            <h2>COVID-19 GRAPHS</h2>
            <br></br>
            <Table style={table} striped bordered hover>
              <tbody>
                <tr >
                  <td>
                    <Button onClick={() => setGlobalChar(!globalChar)}>{globalChar === true ? 'Pie Chart' : 'Bar Chart'}</Button>
                    {globalChar === true ? <GlobalBar  globalData={globalData}/> : <GlobalPie globalData={globalData}/>}
                  </td>
                  <td style={{verticalAlign: 'middle'}}>To the right a bar chart can be observed, which represents the newest Covid-19 numbers of all countries combined. </td>
                </tr>
                <tr>
                  <td style={{verticalAlign: 'middle'}}> A bar chart, which shows all confirmed cases per country.</td>
                  <td ><Countries data={globalCountryConfirmed} info={'Confirmed'} color={'blue'}/></td>
                </tr>
                <tr>
                  <td ><Countries data={globalCountryActive} info={'Active'} color={'red'}/></td>
                  <td style={{verticalAlign: 'middle'}}> A bar chart, which shows all active cases per country.</td>
                </tr>
                <tr>
                  <td style={{verticalAlign: 'middle'}}> A bar chart, which shows all death cases per country.</td>
                  <td ><Countries data={globalCountryDeaths} color={'black'} info={'Death'}/></td>
                </tr>
                <tr>
                  <td ><Countries data={globalCountryRecovered} color={'green'} info={'Recovered'}/></td>
                  <td style={{verticalAlign: 'middle'}}> A bar chart, which shows all recovered cases per country.</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <br></br>
          <Footer />
      </div>
      
    )
  
  
}


export default App