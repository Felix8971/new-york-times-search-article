
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
      articles: [],
    }
    this.handleInputChange = debounce(this.handleInputChange, 1000);
    this.firstRender = true;
  }

  static async getInitialProps({req, query}) {

    console.log('req=',req);
    console.log('query=',query);
    const q = query.q ? query.q.trim() : '';
    const url = !!q ? BASE_URL +'&q=' + q : BASE_URL;
    const res = await fetch(url);
    const data = await res.json();
    //console.log('data.response.docs:', data.response.docs);
    console.log(`Show data fetched. Count: ${data.response.docs.length}`);
  
    return {
      articles: data.response.docs
    }
  }

  // On Our Radar: A Subglacial Lake
  handleInputChange(event) {
    //console.log(event.target.value);
    const value = this.search.value;//event.target.value;
    this.setState({q: value});
    const q = value ? value.trim() : '';
    const url = BASE_URL + (!!q ? '&q='+ q : '');
    console.log('==> url:', url);
    debugger;
  
    fetch(url)
    .then(resp => resp.json())
    .then((data) => {
      debugger;
      console.log('==> data.response.docs:', data.response.docs);
      if ( data.response.docs && data.response.docs.length > 0){
        this.setState({articles: data.response.docs});
      } else {
        this.setState({articles: []});
      }
    })
    .catch((error) => {
      debugger;
      console.log('==> ERROR');
      this.setState({articles: []});
    });
  }

  render() {
    let articles;
    if ( this.firstRender ) {
      articles = this.props.articles;
      this.firstRender = false;
    } else {
      articles = this.state.articles;
    }
   
    console.log('articles=',articles);
    return (
      <Layout>
      <h1>New York Time Search Articles</h1>
      <div className='search'>
        Search <input onChange={(e) => this.handleInputChange(e) } ref={input => this.search = input} ></input>
      </div>
  
      <ul className='unorderedList'>
        { Array.isArray(articles) && articles.length > 0 ? articles.map((article) => (
            <li key={article._id}>
              <Link as={`/p/${article._id}`} href={`/post?id=${article._id}&q=${this.state.q}`} >
                <a className='item'>
                  { (article.multimedia && article.multimedia.length > 0 && !!article.multimedia[2].url) ?
                    <img src={'https://www.nytimes.com/' + article.multimedia[2].url} className='thumbnail' alt='thumbnail' /> 
                    : 
                    <img src='/static/newyorktimes-logo.jpg' className='thumbnail'  alt='thumbnail' /> 
                  }
                  <p className="example">{article.headline.main}</p>
                </a>
              </Link>
            </li>
          ))
          :
          <p>No result found...</p>        
        } 
      </ul>
      
    </Layout>
    )
  }
}
