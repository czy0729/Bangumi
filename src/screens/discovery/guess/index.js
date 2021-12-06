/*
 * @Author: czy0729
 * @Date: 2021-02-03 22:47:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-06 07:35:56
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView, Loading } from '@components'
import { IconHeader, Pagination } from '@screens/_'
import { _ } from '@stores'
import { runAfter } from '@utils'
import { inject, obc, withHeader } from '@utils/decorators'
import { t } from '@utils/fetch'
import Type from './type'
import Item from './item'
import Store from './store'

const title = '推荐'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['guess', 'Guess']
})
@obc
class Guess extends React.Component {
  state = {
    rendered: false
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
      extra: (
        <>
          <Type $={$} />
          <IconHeader
            style={_.mr._right}
            name='md-refresh'
            onPress={() => {
              t('推荐.刷新')
              $.getList()
            }}
          />
        </>
      )
    })

    runAfter(() => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          this.setState({
            rendered: true
          })
        }, 160)
      })
    })
  }

  get list() {
    const { $ } = this.context
    const { rendered } = this.state
    if (!rendered) return $.list.slice(0, 2)
    return $.list
  }

  render() {
    const { $ } = this.context
    const { show, page } = $.state
    return (
      <View style={_.container.plain}>
        {show ? (
          <ScrollView contentContainerStyle={_.container.bottom} scrollToTop>
            <View style={styles.container}>
              {this.list.map(item => (
                <Item key={item.id} {...item} />
              ))}
            </View>
            <Pagination
              style={_.mt.md}
              input={String(page)}
              onPrev={$.prev}
              onNext={$.next}
              onChange={$.onChange}
            />
          </ScrollView>
        ) : (
          <Loading />
        )}
      </View>
    )
  }
}

const styles = _.create({
  container: {
    minHeight: _.window.height
  }
})
