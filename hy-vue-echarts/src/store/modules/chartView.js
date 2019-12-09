export default {
  namespaced: true,

  state: {
    selectIndex: 0,
    selectTables: ['图标标题-1', '图标标题-2'],
    dimension: {
      id1: {
        name: '电影',
        icon: 'el-icon-syllable',
        showScreenComponent: 'showScreen',
        showAlert: false,
      },
      id2: {
        name: '电影类型',
        icon: 'el-icon-syllable',
        showScreenComponent: 'showScreen',
        showAlert: false,
      },
      id3: {
        name: '影院',
        icon: 'el-icon-syllable',
        showScreenComponent: 'showScreen',
        showAlert: false,
      },
      id4: {
        name: '院线',
        icon: 'el-icon-syllable',
        showScreenComponent: 'showScreen',
        showAlert: false,
      },
      id5: {
        name: '省份',
        icon: 'el-icon-geography',
        showScreenComponent: 'showScreen',
        showAlert: false,
      },
      id6: {
        name: '城市',
        icon: 'el-icon-geography',
        showScreenComponent: 'showScreen',
        showAlert: false,
      },
      id7: {
        name: '投资规模',
        icon: 'el-icon-syllable',
        showScreenComponent: 'showScreen',
        showAlert: false,
      },
      id8: {
        name: '日期',
        icon: 'el-icon-AllDay',
        showScreenComponent: 'showScreen',
        showAlert: false,
      },
      id9: {
        name: '制式',
        icon: 'el-icon-syllable',
        showScreenComponent: 'showScreen',
        showAlert: false,
      },
      id10: {
        name: '片种',
        icon: 'el-icon-syllable',
        showScreenComponent: 'showScreen',
        showAlert: false,
      },
      id11: {
        name: '电影类型',
        icon: 'el-icon-syllable',
        showScreenComponent: 'showScreen',
        showAlert: false,
      },
    },
    measure: {
      id80: {
        name: '票房',
        icon: 'el-icon-showNumber',
        showScreenComponent: 'showScreen',
        showAlert: false,
      },
      id81: {
        name: '排座',
        icon: 'el-icon-showNumber',
        showScreenComponent: 'showScreen',
        showAlert: false,
      },
      id82: {
        name: '人次',
        icon: 'el-icon-showNumber',
        showScreenComponent: 'showScreen',
        showAlert: false,
      },
      id83: {
        name: '排片',
        icon: 'el-icon-showNumber',
        showScreenComponent: 'showScreen',
        showAlert: false,
      },
      id84: {
        name: '票房占比',
        icon: 'el-icon-showNumber',
        showScreenComponent: 'showScreen',
        showAlert: false,
      },
      id85: {
        name: '排座占比',
        icon: 'el-icon-showNumber',
        showScreenComponent: 'showScreen',
        showAlert: false,
      },
      id86: {
        name: '人次占比',
        icon: 'el-icon-showNumber',
        showScreenComponent: 'showScreen',
        showAlert: false,
      },
      id87: {
        name: '排片占比',
        icon: 'el-icon-showNumber',
        showScreenComponent: 'showScreen',
        showAlert: false,
      },
    },
    tools: {
      toolbar: {
        id60: {
          name: '左箭头',
          icon: 'el-icon-i_5017',
          icon2: 'el-icon-i_5016',
          click: false,
        },
        id61: {
          name: '右箭头',
          icon: 'el-icon-i_5015',
          icon2: 'el-icon-i_5014',
          click: false,
        },
        id62: {
          name: '保存',
          icon: 'el-icon-saveIcon',
          icon2: 'el-icon-saveIcon',
          click: false,
        },
        id63: {
          name: '添加',
          icon: 'el-icon-i_5003',
          icon2: 'el-icon-i_5003',
          click: false,
        },
        id64: {
          name: '复制工作表',
          icon: 'el-icon-i_5004',
          icon2: 'el-icon-i_5005',
          click: false,
        },
        id65: {
          name: '删除',
          icon: 'el-icon-i_5006',
          icon2: 'el-icon-i_5007',
          click: false,
        },
        id66: {
          name: '转换行列',
          icon: 'el-icon-i_5008',
          icon2: 'el-icon-i_5009',
          click: false,
        },
        id67: {
          name: '升序',
          icon: 'el-icon-i_5010',
          icon2: 'el-icon-i_5011',
          click: false,
        },
        id68: {
          name: '降序',
          icon: 'el-icon-i_5012',
          icon2: 'el-icon-i_5013',
          click: false,
        },
      },
      select: {
        id75: {
          name: '选择什么的连名字都不好取',
          index: '1',
          options: {
            1: {
              name: '标准'
            },
            2: {
              name: '非标准'
            }
          }
        }
      },
    }

  },

  mutations: {
    setSelectIndex (store, index) {
      store.selectIndex = index
    },
    addSelectTables (store, title) {
      typeof title !== 'string' ? title = null : title
      store.selectTables.push(title || `图标标题-${store.selectTables.length + 1}`)
      store.selectIndex = store.selectTables.length - 1
    },
    setStyle (store, {key, b}) {
      if (store.dimension[key]) {
        store.dimension[key].showAlert = b
      }
      if (store.measure[key]) {
        store.measure[key].showAlert = b
      }
    },
    setToolsBar (store, {key}) {
      store.tools.toolbar[key].click = !store.tools.toolbar[key].click
    },
    setToolsSelect (store, {key, index}) {
      store.tools.select[key].index = index
    }
  },
}
