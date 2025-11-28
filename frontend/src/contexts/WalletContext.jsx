import React, { createContext, useContext, useState } from 'react';
import { mockWallets, mockUser } from '../mockDataPalmPay';

const WalletContext = createContext();

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [selectedWallet, setSelectedWallet] = useState(mockWallets[0]); // Default to UPI wallet
  const [wallets] = useState(mockWallets);

  const switchWallet = (walletId) => {
    const wallet = wallets.find(w => w.id === walletId);
    if (wallet) {
      setSelectedWallet(wallet);
    }
  };

  const getWalletBalance = (type) => {
    const wallet = wallets.find(w => w.type === type);
    return wallet ? wallet.balance : 0;
  };

  const getTotalBalance = () => {
    return wallets.reduce((total, wallet) => total + wallet.balance, 0);
  };

  const updateWalletBalance = (walletId, newBalance) => {
    // Mock update - in real app would call API
    console.log(`Updating ${walletId} to ${newBalance}`);
  };

  const value = {
    selectedWallet,
    wallets,
    switchWallet,
    getWalletBalance,
    getTotalBalance,
    updateWalletBalance
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
