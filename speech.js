const btn=document.querySelector(".speak");
const result=document.querySelector(".result");

const speechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition=new speechRecognition();
recognition.continuous = true;

recognition.onstart=()=>{
	console.log("mic is turned on start speaking")
}

recognition.onend = () => {
    
    console.log("Speech Recognition Ended");
  };

recognition.onresult=(event)=>{
	const current= event.resultIndex;
	const transcript=event.results[current][0].transcript;
	result.textContent=transcript;
	readOutLoud(transcript);
	setTimeout(()=>{
		result.textContent=""
	},5000)
}
function work(){
	const speech=new SpeechSynthesisUtterance();
	speech.text="Hi this is Raam? How may i help you ";
	speech.volume=1;
	speech.rate=1;
	speech.pitch=1;
	window.speechSynthesis.speak(speech)
	recognition.start()
}
btn.addEventListener("click",()=>{
	const speech=new SpeechSynthesisUtterance();
	speech.text="Hi this is Raam? I am your assistant";
	speech.volume=1;
	speech.rate=1;
	speech.pitch=1;
	window.speechSynthesis.speak(speech)
	recognition.start()

})


function readOutLoud(msg){
	const speech=new SpeechSynthesisUtterance();
	speech.text="Sorry I can't understand you"
	if(msg.includes("how are you")){
		speech.text="It is really a plesant day for me! How may I help you?"
	}
	if(msg.includes("time")){
		const today=new Date();
		var time =today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
		speech.text=time;
		var t2=time;
		document.querySelector(".result").textContent=t2
	}
	if(msg.includes("download")||msg.includes("install")||msg.includes("open")){
		speech.text=`Give me a second i am going to open it`;
		setTimeout(()=>{
			window.open(`https://www.google.com/search?q=${msg}`,"_blank");
			recognition.stop();
		},9000)
	}
	if(msg.includes("thank you")){
		speech.text="Its my pleasure. If you are satisfied with my work Please say iam satisfied with your work"
	}
	if(msg.includes("bye")||msg.includes("stop")||msg.includes("satisfied")){
		recognition.stop();
		speech.text="I am really happy for helping you! Have a great day"
	}
	if(msg.includes("temperature")){
		speech.text="Yeah sure! Can i have the city name in this formate"
		document.querySelector(".result").textContent="City name is Vijayawada"
	}
	if(msg.includes("city")){
		let apikey="2e7aaafe0adff930667ae5eced67770e";
		let name=msg.split(" ");
		var s=name[name.length-1];
		const url=`https://api.openweathermap.org/data/2.5/weather?q=${s}&appid=${apikey}&units=metric`;
		fetch(url)
			.then(res=>res.json())
			.then(data=>{
				speech.text=`Temperature in ${s} is ${data.main.temp}`
				console.log(`Temperature in ${s} is ${data.main.temp}`)
			})
	}
	speech.volume=1;
	speech.rate=1;
	speech.pitch=1;
	setTimeout(()=>{
		window.speechSynthesis.speak(speech)
	},1000)
}
