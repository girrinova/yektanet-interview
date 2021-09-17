import React, { useState } from "react";
import "./DashboardPresentation.scss";
import Filter from "./Filter";
import Table from "./Table";

function DashboardPresentation() {
  const [filters, setFilters] = useState({});
  const [sorter, setSorter] = useState("");

  return (
    <div className={"yekta-dashboard"}>
      <Filter {...{ filters, setFilters, sorter }} />
      <Table {...{ filters, sorter, setSorter }} />
    </div>
  );
}

export default DashboardPresentation;
