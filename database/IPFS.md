	
ETHCPNFTmetadata.json CID:
```
bafkreidnh4n72dykxikszwonfrwm4rufguwzo5vopkotvb63jgfxbls75u
```

ETHCP.jpg CID:
```
bafkreierq5aog6ixkkn3ds7rmspx3amsdkxo7kmwjq37erfugehum4bszq
```

ETHCP-NFT Base Sepolia 测试网合约地址：
```
0x8CABdCeE9eE595Fc2133037C341E2DDD006138e0
```


合约里 mint 时传的 tokenURI 是该 Metadata JSON 的 IPFS URI

solidity
复制
编辑
safeMint(userAddress, "ipfs://bafkreigx3qnctbv4i2hk33iqpp7udsitywek2att25q4t7wj55p44jgaz4");
这样 NFT 市场加载 tokenURI，解析 JSON，发现 image 指向 IPFS CID，就会自动去该 CID 取图片显示

