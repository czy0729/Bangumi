/*
 * @Author: czy0729
 * @Date: 2022-11-22 04:40:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-18 15:56:06
 */
import React, { useCallback, useState } from 'react'
import { ActionSheet, Flex, Text } from '@components'
import { _, systemStore } from '@stores'
import { t } from '@utils/fetch'
import { useBoolean, useObserver } from '@utils/hooks'
import { MENU_MAP } from '@constants'
import Btn from './btn'
import { CUSTOM_BTN_DEFAULT, CUSTOM_BTN_KEYS } from './ds'
import { memoStyles } from './styles'

import type { MenuItem } from '@types'

function CustomBtn() {
  const [current, setCurrent] = useState({
    key: '',
    setting: '' as 'homeTopLeftCustom' | 'homeTopRightCustom'
  })
  const { state, setTrue, setFalse } = useBoolean(false)

  const handlePress = useCallback(
    (setting: 'homeTopLeftCustom' | 'homeTopRightCustom', key: string) => {
      setCurrent({
        key,
        setting
      })
      setTrue()
    },
    [setTrue]
  )

  const handleCloseActionSheet = useCallback(() => {
    setFalse()
    if (current.key !== '') {
      t('设置.切换', {
        title: '右上角功能入口',
        value: `${current.setting}|${current.key}`
      })
    }
    setCurrent({ key: '', setting: current.setting })
  }, [setFalse, current])

  const handleSelectBtn = useCallback((key: string) => {
    setCurrent(prev => {
      systemStore.setSetting(prev.setting, key)
      return { ...prev, key }
    })
  }, [])

  return useObserver(() => {
    const styles = memoStyles()
    const { homeTopLeftCustom, homeTopRightCustom } = systemStore.setting

    return (
      <>
        <Flex style={styles.btns}>
          <Btn
            item={(MENU_MAP[homeTopLeftCustom] || CUSTOM_BTN_DEFAULT) as MenuItem}
            onPress={() => handlePress('homeTopLeftCustom', homeTopLeftCustom || '')}
          />
          <Btn
            item={(MENU_MAP[homeTopRightCustom] || CUSTOM_BTN_DEFAULT) as MenuItem}
            onPress={() => handlePress('homeTopRightCustom', homeTopRightCustom || '')}
          />
        </Flex>

        <ActionSheet show={state} height={540} onClose={handleCloseActionSheet}>
          <Text style={[_.mt.sm, _.mb.xs]} bold align='center'>
            选择一个功能作为入口
          </Text>
          <Flex style={_.mt.md} wrap='wrap' justify='center'>
            <Btn
              item={CUSTOM_BTN_DEFAULT as MenuItem}
              active={current.key === ''}
              onPress={() => handleSelectBtn('')}
            />
            {CUSTOM_BTN_KEYS.map(key => {
              const item = MENU_MAP[key]
              return (
                <Btn
                  key={item.key}
                  item={item}
                  active={current.key === key}
                  onPress={() => handleSelectBtn(item.key)}
                />
              )
            })}

            {/* 补几个按钮方便所有按钮居左 */}
            {Array(8).fill(<Btn />)}
          </Flex>
        </ActionSheet>
      </>
    )
  })
}

export default CustomBtn
