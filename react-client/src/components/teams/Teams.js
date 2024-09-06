import { useRef, useState } from "react";
import Layout from "../Layout";
import TeamAside from "./TeamAside";
import TeamsMain from "./TeamsMain";

function Teams() {
  const [contentId, setContentId] = useState(0);

  const refetchTeam = useRef(null);

  return (
    <Layout
      aside={
        <TeamAside setContentId={setContentId} refetchTeam={refetchTeam} />
      }
      main={
        <TeamsMain
          contentId={contentId}
          setContentId={setContentId}
          refetchTeam={refetchTeam}
        />
      }
    />
  );
}

export default Teams;
