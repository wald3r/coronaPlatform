import React, { useState } from 'react'
import {XYPlot, XAxis, YAxis, LineSeries, Crosshair, HorizontalGridLines} from 'react-vis'
import { globalColor } from '../config'
import { Button, Modal } from 'react-bootstrap'


const Country = ({domain, handleGraph, showGraph, filter, confirmedData, recoveredData, deathsData, activeData}) => {

  const [activeDataFlag, setActiveDataFlag] = useState(false)
  const [confirmedDataFlag, setConfirmedDataFlag] = useState(true)
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
        if(Number(tmp2) !== 0){
          data1.push({x: keys[a], y: tmp1})
          data2.push({x: keys[a], y: tmp2})
          data3.push({x: keys[a], y: tmp3})
          data4.push({x: keys[a], y: tmp4})
        }
      }
      data.push(data1)
      data.push(data2)
      data.push(data3)
      data.push(data4)
      
      return data
  
    }

    const handleCrosshair = (datapoint, event, elem) => {
      let keys = handleData()[0].map(data => data.x)
      let arr = []
      let tmp = confirmedData[keys[event.index]]
      console.log('y', tmp)
      console.log('keys', keys)
      console.log(event.index, keys[event.index])
      console.log(confirmedData)
      if(Number(tmp) === 0){
        return
      }
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
      console.log(arr)
      setDate(keys[event.index])
    }

    return (

      <Modal size="lg" show={showGraph} onHide={handleClose} animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>{filter} - Graph</Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <div> 
              <div style={{textAlign: 'center'}}>  
                <Button size='sm' variant={confirmedDataFlag === true ? 'primary' : 'outline-primary'} onClick={() => setConfirmedDataFlag(!confirmedDataFlag)}>Confirmed</Button>
                <Button size='sm' variant={activeDataFlag === true ? 'danger' : 'outline-danger'} onClick={() => setActiveDataFlag(!activeDataFlag)}>Active</Button>
                <Button size='sm' variant={deathsDataFlag === true ? 'warning' : 'outline-warning'} onClick={() => setDeathsDataFlag(!deathsDataFlag)}>Deaths</Button>
                <Button size='sm' variant={recoveredDataFlag === true ? 'success' : 'outline-success'} onClick={() => setRecoveredDataFlag(!recoveredDataFlag)}>Recovered</Button>
              </div>
              <XYPlot
                onMouseLeave={() => removeCrosshair()}
                margin={{right: 100}}
                xType='ordinal'
                yDomain={[0, domain]}
                width={800}
                height={500}>
                <LineSeries
                  data={activeDataFlag === true ? handleData()[0]: null}
                  color= {globalColor.active}
                  onNearestX={(datapoint, event) => {
                    handleCrosshair(datapoint, event, 1)
                  }}
                />
                <LineSeries
                  data={confirmedDataFlag === true ? handleData()[1]: null}
                  color={globalColor.confirmed}
                  onNearestX={(datapoint, event) => {
                    console.log('datapoint', datapoint)
                    handleCrosshair(datapoint, event, 2)
                  }}
          
                />
                <LineSeries
                  data={deathsDataFlag === true ? handleData()[2]: null}
                  color={globalColor.death}
                  onNearestX={(datapoint, event) => {
                    handleCrosshair(datapoint, event, 3)
                  }}
                />

                <LineSeries
                  data={recoveredDataFlag === true ? handleData()[3]: null}
                  color={globalColor.recovered}
                  onNearestX={(datapoint, event) => {
                    handleCrosshair(datapoint, event, 4)
                  }}
                />  
                <Crosshair 
                  values={[crosshair1[0], crosshair2[0], crosshair3[0], crosshair4[0]]}
                >
                <div style={{color: '#000000'}}>
                  <div>{date === '' ? '' : `Day:${date}`}</div>
                  <div>{crosshair1[0] === undefined ? '' : `Active:${crosshair1[0].y}`}</div>
                  <div>{crosshair2[0] === undefined ? '' : `Confirmed:${crosshair2[0].y}`}</div>
                  <div>{crosshair3[0] === undefined ? '' : `Deaths:${crosshair3[0].y}`}</div>
                  <div>{crosshair4[0] === undefined ? '' : `Recovered:${crosshair4[0].y}`}</div>
                </div>
                </Crosshair>
            
                <HorizontalGridLines />
                <XAxis title={'Days'} hideTicks />
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
        <Modal.Title>{filter} - Graph</Modal.Title>
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