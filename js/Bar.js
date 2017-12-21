/*
 * @Author: zhao hong 
 * @Date: 2017-11-03 09:30:55 
 * @Last Modified by: zhao hong
 * @Last Modified time: 2017-12-21 15:56:18
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

        const { height, scrollBarHeight } = this.props;
        
        scrollHeight = scrollHeight < 0 ? 0 : scrollHeight > height - scrollBarHeight ? height - scrollBarHeight : scrollHeight;

        this.bar.style.top = scrollHeight + 'px';

        let needScrolls = scrollHeight / (height - scrollBarHeight);

        this.props.changeTop(needScrolls);
    }
    
    mouseup = () => {

        document.removeEventListener('mousemove', this.mousemove);
        document.addEventListener('mouseup', this.mouseup);

        this.setState({ isAniamation: true });

        this.props.addAnimation();
    }

    render() {
        
        const { height, position, scrollBarHeight } = this.props;

        const { isAniamation } = this.state;

        return (
            <div style={{ height: height }} className="barparent">
                <div className={isAniamation ? "bar" : "bar"+ ' ' +"noAnimation"} style={{ top: position, height: scrollBarHeight }} ref={e => this.bar = e} onMouseDown={this.onMouseDown}></div>
            </div>
        );
    }
}


