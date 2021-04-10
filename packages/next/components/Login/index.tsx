import { useWeb3React } from "@web3-react/core";
import { useLogin, useUser } from "../../context/UserContext";
import { useBalances } from "../../context/BalanceContext";
import handleConnetionError from "../../utils/handleConnectionError";
import { formatERC20, formatAddress } from "../../utils/format";
import styles from "./Login.module.scss";

const Login: React.FC = () => {
  const login = useLogin();
  const user = useUser();
  const balance = useBalances();
  const { chainId, error } = useWeb3React();

  if (error) {
    return <div className={styles.login}>{handleConnetionError(error)}</div>;
  }
  if (user) {
    return (
      <div className={styles.navbar}>
        {/* Connected as: {user.address} - Network: {chainId} - Balance: {balance.eth.toString()} */}
        <img src={`/user_${Math.floor(Math.random() * 7) + 1}.svg`} />
        <p>{formatAddress(user.address)}</p>
        <div>
          <p>Balance: {formatERC20(balance.eth, 18)}</p>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.login}>
      <button type="button" onClick={() => login()}>
        Login with Metamask
      </button>
    </div>
  );
};
export default Login;