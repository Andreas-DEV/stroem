<script lang="ts">
    export let data;
    const { article } = data;
    import Arkiv from "$lib/components/Arkiv.svelte";
    import { CommentIcon } from "svelte-uicons/rounded/regular";

    let commentsTotal = "";

    import {
        CalendarIcon,
        CalendarWeekIcon,
    } from "svelte-uicons/rounded/regular";

    let completePath = "http://localhost:5333/images/news/";
    let name = "";
    let comment = "";

    async function writeComment() {
        try {
            const response = await fetch(
                `http://127.0.0.1:5333/news/comment/${article._id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        comment,
                    }),
                },
            );

            if (!response.ok) {
                throw new Error("Fejl i oprettelse.");
            }

            const data = await response.json();
            window.location.reload();

            name = "";
            comment = "";
        } catch (error) {
            console.error("Fejl:", error);
        }
    }
</script>

{#if article}
    <div class=" bg-platinum2">
        <div
            class="flex max-w-screen-lg justify-between flex-col md:flex-row mx-auto pt-24 pb-14 px-10 lg:px-0"
        >
            <h2 class="text-4xl font-semibold">{article.title}</h2>

            <div class="">
                <div>
                    <a href="/" class="font-semibold text-xs">Forside</a>
                    <span class="font-bold text-lg select-none">></span>
                    <a href="/nyheder/" class=" font-semibold text-md"
                        >Nyheder</a
                    >
                    <span class="font-bold text-lg select-none">></span>
                    <a
                        href="/nyheder/{article._id}"
                        class="text-pumpkin font-semibold text-lg"
                        >{article.title}</a
                    >
                </div>
            </div>
        </div>
    </div>

    <article class="mt-40">
        <div
            class="flex max-w-screen-lg mx-auto flex-col lg:flex-row md:items-center gap-8 justify-center"
        >
            <div>
                <div
                    class="border-b-2 rounded-xl w-[300px] md:w-[600px] mx-auto shadow-xl"
                >
                    <img
                        class="w-full rounded-t-xl mb-10"
                        src={completePath + article.image}
                        alt=""
                    />
                    <div class="flex text-md items-center gap-2 px-10">
                        <CommentIcon size="12" class="" />
                        <span class="text-md">{article.comments.length} Kommentar</span>
                    </div>
                    <h1
                        class="text-xl md:text-4xl px-10 mb-10 border-b pb-10"
                    >
                        {article.title}
                        <span class="italic text-xs"
                            >{new Date(
                                article.received,
                            ).toLocaleDateString()}</span
                        >
                    </h1>
                    <div
                        class="px-6 md:px-20 py-2 text-xs md:text-lg leading-6 mb-10"
                    >
                        {@html article.content}
                    </div>
                </div>
            </div>

            <Arkiv />
        </div>

        <div class="max-w-screen-lg mx-auto py-28 px-10 lg:px-0">
            <h2 class="font-semibold text-3xl mb-10">
                Kommentarer <span class="text-2xl"
                    >(<span class="text-lg">{article.comments.length}</span
                    >)</span
                >
            </h2>
            {#each article.comments as item, i}
                <div class="px-10">
                    <div class="my-6">
                        <h4 class="font-semibold text-lg">{item.name}</h4>
                        <div class="flex gap-2 my-2">
                            <CalendarIcon size="16" />
                            <span class="text-xs"
                                >{new Date(
                                    item.received,
                                ).toLocaleDateString()}</span
                            >
                        </div>
                    </div>
                    <p>{item.comment}</p>
                </div>
            {/each}
        </div>

        <div class="py-14 border-t max-w-screen-lg mx-auto px-10 lg:px-0">
            <h2 class="font-semibold text-3xl mb-8">Skriv en kommentar</h2>
            <form on:submit|preventDefault={writeComment} class="flex flex-col">
                <div class="flex justify-center gap-4 mb-4">
                    <input
                        bind:value={name}
                        class="px-4 w-full rounded-sm"
                        placeholder="Navn"
                        type="text"
                        name="name"
                        id=""
                    />
                    <input
                        class="px-4 w-full rounded-sm"
                        placeholder="Email"
                        type="text"
                        name="email"
                        id=""
                    />
                </div>

                <div class="flex flex-col">
                    <textarea
                        bind:value={comment}
                        name="comment"
                        placeholder="Kommentar"
                        id=""
                        rows="6"
                        class="w-full rounded-sm mb-4"
                    ></textarea>
                    <button
                        class="bg-pumpkin py-2 px-6 rounded-md md:px-12 md:py-4 text-white text-sm md:text-xl uppercase font-semibold border hover:border-pumpkin hover:text-pumpkin hover:bg-transparent"
                        >Send besked</button
                    >
                </div>
            </form>
        </div>
    </article>
{:else}
    <div>
        <h1>Ingen artikel blev fundet.</h1>
    </div>
{/if}
