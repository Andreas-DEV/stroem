<script lang="ts">
    import { onMount } from "svelte";

    import fbIcon from "$lib/media/some/facebook.png"
    import twitterIcon from "$lib/media/some/twitter.png"
    import inIcon from "$lib/media/some/linkedin.png"
    import ptIcon from "$lib/media/some/pinterest.png"

    let teamData = [];
    let isLoading = true;
    let error = null;

    let completePath = "http://localhost:5333/images/team/"
    onMount(async () => {
        try {
            const response = await fetch("http://127.0.0.1:5333/team");
            if (!response.ok) {
                throw new Error("Kunne ikke finde data.");
            }
            teamData = await response.json();
            console.log(teamData);
        } catch (err) {
            error = err.message;
            console.error("Error:", err);
        } finally {
            isLoading = false;
        }
    });
</script>

<section class="pt-28">
    <h2 class="text-4xl font-semibold text-center mb-4">Vores <span class="text-pumpkin">Team</span></h2>
    <p class="text-center text-dimGray px-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ratione quis dolores.</p>
    <div class="flex mb-20 items-center" id="center">
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

    <div class="flex flex-col md:flex-row items-center py-28 justify-center gap-4">

        {#each teamData as item}
        <div class="rounded-lg relative [&>span]:hover:block text-white">
            <img src={completePath + item.image} alt="">
            <span class="hidden text-center absolute bottom-0 bg-pumpkin w-full py-16 rounded-b-lg" id="center">
                <h2 class="text-2xl">{item.name}</h2>
                <p class="mb-4">{item.title}</p>
                <div class="flex gap-6 justify-center">
                    <a href="https://www.facebook.com/" target="_blank">
                        <img class="w-[16px] invert" src={fbIcon} alt="">

                    </a>
                    <a href="https://www.x.com" target="_blank">
                        
                        <img class="w-[16px] invert" src={twitterIcon} alt="">
                    </a>
                    <a href="https://www.linkedin.com" target="_blank">
                        <img class="w-[16px] invert" src={inIcon} alt="">
                        
                    </a>
                    <a href="https://www.pinterest.com" target="_blank">
                        <img class="w-[16px] invert" src={ptIcon} alt="">
                        
                    </a>
                </div>
            </span>
        </div>
        {/each}
    </div>
</section>

<style lang="postcss">
   #center {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
   }
</style>