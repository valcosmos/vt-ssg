import { declare } from '@babel/helper-plugin-utils'
import { isJSXMemberExpression, type JSXAttribute, type JSXElement, stringLiteral } from '@babel/types'
import { normalizePath } from 'vite'
import { MASK_SPLITTER } from './constants'

export default declare((api) => {
  api.assertVersion(7)

  const visitor: any = {
    // 访问 JSX 开始标签
    JSXOpeningElement(path: any, state: any) {
      const name = path.node.name

      let bindingName = ''
      if (name.type === 'JSXIdentifier') {
        bindingName = name.name
      }
      else if (name.type === 'JSXMemberExpression') {
        let object = name.object
        // A.B.C
        while (isJSXMemberExpression(object)) {
          object = object.object
        }
        // 取出 A
        bindingName = object.name
      }
      else {
        // 其它 type 忽略
        return
      }

      // 拿到组件名字，如 Aside
      // const bindingName = name.name
      // 根据作用域信息拿到组件引入的位置
      const binding = path.scope.getBinding(bindingName)

      if (binding?.path.parent.type === 'ImportDeclaration') {
        // 定位到 import 语句之后，我们拿到 ssg 组件对应的引入路径
        const source = binding.path.parent.source
        // 然后将 __ssg prop 进行修改
        const attributes = (path.container as JSXElement).openingElement.attributes
        for (let i = 0; i < attributes.length; i++) {
          const name = (attributes[i] as JSXAttribute).name
          if (name?.name === '__ssg') {
            (attributes[i] as JSXAttribute).value = stringLiteral(
              `${source.value}${MASK_SPLITTER}${normalizePath(
                state.filename || '',
              )}`,
            )
          }
        }
      }
    },
  }
  return {
    name: 'transform-jsx-ssg',
    visitor,
  }
})
