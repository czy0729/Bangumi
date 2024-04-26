/*
 * @Author: czy0729
 * @Date: 2024-04-25 04:56:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-25 05:03:07
 */
import React from 'react'
import { Flex, Heatmap, SwitchPro, Text, Touchable } from '@components'
import { ItemSetting, TapListener } from '@_'
import { uiStore } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import commonStyles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'

/** 显示缩略信息 */
function TimelinePopable({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('timelinePopable')

  return useObserver(() => (
    <>
      <ItemSetting
        ft={
          <SwitchPro
            style={commonStyles.switch}
            value={value}
            onSyncPress={() => {
              handleSwitch()

              t('设置.切换', {
                title: '显示缩略信息',
                checked: !value
              })
            }}
          />
        }
        filter={filter}
        {...TEXTS.timelinePopable}
      >
        <Heatmap id='设置.切换' title='显示缩略信息' />
      </ItemSetting>
      <TapListener>
        <Flex style={commonStyles.acSearch}>
          <Text size={13}>试一试：</Text>
          <Text size={13}>
            春菜{' '}
            <Text type='sub' size={13} bold>
              在看
            </Text>{' '}
            <Text
              size={13}
              type='main'
              bold
              onPress={() => {
                uiStore.showPopableSubject({
                  subjectId: 364450
                })
              }}
            >
              リコリス・リコイル
            </Text>
          </Text>
        </Flex>
        <Flex style={commonStyles.acSearch}>
          <Text size={13}>　　　　</Text>
          <Text size={13}>
            春菜{' '}
            <Text type='sub' size={13} bold>
              想读
            </Text>{' '}
            <Text
              size={13}
              type='main'
              bold
              onPress={() => {
                uiStore.showPopableSubject({
                  subjectId: 377599
                })
              }}
            >
              さよなら絵梨
            </Text>
          </Text>
        </Flex>
        <Flex style={commonStyles.acSearch}>
          <Text size={13}>　　　　</Text>
          <Text size={13}>
            春菜{' '}
            <Text type='sub' size={13} bold>
              玩过
            </Text>{' '}
            <Text
              size={13}
              type='main'
              bold
              onPress={() => {
                uiStore.showPopableSubject({
                  subjectId: 368785
                })
              }}
            >
              ゼノブレイド3
            </Text>
          </Text>
        </Flex>
        <Flex style={commonStyles.acSearch}>
          <Text size={13}>　　　　</Text>
          <Text size={13}>
            春菜{' '}
            <Text type='sub' size={13} bold>
              听过
            </Text>{' '}
            <Text
              size={13}
              type='main'
              bold
              onPress={() => {
                uiStore.showPopableSubject({
                  subjectId: 368936
                })
              }}
            >
              夢が僕らの太陽さ
            </Text>
          </Text>
        </Flex>
      </TapListener>
      <Touchable
        style={commonStyles.closePopablePlaceholder}
        withoutFeedback
        onPress={() => {
          uiStore.closePopableSubject()
        }}
      />
    </>
  ))
}

export default TimelinePopable
