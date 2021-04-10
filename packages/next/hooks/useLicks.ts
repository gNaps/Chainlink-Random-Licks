import { useQuery } from "@apollo/client";
import { Lick } from "../models/Lick";
import { GET_ALL_LICKS, GET_MY_LICKS } from "../utils/graphql";
import { useUser } from "../context/UserContext";

const useLicks = (filter: boolean): Lick[] => {  
  const user = useUser();
  if(!filter) {
    const { data } = useQuery(GET_ALL_LICKS, {
      variables: { replyTo: "" },
      pollInterval: 2000,
      fetchPolicy: "cache-and-network",
    });

    return data?.tokens || [];
  } else {
    const { data } = useQuery(GET_MY_LICKS, {
      variables: { owner: user.address.toLowerCase() },
      pollInterval: 2000,
      fetchPolicy: "cache-and-network",
    });

    return data?.tokens || [];
  }
};

export default useLicks;