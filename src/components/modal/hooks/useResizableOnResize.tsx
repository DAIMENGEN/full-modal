import React, {useCallback, useState} from "react";
import {ResizeCallbackData} from "react-resizable";

export const useResizableOnResize = (defaultWidth: number) => {
    const [resizableWidth, setResizableWidth] = useState<number>(defaultWidth);
    const [resizableHeight, setResizableHeight] = useState<number>(0);
    const onResize = useCallback((_: React.SyntheticEvent, {size}: ResizeCallbackData) => {
        setResizableWidth(size.width);
        setResizableHeight(size.height);
    }, []);
    return {resizableWidth, resizableHeight, setResizableWidth, setResizableHeight, onResize}
}