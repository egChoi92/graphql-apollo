const renderingHandler = (render, loading, error, data) => {
  if (loading) return <div className="loading">Loading ... </div>;
  if (error) return <div className="error">Error :(</div>;

  if (typeof render === "function") {
    return render(data);
  }

  throw new Error("Render must be a function");
};

export default renderingHandler;
