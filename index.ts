import Arweave from "arweave";
const arweave = Arweave.init({})



for (let i = 0; i < 5000; i++) {
    const JWK = await arweave.wallets.generate()

    const address = await arweave.wallets.jwkToAddress(JWK)

    console.log()
    console.log(address)


}


