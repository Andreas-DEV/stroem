<script lang="ts">
    import { onMount } from "svelte";
    import {
        ArrowCircleRightIcon,
        ArrowCircleLeftIcon,
    } from "svelte-uicons/rounded/regular";

    const handleNextClick = () => {
        carousel.goToNext();
    };

    let testiData = [];
    let isLoading = true;
    let error = null;

    let completePath = "http://localhost:5333/images/testimonial/";

    onMount(async () => {
        try {
            const response = await fetch("http://127.0.0.1:5333/testimonial");
            if (!response.ok) {
                throw new Error("Kunne ikke finde data.");
            }
            testiData = await response.json();
            console.log(testiData);
        } catch (err) {
            error = err.message;
            console.error("Error:", err);
        } finally {
            isLoading = false;
        }
    });

    let startPosition = 0;
    let windowWidth;

    /* Her tjekker */
    $: synligeTestimonials =
        windowWidth >= 1024 ? 3 : windowWidth >= 735 ? 2 : 1;

    function nextSlide() {
        if (startPosition + synligeTestimonials < testiData.length) {
            startPosition += 1;
        } else {
            startPosition = 0;
        }
    }

    function prevSlide() {
        if (startPosition > 0) {
            startPosition -= 1;
        } else {
            startPosition = testiData.length - synligeTestimonials;
        }
    }

    $: aktiveTestimonials = testiData.slice(
        startPosition,
        startPosition + synligeTestimonials,
    );
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="relative bg-gray-50 pb-20">
    <div class="relative">
        <section id="sectionBg" class="w-full h-[400px] relative"></section>
        <div id="center" class="text-center">
            <h2 class="text-2xl text-white mb-4 font-semibold sm:text-5xl">
                Vores <span class="text-pumpkin">kunder siger</span>
            </h2>
            <p class="text-platinum2 text-sm sm:text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, soluta.
            </p>
            <div class="flex mb-20 items-center" id="center2">
                <span
                    class="pb-[20px] text-platinum font-semibold text-xl select-none"
                    >______
                </span>
                <div
                    class="border-2 rounded-full w-3 h-3 border-pumpkin mx-1"
                ></div>
                <span
                    class="pb-[20px] text-platinum font-semibold text-xl select-none"
                    >______
                </span>
            </div>
        </div>
    </div>

    <div class="flex gap-4 max-w-screen-lg mx-auto justify-center">
        {#each aktiveTestimonials as item}
            <div class="flex">
                <div
                    class="relative w-[350px] h-[300px] border flex justify-center rounded-lg top-[-50px] bg-white"
                >
                    <div class="flex flex-col justify-center">
                        <img
                            class="p-[2px] rounded-full border-2 w-[100px] h-[100px] absolute -top-14 bg-white"
                            src={completePath + item.image}
                            alt=""
                            id="center2"
                        />
                        <div class="text-center">
                            <h2 class="text-red-600 text-2xl font-semibold">
                                {item.name}
                            </h2>
                            <p class="text-pumpkin mb-5">{item.title}</p>
                            <p
                                class="w-[35ch] text-md leading-4 text-dimGray font-light"
                            >
                                {item.review}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
    <div class="flex items-center justify-around gap-4 -mt-10">
        <button on:click={prevSlide}>
            <ArrowCircleLeftIcon size="64" class="px-4 py-2 rounded" />
        </button>
        <button on:click={nextSlide}>
            <ArrowCircleRightIcon size="64" class="px-4 py-2 rounded" />
        </button>
    </div>
</div>

<style lang="postcss">
    #sectionBg {
        position: relative;
        background: url("./media/backgroundimage.jpg") center center no-repeat;
        background-size: cover;
        opacity: 0.85;

        &:before {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-image: linear-gradient(
                to bottom right,
                #000000,
                #000000
            );
            opacity: 0.6;
        }
    }

    #center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    #center2 {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
    }

    #selector {
        user-drag: none;
        -webkit-user-drag: none;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }
</style>
