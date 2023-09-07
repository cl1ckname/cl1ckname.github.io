import "../styles/physarum.css"
import Tree from "@/components/tree/Tree";
import Head from "next/head";
export default function TreePage() {
    return <>
    <Head>
        <meta name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <title>Pythagoras tree</title>
    </Head>
        <Tree/>
    </>
}