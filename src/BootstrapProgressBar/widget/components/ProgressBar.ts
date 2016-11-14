import { DOM } from "react";

export interface OnClickProps {
    microflow: string;
    guid: string;
    applyto: string;
    widgetId: string;
}

export interface ProgressBarProps {
    barType?: string;
    label?: string;
    bootstrapStyle?: string;
    microflowProps?: OnClickProps;
    colorSwitch?: number;
    progressAttributeValue?: number;
}

export function ProgressBar(props: ProgressBarProps) {
    let defaultValue = 100;
    let progressValue = props.progressAttributeValue > defaultValue ? defaultValue : props.progressAttributeValue;
    let progressClass: string;

    if (progressValue < props.colorSwitch) {
        progressClass = " progressbar-text-contract";
    } else {
        progressClass = "";
    }

    const divStyle = {
        width: progressValue + "%"
    };

    let barStyles = "progress-bar";
    let barstyle: string = ((props.bootstrapStyle)) ?
        " " + barStyles + "-" + (props.bootstrapStyle).toString() : "";
    let type: string;

    if (props.barType === "striped") {
        type = " " + barStyles + "-striped";
    } else if (props.barType === "animated") {
        type = " " + barStyles + "-striped" + " active";
    } else {
        type = "";
    }

    barStyles = barStyles + barstyle + " " + barStyles + type;

    return (
        DOM.div({ className: "progress" + progressClass },
            DOM.div({
                className: barStyles,
                onClick: () => {
                    if (props.microflowProps.microflow !== "") {
                        mx.data.action({
                            error: (error) => {
                                mx.ui.error(`Error while executing MicroFlow: 
                        ${props.microflowProps.microflow}: ${error.message}`);
                            },
                            params: {
                                actionname: props.microflowProps.microflow,
                                applyto: "selection",
                                guids: [ props.microflowProps.guid ]
                            }
                        });
                    }
                },
                style: divStyle
            },
                progressValue + "%" + props.label
            )
        )
    );
}
