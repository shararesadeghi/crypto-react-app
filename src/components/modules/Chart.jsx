import { useState } from 'react';
import styles from './Chart.module.css';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { convertData } from '../../helpers/covertData';

const Chart = ({chart,setChart}) => {
    const [type,setType] = useState("prices");

  return (
    <div className={styles.container}>
        <span className={styles.cross} onClick={()=>setChart(null)}>X</span>
        <div className={styles.chart}>
            <div className={styles.graph}>
                <ChartComponent data={convertData(chart,type)} type={type}/>
            </div>
        </div>
    </div>
  )
}

export default Chart;


const ChartComponent = ({data,type})=>{
    return (
      <ResponsiveContainer height="100%" width="100%">
        <LineChart width={400} height={400} data={data}>
          <Line
            type="monotone"
            dataKey={type}
            stroke="#3874ff"
            strokeWidth="2px"
          />
          <CartesianGrid stroke="#404042" />
          <YAxis dtatKey={type} domain={["auto", "auto"]} />
          <XAxis dataKey="date" hide />
          <Legend />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    );
}