---
title: ${componentName}
route: /component/${route}
layout: component
---

# ${componentName}

Description.....

## Demo

**注意在写 demo 中的脚本时，对 window 的操作以及特殊全局变量的使用要特别小心。必要时请参考 icon 组件的文档。**

下面是可以查看代码的 demo：

```html
<${tagName}></${tagName}>
```

下面是另一种没有代码的 demo，在 `template` 标签上添加 `demo-only` 属性即可，这将不会渲染代码部分：

```html
<template demo-only>
  <${tagName}></${tagName}>
</template>
```
