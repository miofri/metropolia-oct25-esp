export interface TemperatureReading {
	_id: string;
	temperature: number;
	humidity: number;
	date: Date;
	deviceId: string;
}

export interface TemperatureStats {
	avgTemp: number;
	minTemp: number;
	maxTemp: number;
	totalReadings: number;
}

export type DataGridRow = {
	id: string;
	temperature: number;
	humidity: number;
	time: number;
};
