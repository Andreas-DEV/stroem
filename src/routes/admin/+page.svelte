<script lang="ts">
    import { onMount } from "svelte";

    import Editor from "@tinymce/tinymce-svelte";
    let conf = {
        height: 500,
        menubar: false,
        plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "preview",
            "help",
            "wordcount",
        ],
        toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
    };

    let nyheder = true;
    let about = false;
    let booking = false;

    let nyhedsTitle = "";
    let nyhedsContent = "";
    let nyhedsImageFile;
    let nyhedsImage = "";

    let aktiveID = "";

    let nyhedsData = [];
    let aboutData = [];
    let bookingData = [];
    let isLoading = true;
    let error = null;

    let nyhedCompletepath = "http://localhost:5333/images/news/";
    let aboutCompletepath = "http://localhost:5333/images/about/";

    function handleImageChange(event) {
        nyhedsImageFile = event.target.files[0];
        aboutImageFile = event.target.files[0];
    }

    async function opretNyhed() {
        try {
            const formData = new FormData();
            formData.append("title", nyhedsTitle);
            formData.append("content", nyhedsContent);
            if (nyhedsImageFile) {
                formData.append("image", nyhedsImageFile);
            }

            const response = await fetch("http://127.0.0.1:5333/news/admin", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Fejl i oprettelse.");
            }

            const data = await response.json();

            nyhedsTitle = "";
            nyhedsContent = "";
            nyhedsImageFile = null;

            alert("Du har oprettet en nyhed!");
            window.location.reload();
        } catch (error) {
            console.error("Fejl:", error);
        }
    }

    async function retNyhed() {
        try {
            const formData = new FormData();
            formData.append("title", nyhedsTitle);
            formData.append("content", nyhedsContent);
            if (nyhedsImageFile) {
                formData.append("image", nyhedsImageFile);
            }

            const response = await fetch(
                `http://127.0.0.1:5333/news/admin/${aktiveID}`,
                {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                    },
                    body: formData,
                },
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Fejl i oprettelse.");
            }

            const data = await response.json();

            nyhedsTitle = "";
            nyhedsContent = "";
            nyhedsImageFile = null;

            alert("Nyhed blev rettet!");
            window.location.reload();
        } catch (error) {
            console.error("Fejl:", error);
        }
    }

    async function sletNyhed() {
        if (confirm("Vil du slette denne nyhed?") == true) {
            try {
                const response = await fetch(
                    `http://127.0.0.1:5333/news/admin/${aktiveID}`,
                    {
                        method: "DELETE",
                    },
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Fejl i oprettelse.");
                }

                const data = await response.json();
                alert("Nyhed blev slettet.");
                window.location.reload();
            } catch (error) {
                console.error("Fejl:", error);
            }
        }
    }

    let aboutTitle = "";
    let aboutTeaser = "";
    let aboutContent;
    let aboutImageFile;
    let aboutImage = "";

    async function retAbout() {
        if (confirm("Vil du rette about?") == true) {
            try {
                const formData = new FormData();
                formData.append("title", aboutTitle);
                formData.append("teaser", aboutTeaser);
                formData.append("content", aboutContent);
                if (aboutImageFile) {
                    formData.append("image", aboutImageFile);
                }

                const response = await fetch(
                    `http://127.0.0.1:5333/about/admin/${aktiveID}`,
                    {
                        method: "PUT",
                        headers: {
                            Accept: "application/json",
                        },
                        body: formData,
                    },
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Fejl i oprettelse.");
                }

                const data = await response.json();

                aboutTitle = "";
                aboutTeaser = "";
                aboutContent = "";
                aboutImageFile = null;

                alert("About blev rettet!");
                window.location.reload();
            } catch (error) {
                console.error("Fejl:", error);
            }
        }
    }

    async function sletBooking() {
        if (confirm("Vil du slette denne booking?") == true) {
            try {
                const response = await fetch(
                    `http://127.0.0.1:5333/booking/admin/${aktiveID}`,
                    {
                        method: "DELETE",
                    },
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Fejl i oprettelse.");
                }

                const data = await response.json();
                window.location.reload();
            } catch (error) {
                console.error("Fejl:", error);
            }
        }
    }

    async function godkendBooking() {
        try {
            const response = await fetch(
                `http://127.0.0.1:5333/booking/accept/admin/${aktiveID}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        accept: "true",
                    }),
                },
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Fejl i oprettelse.");
            }

            const data = await response.json();
            window.location.reload();
        } catch (error) {
            console.error("Fejl:", error);
        }
    }

    async function aflysBooking() {
        try {
            const response = await fetch(
                `http://127.0.0.1:5333/booking/accept/admin/${aktiveID}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        accept: "false",
                    }),
                },
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Fejl i oprettelse.");
            }

            const data = await response.json();
            window.location.reload();
        } catch (error) {
            console.error("Fejl:", error);
        }
    }

    onMount(async () => {
        try {
            const nyhedResponse = await fetch("http://localhost:5333/news");
            const aboutResponse = await fetch("http://localhost:5333/about");
            const bookingResponse = await fetch(
                "http://127.0.0.1:5333/booking/admin",
            );
            if (!nyhedResponse.ok && !aboutResponse.ok && !bookingResponse.ok) {
                throw new Error("Kunne ikke finde data.");
            }
            nyhedsData = await nyhedResponse.json();
            aboutData = await aboutResponse.json();
            bookingData = await bookingResponse.json();

            aboutTitle = aboutData.title;
            aboutTeaser = aboutData.teaser;
            aboutContent = aboutData.content;
            aboutImage = aboutData.image;
            console.log(nyhedsData);
            console.log(aboutData);
            console.log(bookingData);
        } catch (err) {
            error = err.message;
            console.error("Error:", err);
        } finally {
            isLoading = false;
        }
    });
