import React from "react";

const Layout = ({ aside, main }) => {
  return (
    <div className="component">
      <aside>{aside}</aside>
      <main className="contents">{main}</main>
    </div>
  );
};

export default Layout;
