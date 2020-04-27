import React from 'react'
import { RadialChart } from 'react-vis'
import { globalColor } from '../config'
import { Button, Modal, Badge } from 'react-bootstrap'
import { useState } from 'react'


const PieModal = ({handleGraph, showGraph, filter, data}) => {

  const [calc, setCalc] = useState(false)

  const handleClose = () => {
    handleGraph(false)
  }

  const container = {
    height: '100%',
    display: 'inline-block',
    alignItems: 'center',
    justifyContent: 'center',
  }


  const container1 = {
    textAlign: 'center'
  }

  if(data !== undefined && data !== null && filter !== ''){

    const filtered = data.filter(d => d.Country_Region === filter)[0]

    const calcLabel = (number) => {
      
      let totalNumber = Number(filtered.Confirmed) 
      return Math.round(((number * 100) / totalNumber), 2)
    }

    const filteredData1 = () => {
      return [
        {label: filtered.Deaths, angle: Number(filtered.Deaths), color: globalColor.death},
        {label: filtered.Recovered, angle: Number(filtered.Recovered), color: globalColor.recovered},
        {label: filtered.Active, angle: Number(filtered.Active), color: globalColor.active}
      ]
    }

    const filteredData2 = () => {
      return [
        {label: `${calcLabel(Number(filtered.Deaths))}%`, angle: Number(filtered.Deaths), color: globalColor.death},
        {label: `${calcLabel(Number(filtered.Recovered))}%`, angle: Number(filtered.Recovered), color: globalColor.recovered},
        {label: `${calcLabel(Number(filtered.Active))}%`, angle: Number(filtered.Active), color: globalColor.active}
      ]
    }
    
    return (

      <Modal size="lg" show={showGraph} onHide={handleClose} animation={true}>
      <Modal.Header closeButton>
    <Modal.Title>{filter} - Pie Chart {' '} <Button variant='secondary' onClick={() => setCalc(!calc)}>Toggle</Button></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={container1}>
        {calc === true ?
        
          <div style={container}>
          
            <Badge variant="danger">Active</Badge>
            <Badge variant="warning">Deaths</Badge>
            <Badge variant="success">Recovered</Badge>
            <RadialChart
              showLabels={true}
              radius={200}
              labelsRadiusMultiplier={1.25}
              colorType="literal"
              data={filteredData1()}
              width={550}
              height={500}
          
            />
            <Badge variant="primary">Confirmed</Badge> - {filtered.Confirmed}

          </div>
        :
          <div style={container}>
            <Badge variant="danger">Active</Badge>
            <Badge variant="warning">Deaths</Badge>
            <Badge variant="success">Recovered</Badge>
            <RadialChart
              showLabels={true}
              radius={200}
              labelsRadiusMultiplier={1.2}
              colorType="literal"
              data={filteredData2()}
              width={500}
              height={500}
          
            />
            <Badge variant="primary">Confirmed</Badge> - 100%

          </div>
        }
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


export default PieModal