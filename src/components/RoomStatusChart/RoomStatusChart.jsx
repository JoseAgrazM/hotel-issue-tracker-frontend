import { useState, useEffect } from 'react';
import './RoomStatusChart.css';

export const RoomStatusChart = ({ total, occupied, available, blocked }) => {
	const [segments, setSegments] = useState([]);

	const colors = {
		occupied: '#FF6384',
		available: '#36A2EB',
		blocked: '#FFCE56',
	};

	const calculatePercentage = value => {
		if (total === 0) return 0;
		return ((value / total) * 100).toFixed(1);
	};

	useEffect(() => {
		const calculateSegments = () => {
			const radius = 80;
			const center = 100;
			let accumulatedAngle = -90;

			const percentages = {
				occupied: (occupied / total) * 100,
				available: (available / total) * 100,
				blocked: (blocked / total) * 100,
			};

			const fullStatus = Object.entries(percentages).find(
				([_, p]) => p === 100
			);
			if (fullStatus) {
				setSegments([
					{
						d: `M 100 100 m -80 0 a 80 80 0 1 0 160 0 a 80 80 0 1 0 -160 0`,
						fill: colors[fullStatus[0]],
					},
				]);
				return;
			}

			const calculateCoordinates = angle => {
				const radians = ((angle - 90) * Math.PI) / 180;
				return {
					x: center + radius * Math.cos(radians),
					y: center + radius * Math.sin(radians),
				};
			};

			const newSegments = [];

			Object.entries(percentages).forEach(([status, percentage]) => {
				if (percentage > 0) {
					const angle = (percentage / 100) * 360;
					const start = calculateCoordinates(accumulatedAngle);
					accumulatedAngle += angle;
					const end = calculateCoordinates(accumulatedAngle);

					newSegments.push({
						largeArc: percentage > 50 ? 1 : 0,
						d: `M ${center} ${center}
                L ${start.x} ${start.y}
                A ${radius} ${radius} 0 ${percentage > 50 ? 1 : 0} 1 ${end.x} ${
							end.y
						}
                L ${center} ${center} Z`,
						fill: colors[status],
					});
				}
			});

			setSegments(newSegments);
		};

		calculateSegments();
	}, [total, occupied, available, blocked]);

	return (
		<div className='chart-container'>
			<svg width='200' height='200' viewBox='0 0 200 200'>
				{segments.map((segment, index) => (
					<path key={index} d={segment.d} fill={segment.fill} />
				))}
				{/* Solo muestra el círculo central si no hay segmento completo */}
				{!segments.some(s => s.d.includes('m -80')) && (
					<>
						<circle cx='100' cy='100' r='60' fill='white' />
						<text
							x='100'
							y='100'
							textAnchor='middle'
							dy='.3em'
							fontSize='20'
						>
							{total}
						</text>
					</>
				)}
			</svg>

			<div className='legend'>
				<div className='legend-item'>
					<span
						className='color-box'
						style={{ backgroundColor: colors.occupied }}
					></span>
					Ocupadas: <strong>{occupied}</strong> (
					{calculatePercentage(occupied)}%)
				</div>
				<div className='legend-item'>
					<span
						className='color-box'
						style={{ backgroundColor: colors.available }}
					></span>
					Disponibles: <strong>{available} </strong>(
					{calculatePercentage(available)}%)
				</div>
				<div className='legend-item'>
					<span
						className='color-box'
						style={{ backgroundColor: colors.blocked }}
					></span>
					Bloqueadas: <strong>{blocked}</strong> (
					{calculatePercentage(blocked)}%)
				</div>
			</div>
		</div>
	);
};
