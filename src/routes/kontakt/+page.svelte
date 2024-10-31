<script lang="ts">
    import {
        PhoneCallIcon,
        LocationAltIcon,
        MailboxIcon,
    } from "svelte-uicons/rounded/regular";

    let name = "";
    let email = "";
    let phone = "";
    let message = "";

    async function opretKontakt() {
        try {
            const response = await fetch("http://127.0.0.1:5333/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    message,
                }),
            });

            if (!response.ok) {
                throw new Error("Fejl i oprettelse.");
            }

            const data = await response.json();

            name = "";
            email = "";
            phone = "";
            message = "";

            alert("Besked er hermed blevet sendt.");
        } catch (error) {
            console.error("Fejl:", error);
        }
    }
</script>

<section>
    <div class=" bg-platinum2">
        <div
            class="flex max-w-screen-lg justify-between flex-col md:flex-row mx-auto pt-24 pb-14 px-10 lg:px-0"
        >
            <h2 class="text-4xl font-semibold">Kontakt os</h2>

            <div class="">
                <div>
                    <a href="/" class="font-semibold text-xs">Forside</a>
                    <span class="font-bold text-lg select-none">></span>
                    <a
                        href="/kontakt/"
                        class=" font-semibold text-md text-pumpkin"
                        >Kontakt os</a
                    >
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-screen-lg mx-auto">
        <div class="flex p-8 border rounded-md my-10 flex-col md:flex-row mx-10">
            <div class="flex gap-4 items-center border-0 md:border-r pr-4 w-full  mb-2 md:mb-0">
                <LocationAltIcon size="24" class="text-pumpkin ml-4" />
                <div>
                    <h2 class="text-xl text-eerieblack font-semibold">
                        Adresse
                    </h2>
                    <p class="text-dimGray text-xs md:text-md">
                        Strømparken 1, 8500 Grenaa.
                    </p>
                </div>
            </div>
            <div class="flex gap-4 items-center border-0 md:border-r pr-4 w-full mb-2 md:mb-0">
                <PhoneCallIcon size="24" class="text-pumpkin ml-4" />
                <div>
                    <h2 class="text-xl text-eerieblack font-semibold">
                        Telefon
                    </h2>
                    <p class="text-dimGray text-xs md:text-md">[45] 86 45 45 78</p>
                </div>
            </div>
            <div class="flex gap-4 items-center pr-4 w-full">
                <MailboxIcon size="24" class="text-pumpkin ml-4" />
                <div>
                    <h2 class="text-xl text-eerieblack font-semibold">Email</h2>
                    <p class="text-dimGray text-xs md:text-md">info@stroem.dk</p>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-screen-lg mx-auto flex lg:flex-row flex-col items-center gap-8 mt-10 px-10">
        <div>
            <div>
                <h2 class="text-2xl mb-2">Kontakt os</h2>
                <p class="text-dimGray">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quia pariatur nihil ipsam. Obcaecati deserunt velit debitis
                    quidem facilis necessitatibus.
                </p>
            </div>
            <form on:submit|preventDefault={opretKontakt}>
                <div class="flex gap-4 mt-10 flex-col lg:flex-row">
                    <div class="flex flex-col gap-4">
                        <input
                            class="rounded-lg border-platinum py-3 px-4"
                            type="text"
                            name="name"
                            id=""
                            placeholder="Dit navn"
                            bind:value={name}
                        />
                        <input
                            class="rounded-lg border-platinum py-3 px-4"
                            type="text"
                            name="email"
                            id=""
                            placeholder="Din Email"
                            bind:value={email}
                        />
                        <input
                            class="rounded-lg border-platinum py-3 px-4"
                            type="text"
                            name="tlfnr"
                            id=""
                            placeholder="Dit Telefon nr."
                            bind:value={phone}
                        />
                    </div>
                    <textarea
                        class="rounded-lg w-full border-platinum py-3 px-4"
                        name="besked"
                        rows="4"
                        id=""
                        placeholder="Din Besked"
                        bind:value={message}
                    ></textarea>
                </div>
                <button
                    class="bg-pumpkin py-2 px-6 rounded-md md:px-12 md:py-4 text-white text-sm uppercase font-semibold border hover:border-pumpkin hover:text-pumpkin hover:bg-transparent mt-2 w-full"
                    >Send besked</button
                >
            </form>
        </div>
        <!-- svelte-ignore a11y_missing_attribute -->
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2207.4213326449085!2d10.884063877914587!3d56.40879957333408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464c301159d84a83%3A0x1850aa1f431d5ae5!2sViden%20Djurs!5e0!3m2!1sen!2sdk!4v1730326653555!5m2!1sen!2sdk"
            class="w-[300px] h-[400px] rounded-lg"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
    </div>
</section>
