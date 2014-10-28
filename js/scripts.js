
var slideshowInfo = [];
var place=[];
var max=[];

//FUNCTIONS FOR WHEN DOM LOADS (images not completely loaded!)
$(document).ready(function() {
	documentReady();	
});
$(window).load(function(){
	
	//facebook stuff
	 window.fbAsyncInit = function() {
		FB.init({
		  appId      : '148144658590118', // App ID
		  channelUrl : '//www.post-gazette.com/fb/', // Channel File
		  status     : true, // check login status
		  cookie     : true, // enable cookies to allow the server to access the session
		  xfbml      : true  // parse XFBML
		});

		// Additional initialization code here
	  };

	  // Load the SDK Asynchronously
	  (function(d){
		 var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
		 if (d.getElementById(id)) {return;}
		 js = d.createElement('script'); js.id = id; js.async = true;
		 js.src = "//connect.facebook.net/en_US/all.js";
		 ref.parentNode.insertBefore(js, ref);
	   }(document));
	   
		
	
	windowLoad();
	
	$(window).resize(function(){
		$("body").find("**").off();
		$("body").find(".section, .picture.positionThis, .section .content .right, .quote.positionThis, .slideshowWrapper").removeAttr('style');
		//$("body").find("").removeAttr('style');
		documentReady();
		windowLoad();
	});
	
});

function moveSlideshow(direction, slideshowWrapper, i)
{


//advance or retreat the slideshow
		if (direction.indexOf("right") != -1 )
		{
			if(place[i] < max[i]-1)
			{
				$(slideshowWrapper).find(".slideshowRunway").animate({left:"-="+$(slideshowWrapper).find(".slideshowBox").width()},300);
				var oldHighlighted=$(slideshowWrapper).find(".tableOfContentsItem.highlighted"); //advance table of contents marker
				oldHighlighted.next().addClass("highlighted");
				oldHighlighted.removeClass("highlighted");
				place[i]++;
				
				if(place[i] == max[i]-1) $(slideshowWrapper).find(".slideshowArrowBoxWrapper.right").children().fadeOut(1);
					
			}
		}
		
	
		if (direction.indexOf("left") != -1 )
		{	
			if(place[i] > 0)
			{
				
				$(slideshowWrapper).find(".slideshowRunway").animate({left:"+=" + $(slideshowWrapper).find(".slideshowBox").width()},300);
				var oldHighlighted=$(slideshowWrapper).find(".tableOfContentsItem.highlighted"); //retreat table of contents marker
				oldHighlighted.prev().addClass("highlighted");
				oldHighlighted.removeClass("highlighted");
				place[i]--;
				
				if(place[i] == 0) $(slideshowWrapper).find(".slideshowArrowBoxWrapper.leftArrow").children().fadeOut(1);
			}	
		}
		
		changeCaption(slideshowWrapper, i);

}	

function changeCaption(slideshowWrapper, i)
{
	//afix credit
	$(slideshowWrapper).find(".slideshow .caption").fadeOut(1, function(){
		$(slideshowWrapper).find(".caption").html(slideshowInfo[i][place[i]]);
		$(slideshowWrapper).find(".slideshow .caption").fadeIn(500);
	});
}


