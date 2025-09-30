import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import './Temperature.css';
import type { TemperatureReading } from '../models/temperature';
import { temperatureAPI } from '../controllers/Temperatures';

export const TemperatureDashboard: React.FC = () => {
	const [temperatures, setTemperatures] = useState<TemperatureReading[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [refresher, setRefresher] = useState<number>(1);
	const [error, setError] = useState<string | null>(null);

	const fetchTemperatures = async () => {
		try {
			setLoading(true);
			const data = await temperatureAPI.getTemperatures();
			setTemperatures(data);
			setError(null);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to fetch data');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTemperatures();
		const interval = setInterval(() => {
			setRefresher((prev) => prev + 1);
		}, 2000);
		return () => clearInterval(interval);
	}, [refresher]);

	if (loading && temperatures.length == 0) {
		return <div>Loading temperature data...</div>;
	}

	const dataset = temperatures.map((t) => ({
		temperature: t.temperature,
		humidity: t.humidity,
		time: new Date(t.date).getTime(),
	}));

	return (
		<div className="dashboard">
			<h1>🌡️ Temperature Dashboard</h1>
			<div className="chart-group">
				<div className="temp-history">
					<h3>Recent Readings</h3>
					<LineChart
						dataset={dataset}
						xAxis={[
							{
								dataKey: 'time',
								label: 'Time',
								scaleType: 'time',
								valueFormatter: (value: number) => {
									return new Date(value).toLocaleTimeString('en-US', {
										hour: '2-digit',
										minute: '2-digit',
									});
								},
							},
						]}
						yAxis={[{ min: 15, max: 30, label: 'Temperature (°C)' }]}
						series={[
							{
								dataKey: 'temperature',
								color: 'red',
								label: 'Temperature (°C)',
								showMark: false,
							},
						]}
						height={200}
					/>
					<LineChart
						dataset={dataset}
						xAxis={[
							{
								dataKey: 'time',
								label: 'Time',
								scaleType: 'time',
								valueFormatter: (value: number) => {
									return new Date(value).toLocaleTimeString('en-US', {
										hour: '2-digit',
										minute: '2-digit',
									});
								},
							},
						]}
						yAxis={[{ min: 0, max: 100, label: 'Humidity (%)' }]}
						series={[
							{
								dataKey: 'humidity',
								color: 'blue',
								label: 'Humidity (%)',
								showMark: false,
							},
						]}
						height={200}
					/>
				</div>
				<div className="warning-popup"></div>
			</div>
		</div>
	);
};
