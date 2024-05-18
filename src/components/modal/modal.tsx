import * as React from "react";
import {useState} from "react";
import {Modal as AntdModal} from "antd";
import {ModalProps} from "../../core/structs/modal";
import Draggable from "react-draggable";
import {useDraggableOnStart} from "./hooks/useDraggableOnStart";
import {Resizable} from "react-resizable";
import {useResizableOnResize} from "./hooks/useResizableOnResize";
import {CommonUtil} from "../../utils/common-util";
import "./modal.scss";

export const Modal: React.FC<ModalProps> = (props) => {
    const defaultWidth = CommonUtil.parse(props.width || window.innerWidth / 2);
    const [disabled, setDisabled] = useState(true);
    const {draggableRef, bounds, onStart} = useDraggableOnStart();
    const {
        resizableWidth,
        resizableHeight,
        setResizableWidth,
        setResizableHeight,
        onResize
    } = useResizableOnResize(defaultWidth);
    return (
        <AntdModal {...props}
                   className={`full-modal ${props.className}`}
                   width={resizableWidth}
                   styles={{
                       body: {
                           height: resizableHeight === 0 ? "auto" : resizableHeight,
                       }
                   }}
                   afterClose={() => {
                       setResizableWidth(defaultWidth);
                       setResizableHeight(0);
                       const close = props.afterClose;
                       close && close();
                   }}
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
                   afterOpenChange={(open) => {
                       if (open) {
                           const antModalBody = document.querySelector(".ant-modal-body") as HTMLElement;
                           const content = antModalBody.firstElementChild as HTMLElement;
                           const height = content.getBoundingClientRect().height;
                           setResizableHeight(height);
                       }
                       const change = props.afterOpenChange;
                       change && change(open);
                   }}
                   modalRender={(modal) => (
                       <Draggable disabled={disabled}
                                  bounds={bounds}
                                  nodeRef={draggableRef}
                                  onStart={(event, uiData) => onStart(event, uiData)}>
                           <div ref={draggableRef}>
                               <Resizable width={resizableWidth} height={resizableHeight} onResize={onResize}>
                                   {modal}
                               </Resizable>
                           </div>
                       </Draggable>
                   )}>
            {props.children}
        </AntdModal>
    )
}