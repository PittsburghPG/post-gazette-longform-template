# Pittsburgh Post-Gazette longform template

This responsive template makes assembling immersive longform stories a breeze. Right?!

## Basic workflow

1. Download .zip file from this Github page. 
2. Load the images you'll be using into the `/img` folder. (Make sure they're not too big! I usually export full-screen images at a max of 2000px wide.) 
3. Fill out `header.html` from `/html`
  * Copy and paste into `index.html`.
4. Fill out `section.html`.
  * Copy and paste into `index.html`; 
  * Rinse and repeat for every section in the article. 
5. Fill out `comments.html`.
  * Copy and paste into `index.html` *right above* the final two `</div>` tags in previous section. <br >
	Example: 
	             ...
		         <div style="clear:both"></div>
		         	
		         <div class="right"></div>
		         <div class="left"></div>
		         <div style="clear:both"></div>
		         	
		         <div class="picture full">
		         <h3>Your comments</h3>
		         <fb:comments href="<!-- INSERT PROJECT URL HERE -->" num_posts="30"  mobile="false" width="100%"></fb:comments>
		         </div>
		         
		         <div class="right"></div>
		         <div class="left"></div>
		         <div style="clear:both"></div>
		         
		    </div>
	    </div>
6. Fill out `credits.html`.
	* Copy and paste into `index.html`. 
7. Log into the Post-Gazette's `newsinteractive` server and upload the project folder to `longform/stories/`.
8. Verify the website looks puuuurty.