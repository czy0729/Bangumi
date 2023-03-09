/*
 * 暂时只对会影响到时间线的事件调用 webhook
 * @Author: czy0729
 * @Date: 2023-02-25 17:52:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-10 01:50:41
 */
/** 类型可以到下方文件查看 */
import { WebHookCollection, WebHookEp, WebHookSay } from '../src/utils/webhooks/types'

/** 判断调用参数是否符合预期 */
type Test<T extends (...args: any) => any> = {
  type: Parameters<T>[0]
  data: Parameters<T>[1]
}

/** ==================== 吐槽 ==================== */
/**
 * 新吐槽 (示例1)
 *
 * 今日咖啡：辛鹿 3号 神奇樱桃蜜柚
 * [回复](https://bgm.tv/user/sukaretto/timeline/status/33457566) 30秒前
 * */
export const say_1: Test<WebHookSay> = {
  type: 'say',
  data: {
    content: '今日咖啡：辛鹿 3号 神奇樱桃蜜柚',
    url: 'https://bgm.tv/user/sukaretto/timeline/status/33457566',
    user: {
      id: 456208,
      username: 'sukaretto',
      avatar: 'http://lain.bgm.tv/pic/user/l/000/45/62/456208.jpg?r=1677056307&hd=1',
      nickname: '咕咕子❶',
      sign: '✨️make bangumi great again✨️'
    },
    ts: 1678363424
  }
}

/** 新签名 (暂无) */

/** ==================== 收藏 ==================== */
/**
 * 更新收藏 (示例1)
 *
 * [咕咕子❶](https://bgm.tv/user/sukaretto) 看过 [异世界舅舅](https://bgm.tv/subject/339326)
 * 30秒前
 * */
export const collection_1: Test<WebHookCollection> = {
  type: 'collection',
  data: {
    type: 3,
    rate: 0,
    comment: '',
    private: true,
    tags: ['2023年1月', '旭production', '原创'],
    subject: {
      id: 403020,
      image: 'http://lain.bgm.tv/pic/cover/c/86/f8/403020_8njtt.jpg',
      name: 'アルスの巨獣',
      name_cn: '阿鲁斯的巨兽',
      type: 2,
      rating: {
        rank: 6377,
        total: 318,
        score: 5.9
      },
      eps: 12
    },
    user: {
      id: 456208,
      username: 'sukaretto',
      avatar: 'http://lain.bgm.tv/pic/user/l/000/45/62/456208.jpg?r=1677056307&hd=1',
      nickname: '咕咕子❶',
      sign: '✨️make bangumi great again✨️'
    },
    ts: 1678384195
  }
}

/**
 * 更新收藏 (示例2)
 *
 * [咕咕子❶](https://bgm.tv/user/sukaretto) 在玩 [KINGDOM HEARTS Melody of Memory](https://bgm.tv/subject/313864)
 * KH系列音乐本来就足够好，底子就已经比很多其他改音游的高。...
 * 30秒前 ★★★★☆
 * */
export const collection_2: Test<WebHookCollection> = {
  type: 'collection',
  data: {
    type: 3,
    rate: 8,
    comment: 'KH系列音乐本来就足够好，底子就已经比很多其他改音游的高。...',
    private: false,
    tags: ['2020', 'PS4'],
    subject: {
      id: 313864,
      image: 'http://lain.bgm.tv/pic/cover/c/42/e1/313864_qBmb5.jpg',
      name: 'KINGDOM HEARTS Melody of Memory',
      name_cn: '王国之心：记忆旋律',
      type: 4,
      rating: {
        rank: 0,
        total: 12,
        score: 6.6
      },
      eps: ''
    },
    user: {
      id: 456208,
      username: 'sukaretto',
      avatar: 'http://lain.bgm.tv/pic/user/l/000/45/62/456208.jpg?r=1677056307&hd=1',
      nickname: '咕咕子❶',
      sign: '✨️make bangumi great again✨️'
    },
    ts: 1678364042
  }
}

