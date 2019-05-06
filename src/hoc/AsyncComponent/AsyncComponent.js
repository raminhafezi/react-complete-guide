import React from 'react';
import { Z_NEED_DICT } from 'zlib';

const asyncComponenet = (importComponent) => {
    return class extends React.Component {
        state = { Component: null }

        componentDidMount() {
            importComponent()
                .then(cmp => {
                    this.setState({ Component: cmp.default });
                });
        }

        render() {
            const C = this.state.Component;

            return C ? <C {...this.props} /> : null;
        }
    }
}

export default asyncComponenet;



// usage:
// when you want to load chunk of the code dynamically and at the time of_need:
// make this in your component:

// import AsyncComponent from '../AsyncComponent/AsyncComponent'
// const asc = AsyncComponent( () => {
//     return import('path_to_the_component_that_need_to_be_rendered_in_lazy_mode') ;});
// <Route path="/new_post" component={asc} />


// for the complete reference wathc video # 177 in React-compelete-guide