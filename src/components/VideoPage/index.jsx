import React, { useState, useRef, useEffect } from "react";
import Teaching from "../../assets/img/teaching.png";
//import { VideoProgress, LINE_TYPE, START } from 'react-video-progress';
//import ReactPlayer from 'react-player';
import ColorElement from "../ColorElement";
import styles from "../../AudioPlayer.module.css";
import { FaPlay } from "react-icons/fa"
import { FaPause } from "react-icons/fa";
import { IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";
import Send from "../../assets/img/send.png";
import $ from "jquery";

// const timeTracker = {
//     CallToAction: ["0:10", "00:15"],
//     Questions: ["0:20", "00:27"],
//     Exercises: ["0:35", "00:45"],
//     NeedsReview: ["0:50", "00:55"],
//     Insight: ["0:60", "01:02"],
// };

var finalValue;
var getValue = 0;

// const timeTracker = {
//     CallToAction: [["00:05", "1:10"]],

//     Questions: [
//         ["00:01", "00:05"],
//         ["00:20", "00:30"],
//         ["00:35", "00:46"],
//     ],

//     Exercises: [
//         ["00:01", "00:07"],
//         ["00:26", "00:30"],
//         ["00:35", "00:46"],
//     ],

//     NeedsReview: [
//         ["00:10", "00:15"],
//         ["00:12", "00:14"],
//         ["00:35", "00:46"],
//     ],

//     Insight: [
//         ["00:15", "00:18"],
//         ["00:31", "00:35"],
//         ["00:40", "00:46"],
//     ],

// };

const timeTracker = {
    CallToAction: [],
    Questions: [],
    Exercises: [],
    NeedsReview: [],
    Insight: [],
};

const Index = ({ source, fileType, audioName }) => {


    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [videoSection, setVideoSection] = useState(timeTracker);
    const [isMuted, setIsMuted] = useState(false);
    const [highLightText, setHighLightText] = useState(false);
    const [endtime, setEndtime] = useState("")
    const [Force, setForce] = useState(1)

    const [actionTrigger, setActionTrigger] = useState("0%");
    const [quesTrigger, setQuesTrigger] = useState("0%");
    const [exerciseTrigger, setExerciseTrigger] = useState("0%");
    const [reviewTrigger, setReviewTrigger] = useState("0%");
    const [insightTrigger, setInsightTrigger] = useState("0%");

    const [triggerColor, setTriggerColor] = useState({
        color1: false,
        color2: false,
        color3: false,
        color4: false,
        color5: false,
    });

    const audioPlayer = useRef();
    const progressBar = useRef();
    const animationRef = useRef();
    const currentTimeToRegister = useRef();
    const videoRef = useRef(null);


    useEffect(() => {
        const seconds = Math.floor(audioPlayer?.current?.duration);

        setDuration(seconds);

        progressBar.current.max = Number(seconds);


    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);


    const calculateTime = (secs) => {
        let convertSec = Number(secs);

        const minutes = Math.floor(convertSec / 60);

        const returnedMinutes =
            Number(minutes) < 10 ? `0${Number(minutes)}` : `${Number(minutes)}`;

        const seconds = Math.floor(convertSec % 60);

        const returnedSeconds =
            Number(seconds) < 10 ? `0${Number(seconds)}` : `${Number(seconds)}`;

        finalValue = `${Number(returnedMinutes) ? Number(returnedMinutes) : 0}:${Number(returnedSeconds) ? Number(returnedSeconds) : 0
            }`

        return finalValue;
    };

    const muteAudio = () => {
        let els = document.getElementById("audioplay");
        els.muted = !els.muted;
        setIsMuted(els.muted);
    }


    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    }

    useEffect(() => {
        if (isPlaying) {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying)
        }

        else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    }, [isPlaying])


    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
    }

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
    }

    const changePlayerCurrentTime = () => {

        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(Number(progressBar.current.value));


    }

    console.warn("time", timeTracker)

    const getQuestionTime = (event) => {

        let newarr = videoSection;
        let targetObjectValue = event.target.value;

        let currntTimeInSec = currentTimeToRegister.current.innerText;

        switch (targetObjectValue) {
            case "CallToAction":
                newarr.CallToAction.push(currntTimeInSec);
                break;
            case "Questions":
                newarr.Questions.push(currntTimeInSec);
                break;
            case "Exercises":
                newarr.Exercises.push(currntTimeInSec);
                break;
            case "NeedsReview":
                newarr.NeedsReview.push(currntTimeInSec);
                break;
            case "Insight":
                newarr.Insight.push(currntTimeInSec);
                break;
            default:
                return;
        }
        setVideoSection(newarr);
    };

    function getTimeDuration(start, end) {

        let result1;
        let result2;

        if (toSeconds(end) === 0) {
            result1 = toSeconds(start);
            return result1;
        } else {
            result2 = toSeconds(end) - toSeconds(start);

            return result2;
        }

    }

    function toSeconds(time) {
        if (typeof time == "string") {
            const parts = time.split(":");
            if (parts.length == 2) {
                parts.unshift("00");
            }
            return (
                parseInt(parts[0]) * 60 * 60 +
                parseInt(parts[1]) * 60 +
                parseInt(parts[2])
            );
        }
    }

    function calulateSectionInPercent(total, start, end) {

        let duration1 = getTimeDuration(start, end == undefined ? "0:0" : end);
        // let duration1 = getTimeDuration(start, end);

        let calulatePersentage = (duration1 / total) * 100;
        return calulatePersentage;
    }

    let elarlyvalue;
    let newFinalArray1 = [];
    let newFinalArray2 = [];
    let newFinalArray3 = [];
    let newFinalArray4 = [];
    let newFinalArray5 = [];

    elementBar(timeTracker.CallToAction, newFinalArray1, "bg-[#d80dca]")
    elementBar(timeTracker.Questions, newFinalArray2, "bg-[#0ad725]")
    elementBar(timeTracker.Exercises, newFinalArray3, "bg-[#d50a0f]")
    elementBar(timeTracker.NeedsReview, newFinalArray4, "bg-[#d4c10d]")
    elementBar(timeTracker.Insight, newFinalArray5, "bg-[#07c8d8]")



    function elementBar(arr, arrToPush, eleColer) {
        elarlyvalue = "0:00";
        arr.map((el, index) => {
            // calculate the time duration from early value
            const iv = getTimeDuration("0:00", elarlyvalue);
            // calculate the time duration from first element of array
            const fv = getTimeDuration("0:00", el[0]);


            if (fv > iv) {
                arrToPush.push([elarlyvalue, el[0], "bg-[#0000]"],);
                arrToPush.push([el[0], el[1], eleColer]);
                if (index == timeTracker.CallToAction.length - 1) {
                    arrToPush.push([el[1], finalValue ? finalValue : "1:02", "bg-[#0000]"]);
                }
                elarlyvalue = el[1];
            }
        });
    }


    const TriggerColor1 = newFinalArray1.map(el => {
        const perc = calulateSectionInPercent(duration, el[0], el[1])
        return <ColorElement percent={Math.floor(perc) + "%"} colorName={el[2]} />
    })

    const TriggerColor2 = newFinalArray2.map(el => {

        const perc = calulateSectionInPercent(duration, el[0], el[1])
        return <ColorElement percent={Math.floor(perc) + "%"} colorName={el[2]} />
    })

    const TriggerColor3 = newFinalArray3.map(el => {
        const perc = calulateSectionInPercent(duration, el[0], el[1])
        return <ColorElement percent={Math.floor(perc) + "%"} colorName={el[2]} />
    })

    const TriggerColor4 = newFinalArray4.map(el => {
        const perc = calulateSectionInPercent(duration, el[0], el[1])
        return <ColorElement percent={Math.floor(perc) + "%"} colorName={el[2]} />
    })

    const TriggerColor5 = newFinalArray5.map(el => {
        const perc = calulateSectionInPercent(duration, el[0], el[1])
        return <ColorElement percent={Math.floor(perc) + "%"} colorName={el[2]} />
    })


    const handleColor1 = () => {

        setTriggerColor((prev) => {
            return {
                ...prev,
                color1: !triggerColor?.color1,
            }
        })
    }

    const handleColor2 = () => {

        setTriggerColor((prev) => {
            return {
                ...prev,
                color2: !triggerColor?.color2,
            }
        })
    }

    const handleColor3 = () => {

        setTriggerColor((prev) => {
            return {
                ...prev,
                color3: !triggerColor?.color3,
            }
        })
    }

    const handleColor4 = () => {

        setTriggerColor((prev) => {
            return {
                ...prev,
                color4: !triggerColor?.color4,
            }
        })
    }

    const handleColor5 = () => {

        setTriggerColor((prev) => {
            return {
                ...prev,
                color5: !triggerColor?.color5,
            }
        })

        setHighLightText(true);

    }

    const handleHighlight = () => {

        setTriggerColor((prev) => {
            return {
                ...prev,
                color5: !triggerColor?.color5,
            }
        })

        setHighLightText(false);

    }

    useEffect(() => {
        let currentTimeFromDom = document.getElementsByClassName("video-time")[0].getElementsByTagName("p")[0].innerHTML;
        if (currentTimeFromDom == finalValue) {
            if (toSeconds(currentTimeFromDom) > 0) {
                setTimeout(() => {
                    setIsPlaying(!isPlaying);
                }, 1000);

                cancelAnimationFrame(animationRef.current);
            }
        }
    }, [currentTime])


    const handleEventColor = () => {

        $(".p_more").click(function () {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                $(".p_more").removeClass("buttonDis");
                var c = 1;
            } else {
                $(".p_more").addClass("buttonDis");
                $(this).removeClass("buttonDis");
                $(this).addClass("active");
                var c = $(this).attr("d_v");
            }

            $(".progress-bar").removeClass("p_bar_1");
            $(".progress-bar").removeClass("p_bar_2");
            $(".progress-bar").removeClass("p_bar_3");
            $(".progress-bar").removeClass("p_bar_4");
            $(".progress-bar").removeClass("p_bar_5");
            $(".progress-bar").removeClass("p_bar_6");
            if (c == 1) {
                $(".progress").append(
                    '<div class="progress bg-transparent p_bar_' + c + '" style="width: 1%"></div>'
                );
            } else if (c == "2") {
                $(".progress").append(
                    '<div class="progress-bar bg-success p_bar_' +
                    c +
                    '" style="width: 1%"></div>'
                );
            } else if (c == "3") {
                $(".progress").append(
                    '<div class="progress-bar bg-danger p_bar_' +
                    c +
                    '" style="width: 1%"></div>'
                );
            } else if (c == "4") {
                $(".progress").append(
                    '<div class="progress-bar bg-warning p_bar_' +
                    c +
                    '" style="width: 1%"></div>'
                );
            } else if (c == "5") {
                $(".progress").append(
                    '<div class="progress-bar bg-info p_bar_' +
                    c +
                    '" style="width: 1%"></div>'
                );
            } else if (c == "6") {
                $(".progress").append(
                    '<div class="progress-bar bg-dark p_bar_' +
                    c +
                    '" style="width: 1%"></div>'
                );
            }

            // console.log({ c });
            // console.log("divv", `<div class="progress-bar p_bar_' + ${c} + '" style="width: 1%"></div>`)
            console.log("check", c);
            barAnim(c, 1);
        });



        let allPercent = {
            btn_one: timeTracker?.CallToAction.length > 0 && calulateSectionInPercent(duration, timeTracker?.CallToAction[0], timeTracker?.CallToAction[1]),
            btn_two: timeTracker?.Questions.length > 0 && calulateSectionInPercent(duration, timeTracker?.Questions[0], timeTracker?.Questions[1]),
            btn_three: timeTracker?.Exercises.length > 0 && calulateSectionInPercent(duration, timeTracker?.Exercises[0], timeTracker?.Exercises[1]),
            btn_fourth: timeTracker?.NeedsReview.length > 0 && calulateSectionInPercent(duration, timeTracker?.NeedsReview[0], timeTracker?.NeedsReview[1]),
            btn_fivth: timeTracker?.Insight.length > 0 && calulateSectionInPercent(duration, timeTracker?.Insight[0], timeTracker?.Insight[1])
        }

        console.warn("sample", allPercent);

        function barAnim(current, v) {

            getValue += 1;

            v += 1;
            let runningTime = progressBar.current.value;
            let totalTime = Math.floor(audioPlayer?.current?.duration);

            if (runningTime >= totalTime) {
                var id = window.setTimeout(function () { }, 100);
                while (id--) {
                    window.clearTimeout(id); // will do nothing if no timeout with id is present
                }
            } else {
                $(".p_bar_" + current)
                    .css("width", runningTime + "%")
                    //.css("width", allPercent?.btn_one + "%")
                    .attr("aria-valuenow", 1);
                var id = window.setTimeout(function () { }, 100);
                while (id--) {
                    window.clearTimeout(id); // will do nothing if no timeout with id is present
                }
                setTimeout(barAnim, 1000, current, v);
            }
            // console.log("barrr", `".p_bar_" + ${current}`)
            // console.log("vvv", `"width", ${v} + "%"`)
        }

        if (getValue == 0) {
            setTimeout(barAnim, 1000, 1, 1);
        }

    }



    // useEffect(() => {
    //     handleEventColor();
    // })

    function newFunction() {
        togglePlayPause()
        handleEventColor()
    }


    return (
        <>

            {/* <div class="progress">
                <div class="progress-bar bg-info" style={{
                    width: "35%",
                }}>First</div>

                <div class="progress-bar bg-warning" style={{
                    width: "20%"
                }}>Second</div>

                <div class="progress-bar bg-dark" style={{
                    width: "30%"
                }} >Third</div>
            </div> */}


            <div
                className="h-[100%] lg:h-[100vh] flex items-center "
                style={{
                    background: "linear-gradient(180deg, #4C547B 0%, #000000 100%)",
                }}
            >

                <div className="container mx-auto px-4 py-4">
                    <div className="Exercise-Main-Sec flex w-[100%] 2xl:flex-row xl:flex-row lg:flex-row md:flex-col flex-col">
                        <div className="Exercise-img 2xl:w-[50%] xl:w-[50%] lg:w-[50%] md:w-[100%] w-[100%] mb-[20px]">
                            {/* <img className="rocket w-[100] mx-auto" src={Teaching} /> */}

                            <div>

                                {
                                    fileType === "mpeg" &&

                                    <h1 className="audio_text"> {audioName} </h1>
                                }


                            </div>


                            <video
                                id="audioplay"
                                className={fileType === "mpeg" ? "remove_video" : "add_video"}
                                ref={audioPlayer}

                                src={source}
                                muted={isMuted}
                                height="360px"
                                width="100%"
                                preload="metadata"

                            />


                            <div className="pb-2 mt-3 relative">
                                <div className="absolute w-full top-[30%] z-[1]" style={{ maxWidth: "100%" }}>
                                    <div className="progress bg-transparent relative" style={{ width: "100%", background: "transprent" }}>



                                        {/* {
                                            triggerColor?.color1 ? TriggerColor1 : null}
                                          
                                        {
                                            triggerColor?.color2 ? TriggerColor2 : null}
                                        {
                                            triggerColor?.color3 ? TriggerColor3 : null
                                        }

                                        {
                                            triggerColor?.color4 ? TriggerColor4 : null
                                        }

                                        {
                                            triggerColor?.color5 ? TriggerColor5 : null
                                        } */}

                                    </div>
                                </div>
                                <input id="audioplay" type="range" className={styles.progressBar} defaultValue="0" ref={progressBar} onChange={changeRange} />
                            </div>


                            <div className="button-bar">
                                <button onClick={newFunction} className={styles.playPause}>
                                    {
                                        isPlaying ?
                                            <FaPause className={styles.pause} />
                                            :
                                            <FaPlay className={styles.play} />
                                    }
                                </button>

                                <button className="volume-btn" onClick={() => muteAudio()}>
                                    {
                                        isMuted ?
                                            <IoMdVolumeOff className="" /> :
                                            <IoMdVolumeHigh className="" />
                                    }


                                </button>

                                <div className="video-time">
                                    <p ref={currentTimeToRegister}>{calculateTime(currentTime)}</p>/
                                    <p>{calculateTime(duration)}</p>
                                </div>


                            </div>
                        </div>



                        <div className="Exercis-btns flex justify-center itrms-center flex-col 2xl:w-[50%] xl:w-[50%] lg:w-[50%] md:w-[100%] w-[100%] px-[20px]">
                            <button
                                value="CallToAction"
                                //onClick={(event) => getQuestionTime(event)}
                                //onClick={() => handleColor1()}
                                className="p_more rounded-xl text-white text-2xl bg-[#d80dca] px-[70px] py-[12px] mb-[20px] flex justify-center itrms-center 2xl:w-[300px] xl:w-[300px] lg:w-[300px] w-[100%] mx-auto"
                                style={{ fontFamily: "ubermovemedium-webfont" }}
                                d_v="2"
                            >
                                Call to action
                            </button>

                            {/* 
                            <button className="p_more" d_v="3">Danger</button>
                            <br />
                            <button className="p_more" d_v="4">Warning</button>
                            <br />
                            <button className="p_more" d_v="5">ffff</button>
                            <br />
                            <button className="p_more" d_v="6">jjhhgh</button> */}

                            <button
                                value="Questions"
                                onClick={(event) => getQuestionTime(event)}
                                //onClick={() => handleColor2()}
                                d_v="3"
                                style={{ fontFamily: "ubermovemedium-webfont" }}
                                className="p_more rounded-xl text-white text-2xl bg-[#0ad725] px-[70px] py-[12px] mb-[20px] flex justify-center itrms-center 2xl:w-[300px] xl:w-[300px] lg:w-[300px] w-[100%] mx-auto"
                            >
                                Questions
                            </button>

                            <button
                                value="Exercises"
                                onClick={(event) => getQuestionTime(event)}
                                // onClick={() => handleColor3()}
                                d_v="4"
                                style={{ fontFamily: "ubermovemedium-webfont" }}
                                className="p_more rounded-xl text-white text-2xl bg-[#d50a0f] px-[70px] py-[12px] mb-[20px] flex justify-center itrms-center 2xl:w-[300px] xl:w-[300px] lg:w-[300px] w-[100%] mx-auto"
                            >
                                Exercises
                            </button>

                            <button
                                value="NeedsReview"
                                onClick={(event) => getQuestionTime(event)}
                                // onClick={() => handleColor4()}
                                d_v="5"
                                style={{ fontFamily: "ubermovemedium-webfont" }}
                                className="p_more rounded-xl text-white text-2xl bg-[#d4c10d] px-[70px] py-[12px] mb-[20px] flex justify-center itrms-center 2xl:w-[300px] xl:w-[300px] lg:w-[300px] w-[100%] mx-auto"
                            >
                                Need Review
                            </button>

                            {
                                highLightText ?


                                    <div className="2xl:w-[304px] xl:w-[296px] lg:w-[296px] w-[100%] mx-auto rounded-xl overflow-hidden bg-[#4F4F4F]">

                                        <div className="flex items-center ">


                                            <button
                                                value="Insight"
                                                // onClick={() => handleColor5()}
                                                onClick={() => handleHighlight()}
                                                style={{ fontFamily: "ubermovemedium-webfont" }}
                                                // className="rounded-xl text-white text-2xl bg-[#07c8d8] px-[70px] py-[12px] mb-[20px] flex justify-center itrms-center 2xl:w-[300px] xl:w-[300px] lg:w-[300px] w-[100%] mx-auto"
                                                className="text-black text-lg bg-[#07c8d8] mr-0 flex justify-center items-stretch w-[100%] mx-auto"
                                            >
                                                <h1 className="text-2xl w-3/5 text-white h-[auto] p-2">Highlighting...</h1>
                                                <p className=" bg-[#D9D9D9] w-2/5 h-[auto] p-2">End higlight</p>
                                            </button>

                                        </div>

                                        <form className="p-4">
                                            <div className="flex">
                                                <label
                                                    for="search-dropdown"
                                                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                                                >
                                                    Your Email
                                                </label>

                                                <div
                                                    id="dropdown"
                                                    className="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700"
                                                >
                                                    <ul
                                                        className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                                        aria-labelledby="dropdown-button"
                                                    >
                                                        <li>
                                                            <a
                                                                href="#"
                                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                            >
                                                                Shopping
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="#"
                                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                            >
                                                                Images
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="#"
                                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                            >
                                                                News
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="#"
                                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                            >
                                                                Finance
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="relative w-full">
                                                    <input
                                                        type="text"
                                                        id="text-dropdown"
                                                        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                                        placeholder="Add a note (optional)"
                                                        required
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="absolute top-0 right-0 p-2.5 text-sm font-medium text-black bg-[#C1B8B8] hover:bg-[#C1B8B8] focus:ring-4 focus:outline-none focus:ring-[#C1B8B8] "
                                                    >
                                                        <img src={Send} width="24px" />
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    :

                                    <button
                                        value="Insight"
                                        //onClick={() => handleColor5()}
                                        d_v="6"
                                        onClick={(event) => getQuestionTime(event)}
                                        style={{ fontFamily: "ubermovemedium-webfont" }}
                                        className="p_more rounded-xl text-white text-2xl bg-[#07c8d8] px-[70px] py-[12px] mb-[20px] flex justify-center itrms-center 2xl:w-[300px] xl:w-[300px] lg:w-[300px] w-[100%] mx-auto"
                                    >
                                        Insight
                                    </button>

                            }



                        </div>
                    </div>


                </div>



            </div>
        </>
    );
};

