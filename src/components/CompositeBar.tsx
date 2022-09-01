import React from 'react';
import PropTypes from 'prop-types';
import "./CompositeBar.scss"
import {useDrag, useDrop} from 'react-dnd'
import ActionItem, {IActionItem} from "./ActionItem";
import {DraggableTypes} from "../constants";

function CompositeBar(props: CompositeBarProps) {

    const [, drop] = useDrop(
        () => ({
            accept: DraggableTypes.ACTION,
            drop: () => {console.log()}
        }),
        [x, y]
    )

    const actionActive = (action: string) => {
        return action === props.activeActionLabel;
    }

    return (
        <div className="composite-bar">
            <ul className="actions-container">
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