const bscNetwork = {
  chainId: `0x${Number(56).toString(16)}`,
  chainName: 'Binance Smart Chain',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18
  },
  rpcUrls: ['https://bsc-dataseed.binance.org/']
}

const switchChain = async(provider) => {
  await provider.request({
    method: 'wallet_switchEthereumChain',
    params: [
      {
        chainId: bscNetwork.chainId,
      }
    ]
  })
}

const addChain = async(provider) => {
  try {
    await provider.request({
      method: 'wallet_addEthereumChain',
      params: [bscNetwork]
    })
  }
  catch (error) {
    if (error.code === 4001) {
      alert('User rejected');
    }
    else {
      alert(error);
    }
  }
}

const requestAccounts = async(provider) => {
  try {
    const accounts = await provider.request({ method: 'eth_requestAccounts' });
    return accounts[0];
  }
  catch (error) {
    alert(error);
    return null;
  }
}

const showBalance = async() => {
  try {
    const balance = await window.web3Provider.getBalance(window.account);
    if (balance) {
      alert(`Số dư: ${Math.round(Number(balance) / 10 ** bscNetwork.nativeCurrency.decimals)} ETH`);
    }
    else {
      alert('Balance is unavailable');
    }
  }
  catch (error) {
    alert('Something went wrong');
  }
}

const showTokenBalance = async() => {
  const address = qashConfig.address // QASH
  const contract = new ethers.Contract(address, qashABI, window.web3Provider);
  const tokenBalance = await contract.balanceOf(account);

  if (tokenBalance) {
    alert(`Số dư: ${(Number(tokenBalance) / 10 ** qashConfig.decimals)} QASH`);
  }
}

const connect = async () => {
  const provider = await detectEthereumProvider();

  if (provider) {
    try {
      await switchChain(provider);

      const web3Provider = new ethers.providers.Web3Provider(provider, 'any');
      const account = await requestAccounts(provider);

      if (account) {
        window.account = account;
        window.web3Provider = web3Provider;
        document.getElementById('address').innerHTML = account;
        document.getElementById('btn-connect').style.display = 'none';
        document.getElementById('btn-balance-eth').style.display = 'block';
        document.getElementById('btn-balance-qash').style.display = 'block';
      }
    }
    catch (error) {
      if (error.code == 4902) {
        await addChain(provider);
      }
      else if (error.code == 4001) {
        alert('User rejected');
      }
      else {
        alert(error);
      }
    }

  } else {
    alert('MetaMask not found');
  }
}




/////////////// WALLETCONNECT

(async() => {
  const WalletConnectProvider = window.WalletConnectProvider.default;

  var provider = new WalletConnectProvider({
    infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
    rpc: {
      56: "https://bsc-dataseed.binance.org/"
    }
  });
});

class WalletConnectExample extends React.Component {
  componentDidMount() {
    const WalletConnectProvider = window.WalletConnectProvider.default;
    const provider = new WalletConnectProvider({
      infuraId: undefined,
      supportedChainIds: [56],
      rpc: {
        56: "https://bsc-dataseed.binance.org/"
      }
    });

    (async() => {
      await provider.enable();

      this.web3Provider = new ethers.providers.Web3Provider(provider);

      await switchChain(this.web3Provider);
    })();
  }

  render() {
    return (
      <div>Nhân Vũ</div>
    )
  }
}

// const domContainer = document.querySelector('#root');
// const root = ReactDOM.createRoot(domContainer);
// root.render(<WalletConnectExample />);
