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
    const [graph, setGraph] = useState<joint.dia.Graph|null>();
    const [paper, setPaper] = useState<joint.dia.Paper|null>();
    const highlighted = useRef<joint.dia.Cell.ID|null>(null);
    const state = useSyncedStore(store);
    const stateUnobserve = useRef<Function|null>(null);

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
            setPaper(paper);
            setGraph(graph);
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
                // TODO don't update if no change to cell
                state.cells.splice(state.cells.findIndex(cell => cell.id === cellView.model.id), 1, graph.getCell(cellView.model.id).toJSON())
            })
            // paper.on('element:pointerdown', (elementView)=>{
            //     setTimeout(function(){
            //         state.cells.forEach(cell =>{
            //             if (cell.id === elementView.model.id){
            //                 // graph.getCell(elementView.model.id).attr('body/fill', 'green')
            //                 // @ts-ignore
            //                 cell.attrs.body.fill = 'green';
            //                 // cell.position.x = 1000;
            //             }
            //         })
            //     },1000);
            //
            // })
            paper.on('element:pointerclick', function (elementView) {
                // console.log(cellView)
                // if (cellView.model.attributes.type !== "standard.Rectangle")
                //     return
                if (highlighted.current){
                    if (highlighted.current !== elementView.model.id){
                        paper.findViewByModel(highlighted.current).unhighlight();
                        elementView.highlight();
                        highlighted.current = elementView.model.id;
                    }
                }else{
                    elementView.highlight();
                    highlighted.current = elementView.model.id;
                }
            });
            paper.on('blank:pointerclick', ()=>{
                if (highlighted.current){
                    paper.findViewByModel(highlighted.current).unhighlight();
                    highlighted.current = null;
                }
            })
            // TODO calculate diff instead of creating new graph from json
            stateUnobserve.current = observeDeep(state.cells, () => {
                console.log("changed")
                if(!isEqual(graph.toJSON().cells, state.cells)){
                    graph.fromJSON({cells: JSON.parse(JSON.stringify(state.cells))})
                    if (highlighted.current)
                        paper.findViewByModel(highlighted.current).highlight();
                }
            });
        }else{
            setPaper(null);
            setGraph(null);
            if (stateUnobserve.current)
                stateUnobserve.current();
        }
    }, [namespace, state.cells])


    return (
        <div className="joint-js-panel">
            <div className="joint-js" ref={jointCallback}/>
            <div className="info">
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