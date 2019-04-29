/*
 * @Author: czy0729
 * @Date: 2019-04-27 19:30:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-29 16:56:41
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import { appNavigate } from '@utils/app'
import { MODEL_RAKUEN_TYPE } from '@constants/model'
import { listViewWithTabsHeaderProps } from '@styles/commonProps'
import Item from './item'

const List = ({ type }, { $ }) => {
  const rakuen = $.rakuen(MODEL_RAKUEN_TYPE.getValue(type))
  if (!rakuen._loaded) {
    return <Loading />
  }

  return (
    <ListView
      keyExtractor={item => item.href}
      data={rakuen}
      renderItem={({ item, index }) => (
        <Item
          isFirst={index === 0}
          {...item}
          onPress={() => appNavigate(item.href)}
        />
      )}
      onHeaderRefresh={() => $.fetchRakuen(true)}
      onFooterRefresh={$.fetchRakuen}
      {...listViewWithTabsHeaderProps}
    />
  )
}

List.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(List)
