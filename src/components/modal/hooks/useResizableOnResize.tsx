import React, {useCallback, useState} from "react";
import {ResizeCallbackData} from "react-resizable";

export const useResizableOnResize = (defaultWidth: number, defaultHeight: number) => {
    const [resizableWidth, setResizableWidth] = useState<number>(defaultWidth);
    const [resizableHeight, setResizableHeight] = useState<number>(defaultHeight);
    const onResize = useCallback((_: React.SyntheticEvent, {size}: ResizeCallbackData) => {
        setResizableWidth(size.width);
        setResizableHeight(size.height);
    }, []);
    return {resizableWidth, resizableHeight, setResizableWidth, setResizableHeight, onResize}
}