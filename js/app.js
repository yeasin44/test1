const loadAllCategory = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/news/categories`
  );
  const data = await response.json();
  displayCategory(data.data.news_category);
};
const displayCategory = async (menus) => {
  // const data = await loadAllNews();
  // const category = document.getElementById("category");
  const category = document.getElementById("category");
  // const spinner = document.getElementById("spinner");
  // spinner.classList.remove("hidden");

  menus.forEach((menu) => {
    const ul = document.createElement("ul");
    ul.classList.add("menu", "menu-horizontal");
    ul.innerHTML = `
             
             <div id="res-menu">
             <li  onclick="loadAllNews('${
               menu.category_id
             }'), toggleSpinner(true)" class="md:mr-4  md:ml-7 hover:bg-gray-600 p-2  cursor-pointer text-white">${
      menu.category_name ? menu.category_name : "No Data found"
    }</li></div>


  `;
    category.appendChild(ul);
  });
};

// .............................Display news...............................
const loadAllNews = async (category_id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${category_id}`
  );
  const data = await response.json();
  displayNews(data.data);
  // console.log(data.data);
};
const displayNews = async (allNews) => {
  // const data = await loadAllNews();
  const newsContainer = document.getElementById("news-container");
  newsContainer.textContent = "";
  // spinner.classList.add("hidden");
  allNews.forEach((news) => {
    const newsDiv = document.createElement("div");

    newsDiv.innerHTML = `
    <div class="card card-side bg-neutral-100 shadow-xl m-4" id="display-detail">
          <figure>
            <div class="p-6" >
              <img
              id="res-img"

                class="rounded-xl md:w-56  h-auto"
                src="${
                  news.thumbnail_url ? news.thumbnail_url : "No Image found"
                }"
                alt="Movie"
              />
            </div>
          </figure>
          <div class="card-body" id="detail-card">
            <h2 class="card-title text-black">${news.title}</h2>
            <div>
            
            <div id="res-p">
            <p class="text-slate-600">${
              news.details.length > 20
                ? news.details.slice(0, 150) + "..."
                : news.details
            }</p></div>
            <div class="flex">
            <div class="flex-auto w-62" id="author-section">
                <div class="flex" id="img-container">
                <div id="res-img2">
                <img class="rounded-full w-12 mt-24 img-container" src="${
                  news.author.img
                }">
                </div>
                <div  class="mt-24 ml-2 text-black">
                    <p class="img-container" id="res-p2">${news.author.name}</p>
                    <p  class="img-container" id="res-p3" class="text-slate-400">${
                      news.author.published_date
                    }</p>
                </div>
                <div class="mt-28 ml-32" id="rating">
                <span id="eye-icon"><i class="fa-solid fa-eye text-black "></i></span>
                <span id="eye-icon2" class="ml-2 text-black text-lg font-bold">${
                  news.rating.number
                }</span>
                </div>
                </div>
            </div>
            <div class="mt-24" id="icon">
              <label id="icon2" for="my-modal-3" onclick="showModal('${
                news.details
              }')" class=" modal-button"><i class="fa-solid fa-arrow-right text-primary "></i></label>
            </div>
            
            </div>
           
            
          </div>
        </div>
             
              

  `;
    newsContainer.appendChild(newsDiv);
  });
  toggleSpinner(false);
};
// loadAllNews();
loadAllCategory();
// ............................Modal...........................
const showModal = (news) => {
  console.log(news);
};
const toggleSpinner = (isLoading) => {
  loadSpinner = document.getElementById("spinner");
  if (isLoading) {
    loadSpinner.classList.remove("hidden");
  } else {
    loadSpinner.classList.add("hidden");
  }
};
