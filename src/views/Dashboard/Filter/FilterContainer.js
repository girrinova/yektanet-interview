import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import FilterPresentation from "./FilterPresentation.js";
import { usePrevious, useQuery } from "../../../common/hooks";
import { availableFilters, availableFiltersValues } from "../constants";
import { initialValuesBasedOnTypes } from "../../../common/constants";

const initialFilters = Object.values(availableFilters).reduce(
  (result, item) => ({
    ...result,
    [item]: initialValuesBasedOnTypes[availableFiltersValues[item].type],
  }),
  {}
);

function FilterContainer({ filters, setFilters }) {
  const history = useHistory();
  const query = useQuery();
  const urlSearchValues = Object.fromEntries(query.entries());
  const prevUrlSearchValues = usePrevious(urlSearchValues);

  useEffect(() => {
    if (
      JSON.stringify(urlSearchValues) !== JSON.stringify(prevUrlSearchValues)
    ) {
      setFilters(urlSearchValues);
    }
  }, [urlSearchValues]);

  const onChangeFilters = (newValue) => {
    history.push(
      `/dashboard?${new URLSearchParams({
        ...filters,
        ...newValue,
      }).toString()}`
    );
  };

  return (
    <FilterPresentation
      {...{ filters: { ...initialFilters, ...filters }, onChangeFilters }}
    />
  );
}

FilterContainer.propTypes = {
  filters: PropTypes.object,
  setFilters: PropTypes.func,
};

FilterContainer.defaultProps = {
  filters: {},
  setFilters: () => {},
};

export default FilterContainer;
