/* ── Site-wide translations ── */

export interface SiteStrings {
  hero: {
    subtitle: string;
    tagline: [string, string];
    cta: string;
  };
  alliance: {
    title: string;
    subtitle: string;
    protocols: { role: string; desc: string }[];
  };
  langSelect: {
    title: string;
    subtitle: string;
    selected: string;
  };
}

const PROTOCOL_NAMES = [
  "Exchange Art", "DRiP", "Realms", "MagicBlock", "Tapestry", "Audius",
  "Portals", "KYD Labs", "Torque", "Sunrise", "BIO", "OrbitFlare",
];

export { PROTOCOL_NAMES };

export const STRINGS: Record<string, SiteStrings> = {
  en: {
    hero: {
      subtitle: "The Last Stand",
      tagline: [
        "Crypto elites and the trenches left these for dead.",
        "But the best time to build is when everyone else has left.",
      ],
      cta: "Read the Comic",
    },
    alliance: {
      title: "THE ALLIANCE",
      subtitle: "12 protocols that refused to die. Together, they fought the bear.",
      protocols: [
        { role: "The Anchor", desc: "Kept the gallery lights on when every other marketplace went dark." },
        { role: "The Distributor", desc: "Free collectibles kept culture alive when no one was buying." },
        { role: "The Coordinator", desc: "Governance that rallied scattered builders into a unified front." },
        { role: "The Warrior", desc: "On-chain gaming engine that refused to stop shipping." },
        { role: "The Communicator", desc: "Social layer that kept the community connected through the silence." },
        { role: "The Morale", desc: "Music streaming that gave builders a soundtrack for the bear." },
        { role: "The Strategist", desc: "Cross-chain bridge planning the escape routes no one else saw." },
        { role: "The Gatherer", desc: "Ticketing that kept real-world events alive when Discord went quiet." },
        { role: "The Engine", desc: "Loyalty infrastructure that rewarded those who stayed." },
        { role: "The Bridge", desc: "Cross-chain interop that connected the isolated survivors." },
        { role: "The Innovator", desc: "Decentralized science pushing boundaries even in the cold." },
        { role: "The Accelerator", desc: "Execution layer that made the final counterattack possible." },
      ],
    },
    langSelect: {
      title: "CHOOSE YOUR LANGUAGE",
      subtitle: "Pick a language and dive into the story.",
      selected: "Selected",
    },
  },
  hi: {
    hero: {
      subtitle: "\u0905\u0902\u0924\u093F\u092E \u0938\u094D\u091F\u0948\u0902\u0921",
      tagline: [
        "\u0915\u094D\u0930\u093F\u092A\u094D\u091F\u094B \u0915\u0947 \u0915\u0941\u0932\u0940\u0928 \u0914\u0930 \u091F\u094D\u0930\u0947\u0902\u091A\u0947\u0938 \u0928\u0947 \u0907\u0928\u094D\u0939\u0947\u0902 \u092E\u0930\u093E \u0939\u0941\u0906 \u092E\u093E\u0928 \u0932\u093F\u092F\u093E\u0964",
        "\u0932\u0947\u0915\u093F\u0928 \u092C\u0928\u093E\u0928\u0947 \u0915\u093E \u0938\u092C\u0938\u0947 \u0905\u091A\u094D\u091B\u093E \u0938\u092E\u092F \u0924\u092C \u0939\u0948 \u091C\u092C \u092C\u093E\u0915\u0940 \u0938\u092C \u091C\u093E \u091A\u0941\u0915\u0947 \u0939\u094B\u0902\u0964",
      ],
      cta: "\u0915\u0949\u092E\u093F\u0915 \u092A\u0922\u093C\u0947\u0902",
    },
    alliance: {
      title: "\u0917\u0920\u092C\u0902\u0927\u0928",
      subtitle: "12 \u092A\u094D\u0930\u094B\u091F\u094B\u0915\u0949\u0932 \u091C\u093F\u0928\u094D\u0939\u094B\u0902\u0928\u0947 \u092E\u0930\u0928\u0947 \u0938\u0947 \u0907\u0928\u0915\u093E\u0930 \u0915\u0930 \u0926\u093F\u092F\u093E\u0964 \u0938\u093E\u0925 \u092E\u093F\u0932\u0915\u0930 \u0909\u0928\u094D\u0939\u094B\u0902\u0928\u0947 \u092D\u093E\u0932\u0942 \u0938\u0947 \u0932\u0921\u093C\u093E\u0964",
      protocols: [
        { role: "\u0906\u0927\u093E\u0930\u0936\u093F\u0932\u093E", desc: "\u091C\u092C \u0939\u0930 \u0926\u0942\u0938\u0930\u093E \u092C\u093E\u091C\u093C\u093E\u0930 \u0905\u0902\u0927\u0947\u0930\u093E \u0939\u094B \u0917\u092F\u093E, \u0924\u092C \u0917\u0948\u0932\u0930\u0940 \u0915\u0940 \u0930\u094B\u0936\u0928\u0940 \u091C\u0932\u093E\u090F \u0930\u0916\u0940\u0964" },
        { role: "\u0935\u093F\u0924\u0930\u0915", desc: "\u092E\u0941\u092B\u093C\u094D\u0924 \u0938\u0902\u0917\u094D\u0930\u0939\u0923\u0940\u092F \u0935\u0938\u094D\u0924\u0941\u0913\u0902 \u0928\u0947 \u0938\u0902\u0938\u094D\u0915\u0943\u0924\u093F \u0915\u094B \u091C\u0940\u0935\u093F\u0924 \u0930\u0916\u093E\u0964" },
        { role: "\u0938\u092E\u0928\u094D\u0935\u092F\u0915", desc: "\u0936\u093E\u0938\u0928 \u0928\u0947 \u092C\u093F\u0916\u0930\u0947 \u0928\u093F\u0930\u094D\u092E\u093E\u0924\u093E\u0913\u0902 \u0915\u094B \u090F\u0915 \u092E\u094B\u0930\u094D\u091A\u0947 \u092E\u0947\u0902 \u0916\u0921\u093C\u093E \u0915\u093F\u092F\u093E\u0964" },
        { role: "\u092F\u094B\u0926\u094D\u0927\u093E", desc: "\u0911\u0928-\u091A\u0947\u0928 \u0917\u0947\u092E\u093F\u0902\u0917 \u0907\u0902\u091C\u0928 \u091C\u093F\u0938\u0928\u0947 \u0936\u093F\u092A\u093F\u0902\u0917 \u092C\u0902\u0926 \u0928\u0939\u0940\u0902 \u0915\u0940\u0964" },
        { role: "\u0938\u0902\u091A\u093E\u0930\u0915", desc: "\u0938\u093E\u092E\u093E\u091C\u093F\u0915 \u092A\u0930\u0924 \u091C\u093F\u0938\u0928\u0947 \u0938\u092E\u0941\u0926\u093E\u092F \u0915\u094B \u0916\u093E\u092E\u094B\u0936\u0940 \u092E\u0947\u0902 \u091C\u094B\u0921\u093C\u0947 \u0930\u0916\u093E\u0964" },
        { role: "\u092E\u0928\u094B\u092C\u0932", desc: "\u0938\u0902\u0917\u0940\u0924 \u0938\u094D\u091F\u094D\u0930\u0940\u092E\u093F\u0902\u0917 \u091C\u093F\u0938\u0928\u0947 \u0928\u093F\u0930\u094D\u092E\u093E\u0924\u093E\u0913\u0902 \u0915\u094B \u092D\u093E\u0932\u0942 \u0915\u093E \u0938\u093E\u0909\u0902\u0921\u091F\u094D\u0930\u0948\u0915 \u0926\u093F\u092F\u093E\u0964" },
        { role: "\u0930\u0923\u0928\u0940\u0924\u093F\u0915\u093E\u0930", desc: "\u0915\u094D\u0930\u0949\u0938-\u091A\u0947\u0928 \u092C\u094D\u0930\u093F\u091C \u091C\u093F\u0938\u0928\u0947 \u0935\u094B \u0930\u093E\u0938\u094D\u0924\u0947 \u092C\u0928\u093E\u090F \u091C\u094B \u0915\u093F\u0938\u0940 \u0928\u0947 \u0928\u0939\u0940\u0902 \u0926\u0947\u0916\u0947\u0964" },
        { role: "\u0938\u0902\u0917\u094D\u0930\u093E\u0939\u0915", desc: "\u091F\u093F\u0915\u091F\u093F\u0902\u0917 \u091C\u093F\u0938\u0928\u0947 \u0935\u093E\u0938\u094D\u0924\u0935\u093F\u0915 \u0906\u092F\u094B\u091C\u0928\u094B\u0902 \u0915\u094B \u091C\u0940\u0935\u093F\u0924 \u0930\u0916\u093E\u0964" },
        { role: "\u0907\u0902\u091C\u0928", desc: "\u0935\u092B\u093C\u093E\u0926\u093E\u0930\u0940 \u092C\u0941\u0928\u093F\u092F\u093E\u0926\u0940 \u0922\u093E\u0901\u091A\u093E \u091C\u093F\u0938\u0928\u0947 \u0930\u0941\u0915\u0947 \u0930\u0939\u0928\u0947 \u0935\u093E\u0932\u094B\u0902 \u0915\u094B \u092A\u0941\u0930\u0938\u094D\u0915\u0943\u0924 \u0915\u093F\u092F\u093E\u0964" },
        { role: "\u0938\u0947\u0924\u0941", desc: "\u0915\u094D\u0930\u0949\u0938-\u091A\u0947\u0928 \u0907\u0902\u091F\u0930\u0911\u092A \u091C\u093F\u0938\u0928\u0947 \u0905\u0932\u0917-\u0925\u0932\u0917 \u092C\u091A\u0947 \u0939\u0941\u0913\u0902 \u0915\u094B \u091C\u094B\u0921\u093C\u093E\u0964" },
        { role: "\u0928\u0935\u092A\u094D\u0930\u0935\u0930\u094D\u0924\u0915", desc: "\u0935\u093F\u0915\u0947\u0928\u094D\u0926\u094D\u0930\u0940\u0915\u0943\u0924 \u0935\u093F\u091C\u094D\u091E\u093E\u0928 \u091C\u094B \u0920\u0902\u0921 \u092E\u0947\u0902 \u092D\u0940 \u0938\u0940\u092E\u093E\u090F\u0901 \u0924\u094B\u0921\u093C\u0924\u093E \u0930\u0939\u093E\u0964" },
        { role: "\u0924\u094D\u0935\u0930\u0915", desc: "\u0928\u093F\u0937\u094D\u092A\u093E\u0926\u0928 \u092A\u0930\u0924 \u091C\u093F\u0938\u0928\u0947 \u0905\u0902\u0924\u093F\u092E \u092A\u0932\u091F\u0935\u093E\u0930 \u0915\u094B \u0938\u0902\u092D\u0935 \u092C\u0928\u093E\u092F\u093E\u0964" },
      ],
    },
    langSelect: {
      title: "\u0905\u092A\u0928\u0940 \u092D\u093E\u0937\u093E \u091A\u0941\u0928\u0947\u0902",
      subtitle: "\u090F\u0915 \u092D\u093E\u0937\u093E \u091A\u0941\u0928\u0947\u0902 \u0914\u0930 \u0915\u0939\u093E\u0928\u0940 \u092E\u0947\u0902 \u0921\u0942\u092C\u0947\u0902\u0964",
      selected: "\u091A\u092F\u0928\u093F\u0924",
    },
  },
  es: {
    hero: {
      subtitle: "La \u00daltima Resistencia",
      tagline: [
        "Las \u00e9lites cripto y las trincheras los dieron por muertos.",
        "Pero el mejor momento para construir es cuando todos se han ido.",
      ],
      cta: "Leer el C\u00f3mic",
    },
    alliance: {
      title: "LA ALIANZA",
      subtitle: "12 protocolos que se negaron a morir. Juntos, lucharon contra el oso.",
      protocols: [
        { role: "El Ancla", desc: "Mantuvo las luces de la galer\u00eda encendidas cuando cada otro mercado se oscureci\u00f3." },
        { role: "El Distribuidor", desc: "Los coleccionables gratuitos mantuvieron viva la cultura cuando nadie compraba." },
        { role: "El Coordinador", desc: "La gobernanza que uni\u00f3 a constructores dispersos en un frente unificado." },
        { role: "El Guerrero", desc: "Motor de juegos on-chain que se neg\u00f3 a dejar de desarrollar." },
        { role: "El Comunicador", desc: "Capa social que mantuvo conectada a la comunidad durante el silencio." },
        { role: "La Moral", desc: "Streaming de m\u00fasica que dio a los constructores una banda sonora para el oso." },
        { role: "El Estratega", desc: "Puente cross-chain que planific\u00f3 las rutas de escape que nadie m\u00e1s vio." },
        { role: "El Recolector", desc: "Ticketing que mantuvo los eventos en vivo cuando Discord se qued\u00f3 en silencio." },
        { role: "El Motor", desc: "Infraestructura de lealtad que recompens\u00f3 a quienes se quedaron." },
        { role: "El Puente", desc: "Interoperabilidad cross-chain que conect\u00f3 a los sobrevivientes aislados." },
        { role: "El Innovador", desc: "Ciencia descentralizada empujando l\u00edmites incluso en el fr\u00edo." },
        { role: "El Acelerador", desc: "Capa de ejecuci\u00f3n que hizo posible el contraataque final." },
      ],
    },
    langSelect: {
      title: "ELIGE TU IDIOMA",
      subtitle: "Elige un idioma y sum\u00e9rgete en la historia.",
      selected: "Seleccionado",
    },
  },
};

export function getStrings(lang: string): SiteStrings {
  return STRINGS[lang] || STRINGS.en;
}
