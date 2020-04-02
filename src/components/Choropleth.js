import React, {useState, useEffect} from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import ReactTooltip from 'react-tooltip'

const Choropleth = () => {

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
                    const { NAME } = geo.properties
                    setContent(NAME)
                  }}
                  onMouseLeave={() => {
                    setContent("");
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