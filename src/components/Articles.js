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
      errors: {},
      searchHist: [],
      count: 0
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
    const searchHist = (this.state.searchHist)
    searchHist.unshift(this.state.search)
    axios.get(`https://newsapi.org/v2/everything?q=${this.state.search}&apiKey=${key}`)
      .then(resp => {
        resp.data.articles.forEach((article, i) => {
          return article.id = i++
        })
        this.setState({ articles: resp.data.articles,
          searchHist: searchHist })
      })
  }

  render() {
    return <section id="section" className="section">
      <div className="columns is-multiline">
        {this.state.searchHist.map((search, i) => {
          return <div key={i} className="column">
            <p id="searchHistText">{search}</p>
          </div>
        })}
      </div>
      <form style={{ margin: '0px 0px 40px 0px' }} className="form" onSubmit={(e) => this.handleSubmit(e)}>
        <div className="field" id="field">
          <div className="control">
            <input id="input" className="input" type="text" placeholder="Search for news" onChange={(e) => this.handleChange(e)}></input>
          </div>
        </div>
      </form>
      {this.state.articles.length === 0 ?
        <div className="container" id="nothing">
          <p className="title is-4 has-text-white">No news about "{this.state.search}" today...try another search!</p>
          <img src="https://media.giphy.com/media/80mcZu4pxXjod7u4g6/giphy.gif"/>
        </div>
        :
        <div className="container" id="articleContainer"> 
          <div className="columns is-multiline is-mobile">
            {this.state.articles.map((article, i) => {
              return <div key={i} className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
                <Link to={{
                  pathname: `/article/${article.id}`,
                  state: this.state.articles[`${article.id}`] 
                }}>
                  <div className="container" id="article-test">
                    <img
                      id="article-img" 
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
      }
    </section>
  }
}

export default Articles