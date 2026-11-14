/*
 * @Author: czy0729
 * @Date: 2026-11-13 14:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:00:00
 *
 * 预设链接面板
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { ActionSheet, Flex, Iconfont, Text, Touchable } from '@components'
import { _ } from '@stores'
import { LINKS } from './ds'
import { styles } from './styles'

import type { Props } from './types'

function Preset({ show, onClose, onSelect }: Props) {
  return (
    <ActionSheet show={show} title='预设' height={640} onClose={onClose}>
      <View style={_.container.wind}>
        {LINKS.map(item => (
          <Touchable key={item.key} style={styles.item} onPress={() => onSelect(item.value)}>
            <Flex>
              <Flex.Item>
                <Text size={15} bold>
                  {item.key}
                </Text>
                <Text style={_.mt.xs} type='sub' size={13} bold>
                  {item.text}
                </Text>
              </Flex.Item>
              <Iconfont name='md-navigate-next' />
            </Flex>
          </Touchable>
        ))}
      </View>
    </ActionSheet>
  )
}

export default observer(Preset)
