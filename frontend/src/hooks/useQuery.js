import { useLocation } from "react-router-dom";
import React from "react";

export default function() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}