export const availableFilters = {
    NAME: 'name',
    DATE: 'date',
    TITLE: 'title',
    FIELD: 'field',
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

export const availableSorters = {
    ...availableFilters,
    OLD_VALUE: 'old_value',
    NEW_VALUE: 'new_value',
};

export const availableSortersValues = {
    ...availableFiltersValues,
    [availableSorters.OLD_VALUE]: {
        title: 'مقدار قدیمی',
        type: 'string',
    },
    [availableSorters.NEW_VALUE]: {
        title: 'مقدار جدید',
        type: 'string',
    },
};