import { createDID, registerDID } from "@ayanworks/polygon-did-registrar";
import * as dotenv from 'dotenv'
dotenv.config()

const network: string = "testnet";

async function main() {
  // pad private key with 0x
  let pk = process.env.PRIVATE_KEY;
  if (!pk.startsWith("0x")) {
    // pad 0x to private key
    pk = `0x${pk}`;
  }

  // create a new did
  const did = await createDID(network, pk);
  console.log("DID created: ", did.data.did);

  // register the did
  const txHash = await registerDID(did.data.did, pk);
  console.log("DID registered: ", txHash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
