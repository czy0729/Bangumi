/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:17:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-04 20:08:51
 */
import React from 'react'
import { Flex, Header as HeaderComp, Iconfont, Text, Touchable } from '@components'
import { IconTouchable } from '@_'
import { info } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Header(_props, { $, navigation }: Ctx) {
  const { trend } = $.state
  return (
    <HeaderComp
      mode='float'
      statusBarEventsType='Subject'
      title={$.title ? `${$.title}的词云` : '词云'}
      hm={[$.url, 'WordCloud']}
      headerRight={() => (
        <Flex>
          {!$.userId && !!trend && (
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
          )}
          <IconTouchable
            name='md-info-outline'
            size={20}
            color='rgba(255, 255, 255, 0.64)'
            onPress={() => {
              navigation.push('WebBrowser', {
                url: 'https://www.yuque.com/chenzhenyu-k0epm/znygb4/ubpc03di49shf121?singleDoc',
                title: '词云说明'
              })

              t('词云.跳转', {
                to: 'WebBrowser'
              })
            }}
          />
        </Flex>
      )}
    />
  )
}

export default obc(Header, COMPONENT)
