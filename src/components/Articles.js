import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const key = process.env.API_KEY

class Articles extends React.Component {
  constructor() {
    super()
    this.state = {
      articles: [],
      search: '',
      errors: {}
    }
  }

  componentDidMount() {
    axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${key}`)
      .then(resp => {
        resp.data.articles.forEach((article, i) => {
          return article.id = i++
        })
        this.setState({ articles: resp.data.articles })
      })
      .catch(err => this.setState({ errors: err.response.data.status }))
  }

  handleChange(e) {
    this.setState({ search: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.get(`https://newsapi.org/v2/everything?q=${this.state.search}&apiKey=${key}`)
      .then(resp => {
        resp.data.articles.forEach((article, i) => {
          return article.id = i++
        })
        this.setState({ articles: resp.data.articles })
      })
  }

  render() {
    return <section id="section" className="section">
      <form style={{ margin: '0px 0px 40px 0px' }} className="form" onSubmit={(e) => this.handleSubmit(e)}>
        <div className="field" id="field">
          <div className="control">
            <input id="input" className="input" type="text" placeholder="Search for news..." onChange={(e) => this.handleChange(e)}/>
          </div>
        </div>
      </form>
      <div className="container">
        <div className="columns is-multiline is-mobile">
          {this.state.articles.map((article, i) => {
            return <div key={i} className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
              <Link to={{
                pathname: `/article/${article.id}`,
                state: this.state.articles[`${article.id}`] 
              }}>
                <div className="container" id="article-test">
                  <img 
                    className="image" 
                    src={!article.urlToImage ? 'https://icon-library.net/images/placeholder-image-icon/placeholder-image-icon-7.jpg' : article.urlToImage }
                  />
                  <p className="subtitle">{article.title}</p>
                  <p>{article.source.name}</p>
                </div>
              </Link>
            </div>
          })}
        </div>
      </div>
    </section>
  }
}

export default Articles