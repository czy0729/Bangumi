/*
 * @Author: czy0729
 * @Date: 2020-05-02 15:54:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 00:27:00
 */
import React from 'react'
import { Loading, ListView, Heatmap } from '@components'
import { ItemCatalog } from '@screens/_'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, obc } from '@utils/decorators'
import { t, hm } from '@utils/fetch'
import { keyExtractor } from '@utils/app'
import Store from './store'

const title = '条目目录'
const event = {
  id: '条目目录.跳转'
}

export default
@inject(Store)
@withHeader({
  screen: title
})
@obc
class SubjectCatalogs extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { name } = navigation.state.params
    return {
      title: name ? `包含${name}的目录` : title
    }
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
      heatmap: '条目目录.右上角菜单',
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          t('条目目录.右上角菜单', {
            key
          })

          switch (key) {
            case '浏览器查看':
              open($.url)
              break

            default:
              break
          }
        }
      }
    })

    hm(`subject/${$.subjectId}/index`, 'SubjectCatalogs')
  }

  renderItem = ({ item, index }) => {
    const { navigation } = this.context
    return (
      <ItemCatalog
        navigation={navigation}
        event={event}
        isUser
        id={item.id}
        name={item.userName}
        title={item.title}
        last={item.time}
      >
        {!index && <Heatmap id='条目目录.跳转' />}
      </ItemCatalog>
    )
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.list
    if (!_loaded) {
      return <Loading style={_.container.plain} />
    }

    return (
      <>
        <ListView
          style={_.container.plain}
          contentContainerStyle={_.container.bottom}
          keyExtractor={keyExtractor}
          data={$.list}
          renderItem={this.renderItem}
          scrollToTop
          onHeaderRefresh={() => $.fetchSubjectCatalogs(true)}
          onFooterRefresh={$.fetchSubjectCatalogs}
        />
        <Heatmap bottom={_.bottom} id='条目目录' screen='SubjectCatalogs' />
      </>
    )
  }
}
