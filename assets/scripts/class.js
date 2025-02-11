const urlParams = new URLSearchParams(window.location.search);

let gameName = urlParams.get('class');
if (gameName) {
    gameName = gameName.replaceAll('-', ' ');
} else {
    gameName = '';
}

let likeCount = 0;

async function displayUserData() {
    const pinBtn = document.querySelector('#pin');
    const likeBtn = document.querySelector('#like');
    const pinImg = pinBtn.firstChild;
    const likeImg = likeBtn.firstChild;

    // check if user has liked and/or pinned the game
    let res = await fetcher(`/profile/gamedata/${gameName}`);
    let json = await res.json();

    // set like icon if user has liked it
    if (json.liked) likeImg.setAttribute('src', 'assets/images/icons/like.avif');

    // set pin icon if user has pinned it
    if (json.pinned) pinImg.setAttribute('src', 'assets/images/icons/pin.avif');

    // add to recently played games list
    fetcher(`/profile/recent/set`, { body: { gameName: gameName } });
}

function setupActionButtons() {
    const pinBtn = document.querySelector('#pin');
    const likeBtn = document.querySelector('#like');

    // configuration for swal popup
    const swalConfig = { buttons: { cancel: 'Cancel', login: { text: 'Signup', value: 'signup' } } };
    const swalHandler = (value) => {
        if (value == 'signup') window.open('signup.php', '_self');
    };

    likeBtn.addEventListener('click', async (e) => {
        e.target.classList.add('button-click');

        let res = await fetcher(`/profile/liked/change`, { body: { gameName: gameName } });

        const likedIcon = 'assets/images/icons/like.avif';
        const notLikedIcon = 'assets/images/icons/likeoutline.avif';

        // check if it is liked by checking current icon
        let isLiked = e.target.firstChild.getAttribute('src') == likedIcon;

        if (res.status == 200) {
            // update icon to match changed state
            e.target.firstChild.setAttribute('src', isLiked ? notLikedIcon : likedIcon);

            // set updated like count
            let likeCountEle = document.getElementById('likeCount');

            let prevLikeCount = parseInt(likeCount);
            likeCount = isLiked ? prevLikeCount - 1 : prevLikeCount + 1;

            likeCountEle.innerText = numFormatter(likeCount);
        } else {
            let likedGames = JSON.parse(localStorage.getItem('likedGames') || '{}');

            // like or unlike game and display the correct icon
            e.target.firstChild.setAttribute('src', isLiked ? notLikedIcon : likedIcon);
            likedGames[gameName] = !isLiked;

            // save updated liked games
            localStorage.setItem('likedGames', JSON.stringify(likedGames));
            fetcher(`/stats/games/like`, { body: { gameName: gameName, liked: isLiked } });

            // set updated like count
            let likeCountEle = document.getElementById('likeCount');

            let prevLikeCount = parseInt(likeCount);
            likeCount = isLiked ? prevLikeCount - 1 : prevLikeCount + 1;

            likeCountEle.innerText = numFormatter(likeCount);
        }
    });
    likeBtn.addEventListener('webkitAnimationEnd', () => {
        likeBtn.classList.remove('button-click');
    });

    pinBtn.addEventListener('click', async (e) => {
        e.target.classList.add('button-click');

        let res = await fetcher(`/profile/pinned/change`, { body: { gameName: gameName } });

        const pinnedIcon = 'assets/images/icons/pin.avif';
        const notPinnedIcon = 'assets/images/icons/pinoutline.avif';

        // check if it is pinned by checking current icon
        let isPinned = e.target.firstChild.getAttribute('src') == pinnedIcon;

        if (res.status == 400) {
            swal('You have pinned the max amount of games (3).');
        } else if (res.status == 401 || res.status == 403) {
            let pinnedGames = JSON.parse(localStorage.getItem('pinnedGames') || '{}');

            if (Object.keys(pinnedGames).length >= 3) {
                swal('You have pinned the max amount of games (3).');
            } else {
                // like or unlike game and display the correct icon
                e.target.firstChild.setAttribute('src', isPinned ? notPinnedIcon : pinnedIcon);
                pinnedGames[gameName] = !isPinned;
    
                // save updated liked games
                localStorage.setItem('pinnedGames', JSON.stringify(pinnedGames));
            }
        } else {
            // update icon to match changed state
            e.target.firstChild.setAttribute('src', isPinned ? notPinnedIcon : pinnedIcon);
        }
    });
    pinBtn.addEventListener('webkitAnimationEnd', () => {
        pinBtn.classList.remove('button-click');
    });
}

