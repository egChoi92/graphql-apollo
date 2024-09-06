import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React, { useState } from "react";
import "./App.css";
import "./components/components.css";
import People from "./components/people/People";
import Roles from "./components/role/Roles";
import Teams from "./components/teams/Teams";

// client: GraphQL 서버로와 정보를 주고받을 ApolloClient 객체
const client = new ApolloClient({
  uri: "http://localhost:4000", // uri: GraphQL 서버의 주소
  cache: new InMemoryCache(), // cache: InMemoryCache를 통한 캐시 관리
});

function App() {
  const [menu, setMenu] = useState("Roles");

  let mainComp = {
    Roles: <Roles />,
    Teams: <Teams />,
    People: <People />,
  };

  function NavMenus() {
    return ["Roles", "Teams", "People"].map((_menu, key) => {
      return (
        <li
          key={key}
          className={menu === _menu ? "on" : ""}
          onClick={() => {
            setMenu(_menu);
          }}
        >
          {_menu}
        </li>
      );
    });
  }

  return (
    <div className="App">
      <ApolloProvider client={client}>
        <header className="App-header">
          <h1>Company Management</h1>
          <nav>
            <ul>{NavMenus()}</ul>
          </nav>
        </header>
        <main>{mainComp[menu]}</main>
      </ApolloProvider>
    </div>
  );
}

export default App;
