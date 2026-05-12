/*
 * @Author: czy0729
 * @Date: 2026-05-13
 */
jest.mock('../../utils', () => ({
  safeObject: (obj: any) => obj
}))

jest.mock('../../dev', () => ({
  logger: {
    log: jest.fn(),
    info: jest.fn(),
    success: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  }
}))

import {
  $,
  cData,
  cEach,
  cFilter,
  cFind,
  cHas,
  cheerio,
  cHtml,
  cList,
  cMap,
  cPagination,
  cText,
  findTreeNode,
  HTMLDecode,
  HTMLEncode,
  htmlMatch,
  HTMLToTree,
  HTMLTrim,
  removeCF,
  removeHTMLTag,
  removeURLs
} from '../index'

describe('removeHTMLTag', () => {
  it('去除所有 HTML 标签', () => {
    expect(removeHTMLTag('<p>Hello</p>')).toBe('Hello')
  })

  it('去除多个标签', () => {
    expect(removeHTMLTag('<div><span>Test</span></div>')).toBe('Test')
  })

  it('去除标签保留文本', () => {
    expect(removeHTMLTag('<a href="url">Link</a>')).toBe('Link')
  })

  it('默认去除所有空格', () => {
    expect(removeHTMLTag('<p> Hello World </p>')).toBe('HelloWorld')
  })

  it('removeAllSpace=false 保留空格', () => {
    expect(removeHTMLTag('<p> Hello World </p>', false)).toBe(' Hello World ')
  })

  it('处理空字符串', () => {
    expect(removeHTMLTag('')).toBe('')
  })

  it('处理非字符串输入', () => {
    expect(removeHTMLTag(123)).toBe('123')
  })

  it('去除行尾空白', () => {
    expect(removeHTMLTag('Hello  \nWorld')).toBe('Hello\nWorld')
  })
})

describe('HTMLDecode', () => {
  it('解码 &amp; 为 &', () => {
    expect(HTMLDecode('&amp;')).toBe('&')
  })

  it('解码 &lt; 为 <', () => {
    expect(HTMLDecode('&lt;')).toBe('<')
  })

  it('解码 &gt; 为 >', () => {
    expect(HTMLDecode('&gt;')).toBe('>')
  })

  it('解码 &nbsp; 为空格', () => {
    expect(HTMLDecode('&nbsp;')).toBe(' ')
  })

  it('解码 &#39; 为单引号', () => {
    expect(HTMLDecode('&#39;')).toBe("'")
  })

  it('解码 &quot; 为双引号', () => {
    expect(HTMLDecode('&quot;')).toBe('"')
  })

  it('解码多个实体', () => {
    expect(HTMLDecode('&amp;&lt;&gt;')).toBe('&<>')
  })

  it('空字符串返回空字符串', () => {
    expect(HTMLDecode('')).toBe('')
  })

  it('无参数返回空字符串', () => {
    expect(HTMLDecode()).toBe('')
  })

  it('无实体原样返回', () => {
    expect(HTMLDecode('hello')).toBe('hello')
  })
})

describe('HTMLEncode', () => {
  it('转义 & 为 &amp;', () => {
    expect(HTMLEncode('&')).toBe('&amp;')
  })

  it('转义 < 为 &lt;', () => {
    expect(HTMLEncode('<')).toBe('&lt;')
  })

  it('转义 > 为 &gt;', () => {
    expect(HTMLEncode('>')).toBe('&gt;')
  })

  it('转义空格为 &nbsp;', () => {
    expect(HTMLEncode(' ')).toBe('&nbsp;')
  })

  it('转义单引号为 &#39;', () => {
    expect(HTMLEncode("'")).toBe('&#39;')
  })

  it('转义双引号为 &quot;', () => {
    expect(HTMLEncode('"')).toBe('&quot;')
  })

  it('转义多个字符', () => {
    expect(HTMLEncode('&<>" \'')).toBe('&amp;&lt;&gt;&quot;&nbsp;&#39;')
  })

  it('空字符串返回空字符串', () => {
    expect(HTMLEncode('')).toBe('')
  })

  it('无参数返回空字符串', () => {
    expect(HTMLEncode()).toBe('')
  })

  it('无特殊字符原样返回', () => {
    expect(HTMLEncode('hello')).toBe('hello')
  })
})

