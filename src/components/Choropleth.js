import React, {useState, useEffect} from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import ReactTooltip from 'react-tooltip'

const Choropleth = ( { confirmedData } ) => {

  const [content, setContent] = useState("");

  const geoUrl ="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"


  return(
    <div>
      <ComposableMap data-tip="" > 
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => 
                <Geography 
                  key={geo.rsmKey} 
                  geography={geo} 
                  onMouseEnter={() => {
                    const file = confirmedData.filter(d => (d.x === geo.properties.NAME || d.x === geo.properties.NAME_LONG || d.x === geo.properties.ISO_A2))[0]
                    if(file !== undefined){
                      setContent(`${file.x} - Confirmed: ${file.y}`)
                    }
                    else{
                      setContent(`${geo.properties.NAME} - No Data`)
                    }
                  }}
                  onMouseLeave={() => {
                    setContent("");
                  }}
                  onClick={() => {
                    console.log('test')
                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none"
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                />)
            }
          </Geographies>
      </ComposableMap>
      <ReactTooltip>{content}</ReactTooltip>
    </div>

  )


}


export default Choropleth 