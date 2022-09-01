import React from 'react';
import PropTypes from 'prop-types';
import "./CompositeViewlet.scss"

function CompositeViewlet(props: any) {
    return (
        <div className="composite-viewlet">
            {props.children}
        </div>
    );
}

CompositeViewlet.propTypes = {

};

export default CompositeViewlet;