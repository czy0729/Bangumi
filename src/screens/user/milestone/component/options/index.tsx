/*
 * @Author: czy0729
 * @Date: 2024-10-12 15:31:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-16 21:51:42
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { ActionSheet, SegmentedControl, SwitchPro, Touchable } from '@components'
import { IconTouchable, ItemSetting, Notice } from '@_'
import { _, systemStore, useStore } from '@stores'
import { info, open } from '@utils'
import { WEB } from '@constants'
import { LIMIT, NUM_COLUMNS, NUMBER_OF_LINES, SUB_TITLE } from '../../ds'
import Input from '../input'
import { COMPONENT, SEGMENTED_WIDTH } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Options() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { advance } = systemStore
  const {
    _loaded,
    show,
    userInfo,
    fixedHeader,
    numColumns,
    numberOfLines,
    titleAutoSize,
    subTitle,
    extraTitle,
    limit,
    bg,
    radius,
    autoHeight,
    cnFirst,
    lastTime,
    starsFull,
    starsColor,
    nsfw
  } = $.state

  const elUserInfo = useMemo(
    () => (
      <ItemSetting
        style={_.mt.md}
        hd='用户信息'
        ft={
          <SwitchPro
            style={styles.switch}
            value={userInfo}
            onSyncPress={() => $.setOptions('userInfo')}
          />
        }
      />
    ),
    [$, userInfo]
  )
  const elFixedHeader = useMemo(
    () => (
      <ItemSetting
        hd='锁住头部'
        ft={
          <SwitchPro
            style={styles.switch}
            value={fixedHeader}
            onSyncPress={() => $.setOptions('fixedHeader')}
          />
        }
      />
    ),
    [$, fixedHeader]
  )

  const elNumColumns = useMemo(
    () => (
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
    ),
    [$, numColumns]
  )
  const elNumberOfLines = useMemo(
    () => (
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
            onValueChange={label =>
              $.setOptions('numberOfLines', label === '无' ? 0 : Number(label))
            }
          />
        }
      />
    ),
    [$, numberOfLines]
  )
  const elTitleAutoSize = useMemo(
    () => (
      <ItemSetting
        hd='标题自适应大小'
        information='字数越多使用越小号的字体，以显示更多文字'
        ft={
          <SwitchPro
            style={styles.switch}
            value={titleAutoSize}
            onSyncPress={() => $.setOptions('titleAutoSize')}
          />
        }
      />
    ),
    [$, titleAutoSize]
  )
  const elSubTitle = useMemo(
    () => (
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
    ),
    [$, subTitle]
  )

  const elExtraComponent = useMemo(
    () => (
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
    ),
    [$, advance, extraTitle]
  )
  const elExtra = useMemo(
    () => (
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
    ),
    [advance, elExtraComponent]
  )

  const elLimit = useMemo(
    () => (
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
    ),
    [$, limit]
  )
  const elBg = useMemo(
    () => (
      <ItemSetting
        hd='渐变背景'
        information='建议在进行长截屏前关闭'
        ft={<SwitchPro style={styles.switch} value={bg} onSyncPress={() => $.setOptions('bg')} />}
      />
    ),
    [$, bg]
  )
  const elRadius = useMemo(
    () => (
      <ItemSetting
        hd='封面圆角'
        ft={
          <SwitchPro
            style={styles.switch}
            value={radius}
            onSyncPress={() => $.setOptions('radius')}
          />
        }
      />
    ),
    [$, radius]
  )
  const elAutoHeight = useMemo(
    () => (
      <ItemSetting
        hd='封面可变高度'
        information='仅建议在游戏、音乐中开启'
        ft={
          <SwitchPro
            style={styles.switch}
            value={autoHeight}
            onSyncPress={() => $.setOptions('autoHeight')}
          />
        }
      />
    ),
    [$, autoHeight]
  )
  const elCnFirst = useMemo(
    () => (
      <ItemSetting
        hd='标题中文优先'
        ft={
          <SwitchPro
            style={styles.switch}
            value={cnFirst}
            onSyncPress={() => $.setOptions('cnFirst')}
          />
        }
      />
    ),
    [$, cnFirst]
  )
  const elLastTime = useMemo(
    () => (
      <ItemSetting
        hd='时间换算'
        information='开启后收藏时间会换成 x 天前格式'
        ft={
          <SwitchPro
            style={styles.switch}
            value={lastTime}
            onSyncPress={() => $.setOptions('lastTime')}
          />
        }
      />
    ),
    [$, lastTime]
  )
  const elStarsFull = useMemo(
    () => (
      <ItemSetting
        hd='完整评分星星'
        ft={
          <SwitchPro
            style={styles.switch}
            value={starsFull}
            onSyncPress={() => $.setOptions('starsFull')}
          />
        }
      />
    ),
    [$, starsFull]
  )
  const elStarsColor = useMemo(
    () => (
      <ItemSetting
        hd='评分星星颜色'
        ft={
          <SwitchPro
            style={styles.switch}
            value={starsColor}
            onSyncPress={() => $.setOptions('starsColor')}
          />
        }
      />
    ),
    [$, starsColor]
  )
  const elNSFW = useMemo(
    () => (
      <ItemSetting
        hd='显示 NSFW'
        ft={
          <SwitchPro
            style={styles.switch}
            value={nsfw}
            onSyncPress={() => {
              $.setOptions('nsfw')

              setTimeout(() => {
                $.fetchUserCollections(true)
              }, 0)
            }}
          />
        }
      />
    ),
    [$, nsfw]
  )

  if (!_loaded) return null

  return (
    <ActionSheet
      show={show}
      title='照片墙'
      height={Math.floor(_.window.height * 0.68)}
      onClose={() => $.setOptions('show', false)}
    >
      {!WEB && (
        <View style={styles.theme}>
          <IconTouchable
            name={_.isDark ? 'moon' : 'sunny'}
            color={_.colorIcon}
            size={18}
            onPress={() => {
              setTimeout(() => {
                _.toggleMode()
              }, 40)
            }}
          />
        </View>
      )}
      <View style={styles.share}>
        <IconTouchable
          name='md-ios-share'
          color={_.colorIcon}
          size={18}
          onPress={() => {
            open($.shareUrl)
          }}
        />
      </View>

      <Notice style={styles.notice}>此页面可一览用户收藏，可配合手机自带的长截屏使用。</Notice>

      <Input />
      {elUserInfo}
      {elFixedHeader}
      {elNumColumns}
      {elNumberOfLines}
      {elTitleAutoSize}
      {elSubTitle}
      {elExtra}
      {elLimit}
      {elBg}
      {elRadius}
      {elAutoHeight}
      {elCnFirst}
      {elLastTime}
      {elStarsFull}
      {elStarsColor}
      {elNSFW}
    </ActionSheet>
  )
}

export default observer(Options)
