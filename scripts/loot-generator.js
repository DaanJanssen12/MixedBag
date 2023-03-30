var items = [];

async function getRandomItem(target) {
    $("#item-rarity").html("");
    $("#attunement").html("");
    $("#type").html("");

    var rarity = $("#rarity").children("option:selected").val();

    var list = items.filter(f => f.rarity.toLowerCase() === rarity.toLowerCase());
    var item = list[getRandomInt(0, list.length)];

    $("#" + target).html(`<a target='_blank' href="http://dnd5e.wikidot.com/wondrous-items:${item.slug}">${item.name}</a>`);
    $("#item-rarity").html(capitalizeFirstLetter(item.rarity));
    $("#attunement").html(item.requires_attunement === "requires attunement" || item.requires_attunement === "1" ? "Yes" : "No");
    $("#type").html(item.type);
    var desc = item.desc;
    $("#" + target).prop("title", desc);
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
$(document).ready(async function () {
    readTextFile("data/items.json", async function (data) {
        items = JSON.parse(data);

        const response = await fetch('https://api.open5e.com/magicitems/?format=json');
        const myJson = await response.json(); //extract JSON from the http response
        // do something with myJson
        items = items.concat(myJson.results);
    });
});