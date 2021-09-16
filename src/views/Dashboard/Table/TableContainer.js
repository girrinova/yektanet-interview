import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import update from "immutability-helper";
import TablePresentation from "./TablePresentation.js";
import data from "./data";
import { sortArrayOfObjectsByField } from "../../../common/utils";
import { availableFilters } from "../constants";
import { createDataBST } from "./binarySearch";

function TableContainer({ filters }) {
  const [staredRowIds, setStaredRowIds] = useState([]);
  const [sorter, setSorter] = useState("");
  const [rows, setRows] = useState(data);
  const dataBST = createDataBST();

  useEffect(() => {
    setStaredRowIds(JSON.parse(localStorage.getItem("saved-stars")));
  }, []);

  useEffect(() => {
    setRows(applyFilters());
  }, [filters]);

  useEffect(() => {
    localStorage.setItem("saved-stars", JSON.stringify(staredRowIds));
  }, [staredRowIds]);

  useEffect(() => {
    if (sorter === "") {
      setRows(data);
    } else {
      setRows(sortArrayOfObjectsByField(data, sorter));
    }
  }, [sorter]);

  const applyFilters = () => {
    let filteredArray = [...data];
    if (filters[availableFilters.DATE]) {
      filteredArray = dataBST?.find(filters[availableFilters.DATE])?.items;
    }
    return Object.entries(filters).reduce(
      (result, [key, value]) => {
        return result.filter((item) =>
          item[key].toLowerCase().includes(value.toLowerCase())
        );
      },
      [...filteredArray]
    );
  };

  const onChangeRowStar = (rowID) => {
    const index = staredRowIds.indexOf(rowID);
    setStaredRowIds(
      update(
        staredRowIds,
        index === -1 ? { $push: [rowID] } : { $splice: [[index, 1]] }
      )
    );
  };

  const onChangeSorter = (fieldName) => {
    setSorter(fieldName === sorter ? "" : fieldName);
  };

  return (
    <TablePresentation
      {...{ staredRowIds, onChangeRowStar, sorter, onChangeSorter, rows }}
    />
  );
}

TableContainer.propTypes = {
  filters: PropTypes.shape({
    //    TODO complete
  }),
};

TableContainer.defaultProps = {
  filters: {},
};

export default TableContainer;