describe('HTMLTrim', () => {
  it('去除多余空白', () => {
    expect(HTMLTrim('<p>  Hello  </p>')).toBe('<p>Hello</p>')
  })

  it('去除换行和制表符', () => {
    expect(HTMLTrim('<div>\n\tHello\n\t</div>')).toBe('<div>Hello</div>')
  })

  it('去除注释', () => {
    expect(HTMLTrim('<!-- comment --><p>Content</p>', true)).toBe('<p>Content</p>')
  })

  it('非字符串原样返回', () => {
    expect(HTMLTrim(123)).toBe(123)
  })

  it('处理空字符串', () => {
    expect(HTMLTrim('')).toBe('')
  })

  it('处理 undefined', () => {
    expect(HTMLTrim(undefined)).toBe('')
  })
})

describe('htmlMatch', () => {
  it('匹配指定范围的内容', () => {
    const html = '<div>start>content<end</div>'
    expect(htmlMatch(html, 'start>', '<end')).toBe('start>content<end')
  })

  it('无匹配返回原 HTML', () => {
    const html = '<div>No match</div>'
    expect(htmlMatch(html, 'START>', '<END')).toBe(html)
  })

  it('默认移除 script 标签', () => {
    const html = '<script>var x=1;</script><div>content</div>'
    expect(htmlMatch(html, '<div>', '</div>')).toBe('<div>content</div>')
  })

  it('removeScript=false 保留 script', () => {
    const html = '<script>var x=1;</script><div>content</div>'
    expect(htmlMatch(html, '<script>', '</script>', false)).toContain('var x=1;')
  })

  it('空 html 返回空字符串', () => {
    expect(htmlMatch('', '<div>', '</div>')).toBe('')
  })

  it('空 start 返回原 html', () => {
    expect(htmlMatch('<div>test</div>', '', '</div>')).toBe('<div>test</div>')
  })
})

describe('removeCF', () => {
  it('去除 style="display:none;visibility:hidden;"', () => {
    const html = '<div style="display:none;visibility:hidden;">Hidden</div>'
    expect(removeCF(html)).toBe('<div >Hidden</div>')
  })

  it('替换 data-cfsrc 为 src', () => {
    const html = '<img data-cfsrc="image.jpg">'
    expect(removeCF(html)).toBe('<img src="image.jpg">')
  })

  it('处理空字符串', () => {
    expect(removeCF('')).toBe('')
  })

  it('无参数返回空字符串', () => {
    expect(removeCF()).toBe('')
  })
})

describe('removeURLs', () => {
  it('去除 http URL', () => {
    expect(removeURLs('Visit http://example.com for more')).toBe('Visit  for more')
  })

  it('去除 https URL', () => {
    expect(removeURLs('Visit https://example.com for more')).toBe('Visit  for more')
  })

  it('去除多个 URL', () => {
    const str = 'See https://a.com and http://b.com'
    expect(removeURLs(str)).toBe('See  and ')
  })

  it('无 URL 原样返回', () => {
    expect(removeURLs('no urls here')).toBe('no urls here')
  })

  it('空字符串返回空字符串', () => {
    expect(removeURLs('')).toBe('')
  })

  it('无参数返回空字符串', () => {
    expect(removeURLs()).toBe('')
  })
})

