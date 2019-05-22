/*
 * 辅助分析HTML的函数
 * @Author: czy0729
 * @Date: 2019-04-23 11:18:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-22 21:50:26
 */
import HTMLParser from './thirdParty/html-parser'

/**
 * HTML反转义
 * @param {*} str
 */
export function HTMLDecode(str = '') {
  if (str.length === 0) {
    return ''
  }
  return (
    str
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&nbsp;/g, ' ')
      // eslint-disable-next-line quotes
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
  )
}

/**
 * HTML压缩
 * @param {*} str
 */
export function HTMLTrim(str = '') {
  return (
    str
      // .replace(/<!--.*?-->/gi, '')
      // .replace(/\/\*.*?\*\//gi, '')
      // .replace(/[ ]+</gi, '<')
      // eslint-disable-next-line no-control-regex, no-tabs
      .replace(/\n+|\s\s\s*|\t/g, '')
      .replace(/"class="/g, '" class="')
  )
}

/**
 * html字符串转对象 (很好的利用js的引用特性, hhh)
 * @param {*} html
 * @param {*} cmd  是否生成cmd字符串(开发用)
 */
export function HTMLToTree(html, cmd = true) {
  const tree = {
    tag: 'root',
    attrs: {},
    text: [],
    children: []
  }
  if (cmd) {
    tree.cmd = 'root'
  }
  let ref = tree

  HTMLParser(html, {
    start: (tag, attrs, unary) => {
      const attrsMap = {}
      attrs.forEach(({ name, value, escaped }) => {
        // @issue 190507
        // 带有cookie的请求经过cloudflare返回的html部分attr的属性被加上了data-cf前缀??? 醉了
        const _name = name.replace('data-cf', '')
        return (attrsMap[_name] = escaped || value)
      })
      const item = {
        tag,
        attrs: attrsMap
      }
      if (cmd) {
        item.cmd = `${ref.cmd} > ${tag}`
      }
      if (!unary) {
        item.parent = ref
        item.text = []
        item.children = []
      }
      ref.children.push(item)

      if (!unary) {
        ref = item
      }
    },
    chars: text => {
      ref.text.push(text)
    },
    end: () => {
      const _ref = ref.parent
      delete ref.parent
      ref = _ref
    }
  })

  return tree
}

/**
 * tree查找
 * ul > li > a|title
 * ul > li > a|title=123
 * ul > li > a|title=123&class=article
 * ul > li > a|text&title=123&class=article
 * @param {*} children
 * @param {*} cmd
 * @return {Array}
 */
export function findTreeNode(children, cmd = '', defaultValue) {
  if (!cmd) {
    return children
  }

  const split = ' > '
  const tags = cmd.split(split)
  const tag = tags.shift()
  const find = children.filter(item => {
    let temp = tag.split('|')
    const _tag = temp[0]
    const attr = temp[1] || ''

    if (attr) {
      const attrs = attr.split('&')
      let match = true
      attrs.forEach(attr => {
        if (attr.indexOf('~') !== -1) {
          // ~
          temp = attr.split('~')
          const _attr = temp[0]
          const _value = temp[1]
          if (_value) {
            match =
              match &&
              (item.tag === _tag &&
                item.attrs[_attr] &&
                item.attrs[_attr].indexOf(_value) !== -1)
          } else if (_attr) {
            match =
              match && (item.tag === _tag && item.attrs[_attr] !== undefined)
          }
        } else {
          // =
          temp = attr.split('=')
          const _attr = temp[0]
          const _value = temp[1]
          if (_value) {
            match = match && (item.tag === _tag && item.attrs[_attr] == _value)
          } else if (_attr) {
            if (_attr === 'text') {
              match = match && (item.tag === _tag && item.text.length !== 0)
            } else {
              match =
                match && (item.tag === _tag && item.attrs[_attr] !== undefined)
            }
          }
        }
      })
      return match
    }
    return item.tag === _tag
  })
  if (!find.length) {
    return undefined || defaultValue
  }
  if (!tags.length) {
    return find
  }

  const _find = []
  find.forEach(item => {
    _find.push(...(findTreeNode(item.children, tags.join(split)) || []))
  })
  if (!_find.length) {
    return undefined || defaultValue
  }
  return _find
}
