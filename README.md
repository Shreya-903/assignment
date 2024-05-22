# React Job Data Visualization

## Overview

This project visualizes job data using React, PapaParse, Material-UI, and ApexCharts. The application reads job data from a CSV file, processes it, and displays it in a sortable table. Clicking on a table row shows detailed job information for the selected year, and a chart visualizes the number of jobs over the years.

## Features

- **Data Loading**: Loads job data from a CSV file using PapaParse.
- **Sortable Table**: Displays job data in a sortable table using Material-UI.
- **Detailed View**: Clicking a year in the table shows detailed job data for that year.
- **Interactive Chart**: Visualizes job trends over the years using ApexCharts.

## Demo

![Job Data Visualization Demo](path/to/your/demo.gif)

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/react-job-data-visualization.git
    cd react-job-data-visualization
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Run the application:**
    ```bash
    npm start
    ```

4. **Open the application in your browser:**
    ```bash
    http://localhost:3000
    ```

## Project Structure

```plaintext
src
├── components
│   ├── MainTableComponent.tsx
│   ├── JobsPerYearTable.tsx
│   ├── JobsChart.tsx
├── types.ts
├── MainTable.tsx
├── MainTable.css
```

## Components

- **MainTable.tsx**: The main component that loads and processes the data and handles the overall state.
- **MainTableComponent.tsx**: Displays the main sortable table.
- **JobsPerYearTable.tsx**: Displays detailed job data for a selected year.
- **JobsChart.tsx**: Displays a chart of the number of jobs over the years.

## Usage

1. **Data File**: Place your `salaries.csv` file in the `public` directory. The CSV file should have the following structure:

    ```csv
    work_year,job_title,salary_in_usd
    2020,Software Engineer,80000
    2021,Data Scientist,90000
    ```

2. **Running the App**: After starting the application, the job data will be loaded and visualized. Click on a year in the table to view detailed job information for that year.

## Customization

- **Styling**: Modify `MainTable.css` to customize the appearance.
- **Data Processing**: Modify the `processData` method in `MainTable.tsx` to change how data is processed.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a new branch** (`git checkout -b feature/your-feature-name`)
3. **Commit your changes** (`git commit -m 'Add some feature'`)
4. **Push to the branch** (`git push origin feature/your-feature-name`)
5. **Create a Pull Request**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

- **Author**: Shreya Vagare
- **Email**: shreyavagare09@gmail.com
- **GitHub**: [Shreya-903](https://github.com/Shreya-903)

---

