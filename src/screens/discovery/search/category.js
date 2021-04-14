/*
 * @Author: czy0729
 * @Date: 2019-05-16 01:46:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-26 20:44:54
 */
import React from 'react'
import { Button, Heatmap } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_SEARCH_CAT } from '@constants/model'

const data = MODEL_SEARCH_CAT.data.map(item => item.label)

function Category(props, { $ }) {
  const { cat } = $.state
  return (
    <Popover data={data} onSelect={$.onSelect}>
      <Button
        style={styles.btn}
        styleText={styles.text}
        size='sm'
        type='ghostMain'
      >
        {MODEL_SEARCH_CAT.getLabel(cat)}
      </Button>
      <Heatmap id='搜索.切换类型' />
    </Popover>
  )
}

export default obc(Category)

const styles = _.create({
  btn: {
    width: 68,
    height: 34,
    paddingLeft: 4,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 34,
    borderBottomLeftRadius: 34
  },
  text: {
    width: 68
  }
})
