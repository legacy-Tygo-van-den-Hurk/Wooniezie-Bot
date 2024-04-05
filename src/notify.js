const { WebhookClient, MessagePayload } = require("discord.js");

const client = new WebhookClient({
  url: "discord webhook url here", // TODO
});

const notifyHouse = async (house) => {
  const fields = [];
  fields.push({
    name: "Prijs / Totale prijs",
    value: `€${house.netRent} / €${house.totalRent}`,
  });
  fields.push({
    name: "Locatie",
    value: `${house.city.name} - ${house.quarter.name} - ${house.neighborhood.name}`,
  });
  if (house.dwellingType.localizedName) {
    fields.push({
      name: "Woningtype",
      value: house.dwellingType.localizedName,
    });
  }
  if (house.areaDwelling > 0) {
    fields.push({
      name: "Woon-oppervlakte",
      value: `${house.areaDwelling} m²`,
    });
  }

  await client.send(
    new MessagePayload(client, {
      username: "Wooniezie Notifier",
      avatarURL:
        "https://www.wooniezie.nl/typo3conf/ext/zig_skin_wrv_default/Resources/Public/Images/customer/favicon/favicon-32x32.png",
      content: "@everyone",
      allowedMentions: {
        parse: ["everyone"],
      },
      embeds: [
        {
          title: `${house.street} ${house.houseNumber}`,
          url: `https://www.wooniezie.nl/aanbod/nu-te-huur/te-huur/details/${house.urlKey}`,
          color: null,
          fields: fields,
          image:
            (house.pictures?.length ?? 0) > 0
              ? {
                  url: `https://www.wooniezie.nl${house.pictures[0].uri}`,
                }
              : undefined,
        },
      ],
    })
  );
};

module.exports = { notifyHouse };