//
// DOCUMENT READY
//
function documentReady()
{

	
	$(".brightcove").each(function(){
		$(this).height($(this).width() * .56);

		//1009 x 568
	});

	if ( $(window).width() > 1000 )
	{
		
		setTimeout(function () { $("#maintitle").fadeIn(500); }, 2500);
		
		// position sections to correctly to show divider images/videos
		$(".section").css("margin-top", $(window).height()+"px");
			
	
	} // end ABOVE 1000px section
	

	//if less than 1000 px wide
		if( $(window).width() <= 1000)
		{
			
			$("#maintitle").fadeIn(1);
			
			$.each( $(".positionThis"), function(i, image) {
				$(image).appendTo("span#" + $(image).attr("id"));
				
			});
			
		} //end less than 1000px wide
		
	
	//set up video autoplays
		$.each($(".section video"), function(i, video){
			
			$(video).waypoint(function(direction){
							
				if (direction == "down")
				{
					video.play();
				}
				
				if (direction == "up")
				{
					video.pause();
				}
				
			}, { offset: ($(window).height()-$(video).height()) / 2 } );
		
			$(video).waypoint(function(direction){
				
				if (direction == "down")
				{
					video.pause();
				}
				
				if (direction == "up")
				{
					video.play();
				}
				
			}, { offset: -($(window).height()-$(video).height()) / 2 } );
		
		});
		
		//set up section video autoplays
		$.each($(".titleCard video"), function(i, video){
			
			$(video).parent().prevAll(".section").first().find("p").last().waypoint(function(direction){
				
				
				
				if (direction == "down")
				{
					video.play();
				}
				
				if (direction == "up")
				{
					video.pause();
				}
				
			});
		
			$(video).parent().prevAll(".section").find("p").last().waypoint(function(direction){
										
				if (direction == "down")
				{
					video.pause();
				}
				
				if (direction == "up")
				{
					video.play();
				}
				
			}, { offset: -($(video).height())  } );
		
		});
	
				
		//set up first video autoplay
		$(".titleCard video").first().waypoint(function(direction){
			if (direction == "down")
			{
				this.pause();
			}
			
			if (direction == "up")
			{
				this.play();
			}
		}, { offset: -$(".titleCard video").first().height() });
	
		
		//set up chapter headings
		if( $(".titleCard.chapter").length > 0 && $(".header ul").length == 0) {
			
			$(".header h1").after("<ul class = 'chapters'></ul>");
			
			
			
			$(".titleCard.chapter").each(function(i){
				
				var chapter = this;			
				title = $(this).children(".title").html();
				
				if( title == "" ) {
					currentChapter = $("<li>Chapter " + ( i + 1 ) + "</li>" ).appendTo(".header ul.chapters");
				}
				else {
					currentChapter = $("<li>" + title + "</li>").appendTo(".header ul.chapters");
				}
				
				currentChapter.click(function(){ 
					$.scrollTo( $(chapter).next(".section"), 1000, {offset: - $(window).height() }); 
				});
				
				
				
				$(chapter).nextAll(".section").first().waypoint(function(direction){
					$(".header ul li").removeClass("active");
					if( direction == "down" ) $(".header ul li:eq(" + $(this).index(".section") + ")").addClass("active");
					else $(".header ul li:eq(" + $(this).index(".section") + ")").prev("li").addClass("active");
					
				}, { offset: $(window).height() + 50 });
				
			});
		
		}
		
		
	//
	// EVEMTS
	//
		
	// have header slide in and out at beginning of piece
	$(".section").first().waypoint(function(direction){
		
		if (direction === "down") { $(".header").animate({"margin-top":"0px"},250, function(){});}
		if (direction === "up") { $(".header").animate({"margin-top":"-50px"},250, function(){});}
		
	});
		
}

