/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:17:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-01 07:23:16
 */
import React from 'react'
import { Flex, Header as HeaderComp, Iconfont, Text, Touchable } from '@components'
import { info } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Header(_props, { $ }: Ctx) {
  const { trend } = $.state
  return (
    <HeaderComp
      mode='float'
      statusBarEventsType='Subject'
      title={$.title ? `${$.title}的词云` : '词云'}
      hm={[$.url, 'WordCloud']}
      headerRight={() =>
        !!trend && (
          <Touchable
            onPress={() => {
              info(`${trend} 人次访问`)
            }}
          >
            <Flex>
              <Iconfont name='md-whatshot' size={20} color='rgba(255, 255, 255, 0.64)' />
              <Text style={styles.trend} type='__plain__' size={13} bold>
                {trend}
              </Text>
            </Flex>
          </Touchable>
        )
      }
    />
  )
}

export default obc(Header, COMPONENT)
