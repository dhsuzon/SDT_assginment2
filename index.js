document.addEventListener("DOMContentLoaded", function () {
    let categories_all_Data = [];
    let categories_all_Data_id = [];
    let initial_category_Id = "1000";

    const categoryButtonsStores = document.getElementById("categoryButtons_stores");
    const  videoStores = document.getElementById("video_stores");
    const noDataFoundStores = document.getElementById("no_data_found_stores");
    const SortButton = document.getElementById("sortButton");

    // dected categoriesData
    async function DetectedCategories() {
      try {
        const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
        const data = await response.json();
        categories_all_Data = data.data;
        generateCategoryButtons_all();
      } catch (error) {
        console.error(error);
      }
    }

    // dected and generate videos for a specific category
    async function dected_And_generate_CategoryById_all(id) {
      try {
        const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
        const data = await response.json();
        categories_all_Data_id = data.data;
        generate_all_Videos();
      } catch (error) {
        console.error(error);
      }
    }

    // generate category buttons
    function generateCategoryButtons_all() {
      categoryButtonsStores.innerHTML = categories_all_Data.map(data => `
        <button class="categoryButton ${data.category_id === initial_category_Id ? 'active' : ''}" onclick="handleCategoryClick('${data.category_id}')">
          ${data.category}
        </button>
      `).join("");
    }

    // Convert posted_date to time formmat
    function convert_Time_formmat(postedDate) {
      if (!postedDate) return '';

      const currentDate = new Date();
      const postedDateObj = new Date(postedDate * 1000); // Convert seconds to milliseconds

      const timeDifference = Math.abs(currentDate - postedDateObj);
      const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutesDifference = Math.floor((timeDifference / 1000) / 60);

      if (hoursDifference > 0) {
        if (minutesDifference > 0) {
          return `${hoursDifference}hrs ${minutesDifference}min ago`;
        } else {
          return `${hoursDifference}hrs ago`;
        }
      } else if (minutesDifference > 0) {
        return `${minutesDifference}min ago`;
      } else {
        return 'Just now';
      }
    }

   
    function sort_all_catores_items() {
      categories_all_Data_id.sort((a, b) => parseFloat(b.others?.views)  -parseFloat(a.others?.views));
    }

    
    function  generate_all_Videos() {
      videoStores.innerHTML = categories_all_Data_id.map(data => `
        <div class="video_stores_all_items">
          <div class="video_all_Thumbnail_stores">
            <img class="video_image_desgin" src="${data.thumbnail}" alt="">
          </div>
          <div class="author_Information">
            <img class="author_pic" src="${data.authors?.[0]?.profile_picture}" alt="">
            <div class="video_information">
              <h1>${data.title}</h1>
              <p class="author_address_name">
                ${data.authors?.[0]?.profile_name}
                ${data.authors?.[0]?.verified ? '<img class="verified_Icon" src="/verefied_icon.png" alt=""/>' : ''}
              </p>
              <p>${data.others?.views} Views </p>
              <p>${data.others ? convert_Time_formmat(data.others.posted_date) : ''}</p>
            </div>
          </div>
        </div>
      `).join("");

      
      noDataFoundStores.style.display = categoriesByIdData.length === 0 ? 'flex' : 'none';
    }


    window.handleCategoryClick = function (clickedCategoryId) {
      initial_category_Id= clickedCategoryId;
      dected_And_generate_CategoryById_all(initial_category_Id);
      generateCategoryButtons_all();
    };

   
    SortButton.addEventListener("click", function () {
      sort_all_catores_items();
      generate_all_Videos();
    });

   
    DetectedCategories();
    dected_And_generate_CategoryById_all(initial_category_Id);
    
    const blog = document.getElementById("special_button")
    blog.innertext =`
    <a href="www.facebook.com" target="_blank"></a>
    
    `
    c

  });
  
   