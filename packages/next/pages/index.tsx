import Head from 'next/head'
import { useUser } from "../context/UserContext";
import { useRouter } from "next/router";
import useLicks from "../hooks/useLicks";
import LickItem from "../components/LickItem";

import styles from '../styles/Home.module.scss'

const Home: React.FC = () => {
  const router = useRouter();
  const licks = useLicks();
  //const licks = [];
  const user = useUser();

  return (
    <main>
      <Head>
        <title>Random Licks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <h1 className={styles.title}>
          Random Licks!
        </h1>
        <div className={styles.containerHead}>
          <button
            type="button"
            className={styles.btn}
            disabled={!user}
            onClick={() => router.push("/add-post")}
          >
            + Add New
          </button>
        </div>
        <ul>
          {licks && licks.map((post) => (
            <LickItem
              key={post.id}
              id={post.id}
              owner={post.owner}
              tokenUri={post.tokenUri}
            />
          ))}
        </ul>
    </main>
  );
};

export default Home;