export default Index;



// import React, { useState, useRef, useEffect } from "react";
// import Teaching from "../../assets/img/teaching.png";
// //import { VideoProgress, LINE_TYPE, START } from 'react-video-progress';
// //import ReactPlayer from 'react-player';
// import ColorElement from "../ColorElement";
// import styles from "../../AudioPlayer.module.css";
// import { FaPlay } from "react-icons/fa"
// import { FaPause } from "react-icons/fa";
// import { IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";
// import Send from "../../assets/img/send.png";
// import $ from "jquery";

// // const timeTracker = {
// //     CallToAction: ["0:10", "00:15"],
// //     Questions: ["0:20", "00:27"],
// //     Exercises: ["0:35", "00:45"],
// //     NeedsReview: ["0:50", "00:55"],
// //     Insight: ["0:60", "01:02"],
// // };

// var finalValue;
// var getValue = 0;

// // const timeTracker = {
// //     CallToAction: [["00:05", "1:10"]],

// //     Questions: [
// //         ["00:01", "00:05"],
// //         ["00:20", "00:30"],
// //         ["00:35", "00:46"],
// //     ],

// //     Exercises: [
// //         ["00:01", "00:07"],
// //         ["00:26", "00:30"],
// //         ["00:35", "00:46"],
// //     ],

