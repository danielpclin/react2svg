import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import * as joint from 'jointjs';
import "jointjs/css/layout.css"
import "./JointJsComponent.scss"

function JointJsComponent(props: any) {
    const jointRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        let namespace = joint.shapes;

        let graph = new joint.dia.Graph({}, { cellNamespace: namespace });

        let paper = new joint.dia.Paper({
            el: jointRef.current!,
            model: graph,
            gridSize: 10,
            drawGrid: true,
            width: jointRef.current!.offsetWidth,
            height: jointRef.current!.offsetHeight,
            cellViewNamespace: namespace,
        });
        // let paper = new joint.dia.Paper({
        //     el: jointRef.current!,
        //     model: graph,
        //     gridSize: 10,
        //     drawGrid: true,
        //     width: 1000,
        //     height: 1000,
        //     cellViewNamespace: namespace,
        // });

        let rect = new joint.shapes.standard.Rectangle();
        rect.position(100, 30);
        rect.resize(100, 40);
        rect.attr({
            body: {
                fill: 'blue'
            },
            label: {
                text: 'Hello',
                fill: 'white'
            }
        });
        rect.addTo(graph);

        let rect2 = rect.clone();
        rect2.translate(300, 0);
        rect2.attr('label/text', 'World!');
        rect2.addTo(graph);

        let link = new joint.shapes.standard.Link();
        link.source(rect);
        link.target(rect2);
        link.addTo(graph);


    }, [])


    return (
        <div className="joint-js" ref={jointRef}>

        </div>
    );
}

JointJsComponent.propTypes = {

};

export default JointJsComponent;