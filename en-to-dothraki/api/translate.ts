import fetch from "node-fetch";

const baseURL = `https://api.funtranslations.com/translate/dothraki.json`;

export default async function (req, res) {
  const { text = "" } = req.query;
  const raw = await fetch(`${baseURL}?text=${text}`, {
    headers: {
      "X-Forwarded-For": `${rngRnd(0, 255)}.${rngRnd(0, 255)}.${rngRnd(
        0,
        255
      )}.${rngRnd(0, 255)}`,
    },
  });
  const resp = await raw.json();
  res.status(200).send(resp);
}

function rngRnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
