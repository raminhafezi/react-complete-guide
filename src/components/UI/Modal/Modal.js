import React from 'react';
import cssClasses from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop'

class Modal extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children; //this is to make sure we donot update 
        //ordersummary unless ordersummary page is shown. So this ShouldComponentUpdate here improves performanfce
    }
    render() {
        return (
            <Aux>
                {/* {console.log("[ Modal ] props.show: ", props.show)} */}
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className={cssClasses.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}


export default Modal;