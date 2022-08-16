/*
 * @Author: czy0729
 * @Date: 2020-04-04 16:14:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-16 16:06:52
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView, Pagination, Loading } from '@components'
import { ItemBlog } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

const event = {
  id: '全站日志.跳转'
}

const heatmaps = {
  prev: '全站日志.上一页',
  next: '全站日志.下一页',
  search: '全站日志.页码跳转'
}

class List extends React.Component {
  renderPagination() {
    const { $ } = this.context
    const { type } = this.props
    const { ipt } = $.state
    return (
      <Pagination
        style={this.styles.pagination}
        input={ipt[type]}
        heatmaps={heatmaps}
        onPrev={$.prev}
        onNext={$.next}
        onChange={$.onChange}
        onSearch={$.doSearch}
      />
    )
  }

  render() {
    const { $, navigation } = this.context
    const { type } = this.props
    const { show } = $.state
    const { list, _loaded } = $.blog(type)
    return (
      <>
        <ScrollView scrollToTop={type === $.type}>
          {show && (
            <>
              {_loaded ? (
                <View style={this.styles.container}>
                  {list.map((item, index) => (
                    <ItemBlog
                      key={item.id}
                      style={_.container.item}
                      navigation={navigation}
                      event={event}
                      index={index}
                      {...item}
                    />
                  ))}
                </View>
              ) : (
                <View style={this.styles.container}>
                  <Loading />
                </View>
              )}
            </>
          )}
        </ScrollView>
        {this.renderPagination()}
      </>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default obc(List)

const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: _.window.height
  },
  pagination: {
    marginTop: _.xs,
    marginBottom: _.ios(_.md + _.sm, _.md)
  }
}))
