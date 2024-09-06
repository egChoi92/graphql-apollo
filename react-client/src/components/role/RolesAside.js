import { gql, useQuery } from "@apollo/client";
import renderingHandler from "../../utils/renderingHandler";

const GET_ROLES = gql`
  query GetRoles {
    roles {
      id
    }
  }
`;

const RolesAside = ({ contentId, setContentId }) => {
  const roleIcons = {
    developer: "💻",
    designer: "🎨",
    planner: "📝",
  };
  const { loading, error, data } = useQuery(GET_ROLES);

  return renderingHandler(
    (items) => {
      return (
        <ul>
          {items.roles.map(({ id }) => {
            const isActive = id === contentId;
            return (
              <li
                key={id}
                className={`roleItem ${isActive ? "on" : ""}`}
                onClick={() => setContentId(id)}
              >
                <span>{isActive ? "🔲" : "⬛"} </span>
                {roleIcons[id]}
                {id}
              </li>
            );
          })}
        </ul>
      );
    },
    loading,
    error,
    data
  );
};

export default RolesAside;
