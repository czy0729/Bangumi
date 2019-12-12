/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:13:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-12 20:16:28
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { withTabsHeader } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import Item from './item'

function List({ title }, { $ }) {
  if (!$.userCollection._loaded) {
    return <Loading />
  }

  // 置顶
  const { top } = $.state

  // 筛选当前类型
  const userCollection = {
    ...$.userCollection
  }
  const type = MODEL_SUBJECT_TYPE.getValue(title)
  if (type) {
    userCollection.list = userCollection.list.filter(
      item => item.subject.type == type
    )
  }
  userCollection.list = $.sortList(userCollection.list)
  return (
    <ListView
      contentContainerStyle={_.container.outer}
      keyExtractor={item => String(item.subject_id)}
      data={userCollection}
      renderItem={({ item }) => (
        <Item
          top={top.indexOf(item.subject_id) !== -1}
          subjectId={item.subject_id}
          subject={item.subject}
          epStatus={item.ep_status}
        />
      )}
      footerNoMoreDataText=''
      onHeaderRefresh={() => $.initFetch(true)}
      {...withTabsHeader.listViewProps}
    />
  )
}

List.defaultProps = {
  title: '全部'
}

List.contextTypes = {
  $: PropTypes.object
}

export default observer(List)
