import React from 'react';
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
import { YearData } from './types';

interface MainTableComponentProps {
  data: YearData[];
  sortBy: keyof YearData;
  sortDirection: 'asc' | 'desc';
  onRowClick: (yearData: YearData) => void;
  onSort: (sortBy: keyof YearData) => void;
}

const MainTableComponent: React.FC<MainTableComponentProps> = ({
  data,
  sortBy,
  sortDirection,
  onRowClick,
  onSort,
}) => {
  return (
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
                  onClick={() => onSort('work_year')}
                >
                  Year
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ backgroundColor: '#d0e0f5', textAlign: 'center' }}>
                <TableSortLabel
                  active={sortBy === 'total_jobs'}
                  direction={sortBy === 'total_jobs' ? sortDirection : 'asc'}
                  onClick={() => onSort('total_jobs')}
                >
                  Total Jobs
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ backgroundColor: '#d0e0f5', textAlign: 'center' }}>
                <TableSortLabel
                  active={sortBy === 'average_salary_usd'}
                  direction={sortBy === 'average_salary_usd' ? sortDirection : 'asc'}
                  onClick={() => onSort('average_salary_usd')}
                >
                  Average Salary (USD)
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((yearData, index) => (
              <TableRow
                key={yearData.work_year}
                onClick={() => onRowClick(yearData)}
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
    </div>
  );
};

export default MainTableComponent;
