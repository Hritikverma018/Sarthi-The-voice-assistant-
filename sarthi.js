const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(sentence) {
    const text_speak = new SpeechSynthesisUtterance(sentence);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    const day = new Date();
    const hr = day.getHours();

    if(hr >= 0 && hr < 12) {
        speak("Good Morning ");
    } else if(hr == 12) {
        speak("Good Noon ");
    } else if(hr > 12 && hr <= 16) {
        speak("Good Afternoon ");
    } else if(hr > 16 && hr <= 24) {
        speak("Good Evening ");
    } 
    
}

window.addEventListener('load', () => {
    speak("Sarthi");
    speak("Going online");
    wishMe();
    speak("How can i help you?");
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = () => {
    btn.classList.add('listening'); // Change mic color to red
};

recognition.onend = () => {
    btn.classList.remove('listening'); // Revert mic color
};

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    speakThis(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    recognition.start();
});

function speakThis(message) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = "I did not understand what you said, please try again";

    // Basic responses
    if (message.includes('hey') || message.includes('hello')) {
        speech.text = "Hello I am SARTHI  how can I help you ";
    } else if (message.includes('how are you')) {
        speech.text = "I am fine, tell me how can I help you";
    } else if (message.includes('name')) {
        speech.text = "My name is Inertia";
    }
    else if (message.includes('open github')) {
        window.open("https://github.com/", "_blank");
        speech.text = "Opening GitHub.";
    } else if (message.includes('open google')) {
        window.open("https://google.com", "_blank");
        speech.text = "Opening Google.";
    } else if (message.includes('open instagram')) {
        window.open("https://instagram.com", "_blank");
        speech.text = "Opening Instagram.";
    } else if (message.includes('open leetcode')) {
        window.open("https://leetcode.com/", "_blank");
        speech.text = "Opening LeetCode.";
    } else if (message.includes('open hackerrank')) {
        window.open("https://www.hackerrank.com/", "_blank");
        speech.text = "Opening HackerRank.";
    }
    else if (message.includes('open whatsapp')) {
        window.open("https://web.whatsapp.com/");
        speech.text = "Opening whatsapp";
    }else if (message.includes('open amazon')) {
        window.open("https://www.amazon.in/?&tag=googhydrabk1-21&ref=pd_sl_5szpgfto9i_e&adgrpid=155259813593&hvpone=&hvptwo=&hvadid=674893540034&hvpos=&hvnetw=g&hvrand=7432301479394650903&hvqmt=e&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9303169&hvtargid=kwd-64107830&hydadcr=14452_2316413&gad_source=1");
        speech.text = "opening Amazon";
    }else if (message.includes('open netflix')) {
        window.open("https://www.netflix.com/in/");
        speech.text = "Opening netflix";
    }
    else if (message.includes('open youtube')) {
        window.open("https://www.youtube.com/", "_blank");
        speech.text = "Opening youtube.";
    }

    // Search on Google or Wikipedia
    else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
        speech.text = "This is what I found on the internet regarding " + message;
    } else if (message.includes('wikipedia')) {
        const query = message.replace("wikipedia", "").trim();
        window.open(`https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`, "_blank");
        speech.text = "This is what I found on Wikipedia regarding " + query;
    }

    // Play music on YouTube
    else if (message.includes('play')) {
        const songName = message.replace('play', '').trim();
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(songName)}`, "_blank");
        speech.text = `Playing ${songName} on YouTube.`;
    }

    // Simple math calculations
    else if (message.includes('calculate')) {
        try {
            const expression = message.replace('calculate', '').trim();
            const result = eval(expression); // Use cautiously
            speech.text = `The result is ${result}.`;
        } catch (e) {
            speech.text = "Sorry, I couldn't calculate that.";
        }
    }

    // Set a reminder
    else if (message.includes('set reminder for')) {
        const time = parseInt(message.match(/\d+/)); // Extracts time in minutes
        speech.text = `Setting a reminder for ${time} minutes`;
        
        setTimeout(() => {
            speak("This is your reminder!");
        }, time * 60000); // Time in milliseconds
    }

    // Tell a joke
    else if (message.includes('tell me a joke')) {
        const jokes = [
            "Why don't scientists trust atoms? Because they make up everything!",
            "Why did the bicycle fall over? It was two-tired!",
            "I told my computer I needed a break, and now it won't stop sending me Kit-Kat ads."
        ];
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        speech.text = randomJoke;
    }

    // List all functions
    else if (message.includes('tell me your functions')) {
        const functions = [
            "you can tell me to perfor  sevral tasks like........ ",
            "You can say 'open [website]' to access various websites.",
            "I can tell you a fact or a joke.",
            "You can ask about the time or date.",
            "You can post on social media by saying 'post on [platform]'.",
            "You can set a reminder or perform basic calculations.",
            "Just ask me 'what can you do' to hear all my functions."
        ];
        speech.text = "Here are some things you can ask me:\n" + functions.join("\n");
    }

    // Time and date
    else if (message.includes('time')) {
        const time = new Date().toLocaleTimeString();
        speech.text = `The current time is ${time}.`;
    } else if (message.includes('date')) {
        const date = new Date().toLocaleDateString();
        speech.text = `Today's date is ${date}.`;
    }

    // Volume control
    else if (message.includes('volume up')) {
        speech.volume = Math.min(speech.volume + 0.1, 1);
        speech.text = "Increasing volume.";
    } else if (message.includes('volume down')) {
        speech.volume = Math.max(speech.volume - 0.1, 0);
        speech.text = "Decreasing volume.";
    }

    // Browser control
    else if (message.includes('close tab')) {
        window.close();
        speech.text = "Closing current tab.";
    } else if (message.includes('next tab')) {
        speech.text = "Switching to the next tab.";
        // Note: Switching tabs isn't supported natively in JavaScript without browser extensions.
    }

    // General search
    else {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
        speech.text = "I found some information for " + message + " ";
    }

    // Set default speech parameters
    speech.volume = .75;
    speech.pitch = .75;
    speech.rate = .75;

    window.speechSynthesis.speak(speech);
}