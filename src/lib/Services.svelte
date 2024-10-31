<script lang="ts">
    import { onMount } from "svelte";

    import {
        AirConditionerIcon,
        PowerIcon,
        VideoCameraIcon,
        HeatIcon,
    } from "svelte-uicons/rounded/regular";

    import womanWorker from "$lib/media/about/1.png";

    /* Fetch af data */
    let servicesData = [];
    let isLoading = true;
    let error = null;

    let completePath = "http://localhost:5333/images/service/";

    onMount(async () => {
        try {
            const response = await fetch("http://127.0.0.1:5333/service");
            if (!response.ok) {
                throw new Error("Kunne ikke finde data.");
            }
            servicesData = await response.json();
        } catch (err) {
            error = err.message;
            console.error("Error:", err);
        } finally {
            isLoading = false;
        }
    });

    /* Booking med POST*/
    let name = "";
    let email = "";
    let phone = "";

    async function opretBooking() {
        try {
            const response = await fetch("http://127.0.0.1:5333/booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                }),
            });

            if (!response.ok) {
                throw new Error("Fejl i oprettelse.");
            }

            const data = await response.json();

            name = "";
            email = "";
            phone = "";

            alert("Du er nu blevet booket til service!");
        } catch (error) {
            console.error("Fejl:", error);
        }
    }
</script>

<section class="pt-28">
    <div class="max-w-screen-2xl mx-auto flex flex-col justify-center">
        <h2 class="text-4xl sm:text-5xl font-semibold">
            Vores <span class="text-pumpkin">Services</span>
        </h2>
        <p class="my-4 px-1 text-dimGray text-xl">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur,
            nesciunt accusantium. Libero.
        </p>

        <div class="flex items-center mb-20">
            <div
                class="border-2 rounded-full w-3 h-3 border-pumpkin mx-1"
            ></div>
            <span
                class="pb-[20px] text-platinum font-semibold text-xl select-none"
                >____________</span
            >
        </div>

        {#if servicesData && servicesData.length > 0}
            <div class="flex flex-col lg:flex-row xl:flow-row gap-14">
                <div class="py-8 lg:py-14 flex flex-col">
                    <div
                        class="flex flex-col items-center lg:items-start lg:flex-row gap-8 lg:gap-14"
                    >
                        <div class="flex gap-6">
                            <PowerIcon class="text-pumpkin" size="64" />
                            <div>
                                <h2 class="text-xl font-semibold">
                                    {servicesData[2].title}
                                </h2>
                                <p class="max-w-[35ch] my-4 text-dimGray">
                                    {servicesData[2].teaser}
                                </p>
                            </div>
                        </div>
                        <div class="flex gap-6">
                            <VideoCameraIcon class="text-pumpkin" size="64" />
                            <div>
                                <h2 class="text-xl font-semibold">
                                    {servicesData[1].title}
                                </h2>
                                <p class="max-w-[35ch] my-4 text-dimGray">
                                    {servicesData[1].teaser}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        class="flex flex-col items-center lg:items-start lg:flex-row gap-8 lg:gap-14"
                    >
                        <div class="flex gap-6">
                            <AirConditionerIcon
                                class="text-pumpkin"
                                size="64"
                            />
                            <div>
                                <h2 class="text-xl font-semibold">
                                    {servicesData[3].title}
                                </h2>
                                <p class="max-w-[35ch] my-4 text-dimGray">
                                    {servicesData[3].teaser}
                                </p>
                            </div>
                        </div>
                        <div class="flex gap-6">
                            <HeatIcon class="text-pumpkin" size="64" />
                            <div>
                                <h2 class="text-xl font-semibold">
                                    {servicesData[0].title}
                                </h2>
                                <p class="max-w-[35ch] my-4 text-dimGray">
                                    {servicesData[0].teaser}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <img
                    src={womanWorker}
                    alt=""
                    class="w-[200px] sm:w-[400px] md:w-[400px] lg:w-[500px] xl:w-[500px] mx-auto object-contain lg:mt-40"
                />
            </div>
        {/if}
    </div>

    <!-- Book service -->
    <section
        class="w-full flex gap-5 items-center justify-around py-4 drop-shadow-lg border-t flex-col lg:flex-row text-center lg:text-start"
    >
        <h2 class="font-semibold text-4xl">
            <span class="text-pumpkin font-semibold">Book</span><br /> service nu
        </h2>

        <form on:submit|preventDefault={opretBooking}>
            <div class="flex gap-4 flex-col md:flex-row">
                <input
                    class="rounded-md border-platinum px-4"
                    type="text"
                    name="name"
                    id=""
                    placeholder="Dit navn"
                    required
                    bind:value={name}
                />
                <input
                    class="rounded-md border-platinum px-4"
                    type="text"
                    name="mail"
                    id=""
                    placeholder="Din Email"
                    required
                    bind:value={email}
                />
                <input
                    class="rounded-md border-platinum px-4"
                    type="text"
                    name="tlfnr"
                    id=""
                    placeholder="Telefon nr."
                    required
                    bind:value={phone}
                />
                <button
                    class="uppercase py-4 px-8 bg-pumpkin rounded-md text-white hover:bg-dimGray hover:text-eerieblack"
                    >send</button
                >
            </div>
        </form>
    </section>
</section>
