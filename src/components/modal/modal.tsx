import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {Modal as AntdModal} from "antd";
import {ModalProps} from "../../core/structs/modal";
import Draggable, {DraggableData, DraggableEvent} from "react-draggable";
import {ResizableBox, ResizeCallbackData} from "react-resizable";
import "react-resizable/css/styles.css";
import "./modal.scss";

export const Modal: React.FC<ModalProps> = (props) => {
    const parseWidth = (input: number | string) => {
        if (typeof input === "number") {
            return input;
        } else {
            const numberValue = input.replace(/[^\d.-]/g, '');
            return parseInt(numberValue);
        }
    }
    const draggableRef = useRef<HTMLDivElement>(null);
    const resizableBoxRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(parseWidth(props.width || window.innerWidth / 3));
    const [height, setHeight] = useState(0);
    const [disabled, setDisabled] = useState(true);
    const [bounds, setBounds] = useState({left: 0, top: 0, bottom: 0, right: 0});
    const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
        const {clientWidth, clientHeight} = window.document.documentElement;
        const targetRect = draggableRef.current?.getBoundingClientRect();
        if (!targetRect) {
            return;
        }
        setBounds({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };
    const onResize = (_: React.SyntheticEvent, {size}: ResizeCallbackData) => {
        setHeight(size.height);
        setWidth(size.width);
    };
    useEffect(() => {
        const resizableBox = resizableBoxRef.current;
        if (resizableBox) {
            const height = resizableBox.offsetHeight;
            setHeight(height);
        }
    }, [props]);
    return (
        <AntdModal {...props}
                   className={"full-modal"}
                   title={
                       <div style={{width: "100%", cursor: "move"}}
                            onBlur={() => {
                            }}
                            onFocus={() => {
                            }}
                            onMouseOver={() => disabled && setDisabled(false)}
                            onMouseOut={() => setDisabled(true)}>
                           {props.title}
                       </div>}
                   modalRender={(modal) => (
                       <Draggable disabled={disabled}
                                  bounds={bounds}
                                  nodeRef={draggableRef}
                                  onStart={(event, uiData) => onStart(event, uiData)}>
                           <div ref={draggableRef}>{modal}</div>
                       </Draggable>
                   )}
                   width={width + 30}>
            <ResizableBox width={width}
                          height={height}
                          onResize={onResize}>
                <div className={`resizable-box`} ref={resizableBoxRef}>
                    {props.children}
                </div>
            </ResizableBox>
        </AntdModal>
    )
}