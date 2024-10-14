import { cwd } from "process";

export default function showDir() {
  console.log(`You are curently in ${cwd()}`);
}