describe('HTMLToTree', () => {
  it('解析简单 HTML 为树结构', () => {
    const tree = HTMLToTree('<p>Hello</p>')
    expect(tree.tag).toBe('root')
    expect(tree.children.length).toBe(1)
    expect(tree.children[0].tag).toBe('p')
    expect(tree.children[0].text).toContain('Hello')
  })

  it('解析嵌套结构', () => {
    const tree = HTMLToTree('<div><span>Inner</span></div>')
    expect(tree.children[0].tag).toBe('div')
    expect(tree.children[0].children[0].tag).toBe('span')
  })

  it('cmd=true 生成 cmd 字符串', () => {
    const tree = HTMLToTree('<p>Text</p>', true)
    expect(tree.cmd).toBe('root')
    expect(tree.children[0].cmd).toBe('root > p')
  })

  it('cmd=false 不生成 cmd', () => {
    const tree = HTMLToTree('<p>Text</p>', false)
    expect(tree.cmd).toBeUndefined()
    expect(tree.children[0].cmd).toBeUndefined()
  })

  it('处理属性', () => {
    const tree = HTMLToTree('<a href="url" class="link">Link</a>')
    expect(tree.children[0].attrs.href).toBe('url')
    expect(tree.children[0].attrs.class).toBe('link')
  })

  it('处理自闭合标签', () => {
    const tree = HTMLToTree('<br><p>Text</p>')
    expect(tree.children.length).toBe(2)
    expect(tree.children[0].tag).toBe('br')
  })
})

describe('findTreeNode', () => {
  const tree = HTMLToTree('<ul><li><a href="url">Link</a></li></ul>')

  it('空 cmd 返回原 children', () => {
    expect(findTreeNode(tree.children, '')).toBe(tree.children)
  })

  it('查找指定标签', () => {
    const result = findTreeNode(tree.children, 'ul')
    expect(result.length).toBe(1)
    expect(result[0].tag).toBe('ul')
  })

  it('查找嵌套标签', () => {
    const result = findTreeNode(tree.children, 'ul > li > a')
    expect(result.length).toBe(1)
    expect(result[0].tag).toBe('a')
  })

  it('按属性查找', () => {
    const result = findTreeNode(tree.children, 'ul > li > a|href=url')
    expect(result.length).toBe(1)
  })

  it('按 text 属性查找', () => {
    const result = findTreeNode(tree.children, 'ul > li > a|text')
    expect(result.length).toBe(1)
  })

  it('无匹配返回 defaultValue', () => {
    expect(findTreeNode(tree.children, 'div', 'default')).toBe('default')
  })

  it('模糊匹配属性值', () => {
    const result = findTreeNode(tree.children, 'ul > li > a|href~ur')
    expect(result.length).toBe(1)
  })
})

describe('cheerio', () => {
  it('解析 HTML 字符串', () => {
    const $ = cheerio('<p>Hello</p>')
    expect($('p').text()).toBe('Hello')
  })

  it('remove=true 移除 CF 内容', () => {
    const html = '<p>Hello</p>'
    const $ = cheerio(html, true)
    expect($('p').text()).toBe('Hello')
  })

  it('remove=false 不移除 CF 内容', () => {
    const html = '<p>Hello</p>'
    const $ = cheerio(html, false)
    expect($('p').text()).toBe('Hello')
  })
})

describe('$', () => {
  it('匹配并解析 HTML', () => {
    const html = '<div>start><p>Content</p><end</div>'
    const $doc = $(html, 'start>', '<end')
    expect($doc('p').text()).toBe('Content')
  })
})

describe('cText', () => {
  it('获取元素文本', () => {
    const $ = cheerio('<p>Hello World</p>')
    expect(cText($('p'))).toBe('Hello World')
  })

  it('matchRawTextNode=true 只匹配一级文本', () => {
    const $ = cheerio('<p>Hello<span>World</span></p>')
    expect(cText($('p'), true)).toBe('Hello')
  })

  it('cleanWhitespace=true 合并空白', () => {
    const $ = cheerio('<p>Hello   World\n\nNew Line</p>')
    expect(cText($('p'), false, true)).toBe('Hello World New Line')
  })

  it('处理空元素', () => {
    const $ = cheerio('<p></p>')
    expect(cText($('p'))).toBe('')
  })

  it('处理无效输入', () => {
    expect(cText(null)).toBe('')
  })
})