var imageUrlsMediumBanner = [
  'https://definitelyscience.com/assets/images/ad/medium-banner/1.jpg',
  'https://definitelyscience.com/assets/images/ad/medium-banner/2.jpg',
  'https://definitelyscience.com/assets/images/ad/medium-banner/3.jpg',
  'https://definitelyscience.com/assets/images/ad/medium-banner/4.jpg',
  'https://definitelyscience.com/assets/images/ad/medium-banner/5.jpg'
];

var imageUrlsWideBanner = [
  'https://definitelyscience.com/assets/images/ad/wide-banner/1.jpg',
  'https://definitelyscience.com/assets/images/ad/wide-banner/2.jpg',
  'https://definitelyscience.com/assets/images/ad/wide-banner/3.jpg',
  'https://definitelyscience.com/assets/images/ad/wide-banner/4.jpg',
  'https://definitelyscience.com/assets/images/ad/wide-banner/5.jpg',
  'https://definitelyscience.com/assets/images/ad/wide-banner/6.jpg',
  'https://definitelyscience.com/assets/images/ad/wide-banner/7.jpg'
];

// Function to select a random image URL
function getRandomImageUrl(urls) {
  var randomIndex = Math.floor(Math.random() * urls.length);
  return urls[randomIndex];
}

function setRandomWideBanner()
{
	try
	{
		var imgElement = document.getElementById('wideRandBanner');
	   if (imgElement)
	   {
		  imgElement.src = getRandomImageUrl(imageUrlsWideBanner);
	   }
	}
	catch (error) {
		// Handle errors here
		console.log('An error occurred in setRandomWideBanner:', error.message);
	}
	
}

// Set the random image URL as the source of the <img> element
function setRandomAdBanner() {
	try
	{
		var imgElement = document.getElementById('mediumRandBanner');
	   if (imgElement)
	   {
		  imgElement.src = getRandomImageUrl(imageUrlsMediumBanner);
	   }
	} 
	catch (error) {
		// Handle errors here
		console.log('An error occurred in setRandomAdBanner:', error.message);
	}
  
}

