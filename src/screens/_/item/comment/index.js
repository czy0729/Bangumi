/*
 * @Author: czy0729
 * @Date: 2019-04-10 22:40:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-10 20:27:13
 */
import React from 'react'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import Main from './index.main'

export const ItemComment = ob(props => (
  <Main styles={memoStyles()} flat={_.flat} {...props} />
))

const memoStyles = _.memoStyles(_ => ({
  item: {
    backgroundColor: _.colorPlain
  },
  image: {
    marginTop: _.md,
    marginLeft: _.wind
  },
  content: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  }
}))
