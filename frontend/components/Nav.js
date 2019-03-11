import Link from 'next/link';

const Nav = () => (
    <React.Fragment>
        <Link href="/sell">
            <a>Sell!</a>
        </Link>
        <Link href="/">
            <a>Go back to Home!</a>
        </Link>
    </React.Fragment>
);

export default Nav;
