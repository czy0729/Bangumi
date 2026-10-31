/*
 * @Author: czy0729
 * @Date: 2022-11-24 05:43:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 00:00:00
 *
 * 设置项与跳转列表
 */
import { useCallback } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Divider, Flex, SwitchPro, Text } from '@components'
import { _, systemStore, useStore } from '@stores'
import { t } from '@utils/fetch'
import Item from '../item'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

/** 可切换的设置项 */
type SettingKey = 'focusOrigin' | 'focusAction'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { focusOrigin, focusAction } = systemStore.setting

  const handleSwitch = useCallback((key: SettingKey, title: string, checked: boolean) => {
    t('设置.切换', {
      title,
      checked: !checked
    })

    systemStore.switchSetting(key)
  }, [])

  return (
    <View>
      <Flex style={styles.setting}>
        <Flex.Item>
          <Text size={15} bold>
            突出显示源头按钮
          </Text>
        </Flex.Item>
        <SwitchPro
          style={styles.switch}
          value={focusOrigin}
          onSyncPress={() => handleSwitch('focusOrigin', ' 突出源头按钮', focusOrigin)}
        />
      </Flex>
      <Flex style={styles.setting}>
        <Flex.Item>
          <Text size={15} bold>
            若有自定义跳转隐藏通用源头按钮
          </Text>
          <Text style={_.mt.xs} type='sub' size={12} bold>
            需要开启上面的设置才会生效
          </Text>
        </Flex.Item>
        <SwitchPro
          style={styles.switch}
          value={focusAction}
          onSyncPress={() => handleSwitch('focusAction', '隐藏通用源头按钮', focusAction)}
        />
      </Flex>
      <Divider />
      {$.data.map(item => (
        <Item key={item.uuid} {...item} />
      ))}
    </View>
  )
}

export default observer(List)
