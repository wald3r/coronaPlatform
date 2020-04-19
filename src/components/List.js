import React from 'react'
import { Table, Spinner } from 'react-bootstrap'
import '../main.css'

const List = ({ data, info }) => {

  if(data === undefined || data === null){
    return(
      <div>
        <Spinner animation="border" role="status" /> Loading...     
      </div>
    )
  }else{
    return (
      <div style={{overflowY: 'auto', overflowX: 'hidden', maxHeight: '800px'}}>
        <Table className='listcases' striped variant='dark' bordered hover size='sm'>
          <thead>
            <tr>
              <th style={{ width: '100px'}}>Country</th>
              <th>{info} Cases</th>
            </tr>
          </thead>
          <tbody >
            {data.map((d, e) => (
              <tr key={e} >
                <td stlye={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>{d.x}</td>
                <td>{d.y}</td>
              </tr>
            ))}
          </tbody>


        </Table>

      </div>
    )
  }
}




export default List