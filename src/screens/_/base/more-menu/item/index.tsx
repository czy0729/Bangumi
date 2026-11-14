/*
 * @Author: czy0729
 * @Date: 2026-11-13 13:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 13:00:00
 *
 * 更多菜单行
 */
import { useCallback } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Heatmap, Text, Touchable } from '@components'
import { uiStore, userStore } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { WEB } from '@constants'
import { IconMenu } from '../../../icon'
import { pressMenu } from '../press'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { ItemProps } from './types'

function Item({ item }: ItemProps) {
  r(COMPONENT)

  const { username, id } = userStore.userInfo
  const disabled = !!item.login && !(username || id)

  const handlePress = useCallback(() => {
    pressMenu(item, {
      onValid: uiStore.closeMoreMenu
    })
  }, [item])

  return (
    <Touchable
      style={stl(styles.item, WEB && disabled ? styles.disabled : undefined)}
      onPress={handlePress}
    >
      <Flex style={styles.content}>
        <IconMenu
          id={item.key}
          icon={item.icon}
          text={item.text}
          size={item.size}
          wrap={false}
          compact
        />
        <View style={styles.name}>
          <Text type={disabled ? 'sub' : undefined} size={15} numberOfLines={1}>
            {item.name}
          </Text>
        </View>
      </Flex>
      <Heatmap id='发现.跳转' to={item.key} alias={item.name} from='More' />
    </Touchable>
  )
}

export default observer(Item)
