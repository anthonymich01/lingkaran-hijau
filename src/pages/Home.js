import React from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import { searchGIF, searchSugestionGIF, trendingGIF } from "../api"
import "./Home.scss"
import Footer from "../components/Footer"

const WAIT_INTERVAL = 300
const ENTER_KEY = 13
const GIF_LIMIT = 25

class Home extends React.Component {
  state = {
    q: "",
    gifsTrending: [],
    gifsResult: [],
    sugestions: [],
    prevY: 0
  }

  timer = null

  loadingRef = React.createRef()

  componentDidMount = async () => {
    await this.trendingSearch()

    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    }

    this.observer = new IntersectionObserver(this.handleObserver, options)
    this.observer.observe(this.loadingRef.current)
  }

  handleObserver = async (entities, observer) => {
    const y = entities[0].boundingClientRect.y
    const { gifsResult, gifsTrending, prevY, q } = this.state
    if (prevY > y) {
      if (gifsResult.length > 0) {
        const offset = gifsResult.length
        await this.submitSearch(q, GIF_LIMIT, offset)
      } else {
        const offset = gifsTrending.length
        await this.trendingSearch(GIF_LIMIT, offset)
      }
    }
    this.setState({ prevY: y })
  }

  handleSugestionClick = async (q) => {
    this.setState({ q, sugestions: [] })
    await this.submitSearch(q)
  }

  handleKeyDown = async (e) => {
    if (e.keyCode === ENTER_KEY) {
      clearTimeout(this.timer)
      const { q } = this.state
      await this.submitSearch(q)
    }
  }

  handleInputChange = (e) => {
    clearTimeout(this.timer)
    this.setState({ q: e.target.value })
    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL)
  }

  triggerChange = async () => {
    const { q } = this.state
    try {
      const res = await searchSugestionGIF(q)
      if (res.status === 200) {
        this.setState({ sugestions: res.data.data })
      }
    } catch (error) {
      console.log(error)
    }
  }

  submitSearch = async (q, limit = GIF_LIMIT, offset = 0) => {
    try {
      const res = await searchGIF(q, limit, offset)
      if (res.status === 200) {
        if (offset === 0) {
          this.setState({ gifsResult: res.data.data })
        } else {
          this.setState({ gifsResult: [...this.state.gifsResult, ...res.data.data] })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  trendingSearch = async (limit = GIF_LIMIT, offset = 0) => {
    try {
      const res = await trendingGIF(limit, offset)
      if (res.status === 200) {
        this.setState({ gifsTrending: [...this.state.gifsTrending, ...res.data.data] })
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { q, gifsResult, gifsTrending, sugestions } = this.state

    return (
      <>
        <Header />
        <p className="subtitle">
          <Link to="/upload">
            <button className="primary-button">Upload your GIF</button>
          </Link>
        </p>
        <p className="subtitle">or</p>
        <p className="subtitle">Find the best GIFs all over the world!</p>
        <div className="input-container">
          <input
            className="input-box"
            type="text"
            placeholder="Iron man vs Hulk"
            value={q}
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
          />
          {sugestions.length > 0 &&
            sugestions.map((v, i) => {
              return (
                <p key={i} className="sugestion-list" onClick={() => this.handleSugestionClick(v.name)}>
                  {v.name}
                </p>
              )
            })}
        </div>
        <div className="container">
          {gifsResult.length > 0 ? (
            <div className="box">
              <h1>Results</h1>
              <div className="gifs-list">
                {gifsResult.map((v) => {
                  return (
                    <Link to={`/g/${v.id}`} key={v.id}>
                      <div className="gifs-image">
                        <img src={v.images.downsized.url} alt={v.title}></img>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="box">
              <h1>Trending GIFs</h1>
              <div className="gifs-list">
                {gifsTrending.map((v) => {
                  return (
                    <Link to={`/g/${v.id}`} key={v.id}>
                      <div className="gifs-image">
                        <img src={v.images.downsized.url} alt={v.title}></img>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>
        <div ref={this.loadingRef}>
          <Footer />
        </div>
      </>
    )
  }
}

export default Home
