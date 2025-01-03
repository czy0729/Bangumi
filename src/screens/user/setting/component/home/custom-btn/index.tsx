/*
 * @Author: czy0729
 * @Date: 2022-11-22 04:40:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 04:40:00
 */
import React, { useState } from 'react'
import { ActionSheet, Flex, Text } from '@components'
import { _, systemStore } from '@stores'
import { t } from '@utils/fetch'
import { useBoolean, useObserver } from '@utils/hooks'
import { IOS } from '@constants'
import { MENU_MAP } from '../../../../../discovery/index/ds'
import Btn from './btn'
import { memoStyles } from './styles'

const KEYS = Object.keys(MENU_MAP).filter(key => {
  const item = MENU_MAP[key] || {}

  let flag = true
  if (IOS) flag = item.ios !== false

  return flag && item.key !== 'Open'
})

const DEFAULT_ITEM = {
  name: '不设置',
  icon: 'md-do-not-disturb-alt'
} as const

let lastValue = ''
let lastSelected = ''

function CustomBtn() {
  const [current, setCurrent] = useState({
    key: '',
    setting: '' as 'homeTopLeftCustom' | 'homeTopRightCustom'
  })
  const { state, setTrue, setFalse } = useBoolean(false)

  return useObserver(() => {
    const styles = memoStyles()
    const { homeTopLeftCustom, homeTopRightCustom } = systemStore.setting
    return (
      <>
        <Flex style={styles.btns}>
          <Btn
            item={MENU_MAP[homeTopLeftCustom] || DEFAULT_ITEM}
            onPress={() => {
              lastValue = homeTopLeftCustom || ''
              lastSelected = lastValue
              setCurrent({
                key: lastValue,
                setting: 'homeTopLeftCustom'
              })
              setTrue()
            }}
          />
          <Btn
            item={MENU_MAP[homeTopRightCustom] || DEFAULT_ITEM}
            onPress={() => {
              lastValue = homeTopRightCustom || ''
              lastSelected = lastValue
              setCurrent({
                key: lastValue,
                setting: 'homeTopRightCustom'
              })
              setTrue()
            }}
          />
        </Flex>
        <ActionSheet
          show={state}
          height={520}
          onClose={() => {
            setFalse()
            if (lastValue !== lastSelected) {
              t('设置.切换', {
                title: '右上角功能入口',
                value: `${current.setting}|${lastSelected}`
              })
              lastValue = ''
              lastSelected = ''
            }
          }}
        >
          <Text style={[_.mt.sm, _.mb.xs]} bold align='center'>
            选择一个功能作为入口
          </Text>
          <Flex style={_.mt.md} wrap='wrap' justify='center'>
            <Btn
              item={{
                name: '不设置',
                icon: 'md-do-not-disturb-alt'
              }}
              active={current.key === ''}
              onPress={() => {
                lastSelected = ''
                setCurrent({
                  ...current,
                  key: ''
                })
                setTimeout(() => {
                  systemStore.setSetting(current.setting, '')
                }, 40)
              }}
            />
            {KEYS.map(key => {
              const item = MENU_MAP[key]
              return (
                <Btn
                  key={item.key}
                  item={item}
                  active={current && current.key === key}
                  onPress={() => {
                    lastSelected = item.key
                    setCurrent({
                      ...current,
                      key: item.key
                    })
                    setTimeout(() => {
                      systemStore.setSetting(current.setting, item.key)
                    }, 40)
                  }}
                />
              )
            })}
            {/* 补几个按钮方便所有按钮居左 */}
            <Btn />
            <Btn />
            <Btn />
            <Btn />
            <Btn />
            <Btn />
            <Btn />
            <Btn />
          </Flex>
        </ActionSheet>
      </>
    )
  })
}

export default CustomBtn
