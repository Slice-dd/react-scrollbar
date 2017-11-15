/*
 * @Author: zhao hong 
 * @Date: 2017-11-03 09:30:55 
 * @Last Modified by: zhao hong
 * @Last Modified time: 2017-11-15 15:43:04
 */


import React, { Component } from 'react';
import  '../style/bar.less';

/**
 * 60 --> scrollbar height, see ScrollBar.less     
 * 
 * 
 * @class Bar
 * @extends {Component}
 */
export default  class Bar extends Component {

    state = {
        isAniamation: true
    }

    onMouseDown = (e) => {

        const clientY = e.clientY;

        const offsetY = e.target.offsetTop;

        console.log(offsetY);

        let dritf = clientY - offsetY;

        this.dritf = dritf;

        document.addEventListener('mousemove', this.mousemove, false);
        document.addEventListener('mouseup', this.mouseup, false);

        this.setState({ isAniamation: false });
    }

    mousemove = (e) => {

        let scrollHeight = e.clientY - this.dritf;

        const { height } = this.props;
        
        scrollHeight = scrollHeight < 0 ? 0 : scrollHeight > height - 60 ? height - 60 : scrollHeight;

        this.bar.style.top = scrollHeight + 'px';

        let needScrolls = scrollHeight / (this.props.height - 60);

        this.props.changeTop(needScrolls);
    }
    
    mouseup = () => {

        document.removeEventListener('mousemove', this.mousemove);
        document.addEventListener('mouseup', this.mouseup);

        this.setState({ isAniamation: true });

        this.props.addAnimation();
    }

    render() {
        
        const { height, position } = this.props;

        const { isAniamation } = this.state;

        return (
            <div style={{ height: height }} className="barparent">
                <div className={isAniamation ? "bar" : "bar"+ ' ' +"noAnimation"} style={{ top: position }} ref={e => this.bar = e} onMouseDown={this.onMouseDown}></div>
            </div>
        );
    }
}