</script>

<section>
    <div class="max-w-screen-lg mx-auto py-28">
        <div class="flex gap-2 justify-center">
            <button
                on:click={() => {
                    nyheder = true;
                    about = false;
                    booking = false;
                }}
                class="border rounded-lg p-2 text-md text-center px-4 w-full lg:w-[250px] lg:text-start hover:bg-pumpkin hover:text-white"
                >Nyheder</button
            >

            <button
                on:click={() => {
                    nyheder = false;
                    about = true;
                    booking = false;
                }}
                class="border rounded-lg p-2 text-md text-center px-4 w-full lg:w-[250px] lg:text-start hover:bg-pumpkin hover:text-white"
                >About</button
            >

            <button
                on:click={() => {
                    nyheder = false;
                    about = false;
                    booking = true;
                }}
                class="border rounded-lg p-2 text-md text-center px-4 w-full lg:w-[250px] lg:text-start hover:bg-pumpkin hover:text-white"
                >Booking</button
            >
        </div>
        <div class="">
            {#if nyheder}
                <div class="flex flex-col px-10 my-10 gap-4">
                    <form
                        on:submit|preventDefault={opretNyhed}
                        class="flex flex-col gap-4"
                    >
                        <label class="text-xl" for="name">Titel</label>
                        <input
                            class="rounded-lg"
                            bind:value={nyhedsTitle}
                            type="text"
                            name="name"
                            id=""
                        />
                        <label class="text-xl" for="content">Indhold</label>
                        <Editor
                            licenseKey="your-license-key"
                            scriptSrc="tinymce/tinymce.min.js"
                            bind:value={nyhedsContent}
                            {conf}
                        />
                        <label class="text-xl" for="file">Billede</label>
                        <input
                            class="rounded-lg border-2"
                            type="file"
                            accept="image/*"
                            on:change={handleImageChange}
                            bind:value={nyhedsImage}
                        />
                        <img
                            class="w-[400px] max-w-screen-lg mx-auto rounded-lg my-4"
                            src={nyhedCompletepath + nyhedsImage}
                            alt=""
                        />
                        <button
                            class="bg-pumpkin text-white p-4 rounded-lg font-semibold text-xl"
                            >Opret</button
                        >
                    </form>
                    <button
                        class="bg-pumpkin text-white p-4 rounded-lg font-semibold text-xl"
                        on:click={retNyhed}>Ret</button
                    >
                </div>

                <h2 class="text-3xl font-semibold my-10 px-1 text-onyx">
                    Alle nyheder
                </h2>
                {#each nyhedsData as item}
                    <div
                        class="flex justify-between my-4 border rounded-lg p-2"
                    >
                        <span class="text-lg">{item.title}</span>

                        <div class="flex items-center gap-4">
                            <button
                                class="text-lg uppercase hover:underline"
                                on:click={() => {
                                    aktiveID = item._id;
                                    nyhedsTitle = item.title;
                                    nyhedsContent = item.content;
                                    nyhedsImage = item.image;
                                }}>Ret</button
                            >
                            <button
                                class="text-lg uppercase hover:underline"
                                on:click={() => {
                                    aktiveID = item._id;
                                    sletNyhed();
                                }}>Slet</button
                            >
                        </div>
                    </div>
                {/each}
            {:else if about}
                {#if aboutData}
                    <div>
                        <form
                            on:submit|preventDefault={retAbout}
                            class="flex flex-col gap-4"
                        >
                            <label class="text-xl" for="name">Titel</label>
                            <input
                                class="rounded-lg"
                                bind:value={aboutTitle}
                                type="text"
                                name="name"
                                id=""
                            />
                            <label class="text-xl" for="content">Teaser</label>
                            <Editor
                            licenseKey="your-license-key"
                            scriptSrc="tinymce/tinymce.min.js"
                            bind:value={aboutTeaser}
                            {conf}
                        />
                            <label class="text-xl" for="content">Content</label>
                            <Editor
                            licenseKey="your-license-key"
                            scriptSrc="tinymce/tinymce.min.js"
                            bind:value={aboutContent}
                            {conf}
                        />
                            <label class="text-xl" for="file">Billede</label>
                            <input
                                class="rounded-lg border-2"
                                type="file"
                                accept="image/*"
                                on:change={handleImageChange}
                            />
                            <img
                                class="w-[400px] max-w-screen-lg mx-auto rounded-lg my-4"
                                src={aboutCompletepath + aboutImage}
                                alt=""
                            />
                            <button
                                class="bg-pumpkin text-white p-4 rounded-lg font-semibold text-xl"
                                >Ret</button
                            >
                        </form>
                    </div>
                {/if}
            {:else if booking}
                <div>
                    {#each bookingData as item}
                        <div
                            class="flex justify-between my-4 border rounded-lg p-2"
                        >
                            <div>
                                <span class="text-lg">{item.name}</span>
                                <span class="text-md"
                                    >| Email: {item.email}</span
                                >
                                <span class="text-md"
                                    >| Tlf nr: {item.phone}</span
                                >
                                <span class="text-md"
                                    >| Godkendt: {item.accept}</span
                                >
                            </div>

                            <div class="flex items-center gap-4">
                                <button
                                    class="text-lg uppercase hover:underline"
                                    on:click={() => {
                                        aktiveID = item._id;
                                        godkendBooking();
                                    }}>Godkend</button
                                >
                                <button
                                    class="text-lg uppercase hover:underline"
                                    on:click={() => {
                                        aktiveID = item._id;
                                        aflysBooking();
                                    }}>Aflys</button
                                >
                                <button
                                    class="text-lg uppercase hover:underline"
                                    on:click={() => {
                                        aktiveID = item._id;
                                        sletBooking();
                                    }}>Slet</button
                                >
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</section>
