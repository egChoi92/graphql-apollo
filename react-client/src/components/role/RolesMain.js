import { gql, useQuery } from "@apollo/client";
import renderingHandler from "../../utils/renderingHandler";

const GET_ROLE = gql`
  query GetRole($id: ID!) {
    role(id: $id) {
      id
      requirement
      members {
        id
        last_name
        serve_years
      }
      equipments {
        id
      }
      softwares {
        id
      }
    }
  }
`;
const RolesMain = ({ contentId }) => {
  const { loading, error, data } = useQuery(GET_ROLE, {
    variables: { id: contentId },
  });

  return renderingHandler(
    (contents) => {
      if (contentId === "")
        return <div className="roleWrapper">Select Role</div>;
      else
        return (
          <div className="roleWrapper">
            <h2>{contents.role.id}</h2>
            <p>{contents.role.requirement}</p>
            <h3>Members</h3>
            <ul>
              {contents.role.members.map((member) => (
                <li key={member.id}>
                  {member.last_name} ({member.serve_years})
                </li>
              ))}
            </ul>
            <h3>Equipments</h3>
            <ul>
              {contents.role.equipments.map((equipment) => (
                <li key={equipment.id}>{equipment.id}</li>
              ))}
            </ul>
            <h3>Softwares</h3>
            <ul>
              {contents.role.softwares.map((software) => (
                <li key={software.id}>{software.id}</li>
              ))}
            </ul>
          </div>
        );
    },
    loading,
    error,
    data
  );
};

export default RolesMain;
