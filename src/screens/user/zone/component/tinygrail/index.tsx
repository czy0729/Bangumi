/*
 * @Author: czy0729
 * @Date: 2020-04-06 19:19:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-17 19:11:08
 */
import React, { useCallback } from 'react'
import { Animated, View } from 'react-native'
import { observer } from 'mobx-react'
import { Component, Flex, Heatmap, Input, Modal, ScrollView, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { decimal } from '@utils'
import { ANDROID, SCROLL_VIEW_RESET_PROPS } from '@constants'
import { useRedPacket, useRedPacketLog, useTinygrailScroll } from './hooks'
import { parseDescription } from './utils'
import { COMPONENT, MAX_AMOUNT, MIN_AMOUNT } from './ds'
import { memoStyles } from './styles'

import type { TinygrailRedPacketLogItem } from '@stores/tinygrail/types'
import type { Ctx } from '../../types'
import type { Props } from './types'

function Tinygrail({ onScroll }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { handleScrollEvent, handleRef, handlePress } = useTinygrailScroll({ onScroll })
  const {
    showRedPacket,
    amount,
    message,
    handleOpenRedPacket,
    handleCloseRedPacket,
    handleStepMinus,
    handleStepPlus,
    handleChangeAmount,
    handleChangeMessage,
    handleSendRedPacket
  } = useRedPacket()
  const { showLog, redPacketLog, handleOpenLog, handleCloseLog, handlePressUser } =
    useRedPacketLog()

  const handleRenderDescription = useCallback(
    (item: TinygrailRedPacketLogItem) => {
      const desc = parseDescription(item)
      if (desc.type === 'plain') {
        return (
          <Text style={_.mt.xs} type='sub' size={11} lineHeight={14} numberOfLines={1}>
            {desc.text}
          </Text>
        )
      }

      return (
        <Text style={_.mt.xs} type='sub' size={11} lineHeight={14} numberOfLines={1}>
          {desc.prefix}
          <Text size={11} lineHeight={14} bold onPress={() => handlePressUser(desc.relatedName)}>
            「{desc.userName}」
          </Text>
          {desc.suffix}
        </Text>
      )
    },
    [handlePressUser]
  )

  const styles = memoStyles()

  const { assets, balance, lastIndex } = $.userAssets

  return (
    <Component id='screen-zone-tab-view' data-type='tinygrail'>
      <Animated.ScrollView
        ref={handleRef}
        nestedScrollEnabled={ANDROID}
        contentContainerStyle={styles.contentContainerStyle}
        {...SCROLL_VIEW_RESET_PROPS}
        onScroll={handleScrollEvent}
      >
        <View style={styles.page}>
          <Text style={_.mt.lg}>
            总资产：{decimal(assets)} / {decimal(balance)}
            {lastIndex !== 0 && ` / #${lastIndex}`}
          </Text>
          <Text style={_.mt.sm}>{$.templeTotal} 座圣殿</Text>
          <Text style={_.mt.sm}>{$.charaTotal} 个人物</Text>
          <Flex style={_.mt.lg} justify='center'>
            <Touchable style={styles.touch} onPress={handlePress}>
              <Text type='sub' bold>
                查看持仓
              </Text>
              <Heatmap id='空间.跳转' to='TinygrailCharaAssets' alias='小圣杯持仓' />
            </Touchable>

            <Touchable style={styles.touch} onPress={handleOpenRedPacket}>
              <Text type='sub' bold>
                发送红包
              </Text>
            </Touchable>

            <Touchable style={styles.touch} onPress={handleOpenLog}>
              <Text type='sub' bold>
                红包记录
              </Text>
            </Touchable>
          </Flex>
        </View>
      </Animated.ScrollView>

      <Modal
        style={styles.modal}
        visible={showRedPacket}
        title='发送红包'
        onClose={handleCloseRedPacket}
      >
        <View style={styles.modalContent}>
          <Text size={13} bold>
            红包金额
          </Text>
          <Flex style={_.mt.sm} align='center'>
            <Flex.Item>
              <Input
                style={styles.input}
                keyboardType='numeric'
                value={amount}
                placeholder={`请输入红包金额 (${MIN_AMOUNT}-${MAX_AMOUNT})`}
                onChangeText={handleChangeAmount}
              />
            </Flex.Item>
            <Touchable style={styles.stepBtn} onPress={handleStepMinus}>
              <Text size={18} bold>
                -
              </Text>
            </Touchable>
            <Touchable style={styles.stepBtn} onPress={handleStepPlus}>
              <Text size={15} bold>
                +
              </Text>
            </Touchable>
          </Flex>

          <Text style={_.mt.md} size={13} bold>
            祝福留言
          </Text>
          <Input
            style={[styles.input, _.mt.sm]}
            value={message}
            placeholder='请输入祝福留言 (0-20字)'
            onChangeText={handleChangeMessage}
          />

          <Flex style={_.mt.lg} justify='end'>
            <Touchable style={styles.cancelBtn} onPress={handleCloseRedPacket}>
              <Text size={14} type='sub'>
                取消
              </Text>
            </Touchable>
            <Touchable style={styles.sendBtn} onPress={handleSendRedPacket}>
              <Text size={14} type='tinygrailPlain' bold>
                发送
              </Text>
            </Touchable>
          </Flex>
        </View>
      </Modal>

      <Modal style={styles.modal} visible={showLog} title='红包记录' onClose={handleCloseLog}>
        <ScrollView style={styles.logScroll} contentContainerStyle={styles.logContent}>
          {redPacketLog.list.length === 0 ? (
            <Text style={styles.emptyText} type='sub'>
              暂无红包记录
            </Text>
          ) : (
            redPacketLog.list.map((item, index) => (
              <View key={index} style={styles.logItem}>
                <Flex>
                  <Flex.Item>
                    <Text type={item.type === 17 ? 'danger' : 'success'} bold>
                      {item.type === 17 ? '+' : '-'}
                      {decimal(Math.abs(item.change))}
                    </Text>
                  </Flex.Item>
                  <Text type='sub' size={12} lineHeight={14}>
                    {item.logTime.replace('T', ' ')}
                  </Text>
                </Flex>
                {handleRenderDescription(item)}
              </View>
            ))
          )}
        </ScrollView>
      </Modal>
    </Component>
  )
}

export default observer(Tinygrail)
