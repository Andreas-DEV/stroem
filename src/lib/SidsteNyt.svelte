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
            console.log(newsData);
        } catch (err) {
            error = err.message;
            console.error("Error:", err);
        } finally {
            isLoading = false;
        }
    });
</script>

<section class="">
    <h2 class="text-4xl font-semibold text-center mb-4">
        Sidste <span class="text-pumpkin">nyt</span>
    </h2>
    <p class="text-center text-dimGray px-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ratione
        quis dolores.
    </p>
    <div class="flex mb-20 items-center" id="center">
        <span class="pb-[20px] text-platinum font-semibold text-xl select-none"
            >______
        </span>
        <div class="border-2 rounded-full w-3 h-3 border-pumpkin mx-1"></div>
        <span class="pb-[20px] text-platinum font-semibold text-xl select-none"
            >______
        </span>
    </div>
    <div class="flex flex-col items-center lg:items-start lg:flex-row justify-center gap-4 mt-20 cursor-pointer px-4">
        {#each newsData
            .sort((a, b) => new Date(b.received) - new Date(a.received))
            .slice(0, 3) as item}
            <a href="/nyheder/{item._id}">
                <div class="w-[350px] h-[400px] border rounded-lg shadow-lg hover:shadow-xl">
                    <img
                        src={completePath + item.image}
                        alt=""
                        class="rounded-t-lg h-[225px] w-full"
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
    <a
        class="bg-pumpkin mt-14 py-2 px-6 rounded-md md:px-12 md:py-4 text-white text-sm md:text-xl uppercase font-semibold hover:border hover:border-pumpkin hover:text-pumpkin hover:bg-transparent" id="center"
        href="/nyheder">flere nyheder ...</a
    >

</section>

<style lang="postcss">
    #center {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
    }
</style>
