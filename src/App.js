import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import '../node_modules/react-vis/dist/style.css'
import {csv} from 'd3-request'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import Countries from './components/Countries'
import globalDataFile from './data/global_information.csv'

import Footer from './components/Footer'
const App =() => {

  const [globalData, setGlobalData] = useState(null)

  //const [filter, setFilter] = useState(['Austria'])

  useEffect(() => {
    csv(globalDataFile, (err, data) => {
      setGlobalData(data)
    })  
  }, [])

    const containerStyle = {
      padding: '40px',
      textAlign: 'center',
      position: 'absolute',
      left: '25%',
      right: '25%',
      transform: `translate(-50px, -50px)` 
    }


    return (
      <div>
        <Router>
          <div style={containerStyle}>
            <br/>
            <h2>COVID-19 Statistics</h2>
            <br></br>
                <Link to='/'>  <Button size='sm' variant="outline-secondary">Home</Button></Link>{' '}
                <Link to='/countries'><Button size='sm' variant="outline-secondary">Countries</Button></Link>

                <Route exact path='/' render={()=> <Home globalData={globalData}/>} />
                <Route exact path='/countries' render={() => <Countries />} />
          </div>
          <br></br>
          <Footer />
        </Router>
      </div>
      
    )
  
  
}


export default App