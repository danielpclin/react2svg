import React, {useState} from 'react';
import "./App.scss";
import CompositeViewlet from "./CompositeViewlet";
import ReactDemo from "./ReactDemo";
import {BiSearch} from "react-icons/bi";
import {HiFolder} from "react-icons/hi";
import {FaWrench} from "react-icons/fa";
import DummyComponent from "./DummyComponent";
import CompositeBar from "./CompositeBar";
import JointJsComponent from "./JointJsComponent";
import {IActionItem} from "./ActionItem";


function App() {

    const [actionListLeft, setActionListLeft] = useState<Array<IActionItem>>([
        {
            action: "1",
            icon: <HiFolder />,
            viewletComponent: <DummyComponent paragraph={1}/>,
        },
        {
            action: "2",
            icon: <FaWrench />,
            viewletComponent: <DummyComponent paragraph={2}/>
        },
        {
            action: "3",
            icon: <BiSearch />,
            viewletComponent: <DummyComponent paragraph={1}/>
        },
    ]);
    
    const [activeActionLeft, setActiveActionLeft] = useState<string | null>('1');
    
    const actionOnClick = (action: string) => {
        if (activeActionLeft === action){
            setActiveActionLeft(null);
        }else{
            setActiveActionLeft(action);
        }
    }

    return (
        <div className="app">
            <CompositeBar actionLabels={actionListLeft} activeActionLabel={activeActionLeft} actionOnclick={actionOnClick}/>
            {activeActionLeft && (
                <CompositeViewlet>
                    {actionListLeft.find(actionLabel=>(actionLabel.action === activeActionLeft))!.viewletComponent}
                </CompositeViewlet>
            )}
            {(activeActionLeft === "1" || activeActionLeft === "2") ? (
                <JointJsComponent/>
            ):(
                <ReactDemo/>
            )}
        </div>
    );
}

App.propTypes = {

};

export default App;
