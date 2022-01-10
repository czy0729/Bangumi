/*
 * @Author: czy0729
 * @Date: 2020-05-02 21:04:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-09 12:16:29
 */
import React from 'react'
import { observable, computed } from 'mobx'
import { IconHoriz } from '@_'
import { discoveryStore, collectionStore } from '@stores'
import { open } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { HTML_CHANNEL } from '@constants/html'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

export default class ScreenChannel extends store {
  state = observable({
    type: ''
  })

  setParams = navigation => {
    navigation.setParams({
      element: <IconHoriz name='md-menu' />,
      heatmap: '频道.右上角菜单',
      popover: {
        data: [...MODEL_SUBJECT_TYPE.data.map(item => item.title), '浏览器查看'],
        onSelect: key => {
          t('频道.右上角菜单', {
            key
          })

          switch (key) {
            case '浏览器查看':
              open(this.url)
              break

            default:
              setTimeout(() => {
                navigation.setParams({
                  title: `${key}频道`
                })
                this.toggleType(MODEL_SUBJECT_TYPE.getLabel(key))
              }, 40)
              break
          }
        }
      }
    })
  }

  init = () => {
    this.setState({
      type: this.type
    })
    this.fetchChannel()
  }

  // -------------------- get --------------------
  @computed get type() {
    const { type } = this.state
    return type || this.params.type
  }

  @computed get typeCn() {
    return MODEL_SUBJECT_TYPE.getTitle(this.type)
  }

  @computed get channel() {
    return discoveryStore.channel(this.type)
  }

  @computed get url() {
    return HTML_CHANNEL(this.type)
  }

  @computed get userCollectionsMap() {
    return collectionStore.userCollectionsMap
  }

  // -------------------- fetch --------------------
  fetchChannel = () =>
    discoveryStore.fetchChannel({
      type: this.type
    })

  // -------------------- page --------------------
  toggleType = type => {
    this.setState({
      type
    })
    this.fetchChannel()
  }
}
