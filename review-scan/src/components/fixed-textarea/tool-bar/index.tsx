/*
 * @Author: czy0729
 * @Date: 2023-08-01 05:35:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-01 06:04:38
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex } from '../../flex'
import Btn from './btn'
import { memoStyles } from './styles'

function ToolBar({
  simple,
  showBgm,
  showReplyHistory,
  showTextarea,
  onAddSymbolText,
  onHideBgm,
  onHideReplyHistory,
  onShowBgm,
  onShowReplyHistory
}) {
  if (!(showTextarea || showBgm)) return null

  const styles = memoStyles()
  const renderBtn = (text: string, symbol?: string) => {
    return (
      <Btn
        text={text}
        symbol={symbol}
        showBgm={showBgm}
        showReplyHistory={showReplyHistory}
        onHideBgm={onHideBgm}
        onShowBgm={onShowBgm}
        onHideReplyHistory={onHideReplyHistory}
        onShowReplyHistory={onShowReplyHistory}
        onAddSymbolText={onAddSymbolText}
      />
    )
  }
  return (
    <Flex style={styles.toolBar} wrap='wrap' justify='between'>
      {renderBtn('BGM')}
      {simple ? (
        <>{renderBtn('时间')}</>
      ) : (
        <>
          {renderBtn('加粗', 'b')}
          {renderBtn('斜体', 'i')}
          {renderBtn('下划', 'u')}
          {renderBtn('删除', 's')}
          {renderBtn('剧透', 'mask')}
          {renderBtn('链接', 'url')}
          {renderBtn('图片', 'img')}
        </>
      )}
      {renderBtn('图床', 'imgchr')}
      {/* 空占位 */}
      {simple && (
        <>
          <View />
          <View />
          <View />
          <View />
          <View />
          <View />
          <View />
          <View />
          <View />
        </>
      )}
      {renderBtn('历史')}
    </Flex>
  )
}

export default observer(ToolBar)
