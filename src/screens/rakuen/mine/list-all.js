/*
 * @Author: czy0729
 * @Date: 2022-02-25 12:31:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-02-25 14:05:21
 */
import React from 'react'
import { PaginationList } from '@_'
import { _ } from '@stores'
import { pad } from '@utils'
import { obc } from '@utils/decorators'
import data from '@constants/json/group'
import Filter from './filter'
import Item from './item'

const ListAll = (props, { $ }) => {
  const { filter } = $.state
  return (
    <>
      <Filter />
      <PaginationList
        style={styles.list}
        contentContainerStyle={_.container.outer}
        data={
          filter
            ? data.filter(item => item.t.toLowerCase().includes(filter.toLowerCase()))
            : data
        }
        numColumns={2}
        renderItem={renderItem}
      />
    </>
  )
}

export default obc(ListAll)

const styles = _.create({
  list: {
    marginTop: -8
  }
})

function getCoverById(id) {
  if (!id) return ''

  const h = String(parseInt(id / 100))
  return `https://lain.bgm.tv/pic/icon/m/000/00/${pad(h)}/${id}.jpg`
}

const renderItem = ({ item }) => (
  <Item id={item.i || item.u} name={item.t} cover={getCoverById(item.i)} num={item.n} />
)
