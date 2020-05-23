/*
 * @Author: czy0729
 * @Date: 2019-07-28 16:42:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-24 00:36:57
 */
import React from 'react'
import { View, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { ActivityIndicator } from '@ant-design/react-native'
import { Flex, Empty } from '@components'
import { Pagination, ItemSearch, ItemCollectionsGrid } from '@screens/_'
import { _ } from '@stores'
import { observer } from '@utils/decorators'

const event = {
  id: '排行榜.跳转'
}

export default
@observer
class List extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  renderPagination() {
    const { $ } = this.context
    const { type, ipt } = $.state
    return (
      <Pagination
        input={ipt[type]}
        onPrev={$.prev}
        onNext={$.next}
        onChange={$.onChange}
        onSearch={$.doSearch}
      />
    )
  }

  renderList() {
    const { $, navigation } = this.context
    const { list } = $.rank
    return (
      <View style={this.styles.list}>
        {list.length ? (
          list.map((item, index) => (
            <ItemSearch
              key={item.id}
              style={_.container.item}
              navigation={navigation}
              index={index}
              event={{
                ...event,
                data: {
                  type: 'list'
                }
              }}
              {...item}
            />
          ))
        ) : (
          <Empty />
        )}
      </View>
    )
  }

  renderGrid() {
    const { $, navigation } = this.context
    const { list } = $.rank
    return (
      <Flex style={this.styles.grid} wrap='wrap'>
        {list.length ? (
          list.map((item, index) => (
            <ItemCollectionsGrid
              key={item.id}
              style={this.styles.itemGird}
              navigation={navigation}
              index={index}
              event={{
                ...event,
                data: {
                  type: 'grid'
                }
              }}
              {...item}
              id={item.id.replace('/subject/', '')}
              showScore
            />
          ))
        ) : (
          <Empty />
        )}
      </Flex>
    )
  }

  render() {
    const { $ } = this.context
    const { show, list: _list } = $.state
    const { _loaded } = $.rank
    return (
      <ScrollView contentContainerStyle={this.styles.container}>
        {this.renderPagination()}
        {show && (
          <>
            {_loaded ? (
              _list ? (
                this.renderList()
              ) : (
                this.renderGrid()
              )
            ) : (
              <Flex style={this.styles.loading} justify='center'>
                <ActivityIndicator />
              </Flex>
            )}
            {this.renderPagination()}
          </>
        )}
      </ScrollView>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingBottom: _.bottom,
    minHeight: _.window.height
  },
  list: {
    paddingVertical: _.md
  },
  grid: {
    paddingVertical: _.md,
    paddingHorizontal: _.wind - _._wind
  },
  loading: {
    paddingTop: _.md,
    paddingBottom: 240,
    minHeight: _.window.height
  },
  itemGird: {
    height: 124
  }
}))
