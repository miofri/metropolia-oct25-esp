import type {
	TemperatureReading,
	TemperatureStats,
} from '../models/temperature';

const API_BASE = 'http://localhost:3001/api';

const getTemperatures = async (): Promise<TemperatureReading[]> => {
	const response = await fetch(`${API_BASE}/mkr-data/db-data`);
	if (!response.ok) throw new Error('Failed to fetch temperatures');
	return response.json();
};

const getStats = async (): Promise<TemperatureStats> => {
	const response = await fetch(`${API_BASE}/mkrRouters/stats`);
	if (!response.ok) throw new Error('Failed to fetch stats');
	return response.json();
};

export const temperatureAPI = {
	getTemperatures,
	getStats,
};
