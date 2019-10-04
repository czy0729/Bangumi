/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:57:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-25 14:45:43
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import { ItemCollections, ItemCollectionsGrid } from '@screens/_'
import { MODEL_COLLECTION_STATUS } from '@constants/model'
import _ from '@styles'

class List extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  state = {
    // @issue 列表的滚回顶部scrollToLocation不知道如何正确使用
    // 暂时使用重新渲染的办法解决列表变换置顶问题
    hide: false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.subjectType !== this.props.subjectType) {
      this.setState({
        hide: true
      })
      setTimeout(() => {
        this.setState({
          hide: false
        })
      }, 0)
    }
  }

  render() {
    const { $, navigation } = this.context
    const { subjectType, title, ...other } = this.props
    const { hide } = this.state
    if (hide) {
      return null
    }
    const userCollections = $.userCollections(
      subjectType,
      MODEL_COLLECTION_STATUS.getValue(title)
    )

    if (!userCollections._loaded) {
      return <Loading />
    }

    const { list } = $.state
    const numColumns = list ? undefined : 4
    const isOnHold = $.type === 'on_hold'
    return (
      <ListView
        key={String(numColumns)}
        numColumns={numColumns}
        contentContainerStyle={_.container.bottom}
        keyExtractor={item => item.id}
        data={userCollections}
        renderItem={({ item, index }) =>
          list ? (
            <ItemCollections
              navigation={navigation}
              index={index}
              isOnHold={isOnHold}
              {...item}
            />
          ) : (
            <ItemCollectionsGrid
              navigation={navigation}
              index={index}
              isOnHold={isOnHold}
              {...item}
            />
          )
        }
        onHeaderRefresh={() => $.fetchUserCollections(true)}
        onFooterRefresh={$.fetchUserCollections}
        {...other}
      />
    )
  }
}

export default observer(List)
