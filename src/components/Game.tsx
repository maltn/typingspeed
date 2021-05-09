import React, { useEffect, useRef, useState } from 'react'
import "./Game.css"
import $ from "jquery"

interface Props{
	gay?: string
}

const getWords = () => {
	return fetch("https://random-word-api.herokuapp.com/word?number=10000&swear=0").then(x => x.json())
}

export const Game: React.FC<Props> = (Props) => {
	const [words, setWords] = useState(null)
	const curWord = useRef(0)
	const press = useRef(null)

	useEffect(() => {
		getWords().then(x => {
			x = x.filter(x => x.length < 6)
			setWords(x)
		})
	},[])

	const change = (e) => {
		if(press.current === ' ' || press.current === 'Spacebar'){
			const tempWord = $("#inputArea").val()
			$("#inputArea").val("")
			if(tempWord.trim() === words[curWord.current]){
				$(".words").eq(curWord.current).addClass("correct")
			}else {
				$(".words").eq(curWord.current).addClass("wrong")
			}

			$(".words").eq(curWord.current).removeClass("current")
			const tempY = $(".words").eq(curWord.current).position().top 
			curWord.current++;
			tempY !== $(".words").eq(curWord.current).position().top && $(".words").slice(0,curWord.current).css("display", "none")
			$(".words").eq(curWord.current).addClass("current")
		}
		const wo = words[curWord.current].slice(0, $("#inputArea").val().length)
		if($("#inputArea").val() !== wo){
			$(".words").eq(curWord.current).addClass("wrong")
		}else{
			$(".words").eq(curWord.current).removeClass("wrong")
		}
	}

	return (
		<>
			{!words ? 
			<h1>Loading</h1>
			:
			<div className="game" id="container">
				<div style={wrapper} className="game" id="wrapper">
					<div className="game" id="textArea">
						{words.map((x,i) => {
							return (
								<span key={i} className="game words">{x}</span>
							)
						})}
					</div>
					<input onKeyDown={(e) => press.current = e.key} onChange={change} autoComplete="off" spellCheck="false" className="game" id="inputArea" type="text" />
				</div>
			</div>
		}
		</>
	);
}

const wrapper = {
	width: "100%",
	height: "100%"
}