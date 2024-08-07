import React from 'react'
import Graph from './Graph/Graph'
import './dash.css';

const Dashboard = () => {
  return (
    <>
    <div className='row' style={{marginTop:'10%',display:'flex', justifyContent:'space-evenly', alignItems:'center' }}>
      <div className='col-md-2 col-sm-6 col-12'>
      <div className='cell'>
        <Graph id="chart1" type="bar"/>
      </div>
      </div>
      <div className='col-md-2 col-sm-6  col-12'>
      <div className='cell'>
        <Graph id="chart2" type="line"/>
      </div>
      </div>
    </div>
      

      
  </>
  )
}

export default Dashboard