/** ==================== 进度 ==================== */
/**
 * 更新章节 (示例1: 单集更新)
 *
 * [咕咕子❶](https://bgm.tv/user/sukaretto) 看过 [ep13 感谢大家的一路陪伴](https://bgm.tv/ep/1116553)
 * [异世界舅舅](https://bgm.tv/subject/339326)
 * 30秒前
 * */
export const ep_1: Test<WebHookEp> = {
  type: 'ep',
  data: {
    type: 2,
    batch: false,
    eps: 13,
    ep: {
      id: 1116553,
      airdate: '2023-03-08',
      name: '',
      name_cn: '感谢大家的一路陪伴',
      duration: '00:23:40',
      comment: 195
    },
    subject: {
      id: 339326,
      image: 'http://lain.bgm.tv/pic/cover/c/1a/75/339326_v466V.jpg',
      name: '異世界おじさん',
      name_cn: '异世界舅舅',
      type: 2,
      rating: {
        rank: 516,
        total: 5019,
        score: 7.7
      },
      eps: 13
    },
    user: {
      id: 456208,
      username: 'sukaretto',
      avatar: 'http://lain.bgm.tv/pic/user/l/000/45/62/456208.jpg?r=1677056307&hd=1',
      nickname: '咕咕子❶',
      sign: '✨️make bangumi great again✨️'
    },
    ts: 1678355170
  }
}

/**
 * 更新章节 (示例2: 看到)
 *
 * [咕咕子❶](https://bgm.tv/user/sukaretto) 完成了 [异世界舅舅](https://bgm.tv/subject/339326) 13 of 13 话
 * 30秒前
 * */
export const ep_2: Test<WebHookEp> = {
  type: 'ep',
  data: {
    type: 0,
    batch: true,
    eps: 13,
    vols: undefined,
    ep: {
      id: 1116553,
      airdate: '2023-03-08',
      name: '',
      name_cn: '感谢大家的一路陪伴',
      duration: '00:23:40',
      comment: 195
    },
    subject: {
      id: 339326,
      image: 'http://lain.bgm.tv/pic/cover/c/1a/75/339326_v466V.jpg',
      name: '異世界おじさん',
      name_cn: '异世界舅舅',
      type: 2,
      rating: {
        rank: 516,
        total: 5019,
        score: 7.7
      },
      eps: 13
    },
    user: {
      id: 456208,
      username: 'sukaretto',
      avatar: 'http://lain.bgm.tv/pic/user/l/000/45/62/456208.jpg?r=1677056307&hd=1',
      nickname: '咕咕子❶',
      sign: '✨️make bangumi great again✨️'
    },
    ts: 1678353656
  }
}

/**
 * 更新章节 (示例3: 漫画看过)
 *
 * [咕咕子❶](https://bgm.tv/user/sukaretto) 读过 [彼女の友達](https://bgm.tv/subject/335152) 第3卷
 * 30秒前
 * */
export const ep_3: Test<WebHookEp> = {
  type: 'ep',
  data: {
    type: 2,
    batch: false,
    eps: 1,
    vols: 3,
    ep: {
      id: 0,
      airdate: '',
      name: '',
      name_cn: '',
      duration: '',
      comment: 0
    },
    subject: {
      id: 335152,
      image: 'http://lain.bgm.tv/pic/cover/c/41/19/335152_7K8pa.jpg',
      name: '彼女の友達',
      name_cn: '女友的朋友',
      type: 1,
      rating: {
        rank: 5690,
        total: 38,
        score: 5.3
      },
      eps: ''
    },
    user: {
      id: 456208,
      username: 'sukaretto',
      avatar: 'http://lain.bgm.tv/pic/user/l/000/45/62/456208.jpg?r=1677056307&hd=1',
      nickname: '咕咕子❶',
      sign: '✨️make bangumi great again✨️'
    },
    ts: 1678354667
  }
}

/** ==================== 日志 ==================== */
/** 新日志 (暂无) */

/** ==================== 人物 ==================== */
/** 收藏人物 */

/** 收藏角色 */

/** ==================== 好友 ==================== */
/** 加为好友 */

/** ==================== 小组 ==================== */
/** 加入小组 */

/** ==================== 维基 ==================== */
/** 创建条目 (暂无) */

/** ==================== 目录 ==================== */
/** 创建目录 */

/** 收藏目录 */
