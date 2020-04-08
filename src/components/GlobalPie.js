import React from 'react'
import { Spinner, Badge } from 'react-bootstrap'
import {RadialChart} from 'react-vis'
import { globalColor } from '../config'

const GlobalPie = ({ globalData }) => {

  const container = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
  }

  if(globalData === undefined || globalData === null){
    return(
      <div>
        <Spinner animation="border" role="status" /> Loading...     
      </div>
    )
  }else{

    const calcLabel = (number) => {
      
      let totalNumber = Number(globalData[0].Confirmed) 
      return Math.round(((number * 100) / totalNumber), 2)
    }

    var data = [
      {label: `${calcLabel(Number(globalData[0].Deaths))}%`, angle: Number(globalData[0].Deaths), color: globalColor.death},
      {label: `${calcLabel(Number(globalData[0].Recovered))}%`, angle: Number(globalData[0].Recovered), color: globalColor.recovered},
      {label: `${calcLabel(Number(globalData[0].Active))}%`, angle: Number(globalData[0].Active), color: globalColor.active}
    ]

    return (
      <div style={container}>
        <div>
          <Badge variant="danger">Active</Badge>
          <Badge variant="warning">Deaths</Badge>
          <Badge variant="success">Recovered</Badge>
          <RadialChart
            showLabels={true}
            radius={200}
            labelsRadiusMultiplier={1.2}
            colorType="literal"
            data={data}
            width={550}
            height={500}
            labelsStyle={{fill: '#FFFFFF'}}
          />
        </div>
      </div>
    )
  }
}


export default GlobalPie