//
// WINDOW LOAD
//
function windowLoad()
{
	
	$.each($(".centerquote"), function(i,quote){
		
		$(quote).fadeTo("1", .5);
		
		$(quote).waypoint(function(direction) {
			
			if( direction == "up")
			{
				$(quote).fadeTo("2000", .5);
			}
			
			if( direction == "down" )
			{
				$(quote).fadeTo("2000", 1);
			}
		
		}, { offset: ( $(window).height() / 2 ) });
		
		//for when quote hits top of screen and needs to fade out
		$(quote).waypoint(function(direction) {
		
			if( direction == "up")
			{
				$(quote).fadeTo("2000", 1);
			}
			
			if( direction == "down" )
			{
				$(quote).fadeTo("2000", .5);
			}
		
		
		}, { offset: ( "75px" ) }); //this is the absolute value of the header. sorry i didn't make it dynamic :-(
		
	});

	if ( $(window).width() > 1000 )
	{
		
		// SLIDESHOW COMPONENT

		$.each($(".slideshowWrapper"), function(i, slideshowWrapper){ 
			$(this).fadeIn(300);
			$(slideshowWrapper).find(".slideshow .caption").html($(slideshowWrapper).find(".slideshowImage img").first().attr("caption"));
		
			$(this).width($(window).width());
			$(this).css("left", "-" + $(slideshowWrapper).offset().left+"px");
			
			//get total number of photos in slideshow
			max[i] = $(slideshowWrapper).find(".slideshowImage").length;
		
			//set intitial slideshow location
			place[i]=0;
			
			//set initial captionholder
			slideshowInfo[i] = [];
			
			//size height of box to fit a portion of the screen (600px in this case)
			$(slideshowWrapper).find(".slideshowBox").height($(window).height()*.7);
			$(slideshowWrapper).find(".slideshowArrowBoxWrapper").height($(window).height()*.7);
			$(slideshowWrapper).find(".slideshowArrowBoxWrapper").children().css("line-height",($(window).height()*.7) + "px");
			
			
			//let's put those arrows where they should be
			$(slideshowWrapper).find(".slideshowArrow").css("margin-top", ($(slideshowWrapper).find(".slideshowArrowBox").height()-$(slideshowWrapper).find(".slideshowArrow").height())/2);
			
			//size runway correctly
			$(slideshowWrapper).find(".slideshowRunway").width((($(slideshowWrapper).find(".slideshowImage").length))*($(slideshowWrapper).find(".slideshowBox").width())); //set the length of the runway to accomodate all the photos
			$(slideshowWrapper).find(".slideshowImage").width($(slideshowWrapper).find(".slideshowBox").width());
			$(slideshowWrapper).find(".slideshowImage").height($(slideshowWrapper).find(".slideshowBox").height()*.98);
			
			//size images to fit within boxes
			$(slideshowWrapper).find(".slideshowImage img").css({"max-width":$(slideshowWrapper).find(".slideshowImage").width(), "max-height":$(slideshowWrapper).find(".slideshowImage").height()});
			$.each($(slideshowWrapper).find(".slideshowImage img"), function(j, image){
				$(image).height($(image).height() - $(image).siblings(".credit").height()-10);
				var marginTop=(($(slideshowWrapper).find(".slideshowBox").height()-$(image).height()-$(image).siblings(".credit").height()-10)/2)
				$(image).css("margin-top", marginTop+"px")
				$(image).siblings(".credit").css({
					"width":$(image).width()+"px",
					"top":marginTop+$(image).height()+3+"px", //offset makes room for the caption
					"left":$(image).position().left+"px"
				});
				//put slideshow values into the array
				slideshowInfo[i].push($(image).attr("caption"));
				
				//make slideshow table of contents
				$(slideshowWrapper).find(".tableOfContentsNav.rightNav").before("<div class='tableOfContentsItem'>"+(j+1)+"</div>");
				
			});
			
			//make the first part of the table of contents selected
			$(slideshowWrapper).find(".tableOfContentsItem").first().addClass("highlighted");
			
			//fadeout the nav arrows on main slideshow
			$(slideshowWrapper).find(".slideshowArrowBox").fadeOut(1);
			
			
			

			//
			//Events
			//
			
			//click an arrow
			$(slideshowWrapper).find(".slideshowArrowBoxWrapper, .tableOfContentsNav").click(function(){moveSlideshow($(this).attr("class"), slideshowWrapper, i)});
			$(document).keydown(function(e){if(e.key == "Right" || e.key == "Left") moveSlideshow(e.key.toLowerCase(), slideshowWrapper, i)});
			
			//hover over an arrow 
			$(slideshowWrapper).find(".slideshowArrowBoxWrapper").hover(function(){ 
				if( ($(this).hasClass("rightArrow") && place[i] < max[i]-1) || ($(this).hasClass("leftArrow") && place[i] > 0)) $(this).children().fadeIn(100);
			}, 
			function(){ 
				$(this).children().fadeOut(1);
			});
			
			
			//click one of the table of contents items
			$(slideshowWrapper).find(".tableOfContentsItem").click(function(){
				target=parseInt($(this).html())-place[i]-1;
				place[i]=parseInt($(this).html())-1;
				target *= $(slideshowWrapper).find(".slideshowImage").width();
				$(slideshowWrapper).find(".slideshowRunway").animate({left:"-="+target},300);
				$(slideshowWrapper).find(".tableOfContentsItem.highlighted").removeClass("highlighted");
				$(this).addClass("highlighted");
				
				changeCaption(slideshowWrapper, i);
				
			});
			
			
		});
		
		//convert "window" titlecards to scrolling titlecards
		$.each($(".section"), function(i, section) {
		
			//hide previous titlecard, show next titlecard
			$(section).waypoint(function(direction){
				if (direction === "down") 
				{	
					$(section).nextAll(".titleCard").first().css({"visibility":"visible"}); 
					$(section).prevAll(".titleCard").first().css({"visibility":"hidden"}); 
				
				}
				
				//since you're scrolling up, show previous titlecard, hide next titlecard
				if (direction === "up") 
				{	
					$(section).nextAll(".titleCard").first().css({"visibility":"hidden"}); 
					$(section).prevAll(".titleCard").first().css({"visibility":"visible"}); 
				
				}		
		
			});
			
			$(section).waypoint(function(direction)
			{
				
				if (direction ==="down") 
				{
					
					$(section).nextAll(".titleCard").first().css({position:"relative", top:0});
					$(section).nextAll(".section").first().css({"margin-top":0});
				}
				
				if (direction ==="up")	
				{
					$(section).nextAll(".titleCard").first().css({position:"fixed", bottom:0});
					$(section).nextAll(".section").first().css({"margin-top":$(window).height()+"px"});
				}
				
			}, {offset:"-"+ $(section).height() + "px"});
					
	
		});
		
		//make all right columns equal left columns
		$.each($(".section .left"), function(i, left) {
			$(left).next(".right").height( $(left).height() );
		});
		
		//align all pictures to the proper place in the text
		$.each($(".right .positionThis"), function(i, positionThis) {
			$(positionThis).css({ position:"absolute", top: $("span#" + $(positionThis).attr("id")).position().top });
		});
	
	}
	//end greater THAN 1000 PX section
	
	//convert bio images to circles and properly size them;
	$.each($(".creditImage"), function(i, img){ $(img).height($(img).width());});
	
	//add shadow to last section
	$(".section").last().css("box-shadow", "0px 2px 5px gray");

	
	
	//
	//
	// EVENTS
	//
	//
	
	
	
	//click on thumbnail 
	
	$(".section .picture img").click(function() {
		$("body").append("<div class='shadowbox'><div class='close'><i class='fa fa-times'></i></div><div class='picture'><img src='" + $(this).attr("src") + "' /></div><div class='caption'>" + $(this).next(".caption").html() + "</div></div>");
	});
	
	$(document).on("click", ".close", function() { $(this).parent().remove(); });
}