window.addEventListener('load', async () => {
	
	setRandomWideBanner();
	setRandomAdBanner();
	
	
    // update navbar to underline game link
    document.getElementById('gamesnav').classList.add('selected');

    // fetch games from jsons
    let retrievedGamesRes = await fetcher(`/game/${gameName}`);
    let retrievedGames = await retrievedGamesRes.json();

    // get data for selected game
    const gameData = retrievedGames[0];

    // if the game requested does not exist in the json file redirect
    if (!gameData) window.location.href = '../classes.php';

    // check if user is signed in
    /*let response = await fetcher(`/auth/check`);
    let json;

    if (response.status == 200) {
        // display points count in navbar
        json = await response.json();
        setPointsDisplay(json.points || 0, json.username || "");

        // display user like and pin status of game
        displayUserData();

        // start requesting 50 points for active playtime every 15 minutes
        setInterval(async () => {
            let claimRes = await fetcher(`/points/active/claim`);

            if (claimRes.status == 200)
            {
                message('+50 pts for playing');
            }
        }, 1000 * 60 * 15);
    }
    else*/
	{
        const pinBtn = document.querySelector('#pin');
        const likeBtn = document.querySelector('#like');
        const pinImg = pinBtn.firstChild;
        const likeImg = likeBtn.firstChild;

        let likedGames = JSON.parse(localStorage.getItem('likedGames'));
        let pinnedGames = JSON.parse(localStorage.getItem('pinnedGames'));

        if (likedGames && likedGames[gameName]) {
            likeImg.setAttribute('src', 'assets/images/icons/like.avif');
        }

        if (pinnedGames && pinnedGames[gameName]) {
            pinImg.setAttribute('src', 'assets/images/icons/pin.avif');
        }
    }

    const iframe = document.getElementById('iframe');
    // TODO: reduce # of getElementById calls for performance

    //suggestGames(gameData);
	
	var iframeUrl = "";
	try {
		if (gameData && gameData.iframe_url && gameData.iframe_url.startsWith('https://')) {
			iframeUrl = new URL(gameData.iframe_url).hostname;
		}
	} catch (error) {
		console.log("Error parsing iframe URL: ", gameData.iframe_url);
	}
	
	const currentDomain = document.domain;

	console.log("Load game");
	//if (document && document.domain == "definitelyscience.com")
	if (document && currentDomain == iframeUrl)
	{
		console.log("Same domain");
		iframe.src = gameData.iframe_url;
	}
	else
	{
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('uv-sw.js', {
				scope: __uv$config.prefix
			}).then(() => {
				if (gameData.iframe_url.startsWith('https://')) iframe.src = (__uv$config.prefix + __uv$config.encodeUrl(gameData.iframe_url));
				else iframe.src = gameData.iframe_url;

				// scratch breaks with proxy
				if (gameData.iframe_url.startsWith('https://scratch.mit.edu')) iframe.src = gameData.iframe_url;
				
				if (gameData.iframe_url.startsWith('https://definitelyscience.com')) iframe.src = gameData.iframe_url;
		   }, (err) => {
				console.log(err);
		   });
		} else {
			
			iframe.src = gameData.iframe_url;
			//document.querySelector('.lds-dual-ring').remove();
			//document.querySelector('.info').textContent = 'Your browser appears to be in private browsing mode or is not compatabile. Try swapping or updating your browser.';
		};
	}

    // focus on the iframe. This is necessary for certain games such as eaglercraft
    document.getElementById('iframe').focus();

    // update metadata
    let metaDesc = gameData.description.length > 155 ? gameData.description.substr(0, 156) : gameData.description;

    document.querySelector('meta[name="description"]').setAttribute('content', metaDesc);
    document.querySelector('meta[name="DC.description"]').setAttribute('content', metaDesc);
    document.querySelector('meta[property="og:description"]').setAttribute('content', metaDesc);
    document.querySelector('meta[name="twitter:description"]').setAttribute('content', metaDesc);
    //document.getElementsByTagName('title')[0].innerHTML = `Definitely Science - ${gameName} || Play ${gameName} unblocked on Definitely Science`;
    document.getElementsByTagName('iframe')[0].title = `${gameName} Unblocked`;
    document.getElementById('game-title').innerText = `${gameName} Unblocked`;

    // update game information
    document.getElementById('description').innerText = gameData.description;
    document.getElementById('controls').innerHTML = gameData.controls;
    document.getElementById('developer').innerText = `${gameName} was created by ${gameData.developer}.`;

    if (gameData.article != null) {
        let artRes = await fetch(gameData.article);
        let artText = await artRes.text();

        document.getElementById('articleDivCon').innerHTML = artText;
        document.getElementById('articleDiv').style.display = '';
    }

    // update game total like count
    likeCount = await fetcher(`/profile/liked/count`, { body: { gameName: gameName } });
    likeCount = await likeCount.text();

    document.getElementById('likeCount').innerText = numFormatter(parseInt(likeCount)) || '0';

    // update game current highscore
    //let highscoreRes = await fetcher(`/profile/highscores/retrieve`, { body: { gameName: gameName } });
    //let highscoreJson = await highscoreRes.json();

    // document.getElementById('currentHighscore').innerText = highscoreRes.status == 200 ? numFormatter(highscoreJson.score) : '0';
    // document.getElementById('highscore').innerText = `${highscoreJson.name} holds the record score for 2048 for Totally Science. His score is ${highscoreJson.score}`;

    // update game statistics
    fetcher(`/stats/games/view`, { body: { gameName: gameName } });

    // setup action button events
    setupActionButtons();
	
	suggestGames(gameData);
	
	
});

// function OpenHighscore() {
//     window.open(`/leaderboard.php?class=${gameName}`, '_self');
// }

document.getElementById('fullscreen').addEventListener('click', () => {
    var elem = document.getElementById('iframe');

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    } else if (elem.webkitEnterFullscreen) {
        elem.webkitEnterFullscreen();
    }
});