// //     NeedsReview: [
// //         ["00:10", "00:15"],
// //         ["00:12", "00:14"],
// //         ["00:35", "00:46"],
// //     ],

// //     Insight: [
// //         ["00:15", "00:18"],
// //         ["00:31", "00:35"],
// //         ["00:40", "00:46"],
// //     ],

// // };

// const timeTracker = {
//     CallToAction: [],
//     Questions: [],
//     Exercises: [],
//     NeedsReview: [],
//     Insight: [],
// };

// const Index = ({ source, fileType, audioName }) => {


//     const [isPlaying, setIsPlaying] = useState(false);
//     const [duration, setDuration] = useState(0);
//     const [currentTime, setCurrentTime] = useState(0);
//     const [videoSection, setVideoSection] = useState(timeTracker);
//     const [isMuted, setIsMuted] = useState(false);
//     const [highLightText, setHighLightText] = useState(false);
//     const [endtime, setEndtime] = useState("")
//     const [Force, setForce] = useState(1)

//     const [actionTrigger, setActionTrigger] = useState("0%");
//     const [quesTrigger, setQuesTrigger] = useState("0%");
//     const [exerciseTrigger, setExerciseTrigger] = useState("0%");
//     const [reviewTrigger, setReviewTrigger] = useState("0%");
//     const [insightTrigger, setInsightTrigger] = useState("0%");

