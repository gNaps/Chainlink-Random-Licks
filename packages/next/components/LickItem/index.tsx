import React, { useCallback, useEffect, useState } from "react";
import { formatAddress, formatTokenUri } from "../../utils/format";
import styles from "./LickItem.module.scss";
//import getContract from "../../utils/getContract";
import { useUser } from "../../context/UserContext";
import { playMusic } from "../../utils/sounds";

const LickItem: React.FC<{
  id: string;
  owner: string;
  tokenUri: string;
  sound: string;
}> = ({ id, owner, tokenUri, sound }) => {
    const user = useUser();

    return (
        <li className={styles.lickItem}>
            <div className={styles.main}>
                <div className={styles.owner}>
                    <img src={`/user_${Math.floor(Math.random() * 7) + 1}.svg`} />
                    <div>
                        <span className={styles.text_small}>Owned by</span>
                        <span>{formatAddress(owner)}</span>
                    </div>
                </div>
                <div className={styles.item_content}>
                    <div>
                        <h4>{formatTokenUri(tokenUri)}</h4>
                        <div className={styles.item_action}>
                            <button
                                type="button"
                                className={styles.btn}
                                onClick={() => playMusic(formatTokenUri(tokenUri), sound)}
                            >
                                <p>Play</p>
                                <img src="play-circle-solid.svg" />
                            </button>
                        </div>
                    </div>
                    <img src={`/content-icon_${Math.floor(Math.random() * 3) + 1}.svg`} />
                </div>
            </div>
        </li>
    );
};

export default LickItem;