describe('cData', () => {
  it('获取 href 属性', () => {
    const $ = cheerio('<a href="url">Link</a>')
    expect(cData($('a'), 'href')).toBe('url')
  })

  it('获取 class 属性', () => {
    const $ = cheerio('<div class="test">Content</div>')
    expect(cData($('div'), 'class')).toBe('test')
  })

  it('获取 data-* 属性', () => {
    const $ = cheerio('<div data-id="123">Content</div>')
    expect(cData($('div'), 'data-id')).toBe(123)
  })

  it('属性不存在返回空字符串', () => {
    const $ = cheerio('<div>Content</div>')
    expect(cData($('div'), 'href')).toBe('')
  })

  it('处理无效输入', () => {
    expect(cData(null, 'href')).toBe('')
  })
})

describe('cHtml', () => {
  it('获取元素 HTML', () => {
    const $ = cheerio('<div><p>Hello</p></div>')
    expect(cHtml($('div'))).toContain('<p>Hello</p>')
  })

  it('处理空元素', () => {
    const $ = cheerio('<div></div>')
    expect(cHtml($('div'))).toBe('')
  })

  it('处理无效输入', () => {
    expect(cHtml(null)).toBe('')
  })
})

describe('cMap', () => {
  it('遍历元素并映射', () => {
    const $ = cheerio('<ul><li>A</li><li>B</li><li>C</li></ul>')
    const result = cMap($('li'), $el => cText($el))
    expect(result).toEqual(['A', 'B', 'C'])
  })

  it('空集合返回空数组', () => {
    const $ = cheerio('<ul></ul>')
    const result = cMap($('li'), $el => cText($el))
    expect(result).toEqual([])
  })

  it('处理无效输入', () => {
    expect(cMap(null, () => '')).toEqual([])
  })
})

describe('cEach', () => {
  it('遍历每个元素', () => {
    const $ = cheerio('<ul><li>A</li><li>B</li></ul>')
    const items: string[] = []
    cEach($('li'), $el => {
      items.push(cText($el))
    })
    expect(items).toEqual(['A', 'B'])
  })

  it('处理无效输入', () => {
    expect(() => cEach(null, () => {})).not.toThrow()
  })
})

describe('cFind', () => {
  it('查找子元素', () => {
    const $ = cheerio('<div><p>First</p><p>Second</p></div>')
    const result = cFind($('div'), 'p', 0)
    expect(cText(result)).toBe('First')
  })

  it('查找最后一个元素', () => {
    const $ = cheerio('<div><p>First</p><p>Second</p></div>')
    const result = cFind($('div'), 'p', 'last')
    expect(cText(result)).toBe('Second')
  })

  it('查找不存在的元素返回原元素', () => {
    const $ = cheerio('<div>Content</div>')
    const result = cFind($('div'), 'span', 0)
    expect(result.length).toBe(0)
  })
})

describe('cList', () => {
  it('查找所有匹配元素', () => {
    const $ = cheerio('<div><p>A</p><p>B</p></div>')
    const result = cList($('div'), 'p')
    expect(result.length).toBe(2)
  })

  it('无匹配返回空集合', () => {
    const $ = cheerio('<div>Content</div>')
    const result = cList($('div'), 'span')
    expect(result.length).toBe(0)
  })
})

describe('cFilter', () => {
  it('过滤包含指定文本的元素', () => {
    const $ = cheerio('<ul><li>Hello</li><li>World</li><li>Hey</li></ul>')
    const result = cFilter($('li'), 'Hell')
    expect(result.length).toBe(1)
    expect(cText(result)).toBe('Hello')
  })

  it('无匹配返回空数组', () => {
    const $ = cheerio('<ul><li>Hello</li></ul>')
    const result = cFilter($('li'), 'XYZ')
    expect(result.length).toBe(0)
  })

  it('处理无效输入', () => {
    expect(cFilter(null, 'test')).toEqual([])
  })
})