//     const [triggerColor, setTriggerColor] = useState({
//         color1: false,
//         color2: false,
//         color3: false,
//         color4: false,
//         color5: false,
//     });

//     const audioPlayer = useRef();
//     const progressBar = useRef();
//     const animationRef = useRef();
//     const currentTimeToRegister = useRef();
//     const videoRef = useRef(null);


//     useEffect(() => {
//         const seconds = Math.floor(audioPlayer?.current?.duration);

//         setDuration(seconds);

//         progressBar.current.max = Number(seconds);


//     }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);


//     const calculateTime = (secs) => {
//         let convertSec = Number(secs);

//         const minutes = Math.floor(convertSec / 60);

//         const returnedMinutes =
//             Number(minutes) < 10 ? `0${Number(minutes)}` : `${Number(minutes)}`;

//         const seconds = Math.floor(convertSec % 60);

//         const returnedSeconds =
//             Number(seconds) < 10 ? `0${Number(seconds)}` : `${Number(seconds)}`;

//         finalValue = `${Number(returnedMinutes) ? Number(returnedMinutes) : 0}:${Number(returnedSeconds) ? Number(returnedSeconds) : 0
//             }`

//         return finalValue;
//     };

//     const muteAudio = () => {
//         let els = document.getElementById("audioplay");
//         els.muted = !els.muted;
//         setIsMuted(els.muted);
//     }


