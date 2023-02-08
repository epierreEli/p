console.log("reload");


// var start=document.getElementById("homepage");
// setTimeout(() => {
//     start.style.display="none";
//   }, 3000)


var category=document.getElementsByClassName("category");
var nbCategoryTotal=category.length;
var categorySelected=0;
var itemInCategory=category[categorySelected].getElementsByClassName("item");
var nbItemInCategory=itemInCategory.length;
var itemSelected=0;
var toggleSetting=false
// var test=category[0].getElementsByClassName("item")[0].classList.add("itemSelect");
category[0].focus();
category[categorySelected].scrollLeft=0;
itemInCategory[itemSelected].style.border=" 5px solid white";
// console.log("category = "+categorySelected+"; item ="+itemSelected+"; toggle ="+toggleSetting);

onkeydown = function(evt){
    switch(evt.keyCode){
        case 37: // left
            if(itemSelected-1>=0){
                itemInCategory[itemSelected].style.border=" 5px solid rgb(174,90,33)";
                itemSelected--;
                itemInCategory[itemSelected].style.border=" 5px solid white";
            }
            break;
        case 38: // up
            if(categorySelected==0){
                itemInCategory[itemSelected].style.border=" 5px solid rgb(174,90,33)";
                document.getElementById("itemSetting").style.border=" 5px solid white";
                toggleSetting=true;
                categorySelected=-1;
            }
            if (categorySelected-1>=0){
                itemInCategory[itemSelected].style.border=" 5px solid rgb(174,90,33)";
                categorySelected--;
                itemInCategory=category[categorySelected].getElementsByClassName("item");
                nbItemInCategory=itemInCategory.length;
                itemSelected=0;
                itemInCategory[itemSelected].style.border=" 5px solid white";
                category[categorySelected].focus();
                category[categorySelected].scrollLeft=0;
            }
            
            break;
        case 39: // right
            if(itemSelected+1<nbItemInCategory && toggleSetting==false){
                itemInCategory[itemSelected].style.border=" 5px solid rgb(174,90,33)";
                itemSelected++;
                itemInCategory[itemSelected].style.border=" 5px solid white";;
            }
            break;
        case 40: // down
                if(toggleSetting==true){
                    document.getElementById("itemSetting").style.border=" 5px solid rgb(174,90,33)";
                    toggleSetting=false;
                }
                if (categorySelected+1<nbCategoryTotal){
                        itemInCategory[itemSelected].style.border=" 5px solid rgb(174,90,33)";
                        categorySelected++;
                        itemInCategory=category[categorySelected].getElementsByClassName("item");
                        nbItemInCategory=itemInCategory.length;
                        itemSelected=0;
                        itemInCategory[itemSelected].style.border=" 5px solid white";
                        category[categorySelected].focus();
                        category[categorySelected].scrollLeft=0;
                    }   
            break;
        case 13:
            break;
        case 8:
            break;
    };
    // console.log("category = "+categorySelected+"; item ="+itemSelected+"; toggle ="+toggleSetting);
}    