/*
 * @Author: czy0729
 * @Date: 2019-11-28 16:57:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-28 23:25:56
 */
import React from 'react'
import PropTypes from 'prop-types'
import { ListView } from '@components'
import { SectionHeader } from '@screens/_'
import { inject, withHeader, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import _ from '@styles'
import IconFavor from './icon-favor'
import Item from './item'
import Store from './store'

const title = '本地帖子'

export default
@inject(Store)
@withHeader({
  screen: title
})
@observer
class RakuenHistory extends React.Component {
  static navigationOptions = {
    title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  async componentDidMount() {
    const { $, navigation } = this.context
    await $.init()
    navigation.setParams({
      extra: <IconFavor $={$} />
    })

    hm('rakuen/history', 'RakuenHistory')
  }

  render() {
    const { $ } = this.context
    return (
      <ListView
        key={$.sections.length}
        style={_.container.screen}
        keyExtractor={item => item.id}
        sections={$.sections}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader size={14}>{title}</SectionHeader>
        )}
        renderItem={({ item, index }) => (
          <Item key={item.topicId} index={index} {...item} />
        )}
      />
    )
  }
}
