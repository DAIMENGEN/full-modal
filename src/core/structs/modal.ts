import {ModalProps as AntdModalProps} from "antd";

export type ModalProps = AntdModalProps & { width: number | undefined, height: number | undefined };