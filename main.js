import Phaser from "phaser";
import GAMEScene from "./game.js";
import { connectWallet, getTokenBalance } from "./wallet.js";

const connectWalletBtn = document.getElementById("connectWalletBtn");
const tokenBalanceSpan = document.getElementById("tokenBalance");
const CaughtSpan = document.getElementById("Caught");
const catchBtn = document.getElementById("catchBtn");
const notification = document.getElementById("notification");

let signer = null;
let CaughtCount = 0;

connectWalletBtn.onclick = async () => {
  signer = await connectWallet();
  if (signer) {
    connectWalletBtn.disabled = true;
    catchBtn.disabled = false;
    notification.textContent = "Wallet connected!";
    updateTokenBalance();
  }
};

async function updateTokenBalance() {
  if (!signer) return;
  const balance = await getTokenBalance(signer);
  tokenBalanceSpan.textContent = balance;
}

catchBtn.onclick = () => {
  game.scene.keys["Scene"].catch();
};

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: { default: "arcade" },
  parent: "game-container",
  scene: [Scene],
};

const game = new Phaser.Game(config);

// Fungsi untuk update UI dari scene
export function incrementFishCaught() {
  fishCaughtCount++;
  fishCaughtSpan.textContent = fishCaughtCount;
}

export function showNotification(msg) {
  notification.textContent = msg;
  setTimeout(() => (notification.textContent = ""), 3000);
}
