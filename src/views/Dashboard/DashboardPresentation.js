import React, { useEffect, useState } from "react";
import "./DashboardPresentation.scss";
import Filter from "./Filter";
import Table from "./Table";
import { useHistory } from "react-router-dom";
import { useQuery } from "../../common/hooks";
import { removeEmptyValuesFromObject } from "../../common/utils";
import { availableSorters } from "./constants";

function DashboardPresentation() {
  const history = useHistory();
  const query = useQuery();
  const [filters, setFilters] = useState({});
  const [sorter, setSorter] = useState("");
  const urlSorter = query.get("sorter");

  useEffect(() => {
    if (availableSorters[urlSorter] || !urlSorter) {
      setSorter(urlSorter || "");
    }
  }, [urlSorter]);

  const onChangeSorter = (newSorter) => {
    history.push(
      `/dashboard?${new URLSearchParams(
        removeEmptyValuesFromObject({
          sorter: newSorter,
          ...filters,
        })
      ).toString()}`
    );
  };

  return (
    <div className={"yekta-dashboard"}>
      <Filter {...{ filters, setFilters, sorter, setSorter }} />
      <Table {...{ filters, sorter, setSorter: onChangeSorter }} />
    </div>
  );
}

export default DashboardPresentation;