//     const togglePlayPause = () => {
//         setIsPlaying(!isPlaying);
//     }

//     useEffect(() => {
//         if (isPlaying) {
//             audioPlayer.current.play();
//             animationRef.current = requestAnimationFrame(whilePlaying)
//         }

//         else {
//             audioPlayer.current.pause();
//             cancelAnimationFrame(animationRef.current);
//         }
//     }, [isPlaying])


//     const whilePlaying = () => {
//         progressBar.current.value = audioPlayer.current.currentTime;
//         changePlayerCurrentTime();
//         animationRef.current = requestAnimationFrame(whilePlaying);
//     }

//     const changeRange = () => {
//         audioPlayer.current.currentTime = progressBar.current.value;
//         changePlayerCurrentTime();
//     }

//     const changePlayerCurrentTime = () => {

//         progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
//         setCurrentTime(Number(progressBar.current.value));


//     }

//     const getQuestionTime = (event) => {

//         let newarr = videoSection;
//         let targetObjectValue = event.target.value;

//         let currntTimeInSec = currentTimeToRegister.current.innerText;

//         switch (targetObjectValue) {
//             case "CallToAction":
//                 newarr.CallToAction.push(currntTimeInSec);
//                 break;
//             case "Questions":
//                 newarr.Questions.push(currntTimeInSec);
//                 break;
//             case "Exercises":
//                 newarr.Exercises.push(currntTimeInSec);
//                 break;
//             case "NeedsReview":
//                 newarr.NeedsReview.push(currntTimeInSec);
//                 break;
//             case "Insight":
//                 newarr.Insight.push(currntTimeInSec);
//                 break;
//             default:
//                 return;
//         }
//         setVideoSection(newarr);
//     };

//     function getTimeDuration(start, end) {

//         let result1;
//         let result2;

//         if (toSeconds(end) === 0) {
//             result1 = toSeconds(start);
//             return result1;
//         } else {
//             result2 = toSeconds(end) - toSeconds(start);

//             return result2;
//         }

//     }

//     function toSeconds(time) {
//         if (typeof time == "string") {
//             const parts = time.split(":");
//             if (parts.length == 2) {
//                 parts.unshift("00");
//             }
//             return (
//                 parseInt(parts[0]) * 60 * 60 +
//                 parseInt(parts[1]) * 60 +
//                 parseInt(parts[2])
//             );
//         }
//     }

//     function calulateSectionInPercent(total, start, end) {

//         let duration1 = getTimeDuration(start, end == undefined ? "0:0" : end);
//         // let duration1 = getTimeDuration(start, end);

//         let calulatePersentage = (duration1 / total) * 100;
//         return calulatePersentage;
//     }

//     let elarlyvalue;
//     let newFinalArray1 = [];
//     let newFinalArray2 = [];
//     let newFinalArray3 = [];
//     let newFinalArray4 = [];
//     let newFinalArray5 = [];

//     elementBar(timeTracker.CallToAction, newFinalArray1, "bg-[#d80dca]")
//     elementBar(timeTracker.Questions, newFinalArray2, "bg-[#0ad725]")
//     elementBar(timeTracker.Exercises, newFinalArray3, "bg-[#d50a0f]")
//     elementBar(timeTracker.NeedsReview, newFinalArray4, "bg-[#d4c10d]")
//     elementBar(timeTracker.Insight, newFinalArray5, "bg-[#07c8d8]")



//     function elementBar(arr, arrToPush, eleColer) {
//         elarlyvalue = "0:00";
//         arr.map((el, index) => {
//             // calculate the time duration from early value
//             const iv = getTimeDuration("0:00", elarlyvalue);
//             // calculate the time duration from first element of array
//             const fv = getTimeDuration("0:00", el[0]);


