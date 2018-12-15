import Layout from '../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'

// Style
/*const Img = styled.img`
  max-height: 300;
  margin-top: 10;
`;*/

const Post =  ({article}) => {  
    //debugger;
    return  <Layout>
       <h1>{article.headline ? article.headline.main : ''}</h1>
       <h3>{article.byline ? article.byline.original : ''} - {article.pub_date.slice(0, 10)} -</h3>
       { !!article.multimedia.length && !!article.multimedia[0].url &&
         <img src={'https://www.nytimes.com/' + article.multimedia[0].url} alt="" />
       }
       <p>{article.snippet}</p>
       <p>{article._id}</p>
    </Layout>
}

Post.getInitialProps = async function (context) {
  const { id , q } = context.query
  console.log('q=',q);
  console.log('context=',context);
  const baseUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=dfdf286b06d14bbfb24f2898357d4672';
  const url = q ? baseUrl+'&q='+q : baseUrl;
  const res = await fetch(url);//&q=fer
  const data = await res.json();
  console.log('response.docs=',data.response.docs);
  //const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
  const article = data.response.docs.filter((a) => ( a._id === id ));
  console.log('article=',article);
  return {  article : article[0] }
}

export default Post