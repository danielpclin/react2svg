import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import "./CompositeBar.scss"
import ActionItem, {IActionItem} from "./ActionItem";
import {useDrop} from "react-dnd";
import {DraggableTypes} from "../constants";

function CompositeBar(props: CompositeBarProps) {

    const [collectedProps, drop] = useDrop({
        accept: DraggableTypes.ACTION,
    })

    const actionActive = useCallback((action: string) => {
        return action === props.activeActionLabel;
    }, [props.activeActionLabel])

    return (
        <div className="composite-bar">
            <ul className="actions-container" ref={drop}>
                {props.actionLabels.map(actionItem =>
                    <ActionItem key={actionItem.action} actionItem={actionItem} active={actionActive(actionItem.action)}
                                onclick={()=>props.actionOnclick(actionItem.action)}/>
                )}
            </ul>
        </div>
    );
}

interface CompositeBarProps {
    actionLabels: Array<IActionItem>;
    activeActionLabel: string|null;
    actionOnclick: Function;
}

CompositeBar.propTypes = {

};

export default CompositeBar;