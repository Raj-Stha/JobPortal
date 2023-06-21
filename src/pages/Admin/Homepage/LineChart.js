import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import { Line } from "react-chartjs-2";

const LineChart = ({ data }) => {
  ChartJS.register(
    LineController,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale
  );

  let labels = [];
  let values = [];
  data?.jobs.map((job) => {
    labels.push(job.jobTitle);
    values.push(job.appliedCandidate.length);
  });

  const details = {
    labels: labels,
    datasets: [
      {
        label: "Applied Candidate",
        data: values,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  console.log(labels);
  return (
    <div className=" col-span-2 msm:col-span-1 f">
      <Line data={details}></Line>
    </div>
  );
};
export default LineChart;
