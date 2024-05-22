import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { JobData } from './types';

interface JobsPerYearTableProps {
  data: JobData[];
  selectedYear: number | null;
}

const JobsPerYearTable: React.FC<JobsPerYearTableProps> = ({ data, selectedYear }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ backgroundColor: '#d0e0f5', textAlign: 'center' }}>Job Title</TableCell>
            <TableCell style={{ backgroundColor: '#d0e0f5', textAlign: 'center' }}>Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((job, index) => (
            <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#eff6ff' }}>
              <TableCell style={{ textAlign: 'center' }}>{job.title}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>{job.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JobsPerYearTable;
