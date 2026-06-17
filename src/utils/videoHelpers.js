export const formatViewCount = (views) => {
    const value = Number(views);

    if (!Number.isFinite(value)) {
        return views;
    }

    if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
    }

    if (value >= 100000) {
        return `${(value / 100000).toFixed(1).replace(/\.0$/, "")}lakh`;
    }

    if (value >= 1000) {
        return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}K`;
    }

    return value;
};

export const getItemsByType = (items, type) => {
    if (!Array.isArray(items)) {
        return [];
    }
    return items.filter((item) => item.type === type);
};

export const getListingDataByType = (items, type) => {
    const listing = getItemsByType(items, type)[0];
    if (!listing || !Array.isArray(listing.data)) {
        return [];
    }
    return listing.data;
};
