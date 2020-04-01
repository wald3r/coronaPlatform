import React, { useState } from 'react'
import { Spinner, Badge, Button } from 'react-bootstrap'
import {RadialChart} from 'react-vis'

const GlobalPie = ({ globalData }) => {

  const [confirmedFlag, setConfirmedFlag] = useState(false)


  const container = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  if(globalData === undefined || globalData === null){
    return(
      <div>
        <Spinner animation="border" role="status" /> Loading...     
      </div>
    )
  }else{

    const calcLabel = (number) => {
      
      let totalNumber = confirmedFlag === false ? Number(globalData[0].Confirmed) : Number(globalData[0].Confirmed) * 2 
      return Math.round(((number * 100) / totalNumber), 2)
    }

    var data1 = [
      {label: `${calcLabel(Number(globalData[0].Confirmed))}%`, angle: Number(globalData[0].Confirmed), color: 'blue'},
      {label: `${calcLabel(Number(globalData[0].Deaths))}%`, angle: Number(globalData[0].Deaths), color: 'black'},
      {label: `${calcLabel(Number(globalData[0].Recovered))}%`, angle: Number(globalData[0].Recovered), color: 'green'},
      {label: `${calcLabel(Number(globalData[0].Active))}%`, angle: Number(globalData[0].Active), color: 'red'}
    ]

    var data2 = [
      {label: `${calcLabel(Number(globalData[0].Deaths))}%`, angle: Number(globalData[0].Deaths), color: 'black'},
      {label: `${calcLabel(Number(globalData[0].Recovered))}%`, angle: Number(globalData[0].Recovered), color: 'green'},
      {label: `${calcLabel(Number(globalData[0].Active))}%`, angle: Number(globalData[0].Active), color: 'red'}
    ]

    return (
      <div style={container}>
        <div>  
          <Button size='sm' variant={confirmedFlag !== false ? 'primary' : 'outline-primary'} onClick={() => setConfirmedFlag(!confirmedFlag)}>{confirmedFlag === false ? 'Add Confirmed' : 'Remove Confirmed'}</Button>
          <RadialChart
            showLabels={true}
            radius={200}
            labelsRadiusMultiplier={1.2}
            colorType="literal"
            data={confirmedFlag === false ? data2 : data1}
            width={550}
            height={500}
          />
           <Badge variant={confirmedFlag === false ? 'outline-primary' : 'primary'}>Confirmed</Badge>     
           <Badge variant="danger">Active</Badge>
           <Badge variant="dark">Deaths</Badge>
           <Badge variant="success">Recovered</Badge>

        </div>
      </div>
    )
  }
}


export default GlobalPie