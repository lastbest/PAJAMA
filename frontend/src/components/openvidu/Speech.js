import React, { Component } from "react";
import Word from "./Word";
import ListenerButton from "./ListenerButton";

class Speech extends Component {
  state = {
    show: false,
    listening: false,
    text: "Sorry, can't hear",
  };

  componentDidMount() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!Recognition) {
      alert("Speech Recognition API is not supported in this browser, try chrome");
      return;
    }

    this.recognition = new Recognition();
    this.recognition.lang = process.env.REACT_APP_LANGUAGE || "ko-KR";
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;

      console.log("transcript", text);
      this.setState({ text });
      const textP = text.includes("파자마");
      const textN = text.includes("노래");
      const textT = text.includes("틀어");
      console.log(textP);
      console.log(textN);
      console.log(textT);
      // 힙합, 싸이월드, 댄스,재즈, 생일 축하, 인디
      if (textP && textN && textT) {
        const textHip = text.includes("힙합");
        const textSW = text.includes("싸이월드");
        const textDance = text.includes("댄스");
        const textJazz = text.includes("재즈");
        const textParty = text.includes("생일");
        const textIn = text.includes("인디");
        if (textHip) console.log("힙합");
        else if (textSW) console.log("싸이월드");
        else if (textDance) console.log("댄스");
        else if (textJazz) console.log("재즈");
        else if (textParty) console.log("생일 축하");
        else if (textIn) console.log("인디");
        console.log("노래 틀예정");
      }
    };

    this.recognition.onspeechend = () => {
      console.log("stopped");

      this.setState({ show: true });
    };

    this.recognition.onnomatch = (event) => {
      console.log("no match");
      this.setState({ text: "Sorry, can't hear" });
    };

    this.recognition.onstart = () => {
      this.setState({
        listening: true,
      });
    };

    this.recognition.onend = () => {
      console.log("end");

      this.setState({
        listening: false,
      });
      setTimeout(this.end,3000);
    };

    this.recognition.onerror = (event) => {
      console.log("error", event);

      this.setState({
        show: true,
        text: event.error,
      });
    };
  }

  start = () => {
    this.recognition.start();
  };

  end = () => {
    this.recognition.stop();
    this.setState({ show: false });
  };

  handleClose = () => {
    // this.setState({ show: false });
  };

  render() {
    return (
      <main className="demo-1">
        {this.state.show ? (
          <Word text={this.state.text} onClose={this.handleClose} />
        ) : (
          <ListenerButton
            onStart={this.start}
            onEnd={this.end}
            disabled={this.state.listening}
            buttonText={this.state.listening ? "Listening..." : "Click me to listen"}
          />
        )}
      </main>
    );
  }
}

export default Speech;