//             if (fv > iv) {
//                 arrToPush.push([elarlyvalue, el[0], "bg-[#0000]"],);
//                 arrToPush.push([el[0], el[1], eleColer]);
//                 if (index == timeTracker.CallToAction.length - 1) {
//                     arrToPush.push([el[1], finalValue ? finalValue : "1:02", "bg-[#0000]"]);
//                 }
//                 elarlyvalue = el[1];
//             }
//         });
//     }


//     const TriggerColor1 = newFinalArray1.map(el => {
//         const perc = calulateSectionInPercent(duration, el[0], el[1])
//         return <ColorElement percent={Math.floor(perc) + "%"} colorName={el[2]} />
//     })

//     const TriggerColor2 = newFinalArray2.map(el => {

//         const perc = calulateSectionInPercent(duration, el[0], el[1])
//         return <ColorElement percent={Math.floor(perc) + "%"} colorName={el[2]} />
//     })

//     const TriggerColor3 = newFinalArray3.map(el => {
//         const perc = calulateSectionInPercent(duration, el[0], el[1])
//         return <ColorElement percent={Math.floor(perc) + "%"} colorName={el[2]} />
//     })

//     const TriggerColor4 = newFinalArray4.map(el => {
//         const perc = calulateSectionInPercent(duration, el[0], el[1])
//         return <ColorElement percent={Math.floor(perc) + "%"} colorName={el[2]} />
//     })

//     const TriggerColor5 = newFinalArray5.map(el => {
//         const perc = calulateSectionInPercent(duration, el[0], el[1])
//         return <ColorElement percent={Math.floor(perc) + "%"} colorName={el[2]} />
//     })


//     const handleColor1 = () => {

//         setTriggerColor((prev) => {
//             return {
//                 ...prev,
//                 color1: !triggerColor?.color1,
//             }
//         })
//     }

//     const handleColor2 = () => {

//         setTriggerColor((prev) => {
//             return {
//                 ...prev,
//                 color2: !triggerColor?.color2,
//             }
//         })
//     }

//     const handleColor3 = () => {

//         setTriggerColor((prev) => {
//             return {
//                 ...prev,
//                 color3: !triggerColor?.color3,
//             }
//         })
//     }

//     const handleColor4 = () => {

//         setTriggerColor((prev) => {
//             return {
//                 ...prev,
//                 color4: !triggerColor?.color4,
//             }
//         })
//     }

//     const handleColor5 = () => {

//         setTriggerColor((prev) => {
//             return {
//                 ...prev,
//                 color5: !triggerColor?.color5,
//             }
//         })

//         setHighLightText(true);

//     }

//     const handleHighlight = () => {

//         setTriggerColor((prev) => {
//             return {
//                 ...prev,
//                 color5: !triggerColor?.color5,
//             }
//         })

//         setHighLightText(false);

//     }

//     useEffect(() => {
//         let currentTimeFromDom = document.getElementsByClassName("video-time")[0].getElementsByTagName("p")[0].innerHTML;
//         if (currentTimeFromDom == finalValue) {
//             if (toSeconds(currentTimeFromDom) > 0) {
//                 setTimeout(() => {
//                     setIsPlaying(!isPlaying);
//                 }, 1000);

//                 cancelAnimationFrame(animationRef.current);
//             }
//         }
//     }, [currentTime])


//     const handleEventColor = () => {

//         $(".p_more").click(function () {
//             if ($(this).hasClass("active")) {
//                 $(this).removeClass("active");
//                 $(".p_more").removeClass("buttonDis");
//                 var c = 1;
//             } else {
//                 $(".p_more").addClass("buttonDis");
//                 $(this).removeClass("buttonDis");
//                 $(this).addClass("active");
//                 var c = $(this).attr("d_v");
//             }

//             $(".progress-bar").removeClass("p_bar_1");
//             $(".progress-bar").removeClass("p_bar_2");
//             $(".progress-bar").removeClass("p_bar_3");
//             $(".progress-bar").removeClass("p_bar_4");
//             console.log({ c })
//             if (c == 1) {
//                 $(".progress").append(
//                     '<div class="progress-bar p_bar_' + c + '" style="width: 1%" ></div>'
//                 );
//             } else if (c == "2") {
//                 $(".progress").append(
//                     '<div class="progress-bar call_action p_bar_' +
//                     c +
//                     '" style="width: 1%"></div>'
//                 );
//             } else if (c == "3") {
//                 $(".progress").append(
//                     '<div class="progress-bar bg-success p_bar_' +
//                     c +
//                     '" style="width: 1%"></div>'
//                 );
//             } else if (c == "4") {
//                 $(".progress").append(
//                     '<div class="progress-bar bg-danger p_bar_' +
//                     c +
//                     '" style="width: 1%"></div>'
//                 );
//             } else if (c == "5") {
//                 $(".progress").append(
//                     '<div class="progress-bar bg-warning p_bar_' +
//                     c +
//                     '" style="width: 1%"></div>'
//                 );
//             } else if (c == "6") {
//                 $(".progress").append(
//                     '<div class="progress-bar bg-info p_bar_' +
//                     c +
//                     '" style="width: 1%"></div>'
//                 );
//             }

//             // console.log({ c });
//             // console.log("divv", `<div class="progress-bar p_bar_' + ${c} + '" style="width: 1%"></div>`)

//             barAnim(c, 1);
//         });

//         let allPercent = {
//             btn_one: timeTracker?.CallToAction.length > 0 && calulateSectionInPercent(duration, timeTracker?.CallToAction[0], timeTracker?.CallToAction[1]),
//             btn_two: timeTracker?.Questions.length > 0 && calulateSectionInPercent(duration, timeTracker?.Questions[0], timeTracker?.Questions[1]),
//             btn_three: timeTracker?.Exercises.length > 0 && calulateSectionInPercent(duration, timeTracker?.Exercises[0], timeTracker?.Exercises[1]),
//             btn_fourth: timeTracker?.NeedsReview.length > 0 && calulateSectionInPercent(duration, timeTracker?.NeedsReview[0], timeTracker?.NeedsReview[1]),
//             btn_fivth: timeTracker?.Insight.length > 0 && calulateSectionInPercent(duration, timeTracker?.Insight[0], timeTracker?.Insight[1])
//         }

