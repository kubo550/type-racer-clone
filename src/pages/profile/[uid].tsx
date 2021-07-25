import { Typography } from "@material-ui/core";
import { useAuth } from "context/Auth";

const Profile = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!user) return <div> YOU DONT HAVE ACCESS</div>;

  return (
    <div>
      <Typography variant='h4'>Hello, {user.displayName}!</Typography>
    </div>
  );
};

export default Profile;
