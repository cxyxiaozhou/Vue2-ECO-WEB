import request from '@/utils/request'

export const addAddressList = (name, phone, obj) => {
  return request.post('/address/add', { form: { name, phone, obj } })
}

export const getAddressList = () => {
  return request.get('http://localhost:3000/data')
}

export const getRegionList = () => {
  return request.get('/region/tree')
}
