var items = [
    { name: "Moon-Touched Sword", slug: "moon-touched-sword", rarity: "Common", type: "Weapon", desc: "" },
    { name: "Ring of Winter", rarity: "Artifact", slug: "ring-of-winter", type: "Wonderous item", desc: "" },
    { name: "Armblade", rarity: "Common", slug: "armblade", type: "Weapon", desc: "" },
    { name: "Armor of Gleaming", rarity: "Common", slug: "armor-of-gleaming", type: "Armor", desc: "" },
    { name: "Boots of False Tracks", rarity: "Common", slug: "boots-of-false-tracks", type: "Wonderous item", desc: "" },
    { name: "Breathing Bubble", rarity: "Common", slug: "breathing-bubble", type: "Wonderous item", desc: "" },
    { name: "Cloak of Billowing", rarity: "Common", slug: "cloak-of-billowing", type: "Wonderous item", desc: "" },
    { name: "Clockwork Amulet", rarity: "Common", slug: "clockwork-amulet", type: "Wonderous item", desc: "" },
    { name: "", rarity: "", link: "" },
    { name: "", rarity: "", link: "" }
];

async function getRandomItem (target) {
    $("#item-rarity").html("");
    $("#attunement").html("");
    $("#type").html("");

    var rarity = $("#rarity").children("option:selected").val();

    var list = items.filter(f => f.rarity.toLowerCase() === rarity.toLowerCase());
    var item = list[getRandomInt(0, list.length)];

    $("#"+target).html(`<a target='_blank' href="http://dnd5e.wikidot.com/wondrous-items:${item.slug}">${item.name}</a>`);
    $("#item-rarity").html(capitalizeFirstLetter(item.rarity));
    $("#attunement").html(item.requires_attunement === "requires attunement" ? "Yes" : "No");
    $("#type").html(item.type);
    var desc = item.desc;
    $("#"+target).prop("title", desc);
}

$(document).ready(async function(){
    const response = await fetch('https://api.open5e.com/magicitems/?format=json');
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    items = items.concat(myJson.results);
});