import React from 'react'
import {RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer} from 'recharts'

export default class Graphs extends React.Component {
    constructor(){
    super()
    this.state = {}
    }

    render(){
        return (
                <RadarChart outerRadius={90} width={730} height={250} data={this.props.data.needs}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis angle={30} domain={[0, 1]} />
                    <Radar name="Lily" dataKey="percentile" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    <Legend />
                </RadarChart>
        )
    }
}