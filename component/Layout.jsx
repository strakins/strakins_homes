import Head from 'next/head';
import { Box } from '@chakra-ui/react'
import Nav from './Nav'
import Footer from './Footer';

const Layout = ({ children }) => (
    <>
        <Head>
            <title>Strakins Home</title>
        </Head>
        <Box>
            <header>
                < Nav />
            </header>
            <main>
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </Box>
    </>
);

export default Layout;