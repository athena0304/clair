---
title: Radio 单选框
layout: component
route: /component/radio
---

# Radio 单选框

单选框用来在较少的选项中选定一个。

## 基本用法

使用 `options` 属性给 `c-radio-group` 传递所有选项。 当用户改变了选中的选项时，会触发 `change` 事件。

```html
<c-radio-group
  :options="[
    { value: 'chrome', label: 'Chrome'},
    { value: 'edge', label: 'Edge'},
    { value: 'firefox', label: 'Firefox' },
    { value: 'internet-explorer', label: 'IE', disabled: true },
    { value: 'opera', label: 'Opera'}
  ]"
  @change="onChange"
  v-model="favorite"
/>
<p>你选择的浏览器是：<c-icon type="fa" :name="favorite" /></p>

<script>
export default {
  data () {
    return { favorite: '' }
  },
  methods: {
    onChange (value) {
      console.log(`Value is changed to ${value}`)
    }
  }
}
</script>
```

## 按钮样式

```html
<c-radio-group
  :options="options"
  v-model="favorite"
  button
/>
<p>你选择的浏览器是：<c-icon type="fa" :name="favorite" /></p>

<script>
export default {
  data () {
    return {
      options: [
        { value: 'chrome', label: 'Chrome'},
        { value: 'edge', label: 'Edge'},
        { value: 'firefox', label: 'Firefox' },
        { value: 'internet-explorer', label: 'IE', disabled: true },
        { value: 'opera', label: 'Opera'}
      ],
      favorite: ''
    }
  }
}
</script>
```

## API

## c-radio-group 属性

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|-----|
| options | Array | 无 | 单选框组提供的选项列表 |
| button | Boolean | false | 是否以按钮形式展示 |

