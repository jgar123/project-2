import React from 'react'
import moment from 'moment'

const pads = {
  margin: '0px 0px 15px 0px'
}

class SingleArticle extends React.Component {
  constructor() {
    super()
    this.state = {
      singleArticle: {
        source: ''
      }
    }
  }

  componentDidMount() {
    this.setState({ singleArticle: { ...this.props.location.state } })
  }
  
  render() {
    console.log(this.state.singleArticle.source.name)
    return <div className="section has-background-white">
      <div id="singleArticle" className="container is-full-mobile">
        <p className="title">{this.state.singleArticle.title}</p>
        <p 
          className="subtitle" 
          style={pads}
        >{this.state.singleArticle.description}</p>
        <p>Posted: {moment(this.state.singleArticle.publishedAt).fromNow()}</p>
        <p>By {this.state.singleArticle.source.name}</p>
        <img 
          style={pads} 
          className="image" 
          src={!this.state.singleArticle.urlToImage ? 'https://icon-library.net/images/placeholder-image-icon/placeholder-image-icon-7.jpg' : this.state.singleArticle.urlToImage }
        />
        <p>{this.state.singleArticle.content}</p>
        <a href={this.state.singleArticle.url} className="button" target="blank_">Read more at {this.state.singleArticle.source.name}</a>
      </div>
    </div>
    
  }
}

export default SingleArticle

