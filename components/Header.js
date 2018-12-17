import Link from 'next/link'

const linkStyle = {
  marginLeft: 15
}

const Header = () => (
    <div className='header'>
       <img className='nytimesLogo' src="http://static01.nytimes.com/packages/images/developer/logos/poweredby_nytimes_200a.png" alt=""></img>
        <div>
          <Link href="/">
            <a style={linkStyle}>Home</a>
          </Link>
          <Link href="/about">
            <a style={linkStyle}>About</a>
          </Link>
        </div>
    </div>
)

export default Header
