import React, { Component } from 'react';
import Papa from 'papaparse';
import { YearData, JobData } from '../types';
import MainTableComponent from '../MainTableComponent';
import JobsPerYearTable from '../JobsPerYearTable';
import JobsChart from '../JobsChart';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import './MainTable.css';

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

  handleCloseModal = () => {
    this.setState({ isRowClicked: false });
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
          <MainTableComponent
            data={sortedData}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onRowClick={this.handleRowClick}
            onSort={this.handleSort}
          />
          <div className="jobschart">
            <JobsChart data={sortedData} />
          </div>
        </div>
        <Dialog
          open={isRowClicked}
          onClose={this.handleCloseModal}
          aria-labelledby="job-details-dialog-title"
          maxWidth="md"
          fullWidth
        >
          <DialogTitle id="job-details-dialog-title">Jobs per Year ({selectedYear})</DialogTitle>
          <DialogContent>
            {selectedYearData && <JobsPerYearTable data={selectedYearData} selectedYear={selectedYear} />}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseModal} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default MainTable;
