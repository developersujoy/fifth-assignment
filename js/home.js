    console.log("connected sucessfully")

    const catagoriesContainer = document.getElementById("CatagoriesSection");
    const loadingSpinner = document.getElementById("loadingSpinner");
    let allIssues = [];
    const allBtn = document.getElementById("allBtn");
    const closedBtn = document.getElementById("closedBtn");
    const openBtn = document.getElementById("openBtn");
    const issueCount = document.getElementById("issueCount");
    const itemlist = document.getElementById("itemlists");
    

    async function LoadCatagories(){
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");
        // dom load korar jonno time dea holo nicher line ea jate loading spinner dekha jaay
        await new Promise(resolve => setTimeout(resolve, 300));
        //fentch data
        const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
        const data = await response.json();
        loadingSpinner.classList.add("hidden");
    
        allIssues=data.data;
        
        displaydata(allIssues);
        issueCount.innerText = ` ${allIssues.length} Issues `;
        console.log(data);
        setActive(allBtn);

    }

    //fetch load api for modal
async function loadWord(id) {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    const response = await fetch(url);
    const details = await response.json();
    displayingwords(details.data)
    
}

// display load words for modal
const displayingwords = (words) => {
    
    const a = words.status;
    const date = new Date(words.createdAt);
    const finalDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    // author 
    const formattedAuthor = words.author
        .split("_")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    // assignee
    const formattedAssignee = words.assignee
        .split("_")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    console.log(formattedAssignee);
    console.log(words);

    

   
        const modalCard = document.getElementById("modalCard");
        const cards = document.createElement("div");
        modalCard.innerHTML = " ";
        

        cards.innerHTML= `
         <dialog id="my_modal_1" class="modal">
            <div class="modal-box w-[700px] max-w-none rounded-[12px] ">
                <!-- div one  -->
                <div>
                    <h3 class="text-[24px] font-bold mb-2"> ${words.title} </h3>
                        <div class="flex items-center">
                            <div class="p-2 w-20 items-center justify-center h-6 rounded-full flex ${a == "open" ? "bg-[#00A96E]" : "bg-[#A855F7]"} text-white text-[12px] font-medium">
                                <p clas=" ">${a}</p>
                            </div>
                            <p class="text-[12px] text-[#64748B]">
                                <span class="mx-2">•</span>
                               <p> Opened by ${formattedAuthor} <p>
                                <span class="mx-2">•</span>
                                <p> ${finalDate} <p>
                            </p>
                        </div>
                        <div class="mt-6 flex gap-2">
                            <div class="p-2 max-w-fit items-center justify-center h-6 rounded-full flex gap-1 ${ words.labels[0] == "bug" ? "bg-[#FEECEC] text-[#EF4444]" : words.labels[0] == "documentation" ? "bg-[#FFF6D1] text-[#F59E0B]" : words.labels[0] == "enhancement" ? "bg-[#BBF7D0] text-[#00A96E]" : "bg-[#BDF0DD] text-[#2890B0]"}">

                                <img src=" ${words.labels[0] === "bug"
            ? "./assets/vector.png" : words.labels[0] == "documentation" ? "./assets/Lifebuoy.png" : words.labels[0] == "enhancement" ? "./assets/Sparkle.png " : " "} " alt="">

                                <p class="text-[12px] font-medium uppercase"> ${words.labels[0]} </p>
                            </div>
                            <div class="p-2 max-w-fit items-center justify-center h-6 rounded-full flex gap-1 ${words.labels[1] == null ? " hidden" : "flex "}
                            ${words.labels[1] == "bug" ? "bg-[#FEECEC] text-[#EF4444]" : words.labels[1] == "documentation" ? "bg-[#FFF6D1] text-[#F59E0B]" : words.labels[1] == "enhancement" ? "bg-[#BBF7D0] text-[#00A96E]" : "bg-[#BDF0DD] text-[#2890B0]"}">

                            <img src=" ${words.labels[1] === "bug"
                ? "./assets/vector.png" : words.labels[1] == "documentation" ? "./assets/Lifebuoy.png" : words.labels[1] == "enhancement" ? "./assets/Sparkle.png " : " "} " alt="">
                                <p class="text-[12px] font-medium uppercase"> ${words.labels[1]}  </p>
                            </div>
                        </div>
                        <p class="mt-6 text-[16px] text-[#64748B] ">${words.description}</p>
                </div>
                <!-- div two  -->
                 <div class="mt-6 bg-[#F8FAFC] p-4 flex justify-between rounded-[8px] ">
                    <div class="flex-1">
                        <p class="text-[16px] text-[#64748B] ">Assignee:</p>
                        <p class="mt-1 text-[16px] font-semibold ">${formattedAssignee}</p>
                        
                    </div>
                    <div class="flex-1">
                        <p class="text-[16px] text-[#64748B] ">Priority</p>
                        <div class="p-2 max-w-fit items-center justify-center h-6 rounded-full flex ${words.priority == "high" ? "bg-[#FEECEC] text-[#EF4444]" : words.priority == "medium" ? "bg-[#FFF6D1] text-[#F59E0B]" : "bg-[#EEEFF2] text-[#9CA3AF]"} ">
                            <p class="text-[12px] font-medium uppercase"> ${words.priority} </p>
                        </div>
                    </div>
                 </div>
            <!-- div three  -->

                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn btn-primary border-[#3B25C1] outline-none  ring-0 rounded">Close</button>
                    </form>
                </div>
            </div>
        </dialog> ` ;
    
    modalCard.appendChild(cards);
    document.getElementById("my_modal_1").showModal();
}







   


    function displaydata(allissues) {
        console.log(allissues);
        itemlist.innerHTML = " "; // emty html
        
        allissues.forEach(issue => {
            // formated date
            const date = new Date(issue.createdAt);
            const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
            // create element 
        const card = document.createElement("div");
            card.innerHTML =`
            <div class="card bg-base-100 w-full h-full shadow-sm border-t-3 ${issue.status == "open" ? "border-[#00A96E]" : "border-[#A855F7]"} hover:cursor-pointer" onclick="loadWord(${issue.id})" >
                    <div class="p-4">
                        <div class="flex justify-between ">
                            <div>
                                <img src=" ${issue.priority === "high"
                ? "./assets/Open-Status.png" : issue.priority == "medium" ? "./assets/Open-Status.png" : "./assets/Closed- Status .png "} " alt="" srcset="">
                            </div>
                    
                                <div class="p-2 w-20 items-center justify-center h-6 rounded-full flex ${issue.priority == "high" ? "bg-[#FEECEC] text-[#EF4444]" : issue.priority == "medium" ? "bg-[#FFF6D1] text-[#F59E0B]" : "bg-[#EEEFF2] text-[#9CA3AF]"}">
                                    <p class="text-[12px] font-medium"> ${issue.priority} </p>
                                </div>
                        </div>
                        <div class="mt-3 space-y-2">
                            <h3 class="font-semibold text-[14px] h-[36px]"> ${issue.title} </h3>
                            <p class="text-[12px] text-[#64748B] line-clamp-2 "> ${issue.description} </p>
                        </div>
                        <div class="flex mt-3 gap-1">
                            <div class="p-2 items-center justify-center h-6 gap-1 rounded-full flex ${ issue.labels[0] == "bug" ? "bg-[#FEECEC] text-[#EF4444]" : issue.labels[0] == "documentation" ? "bg-[#FFF6D1] text-[#F59E0B]" : issue.labels[0] == "enhancement" ? "bg-[#BBF7D0] text-[#00A96E]" : "bg-[#BDF0DD] text-[#2890B0]"}">
                               <img src=" ${issue.labels[0] === "bug"
                ? "./assets/vector.png" : issue.labels[0] == "documentation" ? "./assets/Lifebuoy.png" : issue.labels[0] == "enhancement" ? "./assets/Sparkle.png ":  " "} " alt="">
                                <p class="text-[12px] font-medium uppercase"> ${issue.labels[0]} </p>
                            </div>

                            <div class="p-2  items-center justify-center h-6 rounded-full ${issue.labels[1] == null ? " hidden" : "flex "}
                            ${ issue.labels[1] == "bug" ? "bg-[#FEECEC] text-[#EF4444]" : issue.labels[1] == "documentation" ? "bg-[#FFF6D1] text-[#F59E0B]" : issue.labels[1] == "enhancement" ? "bg-[#BBF7D0] text-[#00A96E]" : "bg-[#BDF0DD] text-[#2890B0]"}">
                                <img src=" ${issue.labels[1] === "bug"
                    ? "./assets/vector.png" : issue.labels[1] == "documentation" ? "./assets/Lifebuoy.png" : issue.labels[1] == "enhancement" ? "./assets/Sparkle.png " : " "} " alt="">
                                <p class="text-[12px] font-medium uppercase"> ${issue.labels[1]} </p>
                            </div>


                        </div>
                    </div>
                    <hr class=" border-gray-300">
                    <div class="p-4 text-[12px] text-[#64748B] space-y-2">
                        <p> # ${issue.id} by ${issue.author}</p>
                        <p>${formattedDate}</p>
                    </div>
                    
                </div>` ;
            itemlist.appendChild(card);
        });
    }
    // loop for buttons
    function setActive(btn) {

        [allBtn, openBtn, closedBtn].forEach(button => {
            button.classList.remove("btn-primary");
            button.classList.add("btn-outline");
        });

        btn.classList.remove("btn-outline");
        btn.classList.add("btn-primary");
    }
    // event listener for boxes
    allBtn.addEventListener("click", () => {
        displaydata(allIssues);
        issueCount.innerText = `${allIssues.length} Issues`;
        setActive(allBtn);
    })

    openBtn.addEventListener("click", () => {
        const openIssues = allIssues.filter(issue => issue.status === "open");
        displaydata(openIssues);
        issueCount.innerText = `${openIssues.length} Issues`;
        setActive(openBtn);
    })

    closedBtn.addEventListener("click", () => {
        const closeissue = allIssues.filter(issue => issue.status === "closed");
        displaydata(closeissue);
        issueCount.innerText = `${closeissue.length} Issues`;
        setActive(closedBtn);
        console.log(closeissue);
    })


LoadCatagories()