//         console.warn("sample", allPercent);

//         function barAnim(current, v) {

//             getValue += 1;

//             v += 1;
//             let runningTime = progressBar.current.value;
//             let totalTime = Math.floor(audioPlayer?.current?.duration);

//             if (runningTime >= totalTime) {
//                 var id = window.setTimeout(function () { }, 100);
//                 while (id--) {
//                     window.clearTimeout(id); // will do nothing if no timeout with id is present
//                 }

//             } else {
//                 $(".p_bar_" + current)
//                     .css("width", runningTime + "%")
//                     //.css("width", allPercent?.btn_one + "%")
//                     .attr("aria-valuenow", 1);
//                 var id = window.setTimeout(function () { }, 100);
//                 while (id--) {
//                     window.clearTimeout(id); // will do nothing if no timeout with id is present
//                 }
//                 setTimeout(barAnim, 1000, current, v);
//             }
//             // console.log("barrr", `".p_bar_" + ${current}`)
//             console.log("vvv", `"width", ${runningTime} + "%"`)
//         }

//         if (getValue == 0) {
//             setTimeout(barAnim, 1000, 1, 1);
//         }

//     }



//     // useEffect(() => {
//     //     handleEventColor();
//     // })

//     function newFunction() {
//         togglePlayPause()
//         handleEventColor()
//     }


//     return (
//         <>

//             <div>
//                 <div className="progress" current_progress="0" style={{
//                     width: "100%",

//                 }}>
//                     <div className="progress-bar p_bar_1" style={{
//                         width: "1%",
//                     }}></div>
//                 </div>

//                 <br />

//                 <button className="p_more" d_v="2">Sucess</button>
//                 <br />
//                 <button className="p_more" d_v="3">Danger</button>
//                 <br />
//                 <button className="p_more" d_v="4">Warning</button>
//                 <br />
//                 <button className="p_more" d_v="5">ffff</button>
//                 <br />
//                 <button className="p_more" d_v="6">jjhhgh</button>

//             </div>



//             <div
//                 className="h-[100%] lg:h-[100vh] flex items-center "
//                 style={{
//                     background: "linear-gradient(180deg, #4C547B 0%, #000000 100%)",
//                 }}
//             >

//                 <div className="container mx-auto px-4 py-4">
//                     <div className="Exercise-Main-Sec flex w-[100%] 2xl:flex-row xl:flex-row lg:flex-row md:flex-col flex-col">
//                         <div className="Exercise-img 2xl:w-[50%] xl:w-[50%] lg:w-[50%] md:w-[100%] w-[100%] mb-[20px]">
//                             {/* <img className="rocket w-[100] mx-auto" src={Teaching} /> */}

//                             <div>

//                                 {
//                                     fileType === "mpeg" &&

//                                     <h1 className="audio_text"> {audioName} </h1>
//                                 }


//                             </div>


//                             <video
//                                 id="audioplay"
//                                 className={fileType === "mpeg" ? "remove_video" : "add_video"}
//                                 ref={audioPlayer}

//                                 src={source}
//                                 muted={isMuted}
//                                 height="360px"
//                                 width="100%"
//                                 preload="metadata"

//                             />


//                             <div className="pb-2 mt-3 relative">
//                                 <div className="absolute w-full top-[30%] z-[1]" style={{ maxWidth: "100%" }}>
//                                     <div className="progress bg-transparent relative" current_progress="0" style={{
//                                         width: "100%",

//                                     }}>
//                                         <div className="progress-bar p_bar_1" style={{
//                                             width: "1%",
//                                         }}></div>
//                                     </div>

//                                     {/* <div className="progress bg-transparent relative" style={{ maxWidth: "100%", background: "transprent" }}>
//                                         {
//                                             triggerColor?.color1 ? TriggerColor1 : null}
//                                         {
//                                             triggerColor?.color2 ? TriggerColor2 : null}
//                                         {
//                                             triggerColor?.color3 ? TriggerColor3 : null
//                                         }

//                                         {
//                                             triggerColor?.color4 ? TriggerColor4 : null
//                                         }

//                                         {
//                                             triggerColor?.color5 ? TriggerColor5 : null
//                                         }

//                                     </div> */}
//                                 </div>
//                                 <input id="audioplay" type="range" className={styles.progressBar} defaultValue="0" ref={progressBar} onChange={changeRange} />
//                             </div>


//                             <div className="button-bar">
//                                 <button onClick={newFunction} className={styles.playPause}>
//                                     {
//                                         isPlaying ?
//                                             <FaPause className={styles.pause} />
//                                             :
//                                             <FaPlay className={styles.play} />
//                                     }
//                                 </button>

//                                 <button className="volume-btn" onClick={() => muteAudio()}>
//                                     {
//                                         isMuted ?
//                                             <IoMdVolumeOff className="" /> :
//                                             <IoMdVolumeHigh className="" />
//                                     }


//                                 </button>

//                                 <div className="video-time">
//                                     <p ref={currentTimeToRegister}>{calculateTime(currentTime)}</p>/
//                                     <p>{calculateTime(duration)}</p>
//                                 </div>


//                             </div>
//                         </div>



//                         <div className="Exercis-btns flex justify-center itrms-center flex-col 2xl:w-[50%] xl:w-[50%] lg:w-[50%] md:w-[100%] w-[100%] px-[20px]">
//                             <button
//                                 value="CallToAction"
//                                 //onClick={(event) => getQuestionTime(event)}
//                                 //onClick={() => handleColor1()}
//                                 className="p_more rounded-xl text-white text-2xl bg-[#d80dca] px-[70px] py-[12px] mb-[20px] flex justify-center itrms-center 2xl:w-[300px] xl:w-[300px] lg:w-[300px] w-[100%] mx-auto"
//                                 style={{ fontFamily: "ubermovemedium-webfont" }}
//                                 d_v="2"
//                             >
//                                 Call to action
//                             </button>

