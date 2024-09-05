import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import "./components.css";

const GET_ROLES = gql`
  query GetRoles {
    roles {
      id
    }
  }
`;

function Roles() {
  const [contentId, setContentId] = useState("");

  function AsideItems() {
    const roleIcons = {
      developer: "💻",
      designer: "🎨",
      planner: "📝",
    };
    const { loading, error, data } = useQuery(GET_ROLES);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error :(</div>;

    return (
      <ul>
        {data.roles.map(({ id }) => {
          return (
            <li
              key={id}
              className={`roleItem ${contentId === "id" ? "on" : ""}`}
            >
              <span>{contentId === id ? "🔲" : "⬛"} </span>
              {roleIcons[id]}
              {id}
            </li>
          );
        })}
      </ul>
    );
  }

  function MainContents() {
    return <div></div>;
  }

  return (
    <div id="roles" className="component">
      <aside>{AsideItems()}</aside>
      <section className="contents">{MainContents()}</section>
    </div>
  );
}

export default Roles;
