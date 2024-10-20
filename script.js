async function loadMusicFromJSON() {
    try {
        const response = await fetch('data.json');  // Caminho do JSON gerado
        const musicData = await response.json();
        
        createPlaylist('playlist1', musicData.music, 'player1', '/music/');
        createPlaylist('playlist2', musicData.background, 'player2', '/background/');
        createPlaylist('playlist3', musicData.sfx, 'player3', '/sfx/');

    } catch (error) {
        console.error('Erro ao carregar músicas:', error);
        alert('Erro ao carregar músicas:', error);
    }
}

function createPlaylist(playlistID, musicList, playerID, basePath) {
    const playlist = document.getElementById(playlistID);
    playlist.innerHTML = '';

    // Cria um item para cada música
    musicList.forEach(file => {

        const li = document.createElement('li');
        const fileName = file.split('.').slice(0, -1).join('.');

        li.className = 'flex items-center justify-between p-4 bg-gray-200 hover:bg-gray-300 rounded-lg cursor-pointer search-item';
        li.onclick = () => playMusic(playerID, `${basePath}${file}`, fileName);
        li.innerHTML = `
            <span class="text-sm font-medium text-gray-700">${fileName}</span>
        `;
        playlist.appendChild(li);
    });
}

function filterPlaylist(playlistID, query)
{
    const playlist = document.getElementById(playlistID);
    const items = playlist.getElementsByClassName('search-item');
    const lowerCaseQuery = query.toLowerCase();

    for(let i = 0; i < items.length; i++)
    {
        const itemText = items[i].textContent.toLowerCase();

        if( itemText.includes(lowerCaseQuery) )
        {
            items[i].style.display = '';
        } else
        {
            items[i].style.display = 'none';
        }
    }
}

function playMusic(playerID, musicSrc, fileName)
{
    const player = document.getElementById(playerID);
    const source = player.querySelector('source');

    source.src = musicSrc;

    switch (playerID) {
        case "player1":
            const nowPlayingMusic = document.getElementById('musicName');
            nowPlayingMusic.textContent = fileName;            
            break;

        case "player2":
            const nowPlayingBackground = document.getElementById('backgroundName');
            nowPlayingBackground.textContent = fileName;        
            break;
    
        default:
            break;
    }

    player.load();
    player.play();

}

function changeVolume(playerID, volume)
{
    let player = document.getElementById(playerID);

    player.volume = volume;
}


window.onload = loadMusicFromJSON;