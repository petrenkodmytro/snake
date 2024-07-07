import React, { useEffect, useState, useRef, useCallback } from "react";
import Swal from "sweetalert2";

const Snake = ({ playerName, setPlayer, colorSnake, backgroundColor }) => {
  const [dim, setDim] = useState(0);
  const [chunk, setChunk] = useState(0);
  const [direction, setDirection] = useState("right");
  const [fruit, setFruit] = useState({ place: 186, value: 0 });
  const [points, setPoints] = useState(0);
  const [game, setGame] = useState(true);
  const [pause, setPause] = useState(false);
  const [nextPoints, setNextPoints] = useState(50);
  const speedRef = useRef(200);
  const [snake, setSnake] = useState([
    {
      direction: "right",
      part: [186, 185, 184, 183],
    },
  ]);
  let width;

  // change colorFruit depending on the valueFruit
  let colorFruit;
  switch (fruit.value) {
    case 1:
      colorFruit = "#e5df3c";
      break;
    case 5:
      colorFruit = "#20cf3d";
      break;
    case 10:
      colorFruit = "#f22e79";
      break;

    default:
  }

  // const gameOver = async () => {
  //   setGame(true);
  //   setPlayer({ name: props.playerName, score: points });
  // };

  const reset = () => {
    if (playerName === "") {
      Swal.fire("Please enter your name!");
      return;
    }
    speedRef.current = 200;
    setPoints(0);
    setNextPoints(50);
    setDirection("right");
    setSnake([
      {
        direction: "right",
        part: [186, 185, 184, 183],
      },
    ]);
    setGame(false);
  };

  const pieces = () => {
    //functionally label snake pieces (bang) and return
    let arr = [];
    for (let i = 0; i < 400; i++) {
      let addToArr = false;
      let j = 0;
      while (j < snake.length) {
        if (snake[j].part.indexOf(i) >= 0) {
          addToArr = true;
          break;
        } else {
          addToArr = false;
        }
        j++;
      }
      addToArr ? arr.push("bang") : i === fruit.place ? arr.push("fruit") : arr.push("");
    }
    // console.log(arr)
    return arr;
  };

  //handle direction changes
  const turn = useCallback(
    (dir, opp) => {
      let tempSnake = [...snake];
      // console.log(snake[0].part);
      if (snake[0].part.length > 0 && direction !== opp && direction !== dir) {
        setDirection(dir);
        tempSnake.unshift({
          direction: dir,
          part: [],
        });
        setSnake(tempSnake);
      }
    },
    [snake, direction]
  );

  width = window.innerWidth;
  useEffect(() => {
    //determine relative dimensions of game portal
    if (width >= 800) {
      setDim(width * 0.35);
    } else if (width < 800) {
      setDim(width * 0.9);
    }
    setChunk(dim / 20);

    //points and get longer after eating
    if (snake[0].part[0] === fruit.place) {
      setPoints(points + fruit.value);
      let sneak = [...snake];
      let firstSection = sneak[0];
      if (firstSection.direction === "up") {
        let y = firstSection.part[0] - 20;
        if (y < 0) {
          firstSection.part.unshift(y + 400);
        } else {
          firstSection.part.unshift(y);
        }
      } else if (firstSection.direction === "right") {
        let y = firstSection.part[0] + 1;
        if (y % 20 === 0) {
          firstSection.part.unshift(y + -20);
        } else {
          firstSection.part.unshift(y);
        }
      } else if (firstSection.direction === "down") {
        let y = firstSection.part[0] + 20;
        if (y >= 400) {
          firstSection.part.unshift(y - 400);
        } else {
          firstSection.part.unshift(y);
        }
      } else if (firstSection.direction === "left") {
        let y = firstSection.part[0] - 1;
        if (y % 20 === 19) {
          firstSection.part.unshift(y + 20);
        } else {
          firstSection.part.unshift(y);
        }
      }
      // speed snake
      // speedRef.current = speedRef.current - 10 ;
      setSnake(sneak);

      let valueFruit = [1, 5, 10][Math.floor(Math.random() * [1, 5, 10].length)];
      // console.log(valueFruit);
      setFruit({ place: Math.floor(Math.random() * Math.floor(400)), value: valueFruit });
    }

    //gameover if you eat your tail
    let totalArr = [];
    for (let k = 0; k < snake.length; k++) {
      totalArr = [...totalArr, ...snake[k].part];
    }
    const gameOver = async () => {
      setGame(true);
      setPlayer({ name: playerName, score: points });
    };
    let head = snake[0].part[0];
    totalArr.filter((item) => item === head).length >= 2 && gameOver();

    if (!game) {
      //if GAMEOVER pause events
      //listen for directions and update snake instructions accordingly
      const handleKeydown = (e) => {
        //let tempSnake: any = [...snake];
        switch (e.code) {
          case "ArrowUp":
            e.preventDefault();
            turn("up", "down");
            break;
          case "ArrowRight":
            e.preventDefault();
            turn("right", "left");
            break;
          case "ArrowDown":
            e.preventDefault();
            turn("down", "up");
            break;
          case "ArrowLeft":
            e.preventDefault();
            turn("left", "right");
            break;
          default:
        }
      };
      document.addEventListener("keydown", handleKeydown);

      //event interval
      const interval = setInterval(() => {
        //handle snake piece movement
        let dupSneak = [...snake];

        for (let i = snake.length - 1; i > 0; i--) {
          //increment through current snake and reduce to head direction
          if (dupSneak[i].part.length !== 0) {
            let next = dupSneak[i - 1];
            let chunk = dupSneak[i].part.shift();
            next.part.push(chunk);
          } else {
            dupSneak.pop();
          }
        }

        //perform movement changes to each chunk
        let sneak = dupSneak;
        sneak.map((section) => {
          if (section.direction === "right") {
            section.part.map((x, i) => {
              let y = x + 1;
              if (y % 20 === 0) {
                return (section.part[i] = y - 20);
              } else {
                return (section.part[i] = y);
              }
            });
          } else if (section.direction === "up") {
            section.part.map((x, i) => {
              let y = x - 20;
              if (y < 0) {
                return (section.part[i] = y + 400);
              } else {
                return (section.part[i] = y);
              }
            });
          } else if (section.direction === "left") {
            section.part.map((x, i) => {
              let y = x - 1;
              if (y % 20 === 19) {
                return (section.part[i] = y + 20);
              } else {
                return (section.part[i] = y);
              }
            });
          } else if (section.direction === "down") {
            section.part.map((x, i) => {
              let y = x + 20;
              if (y >= 400) {
                return (section.part[i] = y - 400);
              } else {
                return (section.part[i] = y);
              }
            });
          }
          return "";
        });
        setSnake(sneak);
      }, speedRef.current);
      // pause game
      pause && clearInterval(interval);
      //remove interval and listeners
      return () => {
        clearInterval(interval);
        document.removeEventListener("keydown", handleKeydown);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dim, fruit.place, fruit.value, game, pause, points, setPlayer, snake, turn, width]);

  useEffect(() => {
    // speed snake
    if (points >= nextPoints) {
      // console.log("incrementSpeed");
      setNextPoints(nextPoints + 50);
      speedRef.current = speedRef.current - 20;
    }
    // console.log(speedRef.current);
  }, [points, nextPoints]);

  return (
    <div className="snake-container" id="snake-container">
      <div className="point-bar mb-5" style={{ width: dim }}>
        <div className="font-bold" style={{ color: colorSnake }}>
          Score: {points}
        </div>
        <div className="flex justify-between items-center text-xs md:text-sm">
          <div className="flex gap-1 items-center">
            <div className="w-3 h-3 md:w-5 md:h-5 bg-[#e5df3c]" /> - 1 point
          </div>
          <div className="flex gap-1 items-center">
            <div className="w-3 h-3 md:w-5 md:h-5 bg-[#20cf3d]" /> - 5 point
          </div>
          <div className="flex gap-1 items-center">
            <div className="w-3 h-3 md:w-5 md:h-5 bg-[#f22e79]" />- 10 point
          </div>
          <button
            className="w-[100px] p-2 border-1 font-bold rounded-md bg-[#248ec2] text-white disabled:bg-[#B1B1B1]"
            onClick={() => setPause(!pause)}
            disabled={game}>
            {pause ? "Continion" : "Pause"}
          </button>
        </div>
      </div>
      <ul className="game-border" style={{ width: dim, height: dim, backgroundColor: backgroundColor }}>
        {pieces().map((piece, i) => {
          return (
            <li
              key={"piece" + i}
              style={
                piece === "bang"
                  ? { width: chunk, height: chunk, backgroundColor: colorSnake }
                  : piece === "fruit"
                  ? { width: chunk, height: chunk, backgroundColor: colorFruit }
                  : { width: chunk, height: chunk }
              }></li>
          );
        })}
        {game && (
          <div className="game-splash" style={{ height: dim }}>
            <div>Start</div>
            <button onClick={() => reset()}>Play</button>
          </div>
          //    <div className="game-splash" style={{ height: dim }}>
          //    <div>{points ? "Game Over!" : "Start"}</div>
          //    <button onClick={() => reset()}>{points ? "Play Again" : "Play"}</button>
          //  </div>
        )}
      </ul>

      {/* mobile btn */}
      {width <= 1024 && (
        <div className="snake-mobile-buttons" style={{ width: dim, margin: "auto" }}>
          <div>
            <button onClick={() => turn("up", "down")}>&#8593;</button>
          </div>
          <div>
            <button onClick={() => turn("left", "right")}>&#8592;</button>
            <button onClick={() => turn("right", "left")}>&#8594;</button>
          </div>
          <div>
            <button onClick={() => turn("down", "up")}>&#8595;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Snake;
