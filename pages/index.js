
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

export default class extends React.Component {
  
  constructor(props) {
    super();
    this.state = {
      q: '',
      sort : 'newest',
    }
  }

  componentDidMount() {
   
  }

  static async getInitialProps({req, query}) {
    //const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
    console.log('req=',req);
    console.log('query=',query);
    const res = await fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=dfdf286b06d14bbfb24f2898357d4672');
    const data = await res.json();
    console.log('data.response.docs:', data.response.docs);
    console.log(`Show data fetched. Count: ${data.response.docs.length}`);
  
    return {
      articles: data.response.docs
    }
  }
  

  render() {
    return (
      <Layout>
      <h1>New York Time Search Articles</h1>
      <input ></input>
      <ul>
        {this.props.articles.map((article) => (
          <li key={article._id}>
            <Link as={`/p/${article._id}`} href={`/post?id=${article._id}`} >
              <a>{article.headline.main}</a>
            </Link>
          </li>
        ))} 
        </ul> 
    </Layout>
    )
  }
}

/*
const Index = (props) => (
  <Layout>
    <h1>New York Time Search Articles</h1>
    <ul>
      {props.articles.map((article) => (
        <li key={article._id}>
          <Link as={`/p/${article._id}`} href={`/post?id=${article._id}`} >
            <a>{article.headline.main}</a>
          </Link>
        </li>
      ))} 
      </ul> 
  </Layout>
)

Index.getInitialProps = async function({req, query}) {
  //const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  console.log('req=',req);
  console.log('query=',query);
  const res = await fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=dfdf286b06d14bbfb24f2898357d4672&begin_date=20170101&end_date=20180505');
  const data = await res.json();
  console.log('data.response.docs:', data.response.docs);
  console.log(`Show data fetched. Count: ${data.response.docs.length}`);

  return {
    articles: data.response.docs
  }
}
*/
//export default Index