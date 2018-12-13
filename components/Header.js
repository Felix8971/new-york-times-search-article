import Link from 'next/link'

const linkStyle = {
  marginLeft: 15
}
const headerStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  justifyItems: 'center',
  alignItems: 'center',
}

const Header = () => (
    <div style={headerStyle}>
       <img src="http://static01.nytimes.com/packages/images/developer/logos/poweredby_nytimes_200a.png" alt=""></img>
        <Link href="/">
          <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/about">
          <a style={linkStyle}>About</a>
        </Link>
    </div>
)

export default Header