//                             {/*
//                             <button className="p_more" d_v="3">Danger</button>
//                             <br />
//                             <button className="p_more" d_v="4">Warning</button>
//                             <br />
//                             <button className="p_more" d_v="5">ffff</button>
//                             <br />
//                             <button className="p_more" d_v="6">jjhhgh</button> */}

//                             <button
//                                 value="Questions"
//                                 onClick={(event) => getQuestionTime(event)}
//                                 //onClick={() => handleColor2()}
//                                 d_v="3"
//                                 style={{ fontFamily: "ubermovemedium-webfont" }}
//                                 className="p_more rounded-xl text-white text-2xl bg-[#0ad725] px-[70px] py-[12px] mb-[20px] flex justify-center itrms-center 2xl:w-[300px] xl:w-[300px] lg:w-[300px] w-[100%] mx-auto"
//                             >
//                                 Questions
//                             </button>

//                             <button
//                                 value="Exercises"
//                                 onClick={(event) => getQuestionTime(event)}
//                                 // onClick={() => handleColor3()}
//                                 d_v="4"
//                                 style={{ fontFamily: "ubermovemedium-webfont" }}
//                                 className="p_more rounded-xl text-white text-2xl bg-[#d50a0f] px-[70px] py-[12px] mb-[20px] flex justify-center itrms-center 2xl:w-[300px] xl:w-[300px] lg:w-[300px] w-[100%] mx-auto"
//                             >
//                                 Exercises
//                             </button>

//                             <button
//                                 value="NeedsReview"
//                                 onClick={(event) => getQuestionTime(event)}
//                                 // onClick={() => handleColor4()}
//                                 d_v="5"
//                                 style={{ fontFamily: "ubermovemedium-webfont" }}
//                                 className="p_more rounded-xl text-white text-2xl bg-[#d4c10d] px-[70px] py-[12px] mb-[20px] flex justify-center itrms-center 2xl:w-[300px] xl:w-[300px] lg:w-[300px] w-[100%] mx-auto"
//                             >
//                                 Need Review
//                             </button>

//                             {
//                                 highLightText ?


//                                     <div className="2xl:w-[304px] xl:w-[296px] lg:w-[296px] w-[100%] mx-auto rounded-xl overflow-hidden bg-[#4F4F4F]">

//                                         <div className="flex items-center ">


//                                             <button
//                                                 value="Insight"
//                                                 // onClick={() => handleColor5()}
//                                                 onClick={() => handleHighlight()}
//                                                 style={{ fontFamily: "ubermovemedium-webfont" }}
//                                                 // className="rounded-xl text-white text-2xl bg-[#07c8d8] px-[70px] py-[12px] mb-[20px] flex justify-center itrms-center 2xl:w-[300px] xl:w-[300px] lg:w-[300px] w-[100%] mx-auto"
//                                                 className="text-black text-lg bg-[#07c8d8] mr-0 flex justify-center items-stretch w-[100%] mx-auto"
//                                             >
//                                                 <h1 className="text-2xl w-3/5 text-white h-[auto] p-2">Highlighting...</h1>
//                                                 <p className=" bg-[#D9D9D9] w-2/5 h-[auto] p-2">End higlight</p>
//                                             </button>

//                                         </div>

//                                         <form className="p-4">
//                                             <div className="flex">
//                                                 <label
//                                                     for="search-dropdown"
//                                                     className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
//                                                 >
//                                                     Your Email
//                                                 </label>

//                                                 <div
//                                                     id="dropdown"
//                                                     className="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700"
//                                                 >
//                                                     <ul
//                                                         className="py-1 text-sm text-gray-700 dark:text-gray-200"
//                                                         aria-labelledby="dropdown-button"
//                                                     >
//                                                         <li>
//                                                             <a
//                                                                 href="#"
//                                                                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                                                             >
//                                                                 Shopping
//                                                             </a>
//                                                         </li>
//                                                         <li>
//                                                             <a
//                                                                 href="#"
//                                                                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                                                             >
//                                                                 Images
//                                                             </a>
//                                                         </li>
//                                                         <li>
//                                                             <a
//                                                                 href="#"
//                                                                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                                                             >
//                                                                 News
//                                                             </a>
//                                                         </li>
//                                                         <li>
//                                                             <a
//                                                                 href="#"
//                                                                 className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                                                             >
//                                                                 Finance
//                                                             </a>
//                                                         </li>
//                                                     </ul>
//                                                 </div>
//                                                 <div className="relative w-full">
//                                                     <input
//                                                         type="text"
//                                                         id="text-dropdown"
//                                                         className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
//                                                         placeholder="Add a note (optional)"
//                                                         required
//                                                     />
//                                                     <button
//                                                         type="submit"
//                                                         className="absolute top-0 right-0 p-2.5 text-sm font-medium text-black bg-[#C1B8B8] hover:bg-[#C1B8B8] focus:ring-4 focus:outline-none focus:ring-[#C1B8B8] "
//                                                     >
//                                                         <img src={Send} width="24px" />
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </form>
//                                     </div>
//                                     :

//                                     <button
//                                         value="Insight"
//                                         //onClick={() => handleColor5()}
//                                         d_v="6"
//                                         onClick={(event) => getQuestionTime(event)}
//                                         style={{ fontFamily: "ubermovemedium-webfont" }}
//                                         className="p_more rounded-xl text-white text-2xl bg-[#07c8d8] px-[70px] py-[12px] mb-[20px] flex justify-center itrms-center 2xl:w-[300px] xl:w-[300px] lg:w-[300px] w-[100%] mx-auto"
//                                     >
//                                         Insight
//                                     </button>

//                             }



//                         </div>
//                     </div>


//                 </div>



//             </div>
//         </>
//     );
// };

// export default Index;
