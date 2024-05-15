import * as React from "react";
import {useRef, useState} from "react";
import {Modal as AntdModal} from "antd";
import {ModalProps} from "../../core/structs/modal";
import Draggable, {DraggableData, DraggableEvent} from "react-draggable";
import {ResizableBox, ResizeCallbackData} from "react-resizable";
import "react-resizable/css/styles.css";

export const Modal: React.FC<ModalProps> = (props) => {
    const draggableRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(props.width || window.innerWidth / 3);
    const [height, setHeight] = useState(props.width || (window.innerHeight * 2) / 5);
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
    return (
        <AntdModal {...props}
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
                <div className={`resizable-box`}>
                    {props.children}
                </div>
            </ResizableBox>
        </AntdModal>
    )
}