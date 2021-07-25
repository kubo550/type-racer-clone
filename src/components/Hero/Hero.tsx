import Link from "next/link";
import { Button, Typography } from "@material-ui/core";
import * as S from "./Hero.styles";

const Hero = () => {
  return (
    <S.Container>
      <Typography variant='h4' align='center'>
        Typeracer Clone
      </Typography>
      <Typography variant='subtitle1' component='p'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure alias,
        error cum, sunt repellat impedit hic nihil ab animi deserunt soluta
        molestiae iste ex nisi reiciendis facilis consequuntur! Illo,
        praesentium!
      </Typography>
      <Link href='/race' passHref>
        <Button variant='contained' color='primary'>
          Join Race
        </Button>
      </Link>
    </S.Container>
  );
};

export default Hero;
