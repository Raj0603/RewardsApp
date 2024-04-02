import Web3 from "web3";
import {
  WALLET_BALANCE_FAIL,
  WALLET_BALANCE_REQUEST,
  WALLET_BALANCE_SUCCESS,
} from "../constants/walletConstant";

// Get Balance

export const getBalance = (walletId) => async (dispatch) => {
  try {
    const web3 = new Web3(window.ethereum);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const contract = new web3.eth.Contract(
      [
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "balances",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "studentWallet",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "fromStudent",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "studentWallet",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "fromTeacher",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      "0x46A1C385F4bC9807AceC6676e8419fbf55739b69"
    );

    dispatch({ type: WALLET_BALANCE_REQUEST });
    const balance = await contract.methods.balances(walletId).call();

    const balanceValue = Number(balance);
    dispatch({
      type: WALLET_BALANCE_SUCCESS,
      payload: balanceValue,
    });
  } catch (error) {
    dispatch({
      type: WALLET_BALANCE_FAIL,
      payload: error.message,
    });
  }
};
