import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import * as joint from 'jointjs';
import "jointjs/css/layout.css"
import "./JointJsComponent.scss"
import { useSyncedStore } from "@syncedstore/react";
import { store } from "../yjs-store"
import {observeDeep} from "@syncedstore/core";
import {isEqual} from 'lodash-es';


function JointJsComponent(props: any) {
    const namespace = joint.shapes;
    const [jointRef, setJointRef] = useState<HTMLDivElement|null>(null);
    const [graph, setGraph] = useState<joint.dia.Graph|null>();
    const [paper, setPaper] = useState<joint.dia.Paper|null>();
    const [graphJson, setGraphJson] = useState({cells: []});
    const highlighted = useRef<joint.dia.Cell.ID|null>(null);
    const state = useSyncedStore(store);

    const jointCallback = useCallback((ref: HTMLDivElement) => {
        if (ref && state.cells){
            let graph = new joint.dia.Graph({}, { cellNamespace: namespace })
            let paper = new joint.dia.Paper({
                el: ref,
                model: graph,
                gridSize: 10,
                drawGrid: true,
                width: ref.offsetWidth,
                height: ref.offsetHeight,
                cellViewNamespace: namespace,
            })
            setJointRef(ref);
            setPaper(paper);
            setGraph(graph);
            // setGraphJson(graph.toJSON())
            graph.fromJSON({cells: JSON.parse(JSON.stringify(state.cells))})
            graph.on('add', (cell)=>{
                // setGraphJson(graph.toJSON());
                // console.log(graph.toJSON());
            })
            graph.on('remove', (cell)=>{
                // setGraphJson(graph.toJSON());
                // console.log(graph.toJSON());
            })
            paper.on('cell:pointerup', (cellView) => {
                // setGraphJson(graph.toJSON());
                // console.log(graph.toJSON());
                state.cells.splice(state.cells.findIndex(cell => cell.id === cellView.model.id), 1, graph.getCell(cellView.model.id).toJSON())
            })
            paper.on('element:pointerclick', function (cellView) {
                // console.log(cellView)
                // if (cellView.model.attributes.type !== "standard.Rectangle")
                //     return
                if (highlighted.current){
                    if (highlighted.current !== cellView.model.id){
                        paper.findViewByModel(highlighted.current).unhighlight();
                        cellView.highlight();
                        highlighted.current = cellView.model.id;
                    }
                }else{
                    cellView.highlight();
                    highlighted.current = cellView.model.id;
                }
            });
            paper.on('blank:pointerclick', ()=>{
                if (highlighted.current){
                    paper.findViewByModel(highlighted.current).unhighlight();
                    highlighted.current = null;
                }
            })
            // TODO calculate diff instead of creating new graph from json
            observeDeep(state.cells, () => {
                if(!isEqual(graph.toJSON().cells, state.cells)){
                    graph.fromJSON({cells: JSON.parse(JSON.stringify(state.cells))})
                    if (highlighted.current)
                        paper.findViewByModel(highlighted.current).highlight();
                }
            });
        }else{
            setJointRef(null);
            setPaper(null);
            setGraph(null);
            // setGraphJson({cells: []});
        }
    }, [namespace, state.cells])


    return (
        <div className="joint-js-panel">
            <div className="joint-js" ref={jointCallback}/>
            <div className="info">
                {/*<pre>*/}
                {/*    {JSON.stringify(graphJson.cells, null, 2)}*/}
                {/*</pre>*/}
                <pre>
                    Count: {state.cells.length}
                </pre>
                <pre>
                    {JSON.stringify(state.cells, null, 2)}
                </pre>
            </div>
            <button className="add-block" onClick={()=>{
                if (graph){
                    let rect = new joint.shapes.standard.Rectangle();
                    rect.position(100, 30);
                    rect.resize(100, 40);
                    rect.attr({
                        body: {
                            fill: '#61dafb'
                        },
                        label: {
                            text: 'Hello',
                            fill: 'black'
                        }
                    });

                    let rect2 = rect.clone();
                    rect2.translate(300, 0);
                    rect2.attr('label/text', 'World!');

                    let link = new joint.shapes.standard.Link();
                    link.source(rect);
                    link.target(rect2);
                    state.cells.push(rect.toJSON(), rect2.toJSON(), link.toJSON())
                }
            }}>
                Add block
            </button>
            <button className="add-block2" onClick={()=>{
                if (graph){
                    let rect = new joint.shapes.standard.Rectangle();
                    rect.position(100, 100);
                    rect.resize(100, 40);
                    rect.attr({
                        body: {
                            fill: 'coral'
                        },
                        label: {
                            text: 'Hello',
                            fill: 'white'
                        }
                    });

                    let link = new joint.shapes.standard.Link();
                    link.source(rect);
                    link.target({x: 500, y: 500});
                    state.cells.push(rect.toJSON(), link.toJSON())
                }
            }}>
                Add block
            </button>
        </div>
    );
}

JointJsComponent.propTypes = {

};

export default JointJsComponent;