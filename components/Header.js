import Link from 'next/link'

const Header = () => (
    <div className='header'>
       <img className='nytimesLogo' src="http://static01.nytimes.com/packages/images/developer/logos/poweredby_nytimes_200a.png" alt=""></img>
        <div className="link-bloc">
          <Link href="/">
            <a className='link'>Home</a>
          </Link>
          <Link href="/about">
            <a className='link'>About</a>
          </Link>
        </div>
    </div>
)

export default Header
