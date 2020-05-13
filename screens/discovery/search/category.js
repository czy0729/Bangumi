/*
 * @Author: czy0729
 * @Date: 2019-05-16 01:46:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-13 16:54:31
 */
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Button } from '@components'
import { Popover } from '@screens/_'
import { observer } from '@utils/decorators'
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
    </Popover>
  )
}

Category.contextTypes = {
  $: PropTypes.object
}

export default observer(Category)

const styles = StyleSheet.create({
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
