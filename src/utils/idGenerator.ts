export default function generatorId() {
  return "i" + Date.now() + Math.round(Math.random() * 1000) + "d";
}
