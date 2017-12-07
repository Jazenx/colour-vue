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

export function bannedAndSubmit(nameList) {
  return fetch({
    url: 'review/WaterArmy/banurl',
    method: 'post',
    data: {
      nameList
    }
  })
}


export function getPostList(userid) {
  return fetch({
    url: 'review/WaterArmy/post',
    method: 'post',
    data: {
      userid
    }
  })
}

export function getPostSimilarity(query) {
  return fetch({
    url: 'review/WaterArmy/Similarity',
    method: 'post',
    data: {
      query
    }
  })
}
