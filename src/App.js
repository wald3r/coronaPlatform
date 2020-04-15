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
import jsonFile from './data/world-110m.json'
import List from './components/List'

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

    
    const handleConfirmedData = () => {
      if(globalCountryConfirmed !== undefined && globalCountryConfirmed !== null){

        let test = globalCountryConfirmed.map(data => {
          const country = jsonFile.objects.ne_110m_admin_0_countries.geometries.filter(geo => (geo.properties.NAME === data.x || data.x === geo.properties.NAME_LONG || data.x === geo.properties.ISO_A2))[0]
          if(country !== undefined){
            const perc = ((Number(data.y) * 100) / country.properties.POP_EST).toFixed(4)
            return {x: data.x, y: Number(perc), yOffset: data.yOffset}
          }else{
            return {x: data.x, y: 0, yOffset: data.yOffset}
          }
        })
        test = test.sort((a, b) => {
          return Number(b.y) - Number(a.y)
        })
        return test
      }
      return null
    }

    const handleData = (dataset) => {
      if(dataset !== undefined && dataset !== null){

        let test = dataset.map(data => {
          const country = jsonFile.objects.ne_110m_admin_0_countries.geometries.filter(geo => (geo.properties.NAME === data.x || data.x === geo.properties.NAME_LONG || data.x === geo.properties.ISO_A2))[0]
          if(country !== undefined){
            const perc = ((Number(data.y) * 100) / country.properties.POP_EST).toFixed(4)
            return {x: data.x, y: Number(perc), yOffset: data.yOffset}
          }else{
            return {x: data.x, y: 0, yOffset: data.yOffset}
          }
        })
        test = test.sort((a, b) => {
          return Number(b.y) - Number(a.y)
        })
        return test
      }
      return null
    }

  
    return (
      <div className='global' >
            <div className='grid-general main-grid'>
              <div className='singleGridSettings1'>
                <h2>COVID-19 Statistics</h2>
              </div>
              <div className='singleGridSettings4'>
                <Numbers data={globalData}/>
              </div>
              <div className='singleGridSettings1'>
                {choroplethFlag === 'confirmed' ? <List info={'Confirmed'} data={globalCountryConfirmed}/> : ''}
                {choroplethFlag === 'active' ? <List info={'Active'} data={globalCountryActive}/> : ''}
                {choroplethFlag === 'death' ? <List info={'Death'} data={globalCountryDeaths}/> : ''}
                {choroplethFlag === 'recovered' ? <List info={'Recovered'} data={globalCountryRecovered}/> : ''}

              </div>
              <div className='singleGridSettings4'>
                <br/>
                <Button size='sm' variant={choroplethFlag === 'confirmed' ? 'secondary' : 'outline-secondary'} onClick={() => setChoroplethFlag('confirmed')}>Confirmed</Button>
                <Button size='sm' variant={choroplethFlag === 'active' ? 'secondary' : 'outline-secondary'} onClick={() => setChoroplethFlag('active')}>Active</Button>
                <Button size='sm' variant={choroplethFlag === 'death' ? 'secondary' : 'outline-secondary'} onClick={() => setChoroplethFlag('death')}>Deaths</Button>
                <Button size='sm' variant={choroplethFlag === 'recovered' ? 'secondary' : 'outline-secondary'} onClick={() => setChoroplethFlag('recovered')}>Recovered</Button>
                <br/>
                <br/>
                {choroplethFlag === 'confirmed' ? <Choropleth data={globalCountryConfirmed} info={'Confirmed'} colorRange={confirmedColorRange}/> : ''}
                {choroplethFlag === 'active' ? <Choropleth data={globalCountryActive} info={'Active'} colorRange={activeColorRange}/> : ''}
                {choroplethFlag === 'recovered' ? <Choropleth data={globalCountryRecovered} info={'Recovered'} colorRange={recoveredColorRange}/> : ''}
                {choroplethFlag === 'death' ? <Choropleth data={globalCountryDeaths} info={'Death'} colorRange={deathColorRange}/> : ''}


              </div>
              <div className='singleGridSettings3'>
                  <GlobalBar  globalData={globalData}/>
              </div>
              <div className='singleGridSettings1'>
                <GlobalPie globalData={globalData}/>

              </div>
              
              <div className='singleGridSettings2'>
                <Table responsive  className='table' >
                  <tbody>
                    <tr>
                      <td style={{verticalAlign: 'middle', color:'#ffffff'}}> 
                        Cases in comparison with the population of each country <br/>
                        <Button size='sm' variant={countriesFlag === 'confirmed' ? 'secondary' : 'outline-secondary'} onClick={() => setCountriesFlag('confirmed')}>Confirmed</Button>
                        <Button size='sm' variant={countriesFlag === 'active' ? 'secondary' : 'outline-secondary'} onClick={() => setCountriesFlag('active')}>Active</Button>
                        <Button size='sm' variant={countriesFlag === 'death' ? 'secondary' : 'outline-secondary'} onClick={() => setCountriesFlag('death')}>Deaths</Button>
                        <Button size='sm' variant={countriesFlag === 'recovered' ? 'secondary' : 'outline-secondary'} onClick={() => setCountriesFlag('recovered')}>Recovered</Button><br />
                        {countriesFlag === 'confirmed' ? <Countries data={handleData(globalCountryConfirmed)} color={globalColor.confirmed}/> : '' }
                        {countriesFlag === 'active' ? <Countries data={handleData(globalCountryActive)} color={globalColor.active}/> : '' }
                        {countriesFlag === 'death' ? <Countries data={handleData(globalCountryDeaths)} color={globalColor.death}/> : '' }
                        {countriesFlag === 'recovered' ? <Countries data={handleData(globalCountryRecovered)} color={globalColor.recovered}/> : '' }

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