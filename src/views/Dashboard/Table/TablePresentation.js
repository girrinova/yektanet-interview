import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./TablePresentation.scss";
import { availableSorters, availableSortersValues } from "../constants";
import sortDarkIcon from "../../../assets/icons/sort-dark.svg";
import sortLiteIcon from "../../../assets/icons/sort-lite.svg";
import bookMarkIcon from "../../../assets/icons/book-mark.svg";
import expandIcon from "../../../assets/icons/expand.svg";

const MAX_PAGE = 10000;
const ITEMS_PER_PAGE = 15;

function TablePresentation({
  staredRowIds,
  onChangeRowStar,
  sorter,
  onChangeSorter,
  rows,
}) {
  useEffect(() => {
    setShowingRowsLength(ITEMS_PER_PAGE);
  }, [rows]);
  const [showingRowsLength, setShowingRowsLength] = useState(ITEMS_PER_PAGE);

  const renderTitles = () => {
    return (
      <div className={"dt-titles"}>
        {Object.values(availableSorters).map((item) => (
          <div key={item} onClick={() => onChangeSorter(item)}>
            <h6>{availableSortersValues[item].title}</h6>
            <img
              className={sorter === item ? "" : "dt-title-hidden-sort"}
              src={sorter === item ? sortDarkIcon : sortLiteIcon}
              alt={""}
            />
          </div>
        ))}
      </div>
    );
  };

  const renderRows = () => {
    return (
      <div className={"dt-rows"}>
        {rows.slice(0, showingRowsLength).map((row) => {
          const isStared = staredRowIds.includes(row.id);
          return (
            <div
              key={row.id}
              className={isStared ? "stared" : ""}
              onClick={() => onChangeRowStar(row.id)}
            >
              <img src={bookMarkIcon} alt={""} />
              {Object.entries(row)
                .filter(([key]) => key !== "id")
                .map(([key, value]) => (
                  <p key={key}>{value}</p>
                ))}
            </div>
          );
        })}
      </div>
    );
  };

  const showMore = () => {
    if (showingRowsLength < ITEMS_PER_PAGE * MAX_PAGE) {
      setShowingRowsLength(showingRowsLength + ITEMS_PER_PAGE);
    }
  };

  return (
    <div className={"dashboard-table"}>
      {renderTitles()}
      {renderRows()}
      <div className="dt-load-more" onClick={showMore}>
        <img src={expandIcon} alt={"more"} />
      </div>
    </div>
  );
}

TablePresentation.propTypes = {
  staredRowIds: PropTypes.arrayOf(PropTypes.number),
  onChangeRowStar: PropTypes.func,
  sorter: PropTypes.oneOf([...Object.values(availableSorters), ""]),
  onChangeSorter: PropTypes.func,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      date: PropTypes.string,
      title: PropTypes.string,
      field: PropTypes.string,
      old_value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      new_value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
};

TablePresentation.defaultProps = {
  staredRowIds: [],
  onChangeRowStar: () => {},
  sorter: "",
  onChangeSorter: () => {},
  rows: [],
};

export default TablePresentation;
