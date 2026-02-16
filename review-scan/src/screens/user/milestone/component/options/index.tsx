/*
 * @Author: czy0729
 * @Date: 2024-10-12 15:31:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 23:36:31
 */
import React from 'react'
import { View } from 'react-native'
import { ActionSheet, SegmentedControl, SwitchPro, Touchable } from '@components'
import { IconTouchable, ItemSetting, Notice } from '@_'
import { _, systemStore, useStore } from '@stores'
import { info, open } from '@utils'
import { ob } from '@utils/decorators'
import { WEB } from '@constants'
import { LIMIT, NUM_COLUMNS, NUMBER_OF_LINES, SUB_TITLE } from '../../ds'
import { Ctx } from '../../types'
import Input from '../input'
import { COMPONENT, SEGMENTED_WIDTH } from './ds'
import { styles } from './styles'

function Options() {
  const { $, navigation } = useStore<Ctx>()
  const { advance } = systemStore
  const { numberOfLines, extraTitle } = $.state
  const elExtra = (
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

  return (
    <ActionSheet
      show={$.state.show}
      title='照片墙'
      height={Math.floor(_.window.height * 0.62)}
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

      <Notice style={_.mt.md}>此页面可一览用户收藏，可配合手机自带的长截屏使用。</Notice>

      <Input navigation={navigation} />

      <ItemSetting
        style={_.mt.sm}
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
            selectedIndex={NUM_COLUMNS.findIndex(item => $.state.numColumns === Number(item))}
            onValueChange={label => $.setOptions('numColumns', Number(label))}
          />
        }
      />

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

      <ItemSetting
        hd='第二行'
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
            selectedIndex={SUB_TITLE.findIndex(item => $.state.subTitle === item)}
            onValueChange={label => $.setOptions('subTitle', label)}
          />
        }
      />

      <ItemSetting
        hd='第三行'
        ft={
          advance ? (
            elExtra
          ) : (
            <Touchable
              onPress={() => {
                info('显示第三行仅对高级会员开放')
              }}
            >
              {elExtra}
            </Touchable>
          )
        }
      />

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
            selectedIndex={LIMIT.findIndex(
              item => $.state.limit === (item === '不限' ? 0 : Number(item))
            )}
            onValueChange={label => $.setOptions('limit', label === '不限' ? 0 : Number(label))}
          />
        }
      />

      <ItemSetting
        hd='渐变背景'
        information='建议在进行长截屏前关闭'
        ft={
          <SwitchPro
            style={styles.switch}
            value={$.state.bg}
            onSyncPress={() => $.setOptions('bg')}
          />
        }
      />

      <ItemSetting
        hd='封面圆角'
        ft={
          <SwitchPro
            style={styles.switch}
            value={$.state.radius}
            onSyncPress={() => $.setOptions('radius')}
          />
        }
      />

      <ItemSetting
        hd='封面可变高度'
        information='仅建议在游戏、音乐中开启'
        ft={
          <SwitchPro
            style={styles.switch}
            value={$.state.autoHeight}
            onSyncPress={() => $.setOptions('autoHeight')}
          />
        }
      />

      <ItemSetting
        hd='标题中文优先'
        ft={
          <SwitchPro
            style={styles.switch}
            value={$.state.cnFirst}
            onSyncPress={() => $.setOptions('cnFirst')}
          />
        }
      />

      <ItemSetting
        hd='时间换算'
        information='开启后收藏时间会换成 x 天前格式'
        ft={
          <SwitchPro
            style={styles.switch}
            value={$.state.lastTime}
            onSyncPress={() => $.setOptions('lastTime')}
          />
        }
      />

      <ItemSetting
        hd='完整评分星星'
        ft={
          <SwitchPro
            style={styles.switch}
            value={$.state.starsFull}
            onSyncPress={() => $.setOptions('starsFull')}
          />
        }
      />

      <ItemSetting
        hd='评分星星颜色'
        ft={
          <SwitchPro
            style={styles.switch}
            value={$.state.starsColor}
            onSyncPress={() => $.setOptions('starsColor')}
          />
        }
      />

      <ItemSetting
        hd='显示 NSFW'
        ft={
          <SwitchPro
            style={styles.switch}
            value={$.state.nsfw}
            onSyncPress={() => {
              $.setOptions('nsfw')

              setTimeout(() => {
                $.fetchUserCollections(true)
              }, 0)
            }}
          />
        }
      />
    </ActionSheet>
  )
}

export default ob(Options, COMPONENT)
