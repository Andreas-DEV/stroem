<script lang="ts">
    import logo from "$lib/media/logo.png";
    import arrow from "$lib/media/icons/right-arrow.png";
    

    /* SoMe Icons */
    import fbIcon from "$lib/media/some/facebook.png"
    import twitterIcon from "$lib/media/some/twitter.png"
    import inIcon from "$lib/media/some/linkedin.png"
    import ptIcon from "$lib/media/some/pinterest.png"

    let email = "";

    async function tilmeldNyhedsbrev() {
        try {
            const response = await fetch("http://127.0.0.1:5333/newssubscription", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                }),
            });

            if (!response.ok) {
                throw new Error("Fejl i oprettelse.");
            }

            const data = await response.json();

            email = "";

            alert("Du er nu tilmeldt vores nyhedsbrevet!");
        } catch (error) {
            console.error("Fejl:", error);
        }
    }
</script>

<footer class="bg-onyx py-28 w-full mt-44 text-white relative">
    <div class="mx-auto justify-center items-center lg:items-start flex flex-col lg:flex-row gap-6 md:gap-14">
        <!-- Logo og tekst -->
        <div>
            <img src={logo} alt="" />
            <p>
                Som medlem af Elinstallatørenes<br />Landsorganisation, ELFO, er
                vi tilsluttet<br />et ankernævn og en garantiordning.
            </p>
        </div>

        <!-- Links -->
        <div>
            <h2 class="text-2xl font-semibold mb-4">Link</h2>
            <ul class="">
                <li class="mt-2">
                    <a
                        class="uppercase flex gap-2 items-center hover:underline"
                        href="/faq"
                        target="_blank"
                        ><img class="w-[12px] invert" src={arrow} alt="" /> faq
                    </a>
                </li>
                <li class="mt-2">
                    <a
                        class="flex gap-2 items-center hover:underline"
                        href="/about"
                        target="_blank"
                    >
                        <img class="w-[12px] invert" src={arrow} alt="" /> Om os
                    </a>
                </li>
                <li class="mt-2">
                    <a
                        class="flex gap-2 items-center hover:underline"
                        href="/kontakt"
                        target="_blank"
                        ><img class="w-[12px] invert" src={arrow} alt="" /> Kontakt
                        os
                    </a>
                </li>
                <li class="mt-2">
                    <a
                        class="flex gap-2 items-center hover:underline"
                        href="/service"
                        target="_blank"
                        ><img class="w-[12px] invert" src={arrow} alt="" /> Services</a
                    >
                </li>
            </ul>
        </div>

        <!-- Kontakt os -->
        <div>
            <h2 class="text-2xl font-semibold mb-4">Kontakt os</h2>
            <div class="flex gap-4">
                <span class="font-semibold mt-2"> Adresse: </span>
                <span class="text-platinum mt-2"> Strømparken 1, 8500 Grenaa </span>
            </div>
            <div class="flex gap-4">
                <span class="font-semibold mt-2"> Telefon: </span>
                <span class="text-platinum mt-2"> [45] 86 45 45 78 </span>
            </div>
            <div class="flex gap-4">
                <span class="font-semibold mt-2"> Email: </span>
                <span class="text-platinum mt-2"> info@stroem.dk </span>
            </div>
        </div>

        <div>
            <h2 class="text-2xl font-semibold mb-4">Kontakt os</h2>
            <span class="text-platinum"> Tilmed dig vores nyhedsbrev her </span>
            <form
                on:submit|preventDefault={tilmeldNyhedsbrev}
                class="my-4 flex flex-col"
            >
                <input
                    class="text-white w-[300px] bg-charcoal px-4 rounded-lg border-none placeholder:text-eerieblack"
                    type="text"
                    name="Nyhedsbrev"
                    id=""
                    placeholder="Din Email"
                    bind:value={email}
                />
                <button
                    class="bg-pumpkin py-2 px-6 rounded-md md:px-12 md:py-2 text-white text-sm md:text-lg uppercase font-semibold hover:border hover:border-pumpkin hover:text-pumpkin hover:bg-transparent mt-2"
                    >Tilmeld</button
                >
            </form>
        </div>
    </div>

    <div class="w-[50px] h-[50px] absolute rounded-lg text-center right-5 bottom-5 bg-pumpkin flex justify-center items-center hover:bg-onyx hover:border">
        <a href="/">
            <p class="uppercase font-semibold">Top</p>
        </a>
    </div>
</footer>

<section class="border-t border-t-dimGray p-6 bg-onyx">
    <div class="max-w-screen-xl mx-auto flex justify-between flex-col lg:flex-row items-center">
        <div class="text-white">
            <span class="text-pumpkin">Strøm</span>
            <span>© 2024 All Right Reserved</span>
        </div>

        <div class="flex gap-6 justify-center mt-4 md:mt-4 lg:mt-0">
            <a href="https://www.facebook.com/" target="_blank">
                <img class="border rounded-full p-2 border-dimGray invert hover:bg-dimGray" src={fbIcon} alt="">

            </a>
            <a href="https://www.x.com" target="_blank">
                
                <img class="border rounded-full p-2 border-dimGray invert hover:bg-dimGray" src={twitterIcon} alt="">
            </a>
            <a href="https://www.linkedin.com" target="_blank">
                <img class="border rounded-full p-2 border-dimGray invert hover:bg-dimGray" src={inIcon} alt="">
                
            </a>
            <a href="https://www.pinterest.com" target="_blank">
                <img class="border rounded-full p-2 border-dimGray invert hover:bg-dimGray" src={ptIcon} alt="">
                
            </a>
        </div>
    </div>

</section>
