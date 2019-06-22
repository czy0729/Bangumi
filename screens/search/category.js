/*
 * @Author: czy0729
 * @Date: 2019-05-16 01:46:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-22 14:51:07
 */
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Button } from '@components'
import { Popover } from '@screens/_'
import { observer } from '@utils/decorators'
import { MODEL_SEARCH_CAT } from '@constants/model'

const Category = (props, { $ }) => {
  const { cat } = $.state
  return (
    <Popover
      data={MODEL_SEARCH_CAT.data.map(item => item.label)}
      onSelect={$.onSelect}
    >
      <Button style={styles.btn} size='sm' type='ghostMain'>
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
    width: 72,
    height: 34,
    borderRadius: 64
  }
})
