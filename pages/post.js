import Layout from '../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'

const imgStyle = {
  maxHeight: 300,
  marginTop: 10,
}

const Post =  ({article}) => {  
    return  <Layout>
       <h1>{article.headline.main}</h1>
       <h3>{article.byline.original} - {article.pub_date.slice(0, 10)}</h3>
       <img style={imgStyle} src={'https://www.nytimes.com/' + article.multimedia[0].url} alt="" ></img>
       <p>{article.abstract}</p>
       <p>{article._id}</p>
    </Layout>
}

Post.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=dfdf286b06d14bbfb24f2898357d4672');
  const data = await res.json();
  //const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
  
  const article = data.response.docs.filter((a) => ( a._id === id ));

  return {  article : article[0] }
}

export default Post