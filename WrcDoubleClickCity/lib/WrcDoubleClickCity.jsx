/**
 * @file   城市选择组件
 * @author sunwen05@baidu.com
 */

import React, { Component } from 'react';
import style from './WrcDoubleClickCity.useable.less';
import $ from 'webpack-zepto';

export default class WrcDoubleClickCity extends Component {
    constructor (props) {
        super(props);
        this.state = {
            lists: this.props.list,
            charAtList: [],
            chars: [],
            isOneList: false, // 是否只有一条首字母list
        }
    }
    componentWillMount () {
        style.use();
        let self = this,
            isOneList = false,
            listOfOneChar = [];
        // 获取所有学校的首字母
        var allChars = self.getAllChars(self.state.lists);
        // 当首字母只有一个时
        if (allChars.length === 1) {
            isOneList = true;
            listOfOneChar = self.state.lists[allChars[0]];
        }
        // 将数据渲染
        self.setState({
            isOneList: isOneList,
            charAtList: listOfOneChar,
            chars: self.getChars(allChars, 5)
        });
    }
    componentDidMount() {
        // 数据获取（list）
        this.getCharAtList();
    }
    componentWillUnmount() {
        style.unuse();
    }

    /*
     * 获取所有首字母数组
     * @param {object} allLetter 所有的需要处理首字母的对象集合
     * @return {void} void返回值
     */
    getAllChars (allLetter) {
        let allchars = []; // 每一行首字母
        for (let item in allLetter) {
            allchars.push(item);
        }
        return allchars;
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
     * 通过字母获取
     * @param {number} letter 点击的首字母
     * @return {void} void返回值
     */
    getCharAtList () {
        let self = this;
        $('.city-citychar').on('click', function() {
            if ($(this).text() === '') return;
            $('.city-citychar').removeClass('city-selected');
            $(this).addClass('city-selected');
            $('#city-selected').insertAfter($(this).parent());
            self.setState({
                charAtList: self.state.lists[$(this).text()]
            });
        })
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
        return (
            <div>
                <div className="du-panel">
                    <div className="du-panel-hd">全部城市</div>
                    <div className="du-panel-bd citychar-panel">
                    {
                        this.state.chars.map((charLine, i) => {
                            return (
                                <ul className="city-citychar-ul clearfix" key={i}>
                                {
                                    charLine.map((char, j) => {
                                        if (char === undefined) return (
                                            <li key={j} className={this.state.isOneList ? 'city-citychar-none':'city-citychar'}></li> 
                                        )
                                        return (
                                            <li key={j} className={this.state.isOneList ? 'city-citychar city-selected':'city-citychar'}>
                                                {char}
                                            </li>    
                                        )
                                    })
                                }
                                </ul>  
                            )
                        })
                    }
                        <ul className="du-list" id="city-selected">
                        {
                            this.state.charAtList.map((list, i) => {
                                return (
                                    <li key={i} className="du-item du-item-link">
                                        <a onClick={this.handleClick.bind(this, list[this.props.structure.id], list[this.props.structure.name])}>{list[this.props.structure.name]}</a>
                                    </li>
                                )
                            })
                        }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}