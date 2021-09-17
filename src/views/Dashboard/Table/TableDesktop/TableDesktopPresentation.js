import React from "react";
import PropTypes from "prop-types";
import "./TableDesktopPresentation.scss";
import { availableSorters, availableSortersValues } from "../../constants";
import sortDarkIcon from "../../../../assets/icons/sort-dark.svg";
import sortLiteIcon from "../../../../assets/icons/sort-lite.svg";
import bookMarkIcon from "../../../../assets/icons/book-mark.svg";
import expandIcon from "../../../../assets/icons/expand.svg";

function TableDesktopPresentation({
  staredRowIds,
  onChangeRowStar,
  sorter,
  onChangeSorter,
  rows,
  showMoreRows,
}) {
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
        {rows.map((row) => {
          return (
            <div
              key={row.id}
              className={staredRowIds?.includes(row.id) ? "stared" : ""}
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

  return (
    <div className={"dashboard-table"}>
      {rows.length ? (
        <>
          {renderTitles()}
          {renderRows()}
          <div className="dt-load-more" onClick={showMoreRows}>
            <img src={expandIcon} alt={"more"} />
          </div>
        </>
      ) : (
        <p>اطلاعاتی جهت نمایش وجود ندارد.</p>
      )}
    </div>
  );
}

TableDesktopPresentation.propTypes = {
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
  showMoreRows: PropTypes.func,
};

TableDesktopPresentation.defaultProps = {
  staredRowIds: [],
  onChangeRowStar: () => {},
  sorter: "",
  onChangeSorter: () => {},
  rows: [],
  showMoreRows: () => {},
};

export default TableDesktopPresentation;
