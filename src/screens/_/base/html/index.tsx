/*
 * @Author: czy0729
 * @Date: 2023-04-16 10:55:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 03:19:00
 */
import React, { useCallback, useState } from 'react'
import { Component, Expand, RenderHtml } from '@components'
import { _ } from '@stores'
import { appNavigate, open } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

/** 初始带截断的渲染 html, 用于优化渲染过长的 html */
export const HTML = ({
  navigation,
  style = undefined,
  id,
  msg,
  url,
  imagesMaxWidth,
  matchLink,
  event
}) => {
  r(COMPONENT)

  const [expand, setExpand] = useState(false)
  const onExpand = useCallback(() => {
    setExpand(true)
  }, [setExpand])

  // 遗留问题, 给宣传语增加一点高度
  const html = msg.replace(
    '<span style="font-size:10px; line-height:10px;">[来自Bangumi for',
    '<span style="font-size:10px; line-height:20px;">[来自Bangumi for'
  )

  const passProps = {
    style,
    baseFontStyle: _.baseFontStyle.md,
    imagesMaxWidth,
    matchLink,
    onLinkPress: (href: string) => appNavigate(href, navigation, {}, event),
    onImageFallback: () => open(`${url}#post_${id}`)
  }

  // 若文本超长, 配合 Expand 组件减少首屏显示范围和渲染文字长度
  if (msg.length >= 1000) {
    return (
      <Component id='base-html' data-type='split'>
        <Expand checkLayout={false} onExpand={onExpand}>
          <RenderHtml {...passProps} html={expand ? html : html.slice(0, 200)} />
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
