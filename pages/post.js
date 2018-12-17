import Layout from '../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'
import { BASE_URL, formatDate } from '../constants';

const Post =  ({article}) => {  
    return  <Layout>
       <h1>{article.headline ? article.headline.main : ''}</h1>
       <h3>{article.byline ? article.byline.original : ''} - {formatDate(article.pub_date)} -</h3>
       { !!article.multimedia.length && !!article.multimedia[0].url &&
         <img className='post-img' src={'https://www.nytimes.com/' + article.multimedia[0].url} alt="" />
       }
       <p>{article.snippet}</p>
       {/*<p>{article._id}</p>*/}
    </Layout>
}

Post.getInitialProps = async function (context) {
  console.log('context.query=',context.query);
  const { id , q } = context.query;
  const url = q ? BASE_URL+'&q='+q : BASE_URL;
  const res = await fetch(url);
  const data = await res.json();
  const article = data.response.docs.filter((a) => ( a._id === id ));
  return {  article : article[0] }
}

export default Post