import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { YearData } from './types';

interface JobsChartProps {
  data: YearData[];
}

const JobsChart: React.FC<JobsChartProps> = ({ data }) => {
  return (
    <div className="chart-container">
      <ReactApexChart
        options={{
          chart: {
            type: 'line',
            height: 350,
          },
          xaxis: {
            categories: data.map(item => item.work_year.toString()),
          },
          title: {
            text: 'Number of Jobs from 2020 to 2024',
            align: 'left',
            style: {
              fontSize: '24px',
            },
          },
        }}
        series={[
          {
            name: 'Number of Jobs',
            data: data.map(item => item.total_jobs),
          },
        ]}
        type="line"
        height={350}
      />
    </div>
  );
};

export default JobsChart;
