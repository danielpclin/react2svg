import React from 'react';
import {useDrag} from "react-dnd";
import {DraggableTypes} from "../constants";
import "./ActionItem.scss"

function ActionItem(props: ActionItemProps) {

    const [collectedProps, drag] = useDrag(() => ({
        type: DraggableTypes.ACTION,
    }))

    const actionOnClick = () => {
        props.onclick();
    }


    return (
        <li className={`action-item ${props.active?"active":""}`} ref={drag}>
            <a className={`action-label`} onClick={actionOnClick}>
                {props.actionItem.icon}
            </a>
            <div className={`active-indicator`}/>
        </li>
    );
}

interface ActionItemProps {
    actionItem: IActionItem;
    onclick: Function;
    active: boolean;
}

export interface IActionItem {
    action: string,
    icon: JSX.Element,
    viewletComponent: JSX.Element,
}

export default ActionItem;
