import fetch from '@/utils/fetch'

export function getWaterArmyList(query, state) {
  return fetch({
    url: 'review/WaterArmy/list',
    method: 'post',
    data: {
      query,
      state
    }
  })
}
