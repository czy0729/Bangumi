/*
 * @Author: czy0729
 * @Date: 2022-08-15 13:07:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-16 03:57:36
 */
import React, { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { ActionSheet, SwitchPro, Heatmap, Flex, Text, Touchable } from '@components'
import { TapListener, ItemSetting } from '@_'
import { systemStore, uiStore } from '@stores'
import { useBoolean, useObserver } from '@utils/hooks'
import { t } from '@utils/fetch'
import { getShows } from '../utils'
import commonStyles from '../styles'
import { TEXTS } from './ds'

function Timeline({ filter }) {
  const isFocused = useIsFocused()
  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  useEffect(() => {
    if (!isFocused) {
      setFalse()
      uiStore.closePopableSubject()
    }
  }, [isFocused, setFalse])

  return useObserver(() => {
    if (!shows) return null

    const { timelinePopable } = systemStore.setting
    return (
      <>
        <ItemSetting
          hd='时间胶囊'
          arrow
          highlight
          filter={filter}
          onPress={() => {
            setTrue()
            setTimeout(() => {
              uiStore.updatePopableSubjectPortalKey()
            }, 160)
          }}
        />
        <ActionSheet
          show={state}
          title='时间胶囊'
          onClose={() => {
            setFalse()
            uiStore.closePopableSubject()
          }}
        >
          {/* 显示缩略信息 */}
          <ItemSetting
            show={shows.timelinePopable}
            ft={
              <SwitchPro
                style={commonStyles.switch}
                value={timelinePopable}
                onSyncPress={() => {
                  t('设置.切换', {
                    title: '显示缩略信息',
                    checked: !timelinePopable
                  })

                  systemStore.switchSetting('timelinePopable')
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
              <Text size={13}>试一试∶</Text>
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
        </ActionSheet>
      </>
    )
  })
}

export default Timeline
