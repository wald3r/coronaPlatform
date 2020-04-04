import React, { useState, useEffect } from 'react'
import '../node_modules/react-vis/dist/style.css'
import { Table, Button } from 'react-bootstrap'
import {csv} from 'd3-request'
import GlobalPie from './components/GlobalPie'
import GlobalBar from './components/GlobalBar'
import Countries from './components/Countries'
import Choropleth from './components/Choropleth'
import globalDataFile from './data/global_information.csv'
import activeCountryDataFile from './data/active_information_countries.csv'
import deathsCountryDataFile from './data/deaths_information_countries.csv'
import recoveredCountryDataFile from './data/recovered_information_countries.csv'
import confirmedCountryDataFile from './data/confirmed_information_countries.csv'
import { globalColor } from './config'

import Footer from './components/Footer'

const App =() => {

  const [globalData, setGlobalData] = useState(null)
  const [globalCountryConfirmed, setGlobalCountryConfirmed] = useState(null)
  const [globalCountryDeaths, setGlobalCountryDeaths] = useState(null)
  const [globalCountryRecovered, setGlobalCountryRecovered] = useState(null)
  const [globalCountryActive, setGlobalCountryActive] = useState(null)

  const [globalChar, setGlobalChar] = useState(true)
  const [countryChar, setCountryChar] = useState('confirmed')

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

      transform: `translate(-50px, -50px)` 
    }
    
    const table = {
      textAlign:'center',
      tableLayout: 'fixed',
      width: '80%', 
      marginLeft: '10%', 
      marginRight: '10%',
    
    }

    return (
      <div>
          <div style={containerStyle}>
            <br/>
            <h2>COVID-19 GRAPHS</h2>
            <br></br>
            <Table style={table} striped bordered hover>
              <tbody>
              <tr>
                  <td colSpan={2} >
                    <Choropleth 
                      data={globalCountryConfirmed}
                    />
                  </td>
                </tr>
                <tr >
                  <td>
                    {globalChar === true ? <GlobalBar  globalData={globalData}/> : <GlobalPie globalData={globalData}/>}
                  </td>
                  <td style={{verticalAlign: 'middle'}}>
                    To the right a bar chart can be observed, which represents the newest Covid-19 numbers of all countries combined.<br/>
                    <Button size='sm' variant='secondary' onClick={() => setGlobalChar(!globalChar)}>{globalChar === true ? 'Switch to Pie Chart' : 'Switch to Bar Chart'}</Button>
                  </td>
                </tr>
                <tr>
                  <td style={{verticalAlign: 'middle'}}> 
                    A bar chart, which shows all cases per country. <br /><br />
                    <Button size='sm' variant={countryChar === 'confirmed' ? 'secondary' : 'outline-secondary'} onClick={() => setCountryChar('confirmed')}>Confirmed</Button>
                    <Button size='sm' variant={countryChar === 'active' ? 'secondary' : 'outline-secondary'} onClick={() => setCountryChar('active')}>Active</Button>
                    <Button size='sm' variant={countryChar === 'recovered' ? 'secondary' : 'outline-secondary'} onClick={() => setCountryChar('recovered')}>Recovered</Button>
                    <Button size='sm' variant={countryChar === 'death' ? 'secondary' : 'outline-secondary'} onClick={() => setCountryChar('death')}>Death</Button><br />
                  </td>
                  <td >
                    {countryChar === 'confirmed' ? <Countries data={globalCountryConfirmed} info={'Confirmed'} color={globalColor.confirmed}/> : ''}
                    {countryChar === 'active' ? <Countries data={globalCountryActive} info={'Active'} color={globalColor.active}/> : ''}
                    {countryChar === 'recovered' ? <Countries data={globalCountryRecovered} info={'Recovered'} color={globalColor.recovered}/> : ''}
                    {countryChar === 'death' ? <Countries data={globalCountryDeaths} info={'Death'} color={globalColor.death}/> : ''}
                  </td>
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