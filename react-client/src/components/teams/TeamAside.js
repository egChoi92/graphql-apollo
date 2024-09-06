import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import renderingHandler from "../../utils/renderingHandler";

const GET_TEAMS = gql`
  query GetTeams {
    teams {
      id
      manager
      members {
        id
        first_name
        last_name
        role
      }
    }
  }
`;
const TeamAside = ({ setContentId, refetchTeam }) => {
  const roleIcons = {
    developer: "💻",
    designer: "🎨",
    planner: "📝",
  };

  const { loading, error, data, refetch } = useQuery(GET_TEAMS);

  useEffect(() => {
    refetchTeam.current = refetch;
  }, [refetchTeam]);

  return renderingHandler(
    (items) => {
      return (
        <ul>
          {items.teams.map(({ id, manager, members }) => (
            <li key={id}>
              <span className="teamItemTitle" onClick={() => setContentId(id)}>
                Team {id} : {manager}'s
              </span>
              <ul className="teamMembers">
                {members.map(({ id, first_name, last_name, role }) => (
                  <li key={id}>
                    {roleIcons[role]} {first_name} {last_name}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      );
    },
    loading,
    error,
    data
  );
};

export default TeamAside;
