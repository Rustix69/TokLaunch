import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ArrowRightIcon } from '@radix-ui/react-icons';

const TokenLaunchpad  = () => {
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenImageLink, setTokenImageLink] = useState('');
  const [initialSupply, setInitialSupply] = useState('');

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
        <Button className="w-full h-14 text-lg font-medium">Launch Token <ArrowRightIcon className="w-4 h-4 ml-2" /></Button>
      </CardFooter>
    </Card>
  );
};

export default TokenLaunchpad;
