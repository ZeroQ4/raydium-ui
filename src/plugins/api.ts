import { Plugin } from '@nuxt/types'
import { NuxtApiInstance } from '@/types/api'

const VERSION = '1.1.0'

const apiPlugin: Plugin = (ctx, inject) => {
  const api: NuxtApiInstance = {
    getPrices: () => ctx.$axios.get('https://api.raydium.io/coin/price'),
    getInfo: () => ctx.$axios.get('https://api.raydium.io/info'),
    getPairs: () => ctx.$axios.get('https://api.raydium.io/pairs'),
    getConfig: () => ctx.$axios.get('https://api.raydium.io/config', { params: { v: VERSION } }),
    getEpochInfo: (rpc: string) => ctx.$axios.post(rpc, { jsonrpc: '2.0', id: 1, method: 'getEpochInfo' }),
    getCompaign: ({ campaignId = 1, address, referral }) =>
      ctx.$axios
        .get(`http://192.168.50.2:9000/campaign/${campaignId}`, { params: { address, referral } })
        .then((res) => res.data),
    postCompaign: ({ campaignId = 1, address, task, result = '', sign = '' }) =>
      ctx.$axios
        .post(`http://192.168.50.2:9000/campaign/${campaignId}`, { address, task, result, sign })
        .then((res) => res.data)
  }

  ctx.$api = api
  inject('api', api)
}

export default apiPlugin
