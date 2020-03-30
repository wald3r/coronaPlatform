import React, { useState } from 'react'
import {XYPlot, XAxis, YAxis, LineSeries, Crosshair, DiscreteColorLegend} from 'react-vis'

import { Button, Modal } from 'react-bootstrap'


const Country = ({handleGraph, showGraph, filter, confirmedData, recoveredData, deathsData, activeData}) => {

  const [activeDataFlag, setActiveDataFlag] = useState(false)
  const [confirmedDataFlag, setConfirmedDataFlag] = useState(false)
  const [deathsDataFlag, setDeathsDataFlag] = useState(false)
  const [recoveredDataFlag, setRecoveredDataFlag] = useState(false)

  
  const [crosshair1, setCrosshair1] = useState([])
  const [crosshair2, setCrosshair2] = useState([])
  const [crosshair3, setCrosshair3] = useState([])
  const [crosshair4, setCrosshair4] = useState([])
  const [date, setDate] = useState('')  

  const handleClose = () => {
    handleGraph(false)
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
    setDate(keys[event.index])
  }

  

  const removeCrosshair = () => {
    setCrosshair1([])
    setCrosshair2([])
    setCrosshair3([])
    setCrosshair4([])
    setDate('')
  }


  if((recoveredData !== null && recoveredData !== undefined) && confirmedData !== null && confirmedData !== undefined && activeData !== undefined && activeData !== null && deathsData !== null && deathsData !== undefined ){
   
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


      <Modal size="lg" show={showGraph} onHide={handleClose} animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>{filter} - Graph</Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <div>  
              <Button size='sm' onClick={() => setActiveDataFlag(!activeDataFlag)}>Click me</Button>
              <Button size='sm' onClick={() => setConfirmedDataFlag(!confirmedDataFlag)}>Click me</Button>

              <XYPlot
                onMouseLeave={() => removeCrosshair()}
                margin={50}
                xType='ordinal'
                yDomain={[0, 100000]}
                width={800}
                height={500}>
                <DiscreteColorLegend 
                  items={[{title: 'Active', color: 'red', disabled: !activeDataFlag}, {title: 'Confirmed', color: 'blue', disabled: !confirmedDataFlag}]}
                />
                <LineSeries
                  data={activeDataFlag === true ? handleData()[0]: null}
                  color='red'
                  onNearestX={(datapoint, event) => {
                    handleCrosshair(datapoint, event, 1)
                  }}
                />
                <LineSeries
                  data={confirmedDataFlag === true ? handleData()[1]: null}
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
                  values={[crosshair1[0], crosshair2[0], crosshair3[0], crosshair4[0]]}
                >
                <div>
                  <div>{date === '' ? '' : `Date:${date}`}</div>
                  <div>{crosshair1[0] === undefined ? '' : `Active:${crosshair1[0].y}`}</div>
                  <div>{crosshair2[0] === undefined ? '' : `Confirmed:${crosshair2[0].y}`}</div>
                  <div>{crosshair3[0] === undefined ? '' : `Deaths:${crosshair3[0].y}`}</div>
                  <div>{crosshair4[0] === undefined ? '' : `Recovered:${crosshair4[0].y}`}</div>
                </div>
                </Crosshair>
            
              
                <XAxis hideTicks/>
                <YAxis />
              </XYPlot>
            </div>
       
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>

    )
  }
  else{
    return(
      <Modal show={showGraph} onHide={handleClose} animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>{filter} Statistics</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
         Loading...
        </div>
      
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    )
  }
}


export default Country