const items = [
    { item: "Moon-Touched Sword", link: "http://dnd5e.wikidot.com/wondrous-items:moon-touched-sword", rarity: "Common" },
    { item: "Alchemy Jug", link: "http://dnd5e.wikidot.com/wondrous-items:alchemy-jug", rarity: "Uncommon" },
    { item: "Amulet of Health", rarity: "Rare", link: "http://dnd5e.wikidot.com/wondrous-items:amulet-of-health" },
    { item: "Arcane Grimoire", rarity: "Very Rare", link: "http://dnd5e.wikidot.com/wondrous-items:arcane-grimoire" },
    { item: "Cloak of Invisibility", rarity: "Legendary", link: "http://dnd5e.wikidot.com/wondrous-items:cloak-of-invisibility" },
    { item: "Ring of Winter", rarity: "Artifact", link: "http://dnd5e.wikidot.com/wondrous-items:ring-of-winter" },
    { item: "Armblade", rarity: "Common", link: "http://dnd5e.wikidot.com/wondrous-items:armblade" },
    { item: "Armor of Gleaming", rarity: "Common", link: "http://dnd5e.wikidot.com/wondrous-items:armor-of-gleaming" },
    { item: "Boots of False Tracks", rarity: "Common", link: "http://dnd5e.wikidot.com/wondrous-items:boots-of-false-tracks" },
    { item: "Breathing Bubble", rarity: "Common", link: "http://dnd5e.wikidot.com/wondrous-items:breathing-bubble" },
    { item: "Cloak of Billowing", rarity: "Common", link: "http://dnd5e.wikidot.com/wondrous-items:cloak-of-billowing" },
    { item: "Clockwork Amulet", rarity: "Common", link: "http://dnd5e.wikidot.com/wondrous-items:clockwork-amulet" },
    { item: "", rarity: "", link: "" },
    { item: "", rarity: "", link: "" }
];

async function getRandomItem (target) {
    var rarity = $("#rarity").children("option:selected").val();
    // var list = items.filter(f => f.rarity === rarity);

    const response = await fetch('https://api.open5e.com/magicitems/?format=json');
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson

    var list = await myJson.results.filter(f => f.rarity === rarity.toLowerCase());
    console.log(list);
    var item = list[getRandomInt(0, list.length)];

    $("#"+target).html(`<a target='_blank' href="http://dnd5e.wikidot.com/wondrous-items:${item.slug}">${item.name}</a>`);
    $("#item-rarity").html(item.rarity);
    $("#attunement").html(item.requires_attunement);
    $("#type").html(item.type);
    var desc = item.desc;
    desc = desc.replace("**_", "<strong>").replace("_**", "</strong>");
    desc = desc.replace(" * ", "</br></br> - ");
    console.log(desc);
    $("#description").html(desc);
}