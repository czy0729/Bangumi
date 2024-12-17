/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:17:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 16:11:46
 */
import React from 'react'
import { Flex, HeaderV2, Iconfont, Text, Touchable } from '@components'
import { IconTouchable } from '@_'
import { useStore } from '@stores'
import { info } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Header() {
  const { $, navigation } = useStore<Ctx>()
  const { trend } = $.state
  return (
    <HeaderV2
      transparent
      title={$.title ? `${$.title}的词云` : '词云'}
      hm={$.hm}
      headerRight={() => (
        <>
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
        </>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
