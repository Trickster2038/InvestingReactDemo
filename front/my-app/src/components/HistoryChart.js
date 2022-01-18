import React from 'react';
import { LineChart, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

class HistoryChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let dataset = this.props.data
        let values = dataset.Low
        let stats = []
        // console.log(volumes)
        for (const [key, value] of Object.entries(values)) {
            let date = new Date(key * 1);
            let datetime = date.toGMTString()
            console.log({ timestamp: key * 1, cost: value, time: datetime })
            stats.push({ timestamp: key * 1, cost: value, time: datetime })
        }
        return (
            <div style={{ textAlign: '-webkit-center'}}>
                <AreaChart width={600} height={300} data={stats}
                    margin={{ top: 5, right: 16, bottom: 5, left: 16 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="time" />
                    <YAxis domain={['dataMin', 'dataMax']}/>
                    <Tooltip />
                    <Area type="monotone" dataKey="cost" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
            </div>
        );
    }
}

export default HistoryChart;