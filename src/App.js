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
import Numbers from './components/Numbers'
import Footer from './components/Footer'
import './main.css'

const App =() => {

  const [globalData, setGlobalData] = useState(null)
  const [globalCountryConfirmed, setGlobalCountryConfirmed] = useState(null)
  const [globalCountryDeaths, setGlobalCountryDeaths] = useState(null)
  const [globalCountryRecovered, setGlobalCountryRecovered] = useState(null)
  const [globalCountryActive, setGlobalCountryActive] = useState(null)
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

  
    return (
      <div className='global' >
            <div className='grid-general main-grid'>
              <div className='singleGridSettings1'>
                <h2>COVID-19 Statistics</h2>
              </div>
              <div className='singleGridSettings2'>
                <Numbers data={globalData}/>
              </div>
              <div className='singleGridSettings1'>
                <GlobalBar  globalData={globalData}/>
              </div>
              <div className='singleGridSettings2'>
                <Choropleth data={globalCountryConfirmed}/>
              </div>
              <div className='singleGridSettings1'>
                <GlobalPie globalData={globalData}/>

              </div>
              <div className='singleGridSettings2'>
              <Table responsive  className='table' >
                <tbody>
                  <tr>
                    <td style={{verticalAlign: 'middle', color:'#ffffff'}}> 
                      <Button size='sm' variant={countryChar === 'confirmed' ? 'secondary' : 'outline-secondary'} onClick={() => setCountryChar('confirmed')}>Confirmed</Button>
                      <Button size='sm' variant={countryChar === 'active' ? 'secondary' : 'outline-secondary'} onClick={() => setCountryChar('active')}>Active</Button>
                      <Button size='sm' variant={countryChar === 'recovered' ? 'secondary' : 'outline-secondary'} onClick={() => setCountryChar('recovered')}>Recovered</Button>
                      <Button size='sm' variant={countryChar === 'death' ? 'secondary' : 'outline-secondary'} onClick={() => setCountryChar('death')}>Death</Button><br />
                  
                      {countryChar === 'confirmed' ? <Countries data={globalCountryConfirmed} info={'Confirmed'} color={globalColor.confirmed}/> : ''}
                      {countryChar === 'active' ? <Countries data={globalCountryActive} info={'Active'} color={globalColor.active}/> : ''}
                      {countryChar === 'recovered' ? <Countries data={globalCountryRecovered} info={'Recovered'} color={globalColor.recovered}/> : ''}
                      {countryChar === 'death' ? <Countries data={globalCountryDeaths} info={'Death'} color={globalColor.death}/> : ''}
                    </td>
                  </tr>
                </tbody>
            </Table>
              </div>
            </div>
          <br></br>
          <Footer />
      </div>
      
    )
  
  
}


export default App