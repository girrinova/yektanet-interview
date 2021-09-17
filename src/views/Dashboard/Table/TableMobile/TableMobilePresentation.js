import React from "react";
import PropTypes from "prop-types";
import "./TableMobilePresentation.scss";
import { availableSortersValues } from "../../constants";
import bookMarkIcon from "../../../../assets/icons/book-mark.svg";
import expandIcon from "../../../../assets/icons/expand.svg";

function TableMobilePresentation({
  staredRowIds,
  onChangeRowStar,
  onChangeSorter,
  rows,
  showMoreRows,
}) {
  const renderCards = () => {
    return (
      <div className={"dt-cards"}>
        {rows.map((row) => (
          <div
            key={row.id}
            className={`dt-card ${
              staredRowIds?.includes(row.id) ? "stared" : ""
            }`}
            onClick={() => onChangeRowStar(row.id)}
          >
            <img className={"dt-bookmark"} src={bookMarkIcon} alt={""} />
            {Object.entries(row)
              .filter(([key]) => key !== "id")
              .map(([key, value]) => (
                <div
                  className={"dt-card-row"}
                  onClick={() => onChangeSorter(row)}
                >
                  <h6>{availableSortersValues[key].title}:</h6>
                  <p>{value}</p>
                </div>
              ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={"dashboard-table"}>
      {renderCards()}
      <div className="dt-load-more" onClick={showMoreRows}>
        <img src={expandIcon} alt={"more"} />
      </div>
    </div>
  );
}

TableMobilePresentation.propTypes = {
  staredRowIds: PropTypes.arrayOf(PropTypes.number),
  onChangeRowStar: PropTypes.func,
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
  showMoreRows: PropTypes.func,
};

TableMobilePresentation.defaultProps = {
  staredRowIds: [],
  onChangeRowStar: () => {},
  onChangeSorter: () => {},
  rows: [],
  showMoreRows: () => {},
};

export default TableMobilePresentation;
