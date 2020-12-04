import React from "react"
import { uploadGIF } from "../api"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "./Upload.scss"

class Upload extends React.Component {
  state = {
    file: null,
    source_image_url: "",
    tags: "",
    source_post_url: ""
  }

  handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value })

  handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) {
      return
    }
    this.setState({ file: file })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { file, tags, source_image_url, source_post_url } = this.state
    if (file === null && !source_image_url) {
      return
    }

    try {
      const res = await uploadGIF(file, tags, source_image_url, source_post_url)
      if (res.status === 200) {
        const { id } = res.data.data
        window.location = `/g/${id}`
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { tags, source_image_url, source_post_url } = this.state
    return (
      <>
        <Header />
        <h2 className="title">Upload Your GIF</h2>
        <div className="form-upload">
          <form onSubmit={this.handleSubmit}>
            <p>File</p>
            <input className="input-file" type="file" onChange={this.handleFileChange} accept=".gif" />
            <p>Tags</p>
            <input type="text" name="tags" value={tags} placeholder="pets, cat, meow" onChange={this.handleInputChange} />
            <p>Source Image URL</p>
            <input
              type="text"
              name="source_image_url"
              value={source_image_url}
              placeholder="http://www.mysite.com/myfile.mp4"
              onChange={this.handleInputChange}
            />
            <p>Source Post URL</p>
            <input
              type="text"
              name="source_post_url"
              value={source_post_url}
              placeholder="http://www.mysite.com/my-post/"
              onChange={this.handleInputChange}
            />
            <p className="button-p">
              <button type="submit" className="primary-button upload">
                Upload GIF!
              </button>
            </p>
          </form>
        </div>

        <Footer />
      </>
    )
  }
}

export default Upload
