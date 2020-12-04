import React from "react"
import { getGIFById } from "../api"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "./Detail.scss"

class Detail extends React.Component {
  state = { data: null }

  componentDidMount = async () => {
    const { id } = this.props.match.params
    try {
      const res = await getGIFById(id)
      if (res.status === 200) {
        this.setState({ data: res.data.data })
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { data } = this.state

    return (
      <>
        <Header />
        {data && (
          <>
            <div className="image-box">
              <h3>{data.title}</h3>
              <img src={data.images.downsized_large.url} alt={data.title} />
            </div>
            <div className="properties">
              <table>
                <thead>
                  <tr>
                    <th className="cell-key">Key</th>
                    <th className="cell-val">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(data).map((v, i) => {
                    return (
                      <tr key={i}>
                        <td className="cell-key">{v}</td>
                        <td className="cell-val">{JSON.stringify(data[v])}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
        <Footer />
      </>
    )
  }
}

export default Detail
