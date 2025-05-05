import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { MetricKey } from '../types/types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function Chart({ label, data, days }: { label: MetricKey, data: number[], days: string[] }) {
  return (
    <div style={{ width: '100%', height: 300, display: "flex", justifyContent:"center" }}>
      <Line
        options={{
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: false 
            }
          }
        }}
        data={{
          labels: days,
          datasets: [{
            label,
            data,
            borderColor: '#0a9396',
            backgroundColor: 'rgba(10,147,150,0.3)',
            borderWidth: 2,
            tension: 0.1
          }]
        }}
      />
    </div>
  );
}