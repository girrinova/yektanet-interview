import React from 'react';
import PropTypes from 'prop-types';
import './TablePresentation.scss';
import {availableSorters, availableSortersValues} from "../constants";
import sortDarkIcon from '../../../assets/icons/sort-dark.svg';
import sortLiteIcon from '../../../assets/icons/sort-lite.svg';
import bookMarkIcon from '../../../assets/icons/book-mark.svg';

function TablePresentation({ staredRowIds, onChangeRowStar, sorter, onChangeSorter, rows }) {
    const renderTitles = () => {
        return (
            <div className={'dt-titles'}>
                {Object.values(availableSorters).map(item => (
                    <div key={item} onClick={() => onChangeSorter(item)}>
                        <h6>{availableSortersValues[item].title}</h6>
                        <img
                            className={sorter === item ? '' : 'dt-title-hidden-sort'}
                            src={sorter === item ? sortDarkIcon : sortLiteIcon}
                            alt={''}
                        />
                    </div>
                ))}
            </div>
        )
    };

    const renderRows = () => {
        // TODO add lazy loading
        return rows.slice(0, 50).map(row => {
            const isStared = staredRowIds.includes(row.id);
            return (
                <div
                    key={row.id}
                    className={`dt-row ${isStared ? 'stared' : ''}`}
                    onClick={() => onChangeRowStar(row.id)}
                >
                    <img src={bookMarkIcon} alt={''} />
                    {Object.entries(row).filter(([key,]) => key !== 'id').map(([key,value]) =>
                        <p key={key}>{value}</p>
                    )}
                </div>
            )
        })
    };

    return (
        <div className={'dashboard-table'}>
            {renderTitles()}
            {renderRows()}
        </div>
    );
}

TablePresentation.propTypes = {
    staredRowIds: PropTypes.arrayOf(PropTypes.number),
    onChangeRowStar: PropTypes.func,
    sorter: PropTypes.oneOf([...Object.values(availableSorters), '']),
    onChangeSorter: PropTypes.func,
    rows: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        date: PropTypes.string,
        title: PropTypes.string,
        field: PropTypes.string,
        old_value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        new_value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })),
};

TablePresentation.defaultProps = {
    staredRowIds: [],
    onChangeRowStar: () => {},
    sorter: '',
    onChangeSorter: () => {},
    rows: [],
};

export default TablePresentation;
