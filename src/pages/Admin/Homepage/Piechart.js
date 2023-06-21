import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";

import { Pie } from "react-chartjs-2";

const Piechart = ({ data }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  let active = 0;
  let expired = 0;
  data?.jobs.map((job) => {
    if (job.jobStatus === "Active") {
      active += 1;
    } else {
      expired += 1;
    }
  });

  let details = {
    labels: ["Active Job", "Expired Job"],
    datasets: [
      {
        label: "Job Detail",
        data: [active, expired],
        backgroundColor: ["#338573", "red"],
      },
    ],
  };

  return (
    <div className="msm:col-span-1  msm:flex msm:justify-center">
      <Pie data={details}></Pie>
    </div>
  );
};
export default Piechart;
