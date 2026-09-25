/*
 * @Author: czy0729
 * @Date: 2023-01-07 21:53:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-07 21:53:19
 */

/** 奖牌配色: main 牌面、edge 内圈与牌边、ribbon 挂带, 明暗各一组 */
export const MEDAL_COLORS = {
  gold: {
    light: {
      main: '#F5C33B',
      edge: '#C08A18',
      ribbon: '#E2574C'
    },
    dark: {
      main: '#FFD45E',
      edge: '#D9A03C',
      ribbon: '#F2695E'
    }
  },
  silver: {
    light: {
      main: '#D8DCE2',
      edge: '#9BA3AF',
      ribbon: '#5B8DEF'
    },
    dark: {
      main: '#E6EAF0',
      edge: '#AEB8C4',
      ribbon: '#7BA6F5'
    }
  },
  bronze: {
    light: {
      main: '#D89A63',
      edge: '#A26B38',
      ribbon: '#3FA97C'
    },
    dark: {
      main: '#E8AE77',
      edge: '#B87A46',
      ribbon: '#5CC093'
    }
  }
} as const
