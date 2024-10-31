<script lang="ts">
    import { onMount } from "svelte";
    import Voreskunder from "$lib/Voreskunder.svelte";
    import VoresTeam from "$lib/VoresTeam.svelte";


    let aboutData = [];
    let isLoading = true;
    let error = null;

    let completePath = "http://localhost:5333/images/about/";

    onMount(async () => {
        try {
            const response = await fetch("http://127.0.0.1:5333/about");
            if (!response.ok) {
                throw new Error("Kunne ikke finde data.");
            }
            aboutData = await response.json();
            console.log(aboutData);
        } catch (err) {
            error = err.message;
            console.error("Error:", err);
        } finally {
            isLoading = false;
        }
    });
</script>

<section>
    <!-- Breadcrumb og side titel -->
    <div class=" bg-platinum2">
        <div class="flex max-w-screen-lg justify-between mx-auto pt-24 pb-14 px-10 lg:px-0">
            <h2 class="text-4xl font-semibold">Om os</h2>

            <div class="">
                <div>
                    <a href="/" class="font-semibold">Forside</a>
                    <span class="font-bold text-lg select-none">></span>
                    <a href="/about" class="text-pumpkin font-semibold">Om os</a
                    >
                </div>
            </div>
        </div>
    </div>

    <section class="mb-20">
        <div class="max-w-screen-xl mx-auto my-10">
            {#if aboutData}
                <div class="text-center">
                    <h2 class="mb-2 text-4xl">
                        {aboutData.title}
                    </h2>
                    <p>
                        {@html aboutData.teaser}
                    </p>
                    <div class="flex items-center justify-center">
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

                <div class="flex flex-col lg:flex-row gap-10 px-10">
                    <div>
                        <div class="flex flex-col pt-">
                            <h3 class="text-2xl pt-4">Hvem er vi?</h3>

                            <div class="flex items-center">
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
                        <p class="text-dimGray">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Repudiandae perferendis explicabo et fugiat!
                            Autem, maxime? Ipsa quaerat exercitationem tempore
                            optio nihil cupiditate illum, asperiores harum esse
                            ut repellat voluptatem a.
                        </p>



                            <div class="mt-20 relative">
                                <div class="flex gap-4 items-center">
                                    <div class="border-2 rounded-full w-4 h-4 border-dimGray mx-1"/>
                                    <p class="text-dimGray text-lg">Morbi fermentum felis nec</p>
                                </div>
                                <div class="flex gap-4 items-center">
                                    <div class="border-2 rounded-full w-4 h-4 border-dimGray mx-1"/>
                                    <p class="text-dimGray text-lg">Fermentum felis nec gravida tempus</p>
                                </div>
                                <a
                                    class="bg-pumpkin py-2 px-6 rounded-md md:px-12 md:py-4 text-white w-full text-center md:w-fit text-sm md:text-xl uppercase font-semibold hover:border hover:border-pumpkin hover:text-pumpkin hover:bg-transparent absolute -bottom-28"
                                    href="/kontakt">Kontakt os</a
                                >
                            </div>
                        </div>
                        
                        <img
                        src={completePath + aboutData.image}
                        class="rounded-lg mt-20"
                        alt=""
                        />
                    </div>
            {/if}
        </div>
    </section>
    
    <Voreskunder/>
    <VoresTeam/>
</section>
