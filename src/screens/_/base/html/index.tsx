/*
 * @Author: czy0729
 * @Date: 2023-04-16 10:55:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-12 06:34:24
 */
import React, { useCallback, useState } from 'react'
import { Expand, RenderHtml } from '@components'
import { _ } from '@stores'
import { appNavigate, open } from '@utils'

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
      <Expand checkLayout={false} onExpand={onExpand}>
        <RenderHtml {...passProps} html={expand ? html : html.slice(0, 200)} />
      </Expand>
    )
  }

  return <RenderHtml {...passProps} html={html} />
}
