import Arweave from "arweave";
import Anthropic from "@anthropic-ai/sdk";

async function askClaude(content: string) {
  const anthropic = new Anthropic({
    apiKey: process.env.claudeAPIKey,
  });

  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 1024,
    messages: [{ role: "user", content }],
  });

  return msg;
}

const arweave = Arweave.init({});
for (let i = 0; i < 5000; i++) {
  const JWK = await arweave.wallets.generate();

  const address = await arweave.wallets.jwkToAddress(JWK);

  const content = `
  
  This is a arweave address qSkybuaxAQ3cX7LJb7TlIu_vswpC7feQ8a14GGtBYFg sometimes they start with a word or text that looks like a word or it looks unusual or cool. 
  
  For example d0g_ybuaxAQ3cX7LJb7TlIu_vswpC7feQ8a14GGtBYFg looks like dog. 
  
  I want you to find more addresses that look like words or names. 
  
  Whenever I send you an address that looks like words or names please only respond with true, else please respond with false. 
  
  For this address what do you respond with: ${address} true or false. 
  
  Please Only ever respond with a lower case "true" if it is true and only ever respond with a lower case false if its false.
  
  `;

  const claude = await askClaude(content);

  // @ts-ignore
  if (claude.content[0].text === "true") {
    console.log();
    console.log(JWK);
    console.log(address);
  }
}
