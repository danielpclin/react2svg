import React from 'react';
import PropTypes, {number} from 'prop-types';
import "./DummyComponent.scss"

function DummyComponent(props: IDummyComponentProps) {
    return (
        <div className="dummy">
            {Array.from({ length: props.paragraph }, ((_, i) => i + 1)).map(i=>(
                <div key={i}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt mollis risus, sed feugiat felis vestibulum vitae. Etiam congue, sem eget lacinia bibendum, eros ipsum placerat neque, sed auctor turpis purus sed dolor. Nunc pellentesque semper sapien, et imperdiet eros ultrices nec. Sed ultricies nisi id elit elementum ultricies. Donec convallis faucibus urna, sed dignissim leo tincidunt eu. Vestibulum enim erat, molestie non ligula vel, tincidunt mattis ante. Sed quam turpis, pellentesque sit amet ligula nec, pretium varius tortor. Sed fermentum orci ac purus commodo tristique a ut neque. Maecenas vitae neque diam. Aenean sit amet cursus dui. In aliquam vestibulum sodales. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus diam velit, pharetra eget turpis vel, vestibulum tincidunt sem.
                </div>
            ))}
        </div>
    );
}

interface IDummyComponentProps {
    paragraph: number;
}

DummyComponent.propTypes = {

};

export default DummyComponent;