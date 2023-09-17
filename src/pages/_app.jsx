import "../styles/global.css"
import Head from "next/head";

export default function App({ Component, pageProps }) {
    return  <>
        <Head>
            <link rel="icon" href="/images/favicon.ico" sizes="any" />
        </Head>
        <Component {...pageProps} />
    </>
}