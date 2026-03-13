import request from "../utils/request"

// 房源 API
export function getPropertyList() {
  return request({
    url: "/property/",
    method: "get"
  })
}

export function getProperty(id) {
  return request({
    url: `/property/${id}`,
    method: "get"
  })
}

export function createProperty(data) {
  return request({
    url: "/property/",
    method: "post",
    data
  })
}