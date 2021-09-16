import React from "react";
import PropTypes from "prop-types";
import "./FilterPresentation.scss";
import { Input } from "../../../common/components";
import { availableFilters, availableFiltersValues } from "../constants";

function FilterPresentation({ filters, onChangeFilters }) {
  const renderFilterItem = (filter) => {
    return (
      <Input
        key={filter}
        title={availableFiltersValues[filter].title}
        type={availableFiltersValues[filter].type}
        value={filters[filter]}
        onChange={(value) => onChangeFilters({ [filter]: value })}
        fullWidth
      />
    );
  };

  return (
    <div className="dashboard-filters">
      {Object.values(availableFilters).map(renderFilterItem)}
    </div>
  );
}

FilterPresentation.propTypes = {
  filters: PropTypes.shape({
    //    TODO, complete
  }),
  onChangeFilters: PropTypes.func,
};

FilterPresentation.defaultProps = {
  filters: {},
  onChangeFilters: () => {},
};

export default FilterPresentation;
