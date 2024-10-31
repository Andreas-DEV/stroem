<script lang="ts">
    import { onMount } from "svelte";
    let aboutData = [];
    let titleSpliceOne = []
    let isLoading = true;
    let error = null;
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
        } finally {
            isLoading = false;
        }
    });
</script>

<section class="text-center pt-20 pb-40">
    <div class="w-full mx-auto max-w-screen-lg  px-2">
        {#if aboutData}
        <h2 class="text-xl my-1 md:text-5xl">{aboutData.title}</h2>
        <p class="mb-14 text-md md:text-xl text-dimGray">{aboutData.teaser}</p>
        {/if}
        <a href="/about" class="bg-pumpkin  rounded-md px-10 py-4 text-white text-sm md:text-xl uppercase font-semibold hover:border hover:border-pumpkin hover:text-pumpkin hover:bg-transparent">Læs mere</a>
    </div>
</section>