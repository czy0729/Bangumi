/*
 * @Author: czy0729
 * @Date: 2020-01-09 16:42:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-16 21:32:28
 */
import React from 'react'
import { HeaderV2, Page } from '@components'
import { IconHeader } from '@_'
import { _ } from '@stores'
import { alert } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Menus from './menus'
import { HM } from './ds'

/** 高级功能 */
const TinygrailAdvance = ({ navigation }: NavigationProps) => {
  return useObserver(() => (
    <>
      <Page style={[_.container.tinygrail, _.container.header]}>
        <Menus navigation={navigation} />
      </Page>
      <HeaderV2
        backgroundStyle={_.container.tinygrail}
        title='高级功能'
        hm={HM}
        headerRight={() => (
          <IconHeader
            name='md-info-outline'
            color={_.colorTinygrailPlain}
            onPress={() => {
              t('高级分析.提示')

              alert(
                '本栏目功能建立于作者自身想法, 核心基于角色股息, 仅供参考\n普通用户每个功能4小时内只能刷新1次\n高级用户为防止误刷新对服务器造成不必要的压力也有1分钟限制\n高级用户的定义为付过费的用户, 人工维护\n功能算法有更好的可以反馈'
              )
            }}
          />
        )}
      />
    </>
  ))
}

export default TinygrailAdvance
