const words = [
    {com:"Hello"},{com:"Yes"},
    {com:"No"},{com:"Please"},
    {com:"Thank you"},{com:"Love"},
    {com:"Help"},{com:"Water"},

    {com:"Food"},{com:"Bathroom"},
    {com:" Pain"},{com:"Medicine"},
    {com:"Doctor"},{com:"Emergency"},
    {com:"Name"},{com:"Family"},

    {com:"Home"},{com:"Stop"},
    {com:"Go"},{com:"More"},
    {com:"Less"},{com:"Time"},
    {com:"Happy"},{com:" Sad"},
    
    {com:"I "},{com:"Cold"},
    {com:" Hot"},{com:"Where"},
    {com:" When"},{com:"Why"},
    {com:"How"},{com:"Goodbye"}
]

const sentences = [
    {com:"Aaron from Kerala and Akshit Garg from Punjab."},{com:"I am hungry."},
    {com:"Please call a doctor."},{com:" I need to use the bathroom."},
    {com:"I am thirsty."},{com:"Can you please assist me?"},
    {com:"How are you?"},{com:"I love you."},

    {com:"I am in pain."},{com:"I am tired."},
    {com:"I am cold."},{com:"I am hot."},
    {com:"I am in an emergency."},{com:" I miss home."},
    {com:"Call my family."},{com:"Stop the car."},

    {com:"Let's go."},{com:"More water, please."},
    {com:"Less food, please."},{com:"More"},
    {com:"What is the time?"},{com:"I'm happy."},
    {com:"I'm sad."},{com:"Where am I?"},

    {com:"When can we leave?"},{com:"Why is this happening?"},
    {com:"I don't understand."},{com:"My throat hurts."},
    {com:"I have a headache."},{com:"Can you repeat that?"},
    {com:"I'm feeling better."},{com:"Goodbye for now."}
]

const alphabets = [
    {com:"a"},{com:"b"},
    {com:"c"},{com:"d"},
    {com:"e"},{com:"."},
    {com:"backspace"},{com:" "},

    {com:"f"},{com:"g"},
    {com:"o"},{com:"i"},
    {com:"t"},{com:"k"},
    {com:"l"},{com:"m"},

    {com:"n"},{com:"h"},
    {com:"p"},{com:"q"},
    {com:"r"},{com:"s"},
    {com:"j"},{com:"u"},

    {com:"v"},{com:"w"},
    {com:"x"},{com:"y"},
    {com:"z"},{com:" When"},
    {com:"Why"},{com:"How"}
]

const digits = [
    {com:"0"},{com:"1"},
    {com:"2"},{com:"3"},
    {com:"4"},{com:"5"},
    {com:"6"},{com:"="},
    {com:"7"},{com:"8"},
    {com:"9"},{com:"+"},
    {com:"-"},{com:"*"},
    {com:"/"},{com:"l"},
    {com:"m"},{com:"n"},
    {com:"o"},{com:"p"},
    {com:"q"},{com:"r"},
    {com:"s"},{com:"t"},
    {com:"u"},{com:"v"},
    {com:"w"},{com:"x"},
    {com:"y"},{com:"z"},
    {com:"When"},{com:"Why"}
]


const firebaseConfig = {
    apiKey: "AIzaSyDKq2vCzgCQ-5Qu3QKAQxxUJebOPYg-YkI",
    authDomain: "newtest-5f821.firebaseapp.com",
    databaseURL: "https://newtest-5f821-default-rtdb.firebaseio.com",
    projectId: "newtest-5f821",
    storageBucket: "newtest-5f821.appspot.com",
    messagingSenderId: "635426648942",
    appId: "1:635426648942:web:82058fcb8a38b727f8877f"
};
    
firebase.initializeApp(firebaseConfig);

var code;
var mode;
var shift;
var button;
var compute;
var result;
var letter = "";
var wrd = "";
var sntnc = " ";
var cal = "";
var str2 = "";

var commentsRef = firebase.database().ref('test/' );
let elem = document.getElementById("text");
console.log(elem.innerHTML);
let speech = new SpeechSynthesisUtterance();

commentsRef.on('child_changed', (data) => {
    code = Number(data.A.B);
    button = (code/1)%10-1;
    shift = Math.floor((code/100))%10;
    mode = Math.floor((code/1000))%10;

    if(shift==0){
        compute = button;
    }else if(shift==1){
        compute = button+8;
    }else if(shift==2){
        compute = button+16;
    }else if(shift==3){
        compute = button+24;
    }

    if(mode==1){
        elem.value = sentences[compute].com;
        result = sentences[compute].com;
        document.getElementById("sentenceMode").style.backgroundColor = "#15a438";
        document.getElementById("wordMode").style.backgroundColor = "#8e9384";
        document.getElementById("alphabetMode").style.backgroundColor = "#8e9384";
        document.getElementById("digitMode").style.backgroundColor = "#8e9384";
        speech.text = result;
        window.speechSynthesis.speak(speech);
    }else if(mode == 2){
        elem.value = words[compute].com;
        result = words[compute].com;
        document.getElementById("sentenceMode").style.backgroundColor = "#8e9384";
        document.getElementById("wordMode").style.backgroundColor = "#15a438";
        document.getElementById("alphabetMode").style.backgroundColor = "#8e9384";
        document.getElementById("digitMode").style.backgroundColor = "#8e9384";
        speech.text = result;
        window.speechSynthesis.speak(speech);
    }else if(mode == 3){
        letter = alphabets[compute].com;
        console.log(letter);
        document.getElementById("sentenceMode").style.backgroundColor = "#8e9384";
        document.getElementById("wordMode").style.backgroundColor = "#8e9384";
        document.getElementById("alphabetMode").style.backgroundColor = "#15a438";
        document.getElementById("digitMode").style.backgroundColor = "#8e9384";
        if(letter != " " && letter!="." && letter!="backspace"){
            wrd += letter;
            sntnc +=letter;
            elem.value = sntnc;
        }else if(letter == " "){
            
            speech.text = wrd;
            window.speechSynthesis.speak(speech);
            wrd = "";
            sntnc += letter;
            elem.value = sntnc;
        }else if(letter == "."){
            speech.text = wrd;
            sntnc+=".";
            elem.value = sntnc;
            setTimeout( ()=>{
                console.log(6768);
                sntnc="";
                elem.value=sntnc;
                window.speechSynthesis.speak(speech);
                wrd="";
            },300)
            
        }else if(letter == "backspace"){
            wrd = wrd.substr(0,wrd.length-1);
            sntnc = sntnc.substr(0,sntnc.length-1);
            elem.value = sntnc;
        }
    }else if(mode == 4){
        cal =  digits[compute].com;
        document.getElementById("sentenceMode").style.backgroundColor = "#8e9384";
        document.getElementById("wordMode").style.backgroundColor = "#8e9384";
        document.getElementById("alphabetMode").style.backgroundColor = "#8e9384";
        document.getElementById("digitMode").style.backgroundColor = "#15a438";
        if(cal == "="){
            elem.value = eval(str2);
            console.log(eval(str2));
            speech.text = eval(str2);
            window.speechSynthesis.speak(speech);
            str2="";
        }else{
            str2 += cal;
            elem.value = str2;
        }
    }
});