async function suggestGames(gameData) {
    let suggestRes = await fetcher('/recommendations', { body: { tags: gameData.tags } });
    let suggestedGames = await suggestRes.json();

    let gamesDiv = document.querySelector('.gamesCon');

    for (let game in suggestedGames)
    {
        const data = suggestedGames[game];

        let classlist = data.tags.join(' ');

        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);

        const gameDate = new Date(data.date_added);

        if (gameDate > weekAgo) classlist += ' new';

        gamesDiv.innerHTML += `
            <div name="${game}" id="gameDiv" onclick="location.href = 'class.php?class=${game.replaceAll(' ', '-')}'" class="${classlist}">
                <div class="imageCon">
                    <img src="${data.image}" alt="Totally Science ${game}" title="Totally Science ${game}"/>
                </div>
                <h1 class="innerGameDiv">${game}</h1>
            </div>
        `;
    }
    addArrowListeners();
}

window.addEventListener('click', (e) => {
    //fix some text inputs not working (eaglercraft)
    if (e.target.id != 'messageBox') {
        document.getElementById('iframe').focus();
    }
});

function addArrowListeners() {
    const arrowLeft = document.querySelector('.arrowLeftCon');
    const arrowRight = document.querySelector('.arrowRightCon');
    const gamesCon = document.querySelector('.gamesCon');

    arrowLeft.addEventListener('click', () => {
        gamesCon.scrollLeft -= Math.min(gamesCon.scrollLeft, 1100);
    });

    arrowRight.addEventListener('click', (e) => {
        arrowLeft.style += 'visibility: visible';

        let remainingSpace = gamesCon.scrollWidth - gamesCon.clientWidth - gamesCon.scrollLeft;

        gamesCon.scrollLeft += Math.min(remainingSpace, 1100);
    });
}

function shareTo(website) {
    let url;
    let gameNameLink = document.location;

    if (website == 'Twitter') {
        url = `https://twitter.com/intent/tweet?url=${gameNameLink}&text=Check%20out%20this%20cool%20game%20I%27m%20playing%20-%20${gameName}&via=TotallyScience&hashtags=TotallyScience&related=TotallyScience`;
    } else if (website == 'Reddit') {
        url = `https://www.reddit.com/submit?url=${gameNameLink}&title=Check%20out%20this%20cool%20game%20I%27m%20playing%20-%20${gameName}`;
    } else if (website == 'Facebook') {
        url = `https://www.facebook.com/sharer/sharer.php?u=${gameNameLink}&hashtag=#totallyscience`;
    } else if (website == 'LinkedIn') {
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${gameNameLink}`;
    } else if (website == 'Whats App') {
        url = `https://web.whatsapp.com/send?text=Check%20out%20this%20cool%20game%20I%27m%20playing%20-%20${gameName}%20${gameNameLink}`;
    } else if (website == 'Mail') {
        url = `mailto:?subject=Check out this cool game I'm playing&body=Here's the link: ${gameNameLink}`;
    }
    window.open(url, '_blank');
}

function shareGame() {
    document.body.innerHTML += `<div id="shareCon">
    <div class="innerCon">
        <h1>Share the fun!</h1>
        <div class="platforms">
            <img onclick="shareTo('Mail')" src="assets/images/icons/shareicons/email.png">
            <img onclick="shareTo('Facebook')" src="assets/images/icons/shareicons/facebook.webp">
            <img onclick="shareTo('Whats App')" src="assets/images/icons/shareicons/whatsapp.png">
            <img onclick="shareTo('Twitter')" src="assets/images/icons/shareicons/twitter.png">
            <img onclick="shareTo('Reddit')" src="assets/images/icons/shareicons/reddit.png">
            <img onclick="shareTo('LinkedIn')" src="assets/images/icons/shareicons/linkedin.png">
        </div>
        <input type="text" onclick="copyLink()" readonly value="${document.location}">
        <div class="buttonsCon">
            <button class="copy" id="copyLinkButton" onclick="copyLink()">Copy</button>
            <button class="cancel" onclick="closeShare()">Cancel</button>
        </div>
    </div>
</div>`;
}

function copyLink() {
    document.getElementById('copyLinkButton').innerHTML = 'Copied.';
    navigator.clipboard.writeText(document.location);
    setTimeout(() => {
        document.getElementById('copyLinkButton').innerHTML = 'Copy';
    }, 1000);
}

function closeShare() {
    var element = document.getElementById('shareCon');

    element.classList.add('hide');
    setTimeout(() => {
        element.parentNode.removeChild(element);
    }, 250);
}
