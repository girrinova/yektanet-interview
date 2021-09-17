import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import FilterPresentation from "./FilterPresentation.js";
import { usePrevious, useQuery } from "../../../common/hooks";
import {
  availableFilters,
  availableFiltersValues,
  availableSorters,
} from "../constants";
import { initialValuesBasedOnTypes } from "../../../common/constants";
import { removeEmptyValuesFromObject } from "../../../common/utils";

const initialFilters = Object.values(availableFilters).reduce(
  (result, item) => ({
    ...result,
    [item]: initialValuesBasedOnTypes[availableFiltersValues[item].type],
  }),
  {}
);

function FilterContainer({ filters, setFilters, sorter }) {
  const history = useHistory();
  const query = useQuery();
  const urlSearchValues = Object.fromEntries(query.entries());
  const prevUrlSearchValues = usePrevious(urlSearchValues);

  useEffect(() => {
    if (
      JSON.stringify(urlSearchValues) !== JSON.stringify(prevUrlSearchValues)
    ) {
      const newFilters = Object.entries(urlSearchValues).reduce(
        (result, [key, value]) =>
          availableFilters[key] && value && { ...result, [key]: value },
        {}
      );
      if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
        setFilters(newFilters);
      }
    }
  }, [urlSearchValues]);

  const onChangeFilters = (newValue) => {
    history.push(
      `/dashboard?${new URLSearchParams(
        removeEmptyValuesFromObject({
          sorter,
          ...filters,
          ...newValue,
        })
      ).toString()}`
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
  sorter: PropTypes.oneOf([...Object.values(availableSorters), ""]),
};

FilterContainer.defaultProps = {
  filters: {},
  setFilters: () => {},
  sorter: "",
};

export default FilterContainer;
