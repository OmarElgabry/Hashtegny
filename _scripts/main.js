$("document").ready(function() {

var arrayOfPosts = [];
var animate_In = ["","fade-in","flip-in-x","zoom-in","fade-in-up","fade-in-left","flip-in-y","fade-in-up-right","bounce-in-down","flip-in-bottom-back","zoom-in-right-big"];
var animate_Out = ["","fade-out","flip-out-x","zoom-out","fade-out-down","fade-out-right","flip-out-y","fade-out-down-left","bounce-out-up","flip-out-bottom-back","zoom-out-left-big"];

var intervalAnimationHandler;
var intervalUpdateTimeHandler;

var first_animation = false, update=false;
var instagram, googleplus, twitter, vk;
var instagram_lastID=0, googleplus_lastID=0, twitter_lastID=0, vk_lastID=0;
var instagram_input, googleplus_input, twitter_input, vk_input;
var timeNow, timeUpdate = 30000;//every 0.5min
var postInfo = {num:0};
var imgExist;

//The Plugin starts from here:
getUserInput();
themeOption(); 

//------------- Time -------------
function UpdateTime(){
    console.log("Updating Time");
    var postTimeNum, postID;
    var date = new Date();
    
    $("#Hashtegny .postTimeValue").each(function(){
        postID = $(this).attr("id").toString().substring(13);
        postTimeNum = parseInt($(this).text());
        $(this).text(postTimeNum + timeUpdate);
        date.setTime(postTimeNum + timeUpdate);
        
            if(date.getUTCFullYear() < 1970){ 
                $("#Hashtegny #postTime"+postID).text("a few seconds ago");
            }
            else if(date.getUTCFullYear() > 1970){//Year
                $("#Hashtegny #postTime"+postID).text((date.getUTCFullYear() - 1970)+" Years ago");

            }else if(date.getUTCMonth() > 0){//Month
               $("#Hashtegny #postTime"+postID).text(date.getUTCMonth()+ " Month ago");

            }else if(date.getUTCDate() > 1 ){//Day
                $("#Hashtegny #postTime"+postID).text(((date.getUTCDate())-1)+ " Days ago");

            }else if(date.getUTCHours() > 0 ){//Hours
                $("#Hashtegny #postTime"+postID).text(date.getUTCHours()+ " Hours ago");

            }else if(date.getUTCMinutes() > 0){//Min
                $("#Hashtegny #postTime"+postID).text(date.getUTCMinutes()+ " Minutes ago");
            }else {
                $("#Hashtegny #postTime"+postID).text("Less than one minute");
            }
    });
}
function getTime(time){
    var date;
     if(postInfo.sm == "instagram" || postInfo.sm == "vk"){
        date = new Date(timeNow - (parseInt(time) * 1000));
    }else{
        date = new Date(timeNow - Date.parse(time));
    }
    
    postInfo.timeValue = date.getTime();
    
    if(date.getUTCFullYear() < 1970) 
        return  "a few seconds ago";    
    else if(date.getUTCFullYear() > 1970){//Year
        return (date.getUTCFullYear() - 1970)+" Years ago";
        
    }else if(date.getUTCMonth() > 0){//Month
        return  date.getUTCMonth()+ " Month ago";
        
    }else if(date.getUTCDate() > 1 ){//Day
        return  ((date.getUTCDate())-1)+ " Days ago";
        
    }else if(date.getUTCHours() > 0 ){//Hours
        return   date.getUTCHours()+ " Hours ago";
        
    }else if(date.getUTCMinutes() > 0){//Min
        return   date.getUTCMinutes()+ " Minutes ago";
    }else {
        return  "Less than one minute";
    }
    
}; 
//------------- Append and Sort -------------
function quickSort(arr,  left,  right) {
    var i = left, j = right;
    var tmp;
    var pivot = parseInt(arr[Math.floor((left + right) / 2)].find("p.postTimeValue").text());

    /* partition */
    while (i <= j) {
          while (parseInt(arr[i].find("p.postTimeValue").text()) < pivot)
                i++;
          while (parseInt(arr[j].find("p.postTimeValue").text()) > pivot)
                j--;
          if (i <= j) {
                tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
                i++;
                j--;
          }
    }
    /* recursion */
    if (left < j)
          quickSort(arr, left, j);
    if (i < right)
          quickSort(arr, i, right);

    return arr;
}
function appendDivs(){
    console.log("Appending Number of Divs: "+arrayOfPosts.length );
    arrayOfPosts = quickSort(arrayOfPosts,0,arrayOfPosts.length -1);
  
    if(update){
        for(var i=0;i<arrayOfPosts.length;i++){
            $("#Hashtegny .mainPost").eq(i).before(arrayOfPosts[i]);
        }
    }else{
        for(var i=0;i<arrayOfPosts.length;i++){
            $("#Hashtegny").append(arrayOfPosts[i]);
        }
    }
    
}

//------------- Animation -------------
function reset(){
    $(".loading").remove();
    $("#Hashtegny").text(""); 
    arrayOfPosts = [];
    clearInterval(intervalAnimationHandler);
    clearInterval(intervalUpdateTimeHandler);
    first_animation = false;
    update = false;
    instagram_lastID = googleplus_lastID = twitter_lastID = vk_lastID =  0;
    instagram_input = googleplus_input = twitter_input = vk_input = "";
    postInfo.num = 0;
    $("#userInput").slideDown(1000);
}
function startAnimation(){
    console.log("Animation");
    var i=0;
    first_animation = true;
    var animateIndex = 0;
    var last_postInfoNum = postInfo.num;
    intervalAnimationHandler = setInterval(AnimationLoop,8000); //Every 8sec.
    
    
        function AnimationLoop(){    
            if(i == 0) $(".loading").remove();
            //
            try{animateOut('#Hashtegny .mainPost:nth-child('+(i)+')', animate_Out[animateIndex]);}
            catch(e){$('#Hashtegny .mainPost:nth-child('+(i)+')').fadeOut();}
                if( animateIndex >= 10){
                    animateIndex = 0;
                }
                setTimeout(AnimationLoop_Inside,2000); //Buffering ....
                    function AnimationLoop_Inside(){
                        $('#Hashtegny .mainPost:nth-child('+(i)+')').css("display","none");
                            if(i >= last_postInfoNum){
                                i = 0;
                                if(update) appendDivs(); 
                                update = false;
                                last_postInfoNum = postInfo.num;
                                console.log("Number of Posts after Update: "+postInfo.num);
                            }
                        $('#Hashtegny .mainPost:nth-child('+(i+1)+')').css("display","block");
                        try{animate('#Hashtegny .mainPost:nth-child('+(i+1)+')', animate_In[animateIndex+1]);}
                        catch(e){$('#Hashtegny .mainPost:nth-child('+(i+1)+')').fadeIn();}
                        i++;
                        animateIndex++;
                    }
            }
        
        $(".stopButton").click(function(){ 
            reset(); 
        });
        $(".updateButton").click(function(){ 
           if(!update){
                arrayOfPosts = [];
                console.log("Update SMN First Time");
            }else{
                console.log("Update SMN x Times");
            }
                declareSMN();
                update = true;
        });
}

//------------- Ajax Finish -------------
$(document).ajaxStop(function () {
   console.log("Finished Ajax calls");
   if(!first_animation){
       appendDivs();
       intervalUpdateTimeHandler = setInterval(UpdateTime,timeUpdate);
       startAnimation();
   }
   
});

//------------- Wrapping Elemnts -------------
function encodePostText(str){
    return $('<div />').text(str).html();
}
function wrappingData(){
    postInfo.msg = encodePostText(postInfo.msg);
    var str = postInfo.msg.substr(0,300);
    if(str.length >= 300) str+="...";
    
var newDiv = $('<div id="mainPost'+postInfo.num+'" class="mainPost '+postInfo.sm+' '+postInfo.imgExist+'"></div>')
        .html("<div id='mainImgDiv"+postInfo.num+"' class='mainImgDiv'> <img src='"+postInfo.mainImg+"' class='mainImg' width="+postInfo.mainImgWidth+" height="+postInfo.mainImgHeight+" /></div>\n\
                <div id='userInfo"+postInfo.num+"' class='userInfo'>  \n\
                <img src='"+postInfo.userImg+"' class='userImg'/> \n\
                <h4 class='userName'>"+postInfo.userName+"</h4> \n\
                <img src='_images/"+postInfo.sm+".png' class='smImage'/> \n\
                <div class='postText'> <span>"+'"'+"</span> <p>"+str+"</p> </div> \n\
                <p id='postTime"+postInfo.num+"' class='postTime'>"+postInfo.timeDisplay+"</p> \n\
                <p id='postTimeValue"+postInfo.num+"' class='postTimeValue'>"+postInfo.timeValue+"</p> \n\
                </div>"
            );

arabicDetection();
function arabicDetection(){
    for(var i=0; i<100 ;i+=2){
        if(str.charAt(i) >= '\u0621' && str.charAt(i) <= '\u0669'){
            $(newDiv).find(".postText").css("text-align","right").attr({dir:"rtl"});
            $(newDiv).find(".postText span").css("right","0");
             break;
        }
    }
}
        arrayOfPosts.push(newDiv); 
        console.log("Finished "+ postInfo.sm);
};

//------------- getData -------------
function getInstagramData (JSObjectdata){
    var post = JSObjectdata.data;
    postInfo.sm = "instagram";
    for(var i=0; i < post.length ; i++ ){
        if( post[i].id == instagram_lastID){
            break;
        }
        postInfo.userName = post[i].user.username;
        postInfo.userImg = post[i].user.profile_picture;
        postInfo.timeDisplay = getTime(post[i].created_time);
        try{postInfo.msg = post[i].caption.text;
        }catch(e){postInfo.msg = "";}
        try{
        postInfo.mainImg = post[i].images.standard_resolution.url;
        postInfo.mainImgWidth = post[i].images.standard_resolution.width;
        postInfo.mainImgHeight = post[i].images.standard_resolution.height;
        postInfo.imgExist = "vertical";
        }
        catch(e){
        postInfo.mainImg = " ";
        postInfo.mainImgWidth = 0;
        postInfo.mainImgHeight = 0;
        postInfo.imgExist = "horizontal";
        }
        postInfo.id = post[i].id;
        postInfo.num += 1;
        wrappingData();
    }
    
    try{instagram_lastID = post[0].id;
    }catch(e){
        instagram_lastID = 0;
        console.log("InstagramID Update Error");
    }
};
function getGoogleplusData (JSObjectdata){
    var post = JSObjectdata.items;
    postInfo.sm = "googleplus";
    for(var i=0; i < post.length; i++ ){
        if (post[i].id == googleplus_lastID){
            break;
        }
        postInfo.userName = post[i].actor.displayName;
        postInfo.userImg = post[i].actor.image.url;
        postInfo.userImg = postInfo.userImg.toString().slice(0, postInfo.userImg.length-2)+"300";
        try{postInfo.msg = post[i].title;
        }catch(e){postInfo.msg = "";}
        try{
        postInfo.mainImg = post[i].object.attachments[0].thumbnails[0].image.url;
        postInfo.mainImgWidth = post[i].object.attachments[0].thumbnails[0].image.width;
        postInfo.mainImgHeight = post[i].object.attachments[0].thumbnails[0].image.height;
        postInfo.imgExist = "vertical";
        }
        catch(e){
        postInfo.mainImg = " ";
        postInfo.mainImgWidth = 0;
        postInfo.mainImgHeight = 0;
        postInfo.imgExist = "horizontal";
        }
        postInfo.id = post[i].id;
        postInfo.num += 1;
        wrappingData();
    }
    try{googleplus_lastID = post[0].id;
    }catch(e){
        googleplus_lastID = 0;
        console.log("GooglePlusID Update Error");
    }
};
function getTwitterData (JSObjectdata){ 
    var post = JSObjectdata.statuses;
    postInfo.sm = "twitter";
    for(var i=0; i < post.length; i++ ){
        if( post[i].id == twitter_lastID ){
            break;
        }
        postInfo.userName = post[i].user.name;
        postInfo.userImg = (post[i].user.profile_image_url).replace("_normal","");
        postInfo.timeDisplay = getTime(post[i].created_at);
        try{postInfo.msg = post[i].text;
        }catch(e){postInfo.msg = "";}
        try{
            postInfo.mainImg = post[i].entities.media[0].media_url_https;
            postInfo.mainImgWidth = post[i].entities.media[0].sizes.medium.w;
            postInfo.mainImgHeight = post[i].entities.media[0].sizes.medium.h;
            postInfo.imgExist = "vertical";
        }
        catch(e){
            postInfo.mainImg = " ";
            postInfo.mainImgWidth = 0;
            postInfo.mainImgHeight = 0;
            postInfo.imgExist = "horizontal";
        }
        postInfo.id = post[i].id;
        postInfo.num += 1;
        wrappingData();      
    }
    try{twitter_lastID =  post[0].id;
    }catch(e){
        twitter_lastID =  0;
        console.log("TwitterID Update Error");
    }
};
function getVKData(JSObjectdata){
    var post = JSObjectdata.response;
    postInfo.sm = "vk";
    for(var i=1; i < post.length; i++ ){
        if( post[i].id == vk_lastID ){
            break;
        }
        if(post[i].user){
            postInfo.userName = post[i].user.first_name +" "+post[i].user.last_name; 
            postInfo.userImg = post[i].user.photo_medium_rec;
        }else if(post[i].group){
            postInfo.userName = post[i].group.name;
            postInfo.userImg = post[i].group.photo_big;
        }else{
           continue;
        }
        postInfo.timeDisplay = getTime(post[i].date);
        
        if(post[i].text == ""){continue;}
        postInfo.msg = post[i].text;
        
        try{
            if(post[i].attachment.photo.src_xxxbig) postInfo.mainImg = post[i].attachment.photo.src_xxxbig;
            else if(post[i].attachment.photo.src_xxbig) postInfo.mainImg = post[i].attachment.photo.src_xxbig;
            else if(post[i].attachment.photo.src_xbig) postInfo.mainImg = post[i].attachment.photo.src_xbig;
            else if(post[i].attachment.photo.src_big) postInfo.mainImg = post[i].attachment.photo.src_big;
            else postInfo.mainImg = post[i].attachment.photo.src;
            
            postInfo.mainImgWidth = post[i].attachment.photo.width;
            postInfo.mainImgHeight = post[i].attachment.photo.width;
            postInfo.imgExist = "vertical";
        }
        catch(e){
            postInfo.mainImg = " ";
            postInfo.mainImgWidth = 0;
            postInfo.mainImgHeight = 0;
            postInfo.imgExist = "horizontal";
        }
        postInfo.id = post[i].id;
        postInfo.num += 1;
        wrappingData();      
    }
    try{ vk_lastID =  post[1].id;
    }catch(e){
        vk_lastID =  0;
        console.log("VK Update Error");
    }
}

//------------- SocialMediaNetworks Class -------------
function SocialMediaNetworks(url,name){
	this.url = url;
	this.name = name;
};
SocialMediaNetworks.prototype.ajaxCall = function (hashtagString){ //get JSON Data
    var name = this.name;
    if(this.name == "twitter"){
        try{
             $.post("_scripts/getTwitterData.php", {twitterHashtag:hashtagString},successFn);
        }catch(e){
             $(".error").css("display","block");
        }
    }else{
       $.getJSON(this.url, successFn);
    }
    
function successFn(data, status, xhr){
        timeNow = Date.now();
        if(name == "instagram"){
                getInstagramData(data);
        }else if(name == "googleplus"){
                getGoogleplusData(data);
        }else if(name == "twitter"){
            try{
                getTwitterData( jQuery.parseJSON(data) );
                //getTwitterData( JSON.parse(data) );
            }catch(e){
                $(".error").css("display","block");
            }
        }else if(name == "vk"){
            getVKData(data);
        }
    }
    
};

//------------- Utilization -------------
function themeOption(){
    $("input:radio").click( function(){
        $("body").css("backgroundImage" , "url(_images/"+$(this).val()+".jpg)");
    });
    //
    $("body").append(("<div class='error'><p>Sorry, There is a problem with Twitter!. Please refersh the page</p><span>x</span></div>"));
    $(".error span").click( function(){
        $(".error").css("display","none");
    });
    //
    $(".downloadButton").click( function (){
       window.open("https://github.com/omarelgabry/Hashtegny","_blank"); 
    });
    
}
function loadingEffect(){
    console.log("Loading .... ");
    $("body").append("<div class='loading'><div class='three-quarters'>Loading...</div></div>");
}

//------------- userInput & Validation -------------
function declareSMN(){
    if(instagram_input!=""){
        instagram = new SocialMediaNetworks("https://api.instagram.com/v1/tags/"+instagram_input+"/media/recent/?client_id=394b5154ec8747419546a64b686df10c&count=5&callback=?","instagram");
        instagram.ajaxCall("");
    }
    if(googleplus_input!=""){
        googleplus = new SocialMediaNetworks("https://www.googleapis.com/plus/v1/activities?query=%23"+googleplus_input+"&key=AIzaSyDpNQcIwQf5TcKmI8B0rh3e4OodIywJP14&maxResults=5","googleplus");
        googleplus.ajaxCall("");
    }
    if(twitter_input!=""){
        twitter = new SocialMediaNetworks("_scripts/getTwitterData.php","twitter");
        twitter.ajaxCall(twitter_input); 
    }
    if(vk_input!=""){
        vk = new SocialMediaNetworks("https://api.vk.com/method/newsfeed.search?q=%23"+vk_input+"&extended=1&count=5&callback=?","vk");
        vk.ajaxCall(""); 
    }

}
function inputValidation(){
    instagram_input = ($("#userInput #instagram").val());
    googleplus_input =  ($("#userInput #googleplus").val());
    twitter_input =  ($("#userInput #twitter").val());
    vk_input =  ($("#userInput #vk").val());

    var myRE = /(^[0-9]*[a-zA-Z_\u0621-\u0669\u0400-\u04FF]+[a-zA-Z_\u0621-\u0669\u0400-\u04FF0-9]*$)|^$/;
    
    if( !myRE.test(instagram_input) || !myRE.test(googleplus_input) || !myRE.test(twitter_input) || !myRE.test(vk_input) ){
        $(".wrongInput").css("background-color","rgba(250,0,0,.65)");
        return false;
    }else{
        $(".wrongInput").css("background-color","rgba(250,250,250,.65)");
        return true;
    }
        
}
function getUserInput(){
 $("form").submit(function(){
     if(inputValidation()){
         $("#userInput").slideUp(1000,function(){loadingEffect();});
            declareSMN();
     }
        return false;
  });
}
});
