import { useState } from "react";
import Layout from "../Layout";
import RolesAside from "./RolesAside";
import RolesMain from "./RolesMain";

const Roles = () => {
  const [contentId, setContentId] = useState("");

  return (
    <Layout
      aside={<RolesAside contentId={contentId} setContentId={setContentId} />}
      main={<RolesMain contentId={contentId} />}
    ></Layout>
  );
};

export default Roles;
