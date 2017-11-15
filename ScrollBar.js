/*
 * @Author: zhao hong 
 * @Date: 2017-11-03 09:31:10 
 * @Last Modified by: zhao hong
 * @Last Modified time: 2017-11-03 10:39:02
 */


import React, { Component } from 'react';
import Bar from './Bar'
import './ScrollBar.less';

/**
 * 
 * 60 --> scrollbar height, see ScrollBar.less
 * 
 * @class Scrollbar
 * @extends {Component}
 */
class Scrollbar extends Component {
    
        state = {
            scrollbarPosition: 0,
            marginTops: 0,
            isAnimation: true
        }
    
        onScroll = (e) => {
    
            const { height } = this.props;
    
            let marginTops = this.element.style.marginTop;
    
            const maxMarginTop = -this.element.clientHeight + height;
    
            let deltaY =  e.deltaY;
    
            deltaY = deltaY < 100 && deltaY > 0 ? 100 : deltaY < 0 && deltaY > -100 ? -100 : deltaY ;
    
            marginTops = (marginTops === '' ? 0 : parseInt(marginTops, 10)) - deltaY;
    
            marginTops = marginTops < maxMarginTop ? maxMarginTop : marginTops > 0 ? 0 : marginTops;
    
            this.setState({
                scrollbarPosition: -marginTops / (this.element.clientHeight - height),
                marginTops: marginTops
            });
            console.log(e.type);
    
        }
    
        changeTop = (n) => {
    
            const scrollHeight = this.element.clientHeight - this.props.height;
    
            this.setState({
                marginTops: -scrollHeight * n,
                isAnimation: false
            });
        }
    
    
        addAnimation = () => {
            this.setState({
                isAnimation: true
            });
        }
    
        render() {
    
            const { height } = this.props;
    
            let { scrollbarPosition, marginTops, isAnimation } = this.state;
    
            let position = (height - 60) * scrollbarPosition;
    
            return (
                <div className="scroll" style={{ height: height }}>
                    <div
                        onWheel={this.onScroll}
                        style={{ marginTop: marginTops }}
                        ref={e => this.element = e}
                        className={isAnimation ?"scrollbar" : "scrollbar" + ' ' + "noAnimation"}>
                        {this.props.children}
                    </div>
                    <Bar height={height} position={position} changeTop={this.changeTop} addAnimation={this.addAnimation} />
                </div>
    
            );
        }
    }
    
    export default Scrollbar;