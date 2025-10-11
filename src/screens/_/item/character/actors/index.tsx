/*
 * @Author: czy0729
 * @Date: 2024-08-24 13:08:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-11 06:00:00
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Cover, Flex, Link, Text } from '@components'
import { _ } from '@stores'
import { cnjp } from '@utils'
import { MonoId } from '@types'
import { InView } from '../../../base'
import { styles } from './styles'
import { Props } from './types'

function Actors({ actors, y, event }: Props) {
  return useObserver(() => (
    <Flex style={_.mt.sm} wrap='wrap'>
      {actors.map(item => {
        const monoId = (
          String(item.id).includes('person') ? item.id : `person/${item.id}`
        ) as MonoId
        const cn = cnjp(item.nameCn, item.name)
        const jp = cnjp(item.name, item.nameCn)
        return (
          <Link
            key={item.id}
            style={styles.touch}
            path='Mono'
            getParams={() => ({
              monoId
            })}
            eventId={event.id}
            getEventData={() => ({
              to: 'Mono',
              monoId
            })}
          >
            <Flex>
              <InView style={styles.inView} y={y}>
                <Cover src={item.cover} size={styles.inView.minWidth} radius />
              </InView>
              <Flex.Item style={_.ml.sm}>
                <Text size={12} lineHeight={13} bold numberOfLines={1}>
                  {cn}
                </Text>
                {!!jp && jp !== cn && (
                  <Text style={_.mt.xxs} type='sub' size={11} numberOfLines={1}>
                    {jp}
                  </Text>
                )}
              </Flex.Item>
            </Flex>
          </Link>
        )
      })}
    </Flex>
  ))
}

export default Actors
