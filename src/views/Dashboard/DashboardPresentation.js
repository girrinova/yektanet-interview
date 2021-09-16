import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import style from './DashboardPresentation.scss';
import Filter from "./Filter";
import Table from "./Table";

function DashboardPresentation() {
    const [ filters, setFilters ] = useState({});

    useEffect(() => {
    // TODO change Table values
    }, [filters]);

    return (
        <div>
            <Filter {...{filters, setFilters}} />
            <Table />
        </div>
    );
}

DashboardPresentation.propTypes = {};

DashboardPresentation.defaultProps = {};

export default DashboardPresentation;
