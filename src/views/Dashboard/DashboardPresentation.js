import React, { useState } from 'react';
import './DashboardPresentation.scss';
import Filter from "./Filter";
import Table from "./Table";

function DashboardPresentation() {
    const [ filters, setFilters ] = useState({});

    return (
        <div className={'yekta-dashboard'}>
            <Filter {...{filters, setFilters}} />
            <Table {...{filters}} />
        </div>
    );
}

export default DashboardPresentation;
