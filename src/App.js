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
import { globalColor, confirmedColorRange, activeColorRange, deathColorRange, recoveredColorRange } from './config'
import Numbers from './components/Numbers'
import Footer from './components/Footer'
import './main.css'

const App =() => {

  const [globalData, setGlobalData] = useState(null)
  const [globalCountryConfirmed, setGlobalCountryConfirmed] = useState(null)
  const [globalCountryDeaths, setGlobalCountryDeaths] = useState(null)
  const [globalCountryRecovered, setGlobalCountryRecovered] = useState(null)
  const [globalCountryActive, setGlobalCountryActive] = useState(null)
  const [countriesFlag, setCountriesFlag] = useState('confirmed')
  const [choroplethFlag, setChoroplethFlag] = useState('confirmed')

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
                <Button size='sm' variant={choroplethFlag === 'confirmed' ? 'secondary' : 'outline-secondary'} onClick={() => setChoroplethFlag('confirmed')}>Confirmed</Button>
                <Button size='sm' variant={choroplethFlag === 'active' ? 'secondary' : 'outline-secondary'} onClick={() => setChoroplethFlag('active')}>Active</Button>
                <Button size='sm' variant={choroplethFlag === 'death' ? 'secondary' : 'outline-secondary'} onClick={() => setChoroplethFlag('death')}>Death</Button>
                <Button size='sm' variant={choroplethFlag === 'recovered' ? 'secondary' : 'outline-secondary'} onClick={() => setChoroplethFlag('recovered')}>Recovered</Button>
                <br/>
                <br/>
                {choroplethFlag === 'confirmed' ? <Choropleth data={globalCountryConfirmed} info={'Confirmed'} colorRange={confirmedColorRange}/> : ''}
                {choroplethFlag === 'active' ? <Choropleth data={globalCountryActive} info={'Active'} colorRange={activeColorRange}/> : ''}
                {choroplethFlag === 'recovered' ? <Choropleth data={globalCountryRecovered} info={'Recovered'} colorRange={recoveredColorRange}/> : ''}
                {choroplethFlag === 'death' ? <Choropleth data={globalCountryDeaths} info={'Death'} colorRange={deathColorRange}/> : ''}


              </div>
              <div className='singleGridSettings1'>
                <GlobalPie globalData={globalData}/>

              </div>
              <div className='singleGridSettings2'>
              <Table responsive  className='table' >
                <tbody>
                  <tr>
                    <td style={{verticalAlign: 'middle', color:'#ffffff'}}> 
                      <Button size='sm' variant={countriesFlag === 'confirmed' ? 'secondary' : 'outline-secondary'} onClick={() => setCountriesFlag('confirmed')}>Confirmed</Button>
                      <Button size='sm' variant={countriesFlag === 'active' ? 'secondary' : 'outline-secondary'} onClick={() => setCountriesFlag('active')}>Active</Button>
                      <Button size='sm' variant={countriesFlag === 'death' ? 'secondary' : 'outline-secondary'} onClick={() => setCountriesFlag('death')}>Death</Button>
                      <Button size='sm' variant={countriesFlag === 'recovered' ? 'secondary' : 'outline-secondary'} onClick={() => setCountriesFlag('recovered')}>Recovered</Button><br />
                  
                      {countriesFlag === 'confirmed' ? <Countries data={globalCountryConfirmed} info={'Confirmed'} color={globalColor.confirmed}/> : ''}
                      {countriesFlag === 'active' ? <Countries data={globalCountryActive} info={'Active'} color={globalColor.active}/> : ''}
                      {countriesFlag === 'recovered' ? <Countries data={globalCountryRecovered} info={'Recovered'} color={globalColor.recovered}/> : ''}
                      {countriesFlag === 'death' ? <Countries data={globalCountryDeaths} info={'Death'} color={globalColor.death}/> : ''}
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