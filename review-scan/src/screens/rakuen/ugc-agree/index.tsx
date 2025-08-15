/*
 * @Author: czy0729
 * @Date: 2019-08-31 15:45:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 02:23:39
 */
import React from 'react'
import { Button, Flex, RenderHtml, ScrollView } from '@components'
import { _, systemStore } from '@stores'
import { appNavigate } from '@utils/app'
import { ob, withHeader } from '@utils/decorators'
import { t } from '@utils/fetch'
import { NavigationProps } from '@types'
import { HTML } from './ds'
import { memoStyles } from './styles'

const title = '社区指导原则'

class UGCAgree extends React.Component<NavigationProps> {
  updateUGCAgree = (value: boolean) => {
    const { navigation } = this.props
    systemStore.updateUGCAgree(value)

    if (value) {
      const topicId = navigation.getParam('topicId')
      if (topicId) {
        navigation.goBack()
        setTimeout(() => {
          navigation.push('Topic', {
            topicId
          })
        }, 300)
        return
      }

      const blogId = navigation.getParam('blogId')
      if (blogId) {
        navigation.goBack()
        setTimeout(() => {
          navigation.push('Blog', {
            blogId
          })
        }, 300)
        return
      }
    }

    navigation.goBack()
  }

  render() {
    const { navigation } = this.props
    return (
      <ScrollView
        style={[_.container.screen, _.container.outer]}
        contentContainerStyle={_.container.bottom}
        scrollToTop
      >
        <RenderHtml
          html={HTML}
          baseFontStyle={this.styles.baseFontStyle}
          onLinkPress={href =>
            appNavigate(
              href,
              navigation,
              {},
              {
                id: '社区指导原则.跳转'
              }
            )
          }
        />
        <Flex style={_.mt.lg}>
          <Flex.Item>
            <Button
              onPress={() => {
                t('社区指导原则.不同意')
                this.updateUGCAgree(false)
              }}
            >
              不同意
            </Button>
          </Flex.Item>
          <Flex.Item style={_.ml.md}>
            <Button
              type='ghostSuccess'
              onPress={() => {
                t('社区指导原则.同意')
                this.updateUGCAgree(true)
              }}
            >
              知悉并同意
            </Button>
          </Flex.Item>
        </Flex>
      </ScrollView>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default withHeader({
  screen: title,
  hm: ['about/guideline', 'UGCAgree']
})(ob(UGCAgree))
