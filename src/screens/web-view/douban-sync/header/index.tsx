/*
 * @Author: czy0729
 * @Date: 2022-10-16 16:48:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-17 17:38:23
 */
import React from 'react'
import { Alert } from 'react-native'
import { Header as CompHeader, Flex } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { s2tAsync } from '@utils/async'
import { Ctx } from '../types'

function Header(props, { $, navigation }: Ctx) {
  const { hide } = $.state
  return (
    <CompHeader
      title='豆瓣同步'
      hm={['douban-sync', 'DoubanSync']}
      headerRight={() => (
        <Flex>
          <IconTouchable
            style={_.mr.xs}
            name={hide ? 'md-refresh' : 'md-close'}
            color={_.colorDesc}
            onPress={$.onToggleHide}
          />
          <IconTouchable
            name='md-info-outline'
            color={_.colorDesc}
            size={19}
            onPress={() => {
              t('豆瓣同步.关于')

              Alert.alert(
                s2tAsync('豆瓣同步'),
                s2tAsync(`此功能目前为实验性质。
                \n请点击旁边的刷新按钮根据提示完成数据获取，然后开始同步数据。
                \n因自动对比的数据存在较大的出错可能，目前不打算做一键提交功能，请手动核实后自行提交。
                \n网页版不存在此功能，所以此为高级会员功能，开发不易，目前暂时对所有用户开放，觉得有用可支持一下。`),
                [
                  {
                    text: s2tAsync('关于会员'),
                    onPress: () => navigation.push('Qiafan')
                  },
                  {
                    text: s2tAsync('确定'),
                    onPress: () => {}
                  }
                ]
              )
            }}
          />
        </Flex>
      )}
    />
  )
}

export default obc(Header)
