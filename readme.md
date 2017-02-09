##组件配置
```bash
<WrcSingleClickCity structure={structure} list={static_cities.hotCityList} select={this.selectCity} />
<WrcDoubleClickCity structure={structure} list={static_cities.cityMap}  select={this.selectCity} />

// 需要处理的数据的参数名称
const structure = {
    hot: 'hotCityList',
    list: 'cityMap',
    id: 'cityCode',
    name: 'cityName'
}

/*
 * 城市点击事件
 * @param {num} id 当前城市的id
 * @param {string} name 当前城市的名称
 * @return {void} void返回值
 */
selectCity(id, name) {
    console.log(id)
    console.log(name)
}
```

## 开发注意事项
* structure为需要处理的数据的参数名称
* list为需要处理的数据数据
* select为点击事件