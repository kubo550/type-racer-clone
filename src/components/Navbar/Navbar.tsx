import Link from "next/link";
import { AppBar, Button, IconButton, Typography } from "@material-ui/core";
import { AccountCircle, Menu as MenuIcon } from "@material-ui/icons";
import { useAuth } from "context/Auth";
import { loguot } from "firedb";
import { useRouter } from "next/router";
import * as S from "./Navbar.style";

const Navbar = () => {
  const { user, isLoading, error } = useAuth();

  const router = useRouter();

  const handleLoguot = async () => {
    await loguot();
    router.push("/");
  };

  return (
    <AppBar position='static'>
      <S.Toolbar>
        <IconButton edge='start' color='inherit' aria-label='menu'>
          <MenuIcon />
        </IconButton>
        {isLoading && <div>load...</div>}
        {!user && !isLoading && (
          <Button variant='contained'>
            <Link href='/auth'>Sing in</Link>
          </Button>
        )}
        {!!user && !isLoading && (
          <S.Flex>
            <Typography variant='h6'>{user.displayName}</Typography>
            <IconButton
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              color='inherit'
            >
              <Link href={`/profile/${user.displayName}`} passHref>
                <AccountCircle />
              </Link>
            </IconButton>
            <Button
              variant='contained'
              color='secondary'
              onClick={handleLoguot}
            >
              Logout
            </Button>
          </S.Flex>
        )}
      </S.Toolbar>
    </AppBar>
  );
};

export default Navbar;
