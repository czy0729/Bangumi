/*
 * @Author: czy0729
 * @Date: 2020-10-29 20:49:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-12 20:07:00
 */
import React from 'react'
import PropTypes from 'prop-types'
import { ListView } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import { observer } from '@utils/decorators'
import Item from '../_/item'

const event = {
  id: '粘贴板.跳转'
}

function List(props, { $ }) {
  return (
    <ListView
      style={_.container.flex}
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      refreshControlProps={{
        color: _.colorTinygrailText
      }}
      footerTextType='tinygrailText'
      footerEmptyDataText='您可以复制带有bgm人物链接或id的文字, 进入本页面后会自动获取所有角色id, 获取角色数据并生成列表'
      data={$.list}
      scrollToTop
      renderItem={renderItem}
      onHeaderRefresh={$.fetchValhallList}
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

function renderItem({ item, index }) {
  return <Item index={index} event={event} {...item} />
}
