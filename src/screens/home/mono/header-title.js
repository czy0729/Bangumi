/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-09 20:30:21
 */
import React from 'react'
import { FadeIn, Flex, Text } from '@components'
import { Cover } from '@screens/_'
import Stores, { _ } from '@stores'
import { urlStringify } from '@utils'
import { memo, ob } from '@utils/decorators'

const routeName = 'Mono'
const imgWidth = 28
const defaultProps = {
  showHeaderTitle: false,
  tinygrail: false,
  cover: '',
  nameTop: '',
  nameBottom: ''
}

const HeaderTitle = memo(
  ({ showHeaderTitle, tinygrail, cover, nameTop, nameBottom }) => {
    rerender('Mono.HeaderTitle.Main')

    return (
      <FadeIn show={showHeaderTitle}>
        <Flex style={[styles.container, tinygrail && styles.containerTinygrail]}>
          {!!cover && (
            <Cover size={imgWidth} src={cover.replace('/m/', '/s/')} radius />
          )}
          <Flex.Item style={_.ml.sm}>
            <Text size={13} numberOfLines={1}>
              {nameTop}
            </Text>
            {!!nameBottom && (
              <Text type='sub' size={10} numberOfLines={1}>
                {nameBottom}
              </Text>
            )}
          </Flex.Item>
        </Flex>
      </FadeIn>
    )
  },
  defaultProps
)

export default ob(({ navigation }) => {
  rerender('Mono.HeaderTitle')

  const { state = {} } = navigation
  const { params = {} } = state
  const { monoId } = params
  const screenKey = `${routeName}?${urlStringify({
    monoId
  })}`
  const $ = Stores.get(screenKey)
  if (!$) return null

  return (
    <HeaderTitle
      showHeaderTitle={$.state.showHeaderTitle}
      cover={$.cover}
      tinygrail={$.tinygrail}
      nameTop={$.nameTop}
      nameBottom={$.nameBottom}
    />
  )
})

const styles = _.create({
  container: {
    marginLeft: -_.sm,
    marginRight: _.lg
  },
  containerTinygrail: {
    marginRight: 52
  }
})
