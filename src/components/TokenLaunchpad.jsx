import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ArrowRightIcon, ReloadIcon } from '@radix-ui/react-icons';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMint2Instruction, getMinimumBalanceForRentExemptMint } from "@solana/spl-token";

const TokenLaunchpad = () => {
  const { connection } = useConnection();
  const wallet = useWallet();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [mintAddress, setMintAddress] = useState('');

  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenImageLink, setTokenImageLink] = useState('');
  const [initialSupply, setInitialSupply] = useState('');

  const handleLaunchToken = async () => {
    if (!wallet.connected) {
      setIsError(true);
      return;
    }
    try {
      setIsLoading(true);
      setIsError(false);
      setIsSuccess(false);

      const mintKeypair = Keypair.generate();
      const lamports = await getMinimumBalanceForRentExemptMint(connection);

      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: wallet.publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: MINT_SIZE,
          lamports,
          programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeMint2Instruction(
          mintKeypair.publicKey,
          9,
          wallet.publicKey,
          wallet.publicKey,
          TOKEN_PROGRAM_ID
        )
      );
      
      transaction.feePayer = wallet.publicKey;
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      transaction.partialSign(mintKeypair);

      const signature = await wallet.sendTransaction(transaction, connection);
      
      await connection.confirmTransaction({
        signature,
        ...(await connection.getLatestBlockhash()),
      });

      const mintAddress = mintKeypair.publicKey.toBase58();
      console.log(`Token mint created at ${mintAddress}`);
      setMintAddress(mintAddress);
      setIsSuccess(true);
    } catch (error) {
      console.error('Error launching token:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="pb-6">
        <CardTitle className="text-3xl font-bold text-center">Tok Launch</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Token Name</label>
          <Input
            type="text"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            placeholder="Enter token name"
            className="h-12 text-lg px-4"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Token Symbol</label>
          <Input
            type="text"
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value)}
            placeholder="Enter token symbol"
            className="h-12 text-lg px-4"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Token Image Link</label>
          <Input
            type="text"
            value={tokenImageLink}
            onChange={(e) => setTokenImageLink(e.target.value)}
            placeholder="Enter token image link"
            className="h-12 text-lg px-4"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Initial Supply</label>
          <Input
            type="text"
            value={initialSupply}
            onChange={(e) => setInitialSupply(e.target.value)}
            placeholder="Enter initial supply"
            className="h-12 text-lg px-4"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 pt-4">
        <WalletMultiButton className="w-full h-14 text-lg">Connect Wallet</WalletMultiButton>
        <Button 
          className="w-full h-14 text-lg font-medium" 
          onClick={handleLaunchToken}
          disabled={isLoading || !wallet.connected}
        >
          {isLoading ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Launching...
            </>
          ) : (
            <>
              Launch Token <ArrowRightIcon className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
        {isError && <p className="text-red-500 text-center">Error launching token. Please make sure your wallet is connected.</p>}
        {isSuccess && (
          <div className="text-green-700 text-center">
            <p>Token launched successfully!</p>
            <p className="text-sm mt-1">Mint Address: {mintAddress}</p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default TokenLaunchpad;
