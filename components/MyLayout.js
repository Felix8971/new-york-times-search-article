import Header from './Header';
import Head from 'next/head';//Next.js gives us a Head component where by we can manipulate what goes inside the HTML <head> tag. 

const Layout = (props) => (
  <div className='layout'>
    <Head>
      <title>New York Time Search Articles</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <Header />
    {props.children}
  </div>
)

export default Layout
