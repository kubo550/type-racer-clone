import firebase from "./config";

const auth = firebase.auth();

interface LoginProps {
  email: string;
  password: string;
}

interface RegisterProps extends LoginProps {
  name: string;
}

export const login = async ({ email, password }: LoginProps) =>
  await auth.signInWithEmailAndPassword(email, password);

export const register = async ({ email, password, name }: RegisterProps) => {
  await auth.createUserWithEmailAndPassword(email, password);
  await auth.currentUser?.updateProfile({ displayName: name });
};

export const loguot = async () => await auth.signOut();

// export const addStatsWps = async (userId: string, wps: number) => {
//   const res =
// }
