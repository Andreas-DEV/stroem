<script lang="ts">
    import { AccordionItem, Accordion } from 'flowbite-svelte';
    import { onMount } from "svelte";


    /* Fetch af data */
    let faqData = [];
    let allNews = []
    let isLoading = true;
    let error = null;

    onMount(async () => {
        try {
            const response = await fetch("http://localhost:5333/faq");
            if (!response.ok) {
                throw new Error("Kunne ikke finde data.");
            }
            faqData = await response.json();
            console.log(faqData);
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
            <h2 class="text-4xl font-semibold">FAQ</h2>

            <div class="">
                <div>
                    <a href="/" class="font-semibold text-xs">Forside</a>
                    <span class="font-bold text-lg select-none">></span>
                    <a href="/faq/" class=" font-semibold text-md text-pumpkin">FAQ</a
                        >
                </div>
            </div>
        </div>
    </div>

    <Accordion class="max-w-screen-lg mx-auto py-14">
        {#each faqData as item}
        <AccordionItem class="bg-pumpkin mb-2 rounded-lg">
          <span class=" text-white font-bold" slot="header">{item.question}</span>
          <p class="text-gray-500 dark:text-gray-400">
            {item.answer}
          </p>
        </AccordionItem>
        {/each}
      </Accordion>

</section>