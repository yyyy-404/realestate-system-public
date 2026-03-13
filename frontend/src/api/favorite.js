import request from "../utils/request"

export function getFavorites() {
  return request({
    url: "/favorite/",
    method: "get"
  })
}

export function addFavorite(propertyId) {
  return request({
    url: `/favorite/${propertyId}`,
    method: "post"
  })
}