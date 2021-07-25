import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { firebase } from "firedb";
import styled from "styled-components";
import { Typography } from "@material-ui/core";

const uiConfig = {
  signInSuccessUrl: "/",
  signInOptions: [firebase.auth.GithubAuthProvider.PROVIDER_ID],
};

const Wrapper = styled.div`
  max-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`;

const Auth = () => {
  return (
    <Wrapper>
      <Typography variant='h4'> Typeracer Login </Typography>
      <Typography variant='subtitle1' component='p'>
        Typeracer Login
      </Typography>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </Wrapper>
  );
};

export default Auth;