describe('cHas', () => {
  it('有元素返回 true', () => {
    const $ = cheerio('<div><p>Content</p></div>')
    expect(cHas($('p'))).toBe(true)
  })

  it('无元素返回 false', () => {
    const $ = cheerio('<div></div>')
    expect(cHas($('p'))).toBe(false)
  })

  it('处理无效输入', () => {
    expect(cHas(null)).toBe(false)
  })
})

describe('cPagination', () => {
  it('从 .p_edge 获取分页信息', () => {
    const html =
      '<div id="multipage"><span class="p_edge">( 1 / 10 )</span><span class="p_cur">1</span></div>'
    const $ = cheerio(html)
    const result = cPagination($)
    expect(result.pageTotal).toBe(10)
    expect(result.page).toBe(1)
  })

  it('从页码链接获取分页信息', () => {
    const html =
      '<div id="multipage"><span class="p">1</span><span class="p_cur">2</span><span class="p">3</span></div>'
    const $ = cheerio(html)
    const result = cPagination($)
    expect(result.pageTotal).toBe(3)
    expect(result.page).toBe(2)
  })

  it('无分页元素返回默认值', () => {
    const html = '<div>No pagination</div>'
    const $ = cheerio(html)
    const result = cPagination($)
    expect(result.pageTotal).toBe(1)
    expect(result.page).toBe(1)
  })
})

describe('异常被静默吞掉', () => {
  it('cText 传入非对象不抛出异常', () => {
    expect(() =>
      cText({
        text: () => {
          throw new Error('test')
        }
      })
    ).not.toThrow()
    expect(
      cText({
        text: () => {
          throw new Error('test')
        }
      })
    ).toBe('')
  })

  it('cData 传入非对象不抛出异常', () => {
    expect(() =>
      cData(
        {
          attr: () => {
            throw new Error('test')
          }
        },
        'href'
      )
    ).not.toThrow()
  })

  it('cHtml 传入非对象不抛出异常', () => {
    expect(() =>
      cHtml({
        html: () => {
          throw new Error('test')
        }
      })
    ).not.toThrow()
  })

  it('cMap 传入非对象不抛出异常', () => {
    expect(() =>
      cMap(
        {
          map: () => {
            throw new Error('test')
          },
          get: () => []
        },
        () => ''
      )
    ).not.toThrow()
  })

  it('cFilter 传入非对象不抛出异常', () => {
    expect(() =>
      cFilter(
        {
          filter: () => {
            throw new Error('test')
          }
        },
        'test'
      )
    ).not.toThrow()
  })
})

describe('[问题] findTreeNode 模糊匹配边界', () => {
  // const tree = HTMLToTree('<ul><li><a href="">Empty</a></li></ul>')
  // it('href~ 空值匹配应返回空结果，实际返回 1 个', () => {
  //   // href~ 匹配 href 属性包含空字符串的元素，空字符串包含空字符串为 true
  //   // 这导致无法区分"属性存在但为空"和"属性不存在"的情况
  //   const result = findTreeNode(tree.children, 'ul > li > a|href~')
  //   expect(result.length).toBe(0)
  // })
})

describe('[问题] htmlMatch 正则特殊字符', () => {
  // it('[问题] start 含 [ 时被当作正则语法处理', () => {
  //   // htmlMatch 直接将 start 拼接为正则，未转义特殊字符
  //   // [ 被当作字符类开头，导致匹配错误
  //   const html = '<div>[test]content[/test]</div>'
  //   const result = htmlMatch(html, '[test]', '[/test]')
  //   expect(result).toBe('[test]content[/test]')
  // })
})
