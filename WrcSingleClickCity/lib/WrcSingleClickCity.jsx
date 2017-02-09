/**
 * @file   城市选择组件
 * @author sunwen05@baidu.com
 */

import React, { Component } from 'react';
import style from './WrcSingleClickCity.useable.less';

export default class WrcSingleClickCity extends Component {
    constructor (props) {
        super(props);
        this.state = {
            list: [],
            isOneHot: false, // 是否只有一个热门城市
            hasHot: false // 是否有热门城市
        }
    }
    componentWillMount () {
        style.use();
        let hotlist = this.props.list,
            self = this,
            isOneHot = false,
            hasHot = true;
        // 当热门城市只有一个时
        if (hotlist.length === 1) {
            isOneHot = true;
        } else if (hotlist.length === 0) {
            hasHot = false;
        }
        // 将数据渲染
        self.setState({
            isOneHot: isOneHot,
            hasHot: hasHot,
            list: self.getChars(hotlist, 3)
        });
    }
    componentWillUnmount() {
        style.unuse();
    }

    /*
     * 将数组数据分割成N个一行
     * @param {arr} allChars 所有的需要处理首字母的对象集合
     * @return {arr} 处理好的二维数组
     */
    getChars (allChars, numInLine) {
        let chars = [],
            charLine = [];
        // 对于一行不满numInLine个数的list进行填补
        if (allChars.length % numInLine !== 0) {
            allChars.length = Math.ceil(allChars.length / numInLine) * numInLine;
        }
        // 进行N个一行排序
        for (let i = 0; i < allChars.length; i++) {
            // 当前数组除以numInLine，且当前字母序列不为0 （如numInLine为5，则5、10、15、20…………）
            if (i % numInLine === 0 && i !== 0) {
                // 将存放好一行内容的数组插入chars
                chars.push(charLine);
                // 将存放每一行首字母的数组清空
                charLine = [];
                // 将当前序列的首字母放入首字母行数组
                charLine.push(allChars[i]);
            }
            else {
                // 将当前序列的首字母放入首字母行数组
                charLine.push(allChars[i]);
            }
        }
        // 最后不满numInLine个数的最后的首字母行数组插入chars
        chars.push(charLine);
        return chars;
    }

    /*
     * 城市点击事件
     * @param {num} id 当前城市的id
     * @param {string} name 当前城市的名称
     * @return {void} void返回值
     */
    handleClick (id, name) {
        this.props.select(id, name);
    }

    render () {
        var hotContent = null;
        if (this.state.hasHot) {
            hotContent = (
                <div className="du-panel">
                    <div className="du-panel-hd">热门城市</div>
                    <div className="du-panel-bd">
                    {
                        this.state.list.map((hotCityLine, i) => {
                            return (
                                <ul key={i} className="city-hotcity-ul">
                                {
                                    hotCityLine.map((item, j) => {
                                        if (item === undefined) return (
                                            <li key={j} className={this.state.isOneHot ? 'city-hotcity-none':'city-hotcity'}></li>
                                        )
                                        return (
                                            <li key={j} className="city-hotcity" onClick={this.handleClick.bind(this, item[this.props.structure.id], item[this.props.structure.name])}>{item[this.props.structure.name]}</li>
                                        )
                                    })
                                }
                                </ul>
                                
                            )
                        })
                    }
                    </div>
                </div>
            )
        }
        return (
            <div>
                {hotContent}
            </div>
        )
    }
}