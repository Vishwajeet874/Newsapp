import React, { Component } from 'react'
import Newsitem from './Newsitem'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from './Spinner';



export class News extends Component {
    
    static defaultProps={
        country:"in",
        pagesize: 9,
        category: "general",
    }
    static propTypes={
        country:PropTypes.string,
        pagesize:PropTypes.number,
        category:PropTypes.string

    }
    capitalizefirst=(string)=>{
        return string.charAt(0).toUpperCase()+ string.slice(1);
    }
    constructor(props){
        super(props);
        this.state={
            articles:[],
            loading:false,
            page:1,
            totalResults:0
        }
        document.title=`News-${this.capitalizefirst(this.props.category)}`;
    }
    async update(){
        this.props.setProgress(10);
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pagesize}`;
        this.setState({loading:true});
        let data=await fetch(url);      
        this.props.setProgress(30);
        let parseddata=await data.json()
        console.log(parseddata);
        this.setState({
            articles:this.state.articles.concat(parseddata.articles),
            totalResults:parseddata.totalResults,
            loading:false 
        })
        this.props.setProgress(100);
    }
    async componentDidMount(){
        this.update();
    }
    handlenext=async()=>{
        // console.log("next");
        // if(this.state.page+1>Math.ceil(this.state.totalResults/20)){

        // }
        // else{
        //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1}&pageSize=${this.props.pagesize}`;
        //     this.setState({loading:true})
        //     let data=await fetch(url);
        //     let parseddata=await data.json()
        //     console.log(parseddata);
        //     this.setState({loading:false})
        //     this.setState({
        //         page:this.state.page+1,
        //         articles:parseddata.articles,
                
        //     })
        // }
        this.setState({
            page:this.state.page+1
        });
        this.update();
    }
    handleprev=async()=>{
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page-1}&pageSize=${this.props.pagesize}`;
        // this.setState({loading:true})
        // let data=await fetch(url);
        // let parseddata=await data.json()
        // console.log(parseddata);
        // this.setState({loading:false})
        // this.setState({
        //     page:this.state.page-1,
        //     articles:parseddata.articles,
        //     loading:true
        // })
        this.setState({
            page:this.state.page-1
        });
        this.update();
    }
    fetchMore=async()=>{
        this.setState({
            page:this.state.page+1
        })
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pagesize}`;

        let data=await fetch(url);      
        let parseddata=await data.json()
        console.log(parseddata);
        this.setState({
            articles:this.state.articles.concat(parseddata.articles),
            totalResults:parseddata.totalResults,
        })
    }
    render() {
        return (
            <div className="container my-3">

                <h2>Top Headlines-{this.capitalizefirst(this.props.category)}</h2>
                <br/><br/>{this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length} //This is important field to render the next data
                    next={this.fetchMore}
                    hasMore={this.state.articles.length!==this.state.totalResults}
                    loader={<Spinner/>}
                
                >
                <div className="container">
                    <div className="row">
                        {this.state.articles.map((element)=>{

                            return <div className="col-md-4"   key={element.url}>
                                <Newsitem  title={element.title} description={element.description} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                            </div>
                        })}
                    
                        
                    </div> 
                </div>
                </InfiniteScroll>
            </div>
        )
    }
}

export default News
