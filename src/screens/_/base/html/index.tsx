/*
 * @Author: czy0729
 * @Date: 2023-04-16 10:55:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-17 11:24:12
 */
import React, { useCallback, useState } from 'react'
import { Component, Expand, RenderHtml, RenderHtmlProps } from '@components'
import { _ } from '@stores'
import { appNavigate, open, removeHTMLTag } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { Props as HTMLProps } from './types'

export { HTMLProps }

/** 初始带截断的渲染 html, 用于优化渲染过长的 html */
export const HTML = ({
  navigation,
  style,
  ratio,
  msg,
  length = 1000,
  imagesMaxWidth,
  matchLink,
  id,
  url,
  event
}: HTMLProps) => {
  r(COMPONENT)

  const [expand, setExpand] = useState(false)
  const handleExpand = useCallback(() => {
    setExpand(true)
  }, [setExpand])

  let html = msg
  if (id) {
    // 遗留问题, 给宣传语增加一点高度
    html = html.replace(
      '<span style="font-size:10px; line-height:10px;">[来自Bangumi for',
      '<span style="font-size:10px; line-height:20px;">[来自Bangumi for'
    )
  }

  const passProps: RenderHtmlProps = {
    style,
    baseFontStyle: _.baseFontStyle.md,
    imagesMaxWidth,
    matchLink,
    onLinkPress: (href: string) => appNavigate(href, navigation, {}, event),
    onImageFallback: url && id ? () => open(`${url}#post_${id}`) : undefined
  }

  // 若文本超长, 配合 Expand 组件减少首屏显示范围和渲染文字长度
  if (removeHTMLTag(msg, false).length >= length) {
    return (
      <Component id='base-html' data-type='split'>
        <Expand ratio={ratio} checkLayout={false} onExpand={handleExpand}>
          <RenderHtml {...passProps} html={expand ? html : html.slice(0, length)} />
        </Expand>
      </Component>
    )
  }

  return (
    <Component id='base-html' data-type='all'>
      <RenderHtml {...passProps} html={html} />
    </Component>
  )
}

export default HTML
