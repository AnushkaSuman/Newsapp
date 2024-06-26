import React, { useEffect, useState } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'
import PropTypes from 'prop-types'

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalResults, setTotalResults] = useState(0)
  const [page, setPage] = useState(1)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /*constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      totalResults:0,
      page: 1
    }*/

  const updateNews = async () => {
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    let data = await fetch(url);
    console.log("url",props);
    props.setProgress(40)
    let parsedData = await data.json();
    props.setProgress(70)
    console.log(parsedData)
    /*this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })*/
    setArticles(parsedData.articles)
    setLoading(false)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }
  //const componentDidMount=async()=> {
  /*let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1d0f4aaa755843b2adf98fe4412dfb95&page=1&pageSize=${this.props.pageSize}`
  this.setState({loading:true})
  let data = await fetch(url);  
  let parsedData = await data.json();
  console.log(parsedData)
  this.setState({
    articles:parsedData.articles,
    totalResults:parsedData.totalResults,
    loading:false})}
    // updateNews();
    */
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsBreak`;
    updateNews()
  }, [])
  const handlePrevClick = async () => {
    /*let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1d0f4aaa755843b2adf98fe4412dfb95&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data = await fetch(url);  
    let parsedData = await data.json();
    console.log(parsedData)
    this.setState({
      page:this.state.page - 1,
      articles:parsedData.articles,
      loading:false
    })*/
    setPage(page - 1)
    updateNews();
  }

  const handleNextClick = async () => {
    /* if(this.state.page + 1>Math.ceil(this.state.totalResults/this.props.pageSize)){
     }
     else{
     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1d0f4aaa755843b2adf98fe4412dfb95&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
     this.setState({loading:true})
     let data = await fetch(url);  
     let parsedData = await data.json();
     console.log(parsedData);
     this.setState({
       page:this.state.page + 1,
       articles:parsedData.articles,
       loading:false
     })
   }*/
    setPage(page + 1)
    updateNews();
  }
  const fetchMoreData = async () => {
    // this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData)
    debugger;
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    /*this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false
    })*/

  }

  return (
    <div className="my-3">
      <h1 className="text-center" style={{ margin: "30px 0px", marginTop: "90px" }}>NewsBreak-Top {capitalizeFirstLetter(props.category)} Headlines</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">

            {articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItems title={element.title ? element.title : ""} description={element.decription ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : "Unknown"} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  )
}
News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}
export default News









