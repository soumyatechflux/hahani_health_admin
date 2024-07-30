// import React, { useEffect } from 'react';
// import Chart from 'chart.js/auto';

// const Graph = ({ id, type }) => {
//   useEffect(() => {
//     const initializeChart = () => {
//       const ctx = document.getElementById(id);

//       if (!ctx) {
//         console.error(`Canvas element with id "${id}" not found`);
//         return;
//       }

//       const existingChart = Chart.getChart(idd:\Home\Home\report.css);
//       if (existingChart) {
//         existingChart.destroy();
//       }

//       const data = {
//         labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], // Weekdays
//         datasets: type === 'line' ? [
//           {
//             label: 'Dataset 1',
//             data: [1200, 1900, 3000, 500, 2000, 300, 3500], // Random data values
//             borderColor: 'rgba(255, 0, 0, 1)', // Line color will be normal red
//             backgroundColor: 'rgba(0, 0, 0, 0)', // No background color
//             borderWidth: 2, // Increase border width for better visibility
//             fill: false // No fill under the line
//           }
//         ] : [
//           {
//             label: 'Dataset 1',
//             data: [12, 190, 300, 50, 200, 30, 350], // Random data values
//             backgroundColor: 'rgba(255, 99, 132, 0.2)', // All bars will be red
//             borderColor: 'rgba(255, 99, 132, 1)', // All borders will be red
//             borderWidth: 1
//           },
//           {
//             label: 'Dataset 2',
//             data: [80, 150, 50, 90, 30, 60, 100], // Random data values
//             backgroundColor: 'rgba(255, 0, 0, 1)', // All bars will be normal red
//             borderColor: 'rgba(255, 0, 0, 1)', // All borders will be normal red
//             borderWidth: 1
//           }
//         ]
//       };

//       new Chart(ctx, {
//         type: type,
//         data: data,
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true,
//               ticks: {
//                 stepSize: type === 'line' ? 500 : 50 // Step size for Y-axis numbers
//               }
//             }
//           }
//         }
//       });
//     };

//     initializeChart();

//     // Clean up function to destroy the chart when the component unmounts
//     return () => {
//       const existingChart = Chart.getChart(id);
//       if (existingChart) {
//         existingChart.destroy();
//       }
//     };
//   }, [id, type]);

//   return <canvas id={id}></canvas>;
// };

// export default Graph;


import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import './graph.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

const Graph = ({ id, type }) => {
  useEffect(() => {
    const initializeChart = () => {
      const ctx = document.getElementById(id);

      if (!ctx) {
        console.error(`Canvas element with id "${id}" not found`);
        return;
      }

      const existingChart = Chart.getChart(id);
      if (existingChart) {
        existingChart.destroy();
      }

      const data = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], // Weekdays
        datasets: type === 'line' ? [
          {
            label: 'Dataset 1',
            data: [1200, 1900, 3000, 500, 2000, 300, 3500], // Random data values
            borderColor: 'rgba(255, 0, 0, 1)', // Line color will be normal red
            backgroundColor: 'rgba(0, 0, 0, 0)', // No background color
            borderWidth: 2, // Increase border width for better visibility
            fill: false // No fill under the line
          }
        ] : [
          {
            label: 'Dataset 1',
            data: [12, 190, 300, 50, 200, 30, 350], // Random data values
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // All bars will be red
            borderColor: 'rgba(255, 99, 132, 1)', // All borders will be red
            borderWidth: 1
          },
          {
            label: 'Dataset 2',
            data: [80, 150, 50, 90, 30, 60, 100], // Random data values
            backgroundColor: 'rgba(255, 0, 0, 1)', // All bars will be normal red
            borderColor: 'rgba(255, 0, 0, 1)', // All borders will be normal red
            borderWidth: 1
          }
        ]
      };

      new Chart(ctx, {
        type: type,
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: type === 'line' ? 500 : 50 // Step size for Y-axis numbers
              }
            }
          }
        }
      });
    };

    initializeChart();

    // Clean up function to destroy the chart when the component unmounts
    return () => {
      const existingChart = Chart.getChart(id);
      if (existingChart) {
        existingChart.destroy();
      }
    };
  }, [id, type]);

  return (
    <div className='container container-graph ' >
      <canvas id={id}></canvas>
    </div>
  );
};

export default Graph;
