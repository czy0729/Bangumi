/*
 * @Author: czy0729
 * @Date: 2019-05-11 04:19:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-18 15:32:56
 */
import React from 'react'
import PropTypes from 'prop-types'
import { ListView } from '@components'
import { ItemTopic, IconHeader, NavigationBarEvents } from '@screens/_'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withTransitionHeader, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { HOST } from '@constants'
import Info from './info'
import Store from './store'

const title = '人物'

export default
@inject(Store)
@withTransitionHeader({
  screen: title,
  barStyle: 'dark-content'
})
@observer
class Mono extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  async componentDidMount() {
    const { $ } = this.context
    if ($.mono._loaded && $.chara._loaded) {
      this.updateNavigation()
    }

    await $.init()
    this.updateNavigation()

    const { monoId } = $.params
    hm(monoId, 'Mono')
  }

  updateNavigation = () => {
    const { $, navigation } = this.context
    const { name } = $.mono
    withTransitionHeader.setTitle(navigation, name)

    const { monoId } = $.params
    navigation.setParams({
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          switch (key) {
            case '浏览器查看':
              open(`${HOST}/${monoId}`)
              break
            default:
              break
          }
        }
      },
      extra: $.tinygrail && !!$.chara._loaded && (
        <IconHeader
          name='trophy-full'
          color={_.colorYellow}
          onPress={() =>
            navigation.push(
              $.chara.users ? 'TinygrailICODeal' : 'TinygrailTrade',
              {
                monoId
              }
            )
          }
        />
      )
    })
  }

  render() {
    const { $, navigation } = this.context
    const { onScroll } = this.props
    return (
      <>
        <NavigationBarEvents />
        <ListView
          style={this.styles.container}
          contentContainerStyle={this.styles.contentContainerStyle}
          keyExtractor={item => String(item.id)}
          data={$.monoComments}
          scrollEventThrottle={32}
          ListHeaderComponent={<Info />}
          renderItem={({ item, index }) => (
            <ItemTopic navigation={navigation} index={index} {...item} />
          )}
          onScroll={onScroll}
          onHeaderRefresh={() => $.fetchMono(true)}
          onFooterRefresh={$.fetchMono}
          {...withTransitionHeader.listViewProps}
        />
      </>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  container: {
    flex: 1,
    backgroundColor: _.colorPlain
  },
  contentContainerStyle: {
    paddingBottom: _.space
  }
}))
