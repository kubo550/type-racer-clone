import { FC } from "react";
import { countStats } from "utils";

interface StatsProps {
  stats: number[] | undefined;
}

const Stats: FC<StatsProps> = ({ stats }) => {
  const [max, last, avg, last10Avg] = countStats(stats);
  return (
    <div>
      <p> max: {max} </p>
      <p> last: {last} </p>
      <p> avg: {avg} </p>
      <p> last10Avg: {last10Avg} </p>
    </div>
  );
};

export default Stats;
