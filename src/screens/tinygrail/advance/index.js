/*
 * @Author: czy0729
 * @Date: 2020-01-09 16:42:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 05:40:10
 */
import React from 'react'
import { Alert } from 'react-native'
import { Header, Page } from '@components'
import { IconHeader } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import StatusBarEvents from '@tinygrail/_/status-bar-events'
import Menus from './menus'

export default
@ob
class TinygrailAdvance extends React.Component {
  render() {
    const { navigation } = this.props
    return (
      <>
        <StatusBarEvents />
        <Header
          title='高级分析'
          hm={['tinygrail/advance', 'TinygrailAdvance']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
          headerRight={() => (
            <IconHeader
              name='md-info-outline'
              color={_.colorTinygrailPlain}
              onPress={() => {
                t('高级分析.提示')

                Alert.alert(
                  '提示',
                  '本栏目功能建立于作者自身想法, 核心基于角色股息, 仅供参考\n普通用户每个功能4小时内只能刷新1次\n高级用户为防止误刷新对服务器造成不必要的压力也有1分钟限制\n高级用户的定义为付过费的用户, 人工维护\n功能算法有更好的可以反馈',
                  [
                    {
                      text: '知道了'
                    }
                  ]
                )
              }}
            />
          )}
        />
        <Page style={this.styles.container}>
          <Menus navigation={navigation} />
        </Page>
      </>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(() => ({
  container: {
    flex: 1,
    backgroundColor: _.colorTinygrailContainer
  }
}))
