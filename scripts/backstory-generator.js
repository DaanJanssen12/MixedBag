var backstoryData = null;
$(document).ready(function(){
	readTextFile("data/backstory.json", (data) => {
		backstoryData = JSON.parse(data);
	});

    $("#generate-backstory").off("click").on("click", function(){
        var _race = $("#race-link").text();
        var _class = $("#class-link").text();
        var _background = $("#background-link").text();
        var backstory = `${getRaceBackstory(_race)} </br></br> ${getBackgroundBackstory(_background)} </br></br> ${getClassBackstory(_class)}`;

        $("#backstory").html(backstory);
    });
});

function getRaceBackstory(_race){
    var story = getRandomFromList(backstoryData.raceBackstories.filter(f => f.eligible.includes(_race) || f.eligible.includes("*"))).story;
    while(story.includes("{") && story.includes("}")){
        //Job
        if(story.includes("{job}")){
            var x = getRandomInt(0, backstoryData.generalData.jobs.length);
            var job = backstoryData.generalData.jobs[x];

            story = story.replaceAll("{job}", job);
        }
    }
    return story;
}

function getClassBackstory(_class){
    var story = getRandomFromList(backstoryData.classBackstories.filter(f => f.eligible.includes(_class) || f.eligible.includes("*"))).story;
    while(story.includes("{") && story.includes("}")){
        //Battle Style
        if(story.includes("{battle_style}")){
            var battleStyles = backstoryData.generalData.battleStyles.filter(f => f.eligible.includes(_class)  || f.eligible.includes("*"));
            var x = getRandomInt(0, battleStyles.length);
            var battleStyle = battleStyles[x].text;

            story = story.replaceAll("{battle_style}", battleStyle);
        }
        if(story.includes("{class}")){
            story = story.replaceAll("{class}", _class);
        }
    }
    return story;
}

function getBackgroundBackstory(_background){
    var story = getRandomFromList(backstoryData.backgroundBackstories.filter(f => f.eligible.includes(_background) || f.eligible.includes("*"))).story;
    return story;
}

function getRandomFromList(list){
    return list[getRandomInt(0, list.length)];
}