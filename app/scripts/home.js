import { elementFactory } from "./helper_functions.js";
export function createHome({ parentElt }) {
  parentElt.innerHTML = "";
  const homepage = elementFactory({
    eltType: "div",
  });
  const card = elementFactory({
    eltType: "section",
    parentElt: homepage,
    classNames: ["box_container"],
  });
  const header = elementFactory({
    eltType: "h1",
    parentElt: card,
    attrs: [{ name: "style", value: "color: gold;" }],
    text: "Pokémon Team Builder\n",
  });
  const subcard = elementFactory({
    eltType: "div",
    parentElt: card,
    classNames: "card",
  });
  const subHeader = elementFactory({
    eltType: "h2",
    parentElt: subcard,
    text: "Build your dream Pokémon team!\n",
  });
  const p = elementFactory({
    eltType: "p",
    parentElt: subcard,
    text: "Pokémon Team Builder is designed to help you design your dream team.\n",
  });
  const p2 = elementFactory({
    eltType: "p",
    parentElt: subcard,
    text: "Create and design custom Pokémon teams for better battle organizations\n",
  });
  const disclaimer = elementFactory({
    eltType: "h5",
    parentElt: subcard,
    text: "Disclosure: This app is created as a team learning project and is not intended for marketing purposes or external use.\n",
    attrs: [{ name: "style", value: "font-size: 10px;" }],
  });
  const p3 = elementFactory({
    eltType: "p",
    parentElt: subcard,
    text: "All rights belong to GameFreak and Nintendo.\n",
  });

  const audio = elementFactory({
    eltType: "figure",
    parentElt: homepage,
    attrs: [
      {
        name: "style",
        value: "display:flex;flex-direction:column;align-items:center",
      },
    ],
  });
  const caption = elementFactory({
    eltType: "figcaption",
    parentElt: audio,
    text: "Pokémon Theme Song(TM)",
    attrs: [{ name: "style", value: "color: white;" }],
  });
  const sounds = elementFactory({
    eltType: "audio",
    parentElt: audio,
    attrs: [
      { name: "controls" },
      { name: "autoplay" },
      { name: "src", value: "./app/Audio/Pokémon_Theme_Song.mp4" },
    ],
  });

  parentElt.appendChild(homepage);
}
