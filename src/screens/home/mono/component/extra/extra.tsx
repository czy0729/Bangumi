/*
 * @Author: czy0729
 * @Date: 2020-04-21 12:15:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-17 17:13:36
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { IconHeader } from '@_'
import { _ } from '@stores'
import { confirm } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { FROZEN_FN } from '@constants'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'
import { styles } from './styles'

const Extra = memo(
  ({ navigation, monoId = '', level, canICO = false, icoUsers, doICO = FROZEN_FN }) => {
    if (canICO) {
      return (
        <Touchable
          style={[_.container.touch, _.mr.sm]}
          onPress={() => {
            confirm('花费 10000cc 启动 ICO?', () => {
              doICO(navigation)
            })
          }}
        >
          <Flex style={_.mr.sm}>
            <IconHeader name='trophy' size={18} />
            <Text size={13}>启动 ICO</Text>
          </Flex>
        </Touchable>
      )
    }

    return (
      <Touchable
        style={styles.icon}
        onPress={() => {
          const path = icoUsers ? 'TinygrailICODeal' : 'TinygrailDeal'
          navigation.push(path, {
            monoId
          })

          t('人物.跳转', {
            to: path,
            monoId
          })
        }}
      >
        <Flex>
          <Iconfont name='trophy' size={18} color={_.colorTitle} />
          {!!level && (
            <Text style={_.ml.xs} size={11} lineHeight={18} bold>
              lv{level}
            </Text>
          )}
        </Flex>
      </Touchable>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Extra
