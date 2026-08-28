/*
 * @Author: czy0729
 * @Date: 2026-08-29 04:55:07
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-29 04:55:07
 */
import React from 'react'
import { observer } from 'mobx-react'
import { SegmentedControl, Touchable } from '@components'
import { ItemSetting } from '@_'
import { systemStore, useStore } from '@stores'
import { info } from '@utils'
import { LIMIT, NUM_COLUMNS, NUMBER_OF_LINES, SUB_TITLE } from '../../../ds'
import { COMPONENT, SEGMENTED_WIDTH } from '../ds'
import { styles } from '../styles'
import SwitchRow from '../switch-row'

import type { Ctx } from '../../../types'

/** 列表展示设置行 */
function RowsDisplay() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { advance } = systemStore
  const { numColumns, numberOfLines, titleAutoSize, subTitle, extraTitle, limit, reverse } = $.state

  const elReverse = (
    <SwitchRow
      hd='倒序'
      information='开启后列表从最后一页开始加载'
      value={reverse}
      onSyncPress={() => {
        $.setOptions('reverse')

        setTimeout(() => {
          $.setOptions('show', false)

          setTimeout(() => {
            $.fetchUserCollections(true)
          }, 400)
        }, 400)
      }}
    />
  )
  const elNumColumns = (
    <ItemSetting
      hd='列数'
      ft={
        <SegmentedControl
          style={[
            styles.segmentedControl,
            {
              width: SEGMENTED_WIDTH * NUM_COLUMNS.length
            }
          ]}
          size={12}
          values={NUM_COLUMNS}
          selectedIndex={NUM_COLUMNS.findIndex(item => numColumns === Number(item))}
          onValueChange={label => $.setOptions('numColumns', Number(label))}
        />
      }
    />
  )
  const elNumberOfLines = (
    <ItemSetting
      hd='标题行数'
      ft={
        <SegmentedControl
          style={[
            styles.segmentedControl,
            {
              width: SEGMENTED_WIDTH * NUMBER_OF_LINES.length
            }
          ]}
          size={12}
          values={NUMBER_OF_LINES}
          selectedIndex={NUMBER_OF_LINES.findIndex(
            item => numberOfLines === (item === '无' ? 0 : Number(item))
          )}
          onValueChange={label => $.setOptions('numberOfLines', label === '无' ? 0 : Number(label))}
        />
      }
    />
  )
  const elTitleAutoSize = (
    <SwitchRow
      hd='标题自适应大小'
      information='字数越多使用越小号的字体，以显示更多文字'
      value={titleAutoSize}
      onSyncPress={() => $.setOptions('titleAutoSize')}
    />
  )
  const elSubTitle = (
    <ItemSetting
      hd='第二行'
      information='时间为收藏条目的时间，评分为您的打分，描述可能为作者或艺术家'
      ft={
        <SegmentedControl
          style={[
            styles.segmentedControl,
            {
              width: SEGMENTED_WIDTH * SUB_TITLE.length
            }
          ]}
          size={12}
          values={SUB_TITLE}
          selectedIndex={SUB_TITLE.findIndex(item => subTitle === item)}
          onValueChange={label => $.setOptions('subTitle', label)}
        />
      }
    />
  )

  const elExtraComponent = (
    <SegmentedControl
      style={[
        styles.segmentedControl,
        {
          width: SEGMENTED_WIDTH * SUB_TITLE.length
        }
      ]}
      size={12}
      values={SUB_TITLE}
      selectedIndex={SUB_TITLE.findIndex(item => extraTitle === item)}
      enabled={advance}
      onValueChange={label => {
        if (!advance) return

        $.setOptions('extraTitle', label)
      }}
    />
  )
  const elExtra = (
    <ItemSetting
      hd='第三行'
      ft={
        advance ? (
          elExtraComponent
        ) : (
          <Touchable
            onPress={() => {
              info('显示第三行仅对高级会员开放')
            }}
          >
            {elExtraComponent}
          </Touchable>
        )
      }
    />
  )

  const elLimit = (
    <ItemSetting
      hd='显示条目数'
      ft={
        <SegmentedControl
          style={[
            styles.segmentedControl,
            {
              width: SEGMENTED_WIDTH * LIMIT.length
            }
          ]}
          size={12}
          values={LIMIT}
          selectedIndex={LIMIT.findIndex(item => limit === (item === '不限' ? 0 : Number(item)))}
          onValueChange={label => $.setOptions('limit', label === '不限' ? 0 : Number(label))}
        />
      }
    />
  )

  return (
    <>
      {elReverse}
      {elNumColumns}
      {elNumberOfLines}
      {elTitleAutoSize}
      {elSubTitle}
      {elExtra}
      {elLimit}
    </>
  )
}

export default observer(RowsDisplay)
