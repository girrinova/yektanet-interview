import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import update from "immutability-helper";
import TableDesktopPresentation from "./TableDesktop/TableDesktopPresentation.js";
import TableMobilePresentation from "./TableMobile/TableMobilePresentation";
import data from "./data";
import { isMobile, sortArrayOfObjectsByField } from "../../../common/utils";
import { availableFilters } from "../constants";
import { createDataBST } from "./binarySearch";

const MAX_PAGE = 10000;
const ITEMS_PER_PAGE = 15;

function TableContainer({ filters, sorter, setSorter }) {
  const [staredRowIds, setStaredRowIds] = useState([]);
  const [rows, setRows] = useState(data);
  const dataBST = createDataBST();

  useEffect(() => {
    setShowingRowsLength(ITEMS_PER_PAGE);
  }, [rows]);
  const [showingRowsLength, setShowingRowsLength] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    setStaredRowIds(JSON.parse(localStorage.getItem("saved-stars")) || []);
  }, []);

  useEffect(() => {
    setRows(sortArrayOfObjectsByField(applyFilters(), sorter));
  }, [filters]);

  useEffect(() => {
    localStorage.setItem("saved-stars", JSON.stringify(staredRowIds));
  }, [staredRowIds]);

  useEffect(() => {
    if (sorter === "") {
      setRows(applyFilters());
    } else {
      setRows(sortArrayOfObjectsByField(rows, sorter));
    }
  }, [sorter]);

  const applyFilters = () => {
    let filteredArray = [...data];
    if (filters[availableFilters.date]) {
      filteredArray =
        dataBST?.find(filters[availableFilters.date])?.items || [];
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
    const index = staredRowIds?.indexOf(rowID);
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

  const showMoreRows = () => {
    if (showingRowsLength < ITEMS_PER_PAGE * MAX_PAGE) {
      setShowingRowsLength(showingRowsLength + ITEMS_PER_PAGE);
    }
  };

  return isMobile() ? (
    <TableMobilePresentation
      {...{
        staredRowIds,
        onChangeRowStar,
        showMoreRows,
        rows: rows.slice(0, showingRowsLength),
      }}
    />
  ) : (
    <TableDesktopPresentation
      {...{
        staredRowIds,
        onChangeRowStar,
        sorter,
        onChangeSorter,
        showMoreRows,
        rows: rows.slice(0, showingRowsLength),
      }}
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
