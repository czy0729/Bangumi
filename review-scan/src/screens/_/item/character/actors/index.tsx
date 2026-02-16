/*
 * @Author: czy0729
 * @Date: 2024-08-24 13:08:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-14 20:17:51
 */
import React from 'react'
import { Cover, Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { cnjp } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { MonoId } from '@types'
import { InView } from '../../../base'
import { styles } from './styles'
import { Props } from './types'

function Actors({ navigation, actors, y, event }: Props) {
  return (
    <Flex style={_.mt.sm} wrap='wrap'>
      {actors.map(item => {
        const cn = cnjp(item.nameCn, item.name)
        const jp = cnjp(item.name, item.nameCn)
        return (
          <Touchable
            key={item.id}
            style={styles.touch}
            animate
            onPress={() => {
              const monoId = (
                String(item.id).includes('person') ? item.id : `person/${item.id}`
              ) as MonoId
              navigation.push('Mono', {
                monoId
              })

              t(event.id, {
                to: 'Mono',
                monoId
              })
            }}
          >
            <Flex>
              <InView style={styles.inView} y={y}>
                <Cover src={item.cover} size={styles.inView.minWidth} radius />
              </InView>
              <Flex.Item style={_.ml.sm}>
                <Text size={12} numberOfLines={1} bold lineHeight={13}>
                  {cn}
                </Text>
                {!!jp && jp !== cn && (
                  <Text style={_.mt.xxs} size={11} type='sub' numberOfLines={1}>
                    {jp}
                  </Text>
                )}
              </Flex.Item>
            </Flex>
          </Touchable>
        )
      })}
    </Flex>
  )
}

export default ob(Actors)
