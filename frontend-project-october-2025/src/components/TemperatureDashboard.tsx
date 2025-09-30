import React, { useState, useEffect } from 'react';

import './Temperature.css';
import { LineCharts } from './LineCharts';
import type { DataGridRow, TemperatureReading } from '../models/temperature';
import { temperatureAPI } from '../controllers/Temperatures';
import { TempTable } from './TempTable';

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

	const dataset: DataGridRow[] = temperatures.map((t) => ({
		id: t._id,
		temperature: t.temperature,
		humidity: t.humidity,
		time: new Date(t.date).getTime(),
	}));

	return (
		<div className="dashboard">
			<h1>🌡️ Temperature Dashboard</h1>
			<div className="chart-group">
				<div className="temp-table">
					<TempTable dataset={dataset} />
				</div>
				<div className="temp-line-chart">
					<h3>Recent Readings</h3>
					<LineCharts dataset={dataset} />
				</div>
				{/* <div className="warning-popup"></div> */}
			</div>
		</div>
	);
};
