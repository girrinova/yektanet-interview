export const availableFilters = {
    NAME: 'NAME',
    DATE: 'DATE',
    TITLE: 'TITLE',
    FIELD: 'FIELD',
};

export const availableFiltersValues = {
    [availableFilters.NAME]: {
        title: 'نام تغییردهنده',
        type: 'string',
    },
    [availableFilters.DATE]: {
        title: 'تاریخ',
        type: 'date',
    },
    [availableFilters.TITLE]: {
        title: 'نام آگهی',
        type: 'string',
    },
    [availableFilters.FIELD]: {
        title: 'فیلد',
        type: 'string',
    }
};