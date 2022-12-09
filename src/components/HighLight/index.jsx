import React from "react";
import Teaching from "../../assets/img/teaching.png";
import Send from "../../assets/img/send.png";

const Index = () => {
    return (
        <div
            className="h-[100vh] flex items-center "
            style={{
                background: "linear-gradient(180deg, #4C547B 0%, #000000 100%)",
            }}
        >
            <div className="container mx-auto px-4">
                <div className="Exercise-Main-Sec flex items-center w-[100%] 2xl:flex-row xl:flex-row lg:flex-row md:flex-col flex-col">
                    <div className="Exercise-img 2xl:w-[50%] xl:w-[50%] lg:w-[50%] md:w-[100%] w-[100%] mb-[20px]">
                        <img className="rocket w-[100] mx-auto" src={Teaching} />
                        <div className="">8:23 / 38:38</div>
                    </div>
                    <div className="Exercis-btns flex justify-center itrms-center flex-col 2xl:w-[50%] xl:w-[50%] lg:w-[50%] md:w-[100%] w-[100%] px-[20px]">
                        <a
                            href=""
                            className="rounded-xl text-white text-2xl bg-[#d80dca] px-[70px] py-[12px] mb-[20px] flex justify-center itrms-center 2xl:w-[300px] xl:w-[300px] lg:w-[300px] w-[100%] mx-auto"
                            style={{ fontFamily: "ubermovemedium-webfont" }}
                        >
                            Cal to action
                        </a>
                        <a
                            href=""
                            style={{ fontFamily: "ubermovemedium-webfont" }}
                            className="rounded-xl text-white text-2xl bg-[#0ad725] px-[70px] py-[12px] mb-[20px] flex justify-center itrms-center 2xl:w-[300px] xl:w-[300px] lg:w-[300px] w-[100%] mx-auto"
                        >
                            Ouestions
                        </a>
                        <a
                            href=""
                            style={{ fontFamily: "ubermovemedium-webfont" }}
                            className="rounded-xl text-white text-2xl bg-[#d50a0f] px-[70px] py-[12px] mb-[20px] flex justify-center itrms-center 2xl:w-[300px] xl:w-[300px] lg:w-[300px] w-[100%] mx-auto"
                        >
                            Exercises
                        </a>
                        <a
                            href=""
                            style={{ fontFamily: "ubermovemedium-webfont" }}
                            className="rounded-xl text-white text-2xl bg-[#d4c10d] px-[70px] py-[12px] mb-[20px] flex justify-center itrms-center 2xl:w-[300px] xl:w-[300px] lg:w-[300px] w-[100%] mx-auto"
                        >
                            Need Review
                        </a>
                        <a
                            href=""
                            style={{ fontFamily: "ubermovemedium-webfont" }}
                            className="rounded-xl text-white text-2xl bg-[#07c8d8] px-[70px] py-[12px] mb-[20px] flex justify-center itrms-center 2xl:w-[300px] xl:w-[300px] lg:w-[300px] w-[100%] mx-auto"
                        >
                            Insight
                        </a>
                        <div className="2xl:w-[300px] xl:w-[300px] lg:w-[300px] w-[100%] mx-auto rounded-xl overflow-hidden bg-[#4F4F4F]">
                            <div className="flex items-center bg-[#07c8d8]">
                                <h1 className="text-2xl pl-4 text-white">Highligning...</h1>
                                <a
                                    href=""
                                    style={{ fontFamily: "ubermovemedium-webfont" }}
                                    className="text-black text-lg bg-[#D9D9D9] mr-0 p-4 flex justify-center itrms-center w-[auto] mx-auto"
                                >
                                    End higlight
                                </a>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
