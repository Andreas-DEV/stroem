<script lang="ts">
    import { onMount } from "svelte";
    import {
        ArrowCircleRightIcon,
        ArrowCircleLeftIcon,
    } from "svelte-uicons/rounded/regular";

    let sliderData = [];
    let isLoading = true;
    let error = null;
    let images = [];
    let caption = [];

    let count = 0;

    function timeoutCount() {
        setTimeout(() => {
            if (count === 0) {
                count += 1;
            } else if (count === 1) {
                count -= 1;
            }
            timeoutCount();
        }, 5000);
    }

    function increment() {
        if (count === 1) {
            count = 0;
        } else {
            count += 1;
        }
    }

    function decrement() {
        if (count === 0) {
            count = 1;
        } else {
            count -= 1;
        }
    }

    let completePath = "http://localhost:5333/images/slider/";

    onMount(async () => {
        try {
            const response = await fetch("http://localhost:5333/slider");
            if (!response.ok) {
                throw new Error("Kunne ikke finde data.");
            }
            sliderData = await response.json();
            images = sliderData.map((item) => item.image);
            caption = sliderData.map((item) => item.caption);
            console.log(caption);
        } catch (err) {
            error = err.message;
        } finally {
            isLoading = false;
        }
    });
    timeoutCount();
</script>

<section
    class="relative md:[&>button]:hover:block [&>button]:hover:transition [&>button]:hover:ease-in-out"
>
    <img
        src={completePath + images[count]}
        alt=""
        class="brightness-50 contrast-75 w-full h-[350px] object-cover lg:object-cover lg:h-full"
    />
    <div
        class="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 text-center"
    >
        <div
            class=" [&>p]:text-white [&>p>span:first-child]:text-xl lg:[&>p>span:first-child]:text-7xl md:[&>p>span:first-child]:text-5xl [&>p:last-child]:text-sm lg:[&>p:last-child]:text-2xl md:[&>p:last-child]:text-xl [&>p>span:first-child]:font-semibold [&>p>span:first-child]:block mb-20"
        >
            {@html caption[count]}
        </div>
        <a
            class="bg-pumpkin py-2 px-6 rounded-md md:px-12 md:py-4 text-white text-sm md:text-xl uppercase font-semibold hover:border hover:border-pumpkin hover:text-pumpkin hover:bg-transparent"
            href="/kontakt">Kontakt os</a
        >
    </div>
    <button
        class="absolute delay-150 block md:hidden -translate-y-1/2 right-5 top-1/2"
        on:click={increment}
    >
        <ArrowCircleRightIcon class="invert" size="32" />
    </button>
    <button
        class="absolute block md:hidden -translate-y-1/2 left-5 top-1/2"
        on:click={decrement}
    >
        <ArrowCircleLeftIcon class="invert" size="32" />
    </button>
</section>
