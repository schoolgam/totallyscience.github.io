<!DOCTYPE html>
<html lang="en">

<head>
    <?php include "assets/includes/head.php" ?>

    <link rel='stylesheet' href='assets/styles/class.css?v70'>

	<script src="assets/scripts/uv/uv.bundle.js" type="text/javascript"></script>
	<script src="assets/scripts/uv/uv.config.js" type="text/javascript"></script>
	
	<script>
            const url = window.location.href;

            const regex = /class=([^#&?]+)/;
            const match = url.match(regex);
            if (match && match[1]) {
                const pageTitleNewName = match[1].replace(/-/g, ' ');

                 document.title = decodeURIComponent(pageTitleNewName + ' - Definitely Science');
            }
    </script>
</head>

<body>
    <?php include "assets/includes/navbar.php" ?>

	 <div class="TSad" style="margin: 0 auto; max-width: 800px; max-height: 125px; padding-top:70px">
	  <a href="https://totallyscience.co">
		<img id="wideRandBanner" src="https://definitelyscience.com/assets/images/ad/wide-banner/6.jpg" alt="Totally Science Unblocked" style="width: 100%; height: 100%;">
	  </a>
	</div>

    <h1 id="game-title"></h1>

    <div id="gameframe">
        <div class="ad">
            <div class="adsrc"></div>
        </div>

        <div class="gameDisplay">
            <div class="game">
                <iframe id="iframe" title="Totally Science Unblocked Game" src=""></iframe>
            </div>

            <div class="options">
                <div class="left">
                    <button id="like" class="text-button button-effect-a"><img
                            src="assets/images/icons/likeoutline.avif"></button>
                    <div id="likeCount">...</div>
<!--                     <button onclick="OpenHighscore()" class="text-button"><img
                            src="assets/images/icons/trophy-icon.avif"></button>
                    <div id="currentHighscore">...</div> -->
                </div>

                <div class="right">
                    <button id="share" onclick="shareGame()" class="game-button button-effect-a"><img
                            src="assets/images/icons/share.avif"></button>
                    <button id="pin" class="game-button button-effect-a"><img
                            src="assets/images/icons/pinoutline.avif"></button>
                    <button id="fullscreen" class="game-button"><img src="assets/images/icons/fullscreen.avif"></button>
                </div>
            </div>
        </div>
        <div class="ad">
            <div class="adsrc"></div>
        </div>
    </div>
	
	<div class="ad">
	  <div class="adsrc"></div>
	</div>

    <div id="info">
        <div class="container">
            <div class="segmentAd">
                <div class="text">
                    <h2>Description</h2>
                    <p id="description"></p>
                    <div class="break"></div>

                    <h2>Controls</h2>
                    <p id="controls"></p>
                    <div class="break"></div>

                    <h2>Created By</h2>
                    <p id="developer"></p>

<!--                     <h2>Highscore</h2>
                    <p id="highscore"></p> -->
                </div>

                <div class="ad">
				  <a href="https://totallyscience.co">
					<img id="mediumRandBanner" src="https://definitelyscience.com/assets/images/ad/medium-banner/1.jpg" alt="Totally Science Unblocked" style="width: 100%; height: 100%;">
				  </a>
				</div>
            </div>
        </div>
    </div>

    <div id="games">
        <h2>Recommended Games</h2>

        <div class="horizontalCon">
            <div class="arrowsCon">
                <div class="arrowCon arrowLeftCon" id="arrowLeft" style="visibility: hidden;">
                    <img class="arrow" src="/assets/images/icons/arrow-left.svg">
                </div>

                <div class="arrowCon arrowRightCon" id="arrowRight">
                    <img class="arrow" src="/assets/images/icons/arrow-right.svg">
                </div>
            </div>

            <div class="gamesCon">

            </div>
        </div>
    </div>
	
	
	<div id="disqus_thread" style="margin-left: 100px; margin-right: 100px;"></div>
	<script>
		if (document)
		{
			/**
			*  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
			*  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */
			/*
			var disqus_config = function () {
			this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
			this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
			};
			*/
			(function() { // DON'T EDIT BELOW THIS LINE
			var d = document, s = d.createElement('script');
			s.src = 'https://definitely-science.disqus.com/embed.js';
			s.setAttribute('data-timestamp', +new Date());
			(d.head || d.body).appendChild(s);
			})();
			
		}
	
		
	</script>

	<script id="dsq-count-scr" src="//definitely-science.disqus.com/count.js" async></script>


    <div id="articleDiv" style="display:none">
        <div class="container" id="articleDivCon">
        </div>
    </div>

    <?php include "assets/includes/footer.php" ?>

    <script src="assets/scripts/class.js?v37"></script>
</body>

</html>
