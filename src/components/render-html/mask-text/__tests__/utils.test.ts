/*
 * @Author: czy0729
 * @Date: 2026-05-31 00:00:00
 * @Last Modified by: imagebuilder1837
 * @Last Modified time: 2026-05-31 00:00:00
 */
import React from 'react'
import {
  MASK_BACKGROUND_COLOR,
  MASK_TEXT_COLOR,
  getMaskTextStyle,
  maskRichText
} from '../utils'

function lastStyle(node: any) {
  const { style } = node.props
  return Array.isArray(style) ? style[style.length - 1] : style
}

describe('maskRichText', () => {
  it('保留多行富文本结构', () => {
    const br = React.createElement('Text', { key: 'br' }, '\n')
    const bold = React.createElement('Text', { key: 'bold', style: { fontWeight: 'bold' } }, '第二行')

    const result = maskRichText(['第一行', br, bold], true) as any[]

    expect(result[0]).toBe('第一行')
    expect(result[1].props.children).toBe('\n')
    expect(result[2].props.children).toBe('第二行')
    expect(lastStyle(result[2])).toEqual(getMaskTextStyle(true))
  })

  it('展开后保留链接点击', () => {
    const onPress = jest.fn()
    const link = React.createElement('Text', { style: { color: '#00f' }, onPress }, '链接')

    const result = maskRichText(link, true) as any

    expect(result.props.onPress).toBe(onPress)
    expect(result.props.children).toBe('链接')
    expect(lastStyle(result)).toEqual({
      color: MASK_TEXT_COLOR
    })
  })

  it('收起时隐藏富文本并禁用链接点击', () => {
    const onPress = jest.fn()
    const link = React.createElement('Text', { style: { color: '#00f' }, onPress }, '链接')

    const result = maskRichText(link, false) as any

    expect(result.props.onPress).toBeUndefined()
    expect(lastStyle(result)).toEqual({
      color: MASK_BACKGROUND_COLOR,
      opacity: 0
    })
  })

  it('收起时隐藏 Bangumi 表情节点', () => {
    function BgmText() {
      return null
    }

    const emoji = React.createElement(
      BgmText,
      { style: { fontFamily: 'bgm', color: '#000' }, index: 38 },
      '38'
    )

    const result = maskRichText(emoji, false) as any

    expect(result.type).toBe(BgmText)
    expect(result.props.index).toBe(38)
    expect(result.props.children).toBe('38')
    expect(lastStyle(result)).toEqual({
      color: MASK_BACKGROUND_COLOR,
      opacity: 0
    })
  })

  it('收起与展开保持相同结构', () => {
    const children = [
      '前缀',
      React.createElement('Text', { key: 'link', onPress: jest.fn() }, '链接'),
      React.createElement('Text', { key: 'br' }, '\n'),
      React.createElement('Text', { key: 'text' }, '正文')
    ]

    const hidden = maskRichText(children, false) as any[]
    const visible = maskRichText(children, true) as any[]

    expect(hidden).toHaveLength(visible.length)
    expect(hidden.map(item => (React.isValidElement(item) ? item.props.children : item))).toEqual(
      visible.map(item => (React.isValidElement(item) ? item.props.children : item))
    )
  })
})
