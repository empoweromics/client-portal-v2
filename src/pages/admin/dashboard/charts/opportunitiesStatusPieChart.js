import { useTheme } from '@mui/material';
import Chart from 'react-apexcharts';

export default function TestChart() {
  const theme = useTheme();
  const chartOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%'
        }
      }
    },
    colors: ['#F3AA40', '#c0392b', '#009A67'],
    dataLabels: {
      enabled: true,

      style: {
        colors: [theme.colors.alpha.trueWhite[100]]
      },
      background: {
        enabled: true,
        foreColor: theme.colors.alpha.trueWhite[100],
        padding: 8,
        borderRadius: 4,
        borderWidth: 0,
        opacity: 0.3,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: theme.colors.alpha.black[70],
          opacity: 0.5
        }
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: theme.colors.alpha.black[50],
        opacity: 0.5
      }
    },

    labels: ['pendding', 'failure', 'success'],

    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    }
  };

  const chartSeries = [10, 20, 25];

  return (
    <Chart
      height={200}
      options={chartOptions}
      series={chartSeries}
      type="donut"
    />
  );
}
