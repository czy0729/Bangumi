/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:02:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-03 11:54:42
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Image, Text } from '@components'
import { _ } from '@stores'

function Head({ style }, { $ }) {
  const styles = memoStyles()
  const { avatar = {}, nickname, id } = $.usersInfo
  return (
    <Flex
      style={style}
      justify='center'
      direction='column'
      pointerEvents='none'
    >
      <Image style={[styles.avatar, _.mt.md]} size={80} src={avatar.large} />
      <Text style={_.mt.md} type={_.select('plain', 'title')} size={16}>
        {nickname}
        <Text
          style={styles.id}
          type={_.select('plain', 'title')}
          lineHeight={16}
        >
          {' '}
          {id ? `@${id}` : ''}
        </Text>
      </Text>
    </Flex>
  )
}

Head.contextTypes = {
  $: PropTypes.object
}

export default observer(Head)

const memoStyles = _.memoStyles(_ => ({
  avatar: {
    borderWidth: 2,
    borderColor: _.colorIconPlain,
    borderRadius: 80,
    overflow: 'hidden'
  },
  id: {
    opacity: 0.88
  }
}))
