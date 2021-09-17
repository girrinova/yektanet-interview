export const availableFilters = {
  name: "name",
  date: "date",
  title: "title",
  field: "field",
};

export const availableFiltersValues = {
  [availableFilters.name]: {
    title: "نام تغییردهنده",
    type: "string",
  },
  [availableFilters.date]: {
    title: "تاریخ",
    type: "date",
  },
  [availableFilters.title]: {
    title: "نام آگهی",
    type: "string",
  },
  [availableFilters.field]: {
    title: "فیلد",
    type: "string",
  },
};

export const availableSorters = {
  ...availableFilters,
  old_value: "old_value",
  new_value: "new_value",
};

export const availableSortersValues = {
  ...availableFiltersValues,
  [availableSorters.old_value]: {
    title: "مقدار قدیمی",
    type: "string",
  },
  [availableSorters.new_value]: {
    title: "مقدار جدید",
    type: "string",
  },
};
