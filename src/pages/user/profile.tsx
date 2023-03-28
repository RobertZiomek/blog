import dynamic from "next/dynamic";
import React from "react";
import { AccessControl } from "../../components/AccesControl";
import Header from "../../components/Header";
import { api } from "../../utils/api";

function Profile() {
  api.user.me.useQuery();
  return (
    <AccessControl isAuthorized={true}>
      <div>Logged</div>
      <Header />
    </AccessControl>
  );
}

export default dynamic(() => Promise.resolve(Profile), {
  ssr: false,
});
