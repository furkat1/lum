import { Button } from "@mui/material";

import { logoutAction } from "../actions";

export const LogoutButton = () => {
  return (
    <form action={logoutAction}>
      <Button variant="contained" type="submit">
        Logout
      </Button>
    </form>
  );
};
