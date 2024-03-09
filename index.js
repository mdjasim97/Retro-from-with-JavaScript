const loadAllPost = async(quary) => {
    console.log(quary)
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${quary}`);
    const data = await res.json();
    const posts = await data.posts
    console.log(posts)

    const postContainer = document.getElementById("post-container");
    postContainer.innerHTML = ""

    posts.forEach((posts) => {
        const div = document.createElement("div");
        div.innerHTML = `

        <div class="flex items-center bg-slate-200 my-2 lg:my-4 border-2 border-gray-500 rounded-3xl lg:w-full lg:p-5">
            <div class="indicator p-2">
                <span id="status" class="indicator-item badge badge-secondary"></span>
                <div class="grid w-14 h-14 lg:w-32 lg:h-32 bg-base-300 place-items-center">
                    <figure><img class="lg:rounded-3xl" src="${posts.image}" alt="Shoes" /> </figure>
                </div>
            </div>

            <div class="lg:space-y-3">
                <div class="flex">
                    <h6 class="mx-4 lg:mx-10"># ${posts.category}</h6>
                    <h6>Author : ${posts.author.name}</h6>
                </div>


                <h1 class="ml-4 lg:ml-10 text-xl lg:text-2xl">${posts.title}</h1>
                <p class="ml-4 w-full lg:ml-10 p-2 text-base lg:text-lg">${posts.description}</p>
                <div class="ml-4 lg:ml-10 flex w-2/3">
                    <div class="flex place-items-center lg:items-center lg:my-3">
                        <i class="fa-regular fa-comment mr-4"></i>
                        <h5 class="mr-4 lg:mr-10">${posts.comment_count}</h5>
                    </div>

                    <div class="flex place-items-center lg:items-center my-3">
                        <i class="fa-regular fa-eye mr-4"></i>
                        <h5 class="mr-4 lg:mr-10">${posts.view_count}</h5>
                    </div>


                    <div class="flex place-items-center lg:items-center my-3">
                        <i class="fa-solid fa-clock-rotate-left mr-4"></i>
                        <h5 class="mr-4 lg:mr-10">${posts.posted_time}</h5>
                    </div>


                    <button onclick="readFunction()" id="read-Unread" class="lg:my-3 cursor-pointer justify-end ml-4 lg:ml-20 p-2 rounded-full bg-green-600">
                        <i class="fa-solid text-white fa-envelope-circle-check"></i>
                    </button>
                </div>
            </div>
        </div>
        `
        postContainer.append(div);
    })

}

const handleSearch = () => {
    const searchValue = document.getElementById("search-Box").value;
    console.log(searchValue);
    loadAllPost(`?category=${searchValue}`);

}


loadAllPost("")