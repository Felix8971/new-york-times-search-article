
import Layout from '../components/MyLayout.js';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import debounce  from 'lodash/debounce';

import { BASE_URL } from '../constants';
import "../style.css"

export default class extends React.Component {
  
  constructor(props) {
    super();
    this.state = {
      q: '',
      sortOption: '',
      articles: [],
      message:'',
    }
    this.handleInputChange = debounce(this.handleInputChange, 1000);
    this.changeSortOption = debounce(this.changeSortOption, 100);
    this.firstRender = true;
  }

  formatDate(date){
    const tab = date.slice(0, 10).split('-');
    return tab[2]+'/'+tab[1]+'/'+tab[0];
  }

  static async getInitialProps({req, query}) {
    const q = query.q ? query.q.trim() : '';
    const url = !!q ? BASE_URL +'&q=' + q : BASE_URL;
    const res = await fetch(url);
    const data = await res.json();
  
    return {
      articles: data.response.docs
    }
  }


  fetchUrl(url) {
    this.setState({message:'Loading...'});
    fetch(url)
    .then(resp => resp.json())
    .then((data) => {
      if ( data.response.docs && data.response.docs.length > 0){
        this.setState({articles: data.response.docs, message:''});
      } else {
        this.setState({articles: [], message:'No result found.'});
      }
    })
    .catch((error) => {
      console.log('==> ERROR');
      this.setState({articles: [], message:'Error.'});
    });
  }

  changeSortOption(){
    this.setState({sortOption: this.sortOption.value});
    const url = BASE_URL + (!!this.state.q ? '&q='+ this.state.q : '') + ( this.sortOption.value!== 'None' ? '&sort='+ this.sortOption.value : '');
    this.fetchUrl(url);
  }

  handleInputChange() {
    const value = this.search.value;
    this.setState({q: value});
    const q = value ? value.trim() : '';
    const url = BASE_URL + (!!q ? '&q='+ q : '') + (!!this.state.sortOption ? '&sort='+ this.state.sortOption : '');
    this.fetchUrl(url);
  }

  componentWillMount(){
    console.log('articles===',this.props.articles);
  }

  componentWillUpdate(){
    console.log('articles===',this.state.articles);
  }

  render() {
    let articles;
    if ( this.firstRender ) {
      articles = this.props.articles;
      this.firstRender = false;
    } else {
      articles = this.state.articles;
    }
   
    const resultOK = Array.isArray(articles) && articles.length > 0; 

    return (
      <Layout>
      <h1>New York Time Search Articles</h1>
      <form className='form'>
        <div className='search'>
          Search:<input onChange={() => this.handleInputChange() } ref={input => this.search = input} ></input>
        </div>
        Sort:
        <select onChange={() => this.changeSortOption()} ref={input => this.sortOption = input}  >
          <option defaultValue>None</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </form>
      <ul className='unorderedList'>
        { resultOK ? articles.map((article) => (
            <li key={article._id}>
              <Link as={`/p/${article._id}`} href={`/post?id=${article._id}&q=${this.state.q}`} >
                <div className='item'>
                  { (article.multimedia && article.multimedia.length > 0 && article.multimedia[2] && article.multimedia[2].url ) ?
                    <img src={'https://www.nytimes.com/' + article.multimedia[2].url} className='thumbnail' alt='thumbnail' /> 
                    : 
                    <img src='/static/newyorktimes-logo.jpg' className='thumbnail'  alt='thumbnail' /> 
                  }
                  <div className='info'>
                    <p>{article.headline.main}</p>
                    {article.pub_date && <p>{this.formatDate(article.pub_date)}</p>}
                  </div>
                </div>
              </Link>
            </li>
          ))
          :
          <p className='message'>{this.state.message}</p>        
        } 
      </ul>
      
    </Layout>
    )
  }
}
