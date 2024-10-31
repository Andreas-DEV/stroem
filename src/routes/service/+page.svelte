<script lang="ts">
    /* http://127.0.0.1:5333/service */

    import { onMount } from "svelte";
    import Arkiv from "$lib/components/Arkiv.svelte";
    /* Fetch af data */
    let serviceData = [];
    let isLoading = true;
    let error = null;


    let airconData = []
    let aircon = true;

    let sikkerhedData = []
    let sikkerhed = false;

    let stroemData = []
    let stroem = false;

    let varmeData = []
    let varme = false;

    let completePath = "http://localhost:5333/images/service/";

    onMount(async () => {
        try {
            const response = await fetch("http://127.0.0.1:5333/service");
            if (!response.ok) {
                throw new Error("Kunne ikke finde data.");
            }
            serviceData = await response.json();
            airconData = serviceData[0]
            sikkerhedData = serviceData[1]
            stroemData = serviceData[2]
            varmeData = serviceData[3]
            console.log(serviceData);
        } catch (err) {
            error = err.message;
            console.error("Error:", err);
        } finally {
            isLoading = false;
        }
    });
</script>

<section>

    <div class=" bg-platinum2">
        <div
            class="flex max-w-screen-lg justify-between flex-col md:flex-row mx-auto pt-24 pb-14 px-10 lg:px-0"
        >
            <h2 class="text-4xl font-semibold">Services</h2>

            <div class="">
                <div>
                    <a href="/" class="font-semibold text-xs">Forside</a>
                    <span class="font-bold text-lg select-none">></span>
                    <a href="/service/" class=" font-semibold text-md text-pumpkin">Services</a
                        >
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-screen-lg mx-auto py-28 flex gap-4 flex-col lg:flex-row px-10 lg:px-0">
        <div class="flex flex-col  md:flex-col gap-2">
            <button
                on:click={() => {
                    aircon = true;
                    sikkerhed = false;
                    stroem = false;
                    varme = false;
                    console.log(aircon, sikkerhed, stroem, varme);
                }}
                class="border rounded-lg p-2 text-md text-center px-4 w-full lg:w-[250px] lg:text-start hover:bg-pumpkin hover:text-white"
                >Air Condition</button
            >

            <button
                on:click={() => {
                    aircon = false;
                    sikkerhed = true;
                    stroem = false;
                    varme = false;
                    console.log(aircon, sikkerhed, stroem, varme);
                }}
                class="border rounded-lg p-2 text-md text-center px-4 w-full lg:w-[250px] lg:text-start hover:bg-pumpkin hover:text-white"
                >Sikkerhed</button
            >

            <button
                on:click={() => {
                    aircon = false;
                    sikkerhed = false;
                    stroem = true;
                    varme = false;
                    console.log(aircon, sikkerhed, stroem, varme);
                }}
                class="border rounded-lg p-2 text-md text-center px-4 w-full lg:w-[250px] lg:text-start hover:bg-pumpkin hover:text-white"
                >Strøm</button
            >

            <button
                on:click={() => {
                    aircon = false;
                    sikkerhed = false;
                    stroem = false;
                    varme = true;
                    console.log(aircon, sikkerhed, stroem, varme);
                }}
                class="border rounded-lg p-2 text-md text-center px-4 w-full lg:w-[250px] lg:text-start hover:bg-pumpkin hover:text-white"
                >Varme</button
            >
        </div>


        {#if serviceData}
            {#if aircon}
            <div class="w-full">
                <img class="rounded-lg w-full" src={completePath + airconData.image} alt="">

                <div class="[&>p>p]:py-4">
                    <h2 class="text-4xl font-semi bold mb-8 mt-4">
                        {airconData.title}
                    </h2>
                    <p class="text">
                        {@html airconData.content}
                    </p>
                </div>
            </div>
            {:else if sikkerhed}
            <div class="w-full">
                <img class="rounded-lg w-full" src={completePath + sikkerhedData.image} alt="">

                <div class="[&>p>p]:py-4">
                    <h2 class="text-4xl font-semi bold mb-8 mt-4">
                        {sikkerhedData.title}
                    </h2>
                    <p class="text">
                        {@html sikkerhedData.content}
                    </p>
                </div>
            </div>
            {:else if stroem}
            <div class="w-full">
                <img class="rounded-lg w-full" src={completePath + stroemData.image} alt="">

                <div class="[&>p>p]:py-4">
                    <h2 class="text-4xl font-semi bold mb-8 mt-4">
                        {stroemData.title}
                    </h2>
                    <p class="text">
                        {@html stroemData.content}
                    </p>
                </div>
            </div>
            {:else if varme}
            <div class="w-full">
                <img class="rounded-lg w-full" src={completePath + varmeData.image} alt="">

                <div class="[&>p>p]:py-4">
                    <h2 class="text-4xl font-semi bold mb-8 mt-4">
                        {varmeData.title}
                    </h2>
                    <p class="text">
                        {@html varmeData.content}
                    </p>
                </div>
            </div>
            {/if}
        {/if}
    </div>
</section>
