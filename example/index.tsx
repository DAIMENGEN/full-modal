import "react-app-polyfill/ie11";
import * as React from "react";
import {useState} from "react";
import * as ReactDOM from "react-dom/client";
import {Button} from "antd";
import {FullModal} from "../dist";

const App = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Button type={`primary`} onClick={() => setOpen(true)}>open</Button>
            <div>
                <FullModal title="Basic Modal" open={open} closable={true} onOk={() => setOpen(false)} onCancel={() => setOpen(false)}>
                    <div>哈哈哈哈哈</div>
                </FullModal>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
