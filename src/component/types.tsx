export interface JobData {
    title: string;
    count: number;
  }
  
  export interface YearData {
    work_year: number;
    total_jobs: number;
    average_salary_usd: number;
    jobs: JobData[];
  }
  