import axios from "axios"

const GIPHY_API_URL = "https://api.giphy.com"
const GIPHY_UPL_URL = "https://upload.giphy.com"
const GIPHY_API_KEY = "CPYBdgQfxef8xPaUE2QNLVz8tIO2Y9aw"

const api = axios.create({
  baseURL: GIPHY_API_URL
})

export const trendingGIF = (limit = 25, offset = 0) => {
  return api.get("/v1/gifs/trending", {
    params: {
      api_key: GIPHY_API_KEY,
      limit,
      offset
    }
  })
}

export const searchGIF = (q, limit = 25, offset = 0) => {
  return api.get("/v1/gifs/search", {
    params: {
      api_key: GIPHY_API_KEY,
      q,
      limit,
      offset
    }
  })
}

export const getGIFById = (gif_id) => {
  return api.get(`/v1/gifs/${gif_id}`, {
    params: {
      api_key: GIPHY_API_KEY
    }
  })
}

export const searchSugestionGIF = (q) => {
  return api.get(`/v1/tags/related/${q}`, {
    params: {
      api_key: GIPHY_API_KEY
    }
  })
}

export const uploadGIF = (file, tags, source_image_url, source_post_url) => {
  const formData = new FormData()
  formData.append("api_key", GIPHY_API_KEY)
  formData.append("tags", tags.trim())
  formData.append("source_image_url", source_image_url.trim())
  formData.append("source_post_url", source_post_url.trim())
  if (file) {
    formData.append("file", file)
  }

  return axios.post(`${GIPHY_UPL_URL}/v1/gifs`, formData)
}
