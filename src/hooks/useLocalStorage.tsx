import { useState, useEffect } from "react";
import { StorageMappers } from "../types";

function getStorageValue(key: string, defaultValue: []) {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
}

export const useLocalStorage = <TStorage, TInternal>(
    key: string,
    defaultValue: [],
    mappers?: StorageMappers<TStorage, TInternal>,
) => {
    const [value, setValue] = useState(() => {
        const data = getStorageValue(key, defaultValue);

        return mappers?.from ? mappers.from(data) : data;
    });

    useEffect(() => {
        const data = mappers?.to ? mappers.to(value) : value;

        localStorage.setItem(key, JSON.stringify(data));
    }, [key, mappers, value]);

    return [value, setValue];
};