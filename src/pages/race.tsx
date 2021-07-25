import { useQuery } from "react-query";
import { getSong } from "api";
import { Grid, Typography } from "@material-ui/core";
import { RaceGame, Stats } from "components";
import { SongData } from "types";
import { useAuth } from "context/Auth";
import { addToStatsWPS, getStats } from "utils";

import styled from "styled-components";

const Container = styled.div`
  max-width: 80rem;
  margin: 20px auto 0;
  min-height: 80vh;
  background-color: rgba(35, 13, 83, 0.4);
  box-sizing: border-box;
  overflow-x: hidden;
  padding: 0 10px;
`;

const Race = () => {
  // prettier-ignore
  const {data, isLoading, error, refetch} = useQuery<SongData, Error>("song", getSong, {staleTime: 1000 * 60 * 3 /* 3 minutes */});
  const { user } = useAuth();

  const { data: stats, refetch: statsRefetch } = useQuery<number[]>(
    ["stats", user],
    () => getStats(user)
  );

  if (isLoading) return <div className=''>loading...</div>;
  if (error || !data) return <div className=''>{error?.message}</div>;

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item sm={12} md={8}>
          <RaceGame
            data={data}
            refetch={refetch}
            addStats={(wps: number) => addToStatsWPS(user, wps)}
            statsRefetch={statsRefetch}
          />
          <button onClick={() => statsRefetch()}>refetch</button>
        </Grid>

        <Grid item sm={12} md={4}>
          <Stats stats={stats} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Race;
