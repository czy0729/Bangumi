/*
 * @Author: czy0729
 * @Date: 2020-07-28 11:50:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-26 20:55:33
 */
import React from 'react'
import { ListView, Loading, Heatmap } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import { obc } from '@utils/decorators'
import { MODEL_RATING_STATUS } from '@constants/model'
import Item from './item'
import { routes } from './store'

function List({ title }, { $ }) {
  const status = MODEL_RATING_STATUS.getValue(title)
  const data = $.rating(status)
  if (!data._loaded) {
    return <Loading />
  }

  const { isFriend, page } = $.state
  return (
    <ListView
      key={isFriend ? '1' : '0'}
      style={_.container.flex}
      contentContainerStyle={styles.contentContainerStyle}
      keyExtractor={keyExtractor}
      data={data}
      numColumns={2}
      scrollToTop={routes[page].title === title}
      renderItem={renderItem}
      onEndReachedThreshold={0.2}
      onHeaderRefresh={() => $.fetchRating(true)}
      onFooterRefresh={$.fetchRating}
    />
  )
}

export default obc(List)

function renderItem({ item, index }) {
  return (
    <>
      <Item {...item} />
      {!index && <Heatmap id='用户评分.跳转' />}
    </>
  )
}

const styles = _.create({
  contentContainerStyle: {
    paddingHorizontal: _.wind,
    paddingTop: _.space,
    paddingBottom: _.bottom,
    minHeight: _.window.height
  }
})
