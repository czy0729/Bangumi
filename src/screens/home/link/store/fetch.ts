/*
 * @Author: czy0729
 * @Date: 2025-12-10 22:49:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-15 18:10:00
 */
import { collectionStore, subjectStore } from '@stores'
import { getTimestamp, queue } from '@utils'
import { xhrCustom } from '@utils/fetch'
import { HOST_DOGE } from '@constants'
import Computed from './computed'

import type { RelateMap } from '../types'

const mapMemoryCache = new Map<number, RelateMap>()

export default class Fetch extends Computed {
  fetchNode = async () => {
    if (this.state.map?._loaded && this.state.map?.node?.length) return true

    try {
      const nodeRes = await xhrCustom({
        url: `${HOST_DOGE}/bangumi-link/node/${Math.floor(Number(this.subjectId) / 1000)}/${
          this.subjectId
        }`
      })

      const nodeId = Number(nodeRes._response)
      if (nodeId) {
        let map = mapMemoryCache.get(nodeId)
        if (!map) {
          const mapRes = await xhrCustom({
            url: `${HOST_DOGE}/bangumi-link/map/${Math.floor(nodeId / 1000)}/${nodeId}.json`
          })

          map = JSON.parse(mapRes._response) as RelateMap
          mapMemoryCache.set(nodeId, map)
        }

        this.setState({
          map: {
            ...map,
            node: map.node
              .slice()
              .sort((a, b) => (a.date || '2099-12-31').localeCompare(b.date || '2099-12-31')),
            _loaded: getTimestamp()
          }
        })
      }
    } catch (error) {
      this.setState({
        error: true
      })
    }
    this.save()

    return true
  }

  fetchSubjects = async () => {
    const { node } = this.state.map
    if (!node?.length) return true

    await subjectStore.initSubjectV2(node.map(item => item.id))
    await queue(
      node.map(item => {
        if (subjectStore.cover(item.id)) return () => true

        return () => subjectStore.fetchSubjectV2(item.id)
      })
    )

    this.setState({
      map: {
        node: node
          .map(item => ({
            ...item,
            date: item.date || subjectStore.subjectV2(item.id)?.date || ''
          }))
          .slice()
          .sort((a, b) => (a.date || '2099-12-31').localeCompare(b.date || '2099-12-31')),
        _loaded: getTimestamp()
      }
    })

    return true
  }

  fetchCollection = async () => {
    const { node } = this.state.map
    if (!node?.length) return true

    return collectionStore.fetchCollectionStatusQueue(node.map(item => item.id))
  }
}
