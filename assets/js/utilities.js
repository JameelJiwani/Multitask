var countryToCapitalDict= {};

function generateCapitalQuestions(){
    var count = 0;
    $.getJSON("./assets/archive/capital.json", function(result){
        $.each(result, function(i, field){
            if(field.CapitalName != "N/A"){
               countryToCapitalDict[field.CountryName] = field.CapitalName;
               var answerWord = field.CapitalName.toLowerCase();
               //var answerLetterIndex = Math.floor(Math.random() * answerWord.length) + 0; //too hard
               var answerLetterIndex = Math.floor(Math.random() * 2) + 0;
               var questionWord = field.CountryName;
               var ord = figureToWord(answerLetterIndex + 1);
               qList.push("The " + ord + " letter of " + questionWord + "'s capital is __.");
               cList.push(answerWord[answerLetterIndex]);
               
               //alert("The " + ord + " letter of " + questionWord + "'s capital, "+ answerWord +" is");
               //alert(answerWord[answerLetterIndex]);
            }
        });
    });
}


function figureToWord(figure){
    switch(figure){
        case 1: 
            return "first";
            break;
        case 2: 
            return "second";
            break;
        case 3: 
            return "third";
            break;
        case 4: 
            return "fourth";
            break;
        case 5: 
            return "fifth";
            break;
        case 6: 
            return "sixth";
            break;
        case 7: 
            return "seventh";
            break;
        case 8: 
            return "eighth";
            break;
        case 9: 
            return "ninth";
            break;
        case 10: 
            return "tenth";
            break;
        case 11: 
            return "eleventh";
            break;
        case 12: 
            return "twelfth";
            break;
        case 13: 
            return "thirteenth";
            break;
        case 14: 
            return "fourteenth";
            break;
        case 15: 
            return "fifteenth";
            break;
        case 16: 
            return "sixteenth";
            break;
        case 17: 
            return "seventeenth";
            break;
        case 18: 
            return "eighteenth";
            break;
        case 19: 
            return "ninteenth";
            break;
        case 20: 
            return "twentieth";
            break;
        default:
            return "meh";
    }
}

/*
function getRandomCapitalQuestion(){
    if(jQuery.isEmptyObject(countryToCapitalDict) || jQuery.isEmptyObject(countryIndexDict)){
        generateCapitalQuestions();
    }
    
    var index = Math.floor(Math.random() * countryToCapitalDict.size()) + 0;
    alert(countryToCapitalDict.length);
    var qAndA = new Array();
    var contryName = countryIndexDict[index];
    qAndA.push(contryName);
    qAndA.push(countryToCapitalDict[contryName]);
    
    alert(qAndA[0] + ": " + qAndA[1]);
    return qAndA;
}*/