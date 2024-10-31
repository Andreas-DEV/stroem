<script lang="ts">
    import { onMount } from "svelte";
    import Arkiv from "$lib/components/Arkiv.svelte";
    /* Fetch af data */
    let newsData = [];
    let allNews = []
    let isLoading = true;
    let error = null;

    let completePath = "http://localhost:5333/images/news/";

    onMount(async () => {
        try {
            const response = await fetch("http://127.0.0.1:5333/news");
            if (!response.ok) {
                throw new Error("Kunne ikke finde data.");
            }
            newsData = await response.json();
            console.log(newsData);
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
            <h2 class="text-4xl font-semibold">Nyheder</h2>

            <div class="">
                <div>
                    <a href="/" class="font-semibold text-xs">Forside</a>
                    <span class="font-bold text-lg select-none">></span>
                    <a href="/nyheder/" class=" font-semibold text-md text-pumpkin">Nyheder</a
                        >
                </div>
            </div>
        </div>
    </div>

    <div class="flex items-center justify-center gap-4">
        <div class="flex flex-col lg:flex-row items-center">
            <div class="grid grid-cols-1 md:grid-cols-2 items-center mx-auto mb-10 lg:items-start justify-center gap-4 mt-20 cursor-pointer px-4">
                {#each newsData
                    .sort((a, b) => new Date(b.received) - new Date(a.received))
                    .slice(0, 4) as item}
                    <a href="/nyheder/{item._id}">
                        <div class="w-[400px] h-[375px] border rounded-lg shadow-lg hover:shadow-xl">
                            <img
                                src={completePath + item.image}
                                alt=""
                                class="rounded-t-lg h-[225px] w-full object-cover"
                            />
                            <div class="p-4">
                                <h2 class="text-2xl mb-1">{item.title}</h2>
                                <p class="text-dimGray">
                                    {@html item.content.slice(0, 100)}...
                                </p>
                            </div>
                        </div>
                    </a>
                {/each}
            </div>
    
            <Arkiv/>

        </div>
    </div>
</section>

