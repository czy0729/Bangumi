/*
 * @Author: czy0729
 * @Date: 2020-04-04 16:14:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 13:55:26
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView, Pagination, Loading } from '@components'
import { ItemBlog } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { SubjectType } from '@types'
import { Ctx } from '../types'
import { EVENT, HEATMAPS } from './ds'
import { memoStyles } from './styles'

class List extends React.Component<{
  type: SubjectType | 'all'
}> {
  renderPagination() {
    const { $ }: Ctx = this.context
    const { type } = this.props
    const { ipt } = $.state
    return (
      <Pagination
        style={this.styles.pagination}
        input={ipt[type]}
        heatmaps={HEATMAPS}
        onPrev={$.prev}
        onNext={$.next}
        onChange={$.onChange}
        onSearch={$.doSearch}
      />
    )
  }

  render() {
    const { $ }: Ctx = this.context
    const { type } = this.props
    const { show } = $.state
    const { list, _loaded } = $.blog(type)
    return (
      <>
        <ScrollView scrollToTop={type === $.type} keyboardDismissMode='on-drag'>
          {show && (
            <>
              {_loaded ? (
                <View style={this.styles.container}>
                  {list.map(item => (
                    <ItemBlog
                      key={item.id}
                      style={_.container.item}
                      event={EVENT}
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
