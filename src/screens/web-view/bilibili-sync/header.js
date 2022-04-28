/*
 * @Author: czy0729
 * @Date: 2022-04-27 06:53:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-28 08:33:02
 */
import React from 'react'
import { Alert } from 'react-native'
import { Header as CompHeader, Flex } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function Header(props, { $, navigation }) {
  return (
    <CompHeader
      title='bilibili同步'
      hm={['bilibili-sync', 'BilibiliSync']}
      headerRight={() => (
        <Flex>
          <IconTouchable
            style={_.mr.xs}
            name='md-refresh'
            color={_.colorDesc}
            onPress={$.onToggleHide}
          />
          <IconTouchable
            name='md-info-outline'
            color={_.colorDesc}
            size={19}
            onPress={() =>
              Alert.alert(
                'bilibili同步',
                `此功能目前为实验性质。
                \n此功能涉及到第三方平台登录，作者保证不会窃取任何个人数据，若有异议请勿使用。
                \n因自动对比的数据存在较大的出错可能，目前不打算做一键提交功能，请手动核实后自行提交。
                \n部分僅限港澳台地區的番剧做了最低限度的模糊匹配，若连翻译名称都不一样的基本没可能匹配。
                \n网页版不存在此功能，所以此为高级会员功能，目前暂时对所有用户开放，觉得有用可支持一下。`,
                [
                  {
                    text: '关于会员',
                    onPress: () => navigation.push('Qiafan')
                  },
                  {
                    text: '确定',
                    onPress: () => {}
                  }
                ]
              )
            }
          />
        </Flex>
      )}
    />
  )
}

export default obc(Header)
