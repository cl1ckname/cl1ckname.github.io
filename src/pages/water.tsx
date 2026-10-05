import Water from "@/components/water/Water";
import Head from "next/head";

export default function WaterPage() {
  return (
    <>
      <Head>
        <title>Doodle Water</title>
        <meta name="description" content="Doodle-style WebGL water that follows the local time of day." />
      </Head>
      <Water />
    </>
  );
}
