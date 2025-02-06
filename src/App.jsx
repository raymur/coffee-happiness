import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { AreaChart, 
  XAxis, YAxis, CartesianGrid, Area,  Tooltip,
  ComposedChart, Bar
  } from 'recharts';

  import { format } from 'date-fns';


function App() {
  const [count, setCount] = useState(0)
  const data = [
    {
      "time": new Date(0,0,0,8,0,0).getTime(),
      "coffee": 1,
      "happiness": 5
    },
    {
      "time": new Date(0,0,0,10,0,0).getTime(),
      "coffee": 5,
      "happiness": 9

    },
    {
      "time": new Date(0,0,0,14,0,0).getTime(),
      "happiness": 3
    },
    {
      "time": new Date(0,0,0,14,30,0).getTime(),
      "coffee": 2
    },   
    {
      "time": new Date(0,0,0,15,0,0).getTime(),
      "happiness": 5
    },
    {
      "time": new Date(0,0,0,20,0,0).getTime(),
      "happiness": 8
    },
    {
      "time": new Date(0,0,0,22,0,0).getTime(),
      "happiness": 8
    },
  ]

  // 3600000 ms  = 1 hour
  const calcDomain = (data, msOffset=60000 ) => {
    const times = data.forEach(d => d.time)
    return [Math.min() - msOffset, Math.max() + msOffset]

  }
  
  const emotions = ['🤯', '🤕', '😫', '☹️', '🙁', '😐', '🙂', '😊', '😄', '😀', '😁']

  const getFace = (value) => {
    value = Math.floor(value)
    value = Math.max(0, value)
    value = Math.min(emotions.length - 1, value)
    return emotions[value]
  } 
  
  return (
    <>
    <h2>Coffee to happiness</h2>
<ComposedChart width={730} height={250} data={data}
  margin={{ top: 10, right: 0, left: 0, bottom: 20 }}  >
  <defs>
    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#ffb445" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#ffb445" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis 
  dataKey="time" 
  type="number" 
  domain={([dmin,dmax]) => [dmin-120000, dmax+120000]} 
  scale="time"
  tickFormatter={(time) => format(new Date(time), 'HH:mm')}
/>

  <YAxis domain={[0, 10]}  />
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip  
    formatter={(value, name, props) => {
      if (props.dataKey == 'coffee'){
        return ['☕'.repeat(value), name]
      }else if (props.dataKey == 'happiness'){
        return [value + ' ' + getFace(value), name]

      }
    }} 
    itemStyle={{color: 'black'}} 
    labelStyle={{display: 'none'}}
    contentStyle={{borderRadius: '25px', filter: 'drop-shadow(8px 8px 10px gray)'}}/>
  <Area 
    type="monotone"
    dataKey="happiness" 
    stroke="#ffb445" 
    fillOpacity={1} 
    fill="url(#colorPv)" 
    padding={{left: 10}}
    connectNulls={true}
   />
  <Bar dataKey="coffee" barSize={20} fill="#493400" />

</ComposedChart>
    </>
  )
}

export default App
