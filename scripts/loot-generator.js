var items = [
    { local: true, name: "Moon-Touched Sword", slug: "moon-touched-sword", rarity: "Common", type: "Weapon", desc: "In darkness, the unsheathed blade of this sword sheds moonlight, creating bright light in a 15-foot radius and dim light for an additional 15 feet." },
    { local: true, name: "Ring of Winter", rarity: "Artifact", slug: "ring-of-winter", type: "Wonderous item", desc: "" },
    { local: true, name: "Armblade", requires_attunement: "1", rarity: "Common", slug: "armblade", type: "Weapon (any one-handed melee weapon)", desc: "An armblade is a magic weapon that attaches to your arm, becoming inseparable from you as long as you're attuned to it. To attune to this item, you must hold it against your forearm for the entire attunement period.</br></br>As a bonus action, you can retract the armblade into your forearm or extend it from there. While it is extended, you can use the weapon as if you were holding it, and you can't use that hand for other purposes." },
    { local: true, name: "Armor of Gleaming", rarity: "Common", slug: "armor-of-gleaming", type: "Armor (any medium or heavy)", desc: "This armor never gets dirty." },
    { local: true, name: "Boots of False Tracks", rarity: "Common", slug: "boots-of-false-tracks", type: "Wonderous item", desc: "Only humanoids can wear these boots. While wearing the boots, you can choose to have them leave tracks like those of another kind of humanoid of your size." },
    { local: true, name: "Breathing Bubble", rarity: "Common", slug: "breathing-bubble", type: "Wonderous item", desc: "This translucent, bubble-like sphere has a slightly tacky outer surface, and you gain the item's benefits only while wearing it over your head like a helmet. </br></br>The bubble contains 1 hour of breathable air. The bubble regains all its expended air daily at dawn." },
    { local: true, name: "Cloak of Billowing", rarity: "Common", slug: "cloak-of-billowing", type: "Wonderous item", desc: "While wearing this cloak, you can use a bonus action to make it billow dramatically.    " },
    { local: true, name: "Clockwork Amulet", rarity: "Common", slug: "clockwork-amulet", type: "Wonderous item", desc: "This copper amulet contains tiny interlocking gears and is powered by magic from Mechanus, a plane of clockwork predictability. A creature that puts an ear to the amulet can hear faint ticking and whirring noises coming from within.</br></br>When you make an attack roll while wearing the amulet, you can forgo rolling the d20 to get a 10 on the die. Once used, this property can't be used again until the next dawn." },
    { local: true, name: "", rarity: "", link: "" },
    { local: true, name: "", rarity: "", link: "" }
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
    $("#attunement").html(item.requires_attunement === "requires attunement" || item.requires_attunement === "1" ? "Yes" : "No");
    $("#type").html(item.type);
    var desc = item.desc;
    $("#"+target).prop("title", desc);
    $("#desc").html(formatDescription(desc));
}

function formatDescription(desc){
    while(desc.includes("**")){
        desc = desc.replace("**", "<strong>")
        desc = desc.replace("**", "</strong>")
    }
    while(desc.includes("_")){
        desc = desc.replace("_", "<i>")
        desc = desc.replace("_", "</i>")
    }
    if(desc.includes("*")){
        desc = desc.replaceAll("*", "</br> -")
    }
    return desc;
}

$(document).ready(async function(){
    const response = await fetch('https://api.open5e.com/magicitems/?format=json');
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    items = items.concat(myJson.results);
});