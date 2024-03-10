const loadAllPost = async(quary) => {
    console.log(quary)
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${quary}`);
    const data = await res.json();
    console.log(data)
    const posts = await data.posts
    console.log(posts);


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
                <hr/>
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


                    <button onclick="readPosts('${posts.title}', '${posts.view_count}')" id="read-Unread" class="lg:my-3 cursor-pointer justify-end ml-4 lg:ml-20 p-2 rounded-full bg-green-600">
                        <i class="fa-solid text-white fa-envelope-circle-check"></i>
                    </button>
                </div>
            </div>
        </div>
        `
        postContainer.append(div);
    })
    LoadingSpener(false)
}

const handleSearch = () => {
    LoadingSpener(true);
    const searchValue = document.getElementById("search-Box").value;
    console.log(searchValue);
    loadAllPost(`?category=${searchValue}`);
    setTimeout(function() {
        loadAllPost(`?category=${searchValue}`);
    }, 2000)
}


const LoadingSpener = (isLoading) => {
    const loadinSpener = document.getElementById("loading-spiner");
    if (isLoading) {
        loadinSpener.classList.remove("hidden")
            // setTimeout(function() {
            //     loadinSpener.classList.remove("hidden")
            // }, 2000)
    } else {
        // loadinSpener.classList.add("hidden");
        setTimeout(function() {
            loadinSpener.classList.add("hidden")
        }, 2000)
    }
}


const readPostAll = document.getElementById("readPostall");

const readPosts = (postTitle, postView) => {
    document.getElementById("read-container");
    const readPost = document.createElement("div");
    readPost.classList.add("flex")
    readPost.innerHTML = `
            <div class="flex justify-between bg-white w-full p-2 lg:p-4 rounded-3xl m-2 lg:m-4">
                <h1 class="lg:text-2xl w-2/3 px-2">${postTitle}</h1>
                <div class="flex items-center">
                    <i class=" lg:text-2xl mr-2 fa-regular fa-eye"></i>
                    <p class="lg:text-2xl">${postView}</p>
                </div>
            </div>
    `
    readPostAll.append(readPost);

    document.addEventListener("click", clickCountMethod)
}

let count = 1

function clickCountMethod() {
    let click = count++
        console.log(click)
    document.getElementById("countItem").innerText = click;
}








const latestPosts = document.getElementById("latestPostContainer");

const latestPostsAll = async() => {
    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
    const data = await res.json();
    console.log(data);
    // console.log(data["latest-posts"])


    data.forEach((latestPost) => {
        console.log(latestPost);
        const latestContent = document.getElementById("latestPostContainer");
        const latestPostDiv = document.createElement("div");
        console.log(latestPostDiv)


        latestPostDiv.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
                    <figure><img src="${latestPost['cover_image']}" alt="Shoes" /></figure>
                    <div class="flex ml-4 mt-4 text-xl ">
                        <img class="mr-2" src="./images/Frame (5).png" alt="">
                        <p id="postDate">${latestPost.author["posted_date"]}</p>
                    </div>

                    <div class="card-body">
                        <h2 class="card-title text-xl lg:text-2xl">${latestPost.title}</h2>
                        <p class="text-lg lg:text-xl">${latestPost.description}</p>
                        <div class="card-actions">
                            <div class="h-14 w-14"><img class="rounded-full" src="${latestPost["profile_image"]}" alt=""></div>
                            <div class="">
                                <h1 class="text-xl lg:text-2xl font-bold">Cameron Williamson</h1>
                                <p>${latestPost.author.designation}</p>
                            </div>
                        </div>
                    </div>
                </div>
        `

        latestContent.append(latestPostDiv)
    })

}




loadAllPost("")
latestPostsAll()