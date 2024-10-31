<script lang="ts">

import { onMount } from "svelte";
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
            console.log(newsData[0].received);
            
            console.log(newsData);
        } catch (err) {
            error = err.message;
            console.error("Error:", err);
        } finally {
            isLoading = false;
        }
    });
</script>

<section class="px-10 lg:px-0">
    <h2 class="font-semibold text-2xl mb-3">Arkiv</h2>
    {#each newsData
        .sort((a, b) => new Date(b.received) + new Date(a.received))
        .slice(0, 4) as item}
        <a href="/nyheder/{item._id}" class="[&>div>img]:hover:shadow-lg [&>div>div>h2]:hover:underline" target="_blank">
            <div class="flex items-center">
                <img
                    src={completePath + item.image}
                    alt=""
                    class="rounded-lg w-[100px] h-[100px] object-cover"
                />
                <div class="p-4">
                    <h2 class="text-2xl mb-1">{item.title}</h2>
                    <p class="text-dimGray w-[40ch]">
                        {@html item.content.slice(0, 75)}...
                    </p>
                    <span class="text-xs"
                            >{new Date(item.received).toLocaleDateString()}</span
                        >
                </div>
            </div>
        </a>
    {/each}
</section>