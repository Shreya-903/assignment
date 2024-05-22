import React, { Component } from 'react';
import Papa from 'papaparse';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableSortLabel,
} from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import './MainTable.css';

interface JobData {
  title: string;
  count: number;
}

interface YearData {
  work_year: number;
  total_jobs: number;
  average_salary_usd: number;
  jobs: JobData[];
}

interface MainTableState {
  data: YearData[];
  selectedYearData: JobData[] | null;
  selectedYear: number | null;
  sortBy: keyof YearData;
  sortDirection: 'asc' | 'desc';
  isRowClicked: boolean;
}

class MainTable extends Component<{}, MainTableState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      selectedYearData: null,
      selectedYear: null,
      sortBy: 'work_year',
      sortDirection: 'asc',
      isRowClicked: false,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    Papa.parse(`${process.env.PUBLIC_URL}/salaries.csv`, {
      download: true,
      header: true,
      complete: (result: Papa.ParseResult<{ work_year: string; job_title: string; salary_in_usd: string }>) => {
        const processedData = this.processData(result.data);
        this.setState({ data: processedData });
      },
    });
  }

  processData(data: { work_year: string; job_title: string; salary_in_usd: string }[]): YearData[] {
    const yearMap: { [key: number]: YearData } = {};

    data.forEach(row => {
      const year = parseInt(row.work_year);
      const salary = parseFloat(row.salary_in_usd);
      const jobTitle = row.job_title;

      
      if (isNaN(year) || isNaN(salary)) {
        return;
      }

      if (!yearMap[year]) {
        yearMap[year] = { work_year: year, total_jobs: 0, average_salary_usd: 0, jobs: [] };
      }

      yearMap[year].total_jobs += 1;
      yearMap[year].average_salary_usd += salary;

      const existingJob = yearMap[year].jobs.find(job => job.title === jobTitle);
      if (existingJob) {
        existingJob.count += 1;
      } else {
        yearMap[year].jobs.push({ title: jobTitle, count: 1 });
      }
    });

    const processedData = Object.values(yearMap);
    processedData.forEach(yearData => {
      yearData.average_salary_usd = yearData.average_salary_usd / yearData.total_jobs;
    });

    return processedData;
  }

  handleRowClick = (yearData: YearData) => {
    this.setState({ selectedYearData: yearData.jobs, selectedYear: yearData.work_year, isRowClicked: true });
  };

  handleSort = (sortBy: keyof YearData) => {
    const isAsc = this.state.sortBy === sortBy && this.state.sortDirection === 'asc';
    this.setState({
      sortBy,
      sortDirection: isAsc ? 'desc' : 'asc',
    });
  };

  render() {
    const { data, selectedYearData, selectedYear, sortBy, sortDirection, isRowClicked } = this.state;

    const sortedData = [...data].sort((a, b) => {
      const isAsc = sortDirection === 'asc';
      if (a[sortBy] < b[sortBy]) {
        return isAsc ? -1 : 1;
      }
      if (a[sortBy] > b[sortBy]) {
        return isAsc ? 1 : -1;
      }
      return 0;
    });

    return (
      <div className="container">
        <div className="tables-container">
          <div className="main-table-container">
            <h2>Main Table</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ backgroundColor: '#d0e0f5', textAlign: 'center' }}>
                      <TableSortLabel
                        active={sortBy === 'work_year'}
                        direction={sortBy === 'work_year' ? sortDirection : 'asc'}
                        onClick={() => this.handleSort('work_year')}
                      >
                        Year
                      </TableSortLabel>
                    </TableCell>
                    <TableCell style={{ backgroundColor: '#d0e0f5', textAlign: 'center' }}>
                      <TableSortLabel
                        active={sortBy === 'total_jobs'}
                        direction={sortBy === 'total_jobs' ? sortDirection : 'asc'}
                        onClick={() => this.handleSort('total_jobs')}
                      >
                        Total Jobs
                      </TableSortLabel>
                    </TableCell>
                    <TableCell style={{ backgroundColor: '#d0e0f5', textAlign: 'center' }}>
                      <TableSortLabel
                        active={sortBy === 'average_salary_usd'}
                        direction={sortBy === 'average_salary_usd' ? sortDirection : 'asc'}
                        onClick={() => this.handleSort('average_salary_usd')}
                      >
                        Average Salary (USD)
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedData.map((yearData, index) => (
                    <TableRow
                      key={yearData.work_year}
                      onClick={() => this.handleRowClick(yearData)}
                      style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#eff6ff' }}
                    >
                      <TableCell style={{ textAlign: 'center' }}>{yearData.work_year}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{yearData.total_jobs}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{yearData.average_salary_usd.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="chart-container">
              <ReactApexChart
                options={{
                  chart: {
                    type: 'line',
                    height: 350,
                  },
                  xaxis: {
                    categories: sortedData.map(item => item.work_year.toString()),
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
                    data: sortedData.map(item => item.total_jobs),
                  },
                ]}
                type="line"
                height={350}
              />
            </div>
          </div>
          {isRowClicked && selectedYearData && (
            <div className="second-table-container">
              <h2>Jobs per Year ({selectedYear})</h2>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ backgroundColor: '#d0e0f5', textAlign: 'center' }}>Job Title</TableCell>
                      <TableCell style={{ backgroundColor: '#d0e0f5', textAlign: 'center' }}>Count</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedYearData.map((job, index) => (
                      <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#eff6ff' }}>
                        <TableCell style={{ textAlign: 'center' }}>{job.title}</TableCell>
                        <TableCell style={{ textAlign: 'center' }}>{job.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MainTable;
