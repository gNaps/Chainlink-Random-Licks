import Head from 'next/head'
import { useUser } from "../context/UserContext";
import { useRouter } from "next/router";
import useLicks from "../hooks/useLicks";
import LickItem from "../components/LickItem";
import getContract from "../utils/getContract";
import getLinkContract from "../utils/getLinkContract";
import { formatERC20, formatTokenUri } from "../utils/format";
import styles from '../styles/Home.module.scss'
import { useState } from 'react';
import { EventFilter } from 'ethers';
import ModalError from '../components/ModalError';
import ModalLoader from '../components/ModalLoader';
import ModalSuccess from '../components/ModalSuccess';
import { playMusic } from "../utils/sounds";
import { useSound, useSelectSound } from "../context/SoundContext";

const Home: React.FC = () => {
  const [filterMyLicks, setFilterMyLicks] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [newLick, setNewLick] = useState("");

  const [openTip, setOpenTip] = useState(false);

  const router = useRouter();
  const user = useUser();
  const licks = useLicks(filterMyLicks);
  const sound = useSound();
  const selectSound = useSelectSound();
  
  /**
   * Mint new token
   */
  const mintItem = async () => {
    console.log("qui minto nuovo token");
    const contract = getContract(user.provider.getSigner());
    const contractLink = getLinkContract(user.provider.getSigner());
    const tokenLinksEth = await contractLink.balanceOf(contract.address);
    const tokenLinks = formatERC20(tokenLinksEth, 18);

    console.log(contract);
    console.log(contractLink);
    console.log("Link disponibili su rinkeby: ", tokenLinks);

    if(parseFloat(tokenLinks) === 0) {
      console.log("No enough link on contract");
      setMessage("No enough link on contract. Please use https://ropsten.chain.link/");
      setShowError(true);
      //mostrare alert
    } else {
      setShowLoader(true);
      setMessage("Minting token...")
      const mintResult = await contract.mintItem(9876541233);
      await mintResult.wait();

      console.log(mintResult);
      setMessage("Processing lick...");

      const topics: Array<string> = ['from', 'to', 'tokenId']
      const eventFilter: EventFilter = { address: contract.address };

      contract.on(eventFilter, async (result) => {
        console.log(result);

        if(result.args && result.args.length >= 3) {
          const tokenId = result.args[2].toString();
          const lick = await contract.tokenURI(tokenId);

          console.log("nuovo lick mintato ", lick);
          closeModalLoader();
          setShowSuccess(true);
          setNewLick(formatTokenUri(lick));

          playMusic(formatTokenUri(lick), sound);
        }
      });
    }
  }

  /**
   * Close the error modal
   */
  const closeModalError = () => {
    setMessage("");
    setShowError(false);
  }

  /**
   * Close the loader modal
   */
  const closeModalLoader = () => {
    setMessage("");
    setShowLoader(false);
  }

  /**
   * Close the success modal
   */
  const closeModalSuccess = () => {
    setNewLick("");
    setShowSuccess(false);
  }

  const handleChangeSound = (e) => {
    selectSound(e.target.value);
  }

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
            disabled={!user}
            onClick={() => mintItem()}
          >
            <p>Add New</p>
            <img src="plus-circle-solid.svg" />
          </button>
          <button
            type="button"
            disabled={!user}
            onClick={() => setFilterMyLicks(!filterMyLicks)}
          >
            { !filterMyLicks && <p>My Licks</p> }
            { filterMyLicks && <p>All Licks</p> }
            <img src="heart-solid.svg" />
          </button>
          <button
            type="button"
            className={styles.btn}
            onClick={() => setOpenTip(!openTip)}
          >
            <img src={`/info-circle-solid.svg`} />
          </button>
        </div>
        <div className={`${styles.menu_tip} ${openTip ? styles.open : ''}`}>
            <div>
              <input 
                type="radio" 
                value="AMSynth" 
                checked={sound === "AMSynth"}
                onChange={handleChangeSound} /> 
              <p>Sound type 1</p>
            </div>
            <div>
              <input 
                type="radio" 
                value="FMSynth" 
                checked={sound === "FMSynth"}
                onChange={handleChangeSound} /> 
              <p>Sound type 2</p>
            </div>
            <div>
              <input 
                type="radio" 
                value="MembraneSynth" 
                checked={sound === "MembraneSynth"}
                onChange={handleChangeSound} /> 
              <p>Sound type 3</p>
            </div>
            <div>
              <input 
                type="radio" 
                value="MonoSynth" 
                checked={sound === "MonoSynth"}
                onChange={handleChangeSound} /> 
              <p>Sound type 4</p>
            </div>
            <div>
              <input 
                type="radio" 
                value="MetalSynth" 
                checked={sound === "MetalSynth"}
                onChange={handleChangeSound} /> 
              <p>Sound type 5</p>
            </div>
        </div>
        <ul className={styles.ul_item}>
          {licks && licks.map((post) => (
            <LickItem
              key={post.id}
              id={post.id}
              owner={post.owner}
              tokenUri={post.tokenUri}
              sound={sound}
            />
          ))}
        </ul>

        { 
          showError && 
          <ModalError message={message} handleClose={closeModalError} />
        }

        { 
          showLoader && 
          <ModalLoader message={message} handleClose={closeModalLoader} />
        }

        { 
          showSuccess && 
          <ModalSuccess message={newLick} handleClose={closeModalSuccess} />
        }

    </main>
  );
};

export default Home;
